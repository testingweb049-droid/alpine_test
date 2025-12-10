import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/emailClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, date, message } = body || {};

    if (!name || !email || !service || !date) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const adminHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;">
        <div style="background:#0f172a;color:#fff;padding:24px;text-align:center;">
          <h2 style="margin:0;font-size:20px;font-weight:600;">New Davos Quote Request</h2>
        </div>
        <div style="padding:24px;color:#1e293b;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "-"}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Message:</strong><br/>${message || "(No message)"}</p>
        </div>
      </div>
    `;

    const userHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;">
        <div style="background:#0f172a;color:#fff;padding:24px;text-align:center;">
          <h2 style="margin:0;font-size:20px;font-weight:600;">Your Davos Quote Request</h2>
        </div>
        <div style="padding:24px;color:#1e293b;">
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for your request. Our team will contact you within 24 hours with a personalized quotation.</p>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: process.env.EMAIL_USER || "no-reply@alpine-prestige-rides.ch",
        subject: `Davos Quote Request — ${name}`,
        html: adminHtml,
      });
    } catch {}

    try {
      await sendEmail({
        to: email,
        subject: "We received your Davos quotation request",
        html: userHtml,
      });
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
