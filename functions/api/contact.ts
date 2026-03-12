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
      <h2>Robot Rental Request</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b> ${message}</p>
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