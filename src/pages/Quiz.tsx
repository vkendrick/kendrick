import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";

// ─── PREGUNTAS ────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 1,
    question: "¿Qué pasa cuando alguien busca tu negocio en Google?",
    context: "Piensa en alguien que nunca ha oído hablar de ti y busca lo que ofreces en tu ciudad.",
    options: [
      { text: "No aparezco en ningún lado", points: 0 },
      { text: "Aparezco a veces, pero no siempre", points: 1 },
      { text: "Tengo ficha en Google Maps pero no web propia", points: 2 },
      { text: "Aparezco bien y tengo web y Google Maps actualizados", points: 3 },
    ],
  },
  {
    id: 2,
    question: "¿Cómo consigues la mayoría de tus clientes nuevos hoy?",
    context: "Sé honesto. ¿De dónde vienen realmente los clientes que te llaman o entran por la puerta?",
    options: [
      { text: "Solo por recomendaciones de amigos o familiares", points: 0 },
      { text: "Redes sociales, pero sin un sistema claro", points: 1 },
      { text: "Mezcla de redes, Google y boca a boca", points: 2 },
      { text: "Tengo un sistema que me trae clientes de forma regular", points: 3 },
    ],
  },
  {
    id: 3,
    question: "¿Qué pasa cuando alguien te contacta por internet?",
    context: "Un cliente potencial te escribe por Instagram, rellena un formulario o te llama. ¿Qué ocurre después?",
    options: [
      { text: "Le respondo cuando puedo, a veces tarde", points: 0 },
      { text: "Respondo rápido pero no tengo un proceso definido", points: 1 },
      { text: "Tengo un proceso básico pero no está automatizado", points: 2 },
      { text: "Tengo respuestas automáticas y un proceso claro de seguimiento", points: 3 },
    ],
  },
  {
    id: 4,
    question: "¿Sabes cuánto te cuesta conseguir un cliente nuevo?",
    context: "¿Tienes alguna idea de cuánto dinero o tiempo inviertes por cada cliente que consigues?",
    options: [
      { text: "No tengo ni idea", points: 0 },
      { text: "Más o menos, pero no lo mido", points: 1 },
      { text: "Lo sé aproximadamente para algunos canales", points: 2 },
      { text: "Lo mido con exactitud y lo optimizo regularmente", points: 3 },
    ],
  },
  {
    id: 5,
    question: "¿Estás invirtiendo en publicidad online ahora mismo?",
    context: "Publicidad de pago en Facebook, Instagram, Google, etc.",
    options: [
      { text: "No, nunca lo he hecho", points: 0 },
      { text: "Lo he probado pero sin resultados claros", points: 1 },
      { text: "Sí, pero no estoy seguro de si funciona bien", points: 2 },
      { text: "Sí, y tengo datos claros de qué funciona y qué no", points: 3 },
    ],
  },
];

// ─── RESULTADOS ───────────────────────────────────────────────────────────────

type LevelKey = "invisible_digital" | "estructura_desconectada" | "optimizacion_escala";

