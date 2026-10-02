import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Star } from "lucide-react";
import PortfolioCarousel from "../components/PortfolioCarousel";

// ─── DATOS ────────────────────────────────────────────────────────────────────

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

// ─── COMPONENTES ──────────────────────────────────────────────────────────────

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

// ─── PÁGINA ───────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>

      {/* ── HERO (paleta clara) ── */}
      <section className="relative min-h-[100svh] flex items-center bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(55rem_28rem_at_85%_-10%,rgba(197,168,128,0.20),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40rem_24rem_at_-10%_110%,rgba(11,37,69,0.07),transparent)]" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-12 w-full">
          <div className="max-w-3xl">
            <span className="inline-block text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold mb-6">
              Consultoría Digital · Negocios locales
            </span>
            <h1 className="text-[#0B2545] text-5xl md:text-6xl font-bold leading-[1.05] mb-6">
              Consigo <span className="text-[#C5A880] italic">5-10 clientes nuevos/mes</span> para negocios invisibles en Google
            </h1>
            <p className="text-gray-500 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
              Sistema Google Maps + Web + WhatsApp en 4 semanas. Sin tecnicismos. Sin depender del boca a boca.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 text-gray-500 text-sm font-sans">
              <span className="inline-flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
                ))}
              </span>
              <span className="font-semibold text-[#0B2545]">4.9/5</span>
              <span className="px-3 border-l border-gray-200">47 reseñas Google</span>
              <span className="px-3 border-l border-gray-200">+€50k facturación extra generada</span>
              <span className="px-3 border-l border-gray-200">7 casos documentados</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/quiz"
                className="inline-flex items-center justify-center gap-2 bg-[#C5A880] text-[#0B2545] font-bold px-8 py-4 rounded text-sm tracking-wide transition-all duration-200 hover:bg-[#d4bc9a] active:scale-[0.97] w-full sm:w-auto"
              >
                Diagnóstico gratuito — 3 min
                <ArrowRight size={15} />
              </Link>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 border border-[#0B2545]/20 text-[#0B2545] font-medium px-8 py-4 rounded text-sm tracking-wide transition-all duration-200 hover:bg-[#0B2545]/5 w-full sm:w-auto"
              >
                Ver casos reales
              </a>
            </div>

            <p className="text-gray-400 text-xs mt-4 font-sans">Sin tarjeta · Sin compromiso · Respuesta en 24h</p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#FAF8F5] border border-gray-100 rounded-lg p-5 text-center">
                <div className="text-[#C5A880] text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.value}
                </div>
                <div className="text-gray-400 text-xs font-sans">{s.label}</div>
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

          {/* Flecha visual de progresión */}
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
                          className={`mt-0.5 shrink-0 ${pkg.highlight ? "text-[#C5A880]" : "text-[#C5A880]"}`}
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

      {/* ── PORTAFOLIO REAL — screenshots de proyectos entregados ── */}
      <div id="portfolio">
        <PortfolioCarousel />
      </div>

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
              className="inline-flex items-center gap-2 text-[#0B2545] font-semibold text-sm border-b border-[#0B2545] pb-0.5 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors shrink-0"
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
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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

      {/* ── CONTACTO — solo WhatsApp + Email ── */}
      <section id="contacto" className="py-24 bg-[#FAF8F5]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
            Contacto
          </span>
          <h2 className="text-[#0B2545] text-3xl font-bold mt-3 mb-4">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Escríbenos por WhatsApp o email. Sin presiones, sin vendedores. Solo una conversación honesta sobre tu negocio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/34658598442?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl text-sm tracking-wide hover:bg-[#1ebe5d] transition-all active:scale-[0.97]"
            >
              Hablar por WhatsApp
            </a>
            <a
              href="mailto:veridiana@kendrick.com?subject=Consulta%20servicios&body=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios."
              className="inline-flex items-center justify-center gap-3 bg-[#0B2545] text-white font-bold px-8 py-4 rounded-xl text-sm tracking-wide hover:bg-[#1a3a6b] transition-all active:scale-[0.97]"
            >
              Enviar email
            </a>
          </div>
          <p className="text-gray-400 text-xs mt-4 font-sans">+34 658 598 442 · veridiana@kendrick.com · Respuesta en menos de 24 horas</p>
        </div>
      </section>

    </main>
  );
}
