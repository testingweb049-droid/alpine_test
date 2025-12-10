-- Migration: Add payment_intent_id column to alpine_bookings table
-- Date: 2024
-- Description: Adds payment_intent_id field to track Stripe PaymentIntent IDs for refunds and verification

-- Add payment_intent_id column (nullable, as existing records won't have this)
ALTER TABLE alpine_bookings 
ADD COLUMN IF NOT EXISTS payment_intent_id TEXT;

-- Add comment to document the column
COMMENT ON COLUMN alpine_bookings.payment_intent_id IS 'Stripe PaymentIntent ID for tracking payments and enabling refunds';

