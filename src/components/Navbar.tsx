import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isQuiz = location.pathname === "/quiz";
  // /casos tem header escuro → texto claro; demais páginas (hero/páginas claras) → texto azul-marinho
  const darkHeader = location.pathname.startsWith("/casos");
  const lightText = scrolled || darkHeader;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Servicios", href: "/#servicios" },
    { label: "Casos", href: "/casos" },
    { label: "Cómo Funciona", href: "/#como-funciona" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contacto", href: "/#contacto" },
  ];

  if (isQuiz) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B2545]/95 backdrop-blur-sm shadow-lg"
          : darkHeader
            ? "bg-transparent"
            : "bg-white/85 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className={`${lightText ? "text-white" : "text-[#0B2545]"} font-bold text-lg tracking-wider`} style={{ fontFamily: "'Playfair Display', serif" }}>
            KENDRICK
          </span>
          <span className="text-[#C5A880] text-[9px] tracking-[3px] uppercase font-sans">
            Consultoria Digital
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) =>
            l.href.startsWith("/") && !l.href.startsWith("/#") ? (
              <Link
                key={l.label}
                to={l.href}
                className={`${lightText ? "text-white/80 hover:text-[#C5A880]" : "text-[#0B2545]/70 hover:text-[#0B2545]"} text-sm font-medium transition-colors duration-200`}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className={`${lightText ? "text-white/80 hover:text-[#C5A880]" : "text-[#0B2545]/70 hover:text-[#0B2545]"} text-sm font-medium transition-colors duration-200`}
              >
                {l.label}
              </a>
            ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/quiz"
            className="bg-[#C5A880] text-[#0B2545] font-bold text-sm px-5 py-2.5 rounded transition-all duration-200 hover:bg-[#d4bc9a] active:scale-[0.97]"
          >
            Diagnóstico Gratuito
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-1 ${lightText ? "text-white" : "text-[#0B2545]"}`}
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0B2545] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) =>
            l.href.startsWith("/") && !l.href.startsWith("/#") ? (
              <Link
                key={l.label}
                to={l.href}
                className="text-white/80 text-sm font-medium py-1"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="text-white/80 text-sm font-medium py-1"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            )
          )}
          <Link
            to="/quiz"
            className="bg-[#C5A880] text-[#0B2545] font-bold text-sm px-5 py-3 rounded text-center mt-2"
            onClick={() => setOpen(false)}
          >
            Diagnóstico Gratuito
          </Link>
        </div>
      )}
    </header>
  );
}
