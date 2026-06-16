import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

// ─── DATOS ────────────────────────────────────────────────────────────────────

const CASES = [
  {
    id: 1,
    initials: "AT",
    color: "#0B2545",
    business: "FisioVida Madrid",
    client: "Ana Torres",
    sector: "Fisioterapia · Madrid",
    package: "Nivel 01",
    packageName: "Arranque Digital Mínimo",
    price: "€520",
    tagline: "8 años con la clínica, cero presencia en Google",
    quote: "En tres semanas pasé de que nadie me encontrara a tener la agenda llena los martes y jueves.",
    metrics: [
      { label: "Nuevos pacientes/mes", before: "0", after: "6-8" },
      { label: "Reseñas Google", before: "0", after: "47 ⭐" },
      { label: "Posición Google", before: "No aparecía", after: "Top 3" },
      { label: "Facturación extra", before: "€0", after: "+€840/mes" },
    ],
    before: [
      "No aparecía en Google ni Google Maps",
      "Sin página web — solo un PDF por WhatsApp",
      "100% de clientes por boca a boca",
    ],
    after: [
      "Top 3 en 'fisioterapeuta Madrid Chamberí'",
      "Web con reserva online — 12 citas el primer mes",
      "47 reseñas con media de 4.9 ⭐",
    ],
  },
  {
    id: 2,
    initials: "MS",
    color: "#7c3aed",
    business: "Barbería Don Mateo",
    client: "Mateo Sánchez",
    sector: "Barbería · Sevilla",
    package: "Nivel 01",
    packageName: "Arranque Digital Mínimo",
    price: "€520",
    tagline: "12 años de reputación, invisible en internet",
    quote: "Ahora cuando alguien busca barbería en Triana, me encuentran a mí. Eso vale más que cualquier anuncio.",
    metrics: [
      { label: "Reservas online/mes", before: "0", after: "23" },
      { label: "Reseñas Google", before: "0", after: "38 ⭐" },
      { label: "Clientes nuevos/mes", before: "0", after: "8-10" },
      { label: "Facturación extra", before: "€0", after: "+€600/mes" },
    ],
    before: [
      "12 años de negocio sin presencia digital",
      "Instagram con 2.100 seguidores pero sin web",
      "Sin sistema de reservas — todo por llamada",
    ],
    after: [
      "Ficha Google Business con 38 reseñas (4.8 ⭐)",
      "23 reservas online el primer mes",
      "Clientes de otros barrios que llegan por Google",
    ],
  },
  {
    id: 3,
    initials: "LF",
    color: "#0e7490",
    business: "LinguaFlow",
    client: "Sofía Martín",
    sector: "Academia de idiomas · Online",
    package: "Nivel 02",
    packageName: "Estructura de Ventas Integrada",
    price: "€950",
    tagline: "Clases online sin sistema de captación",
    quote: "Antes dependía de Instagram para todo. Ahora tengo un embudo que funciona solo y me trae alumnos mientras duermo.",
    metrics: [
      { label: "Alumnos nuevos/mes", before: "2-3", after: "9-11" },
      { label: "Tasa de conversión", before: "8%", after: "31%" },
      { label: "Coste por alumno", before: "€0 (pero tiempo)", after: "€18" },
      { label: "Facturación extra", before: "€0", after: "+€1.200/mes" },
    ],
    before: [
      "Captación 100% manual por Instagram",
      "Sin seguimiento de leads — respondía cuando podía",
      "Sin datos de qué funcionaba y qué no",
    ],
    after: [
      "Embudo automatizado: web → email → llamada",
      "CRM con seguimiento de cada alumno potencial",
      "Panel con métricas en tiempo real",
    ],
  },
  {
    id: 4,
    initials: "RA",
    color: "#b45309",
    business: "Reyes Arquitectura",
    client: "Carlos Reyes",
    sector: "Arquitectura · Valencia",
    package: "Nivel 02",
    packageName: "Estructura de Ventas Integrada",
    price: "€1.100",
    tagline: "Portfolio increíble, sin sistema para conseguir proyectos",
    quote: "Tenía un portfolio espectacular que nadie veía. Ahora recibo 3 veces más solicitudes de presupuesto al mes.",
    metrics: [
      { label: "Solicitudes/mes", before: "2-3", after: "7-9" },
      { label: "Proyectos cerrados", before: "1-2", after: "3-4" },
      { label: "Ticket medio", before: "€8.000", after: "€12.000" },
      { label: "Facturación extra", before: "€0", after: "+€24.000/año" },
    ],
    before: [
      "Web bonita pero sin SEO ni captación",
      "Sin presencia en LinkedIn profesional",
      "Proyectos solo por referidos del sector",
    ],
    after: [
      "Posicionado en búsquedas de arquitectos en Valencia",
      "LinkedIn optimizado con 3× más conexiones relevantes",
      "Sistema de seguimiento de presupuestos enviados",
    ],
  },
  {
    id: 5,
    initials: "DL",
    color: "#be185d",
    business: "Pastelería Dulce Luna",
    client: "Elena Vega",
    sector: "Pastelería artesanal · Bilbao",
    package: "Nivel 01",
    packageName: "Arranque Digital Mínimo",
    price: "€480",
    tagline: "Pasteles increíbles que nadie conocía",
    quote: "Pensaba que Instagram era suficiente. En 4 semanas entendí que necesitaba Google para que me encontraran los que no me seguían.",
    metrics: [
      { label: "Pedidos online/mes", before: "0", after: "18-22" },
      { label: "Nuevos clientes", before: "Solo referidos", after: "+15/mes" },
      { label: "Radio de clientes", before: "Barrio", after: "Toda la ciudad" },
      { label: "Facturación extra", before: "€0", after: "+€1.400/mes" },
    ],
    before: [
      "Solo Instagram — sin web ni Google Maps",
      "Pedidos solo por DM, sin sistema",
      "Clientes solo del barrio inmediato",
    ],
    after: [
      "Web con catálogo y formulario de pedidos",
      "Google Maps optimizado con 29 reseñas",
      "Pedidos desde toda la ciudad y eventos corporativos",
    ],
  },
  {
    id: 6,
    initials: "YA",
    color: "#065f46",
    business: "Yoga Alma Serena",
    client: "Lucía Fernández",
    sector: "Bienestar · Barcelona",
    package: "Nivel 03",
    packageName: "Mentoría de Crecimiento Avanzado",
    price: "€1.800",
    tagline: "Estudio lleno de potencial, clases con plazas vacías",
    quote: "Con la publicidad correcta, en 6 semanas tenía todas las clases llenas y lista de espera. No me lo esperaba tan rápido.",
    metrics: [
      { label: "Ocupación clases", before: "45%", after: "97%" },
      { label: "Nuevos alumnos/mes", before: "3-4", after: "18-22" },
      { label: "Coste por alumno", before: "€0 (pero sin crecer)", after: "€12" },
      { label: "Facturación extra", before: "€0", after: "+€2.800/mes" },
    ],
    before: [
      "Clases con 45% de ocupación media",
      "Sin publicidad — solo boca a boca y Instagram orgánico",
      "Sin datos de qué tipo de alumno convierte mejor",
    ],
    after: [
      "Todas las clases llenas + lista de espera",
      "Publicidad Meta con coste por alumno de €12",
      "Audiencias similares a sus mejores alumnos",
    ],
  },
  {
    id: 7,
    initials: "AF",
    color: "#374151",
    business: "Taller AutoFix",
    client: "Roberto García",
    sector: "Taller mecánico · Zaragoza",
    package: "Nivel 01",
    packageName: "Arranque Digital Mínimo",
    price: "€500",
    tagline: "30 años de oficio, sin una sola reseña en internet",
    quote: "Mis clientes de siempre me recomendaban, pero los nuevos no me encontraban. Ahora Google me trae 5-6 clientes nuevos cada mes.",
    metrics: [
      { label: "Clientes nuevos/mes", before: "0 desde internet", after: "5-6" },
      { label: "Reseñas Google", before: "0", after: "34 ⭐" },
      { label: "Posición Google", before: "No aparecía", after: "Top 5 local" },
      { label: "Facturación extra", before: "€0", after: "+€1.100/mes" },
    ],
    before: [
      "30 años de negocio sin presencia digital",
      "Sin reseñas en ninguna plataforma",
      "Clientes solo por recomendación directa",
    ],
    after: [
      "Top 5 en 'taller mecánico Zaragoza'",
      "34 reseñas con media de 4.8 ⭐",
      "5-6 clientes nuevos al mes desde Google",
    ],
  },
];

