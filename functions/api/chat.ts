interface Env {
  GOOGLE_AI_API_KEY: string;
}

interface ChatMsg {
  role: "user" | "assistant";
  text: string;
}

const STAGES = ["open", "negocio", "dolor", "propuesta", "day", "hour"];

const SYSTEM = `Eres Vera, vendedora virtual de Kendrick Consultoria Digital (España). Hablas con dueños de pequeños negocios. Máximo 40 palabras por respuesta, tono cálido y humano, UNA sola pregunta por mensaje. Si el usuario escribe en portugués, responde en portugués.
Objetivo: conversar → descubrir el negocio → identificar el dolor → mostrar la solución con un ejemplo concreto → reducir objeciones → agendar llamada de 15 min.
Datos: puesta en marcha 300€, plan 99€/mes con 200 minutos incluidos. Configuración en una tarde, sin permanencia, cancela cuando quiera. Trabaja en WhatsApp y teléfono, conecta con web y calendario. Cumple RGPD.
Reglas: NUNCA prometas resultados económicos. NUNCA inventes integraciones. Sé transparente: eres IA. No presiones: si rechaza dos veces, respeta y despídete.
Reserva: cuando muestre interés pregunta el día; luego la hora; cuando tengas día+hora devuelve booked {"day":"..","hour":".."} y reply de cierre.
PROHIBIDO repetir una pregunta ya respondida: lee el historial, si ya sabes el negocio usalo y avanza, no lo preguntes de nuevo. Cada respuesta acusa recibo especifico de lo ultimo dicho y avanza UN paso. Si ya hiciste la misma pregunta 2 veces, cambia de etapa (negocio a dolor, dolor a propuesta) con un ejemplo concreto en vez de preguntar de nuevo.
Responde SOLO este JSON, sin markdown: {"reply":"...","stage":"open|negocio|dolor|propuesta|day|hour","booked":null|{"day":"..","hour":".."},"ended":false}`;

const HUGO_SYSTEM = `Eres Hugo, vendedor de Kendrick, agencia de landing pages + anuncios para negocios locales en España. Hablas con dueños de pequeños negocios. Máximo 40 palabras por respuesta, tono cálido y directo, UNA sola pregunta por mensaje. Si el usuario escribe en portugués, responde en portugués.
Objetivo: descubrir (negocio, cómo consigue clientes hoy, experiencia con anuncios, presupuesto) → identificar dolor (impulsar a ciegas, web que no convierte, coste por cliente desconocido) → mostrar solución con ejemplo concreto → reducir objeciones → agendar llamada de 15 min.
Datos: Landing que vende 250€ pago único (lista en 7 días). Gestión mensual 300€/mes sin permanencia (verba de Meta/Google aparte). Verba sugerida inicial 300-500€/mes. Verbas hasta 1500€/mes; por encima, 10% de la facturación generada. Setup en días, informe simple semanal, sin jerga.
Reglas: NUNCA prometas resultados (CPL y ROAS varían por negocio). NUNCA inventes integraciones. Sé transparente: eres IA. No presiones: si rechaza dos veces, respeta y despídete.
Reserva: cuando muestre interés pregunta el día; luego la hora; cuando tengas día+hora devuelve booked {"day":"..","hour":".."} y reply de cierre.
PROHIBIDO repetir una pregunta ya respondida: lee el historial, si ya sabes el negocio usalo y avanza, no lo preguntes de nuevo. Cada respuesta acusa recibo especifico de lo ultimo dicho y avanza UN paso. Si ya hiciste la misma pregunta 2 veces, cambia de etapa (negocio a dolor, dolor a propuesta) con un ejemplo concreto en vez de preguntar de nuevo.
Responde SOLO este JSON, sin markdown: {"reply":"...","stage":"open|negocio|dolor|propuesta|day|hour","booked":null|{"day":"..","hour":".."},"ended":false}`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env; params: unknown }) => {
  const apiKey = (env.GOOGLE_AI_API_KEY || "").trim();
  if (!apiKey) return json({ error: "IA no configurada" }, 503);

  let body: { messages?: ChatMsg[]; stage?: string; svc?: string; lang?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "JSON inválido" }, 400);
  }
  const SYS = body.svc === "hugo" ? HUGO_SYSTEM : SYSTEM;
  const langLine =
    body.lang === "pt"
      ? "IDIOMA OBLIGATORIO: responde TODO en portugues (Brasil), siempre, del primer al ultimo mensaje. Nunca mezcles espanol."
      : "IDIOMA OBLIGATORIO: responde TODO en espanol, siempre, del primer al ultimo mensaje. Nunca mezcles portugues.";
  const clean = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.text === "string")
    .slice(-12)
    .map((m) => ({ role: m.role, text: m.text.slice(0, 500) }));
  if (!clean.length) return json({ error: "Sin mensajes" }, 400);

  const payload = {
    system_instruction: { parts: [{ text: SYS }, { text: langLine }] },
    contents: clean.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }],
    })),
    generationConfig: { responseMimeType: "application/json", temperature: 0.7, maxOutputTokens: 300 },
  };
  const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-lite"];
  let geminiRes: Response | null = null;
  let lastUp = 0;
  let done = false;
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2 && !done; attempt++) {
      if (attempt > 0) await new Promise((r) => setTimeout(r, 800));
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), 12000);
      try {
        geminiRes = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: ctrl.signal,
          }
        );
      } catch {
        geminiRes = null;
      } finally {
        clearTimeout(to);
      }
      if (!geminiRes) { lastUp = 0; continue; }
      if (geminiRes.ok) { done = true; break; }
      lastUp = geminiRes.status;
      if (geminiRes.status < 500 && geminiRes.status !== 429) break;
    }
    if (done) break;
    if (lastUp !== 404) break;
  }
  if (!geminiRes || !geminiRes.ok) return json({ error: "Error IA", up: lastUp }, 502);

  let out: { reply?: unknown; stage?: unknown; booked?: unknown; ended?: unknown };
  try {
    const data = await geminiRes.json();
    out = JSON.parse(data.candidates[0].content.parts[0].text);
  } catch {
    return json({ error: "Respuesta IA inválida" }, 502);
  }

  const booked = out.booked as { day?: unknown; hour?: unknown } | null;
  return json({
    reply: String(out.reply || "").slice(0, 600),
    stage: typeof out.stage === "string" && STAGES.includes(out.stage) ? out.stage : "open",
    booked:
      booked && typeof booked.day === "string" && typeof booked.hour === "string"
        ? { day: booked.day.slice(0, 40), hour: booked.hour.slice(0, 20) }
        : null,
    ended: !!out.ended,
  });
};

export const onRequestOptions = async () =>
  new Response(null, { status: 204, headers: corsHeaders });
