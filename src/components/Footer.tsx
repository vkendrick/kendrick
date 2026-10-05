import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const WA_NUMBER = "34658598442";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20Kendrick%20Consultoria%20Digital.`;

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
            <div className="flex gap-3 mt-6">
              {/* WhatsApp */}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] text-xs font-semibold px-4 py-2 rounded-full transition-colors font-sans"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              {/* Email */}
              <a
                href="mailto:veridiana@kendrick.com"
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors font-sans"
              >
                <Mail size={14} />
                Email
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-[#C5A880] text-xs tracking-[2px] uppercase font-sans font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="/#servicios" className="hover:text-white transition-colors">Landing que vende (€250)</a></li>
              <li><a href="/#servicios" className="hover:text-white transition-colors">Tráfico gestionado (€300/mes)</a></li>
              <li><Link to="/quiz" className="hover:text-white transition-colors">Diagnóstico Gratuito</Link></li>
            </ul>
          </div>

          {/* Legal + contacto */}
          <div>
            <h4 className="text-[#C5A880] text-xs tracking-[2px] uppercase font-sans font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link to="/terminos" className="hover:text-white transition-colors">Términos de Servicio</Link></li>
              <li><a href="/#contacto" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
            <div className="mt-6 space-y-1">
              <p className="text-white/40 text-xs">veridiana@kendrick.com</p>
              <p className="text-white/40 text-xs">+34 658 598 442</p>
            </div>
          </div>
        </div>

        {/* WhatsApp flotante CTA */}
        <div className="border-t border-white/10 pt-8 mb-4">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold py-4 rounded-xl text-sm hover:bg-[#1ebe5d] transition-colors active:scale-[0.97]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escríbenos por WhatsApp ahora
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
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
