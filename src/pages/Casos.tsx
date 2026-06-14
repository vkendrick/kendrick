import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, XCircle, Star, ChevronDown, ChevronUp } from "lucide-react";

const CASES = [
  {
    id: 1,
    slug: "fisiovida",
    client: "Ana Torres",
    business: "FisioVida Madrid",
    sector: "Fisioterapia",
    city: "Madrid",
    package: "Arranque Digital Mínimo",
    packageColor: "#22c55e",
    packageBg: "#f0fdf4",
    duration: "4 semanas",
    price: "€520",
    initials: "AT",
    avatarColor: "#22c55e",
    accent: "#16a34a",
    tagline: "8 años con la clínica, cero presencia en Google",
    quote: "En tres semanas pasé de que nadie me encontrara a tener la agenda llena los martes y jueves. No me lo podía creer.",
    before: [
      "No aparecía en Google ni en Google Maps",
      "Sin página web — solo un PDF de tarifas por WhatsApp",
      "3 pacientes perdidos en un mes por no encontrarla online",
      "100% de clientes por recomendación boca a boca",
      "Sin reseñas en ninguna plataforma",
    ],
    after: [
      "Top 3 en Google para 'fisioterapeuta Madrid Chamberí'",
      "Web con reserva online — 12 citas en el primer mes",
      "47 reseñas en Google con media de 4.9 ⭐",
      "6 pacientes nuevos desde internet en las primeras 4 semanas",
      "Agenda completa los martes y jueves por primera vez",
    ],
    metrics: [
      { label: "Nuevos pacientes/mes", before: "0", after: "6-8", icon: "👥" },
      { label: "Reseñas Google", before: "0", after: "47", icon: "⭐" },
      { label: "Posición en Google", before: "No aparecía", after: "Top 3", icon: "🔍" },
      { label: "Facturación adicional", before: "€0", after: "+€840/mes", icon: "💶" },
    ],
  },
  {
    id: 2,
    slug: "barberia-donmateo",
    client: "Mateo Sánchez",
    business: "Barbería Don Mateo",
    sector: "Barbería",
    city: "Sevilla",
    package: "Arranque Digital Mínimo",
    packageColor: "#22c55e",
    packageBg: "#f0fdf4",
    duration: "4 semanas",
    price: "€520",
    initials: "MS",
    avatarColor: "#92400e",
    accent: "#78350f",
    tagline: "12 años de reputación, invisible en internet",
    quote: "Ahora cuando alguien busca barbería en Triana, me encuentran a mí. Eso vale más que cualquier anuncio.",
    before: [
      "12 años de negocio sin presencia digital",
      "Instagram con 2.100 seguidores pero sin web",
      "Sin sistema de reservas — todo por llamada o en persona",
      "Clientes solo del barrio, sin llegar a nuevos públicos",
      "Horario y precios sin publicar en ningún sitio online",
    ],
    after: [
      "Ficha Google Business verificada con 38 reseñas (4.8 ⭐)",
      "Web con sistema de reservas online — 23 reservas en el primer mes",
      "Aparece en 'barbería Triana Sevilla' y 'barbería cerca de mí'",
      "Clientes de otros barrios que llegan expresamente por Google",
      "Reducción del 60% en llamadas para reservas (ahora son online)",
    ],
    metrics: [
      { label: "Reservas online/mes", before: "0", after: "23", icon: "📅" },
      { label: "Reseñas Google", before: "0", after: "38", icon: "⭐" },
      { label: "Clientes nuevos/mes", before: "0 desde internet", after: "8-10", icon: "👥" },
      { label: "Facturación adicional", before: "€0", after: "+€600/mes", icon: "💶" },
    ],
  },
  {
    id: 3,
    slug: "dulce-luna",
    client: "Elena Martínez",
    business: "Pastelería Dulce Luna",
    sector: "Pastelería artesanal",
    city: "Bilbao",
    package: "Arranque Digital Mínimo",
    packageColor: "#22c55e",
    packageBg: "#f0fdf4",
    duration: "4 semanas",
    price: "€520",
    initials: "EM",
    avatarColor: "#db2777",
    accent: "#be185d",
    tagline: "5 años haciendo tartas increíbles, sin poder venderlas online",
    quote: "Antes perdía encargos porque la gente no sabía cómo pedirme. Ahora tengo el formulario y me llegan pedidos mientras duermo.",
    before: [
      "Sin web — los encargos llegaban solo por DM de Instagram",
      "Sin catálogo de productos ni precios visibles",
      "Perdía encargos porque no respondía DMs a tiempo",
      "Sin ficha en Google — no aparecía en búsquedas locales",
      "Sin proceso claro para encargos de bodas y eventos",
    ],
    after: [
      "Web con catálogo completo, precios y formulario de encargo",
      "Ficha Google con 29 reseñas y fotos de productos",
      "Formulario de encargo recibe 15-20 solicitudes por semana",
      "Sección especial para tartas de boda — 3 bodas confirmadas",
      "Tiempo de respuesta a encargos: de 24h a automático",
    ],
    metrics: [
      { label: "Solicitudes de encargo/semana", before: "2-3", after: "15-20", icon: "🎂" },
      { label: "Reseñas Google", before: "0", after: "29", icon: "⭐" },
      { label: "Bodas confirmadas", before: "0", after: "3 en 30 días", icon: "💍" },
      { label: "Facturación adicional", before: "€0", after: "+€1.200/mes", icon: "💶" },
    ],
  },
  {
    id: 4,
    slug: "autofix",
    client: "Roberto García",
    business: "Taller AutoFix",
    sector: "Mecánica",
    city: "Zaragoza",
    package: "Arranque Digital Mínimo",
    packageColor: "#22c55e",
    packageBg: "#f0fdf4",
    duration: "4 semanas",
    price: "€520",
    initials: "RG",
    avatarColor: "#dc2626",
    accent: "#b91c1c",
    tagline: "18 años de reputación, web de 2015 que no abría en móvil",
    quote: "Mi web antigua espantaba a la gente. Ahora la nueva convierte. Tuve 4 clientes nuevos la primera semana.",
    before: [
      "Web de 2015 que no funcionaba en móvil (80% del tráfico es móvil)",
      "Sin formulario de cita previa — todo por teléfono",
      "Ficha Google desactualizada con horario incorrecto",
      "Fotos del taller de hace 10 años",
      "Sin precios orientativos — los clientes llamaban solo para preguntar precio",
    ],
    after: [
      "Web nueva 100% responsive con cita previa online",
      "Ficha Google actualizada con 52 reseñas (4.7 ⭐)",
      "Precios orientativos publicados — menos llamadas de 'solo precio'",
      "Fotos actuales del taller y del equipo",
      "4 clientes nuevos la primera semana desde la web nueva",
    ],
    metrics: [
      { label: "Citas online/mes", before: "0", after: "18", icon: "🔧" },
      { label: "Reseñas Google", before: "11 (desactualizadas)", after: "52 nuevas", icon: "⭐" },
      { label: "Clientes nuevos/mes", before: "0 desde internet", after: "10-14", icon: "👥" },
      { label: "Facturación adicional", before: "€0", after: "+€1.400/mes", icon: "💶" },
    ],
  },
  {
    id: 5,
    slug: "alma-serena",
    client: "Valentina Morales",
    business: "Alma Serena",
    sector: "Centro de yoga",
    city: "Granada",
    package: "Arranque Digital Mínimo",
    packageColor: "#22c55e",
    packageBg: "#f0fdf4",
    duration: "4 semanas",
    price: "€520",
    initials: "VM",
    avatarColor: "#c4714a",
    accent: "#9e5538",
    tagline: "45 alumnos fijos, Instagram activo, invisible en Google",
    quote: "Llevaba 6 meses con el mismo número de alumnos. En un mes conseguí 7 alumnas nuevas que me encontraron en Google. Nunca me habían encontrado así.",
    before: [
      "Sin ficha en Google Business — no aparecía en ninguna búsqueda",
      "Sin web — todo en Instagram, sin control sobre la plataforma",
      "Sin forma de comprar bonos online",
      "Primera clase gratis sin comunicar ni estructurar",
      "45 alumnos estancados durante 6 meses",
    ],
    after: [
      "Top 3 en 'yoga Granada' y 'yoga Realejo' en Google Maps",
      "Web con horario, precios y formulario de primera clase gratis",
      "24 reseñas en Google con media de 5.0 ⭐",
      "7 alumnas nuevas en el primer mes desde Google",
      "3 de ellas ya compraron el bono de 10 clases (€99 c/u)",
    ],
    metrics: [
      { label: "Alumnas nuevas/mes", before: "0 desde internet", after: "7", icon: "🧘" },
      { label: "Reseñas Google", before: "0", after: "24 (5.0 ⭐)", icon: "⭐" },
      { label: "Posición en Google", before: "No aparecía", after: "Top 3", icon: "🔍" },
      { label: "Facturación adicional", before: "€0", after: "+€693/mes", icon: "💶" },
    ],
  },
  {
    id: 6,
    slug: "linguaflow",
    client: "Carlos Mendoza",
    business: "LinguaFlow",
    sector: "Academia de idiomas",
    city: "Barcelona",
    package: "Estructura de Ventas Integrada",
    packageColor: "#3b82f6",
    packageBg: "#eff6ff",
    duration: "6 semanas",
    price: "€1.100",
    initials: "CM",
    avatarColor: "#2563eb",
    accent: "#1d4ed8",
    tagline: "Leads llegaban, pero el 70% desaparecía en las primeras 48h",
    quote: "Tenía tráfico pero no lo convertía. Ahora cada lead que entra recibe una secuencia automática y mi tasa de conversión pasó del 14% al 31%.",
    before: [
      "Web y redes activas pero sin sistema de seguimiento",
      "70% de los leads se perdían en las primeras 48h sin respuesta",
      "Sin CRM — los contactos en una hoja de Excel desorganizada",
      "Sin email automático de bienvenida ni nurturing",
      "Tasa de conversión lead → alumno: 14%",
    ],
    after: [
      "CRM en Brevo con pipeline completo de ventas",
      "Secuencia de 3 emails automáticos (0h, 24h, 72h)",
      "Tasa de conversión lead → alumno: 31% (+121%)",
      "Tiempo de respuesta al lead: de 24-48h a 0 minutos",
      "ROI del proyecto en el primer mes: +227%",
    ],
    metrics: [
      { label: "Tasa de conversión", before: "14%", after: "31%", icon: "📈" },
      { label: "Tiempo de respuesta", before: "24-48h", after: "0 minutos", icon: "⚡" },
      { label: "Alumnos nuevos/mes", before: "8", after: "19", icon: "👥" },
      { label: "ROI primer mes", before: "—", after: "+227%", icon: "💶" },
    ],
  },
  {
    id: 7,
    slug: "reyes-arquitectura",
    client: "Sofía Reyes",
    business: "Reyes Arquitectura",
    sector: "Arquitectura de interiores",
    city: "Valencia",
    package: "Mentoría de Crecimiento Avanzado",
    packageColor: "#C5A880",
    packageBg: "#fdf8f0",
    duration: "8 semanas",
    price: "€1.800",
    initials: "SR",
    avatarColor: "#0B2545",
    accent: "#C5A880",
    tagline: "Negocio consolidado, 100% dependiente de referidos",
    quote: "Quería dejar de depender de que alguien me recomendara. Ahora tengo un sistema que trae clientes de alto ticket de forma predecible.",
    before: [
      "100% de clientes por referidos — sin canal propio de captación",
      "Sin presencia en Meta Ads ni en ningún canal pagado",
      "Sin proceso de ventas documentado — todo en la cabeza de Sofía",
      "Ticket medio €3.200 pero sin forma de atraer más clientes así",
      "Crecimiento dependiente del boca a boca",
    ],
    after: [
      "4 campañas activas en Meta Ads con ROAS de 4.8x",
      "Proceso de ventas documentado en 6 etapas",
      "12 proyectos nuevos en 8 semanas desde Meta Ads",
      "Ticket medio mantenido en €3.200 (sin bajar precio)",
      "ROI del proyecto en 8 semanas: +2.179%",
    ],
    metrics: [
      { label: "Proyectos nuevos en 8 semanas", before: "0 desde ads", after: "12", icon: "🏛️" },
      { label: "ROAS Meta Ads", before: "—", after: "4.8x", icon: "📊" },
      { label: "Ticket medio", before: "€3.200", after: "€3.200 (mantenido)", icon: "💎" },
      { label: "ROI del proyecto", before: "—", after: "+2.179%", icon: "💶" },
    ],
  },
];

