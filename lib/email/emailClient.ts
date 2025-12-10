import nodemailer from "nodemailer";

export const emailClient = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "asmtp.mail.hostpoint.ch",  
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // Use STARTTLS with port 587
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,     
  },
  requireTLS: true, // Force STARTTLS
});

export async function sendEmail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    await emailClient.sendMail({
      from: `"Alpine" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  }