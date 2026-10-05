import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import SiteShot from "../components/SiteShot";
const SHOWCASE = [
  {
    name: "FisioVida Madrid",
    sector: "Fisioterapia · Madrid",
    url: "fisiovidamadrid.es",
    shot: {
      photo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=60",
      kicker: "Fisioterapia · Madrid",
      title: "Recupera tu",
      highlight: "movilidad",
      cta: "Pedir cita",
      base: "#0B2545",
      accent: "#C5A880",
    },
    metric: "38 leads/mes",
    detail: "A €3,80 por lead con Instagram Ads",
  },
  {
    name: "Barbería Don Mateo",
    sector: "Barbería · Sevilla",
    url: "barberiadonmateo.es",
    shot: {
      photo: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=60",
      kicker: "Barbería · Sevilla",
      title: "El arte del",
      highlight: "corte",
      cta: "Reservar",
      base: "#141414",
      accent: "#d4a94e",
    },
    metric: "23 reservas/mes",
    detail: "Desde Instagram Ads, sin depender del boca a boca",
  },
  {
    name: "Pastelería Dulce Luna",
    sector: "Pastelería · Bilbao",
    url: "pasteleriadulceluna.es",
    shot: {
      photo: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=60",
      kicker: "Pastelería · Bilbao",
      title: "Tartas que",
      highlight: "enamoran",
      cta: "Encargar",
      base: "#5b1229",
      accent: "#f472b6",
    },
    metric: "+40% ventas online",
    detail: "Con Meta Ads desde €10/día",
  },
];

// ─── DATOS ────────────────────────────────────────────────────────────────────

// Oferta media buyer: landing única + gestão mensal. Sem jerga.
const PACKAGES = [
  {
    step: "01",
    name: "Landing que vende",
    price: "€250",
    duration: "7 días · pago único",
    tagline: "Para convertir visitas en WhatsApps",
    badge: null,
    highlight: false,
    includes: [
      "Página diseñada para convertir visitas en mensajes",
      "Botón de WhatsApp + medición de cada clic",
      "Rápida en móvil y lista para anuncios",
    ],
    cta: "Quiero mi landing",
    note: null,
  },
  {
    step: "02",
    name: "Tráfico gestionado",
    price: "€300/mes",
    duration: "mes a mes, sin permanencia",
    tagline: "Para llenar la agenda cada semana",
    badge: "Más solicitado",
    highlight: true,
    includes: [
      "Revisamos tu página antes de gastar un euro",
      "Campañas en Instagram y Google",
      "Optimización semanal + informe simple",
    ],
    cta: "Escalar con anuncios",
    note: "La verba de anuncios (lo que pagas a Meta/Google) no está incluida. Verbas hasta €1.500/mes; por encima, 10% de la facturación generada.",
  },
];

// Portafolio visual — resultados concretos por sector
const PORTFOLIO = [
  {
    initials: "AT",
    color: "#0B2545",
    business: "FisioVida Madrid",
    sector: "Fisioterapia",
    package: "Tráfico",
    metric: "38 leads/mes",
    detail: "A €3,80 por lead con Instagram Ads",
  },
  {
    initials: "MS",
    color: "#7c3aed",
    business: "Barbería Don Mateo",
    sector: "Barbería · Sevilla",
    package: "Tráfico",
    metric: "23 reservas/mes",
    detail: "Desde Instagram Ads",
  },
  {
    initials: "LF",
    color: "#0e7490",
    business: "LinguaFlow",
    sector: "Academia de idiomas",
    package: "Tráfico",
    metric: "+€1.200/mes",
    detail: "Con campañas Meta",
  },
  {
    initials: "RA",
    color: "#b45309",
    business: "Reyes Arquitectura",
    sector: "Arquitectura · Valencia",
    package: "Tráfico",
    metric: "3× presupuestos",
    detail: "Desde Google Ads",
  },
  {
    initials: "DL",
    color: "#be185d",
    business: "Pastelería Dulce Luna",
    sector: "Pastelería artesanal",
    package: "Landing",
    metric: "+40% ventas online",
    detail: "Con Meta Ads desde €10/día",
  },
  {
    initials: "YA",
    color: "#065f46",
    business: "Yoga Alma Serena",
    sector: "Bienestar · Barcelona",
    package: "Tráfico",
    metric: "97% ocupación",
    detail: "Clases llenas con Meta Ads",
  },
];

const PROCESS = [
  { n: "01", title: "Diagnóstico", desc: "Vemos tu caso en 30 min, sin compromiso." },
  { n: "02", title: "Plan", desc: "Propuesta con verba sugerida y plazos exactos." },
  { n: "03", title: "Lanzamiento", desc: "Landing + campañas en marcha en días." },
  { n: "04", title: "Optimización", desc: "Revisamos números contigo cada semana." },
];

