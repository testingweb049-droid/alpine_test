export type RideType = "One Way" | "By the Hour";

export const libraries: (("places" | "geometry"))[] = ["places", "geometry"];

// Pricing per kilometer for Trip Rate
export const TRIP_RATE_PRICING = {
  "Mercedes Benz E Class": 3.3, // Business Class
  "Mercedes Benz V Class": 4.0, // Van Class
  "Mercedes Benz S Class": 5.0, // First Class
  "Genesis G80 Electrified": 3.3, // Business/Electrified Class
};

export const TRIP_RATE_MIN_DISTANCE_KM = 20;

export const TRIP_RATE_MINIMUM_PRICING: Record<string, number> = {
  "Mercedes Benz E Class": 100,
  "Mercedes Benz V Class": 100,
  "Mercedes Benz S Class": 140,
  "Genesis G80 Electrified": 100,
};

// Pricing per hour for Hourly Rate
export const HOURLY_RATE_PRICING = {
  "Mercedes Benz E Class": 2, // Business Class
  "Mercedes Benz V Class": 100, // Van Class
  "Mercedes Benz S Class": 130, // First Class
  "Genesis G80 Electrified": 85, // Business/Electrified Class
};

export const FROM_SUGGESTIONS = [
  "Zürich",
  "Geneva",
  "Basel",
  "Bern",
  "Lucerne",
  "Interlaken",
  "Lugano",
  "Munich",
  "Swiss Alps (Zermatt, Verbier, St. Moritz, Davos, Gstaad)",
];

export const TO_SUGGESTIONS = [
  "Geneva",
  "Zürich",
  "Bern",
  "Basel",
  "Interlaken",
  "Lucerne",
  "Lugano",
  "Munich",
  "Swiss Alps (Zermatt, Verbier, St. Moritz, Davos, Gstaad)",
];


export const GOOGLE_MAPS_API_KEY = "AIzaSyAqDi1-wu_yreet3VyzvsWqzq6SXvbxQl8";

