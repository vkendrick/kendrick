import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";

// ─── PREGUNTAS ────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 1,
    question: "¿Anuncias tu negocio en internet hoy?",
    context: "Instagram, Google, Facebook... cualquier anuncio pago.",
    options: [
      { text: "No, nunca lo he hecho", points: 0 },
      { text: "Probé impulsar posts, sin resultado claro", points: 1 },
      { text: "Sí, pero sin control de lo que vuelve", points: 2 },
      { text: "Sí, y sé lo que me trae cada euro", points: 3 },
    ],
  },
  {
    id: 2,
    question: "¿Cuánto podrías invertir al mes en anuncios?",
    context: "La verba se paga directo a Meta/Google, no a nosotros.",
    options: [
      { text: "Menos de €300", points: 0 },
      { text: "Entre €300 y €800", points: 1 },
      { text: "Entre €800 y €2.000", points: 2 },
      { text: "Más de €2.000", points: 3 },
    ],
  },
  {
    id: 3,
    question: "¿Cómo llegan tus clientes hoy?",
    context: "¿De dónde vienen los que te contactan?",
    options: [
      { text: "Solo boca a boca", points: 0 },
      { text: "Redes sociales, sin sistema", points: 1 },
      { text: "Mezcla de redes y recomendaciones", points: 2 },
      { text: "Tengo un flujo que trae clientes siempre", points: 3 },
    ],
  },
  {
    id: 4,
    question: "¿Qué pasa cuando alguien te escribe por un anuncio?",
    context: "Un interesado hace clic y te contacta. ¿Y después?",
    options: [
      { text: "Respondo cuando puedo, a veces tarde", points: 0 },
      { text: "Respondo rápido pero sin proceso", points: 1 },
      { text: "Tengo un proceso básico de respuesta", points: 2 },
      { text: "Respuesta rápida + seguimiento claro", points: 3 },
    ],
  },
  {
    id: 5,
    question: "¿Tienes página para mandar los clics?",
    context: "Sin destino que convenza, el clic se pierde.",
    options: [
      { text: "No tengo nada", points: 0 },
      { text: "Sí, pero vieja y lenta", points: 1 },
      { text: "Sí, normalita", points: 2 },
      { text: "Sí, rápida y pensada para vender", points: 3 },
    ],
  },
];

// ─── RESULTADOS ───────────────────────────────────────────────────────────────

type LevelKey = "invisible_digital" | "estructura_desconectada" | "optimizacion_escala";

const RESULTS: Record<LevelKey, {
  label: string;
  subtitle: string;
  insight: string;
  package: {
    step: string;
    name: string;
    price: string;
    duration: string;
    includes: string[];
    nextLevel?: string;
  };
}> = {
  invisible_digital: {
    label: "Sin base lista",
    subtitle: "Necesitas destino antes de tráfico",
    insight: "Poner dinero en anuncios sin página que convenza es quemar verba: el clic llega y se va. Primero la base, después el tráfico.",
    package: {
      step: "01",
      name: "Landing que vende",
      price: "€250",
      duration: "7 días · pago único",
      includes: [
        "Página diseñada para convertir visitas en WhatsApps",
        "Botón de WhatsApp + medición de cada clic",
        "Rápida en móvil y lista para anuncios",
      ],
      nextLevel: "Con la landing lista, el tráfico pago (€300/mes) llena tu agenda.",
    },
  },
  estructura_desconectada: {
    label: "Listo para tráfico",
    subtitle: "Tienes base, falta flujo constante",
    insight: "Ya tienes con qué recibir clientes. Lo que falta es un flujo predecible: campañas optimizadas que traigan interesados cada semana.",
    package: {
      step: "02",
      name: "Tráfico gestionado",
      price: "€300/mes",
      duration: "mes a mes, sin permanencia",
      includes: [
        "Revisamos tu página antes de gastar un euro",
        "Campañas en Instagram y Google",
        "Optimización semanal + informe simple",
      ],
      nextLevel: "Con verba arriba de €1.500/mes, pasamos a 10% de la facturación generada.",
    },
  },
  optimizacion_escala: {
    label: "Para escalar",
    subtitle: "Verba y base: hora de crecer",
    insight: "Tienes base y capacidad de inversión. Aquí el juego es escala con control: saber exactamente cuánto cuesta cada cliente y subir la verba.",
    package: {
      step: "02",
      name: "Tráfico gestionado",
      price: "€300/mes",
      duration: "mes a mes · hasta 10% de facturación",
      includes: [
        "Campañas en Instagram y Google",
        "Optimización semanal + informe simple",
        "Escala controlada por costo por cliente",
      ],
    },
  },
};

