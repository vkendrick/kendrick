import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

// ─── DATOS ────────────────────────────────────────────────────────────

const STATS = [
  { value: "+120", label: "Negocios ayudados" },
  { value: "3×", label: "Más clientes" },
  { value: "4 sem.", label: "Primeros resultados" },
  { value: "98%", label: "Satisfacción" },
];

// Paquetes diseñados como escalera progresiva — cada nivel incluye el anterior
const PACKAGES = [
  {
    step: "01",
    name: "Arranque Digital Mínimo",
    price: "€450 – €600",
    duration: "4 semanas",
    tagline: "Sin presencia online",
    badge: null,
    highlight: false,
    includes: [
      "Web de una página lista para recibir clientes",
      "Google Maps optimizado y verificado",
      "Botón WhatsApp directo",
      "Informe de situación digital (PDF)",
      "Guía de mantenimiento de 15 min/semana",
    ],
    cta: "Empezar desde cero",
    note: null,
  },
  {
    step: "02",
    name: "Estructura de Ventas Integrada",
    price: "€850 – €1.200",
    duration: "6 semanas",
    tagline: "Presencia sin sistema",
    badge: "Más solicitado",
    highlight: true,
    includes: [
      "Todo lo del Nivel 01 +",
      "Auditoría completa de web y redes",
      "CRM gratuito configurado (Brevo/HubSpot)",
      "3 emails automáticos de seguimiento",
      "Píxeles de seguimiento instalados",
      "Panel Notion con tus métricas clave",
      "Sesión de formación grabada (90 min)",
    ],
    cta: "Conectar mi negocio",
    note: null,
  },
  {
    step: "03",
    name: "Mentoría de Crecimiento Avanzado",
    price: "€1.500 – €2.000",
    duration: "8 semanas",
    tagline: "Listo para escalar",
    badge: null,
    highlight: false,
    includes: [
      "Todo lo del Nivel 02 +",
      "Publicidad en Facebook/Instagram y Google",
      "Panel en tiempo real de anuncios",
      "Revisiones quincenales de resultados",
      "Estrategia de audiencias similares",
      "Manual personalizado de crecimiento",
    ],
    cta: "Escalar con publicidad",
    note: "El presupuesto de publicidad (lo que pagas a Meta/Google) no está incluido.",
  },
];

// Portafolio visual — resultados concretos por sector
const PORTFOLIO = [
  {
    initials: "AT",
    color: "#0B2545",
    business: "FisioVida Madrid",
    sector: "Fisioterapia",
    package: "Nivel 01",
    metric: "+6 pacientes/mes",
    detail: "De 0 a Top 3 en Google en 4 semanas",
  },
  {
    initials: "MS",
    color: "#7c3aed",
    business: "Barbería Don Mateo",
    sector: "Barbería · Sevilla",
    package: "Nivel 01",
    metric: "23 reservas online/mes",
    detail: "12 años de negocio, cero presencia digital",
  },
  {
    initials: "LF",
    color: "#0e7490",
    business: "LinguaFlow",
    sector: "Academia de idiomas",
    package: "Nivel 02",
    metric: "+€1.200/mes",
    detail: "Sistema de captación automatizado",
  },
  {
    initials: "RA",
    color: "#b45309",
    business: "Reyes Arquitectura",
    sector: "Arquitectura · Valencia",
    package: "Nivel 02",
    metric: "3× más presupuestos",
    detail: "Embudo de leads desde LinkedIn y web",
  },
  {
    initials: "DL",
    color: "#be185d",
    business: "Pastelería Dulce Luna",
    sector: "Pastelería artesanal",
    package: "Nivel 01",
    metric: "+40% ventas online",
    detail: "Instagram + Google Maps + pedidos web",
  },
  {
    initials: "YA",
    color: "#065f46",
    business: "Yoga Alma Serena",
    sector: "Bienestar · Barcelona",
    package: "Nivel 03",
    metric: "Clases llenas en 6 sem.",
    detail: "Publicidad Meta + automatización de reservas",
  },
  {
    initials: "AF",
    color: "#374151",
    business: "Taller AutoFix",
    sector: "Taller mecánico · Zaragoza",
    package: "Nivel 01",
    metric: "5-6 clientes/mes",
    detail: "Google local + reseñas + mejor presencia digital",
  },
];

