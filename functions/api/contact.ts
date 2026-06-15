import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  DB: D1Database;
  RESEND_API_KEY?: string;
  OWNER_EMAIL?: string;
}

interface ContactData {
  name: string;
  email: string;
  company?: string;
  message: string;
  consent: boolean;
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

export const onRequestPost: (ctx: EventContext<Env, string, unknown>) => Promise<Response> = async ({ request, env }) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

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

    await env.DB.prepare(
      `INSERT INTO contacts (name, email, company, message, consent) VALUES (?, ?, ?, ?, ?)`
    )
      .bind(data.name, data.email, data.company ?? null, data.message, data.consent ? 1 : 0)
      .run();

    // Notificación al dueño
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
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
