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

import { useState } from "react";

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
  // JSON-LD Structured Data for LocalBusiness
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Kendrick Consultoria Digital",
    "image": "https://kendrick.com/images/hero-consultant.jpg",
    "@id": "https://kendrick.com",
    "url": "https://kendrick.com",
    "telephone": "+34-658-598-442",
    "email": "veridiana@kendrick.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ES",
      "addressRegion": "Madrid"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.4168,
      "longitude": -3.7038
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "€€",
    "description": "Consultoría digital para pequeños negocios. Ayudamos a conseguir más clientes usando Google Maps, Web y CRM. Sistema completo en 4 semanas.",
    "areaServed": "ES",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://kendrick.com/quiz",
      "servicePhone": "+34-658-598-442"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Consultoría Digital",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Arranque Digital Mínimo",
            "description": "Web de una página, Google Maps optimizado, WhatsApp directo, informe digital, guía mantenimiento 15 min/semana"
          },
          "price": "450",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Estructura de Ventas Integrada",
            "description": "Todo lo del Nivel 01 + Auditoría completa, CRM configurado, 3 emails automáticos, píxeles, panel Notion, formación 90 min"
          },
          "price": "850",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mentoría de Crecimiento Avanzado",
            "description": "Todo lo del Nivel 02 + Publicidad Meta/Google, panel tiempo real, revisiones quincenales, audiencias similares, manual crecimiento"
          },
          "price": "1500",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Ana Torres" },
        "datePublished": "2024-01-15",
        "reviewBody": "En tres semanas pasé de que nadie me encontrara a tener la agenda llena los martes y jueves.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex items-center bg-[#0B2545] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2545] via-[#0B2545]/95 to-[#0B2545]/70" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-12 w-full">
          <div className="max-w-3xl">
            <span className="inline-block text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold mb-6">
              Consultoría Digital · Negocios Locales
            </span>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              Consigo <span className="text-[#C5A880] italic">5-10 clientes nuevos/mes</span> para negocios invisibles en Google
            </h1>
            <p className="text-white/60 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
              Sistema GMB + Web + CRM en 4 semanas. Sin tecnicismos. Sin depender del boca a boca.
            </p>

            {/* Social Proof Bar */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-white/70 text-sm font-sans">
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
                ))}
              </div>
              <span className="font-semibold text-white">4.9/5</span>
              <span className="px-3 border-l border-white/20">47 reseñas Google</span>
              <span className="px-3 border-l border-white/20">+€50k facturación extra generada</span>
              <span className="px-3 border-l border-white/20">7 casos documentados</span>
            </div>

            {/* Dual CTA */}
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
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 font-medium px-8 py-4 rounded text-sm tracking-wide transition-all duration-200 hover:bg-white/5 w-full sm:w-auto"
              >
                Ver casos reales
              </a>
            </div>

            <p className="text-white/30 text-xs mt-4 font-sans">Sin tarjeta · Sin compromiso · Respuesta en 24h</p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
            {STATS.map((s) => (
              <div key={s.label} className="border border-white/10 rounded-lg p-5 text-center">
                <div className="text-[#C5A880] text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
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
              El problema de la mayoría de negocios locales
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

      {/* ── PORTFOLIO CAROUSEL — Real screenshots ── */}
      <PortfolioCarousel />

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
              <Star key={i} className="w-4 h-4 text-[#C5A880] fill-[#C5A880]" />
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
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hablar por WhatsApp
            </a>
            <a
              href="mailto:veridiana@kendrick.com?subject=Consulta%20servicios&body=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios."
              className="inline-flex items-center justify-center gap-3 bg-[#0B2545] text-white font-bold px-8 py-4 rounded-xl text-sm tracking-wide hover:bg-[#1a3a6b] transition-all active:scale-[0.97]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Enviar email
            </a>
          </div>
          <p className="text-gray-400 text-xs mt-4 font-sans">Respuesta en menos de 24 horas</p>
        </div>
      </section>
    </main>
    </>
  );
}