const PACKAGE_FILTERS = [
  { label: "Todos", value: "all" },
  { label: "Arranque Digital Mínimo", value: "Arranque Digital Mínimo" },
  { label: "Estructura de Ventas Integrada", value: "Estructura de Ventas Integrada" },
  { label: "Mentoría de Crecimiento Avanzado", value: "Mentoría de Crecimiento Avanzado" },
];

function CaseCard({ c, expanded, onToggle }: { c: typeof CASES[0]; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="p-7 pb-5">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: c.avatarColor }}
            >
              {c.initials}
            </div>
            <div>
              <h3 className="font-bold text-[#0B2545] text-lg leading-tight">{c.business}</h3>
              <p className="text-gray-400 text-sm">{c.client} · {c.sector} · {c.city}</p>
            </div>
          </div>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full shrink-0"
            style={{ backgroundColor: c.packageBg, color: c.packageColor }}
          >
            {c.package}
          </span>
        </div>

        <p className="text-gray-600 text-sm italic mb-5">"{c.tagline}"</p>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {c.metrics.map((m) => (
            <div key={m.label} className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-lg mb-1">{m.icon}</div>
              <div className="text-[#0B2545] font-bold text-sm">{m.after}</div>
              <div className="text-gray-400 text-xs mt-0.5 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="border-l-2 pl-4 py-1" style={{ borderColor: c.packageColor }}>
          <p className="text-gray-600 text-sm italic leading-relaxed">"{c.quote}"</p>
          <footer className="text-xs font-semibold mt-1" style={{ color: c.accent }}>— {c.client}, {c.business}</footer>
        </blockquote>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-center gap-2 py-3 border-t border-gray-100 text-sm font-medium text-gray-500 hover:text-[#0B2545] hover:bg-gray-50 transition-colors"
      >
        {expanded ? (
          <><ChevronUp size={16} /> Ocultar detalle antes/después</>
        ) : (
          <><ChevronDown size={16} /> Ver detalle antes/después</>
        )}
      </button>

      {/* Expanded before/after */}
      {expanded && (
        <div className="border-t border-gray-100">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center">
                  <XCircle size={14} className="text-red-400" />
                </div>
                <span className="font-semibold text-gray-700 text-sm">Antes de Kendrick</span>
              </div>
              <ul className="space-y-2">
                {c.before.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-green-500" />
                </div>
                <span className="font-semibold text-gray-700 text-sm">Después — {c.duration}</span>
              </div>
              <ul className="space-y-2">
                {c.after.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-5 text-center" style={{ backgroundColor: c.packageBg }}>
            <span className="text-xs font-semibold" style={{ color: c.accent }}>
              Paquete contratado: {c.package} · {c.price} · {c.duration}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Casos() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = filter === "all" ? CASES : CASES.filter((c) => c.package === filter);

  const totalRevenue = "+€7.133/mes";
  const avgROI = "+2.179%";

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="bg-[#0B2545] pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[#C5A880] text-xs tracking-[3px] uppercase font-sans font-semibold mb-6">
            Casos de éxito
          </span>
          <h1
            className="text-white text-4xl md:text-5xl mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Negocios reales.<br />
            <span className="text-[#C5A880]">Resultados reales.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            7 negocios que pasaron de ser invisibles en internet a tener clientes llegando solos. Sectores distintos, ciudades distintas, el mismo problema de fondo.
          </p>
          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>7</div>
              <div className="text-white/40 text-xs mt-1">Negocios transformados</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-3xl font-bold text-[#C5A880]" style={{ fontFamily: "'Playfair Display', serif" }}>{totalRevenue}</div>
              <div className="text-white/40 text-xs mt-1">Facturación adicional total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{avgROI}</div>
              <div className="text-white/40 text-xs mt-1">ROI máximo alcanzado</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[70px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto">
          {PACKAGE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.value
                  ? "bg-[#0B2545] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.label}
              <span className="ml-2 text-xs opacity-60">
                ({f.value === "all" ? CASES.length : CASES.filter((c) => c.package === f.value).length})
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Cases grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {filtered.map((c) => (
            <CaseCard
              key={c.id}
              c={c}
              expanded={expanded === c.id}
              onToggle={() => setExpanded(expanded === c.id ? null : c.id)}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} className="text-[#C5A880] fill-[#C5A880]" />
            ))}
          </div>
          <h2
            className="text-[#0B2545] text-3xl md:text-4xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ¿Tu negocio podría ser el siguiente?
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Empieza con el diagnóstico gratuito. En 5 minutos sabes exactamente en qué nivel estás y qué necesitas para conseguir más clientes.
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 bg-[#0B2545] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0d2d56] transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Hacer el diagnóstico gratuito
            <ArrowRight size={16} />
          </Link>
          <p className="text-gray-400 text-sm mt-4">5 minutos · Sin compromiso · Resultado inmediato</p>
        </div>
      </section>
    </div>
  );
}
