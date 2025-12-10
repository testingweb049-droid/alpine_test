import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { bookings } from "@/db/schema/bookings";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

// ---------- GET BOOKING BY RESERVATION NUMBER OR SESSION ID ----------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reservationNumber, sessionId } = body;

    if (!reservationNumber && !sessionId) {
      return NextResponse.json(
        { message: "Please provide reservationNumber or sessionId in the request body" },
        { status: 400 }
      );
    }

    let booking;

    if (sessionId) {
      // Fetch booking by Stripe session ID
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const paymentIntentId = typeof session.payment_intent === "string" 
          ? session.payment_intent 
          : session.payment_intent?.id;

        if (paymentIntentId) {
          [booking] = await db
            .select()
            .from(bookings)
            .where(eq(bookings.payment_intent_id, paymentIntentId));
        }
      } catch (stripeErr) {
        console.error("Stripe session retrieval error:", stripeErr);
      }
    }

    // Fallback to reservation number if session lookup didn't work
    if (!booking && reservationNumber) {
      [booking] = await db
        .select()
        .from(bookings)
        .where(eq(bookings.reservation_number, reservationNumber));
    }

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });

  } catch (err) {
    console.error("Get Booking API error:", err);
    return NextResponse.json(
      {
        message: "Server error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
