import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PortfolioItem {
  id: string;
  name: string;
  sector: string;
  package: string;
  image: string;
  metric: string;
  detail: string;
  color: string;
}

const PORTFOLIO: PortfolioItem[] = [
  {
    id: "fisiovida",
    name: "FisioVida Madrid",
    sector: "Fisioterapia · Madrid",
    package: "Nivel 01",
    image: "/portfolio/fisiovida.webp",
    metric: "+6 pacientes/mes",
    detail: "De 0 a Top 3 en Google en 4 semanas",
    color: "#0B2545",
  },
  {
    id: "barbearia",
    name: "Barbería Don Mateo",
    sector: "Barbería · Sevilla",
    package: "Nivel 01",
    image: "/portfolio/barbearia.webp",
    metric: "23 reservas online/mes",
    detail: "12 años de negocio, cero presencia digital",
    color: "#7c3aed",
  },
  {
    id: "linguaflow",
    name: "LinguaFlow",
    sector: "Academia de idiomas · Online",
    package: "Nivel 02",
    image: "/portfolio/linguaflow.webp",
    metric: "+€1.200/mes",
    detail: "Sistema de captación automatizado",
    color: "#0e7490",
  },
  {
    id: "reyes-arquitectura",
    name: "Reyes Arquitectura",
    sector: "Arquitectura · Valencia",
    package: "Nivel 02",
    image: "/portfolio/reyes-arquitectura.webp",
    metric: "3× más presupuestos",
    detail: "Embudo de leads desde LinkedIn y web",
    color: "#b45309",
  },
  {
    id: "dulceluna",
    name: "Pastelería Dulce Luna",
    sector: "Pastelería artesanal · Bilbao",
    package: "Nivel 01",
    image: "/portfolio/dulceluna.webp",
    metric: "+40% ventas online",
    detail: "Instagram + Google Maps + pedidos web",
    color: "#be185d",
  },
  {
    id: "alma-serena",
    name: "Yoga Alma Serena",
    sector: "Bienestar · Barcelona",
    package: "Nivel 03",
    image: "/portfolio/alma-serena.webp",
    metric: "Clases llenas en 6 sem.",
    detail: "Publicidad Meta + automatización de reservas",
    color: "#065f46",
  },
  {
    id: "autofix",
    name: "Taller AutoFix",
    sector: "Taller mecánico · Zaragoza",
    package: "Nivel 01",
    image: "/portfolio/autofix.webp",
    metric: "5-6 clientes nuevos/mes",
    detail: "30 años de oficio, ahora visible en Google",
    color: "#374151",
  },
];

export default function PortfolioCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemWidth = 380; // card width + gap
  const itemsPerView = typeof window !== "undefined" ? (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1) : 3;

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    const maxIndex = PORTFOLIO.length - itemsPerView;
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  }, [itemsPerView, isAnimating]);

  const goPrev = () => goTo(currentIndex - 1);
  const goNext = () => goTo(currentIndex + 1);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      const maxIndex = PORTFOLIO.length - newItemsPerView;
      if (currentIndex > maxIndex) {
        setCurrentIndex(maxIndex);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  const translateX = -currentIndex * itemWidth;

  return (
    <section className="py-20 bg-white" aria-label="Portfolio de proyectos">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
            Nuestro trabajo
          </span>
          <h2 className="text-[#0B2545] text-3xl md:text-4xl font-bold mt-2">
            Sitios que construimos y resultados reales
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">
            Cada tarjeta es un proyecto real entregado. Haz clic para ver el caso completo en /casos
          </p>
        </div>

        <div className="relative">
          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-4 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${translateX}px)` }}
            role="list"
            aria-label="Carrusel de casos de éxito"
          >
            {PORTFOLIO.map((item) => (
              <article
                key={item.id}
                className="relative flex-shrink-0 w-[380px] rounded-xl overflow-hidden border border-gray-100 bg-white group cursor-pointer"
                onClick={() => window.location.href = "/casos"}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && (window.location.href = "/casos")}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.name} - ${item.sector}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {/* Package badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-sm text-[#0B2545] text-[10px] font-bold tracking-widest uppercase font-sans px-2.5 py-1 rounded">
                      {item.package}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-[#0B2545] font-bold text-lg leading-tight mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-xs mb-3">{item.sector}</p>

                  <div className="bg-[#FAF8F5] rounded-lg p-3 mb-3">
                    <p className="text-[#0B2545] font-bold text-base leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.metric}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{item.detail}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-[10px] text-[#C5A880] font-bold tracking-widest uppercase font-sans">
                      Ver caso completo
                    </span>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-[#C5A880] transition-colors" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            disabled={currentIndex === 0 || isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-10 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0B2545] shadow-lg hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 z-10"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex >= PORTFOLIO.length - itemsPerView || isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-10 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0B2545] shadow-lg hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 z-10"
            aria-label="Siguiente"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(PORTFOLIO.length / itemsPerView) }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i * itemsPerView)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  Math.floor(currentIndex / itemsPerView) === i
                    ? "bg-[#C5A880] w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir a página ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-5 font-sans">
          Todos los sitios son funcionales y entregados con formación incluida.{" "}
          <a href="/casos" className="text-[#0B2545] font-semibold underline hover:text-[#C5A880]">
            Ver los 7 casos completos con métricas detalladas →
          </a>
        </p>
      </div>
    </section>
  );
}