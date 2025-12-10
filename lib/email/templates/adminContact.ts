export function adminContactTemplate({
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
  const container = "max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;";
  const header = "background:#0f172a;padding:30px 20px;text-align:center;color:white;";
  const section = "padding:25px;background:#f8fafc;color:#1e293b;";
  const row = "margin-bottom:14px;font-size:15px;line-height:1.5;";
  const logoStyle = "max-width:150px;height:auto;margin-bottom:12px;";

  return `
  <div style="${container}">
    <!-- Header with Logo -->
    <div style="${header}">
      <img src="https://alpine-prestige-rides.ch/_next/image?url=%2Flogo.png&w=256&q=75" alt="Alpine Prestige Rides" style="${logoStyle}" />
      <h2 style="margin:0;font-weight:600;font-size:22px;">New Contact Form Submission</h2>
      <p style="margin:4px 0 0;font-size:13px;opacity:0.85;">Alpine Contact Portal</p>
    </div>

    <!-- Content Section -->
    <div style="${section}">
      <p style="${row}"><strong>Name:</strong> ${name}</p>
      <p style="${row}"><strong>Email:</strong> <a href="mailto:${email}" style="color:#3b82f6;text-decoration:none;">${email}</a></p>
      <p style="${row}"><strong>Subject:</strong> ${subject}</p>
      <p style="${row}"><strong>Message:</strong><br/>${message || "(No message provided)"}</p>

      <div style="margin-top:25px;font-size:13px;color:#64748b;">
        <hr style="border:0;border-top:1px solid #e2e8f0;margin:20px 0;" />
        <p style="margin:0;">This email was generated automatically by the Alpine Website Contact Portal.</p>
      </div>
    </div>
  </div>
  `;
}
