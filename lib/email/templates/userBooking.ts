export const userBookingTemplate = (
    fullName: string,
    reservationNumber: string,
    bookingData: Record<string, any>,
    baseUrl: string = "https://alpine-prestige-rides.ch"
  ) => {
    const safePrice = bookingData.total_price
      ? Number(bookingData.total_price).toFixed(2)
      : "0.00";
  
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Your Booking Confirmation</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          background: #f8fafc;
          color: #1e293b;
        }
        .email-wrapper {
          max-width: 640px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }
        .header {
          background: #0f172a;
          padding: 30px 20px;
          text-align: center;
          color: white;
        }
        .logo {
          max-width: 150px;
          height: auto;
          margin-bottom: 12px;
        }
        .content {
          padding: 30px;
        }
        .section-title {
          font-size: 20px;
          font-weight: 600;
          margin-top: 40px;
          margin-bottom: 25px;
          color: #1e293b;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
        }
        .detail-row {
          margin-bottom: 20px;
        }
        .detail-label {
          font-size: 12px;
          text-transform: uppercase;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .detail-value {
          font-size: 15px;
          font-weight: 500;
          color: #1e293b;
        }
        .price-section {
          margin-top: 35px;
          padding: 28px;
          background: #f0fff4;
          border: 1px solid #c6f6d5;
          border-radius: 12px;
          text-align: center;
        }
        .footer {
          background: #0f172a;
          color: #a0aec0;
          padding: 30px;
          text-align: center;
          margin-top: 40px;
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        
        <!-- HEADER -->
        <div class="header">
          <img src="https://alpine-prestige-rides.ch/_next/image?url=%2Flogo.png&w=256&q=75" class="logo" />
          <p style="opacity: 0.85; margin-top: 10px;">Excellence in Luxury Transportation</p>
        </div>
  
        <!-- CONTENT -->
        <div class="content">
  
          <h2>Hello ${fullName},</h2>
          <p style="line-height: 1.7; margin-top: 10px;">
            Thank you for choosing Alpine Prestige Rides.<br />
            Your booking has been successfully confirmed.
          </p>
  
          <!-- RESERVATION NUMBER -->
          <div style="margin: 30px 0; text-align: center;">
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600;">
              Reservation Reference
            </div>
            <div style="font-size: 24px; font-weight: 700; font-family: monospace; margin-top: 8px;">
              ${reservationNumber}
            </div>
            <div style="margin-top: 20px;">
              <a href="${baseUrl}/order/${reservationNumber}" 
                 style="display: inline-block; background: #0f172a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
                View Booking Details
              </a>
            </div>
          </div>
  
          <!-- JOURNEY DETAILS -->
          <div class="section-title">Journey Details</div>
  
          <div class="detail-row">
            <div class="detail-label">Pickup Location</div>
            <div class="detail-value">${bookingData.pickup_location}</div>
          </div>
  
          <div class="detail-row">
            <div class="detail-label">Drop-off Location</div>
            <div class="detail-value">${bookingData.dropoff_location}</div>
          </div>
  
          <div class="detail-row">
            <div class="detail-label">Date</div>
            <div class="detail-value">${bookingData.date}</div>
          </div>
  
          <div class="detail-row">
            <div class="detail-label">Time</div>
            <div class="detail-value">${bookingData.time}</div>
          </div>
  
          <div class="detail-row">
            <div class="detail-label">Vehicle</div>
            <div class="detail-value">${bookingData.selected_vehicle_name || bookingData.selected_vehicle}</div>
          </div>
  
          <div class="detail-row">
            <div class="detail-label">Passengers</div>
            <div class="detail-value">${bookingData.passengers} person(s)</div>
          </div>
  
          <div class="detail-row">
            <div class="detail-label">Luggage</div>
            <div class="detail-value">${bookingData.luggage} piece(s)</div>
          </div>
  
          ${
            bookingData.flight_number
              ? `<div class="detail-row">
                  <div class="detail-label">Flight Number</div>
                  <div class="detail-value">${bookingData.flight_number}</div>
                </div>`
              : ""
          }
  
          ${
            bookingData.notes
              ? `<div class="detail-row" style="background:#f8fafc; border-left:4px solid #3b82f6; padding:12px; border-radius:6px;">
                  <div class="detail-label">Special Notes</div>
                  <div class="detail-value">${bookingData.notes}</div>
                </div>`
              : ""
          }
  
          <!-- PRICE -->
          <div class="price-section">
            <div style="text-transform: uppercase; color: #059669; font-weight: 600;">
              Total Price
            </div>
            <div style="font-size: 32px; font-weight: 700; color: #059669; margin-top: 6px;">
              CHF ${safePrice}
            </div>
          </div>
  
        </div>
  
        <!-- FOOTER -->
        <div class="footer">
          For any changes or inquiries:<br />
          <strong style="color: #e2e8f0;">+41 76 318 08 82</strong> •
          <strong style="color: #e2e8f0;">info@alpineprestigerides.com</strong>
  
          <div style="margin-top: 20px; color: #e2e8f0;">
            Best regards,<br />
            <strong>The Alpine Prestige Rides Team</strong>
          </div>
        </div>
  
      </div>
    </body>
    </html>
    `;
  };
  