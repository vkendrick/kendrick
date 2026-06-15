interface Env {
  DB: D1Database;
  RESEND_API_KEY?: string;
  OWNER_EMAIL?: string;
}

interface LeadData {
  name: string;
  email: string;
  score: number;
  level: string;
  package: string;
  consent: boolean;
}

const levelLabels: Record<string, string> = {
  invisible_digital: "Invisible Digital",
  estructura_desconectada: "Estructura Desconectada",
  optimizacion_escala: "Optimización y Escala",
};

const levelDiagnosis: Record<string, string[]> = {
  invisible_digital: [
    "Tu negocio no aparece cuando alguien te busca en Google",
    "Dependes solo del boca a boca para conseguir clientes",
    "No tienes forma de captar clientes mientras duermes",
  ],
  estructura_desconectada: [
    "Tienes presencia online pero tus herramientas no trabajan juntas",
    "Estás perdiendo entre el 60-70% de los clientes interesados por falta de seguimiento",
    "No sabes qué canal te trae más clientes ni cuánto te cuesta cada uno",
  ],
  optimizacion_escala: [
    "Tu base digital está lista, pero sin publicidad pagada tu crecimiento es lento",
    "Sin un sistema de medición claro, invertir en publicidad es arriesgado",
    "Tienes la oportunidad de multiplicar tus ingresos con la estrategia correcta",
  ],
};

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
      <a href="https://kendrick.com/quiz" style="display:inline-block;background:#C5A880;color:#0B2545;padding:14px 28px;border-radius:4px;text-decoration:none;font-weight:bold;font-family:Arial,sans-serif;font-size:14px;">Agendar sesión gratuita →</a>
    </div>
    <div style="padding:24px 40px;background:#f9fafb;">
      <p style="margin:0;color:#9ca3af;font-size:12px;font-family:Arial,sans-serif;">Kendrick Consultoria Digital · veridiana@kendrick.com</p>
      <p style="margin:8px 0 0;color:#9ca3af;font-size:11px;font-family:Arial,sans-serif;">Puedes darte de baja en cualquier momento respondiendo a este email con "Baja".</p>
    </div>
  </div>
</body>
</html>`;

  await sendEmail(env, data.email, `Tu diagnóstico digital: ${label}`, html);
}

async function notifyOwner(env: Env, data: LeadData) {
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

export const onRequestPost = async ({ request, env }: { request: Request; env: Env; params: unknown }) => {
  // CORS
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const data = await request.json() as LeadData;

    // Validación básica
    if (!data.name || !data.email || !data.level || !data.package) {
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
      `INSERT INTO leads (name, email, score, level, package, consent) VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(data.name, data.email, data.score ?? 0, data.level, data.package, data.consent ? 1 : 0)
      .run();

    // Emails no bloqueantes
    sendLeadEmail(env, data).catch(console.error);
    notifyOwner(env, data).catch(console.error);

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
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
