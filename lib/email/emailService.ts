import { sendEmail } from "./emailClient";
import { adminContactTemplate } from "./templates/adminContact";
import { userContactTemplate } from "./templates/userContact";

export const EmailService = {
  async sendContactEmail({
    name,
    email,
    subject,
    message,
  }: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    // Send email to admin
    await sendEmail({
      to: process.env.EMAIL_USER || "no-reply@alpine-prestige-rides.ch",
      subject: `New Contact Form Submission: ${subject}`,
      html: adminContactTemplate({ name, email, subject, message }),
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: "Thank You for Contacting Alpine",
      html: userContactTemplate(name),
    });
  },
};
