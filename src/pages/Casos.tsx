import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

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
    packageName: "Empezar a existir",
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
    packageName: "Empezar a existir",
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
    packageName: "Dejar de perder clientes",
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
    packageName: "Dejar de perder clientes",
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
      "Propuesta de campańas para Meta Ads",
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
    packageName: "Empezar a existir",
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
    packageName: "Empezar a existir",
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
    packageName: "Empezar a existir",
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

// Miniaturas vivas de cada entrega + métrica ilustrativa de resultado
const SHOTS: Record<number, {
  url: string; metric: string; detail: string;
  photo: string; kicker: string; title: string; highlight: string; cta: string; base: string; accent: string;
}> = {
  1: { url: "fisiovidamadrid.es", metric: "38 leads/mes", detail: "A €3,80 por lead",
      photo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=60",
      kicker: "Fisioterapia · Madrid", title: "Recupera tu", highlight: "movilidad", cta: "Pedir cita", base: "#0B2545", accent: "#C5A880" },
  2: { url: "barberiadonmateo.es", metric: "23 reservas/mes", detail: "Desde Instagram Ads",
      photo: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=60",
      kicker: "Barbería · Sevilla", title: "El arte del", highlight: "corte", cta: "Reservar", base: "#141414", accent: "#d4a94e" },
  3: { url: "linguaflow.es", metric: "+€1.200/mes", detail: "Con campañas Meta",
      photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
      kicker: "Idiomas · Online", title: "Habla inglés", highlight: "en 6 meses", cta: "Probar gratis", base: "#0e4a5c", accent: "#38bdf8" },
  4: { url: "reyesarquitectura.es", metric: "3× presupuestos", detail: "Desde Google Ads",
      photo: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=60",
      kicker: "Arquitectura · Valencia", title: "Espacios que", highlight: "inspiran", cta: "Pedir presupuesto", base: "#2d1b00", accent: "#d4a94e" },
  5: { url: "pasteleriadulceluna.es", metric: "+40% ventas", detail: "Con Meta Ads desde €10/día",
      photo: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=60",
      kicker: "Pastelería · Bilbao", title: "Tartas que", highlight: "enamoran", cta: "Encargar", base: "#5b1229", accent: "#f472b6" },
  6: { url: "almaserena.es", metric: "97% ocupación", detail: "Con Meta Ads",
      photo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=60",
      kicker: "Yoga · Granada", title: "Respira, estira,", highlight: "vive", cta: "Clase de prueba", base: "#022c22", accent: "#34d399" },
  7: { url: "autofixzaragoza.es", metric: "+5 clientes/mes", detail: "Desde Google Ads",
      photo: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=60",
      kicker: "Taller · Zaragoza", title: "Tu coche en", highlight: "buenas manos", cta: "Pedir presupuesto", base: "#1f2937", accent: "#fbbf24" },
};

function CaseLight({ c, n }: { c: (typeof CASES)[0]; n: string }) {
  const shot = SHOTS[c.id];
  return (
    <article className="relative bg-white rounded-3xl border border-gray-100 overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none select-none absolute top-3 right-5 z-10 text-[56px] font-bold leading-none text-white/90"
        style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 1px 12px rgba(0,0,0,.25)" }}
      >
        {n}
      </span>
      <div className="relative h-60 md:h-80 overflow-hidden bg-[#0B2545]">
        <img src={shot.photo} alt={`${c.business}`} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute left-5 top-4 rounded-full bg-black/55 backdrop-blur px-3 py-1 text-[10px] text-white/90 font-sans">
          {shot.url}
        </span>
        <div className="absolute left-5 bottom-5 right-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[2px] uppercase font-sans text-white/70">
              {c.package} · {c.packageName}
            </p>
            <h2 className="text-white text-2xl md:text-3xl font-bold mt-1">{c.business}</h2>
            <p className="text-white/60 text-xs mt-1">{c.sector}</p>
          </div>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <div className="inline-block rounded-xl bg-[#FAF8F5] border border-gray-100 px-5 py-3 mb-5">
          <p className="text-[#0B2545] font-bold text-2xl leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {shot.metric}
          </p>
          <p className="text-gray-400 text-xs mt-0.5">{shot.detail}</p>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">{c.tagline}</p>
        <div className="grid sm:grid-cols-3 gap-2 mb-5">
          {c.after.map((a) => (
            <div key={a} className="flex items-start gap-2 rounded-lg bg-[#FAF8F5] p-3 text-xs text-gray-600 font-medium">
              <CheckCircle2 size={13} className="text-[#C5A880] mt-0.5 shrink-0" />
              {a}
            </div>
          ))}
        </div>
        <blockquote className="text-gray-500 text-xs leading-relaxed italic border-l-2 border-[#C5A880] pl-3">
          "{c.quote}"
          <span className="block text-[#C5A880] font-semibold not-italic mt-1">— {c.client}</span>
        </blockquote>
      </div>
    </article>
  );
}

