"use client";

import { LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, libraries } from "@/utils/bookingConstants";
import FleetSelection from "@/component/booking/FleetSelection";
import BookingSummary from "@/component/booking/BookingSummary";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookRidePage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="min-h-screen bg-white">
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

        <div className="max-w-7xl mx-auto px-4 bg-white md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <BookingSummary />
            <div className="lg:col-span-2">
              <FleetSelection />
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
}
