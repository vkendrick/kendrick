import { useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

const PROJECTS = [
  { name: "FisioVida Madrid", category: "Salud · Landing page", image: "/project-images/fisiovida-madrid.webp" },
  { name: "Barbería Don Mateo", category: "Servicios · Landing page", image: "/project-images/barberia-don-mateo.webp" },
  { name: "Pastelería Dulce Luna", category: "Gastronomía · Landing page", image: "/project-images/dulce-luna.webp" },
  { name: "Yoga Alma Serena", category: "Bienestar · Landing page", image: "/project-images/alma-serena.webp" },
  { name: "Taller AutoFix", category: "Automoción · Landing page", image: "/project-images/taller-autofix.webp" },
  { name: "Código del Sueño", category: "Familias · Plataforma digital", image: "/project-images/codigo-del-sueno.webp" },
  { name: "Primeiros 1000 Dias", category: "Educación · Producto digital", image: "/project-images/primeiros-1000-dias.webp" },
  { name: "SOS Cólicas e Gases", category: "Salud · Producto digital", image: "/project-images/sos-colicas-gases.webp" },
  { name: "Casa Sin Sorpresas", category: "Mantenimiento · Lead magnet", image: "/project-images/casa-sin-sorpresas.webp" },
  { name: "Signal Relay", category: "Trading · SaaS", image: "/project-images/signal-relay.webp" },
  { name: "Mentora para Mujeres Líderes", category: "Mentoría · Marca personal", image: "/project-images/mentora-mujeres-lideres.webp" },
  { name: "Menos telas. Mais aprendizado.", category: "Educación infantil · Producto digital", image: "/project-images/menos-telas.webp" },
  { name: "Prisma", category: "Marketing · SaaS", image: "/project-images/prisma.webp" },
  { name: "Dulces sin azúcar", category: "Nutrición · Producto digital", image: "/project-images/dulces-sin-azucar.webp" },
  { name: "VitalMax", category: "Bienestar · Producto digital", image: "/project-images/vitalmax.webp" },
];

export default function ProjectShowcase() {
  const [index, setIndex] = useState(0);
  const visible = [0, 1, 2].map((offset) => PROJECTS[(index + offset) % PROJECTS.length]);

  const move = (direction: number) => {
    setIndex((current) => (current + direction + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <section className="py-24 bg-[#FAF8F5]" aria-labelledby="proyectos-realizados">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[#C5A880] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
              Vitrina de proyectos
            </span>
            <h2 id="proyectos-realizados" className="text-[#0B2545] text-3xl md:text-4xl font-bold mt-2">
              Otros trabajos que realizamos
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mt-3 leading-relaxed">
              Una selección de landing pages, productos digitales y sistemas creados para negocios de distintos sectores.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => move(-1)} aria-label="Proyecto anterior" className="w-10 h-10 rounded-full border border-gray-200 bg-white text-[#0B2545] flex items-center justify-center hover:border-[#C5A880] transition-colors">
              <ArrowLeft size={16} />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Siguiente proyecto" className="w-10 h-10 rounded-full bg-[#0B2545] text-white flex items-center justify-center hover:bg-[#1a3a6b] transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5" aria-live="polite">
          {visible.map((project) => (
            <article key={project.name} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="relative aspect-[16/10] bg-[#0B2545] overflow-hidden">
                <img
                  src={project.image}
                  alt={`Captura del proyecto ${project.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-white/80 text-[10px] tracking-widest uppercase font-sans">
                  {project.category}
                </span>
              </div>
              <div className="p-5 flex items-center justify-between gap-4">
                <h3 className="text-[#0B2545] font-bold text-sm">{project.name}</h3>
                <ExternalLink size={15} className="text-[#C5A880] shrink-0" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 mt-7" aria-label="Navegação da vitrine">
          {PROJECTS.map((project, dotIndex) => (
            <button key={project.name} type="button" onClick={() => setIndex(dotIndex)} aria-label={`Ver ${project.name}`} className={`h-1.5 rounded-full transition-all ${dotIndex === index ? "w-6 bg-[#0B2545]" : "w-1.5 bg-gray-300"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
