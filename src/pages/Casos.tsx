import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Casos y proyectos con datos alineados con los materiales entregados.
// Las métricas solo se muestran cuando están documentadas como resultado;
// en el resto se describen entregables y objetivos, no promesas.
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
    tagline: "Clínica de fisioterapia en Chamberí con presencia digital por construir",
    quote: "Una presencia digital clara para que más pacientes puedan encontrar y contactar con la clínica.",
    metrics: [
      { label: "Entrega principal", before: "Sin web propia", after: "Landing page" },
      { label: "Contacto", before: "Canales dispersos", after: "Cita y WhatsApp" },
      { label: "Visibilidad", before: "Por reforzar", after: "SEO local preparado" },
      { label: "Contenido", before: "Sin estructura", after: "Servicios y confianza" },
    ],
    before: [
      "Presencia digital poco estructurada",
      "Sin una landing page centrada en pedir cita",
      "Dificultad para explicar servicios y especialidades",
    ],
    after: [
      "Landing page de fisioterapia para Chamberí",
      "Estructura clara de tratamientos y credenciales",
      "Formulario de contacto y acceso directo a WhatsApp",
    ],
  },
  {
    id: 2,
    initials: "MJ",
    color: "#7c3aed",
    business: "Barbería Don Mateo",
    client: "Mateo Jiménez",
    sector: "Barbería · Triana, Sevilla",
    package: "Nivel 01",
    packageName: "Arranque Digital Mínimo",
    tagline: "12 años de reputación en Triana, sin presencia digital consolidada",
    quote: "Una barbería tradicional debe poder mostrar su historia, sus servicios y cómo reservar sin fricción.",
    metrics: [
      { label: "Entrega principal", before: "Sin web", after: "Landing page" },
      { label: "Reservas", before: "Por llamada", after: "Formulario preparado" },
      { label: "Visibilidad local", before: "No aparecía", after: "SEO local preparado" },
      { label: "Contenido", before: "Instagram irregular", after: "Servicios y galería" },
    ],
    before: [
      "Sin página web propia",
      "Sin sistema de reserva online",
      "Presencia local difícil de encontrar en Google",
    ],
    after: [
      "Landing page con historia, servicios y precios",
      "Botón de reserva visible y estructura para WhatsApp",
      "Contenido preparado para búsquedas de Triana y Sevilla",
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
    tagline: "Clases online con captación y seguimiento todavía manuales",
    quote: "El objetivo fue convertir el interés que llegaba desde redes en un proceso de seguimiento más ordenado.",
    metrics: [
      { label: "Captación", before: "Manual", after: "Embudo definido" },
      { label: "Seguimiento", before: "Sin sistema", after: "CRM organizado" },
      { label: "Automatización", before: "No disponible", after: "Secuencia de emails" },
      { label: "Control", before: "Sin panel", after: "Panel Notion" },
    ],
    before: [
      "Captación dependiente de Instagram",
      "Sin seguimiento sistemático de leads",
      "Sin una vista centralizada de métricas",
    ],
    after: [
      "Embudo definido: web → email → llamada",
      "Secuencia de emails de seguimiento",
      "Panel Notion para organizar leads y métricas",
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
    tagline: "Portfolio sólido, sin un sistema constante para captar proyectos",
    quote: "El trabajo se centró en convertir un buen portfolio en una base más clara para captar y seguir oportunidades.",
    metrics: [
      { label: "Estrategia", before: "Sin plan integrado", after: "Plan de 8 semanas" },
      { label: "Captación", before: "Por referidos", after: "Canales definidos" },
      { label: "Publicidad", before: "Sin propuesta", after: "Propuesta Meta Ads" },
      { label: "Seguimiento", before: "Disperso", after: "Proceso definido" },
    ],
    before: [
      "Portfolio sin sistema de captación asociado",
      "Dependencia de referidos del sector",
      "Sin propuesta estructurada para Meta Ads",
    ],
    after: [
      "Plan estratégico de captación y posicionamiento",
      "Propuesta de campañas para Meta Ads",
      "Recorrido definido para solicitudes de presupuesto",
    ],
  },
  {
    id: 5,
    initials: "CE",
    color: "#be185d",
    business: "Pastelería Dulce Luna",
    client: "Carmen Etxebarria",
    sector: "Pastelería artesanal · Indautxu, Bilbao",
    package: "Nivel 01",
    packageName: "Arranque Digital Mínimo",
    tagline: "Contenido visual atractivo, pero sin un camino claro hasta el pedido",
    quote: "El trabajo convierte un escaparate visual muy potente en una experiencia más sencilla para pedir información o encargar una tarta.",
    metrics: [
      { label: "Presencia", before: "Solo Instagram", after: "Landing page" },
      { label: "Pedidos", before: "Por DM", after: "Formulario" },
      { label: "Visibilidad", before: "Sin Google Business", after: "Plan local" },
      { label: "Gestión", before: "Manual", after: "WhatsApp preparado" },
    ],
    before: [
      "Sin página web ni ficha en Google Business Profile",
      "Pedidos gestionados únicamente por mensajes directos",
      "Sin información centralizada sobre proceso y plazos",
    ],
    after: [
      "Landing page con galería, precios orientativos y FAQs",
      "Formulario de pedido con fecha, tipo y presupuesto",
      "Estructura preparada para WhatsApp Business y Google",
    ],
  },
  {
    id: 6,
    initials: "VM",
    color: "#065f46",
    business: "Yoga Alma Serena",
    client: "Valentina Morales",
    sector: "Centro de yoga · Realejo, Granada",
    package: "Nivel 01",
    packageName: "Arranque Digital Mínimo",
    tagline: "Comunidad activa en Instagram, sin web ni presencia local propia",
    quote: "La propuesta crea un puente entre la comunidad del centro y una inscripción más sencilla para nuevos alumnos.",
    metrics: [
      { label: "Presencia", before: "Solo Instagram", after: "Landing page" },
      { label: "Inscripción", before: "Por DM", after: "Formulario" },
      { label: "Visibilidad local", before: "Sin Google", after: "Ficha preparada" },
      { label: "Conversión", before: "Sin CTA claro", after: "Clase de prueba" },
    ],
    before: [
      "Sin página web ni ficha en Google Business Profile",
      "Horarios y precios repartidos entre publicaciones y mensajes",
      "Sin proceso estructurado para nuevos alumnos",
    ],
    after: [
      "Landing page con horarios, bonos y tipos de yoga",
      "Formulario de inscripción y llamada a clase de prueba",
      "Plan de presencia local y conexión con WhatsApp",
    ],
  },
  {
    id: 7,
    initials: "RS",
    color: "#374151",
    business: "Taller AutoFix",
    client: "Roberto Sanz",
    sector: "Taller mecánico · Zaragoza",
    package: "Nivel 01",
    packageName: "Arranque Digital Mínimo",
    tagline: "18 años de reputación, con una web antigua y poca visibilidad local",
    quote: "El objetivo es hacer visible en Google la reputación que el taller ya tiene fuera de internet.",
    metrics: [
      { label: "Web", before: "Antigua y lenta", after: "Landing page" },
      { label: "Google", before: "Posición 11", after: "Plan local" },
      { label: "Contacto", before: "Sin formulario", after: "Presupuesto online" },
      { label: "Reseñas", before: "4 reseñas", after: "Plan de mejora" },
    ],
    before: [
      "Web de 2015 no adaptada correctamente a móvil",
      "Ficha de Google Business incompleta y posición local baja",
      "Sin formulario específico para solicitar presupuesto",
    ],
    after: [
      "Nueva landing page rápida y adaptada a móvil",
      "Estructura de contacto con teléfono, WhatsApp y presupuesto",
      "Plan de optimización de Google Business y reseñas",
    ],
  },
];

const PACKAGE_FILTERS = [
  { key: "all", label: "Todos" },
  { key: "Nivel 01", label: "Nivel 01" },
  { key: "Nivel 02", label: "Nivel 02" },
  { key: "Nivel 03", label: "Nivel 03" },
];

function CaseCard({ c }: { c: typeof CASES[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
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

      <div className="px-6 pb-4">
        <blockquote className="text-gray-500 text-xs leading-relaxed italic border-l-2 border-[#C5A880] pl-3">
          "{c.quote}"
          <span className="block text-[#C5A880] font-semibold not-italic mt-1">— {c.client}</span>
        </blockquote>
      </div>

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

export default function Casos() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? CASES : CASES.filter((c) => c.package === filter);

  return (
    <main>
      <section className="bg-[#0B2545] pt-32 pb-16 px-6 text-center">
        <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
          Casos y proyectos
        </span>
        <h1 className="text-white text-4xl md:text-5xl font-bold mt-3 mb-4">
          Trabajo que se puede ver
        </h1>
        <p className="text-white/50 text-base max-w-md mx-auto">
          7 proyectos documentados: entregables claros, contexto y objetivos sin promesas vacías.
        </p>
      </section>

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

      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c) => (
              <CaseCard key={c.id} c={c} />
            ))}
          </div>
        </div>
      </section>

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
