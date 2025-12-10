import { create } from 'zustand';

export type RateType = 'trip' | 'hourly';

export interface BookingData {
  rateType: RateType;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  duration: string; // hours for hourly rate
  pickupLatLng?: { lat: number; lng: number };
  dropoffLatLng?: { lat: number; lng: number };
  distanceKm?: number; // distance in kilometers
  selectedVehicle?: string;
  selectedVehicleName?: string;
  selectedVehiclePrice?: number;
  // Passenger Information
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  countryCode?: string;
  passengers?: number;
  luggage?: number;
  // Additional Information
  flightNumber?: string;
  notes?: string;
  bookingType?: string; // Business, Personal, etc.
  // Extras
  infantSeats?: number;
  childSeats?: number;
  boosterSeats?: number;
  extraWaitingTime?: string;
  // Payment
  couponCode?: string;
  totalPrice?: number;
  // Confirmation
  reservationNumber?: string;
  bookingConfirmed?: boolean;
}

type BookingStep = 'fleet' | 'passengers';

interface BookingStore {
  bookingData: BookingData;
  currentStep: BookingStep;
  isEditing: boolean; // Flag to track if coming from edit/back
  setIsEditing: (isEditing: boolean) => void;
  updateBookingData: (data: Partial<BookingData>) => void;
  setRateType: (type: RateType) => void;
  setCurrentStep: (step: BookingStep) => void;
  resetBooking: () => void;
}

const initialBookingData: BookingData = {
  rateType: 'trip',
  pickupLocation: '',
  dropoffLocation: '',
  date: '',
  time: '',
  duration: '',
};

export const useBookingStore = create<BookingStore>((set) => ({
  bookingData: initialBookingData,
  currentStep: 'fleet',
  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),
  updateBookingData: (data) =>
    set((state) => ({
      bookingData: { ...state.bookingData, ...data },
    })),
  setRateType: (type) =>
    set((state) => ({
      bookingData: { ...state.bookingData, rateType: type },
    })),
  setCurrentStep: (step) =>
    set({ currentStep: step }),
  resetBooking: () =>
    set({
      bookingData: initialBookingData,
      currentStep: 'fleet',
      isEditing: false,
    }),
}));

