import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowRight, CheckCircle2, ChevronDown, ChevronUp,
  Star, Clock, Search, Zap, BarChart3,
  MessageSquare, Phone
} from "lucide-react";

// ─── DATOS ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "+120", label: "Negocios ayudados" },
  { value: "3×", label: "Más clientes en promedio" },
  { value: "-40%", label: "Menos gasto en publicidad" },
  { value: "98%", label: "Clientes satisfechos" },
];

const SERVICES = [
  {
    level: "Nivel 1",
    name: "Arranque Digital Mínimo",
    price: "€450 – €600",
    duration: "4 semanas",
    tagline: "Para negocios que aún no existen en internet",
    description:
      "Si cuando alguien busca tu negocio en Google no apareces, o tu única herramienta de ventas es el boca a boca, este es tu punto de partida. En 4 semanas tienes todo lo básico funcionando.",
    deliverables: [
      "Página web de una sola pantalla, lista para recibir clientes",
      "Tu negocio visible en Google Maps y búsquedas locales",
      "Botón de WhatsApp para que los clientes te contacten al instante",
      "Guía de 15 minutos semanales para mantener tu presencia activa",
      "Informe completo de cómo está tu negocio online hoy (PDF)",
    ],
    color: "border-l-4 border-[#C5A880]",
    badge: "Más popular para empezar",
  },
  {
    level: "Nivel 2",
    name: "Estructura de Ventas Integrada",
    price: "€850 – €1.200",
    duration: "6 semanas",
    tagline: "Para negocios con presencia, pero sin sistema",
    description:
      "Tienes redes sociales, quizás una web, pero los clientes interesados se pierden porque no hay un proceso claro de seguimiento. Conectamos todo para que ningún cliente potencial se escape.",
    deliverables: [
      "Revisión completa de tu web y redes (qué funciona y qué no)",
      "Sistema de seguimiento de clientes (CRM: Brevo o HubSpot gratuito)",
      "3 emails automáticos que se envían solos cuando alguien te contacta",
      "Instalación de píxeles para saber de dónde vienen tus clientes",
      "Panel de control en Notion para ver tus ventas de un vistazo",
      "Sesión de formación de 90 minutos (grabada para que la revises cuando quieras)",
    ],
    color: "border-l-4 border-[#0B2545]",
    badge: "Mayor retorno de inversión",
  },
  {
    level: "Nivel 3",
    name: "Mentoría de Crecimiento Avanzado",
    price: "€1.500 – €2.000",
    duration: "8 semanas",
    tagline: "Para negocios listos para crecer con publicidad",
    description:
      "Tu negocio ya funciona bien online. Ahora quieres más clientes y estás dispuesto a invertir en publicidad. Te ayudamos a hacerlo bien desde el principio para no desperdiciar dinero.",
    deliverables: [
      "Configuración completa de publicidad en Facebook/Instagram y Google",
      "Panel en tiempo real para ver qué anuncios funcionan y cuáles no",
      "Manual personalizado de crecimiento (PDF 20+ páginas)",
      "Revisiones cada 2 semanas para ajustar y mejorar",
      "Estrategia para llegar a personas similares a tus mejores clientes",
    ],
    note: "⚠️ El presupuesto de publicidad (lo que pagas a Facebook/Google) no está incluido en el precio del servicio.",
    color: "border-l-4 border-[#C5A880]/60",
    badge: "Para escalar",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Search,
    title: "Auditoría",
    desc: "Revisamos cómo está tu negocio online hoy: web, redes, Google. Te decimos exactamente qué está fallando y por qué.",
  },
  {
    step: "02",
    icon: Zap,
    title: "Estructura",
    desc: "Construimos o mejoramos tu presencia digital con las herramientas correctas para tu tipo de negocio.",
  },
  {
    step: "03",
    icon: MessageSquare,
    title: "Revisión",
    desc: "Revisamos juntos cada entregable antes de darlo por terminado. Tú apruebas, nosotros ajustamos.",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Entrega",
    desc: "Recibes todo funcionando, con formación incluida para que puedas manejarlo tú mismo sin depender de nadie.",
  },
];