function getLevel(score: number): LevelKey {
  if (score <= 4) return "invisible_digital";
  if (score <= 9) return "estructura_desconectada";
  return "optimizacion_escala";
}

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

type Step = "landing" | "quiz" | "capture" | "result";

export default function Quiz() {
  const [step, setStep] = useState<Step>("landing");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", consent: false });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ level: LevelKey; score: number } | null>(null);

  const handleAnswer = (points: number) => setSelected(points);

  const nextQuestion = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const totalScore = newAnswers.reduce((a, b) => a + b, 0);
      setResult({ level: getLevel(totalScore), score: totalScore });
      setStep("capture");
    }
  };

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) { toast.error("Debes aceptar la política de privacidad"); return; }
    setSubmitting(true);
    try {
      const totalScore = answers.reduce((a, b) => a + b, 0);
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          score: totalScore,
          level: result?.level,
          answers,
          consent: form.consent,
        }),
      });
      setStep("result");
    } catch {
      toast.error("Error al guardar. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    setStep("landing");
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setForm({ name: "", email: "", consent: false });
    setResult(null);
  };

  // ── LANDING ──
  if (step === "landing") {
    return (
      <div className="min-h-screen bg-[#0B2545] flex items-center justify-center px-6 py-20">
        <div className="max-w-lg w-full text-center">
          <span className="inline-block text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold mb-8">
            Diagnóstico gratuito
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-5">
            ¿Tu negocio está listo{" "}
            <span className="text-[#C5A880] italic">para anuncios?</span>
          </h1>
          <p className="text-white/50 text-base mb-10 leading-relaxed">
            5 preguntas · 3 minutos · Resultado personalizado
          </p>
          <button
            onClick={() => setStep("quiz")}
            className="inline-flex items-center gap-2 bg-[#C5A880] text-[#0B2545] font-bold px-10 py-4 rounded text-sm tracking-wide hover:bg-[#d4bc9a] transition-all active:scale-[0.97]"
          >
            Empezar diagnóstico <ArrowRight size={15} />
          </button>
          <p className="text-white/25 text-xs mt-5 font-sans">Sin registro · Sin tarjeta · Gratis</p>
        </div>
      </div>
    );
  }

  // ── QUIZ ──
  if (step === "quiz") {
    const q = QUESTIONS[currentQ];
    const progress = ((currentQ) / QUESTIONS.length) * 100;
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 py-20">
        <div className="max-w-xl w-full">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-gray-400 font-sans mb-2">
              <span>Pregunta {currentQ + 1} de {QUESTIONS.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C5A880] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <p className="text-gray-400 text-xs mb-4 font-sans">{q.context}</p>
            <h2 className="text-[#0B2545] text-xl font-bold mb-6 leading-snug">
              {q.question}
            </h2>

            <div className="space-y-3 mb-8">
              {q.options.map((opt) => (
                <button
                  key={opt.text}
                  onClick={() => handleAnswer(opt.points)}
                  className={`w-full text-left px-5 py-4 rounded-xl border text-sm transition-all duration-150 ${
                    selected === opt.points
                      ? "border-[#0B2545] bg-[#0B2545] text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#0B2545]/30"
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              {currentQ > 0 ? (
                <button
                  onClick={() => { setCurrentQ(currentQ - 1); setSelected(null); }}
                  className="flex items-center gap-1.5 text-gray-400 text-sm hover:text-gray-600 transition-colors"
                >
                  <ArrowLeft size={14} /> Anterior
                </button>
              ) : <div />}
              <button
                onClick={nextQuestion}
                disabled={selected === null}
                className="flex items-center gap-2 bg-[#0B2545] text-white font-bold px-7 py-3 rounded-lg text-sm disabled:opacity-30 hover:bg-[#1a3a6b] transition-all active:scale-[0.97]"
              >
                {currentQ < QUESTIONS.length - 1 ? "Siguiente" : "Ver resultado"}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── CAPTURA ──
  if (step === "capture") {
    return (
      <div className="min-h-screen bg-[#0B2545] flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#C5A880]/20 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={26} className="text-[#C5A880]" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">
              ¡Diagnóstico completado!
            </h2>
            <p className="text-white/50 text-sm">
              Introduce tu email para ver el resultado personalizado.
            </p>
          </div>

          <form onSubmit={handleCapture} className="bg-white rounded-2xl p-7 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-sans">Nombre *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2545] transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-sans">Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2545] transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="mt-0.5 shrink-0 accent-[#0B2545]"
              />
              <span className="text-xs text-gray-400 leading-relaxed">
                Acepto la{" "}
                <Link to="/privacidad" className="text-[#0B2545] underline hover:text-[#C5A880]" target="_blank">
                  Política de Privacidad
                </Link>
                . Usaremos tu email solo para enviarte el resultado.
              </span>
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#0B2545] text-white font-bold py-3.5 rounded-lg text-sm hover:bg-[#1a3a6b] transition-colors disabled:opacity-60 active:scale-[0.97]"
            >
              {submitting ? "Guardando..." : "Ver mi resultado →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── RESULTADO ──
  if (step === "result" && result) {
    const r = RESULTS[result.level];
    const pkg = r.package;

    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        {/* Header resultado */}
        <div className="bg-[#0B2545] py-16 px-6 text-center">
          <span className="inline-block text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold mb-4">
            Tu diagnóstico
          </span>
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
            {r.label}
          </h1>
          <p className="text-white/50 text-base">{r.subtitle}</p>
          <div className="inline-flex items-center gap-2 mt-5 bg-white/10 rounded-full px-5 py-2">
            <span className="text-white/60 text-xs font-sans">Puntuación:</span>
            <span className="text-[#C5A880] font-bold text-sm">{result.score} / 15</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-12 space-y-6">

          {/* Insight */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-[#0B2545] font-bold text-sm mb-3">Lo que encontramos</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{r.insight}</p>
          </div>

          {/* Paquete recomendado */}
          <div className="bg-[#0B2545] rounded-2xl p-7 text-white">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-[#C5A880] text-[10px] tracking-[3px] uppercase font-sans font-semibold">
                  Nivel {pkg.step} · Recomendado para ti
                </span>
                <h2 className="text-white text-xl font-bold mt-1">{pkg.name}</h2>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-[#C5A880] font-bold text-lg">{pkg.price}</p>
                <p className="text-white/40 text-xs font-sans">{pkg.duration}</p>
              </div>
            </div>

            <ul className="space-y-2.5 mb-6">
              {pkg.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-[#C5A880] mt-0.5 shrink-0" />
                  <span className="text-white/80 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <a
                href={`https://wa.me/34658598442?text=${encodeURIComponent(`Hola, hice el diagnóstico (${r.label}) y me gustaría hablar sobre ${pkg.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#25D366] text-white font-bold py-3.5 rounded-xl text-sm hover:bg-[#1ebe5d] transition-all active:scale-[0.97]"
              >
                Hablar por WhatsApp →
              </a>
              <a
                href={`mailto:veridiana@kendrick.com?subject=${encodeURIComponent(`Diagnóstico - ${pkg.name}`)}&body=${encodeURIComponent(`Hola, hice el diagnóstico y mi nivel es ${r.label}. Me gustaría saber más.`)}`}
                className="block text-center bg-[#0B2545] text-white font-bold py-3.5 rounded-xl text-sm hover:bg-[#1a3a6b] transition-all active:scale-[0.97]"
              >
                Enviar email →
              </a>
            </div>
          </div>

          {/* Próximo nivel */}
          {pkg.nextLevel && (
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="font-semibold text-[#0B2545]">¿Y después?</span>{" "}
                {pkg.nextLevel}
              </p>
            </div>
          )}

          {/* Acciones secundarias */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/casos"
              className="flex-1 text-center border-2 border-[#0B2545] text-[#0B2545] font-semibold py-3 rounded-xl text-sm hover:bg-[#0B2545] hover:text-white transition-all"
            >
              Ver casos de éxito
            </Link>
            <button
              onClick={restart}
              className="flex-1 flex items-center justify-center gap-2 text-gray-400 text-sm hover:text-gray-600 transition-colors"
            >
              <RotateCcw size={13} /> Repetir diagnóstico
            </button>
          </div>

          <p className="text-center text-gray-300 text-xs font-sans pt-2">
            ¿Prefieres escribir?{" "}
            <a href="mailto:veridiana@kendrick.com" className="text-[#0B2545] font-semibold hover:text-[#C5A880]">
              veridiana@kendrick.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return null;
}