const PROCESS = [
  { n: "01", title: "Diagnóstico", desc: "Revisamos tu situación digital en 60 min." },
  { n: "02", title: "Plan", desc: "Propuesta clara con entregables y plazos exactos." },
  { n: "03", title: "Ejecución", desc: "Construimos todo. Tú apruebas cada pieza." },
  { n: "04", title: "Entrega", desc: "Todo funcionando. Formación incluida." },
];

const FAQS = [
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. Nos encargamos de todo lo técnico. Al final te entregamos todo funcionando y te explicamos cómo usarlo en palabras simples.",
  },
  {
    q: "¿Cuánto tiempo tengo que dedicarle yo?",
    a: "Reunión inicial de 60 min + revisiones cortas semanales. Al terminar, mantienes todo en 15 min/semana.",
  },
  {
    q: "¿Los paquetes son acumulativos?",
    a: "Sí. Cada nivel incluye todo lo del anterior. Si empiezas con el Nivel 01 y quieres crecer, el Nivel 02 parte de lo que ya tienes construido — no empezamos de cero.",
  },
  {
    q: "¿Qué pasa si no me gustan los resultados?",
    a: "Firmamos un contrato con los entregables exactos. Revisamos juntos cada pieza antes de cerrarla. Si algo no cumple lo acordado, lo corregimos sin coste adicional.",
  },
  {
    q: "¿Cuándo empiezo a ver resultados?",
    a: "Con el Nivel 01, en 2-3 semanas ya apareces en Google. Los primeros clientes desde internet suelen llegar entre la semana 3 y 6.",
  },
];

// ─── COMPONENTES ────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-[#0B2545] text-sm leading-snug">{q}</span>
        {open ? (
          <ChevronUp size={16} className="text-[#C5A880] shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-gray-400 shrink-0" />
        )}
      </button>
      {open && <p className="pb-5 text-gray-500 text-sm leading-relaxed">{a}</p>}
    </div>
  );
}

