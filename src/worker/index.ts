import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

type Bindings = {
  DB: D1Database;
  RESEND_API_KEY: string;
  OWNER_EMAIL: string;
  APP_NAME: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/api/*", cors());

// ─── HEALTH ──────────────────────────────────────────────────────────────────
app.get("/api/health", (c) => c.json({ ok: true }));

// ─── LEADS (QUIZ) ─────────────────────────────────────────────────────────────
const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  score: z.number().int().min(0).max(15),
  level: z.enum(["invisible_digital", "estructura_desconectada", "optimizacion_escala"]),
  package: z.string().min(2).max(100),
  consent: z.boolean(),
});

app.post("/api/leads", zValidator("json", leadSchema), async (c) => {
  const data = c.req.valid("json");
  if (!data.consent) return c.json({ error: "Se requiere consentimiento" }, 400);

  try {
    await c.env.DB.prepare(
      `INSERT INTO leads (name, email, score, level, package, consent) VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(data.name, data.email, data.score, data.level, data.package, data.consent ? 1 : 0)
      .run();

    // Email al lead (no bloqueante)
    sendLeadEmail(c.env, data).catch(console.error);
    // Notificación al dueño (no bloqueante)
    notifyOwner(c.env, data).catch(console.error);

    return c.json({ success: true });
  } catch (err) {
    console.error("Error guardando lead:", err);
    return c.json({ error: "Error interno" }, 500);
  }
});

// ─── CONTACTO ─────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  message: z.string().min(10).max(2000),
  consent: z.boolean(),
});

app.post("/api/contact", zValidator("json", contactSchema), async (c) => {
  const data = c.req.valid("json");
  if (!data.consent) return c.json({ error: "Se requiere consentimiento" }, 400);

  try {
    await c.env.DB.prepare(
      `INSERT INTO contacts (name, email, company, message, consent) VALUES (?, ?, ?, ?, ?)`
    )
      .bind(data.name, data.email, data.company ?? null, data.message, data.consent ? 1 : 0)
      .run();

    sendContactNotification(c.env, data).catch(console.error);
    return c.json({ success: true });
  } catch (err) {
    console.error("Error guardando contacto:", err);
    return c.json({ error: "Error interno" }, 500);
  }
});

// ─── EMAIL HELPERS ────────────────────────────────────────────────────────────
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

async function sendEmail(
  env: Bindings,
  to: string,
  subject: string,
  html: string
): Promise<void> {
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
      from: `Kendrick Consultoria Digital <veridiana@kendrick.com>`,
      to: [to],
      subject,
      html,
    }),
  });
}

async function sendLeadEmail(env: Bindings, data: z.infer<typeof leadSchema>) {
  const label = levelLabels[data.level] ?? data.level;
  const diagnosis = levelDiagnosis[data.level] ?? [];
  const diagnosisHtml = diagnosis
    .map((d) => `<li style="margin-bottom:8px;color:#374151;">${d}</li>`)
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background:#0B2545;padding:32px 40px;">
      <p style="margin:0;color:#C5A880;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Kendrick Consultoria Digital</p>
      <h1 style="margin:12px 0 0;color:#fff;font-size:24px;font-weight:bold;">Tu diagnóstico está listo, ${data.name}</h1>
    </div>
    <!-- Nivel -->
    <div style="padding:32px 40px;border-bottom:1px solid #f0f0f0;">
      <p style="margin:0 0 8px;color:#C5A880;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Tu nivel de madurez digital</p>
      <h2 style="margin:0 0 8px;color:#0B2545;font-size:28px;font-weight:bold;">${label}</h2>
      <p style="margin:0;color:#6b7280;font-size:14px;">Puntuación: ${data.score}/15 puntos</p>
    </div>
    <!-- Diagnóstico -->
    <div style="padding:32px 40px;background:#fafafa;border-bottom:1px solid #f0f0f0;">
      <p style="margin:0 0 16px;color:#0B2545;font-size:16px;font-weight:bold;">Lo que encontramos en tu negocio:</p>
      <ul style="margin:0;padding-left:20px;">${diagnosisHtml}</ul>
    </div>
    <!-- Paquete recomendado -->
    <div style="padding:32px 40px;border-bottom:1px solid #f0f0f0;">
      <p style="margin:0 0 8px;color:#C5A880;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Solución recomendada</p>
      <h3 style="margin:0 0 16px;color:#0B2545;font-size:20px;font-weight:bold;">${data.package}</h3>
      <a href="https://kendrick.com/quiz" style="display:inline-block;background:#C5A880;color:#0B2545;padding:14px 28px;border-radius:4px;text-decoration:none;font-weight:bold;font-family:Arial,sans-serif;font-size:14px;">Agendar sesión gratuita →</a>
    </div>
    <!-- Footer -->
    <div style="padding:24px 40px;background:#f9fafb;">
      <p style="margin:0;color:#9ca3af;font-size:12px;font-family:Arial,sans-serif;">Kendrick Consultoria Digital · veridiana@kendrick.com</p>
      <p style="margin:8px 0 0;color:#9ca3af;font-size:11px;font-family:Arial,sans-serif;">Puedes darte de baja en cualquier momento respondiendo a este email con "Baja".</p>
    </div>
  </div>
</body>
</html>`;

  await sendEmail(env, data.email, `Tu diagnóstico digital: ${label}`, html);
}

async function notifyOwner(env: Bindings, data: z.infer<typeof leadSchema>) {
  const label = levelLabels[data.level] ?? data.level;
  const html = `
<div style="font-family:Arial,sans-serif;max-width:500px;padding:24px;background:#0B2545;border-radius:4px;">
  <h2 style="color:#C5A880;margin:0 0 16px;">🎯 Nuevo lead — ${label}</h2>
  <p style="color:#fff;margin:4px 0;"><strong>Nombre:</strong> ${data.name}</p>
  <p style="color:#fff;margin:4px 0;"><strong>Email:</strong> ${data.email}</p>
  <p style="color:#fff;margin:4px 0;"><strong>Puntuación:</strong> ${data.score}/15</p>
  <p style="color:#fff;margin:4px 0;"><strong>Nivel:</strong> ${label}</p>
  <p style="color:#fff;margin:4px 0;"><strong>Paquete recomendado:</strong> ${data.package}</p>
</div>`;
  await sendEmail(env, env.OWNER_EMAIL ?? "veridiana@kendrick.com", `Nuevo lead: ${data.name} — ${label}`, html);
}

async function sendContactNotification(env: Bindings, data: z.infer<typeof contactSchema>) {
  const html = `
<div style="font-family:Arial,sans-serif;max-width:500px;padding:24px;background:#0B2545;border-radius:4px;">
  <h2 style="color:#C5A880;margin:0 0 16px;">📩 Nuevo mensaje de contacto</h2>
  <p style="color:#fff;margin:4px 0;"><strong>Nombre:</strong> ${data.name}</p>
  <p style="color:#fff;margin:4px 0;"><strong>Email:</strong> ${data.email}</p>
  ${data.company ? `<p style="color:#fff;margin:4px 0;"><strong>Empresa:</strong> ${data.company}</p>` : ""}
  <p style="color:#fff;margin:16px 0 4px;"><strong>Mensaje:</strong></p>
  <p style="color:#e5e7eb;margin:0;line-height:1.6;">${data.message}</p>
</div>`;
  await sendEmail(env, env.OWNER_EMAIL ?? "veridiana@kendrick.com", `Contacto web: ${data.name}`, html);
}

export default app;
