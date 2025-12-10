export const adminBookingTemplate = ({
  fullName,
  email,
  reservationNumber,
  bookingData,
}: {
  fullName: string;
  email: string;
  reservationNumber: string;
  bookingData: Record<string, any>;
}) => {
  const safePrice = bookingData.total_price ? Number(bookingData.total_price).toFixed(2) : "0.00";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin:0; padding:0; background:#f4f4f4; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    table { border-collapse: collapse; width: 100%; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); text-align: center; padding: 40px 30px; color: #fff; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
    .reservation-banner { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px 30px; }
    .reservation-banner table td { vertical-align: middle; }
    .section-title { font-size: 20px; font-weight: 600; color: #1e3a8a; margin: 0 0 15px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
    .detail-row { padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
    .detail-label { font-size: 13px; color: #6b7280; margin: 0 0 4px 0; font-weight: 600; }
    .detail-value { font-size: 15px; color: #111827; margin: 0; font-weight: 500; }
    .price-section { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); border-radius: 8px; padding: 20px; text-align: center; color: #fff; }
    .price-section p { margin: 0; }
    .footer { background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
  </style>
</head>
<body>
  <table role="presentation">
    <tr>
      <td align="center">
        <table role="presentation" class="wrapper">

          <!-- Header -->
          <tr>
            <td class="header">
              <img src="https://alpine-prestige-rides.ch/_next/image?url=%2Flogo.png&w=256&q=75" alt="Alpine Prestige Rides" style="max-width:180px; height:auto; margin-bottom:20px;">
              <h1>New Booking Received</h1>
            </td>
          </tr>

          <!-- Reservation Info -->
          <tr>
            <td class="reservation-banner">
              <table role="presentation" style="width:100%;">
                <tr>
                  <td style="width:50%;">
                    <p class="detail-label">Reservation Number</p>
                    <p class="detail-value">${reservationNumber}</p>
                  </td>
                  <td style="width:50%; text-align:right;">
                    <p class="detail-label">Status</p>
                    <p class="detail-value" style="color:#15803d;">PENDING</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Information -->
          <tr>
            <td style="padding:30px;">
              <h2 class="section-title">Customer Information</h2>
              <div class="detail-row">
                <p class="detail-label">Full Name</p>
                <p class="detail-value">${fullName}</p>
              </div>
              <div class="detail-row">
                <p class="detail-label">Email Address</p>
                <p class="detail-value"><a href="mailto:${email}" style="color:#3b82f6; text-decoration:none;">${email}</a></p>
              </div>
            </td>
          </tr>

          <!-- Booking Details -->
          <tr>
            <td style="padding:0 30px 30px 30px;">
              <h2 class="section-title">Booking Details</h2>

              <div class="detail-row">
                <p class="detail-label">Pickup Location</p>
                <p class="detail-value">${bookingData.pickup_location || "-"}</p>
              </div>
              <div class="detail-row">
                <p class="detail-label">Dropoff Location</p>
                <p class="detail-value">${bookingData.dropoff_location || "-"}</p>
              </div>
              <div class="detail-row">
                <p class="detail-label">Date</p>
                <p class="detail-value">${bookingData.date || "-"}</p>
              </div>
              <div class="detail-row">
                <p class="detail-label">Time</p>
                <p class="detail-value">${bookingData.time || "-"}</p>
              </div>
              <div class="detail-row">
                <p class="detail-label">Vehicle</p>
                <p class="detail-value">${bookingData.selected_vehicle_name || bookingData.selected_vehicle || "-"}</p>
              </div>
              <div class="detail-row">
                <p class="detail-label">Passengers</p>
                <p class="detail-value">${bookingData.passengers || 0}</p>
              </div>
              <div class="detail-row">
                <p class="detail-label">Luggage</p>
                <p class="detail-value">${bookingData.luggage || 0}</p>
              </div>
              <div class="detail-row">
                <p class="detail-label">Flight Number</p>
                <p class="detail-value">${bookingData.flight_number || "-"}</p>
              </div>
              ${
                bookingData.notes
                  ? `<div class="detail-row">
                      <p class="detail-label">Special Notes</p>
                      <p class="detail-value">${bookingData.notes}</p>
                    </div>`
                  : ""
              }
            </td>
          </tr>

          <!-- Total Price -->
          <tr>
            <td style="padding:0 30px 30px 30px;">
              <div class="price-section">
                <p>Total Amount</p>
                <p style="font-size:32px; font-weight:bold;">CHF ${safePrice}</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              This is an automated notification from Alpine Prestige Rides.<br>
              Please review and confirm this booking in your admin dashboard.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
