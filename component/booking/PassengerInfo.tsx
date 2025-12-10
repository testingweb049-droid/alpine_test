"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";
import { validatePassengerInfo, ValidationErrors } from "@/utils/validation";
import { User, Mail, Phone, Users, Luggage, Plus, Minus } from "lucide-react";
import axiosInstance from "@/lib/axios/axiosInstance";

export default function PassengerInfo() {
  const router = useRouter();
  const { bookingData, updateBookingData, isEditing, setIsEditing } = useBookingStore();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with values from store if they exist, otherwise defaults
  const [fullName, setFullName] = useState(bookingData.fullName || "");
  const [email, setEmail] = useState(bookingData.email || "");
  const [phoneNumber, setPhoneNumber] = useState(bookingData.phoneNumber || "");
  const [passengers, setPassengers] = useState(bookingData.passengers || 1);
  const [luggage, setLuggage] = useState(bookingData.luggage || 0);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(!!bookingData.flightNumber || !!bookingData.notes);
  const [flightNumber, setFlightNumber] = useState(bookingData.flightNumber || "");
  const [notes, setNotes] = useState(bookingData.notes || "");
  const [infantSeats, setInfantSeats] = useState(bookingData.infantSeats || 0);
  const [childSeats, setChildSeats] = useState(bookingData.childSeats || 0);
  const [boosterSeats, setBoosterSeats] = useState(bookingData.boosterSeats || 0);
  const [showExtras, setShowExtras] = useState(Boolean(bookingData.infantSeats || bookingData.childSeats || bookingData.boosterSeats));

  // Load data from store when component mounts or when bookingData changes
  useEffect(() => {
    // Only update if booking is not confirmed
    if (!bookingData.bookingConfirmed) {
      setFullName(bookingData.fullName || "");
      setEmail(bookingData.email || "");
      setPhoneNumber(bookingData.phoneNumber || "");
      setPassengers(bookingData.passengers || 1);
      setLuggage(bookingData.luggage || 0);
      setShowAdditionalInfo(!!bookingData.flightNumber || !!bookingData.notes);
      setFlightNumber(bookingData.flightNumber || "");
      setNotes(bookingData.notes || "");
      setInfantSeats(bookingData.infantSeats || 0);
      setChildSeats(bookingData.childSeats || 0);
      setBoosterSeats(bookingData.boosterSeats || 0);
      setShowExtras(Boolean((bookingData.infantSeats || 0) + (bookingData.childSeats || 0) + (bookingData.boosterSeats || 0)));
    }
    // Reset editing flag after loading
    if (isEditing) {
      setIsEditing(false);
    }
  }, [bookingData, isEditing, setIsEditing]);

  const handlePay = async () => {
    const validationErrors = validatePassengerInfo({
      fullName,
      email,
      phoneNumber,
      passengers,
      luggage,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save to store
    updateBookingData({
      fullName,
      email,
      phoneNumber,
      passengers,
      luggage,
      flightNumber: showAdditionalInfo ? flightNumber : undefined,
      notes: showAdditionalInfo ? notes : undefined,
      infantSeats,
      childSeats,
      boosterSeats,
    });

    setIsLoading(true);

    try {
      // Step 1: Create booking with pending status
      const bookingResponse = await axiosInstance.post("/bookings", {
        action: "create",
        bookingData: {
          ...bookingData,
          fullName,
          email,
          phoneNumber,
          passengers,
          luggage,
          flightNumber: showAdditionalInfo ? flightNumber : undefined,
          notes: showAdditionalInfo ? notes : undefined,
          infantSeats,
          childSeats,
          boosterSeats,
        },
      });

      const reservationNumber = bookingResponse.data.booking.reservation_number;

      // Step 2: Create Stripe Checkout Session with reservation number
      const checkoutResponse = await axiosInstance.post("/payments/create-checkout", {
        amount: bookingData.totalPrice || bookingData.selectedVehiclePrice || 0,
        reservationNumber: reservationNumber,
        bookingData: {
          ...bookingData,
          fullName,
          email,
          phoneNumber,
          passengers,
          luggage,
          flightNumber: showAdditionalInfo ? flightNumber : undefined,
          notes: showAdditionalInfo ? notes : undefined,
          infantSeats,
          childSeats,
          boosterSeats,
        },
      });

      if (checkoutResponse.data.checkoutUrl) {
        // Store reservation number in booking store
        updateBookingData({ reservationNumber });
        
        // Redirect to Stripe Checkout
        window.location.href = checkoutResponse.data.checkoutUrl;
      } else {
        throw new Error("Failed to get checkout URL");
      }
    } catch (err: any) {
      console.error("Checkout creation error:", err);
      setErrors({ 
        general: err.response?.data?.error || "Failed to create checkout session. Please try again." 
      });
      setIsLoading(false);
    }
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
        {/* Passenger Details */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Passenger Details</h2>
          <div className="space-y-4">
            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label> */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    clearError("fullName");
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter full name"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label> */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError("email");
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number
              </label> */}
              <div className={`relative flex items-center border rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}>
                <Phone className="text-gray-400 mr-2" size={20} />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    clearError("phoneNumber");
                  }}
                  placeholder="Enter mobile number"
                  className="w-full outline-none"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passengers
                </label> */}
                <div className={`flex items-center gap-3 border rounded-lg px-3 py-1 ${
                  errors.passengers ? "border-red-500" : "border-gray-300"
                }`}>
                  <Users className="text-gray-400" size={20} />
                  <div className="flex items-center gap-3 flex-1 justify-between">
                    <span className="text-gray-900 font-medium">{passengers}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        className="w-6 h-6 rounded-lg border bg-[#646464] border-gray-300 flex items-center justify-center  transition-colors"
                      >
                        <Minus size={16} className="text-white" />
                      </button>
                      {passengers}
                      <button
                        type="button"
                        onClick={() => {
                          setPassengers(passengers + 1);
                          clearError("passengers");
                        }}
                        className="w-6 h-6 rounded-lg border bg-[#646464] border-gray-300 flex items-center justify-center  transition-colors"
                      >
                        <Plus size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                {errors.passengers && (
                  <p className="mt-1 text-sm text-red-500">{errors.passengers}</p>
                )}
              </div>

              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-2">Luggage</label> */}
                <div className={`flex items-center gap-3 border rounded-lg px-3 py-1 ${
                  errors.luggage ? "border-red-500" : "border-gray-300"
                }`}>
                  <Luggage className="text-gray-400" size={20} />
                  <div className="flex items-center gap-3 flex-1 justify-between">
                    <span className="text-gray-900 font-medium">{luggage}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setLuggage(Math.max(0, luggage - 1))}
                        className="w-6 h-6 rounded-lg border bg-[#646464] border-gray-300 flex items-center justify-center transition-colors"
                      >
                        <Minus size={16} className="text-white" />
                      </button>
                      {luggage}
                      <button
                        type="button"
                        onClick={() => {
                          setLuggage(luggage + 1);
                          clearError("luggage");
                        }}
                        className="w-6 h-6 rounded-lg border bg-[#646464] border-gray-300 flex items-center justify-center transition-colors"
                      >
                        <Plus size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                {errors.luggage && (
                  <p className="mt-1 text-sm text-red-500">{errors.luggage}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="additionalInfo"
              checked={showAdditionalInfo}
              onChange={(e) => setShowAdditionalInfo(e.target.checked)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="additionalInfo" className="text-sm font-normal text-gray-900">
              Additional Information
            </label>
          </div>

          {showAdditionalInfo && (
            <div className="space-y-4 pl-6">
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flight Number
                </label> */}
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Flight Number"
                />
              </div>

              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes for Chauffeur
                </label> */}
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                  placeholder="Notes for Chauffeur"
                />
              </div>
            </div>
          )}
        </div>

        {/* Extras */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="extrasToggle"
              checked={showExtras}
              onChange={(e) => {
                const checked = e.target.checked;
                setShowExtras(checked);
                if (!checked) {
                  setInfantSeats(0);
                  setChildSeats(0);
                  setBoosterSeats(0);
                }
              }}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="extrasToggle" className="text-sm font-normal text-gray-900">
              Extras
            </label>
          </div>

          {showExtras && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
              <div>
                <div className="flex items-center gap-4">
                <p className="font-medium text-gray-900">Infant car seat</p>
                <span className="text-sm text-green-600 border border-[#1BCC1E] px-1 rounded-sm font-medium">Free</span>
                </div>
                <p className="text-sm text-gray-500">(0-13 kg), 0-1 years</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setInfantSeats(Math.max(0, infantSeats - 1))}
                    className="w-6 h-6 rounded-lg border bg-[#646464] border-gray-300 flex items-center justify-center  transition-colors"
                  >
                    <Minus size={16} className="text-white" />
                  </button>
                  <span className="w-8 text-center font-medium">{infantSeats}</span>
                  <button
                    type="button"
                    onClick={() => setInfantSeats(infantSeats + 1)}
                    className="w-6 h-6 rounded-lg border bg-[#646464] border-gray-300 flex items-center justify-center  transition-colors"
                  >
                    <Plus size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
              <div>
                <div className="flex items-center gap-4">

                <p className="font-medium text-gray-900">Child seat</p>
                 <span className="text-sm text-green-600 border border-[#1BCC1E] px-1 rounded-sm font-medium">Free</span>
                </div>
                <p className="text-sm text-gray-500">(9-18 kg), 2-5 years</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setChildSeats(Math.max(0, childSeats - 1))}
                    className="w-6 h-6 rounded-lg border bg-[#646464] border-gray-300 flex items-center justify-center  transition-colors"
                  >
                    <Minus size={16} className="text-white" />
                  </button>
                  <span className="w-8 text-center font-medium">{childSeats}</span>
                  <button
                    type="button"
                    onClick={() => setChildSeats(childSeats + 1)}
                    className="w-6 h-6 rounded-lg border bg-[#646464] border-gray-300 flex items-center justify-center  transition-colors"
                  >
                    <Plus size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
              <div>
                <div className="flex items-center gap-4">
                <p className="font-medium text-gray-900">Booster seat</p>
                 <span className="text-sm text-green-600 border border-[#1BCC1E] px-1 rounded-sm font-medium">Free</span>
                </div>
                <p className="text-sm text-gray-500">(from 6 years)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBoosterSeats(Math.max(0, boosterSeats - 1))}
                    className="w-6 h-6 rounded-lg border bg-[#646464] border-gray-300 flex items-center justify-center  transition-colors"
                  >
                    <Minus size={16} className="text-white" />
                  </button>
                  <span className="w-8 text-center font-medium">{boosterSeats}</span>
                  <button
                    type="button"
                    onClick={() => setBoosterSeats(boosterSeats + 1)}
                    className="w-6 h-6 rounded-lg border bg-[#646464] border-gray-300 flex items-center justify-center  transition-colors"
                  >
                    <Plus size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>

        {/* Pay Button */}
        <div className="flex justify-end pt-4">
          {errors.general && (
            <p className="text-red-500 text-sm mr-4 self-center">{errors.general}</p>
          )}
          <button
            onClick={handlePay}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-white font-normal px-12 py-3 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "PAY NOW"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