const TESTIMONIALS = [
  {
    name: "Carmen Rodríguez",
    role: "Dueña de clínica dental",
    location: "Madrid",
    date: "Marzo 2025",
    text: "Antes mis pacientes me encontraban solo por recomendación. Ahora recibo 3 o 4 consultas nuevas cada semana desde Google. El cambio fue en menos de un mes.",
    rating: 5,
    initials: "CR",
    color: "bg-[#0B2545]",
  },
  {
    name: "Marcos Oliveira",
    role: "Dueño de restaurante",
    location: "Barcelona",
    date: "Enero 2025",
    text: "Pensaba que necesitaba gastar miles en publicidad. Con el paquete básico, en 4 semanas ya tenía mi Google Maps optimizado y empecé a recibir reservas online. Muy recomendable.",
    rating: 5,
    initials: "MO",
    color: "bg-[#C5A880]",
  },
  {
    name: "Laura Sánchez",
    role: "Estilista independiente",
    location: "Valencia",
    date: "Abril 2025",
    text: "No entendía nada de marketing digital. Veridiana me explicó todo en palabras simples y en 6 semanas tenía un sistema que me trae clientes solos. Ahora tengo agenda llena.",
    rating: 5,
    initials: "LS",
    color: "bg-[#1a3a6b]",
  },
];

const CASE_STUDY = {
  client: "Clínica Dental AR",
  sector: "Salud — Madrid",
  before: [
    "0 reseñas en Google",
    "Sin página web propia",
    "100% de clientes por boca a boca",
    "Agenda con huecos todas las semanas",
  ],
  after: [
    "47 reseñas en Google (4.9 ★)",
    "Página web con formulario de citas",
    "3-4 consultas nuevas por semana desde internet",
    "Agenda completa con lista de espera",
  ],
  duration: "4 semanas",
  package: "Arranque Digital Mínimo",
};

const FAQS = [
  {
    q: "¿Necesito saber de tecnología para trabajar con vosotros?",
    a: "Para nada. Nosotros nos encargamos de todo lo técnico. Tú solo necesitas tener claro qué quieres conseguir con tu negocio. Al final te entregamos todo funcionando y te explicamos cómo usarlo en palabras simples.",
  },
  {
    q: "¿Cuánto tiempo tengo que dedicarle yo?",
    a: "Muy poco. Necesitamos una reunión inicial de 60 minutos para entender tu negocio, y luego revisiones cortas cada semana. El resto lo hacemos nosotros. Al terminar, te enseñamos a mantenerlo en 15 minutos semanales.",
  },
  {
    q: "¿Qué pasa si no me gustan los resultados?",
    a: "Antes de empezar firmamos un contrato con los entregables exactos que vas a recibir. Revisamos juntos cada pieza antes de darla por terminada. Si algo no cumple lo acordado, lo corregimos sin coste adicional.",
  },
  {
    q: "¿Por qué no contratar a alguien más barato en Fiverr?",
    a: "Puedes hacerlo. La diferencia es que en Fiverr recibes una tarea aislada (una web, un logo) sin estrategia. Nosotros construimos un sistema completo que funciona junto: web + Google + seguimiento de clientes. Es la diferencia entre comprar ladrillos y construir una casa.",
  },
  {
    q: "¿Funciona para mi tipo de negocio?",
    a: "Hemos trabajado con clínicas dentales, restaurantes, peluquerías, talleres mecánicos, tiendas de ropa, psicólogos y muchos más. Si tienes clientes locales o vendes servicios, funciona. Haz el diagnóstico gratuito y te decimos exactamente qué necesitas.",
  },
  {
    q: "¿Cuándo empiezo a ver resultados?",
    a: "Depende del paquete. Con el Arranque Digital Mínimo, en 2-3 semanas ya apareces en Google y tienes tu web activa. Los primeros clientes desde internet suelen llegar entre la semana 3 y 6. No prometemos milagros, pero sí resultados medibles.",
  },
];

