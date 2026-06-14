import { Link } from "react-router-dom";
import { Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B2545] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <div className="text-white font-bold text-xl tracking-wider mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                KENDRICK
              </div>
              <div className="text-[#C5A880] text-[9px] tracking-[3px] uppercase font-sans">
                Consultoria Digital
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Ayudamos a pequeños negocios a conseguir más clientes usando internet. Sin tecnicismos, sin complicaciones.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com/kendrickconsultoria" target="_blank" rel="noopener noreferrer"
                className="text-white/40 hover:text-[#C5A880] transition-colors">
                <ExternalLink size={16} />
              </a>
              <a href="https://linkedin.com/company/kendrickconsultoria" target="_blank" rel="noopener noreferrer"
                className="text-white/40 hover:text-[#C5A880] transition-colors">
                <ExternalLink size={16} />
              </a>
              <a href="mailto:veridiana@kendrick.com"
                className="text-white/40 hover:text-[#C5A880] transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-[#C5A880] text-xs tracking-[2px] uppercase font-sans font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="/#servicios" className="hover:text-white transition-colors">Arranque Digital Mínimo</a></li>
              <li><a href="/#servicios" className="hover:text-white transition-colors">Estructura de Ventas Integrada</a></li>
              <li><a href="/#servicios" className="hover:text-white transition-colors">Mentoría de Crecimiento Avanzado</a></li>
              <li><Link to="/quiz" className="hover:text-white transition-colors">Diagnóstico Gratuito</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#C5A880] text-xs tracking-[2px] uppercase font-sans font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link to="/terminos" className="hover:text-white transition-colors">Términos de Servicio</Link></li>
              <li><a href="/#contacto" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
            <div className="mt-6">
              <p className="text-white/40 text-xs">veridiana@kendrick.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Kendrick Consultoria Digital. Todos los derechos reservados.
          </p>
          <p className="text-white/20 text-xs">
            Cumplimiento RGPD · España
          </p>
        </div>
      </div>
    </footer>
  );
}
