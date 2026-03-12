export async function onRequestPost(context: any) {
  const { request, env } = context;

  const body = await request.json();
  const { name, email, phone, message } = body;

  if (!name || !email || !phone || !message) {
    return new Response(
      JSON.stringify({ error: "Missing fields" }),
      { status: 400 }
    );
  }

  // Validate email format cơ bản (optional nhưng tốt)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400 });
  }

  const payload = {
    from: env.CONTACT_FROM_EMAIL,
    to: [env.CONTACT_TO_EMAIL],
    subject: `New contact from ${name}`,
    html: `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yêu cầu thuê Robot - RobotEvent</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fa; color: #333333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <!-- Container chính -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin:0; color: #ffffff; font-size: 28px; font-weight: 600;">
                YÊU CẦU THUÊ ROBOT
              </h1>
              <p style="margin: 8px 0 0; color: #e0e0ff; font-size: 16px;">
                Từ khách hàng tiềm năng - RobotEvent.vn
              </p>
            </td>
          </tr>
          
          <!-- Nội dung chính -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px; color: #555555;">
                Chào đội ngũ RobotEvent,
              </p>
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 32px; color: #555555;">
                Có một khách hàng vừa gửi yêu cầu thuê robot qua form liên hệ. Dưới đây là thông tin chi tiết:
              </p>

              <!-- Thông tin khách hàng - Card style -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9faff; border: 1px solid #e0e7ff; border-radius: 10px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 24px 28px;">
                    <table width="100%" cellpadding="8" cellspacing="0" border="0">
                      <tr>
                        <td style="width: 120px; font-weight: 600; color: #4a5568; font-size: 15px;">Họ và tên:</td>
                        <td style="color: #2d3748; font-size: 15px;">${name}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #4a5568; font-size: 15px;">Email:</td>
                        <td style="color: #2d3748; font-size: 15px;">${email}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #4a5568; font-size: 15px;">Số điện thoại:</td>
                        <td style="color: #2d3748; font-size: 15px;">${phone}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #4a5568; font-size: 15px; vertical-align: top; padding-top: 8px;">Nội dung yêu cầu:</td>
                        <td style="color: #2d3748; font-size: 15px; line-height: 1.5;">${message.replace(/\n/g, '<br>')}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 20px; color: #555555; text-align: center; font-style: italic;">
                Vui lòng liên hệ sớm với khách hàng để tư vấn và chốt đơn nhé!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; font-size: 14px; color: #718096; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px;">
                © ${new Date().getFullYear()} RobotEvent.vn - Dịch vụ cho thuê robot sự kiện & công nghiệp
              </p>
              <p style="margin: 0;">
                Email này được gửi tự động từ hệ thống liên hệ website.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();  // ← Quan trọng: đọc body error từ Resend
    console.error("Resend failed:", res.status, errorText);  // Log vào Cloudflare Worker logs

    let errorMsg = "Email failed";
    try {
      const errorJson = JSON.parse(errorText);
      errorMsg = errorJson.message || errorText;  // Lấy message rõ ràng hơn
    } catch {}

    return new Response(
      JSON.stringify({ error: errorMsg, status: res.status }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({ ok: true }),
    { status: 200 }
  );
}