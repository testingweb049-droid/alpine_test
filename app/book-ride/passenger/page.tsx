"use client";

import { LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, libraries } from "@/utils/bookingConstants";
import PassengerInfo from "@/component/booking/PassengerInfo";
import BookingSummary from "@/component/booking/BookingSummary";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";

export default function PassengerPage() {
  const router = useRouter();
  const { bookingData } = useBookingStore();

  const handleBack = () => {
    router.push("/book-ride");
  };

  const dateText = bookingData.date || "";

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="min-h-screen bg-white">
        <div className="bg-white border-b border-gray-200 px-2 sm:px-4 md:px-8 py-3 md:py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">Back</span>
            </button>
            {dateText && (
              <span className="text-sm text-gray-600">Pickup Date: {dateText}</span>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <BookingSummary />
            <div className="lg:col-span-2">
              <PassengerInfo />
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
}
