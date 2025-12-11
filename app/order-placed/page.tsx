"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";
import { CheckCircle, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import axiosInstance from "@/lib/axios/axiosInstance";

function BookingSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { bookingData, updateBookingData } = useBookingStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<any>(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    const verifyPaymentAndConfirmBooking = async () => {
      try {
        if (!sessionId) {
          // If no session_id, check if we have reservation number in store
          if (bookingData.reservationNumber && bookingData.bookingConfirmed) {
            setLoading(false);
            return;
          }
          // Redirect if no session and no booking
          router.push("/book-ride");
          return;
        }

        // Verify payment and confirm booking in one call
        const confirmResponse = await axiosInstance.post("/bookings", {
          action: "confirm-payment",
          sessionId: sessionId,
        });

        if (!confirmResponse.data.success) {
          throw new Error("Failed to confirm booking");
        }

        const confirmedBooking = confirmResponse.data.booking;
        setBooking(confirmedBooking);

        // Update store with booking data
        updateBookingData({
          reservationNumber: confirmedBooking.reservation_number,
          bookingConfirmed: true,
        });

        setLoading(false);

        // Start countdown and auto-redirect to home page after 10 seconds
        let remaining = 10;
        const countdownInterval = setInterval(() => {
          remaining--;
          setCountdown(remaining);
          if (remaining <= 0) {
            clearInterval(countdownInterval);
            router.push("/");
          }
        }, 1000);
      } catch (err: any) {
        console.error("Error verifying payment:", err);
        setError(err.response?.data?.message || err.message || "Failed to verify payment. Please check your email for confirmation.");
        setLoading(false);
      }
    };

    verifyPaymentAndConfirmBooking();
  }, [searchParams, bookingData, router, updateBookingData]);


  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      // Handle database format (YYYY-MM-DD)
      if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const date = new Date(dateStr);
        return date.toLocaleDateString("de-CH", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "Europe/Zurich",
        });
      }

      // Handle "21. November 2025" format
      if (dateStr.includes("November") || (dateStr.includes(".") && dateStr.includes(" "))) {
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
            return date.toLocaleDateString("de-CH", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "Europe/Zurich",
            });
          }
        }
      }

      // Handle "DD.MM.YYYY" format
      if (dateStr.includes(".") && !dateStr.includes(" ")) {
        const [day, month, year] = dateStr.split(".");
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return date.toLocaleDateString("de-CH", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "Europe/Zurich",
        });
      }

      // Fallback: try native Date parsing
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("de-CH", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "Europe/Zurich",
        });
      }

      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    // Optional: Convert 24h to 12h format
    return timeStr;
  };

  const getVehicleImage = (vehicleId?: string) => {
    switch (vehicleId) {
      case "mercedes-e-class":
        return "/car111.png";
      case "mercedes-v-class":
        return "/car2.png";
      case "mercedes-s-class":
        return "/car3.png";
      case "genesis-g80-electrified":
        return "/car4.png";
      default:
        return "/car1.png";
    }
  };

  // Use booking from API or fallback to store data
  const displayBooking = booking || bookingData;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-lg text-gray-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p>Confirming your payment...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we process your booking</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.push("/book-ride")}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg"
        >
          Back to Booking
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle className="text-white" size={48} />
            </div>
          </div>
          <p className="text-lg text-gray-700 mb-2">
            Great choice, {displayBooking.fullName?.split(" ")[0] || displayBooking.full_name?.split(" ")[0] || "Guest"}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase">
            Your Reservation is Confirmed
          </h1>
          <p className="text-gray-600">
            We've sent a confirmation email to {displayBooking.email || displayBooking.email}
          </p>
          {countdown > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to home page in {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
          )}
        </div>

        {/* Booking Details */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Left Side - Itinerary */}
            <div className="p-8 border bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Itinerary</h2>
              <p className="text-sm text-gray-600 mb-4">
                Reservation Number:{" "}
                <span className="font-semibold text-gray-900">
                  {displayBooking.reservationNumber || displayBooking.reservation_number}
                </span>
              </p>

              {/* Pickup */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Calendar className="text-gray-600" size={20} />
                  </div>
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Pickup</p>
                  <p className="text-sm text-gray-600 mb-2">
                    {displayBooking.pickupLocation || displayBooking.pickup_location}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(displayBooking.date)} at {formatTime(displayBooking.time)}
                  </p>
                </div>
              </div>

              {/* Drop-off */}
              {(displayBooking.rateType === "trip" || displayBooking.rate_type === "trip") && (
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <MapPin className="text-gray-600" size={20} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Return</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {displayBooking.dropoffLocation || displayBooking.dropoff_location}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(displayBooking.date)} at {formatTime(displayBooking.time)}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={() => router.push(`/order/${displayBooking.reservationNumber || displayBooking.reservation_number}`)}
                className="mt-8 w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
              >
                View all details
              </button>
            </div>

            {/* Right Side - Vehicle Image */}
            <div className="bg-gray-900 p-8 flex items-center justify-center">
              <div className="relative w-full h-full min-h-[300px]">
                <Image
                  src={getVehicleImage(displayBooking.selectedVehicle || displayBooking.selected_vehicle)}
                  alt={displayBooking.selectedVehicleName || displayBooking.selected_vehicle_name || "Vehicle"}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center text-lg text-gray-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p>Loading...</p>
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
}


