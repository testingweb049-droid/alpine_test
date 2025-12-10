-- Migration: Rename bookings table to alpine_bookings
-- Date: 2024
-- Description: Renames the bookings table to alpine_bookings for better naming convention

-- Rename the table if it exists
ALTER TABLE IF EXISTS bookings 
RENAME TO alpine_bookings;

-- Note: If the table doesn't exist yet, this migration will do nothing
-- and you can proceed with creating the alpine_bookings table directly

