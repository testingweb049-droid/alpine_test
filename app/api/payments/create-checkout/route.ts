import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, bookingData, reservationNumber } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "Stripe configuration error" },
        { status: 500 }
      );
    }

    // Get the base URL for success/cancel URLs
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "chf",
            product_data: {
              name: `Alpine Prestige Rides - ${bookingData?.selectedVehicleName || "Booking"}`,
              description: `Booking from ${bookingData?.pickupLocation || ""} to ${bookingData?.dropoffLocation || ""}`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: bookingData?.email || undefined,
      metadata: {
        // Store reservation number for easy lookup
        reservation_number: reservationNumber || "",
      },
      success_url: `${origin}/book-ride/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book-ride?canceled=true`,
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (err) {
    console.error("Checkout Session creation error:", err);
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

