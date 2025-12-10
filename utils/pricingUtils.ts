import {
  TRIP_RATE_PRICING,
  HOURLY_RATE_PRICING,
  TRIP_RATE_MIN_DISTANCE_KM,
  TRIP_RATE_MINIMUM_PRICING,
} from "./bookingConstants";

// Calculate prices for Trip Rate (per kilometer)
export const calcTripRatePrices = (distanceKm: number | null) => {
  // Fallback: if distance is unknown, show minimum prices
  if (distanceKm === null) {
    const out: Record<string, number> = {};
    Object.entries(TRIP_RATE_MINIMUM_PRICING).forEach(([vehicle, minPrice]) => {
      out[vehicle] = Math.round(minPrice * 100) / 100;
    });
    return out;
  }
  const out: Record<string, number> = {};
  const applyMinimum = distanceKm <= TRIP_RATE_MIN_DISTANCE_KM;
  const billableDistance = Math.max(distanceKm, TRIP_RATE_MIN_DISTANCE_KM);

  Object.entries(TRIP_RATE_PRICING).forEach(([vehicle, ratePerKm]) => {
    const minimumPrice = TRIP_RATE_MINIMUM_PRICING[vehicle];
    let price: number;

    if (applyMinimum && typeof minimumPrice === "number") {
      price = minimumPrice;
    } else {
      price = ratePerKm * billableDistance;
    }

    out[vehicle] = Math.round(price * 100) / 100;
  });
  return out;
};

// Calculate prices for Hourly Rate
export const calcHourlyRatePrices = (hours: number) => {
  const out: Record<string, number> = {};
  Object.entries(HOURLY_RATE_PRICING).forEach(([vehicle, ratePerHour]) => {
    const price = ratePerHour * hours;
    out[vehicle] = Math.round(price * 100) / 100;
  });
  return out;
};

// Build pricing based on rate type
export const buildPricing = (
  rateType: "trip" | "hourly",
  distanceKm: number | null,
  hours: string
) => {
  if (rateType === "trip") {
    return {
      type: "trip" as const,
      distanceKm: distanceKm ? Math.round(distanceKm * 100) / 100 : null,
      prices: calcTripRatePrices(distanceKm),
    };
  } else {
    const hrs = parseInt(hours, 10) || 1;
    return { 
      type: "hourly" as const, 
      hours: hrs, 
      prices: calcHourlyRatePrices(hrs) 
    };
  }
};

