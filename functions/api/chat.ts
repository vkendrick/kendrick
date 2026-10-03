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

  let body: { messages?: ChatMsg[]; stage?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "JSON inválido" }, 400);
  }
  const clean = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.text === "string")
    .slice(-12)
    .map((m) => ({ role: m.role, text: m.text.slice(0, 500) }));
  if (!clean.length) return json({ error: "Sin mensajes" }, 400);

  const geminiRes = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM }] },
        contents: clean.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.text }],
        })),
        generationConfig: { responseMimeType: "application/json", temperature: 0.7, maxOutputTokens: 300 },
      }),
    }
  ).catch(() => null);
  if (!geminiRes || !geminiRes.ok) return json({ error: "Error IA", up: geminiRes ? geminiRes.status : 0 }, 502);

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
