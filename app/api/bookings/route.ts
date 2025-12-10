import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { bookings } from "@/db/schema/bookings";
import { BookingEmailService } from "@/lib/email/bookingEmailService";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

// ---------- DATE PARSER ----------
function parseCustomDate(dateStr: string): string {
  const months: Record<string, string> = {
    January: "01", February: "02", March: "03", April: "04",
    May: "05", June: "06", July: "07", August: "08",
    September: "09", October: "10", November: "11", December: "12",
  };

  // Try native date first
  const dt = new Date(dateStr);
  if (!isNaN(dt.getTime())) {
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  }

  // Handle format: "21. November 2025"
  const cleaned = dateStr.replaceAll(".", "");
  const parts = cleaned.trim().split(" ");

  if (parts.length === 3) {
    const day = parts[0].padStart(2, "0");
    const month = months[parts[1]];
    const year = parts[2];
    if (month) return `${year}-${month}-${day}`;
  }

  throw new Error(`Invalid date: ${dateStr}`);
}

// ---------- API HANDLER ----------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, bookingData, reservationNumber, paymentStatus } = body;

    if (!action) {
      return NextResponse.json({ message: "Missing action" }, { status: 400 });
    }

    // ---------- CREATE BOOKING ----------
    // Creates booking with pending status (before payment)
    if (action === "create") {
      const reservation = `ALP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      if (!bookingData) {
        return NextResponse.json({ message: "Missing bookingData" }, { status: 400 });
      }

      // Get optional checkout session ID for tracking
      const { checkoutSessionId } = body;

      const sanitizedBookingData = {
        rate_type: bookingData.rateType,
        pickup_location: bookingData.pickupLocation,
        dropoff_location: bookingData.dropoffLocation,
        pickup_lat_lng: bookingData.pickupLatLng || null,
        dropoff_lat_lng: bookingData.dropoffLatLng || null,
        distance_km: bookingData.distanceKm || null,

        selected_vehicle: bookingData.selectedVehicle || null,
        selected_vehicle_name: bookingData.selectedVehicleName || null,
        selected_vehicle_price: bookingData.selectedVehiclePrice || null,

        date: parseCustomDate(bookingData.date),
        time: bookingData.time,
        duration: bookingData.duration || null,

        full_name: bookingData.fullName || null,
        email: bookingData.email || null,
        phone_number: bookingData.phoneNumber || null,

        passengers: bookingData.passengers || null,
        luggage: bookingData.luggage || null,

        infant_seats: bookingData.infantSeats || 0,
        child_seats: bookingData.childSeats || 0,
        booster_seats: bookingData.boosterSeats || 0,

        flight_number: bookingData.flightNumber || null,
        notes: bookingData.notes || null,

        total_price: bookingData.totalPrice || null,
        reservation_number: reservation,
        payment_intent_id: checkoutSessionId || null, // Store checkout session ID temporarily
        booking_confirmed: false, // Will be confirmed after payment
        payment_status: "pending", // Payment is pending
      };

      const [createdBooking] = await db
        .insert(bookings)
        .values(sanitizedBookingData)
        .returning();

      return NextResponse.json({
        message: "Booking created. Awaiting payment.",
        booking: createdBooking,
      });
    }

    // ---------- CONFIRM PAYMENT ----------
    // Verifies Stripe session and updates booking after successful payment
    if (action === "confirm-payment") {
      const { sessionId, reservationNumber } = body;

      if (!sessionId && !reservationNumber) {
        return NextResponse.json({ 
          success: false,
          message: "Session ID or reservation number is required" 
        }, { status: 400 });
      }

      let finalReservationNumber = reservationNumber;
      let paymentIntentId: string | null = null;

      // If sessionId provided, verify payment with Stripe
      if (sessionId) {
        try {
          if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("Stripe configuration error");
          }

          // Retrieve and verify the checkout session
          const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["payment_intent"],
          });

          // Verify payment was successful
          if (session.payment_status !== "paid") {
            return NextResponse.json({
              success: false,
              message: `Payment status: ${session.payment_status}. Payment was not successful.`,
            }, { status: 400 });
          }

          // Get reservation number from metadata
          finalReservationNumber = session.metadata?.reservation_number || reservationNumber;

          if (!finalReservationNumber) {
            return NextResponse.json({
              success: false,
              message: "Reservation number not found in session metadata",
            }, { status: 400 });
          }

          // Get payment intent ID
          paymentIntentId = typeof session.payment_intent === "string" 
            ? session.payment_intent 
            : session.payment_intent?.id || null;
        } catch (err) {
          console.error("Stripe session verification error:", err);
          return NextResponse.json({
            success: false,
            message: "Failed to verify payment session",
            error: err instanceof Error ? err.message : "Unknown error",
          }, { status: 500 });
        }
      }

      if (!finalReservationNumber) {
        return NextResponse.json({ 
          success: false,
          message: "Reservation number is required" 
        }, { status: 400 });
      }

      // Update booking to confirmed status
      const updateData: any = {
        payment_status: "success",
        booking_confirmed: true,
      };

      if (paymentIntentId) {
        updateData.payment_intent_id = paymentIntentId;
      }

      const [updatedBooking] = await db
        .update(bookings)
        .set(updateData)
        .where(eq(bookings.reservation_number, finalReservationNumber))
        .returning();

      if (!updatedBooking) {
        return NextResponse.json({ 
          success: false,
          message: "Booking not found" 
        }, { status: 404 });
      }

      // Send confirmation email
      await BookingEmailService.sendBookingEmail({
        fullName: updatedBooking.full_name!,
        email: updatedBooking.email!,
        reservationNumber: updatedBooking.reservation_number!,
        bookingData: updatedBooking,
      });

      return NextResponse.json({
        success: true,
        booking: updatedBooking,
      });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json(
      {
        message: "Server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
