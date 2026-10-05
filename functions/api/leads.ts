interface Env {
  GOOGLE_SHEETS_API_KEY: string;
  GOOGLE_SHEETS_SPREADSHEET_ID: string;
  GOOGLE_SHEETS_LEADS_RANGE: string; // e.g., "Leads!A:F"
  GOOGLE_SHEETS_CONTACTS_RANGE: string; // e.g., "Contacts!A:F"
  RESEND_API_KEY?: string;
  OWNER_EMAIL?: string;
  CALLMEBOT_APIKEY?: string;
}

interface LeadData {
  name: string;
  email: string;
  score: number;
  level: string;
  package: string;
  consent: boolean;
}

interface ContactData {
  name: string;
  email: string;
  company?: string;
  message: string;
  consent: boolean;
}

const WA_NUMBER = "34658598442";

const levelLabels: Record<string, string> = {
  invisible_digital: "Sin base lista",
  estructura_desconectada: "Listo para tráfico",
  optimizacion_escala: "Para escalar",
};

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

async function sendLeadEmail(env: Env, data: LeadData) {
  const label = levelLabels[data.level] ?? data.level;
  const diagnosis = levelDiagnosis[data.level] ?? [];
  const diagnosisHtml = diagnosis
    .map((d) => `<li style="margin-bottom:8px;color:#374151;">${d}</li>`)
    .join("");

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#0B2545;padding:32px 40px;">
      <p style="margin:0;color:#C5A880;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Kendrick Consultoria Digital</p>
      <h1 style="margin:12px 0 0;color:#fff;font-size:24px;font-weight:bold;">Tu diagnóstico está listo, ${data.name}</h1>
    </div>
    <div style="padding:32px 40px;border-bottom:1px solid #f0f0f0;">
      <p style="margin:0 0 8px;color:#C5A880;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Tu nivel de madurez digital</p>
      <h2 style="margin:0 0 8px;color:#0B2545;font-size:28px;font-weight:bold;">${label}</h2>
      <p style="margin:0;color:#6b7280;font-size:14px;">Puntuación: ${data.score}/15 puntos</p>
    </div>
    <div style="padding:32px 40px;background:#fafafa;border-bottom:1px solid #f0f0f0;">
      <p style="margin:0 0 16px;color:#0B2545;font-size:16px;font-weight:bold;">Lo que encontramos en tu negocio:</p>
      <ul style="margin:0;padding-left:20px;">${diagnosisHtml}</ul>
    </div>
    <div style="padding:32px 40px;border-bottom:1px solid #f0f0f0;">
      <p style="margin:0 0 8px;color:#C5A880;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Solución recomendada</p>
      <h3 style="margin:0 0 16px;color:#0B2545;font-size:20px;font-weight:bold;">${data.package}</h3>
      <a href="https://wa.me/34658598442?text=Hola%2C%20hice%20el%20diagn%C3%B3stico%20y%20me%20gustar%C3%ADa%20hablar%20sobre%20el%20${encodeURIComponent(data.package)}" style="display:inline-block;background:#25D366;color:#fff;padding:14px 28px;border-radius:4px;text-decoration:none;font-weight:bold;font-family:Arial,sans-serif;font-size:14px;">Hablar por WhatsApp →</a>
    </div>
    <div style="padding:24px 40px;background:#f9fafb;">
      <p style="margin:0;color:#9ca3af;font-size:12px;font-family:Arial,sans-serif;">Kendrick Consultoria Digital · veridiana@kendrick.com · +34 658 598 442</p>
      <p style="margin:8px 0 0;color:#9ca3af;font-size:11px;font-family:Arial,sans-serif;">Puedes darte de baja en cualquier momento respondiendo a este email con "Baja".</p>
    </div>
  </div>
</body>
</html>`;

  await sendEmail(env, data.email, `Tu diagnóstico digital: ${label}`, html);
}

async function notifyOwnerByWhatsApp(env: Env, data: LeadData) {
  const label = levelLabels[data.level] ?? data.level;
  const msg = `🎯 Nuevo lead del quiz!\n👤 ${data.name}\n📧 ${data.email}\n📊 ${label} (${data.score}/15)\n📦 ${data.package}`;
  await sendWhatsApp(env, msg);
}

async function notifyOwnerByEmail(env: Env, data: LeadData) {
  const label = levelLabels[data.level] ?? data.level;
  const html = `<div style="font-family:Arial,sans-serif;max-width:500px;padding:24px;background:#0B2545;border-radius:4px;">
  <h2 style="color:#C5A880;margin:0 0 16px;">🎯 Nuevo lead — ${label}</h2>
  <p style="color:#fff;margin:4px 0;"><strong>Nombre:</strong> ${data.name}</p>
  <p style="color:#fff;margin:4px 0;"><strong>Email:</strong> ${data.email}</p>
  <p style="color:#fff;margin:4px 0;"><strong>Puntuación:</strong> ${data.score}/15</p>
  <p style="color:#fff;margin:4px 0;"><strong>Nivel:</strong> ${label}</p>
  <p style="color:#fff;margin:4px 0;"><strong>Paquete recomendado:</strong> ${data.package}</p>
</div>`;
  const ownerEmail = env.OWNER_EMAIL ?? "veridiana@kendrick.com";
  await sendEmail(env, ownerEmail, `Nuevo lead: ${data.name} — ${label}`, html);
}

const levelDiagnosis: Record<string, string[]> = {
  invisible_digital: [
    "Sin página que convenza, poner dinero en anuncios es quemar verba",
    "Dependes solo del boca a boca para conseguir clientes",
    "Necesitas destino antes de tráfico",
  ],
  estructura_desconectada: [
    "Tienes base, pero sin flujo constante de clientes",
    "Cada semana sin campañas es una semana de boca a boca",
    "No sabes cuánto te cuesta cada cliente",
  ],
  optimizacion_escala: [
    "Tienes base y capacidad de inversión: hora de escalar",
    "Sin medir el costo por cliente, escalar da miedo",
    "Con control, cada euro extra trabaja para ti",
  ],
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestPost = async ({ request, env }: { request: Request; env: Env; params: unknown }) => {
  try {
    const data = await request.json() as LeadData;

    if (!data.name || !data.email || !data.level) {
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

    const packageName = data.package ?? levelLabels[data.level] ?? data.level;
    const timestamp = new Date().toISOString();

    // Guardar en Google Sheets
    await appendToSheet(env, env.GOOGLE_SHEETS_LEADS_RANGE, [[
      timestamp,
      data.name,
      data.email,
      data.score ?? 0,
      data.level,
      packageName,
      data.consent ? "Sí" : "No",
    ]]);

    // Notificaciones no bloqueantes
    notifyOwnerByWhatsApp(env, { ...data, package: packageName }).catch(console.error);
    notifyOwnerByEmail(env, { ...data, package: packageName }).catch(console.error);
    sendLeadEmail(env, { ...data, package: packageName }).catch(console.error);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    console.error("Error en /api/leads:", err);
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