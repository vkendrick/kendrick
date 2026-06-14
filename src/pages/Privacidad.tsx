import { Link } from "react-router-dom";

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link to="/" className="text-[#C5A880] text-sm hover:underline mb-8 inline-block">← Volver al inicio</Link>
        <h1 className="text-[#0B2545] text-3xl font-bold mb-2">Política de Privacidad</h1>
        <p className="text-gray-400 text-sm mb-10 font-sans">Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">1. Responsable del tratamiento</h2>
            <p className="leading-relaxed">
              <strong>Kendrick Consultoria Digital</strong><br />
              Email de contacto: veridiana@kendrick.com<br />
              En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
            </p>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">2. ¿Qué datos recogemos?</h2>
            <p className="leading-relaxed mb-3">Recogemos los siguientes datos personales:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Formulario de contacto:</strong> nombre, email, nombre del negocio y mensaje.</li>
              <li><strong>Quiz de diagnóstico:</strong> nombre, email, respuestas al cuestionario y resultado.</li>
              <li><strong>Cookies analíticas:</strong> datos de navegación anónimos (páginas visitadas, tiempo en el sitio).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">3. ¿Para qué usamos tus datos?</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Responder a tu consulta o solicitud de información.</li>
              <li>Enviarte el resultado de tu diagnóstico digital.</li>
              <li>Enviarte comunicaciones comerciales sobre nuestros servicios (solo si has dado tu consentimiento).</li>
              <li>Mejorar nuestro sitio web mediante análisis de uso anónimo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">4. Base legal del tratamiento</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Consentimiento explícito</strong> (Art. 6.1.a RGPD): para el envío de comunicaciones comerciales.</li>
              <li><strong>Interés legítimo</strong> (Art. 6.1.f RGPD): para responder a consultas y mejorar el servicio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">5. ¿Cuánto tiempo guardamos tus datos?</h2>
            <p className="leading-relaxed">
              Los datos de contacto y leads se conservan durante <strong>2 años</strong> desde la última interacción, o hasta que solicites su eliminación. Los datos analíticos son anónimos y no tienen límite de conservación.
            </p>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">6. ¿Compartimos tus datos?</h2>
            <p className="leading-relaxed">
              No vendemos ni cedemos tus datos a terceros para publicidad. Podemos compartirlos únicamente con proveedores de servicios técnicos (hosting, email) bajo acuerdos de confidencialidad y en cumplimiento del RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">7. Tus derechos</h2>
            <p className="leading-relaxed mb-3">Tienes derecho a:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Acceder</strong> a tus datos personales.</li>
              <li><strong>Rectificar</strong> datos incorrectos.</li>
              <li><strong>Suprimir</strong> tus datos ("derecho al olvido").</li>
              <li><strong>Oponerte</strong> al tratamiento.</li>
              <li><strong>Portabilidad</strong> de tus datos.</li>
              <li><strong>Retirar el consentimiento</strong> en cualquier momento.</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              Para ejercer cualquiera de estos derechos, escríbenos a <strong>veridiana@kendrick.com</strong> con el asunto "Derechos RGPD". También puedes presentar una reclamación ante la <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#0B2545] underline">Agencia Española de Protección de Datos (AEPD)</a>.
            </p>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">8. Cookies</h2>
            <p className="leading-relaxed">
              Utilizamos cookies técnicas (necesarias para el funcionamiento del sitio) y cookies analíticas (para medir visitas de forma anónima). Puedes gestionar tus preferencias en el banner de cookies o en la configuración de tu navegador.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