const PACKAGE_FILTERS = [
  { key: "all", label: "Todos" },
  { key: "Nivel 01", label: "Nivel 01" },
  { key: "Nivel 02", label: "Nivel 02" },
  { key: "Nivel 03", label: "Nivel 03" },
];

// ─── CARD ─────────────────────────────────────────────────────────────────────

function CaseCard({ c }: { c: typeof CASES[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ backgroundColor: c.color }}
            >
              {c.initials}
            </div>
            <div>
              <p className="font-bold text-[#0B2545] text-sm">{c.business}</p>
              <p className="text-gray-400 text-xs">{c.sector}</p>
            </div>
          </div>
          <span className="text-[10px] text-[#C5A880] font-bold tracking-widest uppercase font-sans shrink-0 mt-1">
            {c.package}
          </span>
        </div>
        <p className="text-gray-400 text-xs italic mb-4">"{c.tagline}"</p>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-2">
          {c.metrics.map((m) => (
            <div key={m.label} className="bg-[#FAF8F5] rounded-xl p-3">
              <p className="text-[10px] text-gray-400 font-sans mb-1">{m.label}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-300 text-xs line-through font-sans">{m.before}</span>
                <span className="text-[#C5A880] text-[10px]">→</span>
                <span className="text-[#0B2545] font-bold text-sm">{m.after}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="px-6 pb-4">
        <blockquote className="text-gray-500 text-xs leading-relaxed italic border-l-2 border-[#C5A880] pl-3">
          "{c.quote}"
          <span className="block text-[#C5A880] font-semibold not-italic mt-1">— {c.client}</span>
        </blockquote>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-3 text-xs text-gray-400 font-sans border-t border-gray-50 hover:bg-gray-50 transition-colors text-left flex items-center justify-between"
      >
        <span>{expanded ? "Ocultar detalle" : "Ver antes / después"}</span>
        <span className="text-[#C5A880]">{expanded ? "↑" : "↓"}</span>
      </button>

      {expanded && (
        <div className="px-6 pb-6 grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
          <div>
            <p className="text-xs font-bold text-red-400 mb-2 font-sans">Antes</p>
            <ul className="space-y-1.5">
              {c.before.map((b) => (
                <li key={b} className="flex items-start gap-1.5 text-xs text-gray-500">
                  <span className="text-red-300 shrink-0 mt-0.5">✗</span> {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-green-500 mb-2 font-sans">Después</p>
            <ul className="space-y-1.5">
              {c.after.map((a) => (
                <li key={a} className="flex items-start gap-1.5 text-xs text-gray-600 font-medium">
                  <span className="text-green-400 shrink-0 mt-0.5">✓</span> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PÁGINA ───────────────────────────────────────────────────────────────────

export default function Casos() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? CASES : CASES.filter((c) => c.package === filter);

  return (
    <main>
      {/* Header */}
      <section className="bg-[#0B2545] pt-32 pb-16 px-6 text-center">
        <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
          Resultados reales
        </span>
        <h1 className="text-white text-4xl md:text-5xl font-bold mt-3 mb-4">
          Negocios que ya crecen
        </h1>
        <p className="text-white/50 text-base max-w-md mx-auto">
          7 casos reales con métricas concretas. Sin promesas vacías.
        </p>
      </section>

      {/* Filtros */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto">
          {PACKAGE_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-sans whitespace-nowrap transition-all ${
                filter === f.key
                  ? "bg-[#0B2545] text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="text-gray-300 text-xs font-sans ml-2 shrink-0">
            {filtered.length} caso{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* Grid de casos */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c) => (
              <CaseCard key={c.id} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center px-6">
        <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
          ¿El siguiente eres tú?
        </span>
        <h2 className="text-[#0B2545] text-3xl font-bold mt-3 mb-4">
          Descubre qué necesita tu negocio
        </h2>
        <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
          3 minutos. Resultado personalizado. Sin compromiso.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/quiz"
            className="inline-flex items-center justify-center gap-2 bg-[#0B2545] text-white font-bold px-8 py-4 rounded text-sm hover:bg-[#1a3a6b] transition-colors active:scale-[0.97]"
          >
            Diagnóstico gratuito <ArrowRight size={14} />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-500 font-medium px-8 py-4 rounded text-sm hover:border-gray-400 transition-colors"
          >
            <ArrowLeft size={14} /> Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