const FAQS = [
  {
    q: "¿Cuánto tengo que invertir en anuncios?",
    a: "Recomendamos empezar con €300–500/mes de verba, que pagas directo a Meta/Google. Con menos también se puede, pero más lento.",
  },
  {
    q: "¿Cuándo veré resultados?",
    a: "Primeros leads entre 7 y 14 días. Optimizamos cada semana; a los 90 días decides con números en la mano.",
  },
  {
    q: "¿Hay permanencia?",
    a: "No. Mes a mes. Si no compensa, pausamos y listo.",
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
              Tráfico pago · Negocios locales
            </span>
            <h1 className="text-[#0B2545] text-5xl md:text-6xl font-bold leading-[1.05] mb-6">
              Llenamos tu agenda con <span className="text-[#C5A880] italic">anuncios que convierten</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
              Landing que vende (desde €250) + gestión mensual (desde €300/mes). Tú pones la verba, nosotros el resto.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 text-gray-500 text-sm font-sans">
              <span className="font-semibold text-[#0B2545]">ROAS medio 3,1×</span>
              <span className="px-3 border-l border-gray-200">CPL desde €3,50</span>
              <span className="px-3 border-l border-gray-200">+120 negocios</span>
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
              { icon: "📢", title: "Impulsas publicaciones a ciegas", desc: "Dinero en alcance que no vende." },
              { icon: "🖱️", title: "Tu web no convierte los clics", desc: "Cada visita que se va es dinero perdido." },
              { icon: "📊", title: "No sabes cuánto cuesta un cliente", desc: "Sin medir, escalar da miedo." },
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
              Un servicio, dos formas de empezar
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              Landing sola o con gestión mensual. Sin ataduras, sin letra pequeña.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
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

      {/* ── TRABAJOS REALES — 3 casos, sin carrusel ── */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
              Nuestro trabajo
            </span>
            <h2 className="text-[#0B2545] text-3xl md:text-4xl font-bold mt-2">
              Negocios como el tuyo, con resultados
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {SHOWCASE.map((item) => (
              <Link
                key={item.name}
                to="/casos"
                className="group rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center gap-1.5 bg-[#FAF8F5] border-b border-gray-100 px-3 h-9">
                  <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                  <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                  <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                  <span className="flex-1 min-w-0 truncate rounded-md bg-white border border-gray-200 px-2 py-0.5 text-[10px] text-gray-400 font-sans">
                    {item.url}
                  </span>
                </div>
                <div className="aspect-[21/10] overflow-hidden bg-[#FAF8F5] transition-transform duration-500 group-hover:scale-[1.01]">
                  <SiteShot {...item.shot} />
                </div>
                <div className="p-5">
                  <h3 className="text-[#0B2545] font-bold text-base">{item.name}</h3>
                  <p className="text-gray-400 text-xs mb-3">{item.sector}</p>
                  <p className="text-[#0B2545] font-bold text-lg leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.metric}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{item.detail}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-center mt-6 text-sm text-gray-500">
            Estos 3 sitios son <span className="font-bold text-[#0B2545]">landings de €250</span>, listas en 7 días.{" "}
            <Link to="/casos" className="text-[#0B2545] font-semibold underline hover:text-[#C5A880]">
              Ver los 7 casos →
            </Link>
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
            "Con los anuncios, la agenda se llena sola cada semana."
          </blockquote>
          <p className="text-[#C5A880] text-sm font-semibold">Ana Torres · FisioVida Madrid</p>
          <p className="text-white/30 text-xs mt-1 font-sans">Landing €250 + Tráfico €300/mes</p>
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

      {/* ── CTA FINAL + CONTACTO (una sola sección) ── */}
      <section id="contacto" className="py-24 bg-white">
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
            className="inline-flex items-center gap-2 bg-[#0B2545] text-white font-bold px-10 py-4 rounded text-sm tracking-wide hover:bg-[#1a3a6b] transition-colors active:scale-[0.97] w-full sm:w-auto justify-center"
          >
            Diagnóstico gratuito <ArrowRight size={15} />
          </Link>
          <p className="text-gray-300 text-xs mt-4 mb-8 font-sans">Sin tarjeta · Sin compromiso · 3 minutos</p>

          <div className="border-t border-gray-100 pt-8">
            <p className="text-gray-400 text-xs mb-4 font-sans">¿Prefieres hablar directo? Sin presiones, sin vendedores.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/34658598442?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:bg-[#1ebe5d] transition-all active:scale-[0.97]"
              >
                WhatsApp
              </a>
              <a
                href="mailto:veridiana@kendrick.com?subject=Consulta%20servicios&body=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios."
                className="inline-flex items-center justify-center gap-2 border border-[#0B2545]/20 text-[#0B2545] font-bold px-8 py-3.5 rounded-xl text-sm hover:bg-[#0B2545]/5 transition-all active:scale-[0.97]"
              >
                veridiana@kendrick.com
              </a>
            </div>
            <p className="text-gray-400 text-xs mt-4 font-sans">+34 658 598 442 · Respuesta en menos de 24 horas</p>
          </div>
        </div>
      </section>

    </main>
  );
}