const RESULTS: Record<LevelKey, {
  label: string;
  emoji: string;
  subtitle: string;
  description: string;
  diagnosis: string[];
  package: { name: string; price: string; duration: string; description: string; deliverables: string[] };
  calendlyUrl: string;
  color: string;
  accentColor: string;
}> = {
  invisible_digital: {
    label: "Invisible Digital",
    emoji: "🔍",
    subtitle: "Tu negocio necesita una base sólida",
    description:
      "Tu negocio tiene potencial, pero todavía no tiene lo mínimo para que los clientes te encuentren online. Cada día sin presencia digital es un cliente que se va a la competencia.",
    color: "from-slate-700 to-slate-900",
    accentColor: "#C5A880",
    diagnosis: [
      "El 87% de tus clientes potenciales te buscan en Google antes de llamar — y no te encuentran",
      "Dependes del boca a boca, lo que hace que tus ingresos sean impredecibles",
      "No tienes forma de conseguir clientes mientras duermes o estás ocupado",
    ],
    package: {
      name: "Arranque Digital Mínimo",
      price: "€450 – €600",
      duration: "4 semanas",
      description:
        "Construimos tu presencia digital desde cero: una página web que convierte visitas en clientes, tu negocio visible en Google y un sistema que puedes mantener en 15 minutos por semana.",
      deliverables: [
        "Página web de una sola pantalla, lista para recibir clientes",
        "Tu negocio visible en Google Maps y búsquedas locales",
        "Botón de WhatsApp para que los clientes te contacten al instante",
        "Guía de 15 minutos semanales para mantener tu presencia activa",
        "Informe completo de cómo está tu negocio online hoy (PDF)",
      ],
    },
    calendlyUrl: "https://calendly.com/kendrick-consultoria/arranque-digital",
  },
  estructura_desconectada: {
    label: "Estructura Desconectada",
    emoji: "🔗",
    subtitle: "Tienes presencia, pero no sistema",
    description:
      "Estás en internet, pero tus herramientas no trabajan juntas. Los clientes interesados se pierden porque no hay un proceso claro. Con el sistema correcto, podrías triplicar tu captación sin más esfuerzo.",
    color: "from-blue-900 to-slate-900",
    accentColor: "#C5A880",
    diagnosis: [
      "Tus herramientas digitales no están conectadas — cada una funciona por su lado",
      "Estás perdiendo entre el 60-70% de los clientes interesados por falta de seguimiento",
      "No sabes qué canal te trae más clientes ni cuánto te cuesta cada uno",
    ],
    package: {
      name: "Estructura de Ventas Integrada",
      price: "€850 – €1.200",
      duration: "6 semanas",
      description:
        "Conectamos todas tus herramientas, automatizamos el seguimiento de clientes y creamos un sistema que convierte interesados en clientes de forma predecible.",
      deliverables: [
        "Revisión completa de tu web y redes (qué funciona y qué no)",
        "Sistema de seguimiento de clientes (CRM: Brevo o HubSpot gratuito)",
        "3 emails automáticos que se envían solos cuando alguien te contacta",
        "Instalación de píxeles para saber de dónde vienen tus clientes",
        "Panel de control en Notion para ver tus ventas de un vistazo",
        "Sesión de formación de 90 minutos (grabada)",
      ],
    },
    calendlyUrl: "https://calendly.com/kendrick-consultoria/estructura-ventas",
  },
  optimizacion_escala: {
    label: "Optimización y Escala",
    emoji: "🚀",
    subtitle: "Listo para crecer con publicidad",
    description:
      "Tienes una base sólida. Ahora es el momento de invertir en publicidad para crecer más rápido. Te ayudamos a hacerlo bien desde el principio para no desperdiciar dinero.",
    color: "from-[#0B2545] to-blue-950",
    accentColor: "#C5A880",
    diagnosis: [
      "Tu base digital está lista, pero sin publicidad tu crecimiento es lento",
      "Sin un sistema de medición claro, invertir en publicidad es arriesgado",
      "Tienes la oportunidad de multiplicar tus ingresos con la estrategia correcta",
    ],
    package: {
      name: "Mentoría de Crecimiento Avanzado",
      price: "€1.500 – €2.000",
      duration: "8 semanas",
      description:
        "Diseñamos e implementamos tu estrategia de publicidad, optimizamos tu proceso de ventas y creamos los sistemas de medición que te permiten crecer con confianza.",
      deliverables: [
        "Configuración completa de publicidad en Facebook/Instagram y Google",
        "Panel en tiempo real para ver qué anuncios funcionan y cuáles no",
        "Manual personalizado de crecimiento (PDF 20+ páginas)",
        "Revisiones cada 2 semanas para ajustar y mejorar",
        "Estrategia para llegar a personas similares a tus mejores clientes",
      ],
    },
    calendlyUrl: "https://calendly.com/kendrick-consultoria/mentoria-crecimiento",
  },
};

