"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { useBookingStore } from "@/store/bookingStore";
import { CiEdit } from "react-icons/ci";

const DEFAULT_CENTER = { lat: 46.8182, lng: 8.2275 };

export default function BookingSummary() {
  const router = useRouter();
  const { bookingData, setIsEditing } = useBookingStore();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  const hasPickup = Boolean(bookingData.pickupLatLng);
  const hasDropoff = Boolean(bookingData.dropoffLatLng);
  const showRoute = bookingData.rateType === "trip" && hasPickup && hasDropoff;
  const mapCenter = bookingData.pickupLatLng || bookingData.dropoffLatLng || DEFAULT_CENTER;
  console.log("BookingSummary render:", { bookingData });
 useEffect(() => {
  if (!mapLoaded || !showRoute) {
    setDirections(null);
    return;
  }

  if (
    !bookingData.pickupLatLng ||
    !bookingData.dropoffLatLng
  ) {
    setDirections(null);
    return;
  }

  const { pickupLatLng, dropoffLatLng } = bookingData;

  const directionsService = new google.maps.DirectionsService();
  directionsService.route(
    {
      origin: new google.maps.LatLng(pickupLatLng.lat, pickupLatLng.lng),
      destination: new google.maps.LatLng(dropoffLatLng.lat, dropoffLatLng.lng),
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        setDirections(result);
      } else {
        setDirections(null);
      }
    }
  );
}, [mapLoaded, showRoute, bookingData.pickupLatLng, bookingData.dropoffLatLng]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      // Handle "21. November 2025" format
      if (dateStr.includes("November") || dateStr.includes(".")) {
        // Replace German month names if needed, or parse directly
        const parts = dateStr.split(" ");
        if (parts.length === 3) {
          const day = parseInt(parts[0].replace(".", ""));
          const monthName = parts[1];
          const year = parseInt(parts[2]);

          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          const monthIndex = monthNames.findIndex(name =>
            name.toLowerCase() === monthName.toLowerCase()
          );

          if (monthIndex !== -1) {
            const date = new Date(year, monthIndex, day);
            return date.toLocaleDateString("en-GB", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "Europe/Zurich",
            });
          }
        }
      }

      // Fallback to original logic for other formats
      if (dateStr.includes(".")) {
        const [day, month, year] = dateStr.split(".");
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return date.toLocaleDateString("en-GB", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "Europe/Zurich",
        });
      }

      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "Europe/Zurich",
      });
    } catch {
      return dateStr;
    }
  };

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
  };

  return (
    <div className="hidden lg:block">
      <div className="flex flex-col gap-4 sticky top-4">
        <div className="rounded-sm bg-[#F8F8F8] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-secondary">SUMMARY</h2>
            <button
              onClick={() => {
                setIsEditing(true);
                router.push("/");
              }}
              className="text-secondary text-sm font-medium flex items-center gap-1"
            >
              <CiEdit size={20} />
              Edit
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="border-b border-[#E9E9E9] pb-3">
              <p className="text-sm text-[#7B7B7B] mb-1">Pickup Location</p>
              <p className="text-md font-normal text-secondary">
                {bookingData.pickupLocation || "Not selected"}
              </p>
            </div>

            {bookingData.rateType === "trip" && (
              <div className="border-b border-[#E9E9E9] pb-3">
                <p className="text-sm text-[#7B7B7B] mb-1">Drop-off Location</p>
                <p className="text-md font-normal text-secondary">
                  {bookingData.dropoffLocation || "Not selected"}
                </p>
              </div>
            )}

            <div className="border-b border-[#E9E9E9] pb-3">
              <p className="text-sm text-[#7B7B7B] mb-1">Pickup Date & Time</p>
              <p className="text-md font-normal text-secondary">
                {formatDate(bookingData.date)} {bookingData.time}
              </p>
            </div>

            {bookingData.rateType === "trip" && bookingData.distanceKm && (
              <div className="pb-3">
                <p className="text-sm text-[#7B7B7B] mb-1">Total Distance</p>
                <p className="text-md font-normal text-secondary">
                  {bookingData.distanceKm} km
                </p>
              </div>
            )}

            {bookingData.rateType === "hourly" && bookingData.duration && (
              <div className="pb-3">
                <p className="text-sm text-[#7B7B7B] mb-1">Duration</p>
                <p className="text-md font-normal text-secondary">
                  {bookingData.duration} Hours
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="h-96 rounded-sm overflow-hidden border border-gray-200">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{
              lat: mapCenter.lat,
              lng: mapCenter.lng,
            }}
            zoom={showRoute ? 7 : hasPickup ? 9 : 7}
            onLoad={onMapLoad}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {showRoute && directions && <DirectionsRenderer directions={directions} />}
            {hasPickup && bookingData.pickupLatLng && (
              <Marker
                position={{
                  lat: bookingData.pickupLatLng.lat,
                  lng: bookingData.pickupLatLng.lng,
                }}
              />
            )}
            {hasDropoff && bookingData.dropoffLatLng && (
              <Marker
                position={{
                  lat: bookingData.dropoffLatLng.lat,
                  lng: bookingData.dropoffLatLng.lng,
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}