function CaseDark({ c, n, flip }: { c: (typeof CASES)[0]; n: string; flip: boolean }) {
  const shot = SHOTS[c.id];
  return (
    <article className="relative overflow-hidden rounded-3xl bg-[#0B2545] grid md:grid-cols-2">
      <span
        aria-hidden
        className="pointer-events-none select-none absolute top-2 right-5 text-[56px] font-bold leading-none text-white/10"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {n}
      </span>
      <div className={`p-6 md:p-8 flex flex-col ${flip ? "md:order-2" : ""}`}>
        <span className="text-[10px] text-[#C5A880] font-bold tracking-[2px] uppercase font-sans">
          {c.package} · {c.packageName}
        </span>
        <h2 className="text-white text-2xl font-bold mt-1">{c.business}</h2>
        <p className="text-white/40 text-xs mb-4">{c.sector}</p>
        <p className="font-bold leading-none mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#C5A880", fontSize: "44px" }}>
          {shot.metric}
        </p>
        <p className="text-white/50 text-xs mb-5">{shot.detail}</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-5 text-white/70">{c.tagline}</p>
        <ul className="space-y-2 mb-5">
          {c.after.map((a) => (
            <li key={a} className="flex items-start gap-2 text-sm text-white/80">
              <CheckCircle2 size={14} className="text-[#C5A880] mt-0.5 shrink-0" />
              {a}
            </li>
          ))}
        </ul>
        <blockquote className="mt-auto text-white/60 text-xs leading-relaxed italic border-l-2 border-[#C5A880] pl-3">
          "{c.quote}"
          <span className="block text-[#C5A880] font-semibold not-italic mt-1">— {c.client}</span>
        </blockquote>
      </div>
      <div className={`relative min-h-72 overflow-hidden ${flip ? "md:order-1" : ""}`}>
        <img src={shot.photo} alt={`${c.business}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute left-4 bottom-4 rounded-full bg-black/55 backdrop-blur px-3 py-1 text-[10px] text-white/90 font-sans">
          {shot.url}
        </span>
      </div>
    </article>
  );
}

export default function Casos() {
  return (
    <main>
      <section className="bg-[#0B2545] pt-32 pb-16 px-6 text-center">
        <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
          Antes → Después
        </span>
        <h1 className="text-white text-4xl md:text-5xl font-bold mt-3 mb-4">
          7 entregas que se pueden ver
        </h1>
        <p className="text-white/50 text-base max-w-md mx-auto">
          Cada proyecto: lo que había, lo que entregamos. Sin promesas vacías.
        </p>
      </section>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          {CASES.map((c, i) => {
            const n = String(c.id).padStart(2, "0");
            return i % 2 === 0 ? (
              <CaseLight key={c.id} c={c} n={n} />
            ) : (
              <CaseDark key={c.id} c={c} n={n} flip={i % 4 === 3} />
            );
          })}
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