// ─── PÁGINA ──────────────────────────────────────────────────────────

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", consent: false });
  const [sending, setSending] = useState(false);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) { toast.error("Debes aceptar la política de privacidad"); return; }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("¡Mensaje enviado! Te respondemos en menos de 24 horas.");
        const waText = encodeURIComponent(`Hola, soy ${form.name}. ${form.message}`);
        window.open(`https://wa.me/34658598442?text=${waText}`, "_blank");
        setForm({ name: "", email: "", company: "", message: "", consent: false });
      } else {
        toast.error("Algo salió mal. Escríbenos a veridiana@kendrick.com");
      }
    } catch {
      toast.error("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main>

      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex items-center bg-[#0B2545] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-consultant.jpg"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2545] via-[#0B2545]/95 to-[#0B2545]/70" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-12 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold mb-8">
              Consultoría Digital · Para pequeños negocios
            </span>
            <h1 className="text-white text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
              Más clientes.{" "}
              <span className="text-[#C5A880] italic">Sin complicaciones.</span>
            </h1>
            <p className="text-white/60 text-lg mb-10 max-w-md leading-relaxed">
              Construimos tu presencia digital y el sistema que convierte visitas en clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/quiz"
                className="inline-flex items-center justify-center gap-2 bg-[#C5A880] text-[#0B2545] font-bold px-8 py-4 rounded text-sm tracking-wide transition-all duration-200 hover:bg-[#d4bc9a]"
              >
                Diagnóstico gratuito — 3 min
                <ArrowRight size={15} />
              </Link>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 font-medium px-8 py-4 rounded text-sm tracking-wide transition-all duration-200 hover:bg-white/5"
              >
                Ver servicios
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {STATS.map((s) => (
              <div key={s.label} className="border border-white/10 rounded-lg p-5 text-center">
                <div className="text-[#C5A880] text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.value}
                </div>
                <div className="text-white/40 text-xs font-sans">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEMA — 3 tarjetas compactas ── */}
      <section className="bg-[#FAF8F5] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
              ¿Te suena familiar?
            </span>
            <h2 className="text-[#0B2545] text-3xl md:text-4xl font-bold mt-3">
              El problema de la mayoría de negocios
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "🔍", title: "Nadie te encuentra en Google", desc: "Tus competidores aparecen. Tú, no." },
              { icon: "📱", title: "Redes sin ventas reales", desc: "Seguidores que no se convierten en clientes." },
              { icon: "🔄", title: "Todo depende del boca a boca", desc: "Sin sistema, los ingresos son impredecibles." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#0B2545] text-sm mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS — escalera progresiva ── */}
      <section id="servicios" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
              Nuestros servicios
            </span>
            <h2 className="text-[#0B2545] text-3xl md:text-4xl font-bold mt-3 mb-2">
              Una escalera, no tres opciones aisladas
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              Cada nivel construye sobre el anterior. Empiezas donde estás y creces sin empezar de cero.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 my-8 text-xs text-gray-300 font-sans">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-400">Sin presencia</span>
            <ArrowRight size={12} />
            <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-400">Presencia sin sistema</span>
            <ArrowRight size={12} />
            <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-400">Escala con publicidad</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-xl flex flex-col overflow-hidden border ${
                  pkg.highlight
                    ? "border-[#C5A880] shadow-lg shadow-[#C5A880]/10"
                    : "border-gray-100"
                }`}
              >
                {pkg.badge && (
                  <div className="bg-[#C5A880] text-[#0B2545] text-[10px] font-bold tracking-widest uppercase text-center py-2 font-sans">
                    {pkg.badge}
                  </div>
                )}
                <div className={`p-7 flex flex-col flex-1 ${pkg.highlight ? "bg-[#0B2545]" : "bg-white"}`}>
                  <span className={`text-[10px] tracking-[3px] uppercase font-sans font-semibold mb-3 ${pkg.highlight ? "text-[#C5A880]" : "text-gray-300"}`}>
                    Nivel {pkg.step}
                  </span>
                  <h3 className={`text-xl font-bold mb-1 ${pkg.highlight ? "text-white" : "text-[#0B2545]"}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-xs mb-5 font-sans ${pkg.highlight ? "text-white/40" : "text-gray-400"}`}>
                    Para negocios: {pkg.tagline}
                  </p>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2
                          size={13}
                          className="mt-0.5 shrink-0 text-[#C5A880]"
                        />
                        <span className={`text-sm ${pkg.highlight ? "text-white/80" : "text-gray-600"}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {pkg.note && (
                    <p className={`text-xs mb-5 leading-relaxed rounded-lg p-3 ${pkg.highlight ? "bg-white/10 text-white/50" : "bg-amber-50 text-amber-700 border border-amber-100"}`}>
                      ⚠️ {pkg.note}
                    </p>
                  )}

                  <div className={`border-t pt-5 mt-auto ${pkg.highlight ? "border-white/10" : "border-gray-100"}`}>
                    <div className="flex items-baseline justify-between mb-4">
                      <span className={`text-xl font-bold ${pkg.highlight ? "text-white" : "text-[#0B2545]"}`}>
                        {pkg.price}
                      </span>
                      <span className={`text-xs font-sans ${pkg.highlight ? "text-white/40" : "text-gray-300"}`}>
                        {pkg.duration}
                      </span>
                    </div>
                    <Link
                      to="/quiz"
                      className={`block text-center font-bold text-sm px-4 py-3 rounded transition-all duration-200 active:scale-[0.97] ${
                        pkg.highlight
                          ? "bg-[#C5A880] text-[#0B2545] hover:bg-[#d4bc9a]"
                          : "bg-[#0B2545] text-white hover:bg-[#1a3a6b]"
                      }`}
                    >
                      {pkg.cta} →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-xs mt-8 font-sans">
            ¿No sabes por dónde empezar?{" "}
            <Link to="/quiz" className="text-[#0B2545] font-semibold underline hover:text-[#C5A880]">
              Haz el diagnóstico gratuito (3 min)
            </Link>
          </p>
        </div>
      </section>

      {/* ── PORTAFOLIO VISUAL — mockups de sites realizados ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
              Nuestro trabajo
            </span>
            <h2 className="text-[#0B2545] text-3xl font-bold mt-2">
              Sitios que construimos
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "FisioVida Madrid", type: "Clínica · Nivel 01", bg: "#0B2545", accent: "#C5A880" },
              { name: "Barbería Don Mateo", type: "Barbería · Nivel 01", bg: "#1a1a2e", accent: "#7c3aed" },
              { name: "LinguaFlow", type: "Academia · Nivel 02", bg: "#0e4a5c", accent: "#0ea5e9" },
              { name: "Reyes Arquitectura", type: "Arquitectura · Nivel 02", bg: "#2d1b00", accent: "#b45309" },
              { name: "Pastelería Dulce Luna", type: "Pastelería · Nivel 01", bg: "#3b0a2a", accent: "#ec4899" },
              { name: "Yoga Alma Serena", type: "Bienestar · Nivel 03", bg: "#022c22", accent: "#10b981" },
              { name: "Taller AutoFix", type: "Taller · Nivel 01", bg: "#111827", accent: "#9ca3af" },
            ].map((site) => (
              <div
                key={site.name}
                className="rounded-xl overflow-hidden border border-gray-100 relative group"
                style={{ backgroundColor: site.bg, aspectRatio: "16/9" }}
              >
                <div className="absolute top-0 left-0 right-0 h-5 flex items-center gap-1 px-2" style={{ backgroundColor: "rgba(0,0,0,0.35)" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/70" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400/70" />
                  <div className="flex-1 mx-2 h-2.5 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
                </div>
                <div className="absolute inset-0 top-5 p-3 flex flex-col gap-1.5">
                  <div className="h-2.5 w-2/3 rounded" style={{ backgroundColor: site.accent, opacity: 0.9 }} />
                  <div className="h-1.5 w-full rounded" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
                  <div className="h-1.5 w-4/5 rounded" style={{ backgroundColor: "rgba(255,255,255,0.05)" }} />
                  <div className="h-6 w-1/3 rounded mt-1" style={{ backgroundColor: site.accent, opacity: 0.5 }} />
                </div>
                <div className="absolute inset-0 top-5 flex flex-col justify-end p-3 bg-gradient-to-t from-black/75 to-transparent">
                  <p className="text-white font-bold text-xs leading-tight">{site.name}</p>
                  <p className="text-white/50 text-[10px] font-sans">{site.type}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-5 font-sans">
            Todos los sitios son funcionales y entregados con formación incluida.
          </p>
        </div>
      </section>

      {/* ── PORTAFOLIO — grid visual de resultados ── */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
                Resultados reales
              </span>
              <h2 className="text-[#0B2545] text-3xl md:text-4xl font-bold mt-2">
                Negocios que ya crecen
              </h2>
            </div>
            <Link
              to="/casos"
              className="inline-flex items-center gap-2 text-[#0B2545] font-semibold text-sm border-b border-[#0B2545] pb-0.5 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
            >
              Ver los 7 casos completos <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PORTFOLIO.map((p) => (
              <div
                key={p.business}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#0B2545] text-sm truncate">{p.business}</p>
                    <p className="text-gray-400 text-xs">{p.sector}</p>
                  </div>
                </div>
                <div className="bg-[#FAF8F5] rounded-lg p-3 mb-3">
                  <p className="text-[#0B2545] font-bold text-lg leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {p.metric}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{p.detail}</p>
                </div>
                <span className="text-[10px] text-[#C5A880] font-bold tracking-widest uppercase font-sans">
                  {p.package}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO — 4 pasos compactos ── */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
              El proceso
            </span>
            <h2 className="text-[#0B2545] text-3xl font-bold mt-2">
              Así trabajamos
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PROCESS.map((step, i) => (
              <div key={step.n} className="relative text-center">
                {i < PROCESS.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[65%] w-full h-px bg-[#C5A880]/20" />
                )}
                <div className="relative z-10 w-10 h-10 rounded-full bg-[#0B2545] flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#C5A880] text-xs font-bold font-sans">{step.n}</span>
                </div>
                <h3 className="text-[#0B2545] font-bold text-sm mb-1">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIO DESTACADO ── */}
      <section className="py-20 bg-[#0B2545]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-0.5 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-4 h-4 text-[#C5A880] fill-[#C5A880]" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.799-2.033a1 1 0 00-1.175 0l-2.799 2.033c-.785.57-1.839-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.079 8.71c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69L7.148 2.927z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            "En tres semanas pasé de que nadie me encontrara a tener la agenda llena los martes y jueves."
          </blockquote>
          <p className="text-[#C5A880] text-sm font-semibold">Ana Torres · FisioVida Madrid</p>
          <p className="text-white/30 text-xs mt-1 font-sans">Nivel 01 · Arranque Digital Mínimo</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-[#FAF8F5]">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
              Preguntas frecuentes
            </span>
            <h2 className="text-[#0B2545] text-3xl font-bold mt-2">
              Dudas habituales
            </h2>
          </div>
          <div className="bg-white rounded-xl px-6 border border-gray-100">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
            Empieza hoy
          </span>
          <h2 className="text-[#0B2545] text-3xl md:text-4xl font-bold mt-3 mb-4">
            Descubre qué necesita tu negocio
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
            3 minutos. Sin compromiso. Te decimos exactamente por dónde empezar.
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 bg-[#0B2545] text-white font-bold px-10 py-4 rounded text-sm tracking-wide hover:bg-[#1a3a6b] transition-colors active:scale-[0.97]"
          >
            Diagnóstico gratuito <ArrowRight size={15} />
          </Link>
          <p className="text-gray-300 text-xs mt-4 font-sans">Sin tarjeta · Sin compromiso · 3 minutos</p>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="py-24 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
                Contacto
              </span>
              <h2 className="text-[#0B2545] text-3xl font-bold mt-3 mb-4">
                ¿Tienes alguna pregunta?
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Escríbenos. Sin presiones, sin vendedores. Solo una conversación honesta sobre tu negocio.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#C5A880] text-xs">✉</div>
                  <span className="text-[#0B2545] text-sm font-semibold">veridiana@kendrick.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#C5A880] text-xs">⏱</div>
                  <span className="text-[#0B2545] text-sm font-semibold">Respuesta en menos de 24 horas</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleContact} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-sans">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2545] transition-colors"
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
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2545] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-sans">Negocio</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2545] transition-colors"
                  placeholder="Ej: Clínica Dental García"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 font-sans">¿En qué podemos ayudarte? *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2545] transition-colors resize-none"
                  placeholder="Cuéntanos brevemente tu situación..."
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
                  He leído y acepto la{" "}
                  <Link to="/privacidad" className="text-[#0B2545] underline hover:text-[#C5A880]">
                    Política de Privacidad
                  </Link>
                  .
                </span>
              </label>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#0B2545] text-white font-bold py-3.5 rounded-lg text-sm hover:bg-[#1a3a6b] transition-colors disabled:opacity-60 active:scale-[0.97]"
              >
                {sending ? "Enviando..." : "Enviar mensaje →"}
              </button>
              <p className="text-center text-gray-400 text-xs font-sans">
                O escríbenos directamente por{" "}
                <a
                  href="https://wa.me/34658598442?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20servicios."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] font-semibold hover:underline"
                >
                  WhatsApp
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
}
