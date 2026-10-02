import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";

// ─── PREGUNTAS ────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 1,
    question: "¿Qué pasa cuando alguien busca tu negocio en Google?",
    context: "Piensa en alguien que nunca ha oído hablar de ti.",
    options: [
      { text: "No aparezco en ningún lado", points: 0 },
      { text: "Aparezco a veces, pero no siempre", points: 1 },
      { text: "Tengo Google Maps pero no web propia", points: 2 },
      { text: "Aparezco bien con web y Google Maps actualizados", points: 3 },
    ],
  },
  {
    id: 2,
    question: "¿Cómo consigues la mayoría de tus clientes nuevos?",
    context: "¿De dónde vienen realmente los clientes que te contactan?",
    options: [
      { text: "Solo por recomendaciones de amigos o familiares", points: 0 },
      { text: "Redes sociales, pero sin un sistema claro", points: 1 },
      { text: "Mezcla de redes, Google y boca a boca", points: 2 },
      { text: "Tengo un sistema que me trae clientes regularmente", points: 3 },
    ],
  },
  {
    id: 3,
    question: "¿Qué pasa cuando alguien te contacta por internet?",
    context: "Un cliente potencial te escribe. ¿Qué ocurre después?",
    options: [
      { text: "Le respondo cuando puedo, a veces tarde", points: 0 },
      { text: "Respondo rápido pero sin proceso definido", points: 1 },
      { text: "Tengo un proceso básico pero no automatizado", points: 2 },
      { text: "Tengo respuestas automáticas y seguimiento claro", points: 3 },
    ],
  },
  {
    id: 4,
    question: "¿Sabes cuánto te cuesta conseguir un cliente nuevo?",
    context: "¿Cuánto dinero o tiempo inviertes por cada cliente?",
    options: [
      { text: "No tengo ni idea", points: 0 },
      { text: "Más o menos, pero no lo mido", points: 1 },
      { text: "Lo sé aproximadamente para algunos canales", points: 2 },
      { text: "Lo mido con exactitud y lo optimizo", points: 3 },
    ],
  },
  {
    id: 5,
    question: "¿Estás invirtiendo en publicidad online ahora mismo?",
    context: "Publicidad de pago en Facebook, Instagram, Google, etc.",
    options: [
      { text: "No, nunca lo he hecho", points: 0 },
      { text: "Lo he probado pero sin resultados claros", points: 1 },
      { text: "Sí, pero no sé si funciona bien", points: 2 },
      { text: "Sí, y tengo datos claros de qué funciona", points: 3 },
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
    label: "Invisible Digital",
    subtitle: "Tu negocio necesita una base sólida",
    insight: "El 87% de tus clientes potenciales te buscan en Google antes de llamar — y no te encuentran. Cada día sin presencia digital es un cliente que va a la competencia.",
    package: {
      step: "01",
      name: "Arranque Digital Mínimo",
      price: "€450 – €600",
      duration: "4 semanas",
      includes: [
        "Web de una página lista para recibir clientes",
        "Google Maps optimizado y verificado",
        "Botón WhatsApp directo",
        "Informe de situación digital (PDF)",
        "Guía de mantenimiento de 15 min/semana",
      ],
      nextLevel: "Cuando tengas la base, el Nivel 02 conecta todo en un sistema de ventas.",
    },
  },
  estructura_desconectada: {
    label: "Estructura Desconectada",
    subtitle: "Tienes presencia, pero no sistema",
    insight: "Estás en internet, pero tus herramientas no trabajan juntas. Estás perdiendo entre el 60-70% de los clientes interesados por falta de seguimiento.",
    package: {
      step: "02",
      name: "Estructura de Ventas Integrada",
      price: "€850 – €1.200",
      duration: "6 semanas",
      includes: [
        "Todo lo del Nivel 01 incluido",
        "Auditoría completa de web y redes",
        "CRM gratuito configurado (Brevo/HubSpot)",
        "3 emails automáticos de seguimiento",
        "Píxeles de seguimiento instalados",
        "Panel Notion con tus métricas clave",
        "Sesión de formación grabada (90 min)",
      ],
      nextLevel: "Con el sistema listo, el Nivel 03 multiplica resultados con publicidad.",
    },
  },
  optimizacion_escala: {
    label: "Optimización y Escala",
    subtitle: "Listo para crecer con publicidad",
    insight: "Tienes una base sólida. Ahora es el momento de invertir en publicidad para crecer más rápido. Sin un sistema de medición claro, invertir en publicidad es quemar dinero.",
    package: {
      step: "03",
      name: "Mentoría de Crecimiento Avanzado",
      price: "€1.500 – €2.000",
      duration: "8 semanas",
      includes: [
        "Todo lo del Nivel 02 incluido",
        "Publicidad en Facebook/Instagram y Google",
        "Panel en tiempo real de anuncios",
        "Revisiones quincenales de resultados",
        "Estrategia de audiencias similares",
        "Manual personalizado de crecimiento",
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
            ¿Dónde está tu negocio{" "}
            <span className="text-[#C5A880] italic">digitalmente?</span>
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
