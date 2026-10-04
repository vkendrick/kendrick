interface Env {
  ELEVENLABS_API_KEY: string;
  ELEVENLABS_VOICE_ID?: string;
}

// Bella (multilíngue). Troque via env ELEVENLABS_VOICE_ID (IDs em elevenlabs.io → Voices).
const VOZ_PADRAO = "EXAVITQu4vr4xnSDxMaL";

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
  const apiKey = (env.ELEVENLABS_API_KEY || "").trim();
  if (!apiKey) return json({ error: "Voz no configurada" }, 503);

  let body: { text?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "JSON inválido" }, 400);
  }
  const text = String(body.text || "").slice(0, 600).trim();
  if (!text) return json({ error: "Sin texto" }, 400);

  const voice = ((env.ELEVENLABS_VOICE_ID || "").trim() || VOZ_PADRAO).replace(/[^A-Za-z0-9]/g, "");
  const r = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voice, {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  }).catch(() => null);
  if (!r || !r.ok) return json({ error: "Error voz", up: r ? r.status : 0 }, 502);

  return new Response(await r.blob(), {
    headers: { "Content-Type": "audio/mpeg", ...corsHeaders },
  });
};

export const onRequestOptions = async () =>
  new Response(null, { status: 204, headers: corsHeaders });
