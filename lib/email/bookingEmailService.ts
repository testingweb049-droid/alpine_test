// /src/lib/email/bookingEmailService.ts
import { sendEmail } from "./emailClient";
import { adminBookingTemplate } from "./templates/adminBooking";
import { userBookingTemplate } from "./templates/userBooking";

export const BookingEmailService = {
  async sendBookingEmail({
    fullName,
    email,
    reservationNumber,
    bookingData,
  }: {
    fullName: string;
    email: string;
    reservationNumber: string;
    bookingData: Record<string, any>;
  }) {
    // Admin notification
    await sendEmail({
      to: process.env.EMAIL_USER || "no-reply@alpine-prestige-rides.ch",
      subject: `New Booking Completed: ${reservationNumber}`,
      html: adminBookingTemplate({ fullName, email, reservationNumber, bookingData }),
    });

    // User confirmation
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://alpine-prestige-rides.ch";
    await sendEmail({
      to: email,
      subject: `Booking Confirmation - ${reservationNumber}`,
      html: userBookingTemplate(fullName, reservationNumber, bookingData, baseUrl),
    });
  },
};