function getLevel(score: number): LevelKey {
  if (score <= 4) return "invisible_digital";
  if (score <= 9) return "estructura_desconectada";
  return "optimizacion_escala";
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

type Step = "landing" | "quiz" | "capture" | "result";

export default function Quiz() {
  const [step, setStep] = useState<Step>("landing");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", consent: false });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ level: LevelKey; score: number } | null>(null);

  // totalScore calculado no momento da captura

  const handleAnswer = (points: number) => setSelected(points);

  const nextQuestion = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("capture");
    }
  };

  const prevQuestion = () => {
    if (currentQ === 0) { setStep("landing"); return; }
    setCurrentQ(currentQ - 1);
    setAnswers(answers.slice(0, -1));
    setSelected(null);
  };

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) { toast.error("Debes aceptar la política de privacidad para continuar"); return; }
    const score = answers.reduce((a, b) => a + b, 0);
    const level = getLevel(score);
    const pkg = RESULTS[level].package.name;
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, score, level, package: pkg, consent: form.consent }),
      });
    } catch {
      // No bloqueamos si falla el guardado
    } finally {
      setSubmitting(false);
      setResult({ level, score });
      setStep("result");
    }
  };

  const restart = () => {
    setStep("landing"); setCurrentQ(0); setAnswers([]); setSelected(null);
    setForm({ name: "", email: "", consent: false }); setResult(null);
  };

  // ── LANDING DEL QUIZ ──
  if (step === "landing") {
    return (
      <div className="min-h-screen bg-[#0B2545] flex items-center justify-center px-6 py-20">
        <div className="max-w-lg w-full text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white mb-10 transition-colors">
            ← Volver al inicio
          </Link>
          <span className="inline-block text-[#C5A880] text-xs tracking-[3px] uppercase font-sans font-semibold mb-4">
            Diagnóstico gratuito
          </span>
          <h1 className="text-white text-4xl font-bold mb-4 leading-tight">
            ¿En qué punto está tu negocio online?
          </h1>
          <p className="text-white/70 text-base leading-relaxed mb-8">
            5 preguntas simples. 3 minutos. Al final te decimos exactamente qué necesita tu negocio para conseguir más clientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            {["✓ Gratis", "✓ Sin compromiso", "✓ Resultado inmediato"].map((item) => (
              <span key={item} className="text-white/60 text-sm font-sans">{item}</span>
            ))}
          </div>
          <button
            onClick={() => setStep("quiz")}
            className="inline-flex items-center gap-2 bg-[#C5A880] text-[#0B2545] font-bold px-8 py-4 rounded text-sm hover:bg-[#d4bc9a] transition-all active:scale-[0.97]"
          >
            Empezar el diagnóstico <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ ──
  if (step === "quiz") {
    const q = QUESTIONS[currentQ];
    // progress usado inline abaixo
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 py-20">
        <div className="max-w-xl w-full">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-gray-400 font-sans mb-2">
              <span>Pregunta {currentQ + 1} de {QUESTIONS.length}</span>
              <span>{Math.round(((currentQ + 1) / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full">
              <div
                className="h-1.5 bg-[#C5A880] rounded-full transition-all duration-500"
                style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Pregunta */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-[#0B2545] text-xl font-bold mb-2 leading-snug">{q.question}</h2>
            {q.context && (
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{q.context}</p>
            )}
            <div className="space-y-3">
              {q.options.map((opt) => (
                <button
                  key={opt.text}
                  onClick={() => handleAnswer(opt.points)}
                  className={`w-full text-left px-5 py-4 rounded-lg border-2 text-sm transition-all duration-150 ${
                    selected === opt.points
                      ? "border-[#0B2545] bg-[#0B2545]/5 text-[#0B2545] font-semibold"
                      : "border-gray-200 text-gray-700 hover:border-[#C5A880] hover:bg-[#FAF8F5]"
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={prevQuestion}
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-gray-600 transition-colors"
              >
                <ArrowLeft size={15} /> Anterior
              </button>
              <button
                onClick={nextQuestion}
                disabled={selected === null}
                className="flex items-center gap-2 bg-[#0B2545] text-white font-semibold text-sm px-6 py-2.5 rounded disabled:opacity-40 hover:bg-[#1a3a6b] transition-colors"
              >
                {currentQ < QUESTIONS.length - 1 ? "Siguiente" : "Ver mi resultado"} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── CAPTURA DE DATOS ──
  if (step === "capture") {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🎯</div>
              <h2 className="text-[#0B2545] text-2xl font-bold mb-2">¡Ya tenemos tu diagnóstico!</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Déjanos tu nombre y email para enviarte el resultado detallado y el plan de acción personalizado.
              </p>
            </div>
            <form onSubmit={handleCapture} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-sans">Tu nombre *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0B2545] transition-colors"
                  placeholder="¿Cómo te llamas?"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-sans">Tu email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0B2545] transition-colors"
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
                <span className="text-xs text-gray-500 leading-relaxed">
                  Acepto recibir mi diagnóstico y comunicaciones de Kendrick Consultoria Digital según la{" "}
                  <Link to="/privacidad" target="_blank" className="text-[#0B2545] underline">
                    Política de Privacidad
                  </Link>.
                </span>
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#C5A880] text-[#0B2545] font-bold py-3.5 rounded-lg text-sm hover:bg-[#d4bc9a] transition-colors disabled:opacity-60"
              >
                {submitting ? "Un momento..." : "Ver mi diagnóstico →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTADO ──
  if (step === "result" && result) {
    const r = RESULTS[result.level];
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        {/* Header resultado */}
        <div className={`bg-gradient-to-br ${r.color} text-white py-16 px-6`}>
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block text-[#C5A880] text-xs tracking-[3px] uppercase font-sans font-semibold mb-4">
              Tu diagnóstico
            </span>
            <div className="text-5xl mb-4">{r.emoji}</div>
            <h1 className="text-4xl font-bold mb-2">{r.label}</h1>
            <p className="text-white/70 text-base mb-4">{r.subtitle}</p>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm">
              Puntuación: <strong>{result.score}/15</strong>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
          {/* Descripción */}
          <div className="bg-white rounded-xl p-7 border border-gray-100 shadow-sm">
            <p className="text-gray-700 text-base leading-relaxed">{r.description}</p>
          </div>

          {/* Diagnóstico */}
          <div className="bg-white rounded-xl p-7 border border-gray-100 shadow-sm">
            <h2 className="text-[#0B2545] font-bold text-lg mb-4">Lo que encontramos en tu negocio:</h2>
            <ul className="space-y-3">
              {r.diagnosis.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-[#C5A880] font-bold mt-0.5 shrink-0">→</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Paquete recomendado */}
          <div className="bg-[#0B2545] rounded-xl p-7 text-white">
            <span className="text-[#C5A880] text-xs tracking-[2px] uppercase font-sans font-semibold">
              Solución recomendada
            </span>
            <h2 className="text-2xl font-bold mt-2 mb-2">{r.package.name}</h2>
            <div className="flex items-center gap-4 mb-4 text-white/60 text-sm font-sans">
              <span>{r.package.price}</span>
              <span>·</span>
              <span>{r.package.duration}</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-5">{r.package.description}</p>
            <ul className="space-y-2 mb-6">
              {r.package.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-white/80">
                  <CheckCircle2 size={14} className="text-[#C5A880] mt-0.5 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>

            {/* Calendly CTA */}
            <a
              href={r.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-[#C5A880] text-[#0B2545] font-bold py-4 rounded-lg text-sm hover:bg-[#d4bc9a] transition-colors"
            >
              Agendar sesión gratuita de 30 minutos →
            </a>
            <p className="text-white/40 text-xs text-center mt-3 font-sans">
              Sin compromiso · Solo una conversación sobre tu negocio
            </p>
          </div>

          {/* Imagen */}
          <div className="rounded-xl overflow-hidden">
            <img
              src="/images/small-business-owner.jpg"
              alt="Dueño de pequeño negocio trabajando"
              className="w-full object-cover"
              style={{ maxHeight: 280 }}
            />
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={restart}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-semibold py-3 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              <RotateCcw size={14} /> Repetir el diagnóstico
            </button>
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 bg-[#0B2545] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#1a3a6b] transition-colors"
            >
              Ver todos los servicios →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
