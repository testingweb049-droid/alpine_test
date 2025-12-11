"use client";

import { useState, FormEvent, useMemo } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useBookingStore } from "@/store/bookingStore";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios/axiosInstance";

interface PaymentFormProps { amount: number; }

function PaymentForm({ amount }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { bookingData, updateBookingData } = useBookingStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found");
      setIsProcessing(false);
      return;
    }

    try {
      // 1️⃣ Create PaymentIntent on backend
      const intentResponse = await axiosInstance.post("/payments/create-intent", {
        amount: amount,
        bookingData: bookingData,
      });

      if (!intentResponse.data.clientSecret) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret, paymentIntentId } = intentResponse.data;

      // 2️⃣ Confirm payment with Stripe (this actually charges the card)
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: bookingData.fullName || "",
              email: bookingData.email || "",
              phone: bookingData.phoneNumber || "",
            },
          },
        }
      );

      if (confirmError) {
        // Handle specific payment errors
        let errorMessage = confirmError.message || "Payment failed";
        
        if (confirmError.type === "card_error") {
          switch (confirmError.code) {
            case "insufficient_funds":
              errorMessage = "Your card has insufficient funds. Please use a different card.";
              break;
            case "card_declined":
              errorMessage = "Your card was declined. Please try a different card.";
              break;
            case "expired_card":
              errorMessage = "Your card has expired. Please use a different card.";
              break;
            case "incorrect_cvc":
              errorMessage = "Your card's security code is incorrect.";
              break;
            case "processing_error":
              errorMessage = "An error occurred while processing your card. Please try again.";
              break;
            default:
              errorMessage = confirmError.message || "Payment failed. Please try again.";
          }
        }
        
        throw new Error(errorMessage);
      }

      // 3️⃣ Verify payment was successful
      if (paymentIntent?.status !== "succeeded") {
        throw new Error(`Payment status: ${paymentIntent?.status}. Payment was not successful.`);
      }

      // 4️⃣ Create booking only after successful payment
      const bookingResponse = await axiosInstance.post("/bookings", {
        action: "create",
        bookingData: { ...bookingData },
        paymentIntentId: paymentIntentId,
        paymentStatus: "success",
      });

      const reservationNumber = bookingResponse.data.booking.reservation_number;
      updateBookingData({ 
        reservationNumber,
        bookingConfirmed: true,
      });

      // 5️⃣ Redirect to success page
      router.push("/order-placed");
    } catch (err: any) {
      // Extract user-friendly error message
      const errorMessage = err.response?.data?.error || err.message || "Payment failed. Please try again.";
      setError(errorMessage);
      console.error("Payment error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = { 
    hidePostalCode: true,
    style: { 
      base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } }, 
      invalid: { color: "#9e2146" } 
    } 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <CardElement options={cardElementOptions} />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 bg-gray-900 text-white rounded-lg disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function StripePaymentForm({ amount }: PaymentFormProps) {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51SNFS1D27MfnLyAf9gvQPHv8ziSYKLw4UQzoIFKmYYiYIwM8dtj0LmTsoMX0fTwqhqQ5wDrUm0IJfXrtcz6ETZZ600bKmzJtz9";
  const stripePromise = useMemo(() => {
    if (!publishableKey) return null;
    return loadStripe(publishableKey);
  }, [publishableKey]);

  if (!publishableKey) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-sm text-red-700">
        Stripe publishable key is missing. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to enable checkout.
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div className="p-4 border rounded-lg text-sm text-gray-600">
        Preparing secure payment form...
      </div>
    );
  }

  const options: StripeElementsOptions = { 
    mode: "payment", 
    amount: Math.round(amount * 100), 
    currency: "chf",
    appearance: {
      theme: "stripe",
    },
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm amount={amount} />
    </Elements>
  );
}

