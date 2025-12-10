import { NextRequest, NextResponse } from "next/server";
import { EmailService } from "@/lib/email/emailService";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await EmailService.sendContactEmail({ name, email, subject, message });

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { message: "Failed to send emails" },
      { status: 500 }
    );
  }
}