// ─── COMPONENTES INTERNOS ─────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-[#0B2545] text-base leading-snug">{q}</span>
        {open ? (
          <ChevronUp size={18} className="text-[#C5A880] shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-gray-400 shrink-0" />
        )}
      </button>
      {open && (
        <p className="pb-5 text-gray-600 text-sm leading-relaxed">{a}</p>
      )}
    </div>
  );
}

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────

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
        setForm({ name: "", email: "", company: "", message: "", consent: false });
      } else {
        toast.error("Algo salió mal. Escríbenos directamente a veridiana@kendrick.com");
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
      <section className="relative min-h-screen flex items-center bg-[#0B2545] overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-consultant.jpg"
            alt="Consultor digital trabajando"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545] via-[#0B2545]/90 to-[#0B2545]/60" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[#C5A880] text-xs tracking-[3px] uppercase font-sans font-semibold mb-6">
              Consultoría Digital · Hecho para pequeños negocios
            </span>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Más clientes para tu negocio.{" "}
              <span className="text-[#C5A880] italic">Sin complicaciones.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              Ayudamos a dueños de pequeños negocios a conseguir más clientes usando internet. Sin tecnicismos, sin contratos eternos, con resultados en semanas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/quiz"
                className="inline-flex items-center justify-center gap-2 bg-[#C5A880] text-[#0B2545] font-bold px-7 py-4 rounded text-sm tracking-wide transition-all duration-200 hover:bg-[#d4bc9a] active:scale-[0.97]"
              >
                Descubre qué necesita tu negocio — Gratis
                <ArrowRight size={16} />
              </Link>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-7 py-4 rounded text-sm tracking-wide transition-all duration-200 hover:bg-white/10"
              >
                Ver servicios
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-lg p-6 text-center backdrop-blur-sm">
                <div className="text-[#C5A880] text-3xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.value}
                </div>
                <div className="text-white/60 text-xs font-sans">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="bg-[#FAF8F5] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="section-label inline-block mb-4" style={{ color: "#C5A880", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 600 }}>
            ¿Te suena familiar?
          </span>
          <h2 className="text-[#0B2545] text-3xl md:text-4xl font-bold mb-12 leading-tight">
            El problema que tienen la mayoría de pequeños negocios
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔍",
                title: "Nadie te encuentra en Google",
                desc: "Cuando alguien busca lo que ofreces, aparecen tus competidores. Tú, no.",
              },
              {
                icon: "📱",
                title: "Tienes redes pero no clientes",
                desc: "Publicas en Instagram, pero esos seguidores no se convierten en ventas reales.",
              },
              {
                icon: "🔄",
                title: "Todo depende del boca a boca",
                desc: "Si un mes viene poco trabajo, no tienes forma de activar más clientes.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-left">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#0B2545] text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-[#0B2545] rounded-lg text-white text-center">
            <p className="text-lg font-semibold">
              No es culpa tuya. Nadie te enseñó a hacer marketing digital cuando montaste tu negocio.
            </p>
            <p className="text-white/70 text-sm mt-2">
              Nosotros sí sabemos cómo hacerlo, y lo hacemos por ti.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span style={{ color: "#C5A880", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 600 }}>
              Nuestros servicios
            </span>
            <h2 className="text-[#0B2545] text-3xl md:text-4xl font-bold mt-3 mb-4">
              Elige según dónde está tu negocio hoy
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              No vendemos lo mismo a todos. Primero entendemos tu situación y te recomendamos lo que realmente necesitas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.name} className={`bg-white rounded-lg p-7 shadow-sm ${s.color} relative flex flex-col`}>
                {s.badge && (
                  <span className="absolute -top-3 left-6 bg-[#C5A880] text-[#0B2545] text-xs font-bold px-3 py-1 rounded-full">
                    {s.badge}
                  </span>
                )}
                <div className="mb-5">
                  <span className="text-xs text-gray-400 font-sans uppercase tracking-widest">{s.level}</span>
                  <h3 className="text-[#0B2545] text-xl font-bold mt-1 mb-1">{s.name}</h3>
                  <p className="text-[#C5A880] text-xs font-sans font-semibold">{s.tagline}</p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{s.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={14} className="text-[#C5A880] mt-0.5 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
                {s.note && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-3 mb-5 leading-relaxed">
                    {s.note}
                  </p>
                )}
                <div className="border-t border-gray-100 pt-5 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[#0B2545] text-xl font-bold">{s.price}</span>
                      <span className="text-gray-400 text-xs ml-2 font-sans">· {s.duration}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-gray-400 font-sans">
                      <Clock size={12} /> {s.duration}
                    </span>
                  </div>
                  <Link
                    to="/quiz"
                    className="block text-center bg-[#0B2545] text-white font-semibold text-sm px-4 py-3 rounded hover:bg-[#1a3a6b] transition-colors"
                  >
                    Quiero este servicio →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm mb-4">¿No sabes cuál necesitas?</p>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 bg-[#C5A880] text-[#0B2545] font-bold px-7 py-3.5 rounded text-sm hover:bg-[#d4bc9a] transition-colors"
            >
              Haz el diagnóstico gratuito (3 min) <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section id="como-funciona" className="py-24 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span style={{ color: "#C5A880", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 600 }}>
              El proceso
            </span>
            <h2 className="text-[#0B2545] text-3xl md:text-4xl font-bold mt-3">
              Así trabajamos contigo
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative text-center">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-[#C5A880]/30" />
                )}
                <div className="relative z-10 w-16 h-16 rounded-full bg-[#0B2545] flex items-center justify-center mx-auto mb-4">
                  <step.icon size={22} className="text-[#C5A880]" />
                </div>
                <span className="text-[#C5A880] text-xs font-bold font-sans tracking-widest">{step.step}</span>
                <h3 className="text-[#0B2545] font-bold text-base mt-1 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASO DE ESTUDIO ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span style={{ color: "#C5A880", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 600 }}>
              Caso real
            </span>
            <h2 className="text-[#0B2545] text-3xl font-bold mt-3">
              De invisible a agenda llena en 4 semanas
            </h2>
          </div>
          <div className="bg-[#FAF8F5] rounded-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2">
              <div className="p-8 border-r border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-sm">✗</div>
                  <div>
                    <p className="font-bold text-[#0B2545] text-sm">Antes</p>
                    <p className="text-gray-400 text-xs">{CASE_STUDY.client} · {CASE_STUDY.sector}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {CASE_STUDY.before.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-red-400">✗</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                  <div>
                    <p className="font-bold text-[#0B2545] text-sm">Después — {CASE_STUDY.duration}</p>
                    <p className="text-[#C5A880] text-xs font-semibold">{CASE_STUDY.package}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {CASE_STUDY.after.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <CheckCircle2 size={14} className="text-green-500 shrink-0" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-[#0B2545] p-6 text-center">
              <p className="text-white/70 text-sm">
                "En menos de un mes pasé de que nadie me encontrara en internet a tener la agenda llena."
              </p>
              <p className="text-[#C5A880] text-xs font-semibold mt-2">— Dra. Ana Rodríguez, Clínica Dental AR, Madrid</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              to="/casos"
              className="inline-flex items-center gap-2 border-2 border-[#0B2545] text-[#0B2545] px-7 py-3 rounded-full font-semibold text-sm hover:bg-[#0B2545] hover:text-white transition-all duration-200"
            >
              Ver los 7 casos de éxito completos
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section id="testimonios" className="py-24 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span style={{ color: "#C5A880", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 600 }}>
              Lo que dicen nuestros clientes
            </span>
            <h2 className="text-[#0B2545] text-3xl md:text-4xl font-bold mt-3">
              Resultados reales, negocios reales
            </h2>
          </div>

          {/* Logo wall */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 opacity-40">
            {["Clínica AR", "Restaurante Oliveira", "Studio LS", "Taller García", "Boutique Marta"].map((b) => (
              <div key={b} className="bg-white border border-gray-200 rounded px-5 py-2 text-xs font-semibold text-gray-500 font-sans">
                {b}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-lg p-7 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-[#C5A880] fill-[#C5A880]" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B2545] text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role} · {t.location}</p>
                  </div>
                  <span className="ml-auto text-gray-300 text-xs font-sans">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPO ── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/images/team-meeting.jpg"
                alt="Equipo Kendrick en reunión de trabajo"
                className="rounded-lg w-full object-cover shadow-md"
                style={{ maxHeight: 380 }}
              />
              <div className="absolute -bottom-4 -right-4 bg-[#C5A880] text-[#0B2545] rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>5+</div>
                <div className="text-xs font-semibold font-sans">años de experiencia</div>
              </div>
            </div>
            <div>
              <span style={{ color: "#C5A880", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 600 }}>
                Quiénes somos
              </span>
              <h2 className="text-[#0B2545] text-3xl font-bold mt-3 mb-4">
                Consultores que hablan tu idioma
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Somos un equipo especializado en ayudar a pequeños negocios a crecer online. No somos una gran agencia con procesos complicados. Somos consultores que se sientan contigo, entienden tu negocio y construyen soluciones que tú puedes manejar.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Hemos trabajado con más de 120 negocios en España. Sabemos qué funciona para una clínica dental, un restaurante familiar o una tienda de barrio. Y lo hacemos sin tecnicismos.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Google Ads", "Meta Ads", "SEO Local", "CRM", "Automatización", "Analítica Web"].map((skill) => (
                  <span key={skill} className="bg-[#FAF8F5] border border-gray-200 text-[#0B2545] text-xs px-3 py-1.5 rounded-full font-sans font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span style={{ color: "#C5A880", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 600 }}>
              Preguntas frecuentes
            </span>
            <h2 className="text-[#0B2545] text-3xl font-bold mt-3">
              Dudas que suelen tener nuestros clientes
            </h2>
          </div>
          <div className="bg-white rounded-lg px-6 shadow-sm border border-gray-100">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA CENTRAL ── */}
      <section className="py-24 bg-[#0B2545] text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span style={{ color: "#C5A880", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 600 }}>
            Empieza hoy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Descubre qué necesita tu negocio. Gratis.
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            En 3 minutos te decimos exactamente en qué nivel está tu negocio y qué deberías hacer primero para conseguir más clientes.
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 bg-[#C5A880] text-[#0B2545] font-bold px-8 py-4 rounded text-sm tracking-wide hover:bg-[#d4bc9a] transition-colors"
          >
            Hacer el diagnóstico gratuito <ArrowRight size={16} />
          </Link>
          <p className="text-white/40 text-xs mt-4 font-sans">Sin compromiso · Sin tarjeta de crédito · 3 minutos</p>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span style={{ color: "#C5A880", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 600 }}>
                Contacto
              </span>
              <h2 className="text-[#0B2545] text-3xl font-bold mt-3 mb-4">
                ¿Tienes alguna pregunta?
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Escríbenos y te respondemos en menos de 24 horas. Sin presiones, sin vendedores agresivos. Solo una conversación honesta sobre tu negocio.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F5] flex items-center justify-center">
                    <Phone size={15} className="text-[#C5A880]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-sans">Email</p>
                    <p className="text-[#0B2545] text-sm font-semibold">veridiana@kendrick.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F5] flex items-center justify-center">
                    <Clock size={15} className="text-[#C5A880]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-sans">Respuesta</p>
                    <p className="text-[#0B2545] text-sm font-semibold">Menos de 24 horas</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleContact} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-sans">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2545] transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-sans">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2545] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-sans">Nombre de tu negocio</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2545] transition-colors"
                  placeholder="Ej: Clínica Dental García"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-sans">¿En qué podemos ayudarte? *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0B2545] transition-colors resize-none"
                  placeholder="Cuéntanos brevemente cómo está tu negocio online hoy y qué quieres conseguir..."
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
                  He leído y acepto la{" "}
                  <Link to="/privacidad" className="text-[#0B2545] underline hover:text-[#C5A880]">
                    Política de Privacidad
                  </Link>
                  . Mis datos se usarán únicamente para responder a mi consulta.
                </span>
              </label>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#0B2545] text-white font-bold py-3.5 rounded text-sm hover:bg-[#1a3a6b] transition-colors disabled:opacity-60"
              >
                {sending ? "Enviando..." : "Enviar mensaje →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
