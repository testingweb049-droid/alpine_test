"use client";

import React, { useState, useEffect, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import Button from "../button/PrimaryButton";
import { MdLocationOff, MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaRegCalendarDays } from "react-icons/fa6";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { formatDate, getSwissDate, getSwissDateFromDate, getSwissTime } from "@/utils/dateUtils";
import { calculateDistance } from "@/utils/distanceUtils";
import { CalendarPicker } from "@/component/booking/CalendarPicker";
import { TimePicker } from "@/component/booking/TimePicker";
import { useBookingStore } from "@/store/bookingStore";
import {
  RideType,
  libraries,
  FROM_SUGGESTIONS,
  TO_SUGGESTIONS,
  GOOGLE_MAPS_API_KEY,
} from "@/utils/bookingConstants";

const BookingSection: React.FC = () => {
  const router = useRouter();
  const [showCalendar, setShowCalendar] = useState(false);
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const { bookingData, updateBookingData, setRateType, isEditing, setIsEditing } = useBookingStore();
const autocompleteOptions = {
  fields: ["geometry", "formatted_address", "name"],
  // componentRestrictions: {
  //   country: ["at", "be", "ch", "cz", "de", "es", "fr", "it", "li", "lu", "mc"],
  // },
};


  const [rideType, setRideType] = useState<RideType>(() => {
    return bookingData.rateType === "hourly" ? "By the Hour" : "One Way";
  });
  const [fromLocation, setFromLocation] = useState<string>(bookingData.pickupLocation || "");
  const [toLocation, setToLocation] = useState<string>(bookingData.dropoffLocation || "");
  const [pickupDate, setPickupDate] = useState<string>(bookingData.date || "");
  const [pickupTime, setPickupTime] = useState<string>(bookingData.time || "");
  const [hours, setHours] = useState<string>(bookingData.duration || "4");
  const [isBooking, setIsBooking] = useState(false);

  // Load data from store when component mounts or when bookingData changes
  useEffect(() => {
    // Only update if booking is not confirmed
    if (!bookingData.bookingConfirmed) {
      setFromLocation(bookingData.pickupLocation || "");
      setToLocation(bookingData.dropoffLocation || "");
      setPickupDate(bookingData.date || "");
      setPickupTime(bookingData.time || "");
      setHours(bookingData.duration || "1");
      if (bookingData.rateType) {
        setRideType(bookingData.rateType === "trip" ? "One Way" : "By the Hour");
      }
    }
    // Reset editing flag after loading
    if (isEditing) {
      setIsEditing(false);
    }
  }, [bookingData, isEditing, setIsEditing]);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const dateFieldRef = useRef<HTMLDivElement | null>(null);
  const timeFieldRef = useRef<HTMLDivElement | null>(null);
  
  // Parse date from store to set currentMonth
  const parseDateFromStore = (dateStr: string): Date => {
    if (!dateStr) return getSwissDate();
    try {
      // Handle format like "17. November 2025" (English month names)
      if (dateStr.includes(".") && dateStr.includes(" ")) {
        const parts = dateStr.split(" ");
        const dayPart = parts[0].replace(".", "");
        const monthName = parts[1];
        const year = parseInt(parts[2]);
        
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
        if (month !== -1) {
          return new Date(year, month, parseInt(dayPart));
        }
      }
      // Handle format like "13.11.2025" (DD.MM.YYYY)
      if (dateStr.includes(".") && dateStr.split(".").length === 3) {
        const [day, month, year] = dateStr.split(".");
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      }
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) return date;
    } catch {
      // Fallback to today
    }
    return getSwissDate();
  };

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (bookingData.date) {
      const parsed = parseDateFromStore(bookingData.date);
      return new Date(parsed.getFullYear(), parsed.getMonth(), 1);
    }
    const swissDate = getSwissDate();
    return new Date(swissDate.getFullYear(), swissDate.getMonth(), 1);
  });

  // Update currentMonth when date from store changes
  useEffect(() => {
    if (bookingData.date && !bookingData.bookingConfirmed) {
      const parsed = parseDateFromStore(bookingData.date);
      setCurrentMonth(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
    }
  }, [bookingData.date, bookingData.bookingConfirmed]);

  // Parse time from store if available
  const parseTimeFromStore = (timeStr: string) => {
    if (!timeStr) return { hour: "08", minute: "59", second: "06" };
    // Handle formats like "03:15pm" or "03:15:06pm" or "15:15"
    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (timeMatch) {
      let hour = parseInt(timeMatch[1], 10);
      const minute = timeMatch[2];
      const second = timeMatch[3] || "06";
      const ampm = timeMatch[4]?.toLowerCase();

      if (ampm === "pm" && hour !== 12) hour += 12;
      if (ampm === "am" && hour === 12) hour = 0;

      return {
        hour: String(hour).padStart(2, "0"),
        minute,
        second,
      };
    }
    return { hour: "08", minute: "59", second: "06" };
  };

  const [selectedHour, setSelectedHour] = useState<string>(() => {
    if (bookingData.time) {
      const parsed = parseTimeFromStore(bookingData.time);
      return parsed.hour;
    }
    const swissTime = getSwissTime();
    const [hour] = swissTime.split(":");
    return hour.padStart(2, "0");
  });
  const [selectedMinute, setSelectedMinute] = useState<string>(() => {
    if (bookingData.time) {
      const parsed = parseTimeFromStore(bookingData.time);
      return parsed.minute;
    }
    const swissTime = getSwissTime();
    const [, minute] = swissTime.split(":");
    return minute || "00";
  });
  const [selectedSecond, setSelectedSecond] = useState<string>(() => {
    if (bookingData.time) {
      const parsed = parseTimeFromStore(bookingData.time);
      return parsed.second;
    }
    return "00";
  });

  // Update time picker when time from store changes
  useEffect(() => {
    if (bookingData.time && !bookingData.bookingConfirmed) {
      const parsed = parseTimeFromStore(bookingData.time);
      setSelectedHour(parsed.hour);
      setSelectedMinute(parsed.minute);
      setSelectedSecond(parsed.second);
    }
  }, [bookingData.time, bookingData.bookingConfirmed]);

  const fromAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const toAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [fromLatLng, setFromLatLng] = useState<{ lat: number; lng: number } | null>(bookingData.pickupLatLng || null);
  const [toLatLng, setToLatLng] = useState<{ lat: number; lng: number } | null>(bookingData.dropoffLatLng || null);
  const [distanceKm, setDistanceKm] = useState<number | null>(bookingData.distanceKm || null);

  // Load lat/lng from store when it updates
  useEffect(() => {
    if (!bookingData.bookingConfirmed) {
      if (bookingData.pickupLatLng) setFromLatLng(bookingData.pickupLatLng);
      if (bookingData.dropoffLatLng) setToLatLng(bookingData.dropoffLatLng);
      if (bookingData.distanceKm !== undefined && bookingData.distanceKm !== null) {
        setDistanceKm(bookingData.distanceKm);
      }
    }
  }, [bookingData]);

  const [fromFocused, setFromFocused] = useState(false);
  const [toFocused, setToFocused] = useState(false);

  const [fromPlaceholder, pauseFromTyping] = useTypewriter(
    FROM_SUGGESTIONS, !fromLocation
  );
  const [toPlaceholder, pauseToTyping] = useTypewriter(
    TO_SUGGESTIONS, !!fromLatLng && !toLocation
  );

  useEffect(() => {
    pauseFromTyping(fromFocused || !!fromLocation);
  }, [fromFocused, fromLocation]);

  useEffect(() => {
    pauseToTyping(toFocused || !!toLocation);
  }, [toFocused, toLocation]);

  // Sync rate type with store
  useEffect(() => {
    setRateType(rideType === "One Way" ? "trip" : "hourly");
  }, [rideType, setRateType]);

  // Calculate distance for trip rate
  useEffect(() => {
    if (rideType !== "One Way") {
      setDistanceKm(null);
      return;
    }
    if (!fromLatLng || !toLatLng) return;

    (async () => {
      const km = await calculateDistance(fromLatLng, toLatLng);
      setDistanceKm(km);
    })();
  }, [fromLatLng, toLatLng, rideType]);


  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    
    // Get today's date in Switzerland timezone
    const today = getSwissDate();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
    
    const selectedYear = currentMonth.getFullYear();
    const selectedMonth = currentMonth.getMonth();
    const selectedDay = day;
    
    // Check if selected date is today or in the future
    let isDateValid = false;
    if (selectedYear > todayYear) {
      isDateValid = true;
    } else if (selectedYear === todayYear && selectedMonth > todayMonth) {
      isDateValid = true;
    } else if (selectedYear === todayYear && selectedMonth === todayMonth && selectedDay >= todayDay) {
      isDateValid = true;
    }
    
    if (isDateValid) {
      setPickupDate(formatDate(selectedDate));
    }
    setShowDatePicker(false);
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1)
    );
  };

  const formatTimeDisplay = (hour: string, minute: string) => {
    const hour24 = parseInt(hour, 10);
    const period = hour24 >= 12 ? "PM" : "AM";
    const h12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    return `${String(h12).padStart(2, "0")}:${minute} ${period}`;
  };

  const handleTimeConfirm = () => {
    setPickupTime(formatTimeDisplay(selectedHour, selectedMinute));
    setShowTimePicker(false);
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (showDatePicker && dateFieldRef.current && !dateFieldRef.current.contains(target)) {
        setShowDatePicker(false);
      }
      if (showTimePicker && timeFieldRef.current && !timeFieldRef.current.contains(target)) {
        setShowTimePicker(false);
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [showDatePicker, showTimePicker]);

  const onFromPlaceChanged = () => {
    const place = fromAutocompleteRef.current?.getPlace();
    console.log("From place changed:", place);
    const addr = `${place?.name}  ${place?.formatted_address}` || "";
    console.log("Setting fromLocation to:", addr);
    setFromLocation(addr);

    const loc = place?.geometry?.location;
    if (loc) setFromLatLng({ lat: loc.lat(), lng: loc.lng() });
  };

  const onToPlaceChanged = () => {
    const place = toAutocompleteRef.current?.getPlace();
    console.log("To place changed:", place);
    const addr = `${place?.name}  ${place?.formatted_address}` || "";
    console.log("Setting toLocation to:", addr);
    setToLocation(addr);

    const loc = place?.geometry?.location;
    if (loc) setToLatLng({ lat: loc.lat(), lng: loc.lng() });
  };

  const handleBookNow = async () => {
    if (isBooking) return;

    if (!fromLocation || (rideType === "One Way" && !toLocation)) {
      alert("Please select location.");
      return;
    }
    if (!pickupDate || !pickupTime) {
      alert("Please select pickup date and time.");
      return;
    }

    try {
      setIsBooking(true);

      // Save all data to Zustand store
      updateBookingData({
        rateType: rideType === "One Way" ? "trip" : "hourly",
        pickupLocation: fromLocation,
        dropoffLocation: rideType === "One Way" ? toLocation : "",
        date: pickupDate,
        time: pickupTime,
        duration: rideType === "By the Hour" ? hours : "",
        pickupLatLng: fromLatLng || undefined,
        dropoffLatLng: rideType === "One Way" ? (toLatLng || undefined) : undefined,
        distanceKm: distanceKm || undefined,
      });

      // Navigate to book-ride page
      router.push("/book-ride");
    } catch (e) {
      setIsBooking(false);
      console.error(e);
    }
  };

  // Handler for tab switching
  const handleTabClick = (newRideType: RideType) => {
    console.log("Tab clicked:", newRideType);
    setRideType(newRideType);
  };

  return (
    <div className="rounded-xl w-full shadow-lg">

      {/* === TABS EXACT LIKE DESIGN === */}
      <div className="flex mb-4 gap-3">
        <button
          type="button"
          onClick={() => handleTabClick("One Way")}
          className={`w-1/2 md:w-auto px-8 py-3 font-semibold md:text-lg text-md rounded-full transition-colors
            ${rideType === "One Way"
              ? "bg-[#C9A961] text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
        >
          Trip Rate
        </button>

        <button
          type="button"
          onClick={() => handleTabClick("By the Hour")}
          className={`w-1/2 md:w-auto px-8 py-3 font-semibold md:text-lg text-md rounded-full transition-colors
            ${rideType === "By the Hour"
              ? "bg-[#C9A961] text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
        >
          Hourly Rate
        </button>
      </div>


      {/* === FIELDS: STACKED ON MOBILE, INLINE ON DESKTOP === */}
      <div className="flex bg-white flex-col md:flex-row items-stretch md:items-center md:rounded-full rounded-xl gap-4 p-4 md:p-6">

        {/* Pickup */}
        <div className="w-full md:flex-1 bg-white border border-gray-300 rounded-lg relative  flex items-center px-4 py-1">
          <IoLocation size={20} className="text-gray-500 mr-3 flex-shrink-0" />
          <div className="flex flex-col w-full">
            <span className="text-xs text-gray-500 mb-1">Pickup Location</span>

            <Autocomplete
  onLoad={(ac) => (fromAutocompleteRef.current = ac)}
  onPlaceChanged={onFromPlaceChanged}
  options={autocompleteOptions}
>
  <input
    className="w-full border-none outline-none text-sm font-medium text-gray-900"
    placeholder={fromPlaceholder}
    defaultValue={fromLocation}   // <-- FIXED
    onFocus={() => setFromFocused(true)}
    onBlur={() => setFromFocused(false)}
  />
</Autocomplete>

          </div>
        </div>

        {/* Drop-off - Only show for Trip Rate */}
        {rideType === "One Way" && (
          <div className="w-full md:flex-1 bg-white border border-gray-300 rounded-lg relative  flex items-center px-4 py-1">
            <MdLocationOff size={20} className="text-gray-500 mr-3 flex-shrink-0" />
            <div className="flex flex-col w-full">
              <span className="text-xs text-gray-500 mb-1">Drop-Off Location</span>

              <Autocomplete
  onLoad={(ac) => (toAutocompleteRef.current = ac)}
  onPlaceChanged={onToPlaceChanged}
  options={autocompleteOptions}
>
  <input
    className="w-full border-none outline-none text-sm font-medium text-gray-900"
    placeholder={toPlaceholder}
    defaultValue={toLocation}   // <-- FIXED
    onFocus={() => setToFocused(true)}
    onBlur={() => setToFocused(false)}
  />
</Autocomplete>

            </div>
          </div>
        )}

        {/* Date */}
        <div
          className="w-full md:flex-1 bg-white border border-gray-300 rounded-lg relative  flex items-center px-4 py-1 cursor-pointer"
          ref={dateFieldRef}
          onClick={() => setShowDatePicker(true)}
        >
          <FaRegCalendarDays size={18} className="text-gray-500 mr-3 flex-shrink-0" />
          <div className="flex flex-col w-full">
            <span className="text-xs text-gray-500 mb-1">Date</span>
            <span className="text-sm font-medium text-gray-900">{pickupDate || "Select Date"}</span>
          </div>

          {showDatePicker && (
            <CalendarPicker
              currentMonth={currentMonth}
              pickupDate={pickupDate}
              onDateSelect={handleDateSelect}
              onNavigateMonth={navigateMonth}
            />
          )}
        </div>

        {/* Duration - Only for Hourly */}
        {rideType === "By the Hour" && (
          <div className="w-full md:flex-1 bg-white border border-gray-300 rounded-lg  flex items-center px-4 py-1">
            <MdOutlineAccessTimeFilled size={20} className="text-gray-500 mr-3 flex-shrink-0" />
            <div className="flex flex-col w-full">
              <span className="text-xs text-gray-500 mb-1">Duration</span>
              <select
                className="w-full bg-transparent outline-none text-sm font-medium text-gray-900"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              >
                {["1","2","3","4","5","6","7","8"].map(h => (
                  <option key={h} value={h}>{h} Hours</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Time - Show for both Trip Rate and Hourly */}
        <div className="w-full md:flex-1 relative" ref={timeFieldRef}>
          <div
            className="bg-white border border-gray-300 rounded-lg  flex items-center px-4 py-1 cursor-pointer"
            onClick={() => setShowTimePicker(true)}
          >
            <MdOutlineAccessTimeFilled size={20} className="text-gray-500 mr-3 flex-shrink-0" />
            <div className="flex flex-col w-full">
              <span className="text-xs text-gray-500 mb-1">Time</span>
              <span className="text-sm font-medium text-gray-900">
              {pickupTime || "Select Time"}
              </span>
            </div>
          </div>

          {showTimePicker && (
            <TimePicker
              selectedHour={selectedHour}
              selectedMinute={selectedMinute}
              selectedSecond={selectedSecond}
              onHourChange={setSelectedHour}
              onMinuteChange={setSelectedMinute}
              onSecondChange={setSelectedSecond}
              onConfirm={handleTimeConfirm}
            />
          )}
        </div>

        {/* Book Now Button */}
        <Button
          label="BOOK NOW"
          className="w-full md:w-auto rounded-full h-[50px] px-10 bg-primary hover:bg-[#B89851] text-white font-semibold "
          onClick={handleBookNow}
          disabled={isBooking}
          isLoading={isBooking}
        />

      </div>
    </div>
  );
};

const GoogleMapsBooking: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <BookingSection />
    </LoadScript>
  );
};

export default GoogleMapsBooking;
