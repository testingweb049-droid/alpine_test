"use client";

import { useEffect, useState, useRef } from "react";
import { LoadScript, GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, libraries } from "@/utils/bookingConstants";
import { useBookingStore } from "@/store/bookingStore";
import StripePaymentForm from "@/component/booking/StripePaymentForm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const DEFAULT_CENTER = { lat: 46.8182, lng: 8.2275 };

export default function PaymentPage() {
  const router = useRouter();
  const { bookingData, updateBookingData } = useBookingStore();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Redirect if no booking data
  useEffect(() => {
    if (!bookingData.selectedVehicle || !bookingData.fullName || !bookingData.email) {
      router.push("/book-ride");
    }
  }, [bookingData, router]);

  // Update total price on vehicle change
  useEffect(() => {
    const basePrice = bookingData.selectedVehiclePrice || 0;
    updateBookingData({ totalPrice: basePrice });
  }, [bookingData.selectedVehiclePrice, updateBookingData]);

  // Safe flags to avoid undefined errors
  const hasPickup = Boolean(bookingData.pickupLatLng);
  const hasDropoff = Boolean(bookingData.dropoffLatLng);
  const showRoute = bookingData.rateType === "trip" && hasPickup && hasDropoff;
  const mapCenter = bookingData.pickupLatLng || bookingData.dropoffLatLng || DEFAULT_CENTER;

  // Load directions
  useEffect(() => {
    if (!mapLoaded || !showRoute) {
      setDirections(null);
      return;
    }

    if (!bookingData.pickupLatLng || !bookingData.dropoffLatLng) {
      setDirections(null);
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: new google.maps.LatLng(
          bookingData.pickupLatLng.lat,
          bookingData.pickupLatLng.lng
        ),
        destination: new google.maps.LatLng(
          bookingData.dropoffLatLng.lat,
          bookingData.dropoffLatLng.lng
        ),
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
  }, [
    mapLoaded,
    showRoute,
    bookingData.pickupLatLng,
    bookingData.dropoffLatLng,
  ]);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      if (dateStr.includes(".")) {
        const [day, month, year] = dateStr.split(".");
        const date = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        );
        return date.toLocaleDateString("de-CH", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "Europe/Zurich",
        });
      }
      const date = new Date(dateStr);
      return date.toLocaleDateString("de-CH", {
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

  const handleBack = () => {
    router.push("/book-ride");
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-2 sm:px-4 md:px-8 py-3 md:py-4">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">Back</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN - Booking Info & Map */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Information */}
              <div className="bg-[#F8F8F8] rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Booking Information
                  </h2>
                  {bookingData.bookingType && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                      {bookingData.bookingType}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Origin */}
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary mt-1.5"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        Origin
                      </p>
                      <p className="text-sm text-gray-600">
                        {bookingData.pickupLocation}
                      </p>
                    </div>
                  </div>

                  {/* Destination */}
                  {bookingData.rateType === "trip" && (
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-gray-900 mt-1.5"></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          Destination
                        </p>
                        <p className="text-sm text-gray-600">
                          {bookingData.dropoffLocation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Date & Time */}
                  <p className="text-sm text-gray-600">
                    {formatDate(bookingData.date)} {bookingData.time}
                  </p>

                  {/* Distance */}
                  {bookingData.rateType === "trip" &&
                    bookingData.distanceKm && (
                      <p className="text-sm text-gray-600">
                        {bookingData.distanceKm.toFixed(2)} km
                      </p>
                    )}

                  {/* Vehicle */}
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Vehicle
                    </p>
                    <p className="text-sm text-gray-600">
                      {bookingData.selectedVehicleName}
                    </p>
                  </div>

                  {/* Passenger Info */}
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Passenger
                    </p>
                    <p className="text-sm text-gray-600">{bookingData.fullName}</p>
                    <p className="text-sm text-gray-600">{bookingData.email}</p>
                    <p className="text-sm text-gray-600">{bookingData.phoneNumber}</p>
                  </div>
                </div>
              </div>

              {/* MAP */}
              <div className="h-80 rounded-lg overflow-hidden border border-gray-200">
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
                  {showRoute && directions && (
                    <DirectionsRenderer directions={directions} />
                  )}

                  {hasPickup && bookingData.pickupLatLng && (
                    <Marker position={bookingData.pickupLatLng} />
                  )}

                  {hasDropoff && bookingData.dropoffLatLng && (
                    <Marker position={bookingData.dropoffLatLng} />
                  )}
                </GoogleMap>
              </div>
            </div>

            {/* RIGHT COLUMN - Payment */}
            <div className="lg:col-span-1">
              {/* Checkout Summary */}
              <div className="bg-[#F8F8F8] p-6 rounded-lg shadow-md sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Checkout Summary
                </h2>

                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Vehicle Fare</span>
                  <span className="font-semibold text-gray-900">
                    {bookingData.selectedVehiclePrice?.toFixed(2) || "0.00"} CHF
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between mb-6">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    {bookingData.totalPrice?.toFixed(2) || "0.00"} CHF
                  </span>
                </div>

                <StripePaymentForm amount={bookingData.totalPrice || 0} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
}

