interface Env {
  GOOGLE_SHEETS_API_KEY: string;
  GOOGLE_SHEETS_SPREADSHEET_ID: string;
  GOOGLE_SHEETS_LEADS_RANGE: string;
  GOOGLE_SHEETS_CONTACTS_RANGE: string;
  RESEND_API_KEY?: string;
  OWNER_EMAIL?: string;
  CALLMEBOT_APIKEY?: string;
}

interface ContactData {
  name: string;
  email: string;
  company?: string;
  message: string;
  consent: boolean;
}

const WA_NUMBER = "34658598442";

async function appendToSheet(env: Env, range: string, values: (string | number)[][]) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${env.GOOGLE_SHEETS_SPREADSHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&key=${env.GOOGLE_SHEETS_API_KEY}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Google Sheets API error: ${error}`);
  }
  
  return response.json();
}

async function sendWhatsApp(env: Env, message: string) {
  if (!env.CALLMEBOT_APIKEY) return;
  const encoded = encodeURIComponent(message);
  await fetch(
    `https://api.callmebot.com/whatsapp.php?phone=${WA_NUMBER}&text=${encoded}&apikey=${env.CALLMEBOT_APIKEY}`
  ).catch(console.error);
}

async function sendEmail(env: Env, to: string, subject: string, html: string) {
  if (!env.RESEND_API_KEY) {
    console.log(`[EMAIL SIMULADO] Para: ${to} | Asunto: ${subject}`);
    return;
  }
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Kendrick Consultoria Digital <veridiana@kendrick.com>",
      to: [to],
      subject,
      html,
    }),
  });
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestPost = async ({ request, env }: { request: Request; env: Env; params: unknown }) => {
  try {
    const data = await request.json() as ContactData;

    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: "Datos incompletos" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!data.consent) {
      return new Response(JSON.stringify({ error: "Se requiere consentimiento" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const timestamp = new Date().toISOString();

    // Guardar en Google Sheets
    await appendToSheet(env, env.GOOGLE_SHEETS_CONTACTS_RANGE, [[
      timestamp,
      data.name,
      data.email,
      data.company ?? "",
      data.message,
      data.consent ? "Sí" : "No",
    ]]);

    // Notificación por WhatsApp (no bloqueante)
    const waMsg = `📩 Nuevo contacto web\n👤 ${data.name}\n📧 ${data.email}${data.company ? `\n🏢 ${data.company}` : ""}\n💬 ${data.message.slice(0, 200)}${data.message.length > 200 ? "..." : ""}`;
    sendWhatsApp(env, waMsg).catch(console.error);

    // Notificación por email (no bloqueante)
    const html = `<div style="font-family:Arial,sans-serif;max-width:500px;padding:24px;background:#0B2545;border-radius:4px;">
  <h2 style="color:#C5A880;margin:0 0 16px;">📩 Nuevo mensaje de contacto</h2>
  <p style="color:#fff;margin:4px 0;"><strong>Nombre:</strong> ${data.name}</p>
  <p style="color:#fff;margin:4px 0;"><strong>Email:</strong> ${data.email}</p>
  ${data.company ? `<p style="color:#fff;margin:4px 0;"><strong>Empresa:</strong> ${data.company}</p>` : ""}
  <p style="color:#fff;margin:16px 0 4px;"><strong>Mensaje:</strong></p>
  <p style="color:#e5e7eb;margin:0;line-height:1.6;">${data.message}</p>
</div>`;
    const ownerEmail = env.OWNER_EMAIL ?? "veridiana@kendrick.com";
    sendEmail(env, ownerEmail, `Contacto web: ${data.name}`, html).catch(console.error);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    console.error("Error en /api/contact:", err);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

export const onRequestOptions = async () =>
  new Response(null, {
    status: 204,
    headers: corsHeaders,
  });