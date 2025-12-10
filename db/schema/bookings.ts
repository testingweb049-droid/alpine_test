// /src/db/schema/bookings.ts
import { pgTable, serial, text, numeric, integer, jsonb, boolean, timestamp } from "drizzle-orm/pg-core";

export const bookings = pgTable("alpine_bookings", {
  id: serial("id").primaryKey(),
  rate_type: text("rate_type").notNull(),
  pickup_location: text("pickup_location").notNull(),
  dropoff_location: text("dropoff_location").notNull(),
  pickup_lat_lng: jsonb("pickup_lat_lng"),
  dropoff_lat_lng: jsonb("dropoff_lat_lng"),
  distance_km: numeric("distance_km"),
  selected_vehicle: text("selected_vehicle"),
  selected_vehicle_name: text("selected_vehicle_name"),
  selected_vehicle_price: numeric("selected_vehicle_price"),
  date: text("date").notNull(),
  time: text("time").notNull(),
  duration: text("duration"),
  full_name: text("full_name"),
  email: text("email"),
  phone_number: text("phone_number"),
  country_code: text("country_code"),
  passengers: integer("passengers"),
  luggage: integer("luggage"),
  flight_number: text("flight_number"),
  notes: text("notes"),
  booking_type: text("booking_type"),
  infant_seats: integer("infant_seats"),
  child_seats: integer("child_seats"),
  booster_seats: integer("booster_seats"),
  extra_waiting_time: text("extra_waiting_time"),
  coupon_code: text("coupon_code"),
  net_price: numeric("net_price"),
  vat: numeric("vat"),
  total_price: numeric("total_price"),
  reservation_number: text("reservation_number"),
  payment_intent_id: text("payment_intent_id"), // Stripe PaymentIntent ID for tracking and refunds
  booking_confirmed: boolean("booking_confirmed").default(false), // will be true after payment
  payment_status: text("payment_status").default("pending"), // pending / success / failed
  created_at: timestamp("created_at").defaultNow(),
});
