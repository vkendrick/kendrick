import { Link } from "react-router-dom";

export default function Terminos() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link to="/" className="text-[#C5A880] text-sm hover:underline mb-8 inline-block">← Volver al inicio</Link>
        <h1 className="text-[#0B2545] text-3xl font-bold mb-2">Términos de Servicio</h1>
        <p className="text-gray-400 text-sm mb-10 font-sans">Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">1. Información general</h2>
            <p className="leading-relaxed">
              Estos Términos de Servicio regulan la relación entre <strong>Kendrick Consultoria Digital</strong> (en adelante, "Kendrick") y sus clientes. Al contratar cualquiera de nuestros servicios, aceptas estos términos en su totalidad.
            </p>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">2. Descripción de los servicios</h2>
            <p className="leading-relaxed">
              Kendrick ofrece servicios de consultoría digital para pequeños negocios, incluyendo: creación de presencia digital, configuración de sistemas de captación de clientes, formación y mentoría en marketing digital. Los entregables específicos de cada servicio se detallan en el contrato individual firmado con cada cliente.
            </p>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">3. Proceso de contratación</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>El servicio comienza con una sesión de diagnóstico gratuita de 30 minutos.</li>
              <li>Tras la sesión, se entrega una propuesta detallada con entregables, plazos y precio.</li>
              <li>El servicio se formaliza mediante contrato escrito y pago del 50% por adelantado.</li>
              <li>El 50% restante se abona al finalizar el proyecto y aprobar los entregables.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">4. Plazos y entregables</h2>
            <p className="leading-relaxed">
              Los plazos indicados en cada paquete (4, 6 u 8 semanas) son estimaciones basadas en una colaboración fluida del cliente. Kendrick no se responsabiliza de retrasos causados por falta de información, materiales o aprobaciones por parte del cliente.
            </p>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">5. Política de revisiones</h2>
            <p className="leading-relaxed">
              Cada entregable incluye hasta <strong>2 rondas de revisiones</strong> sin coste adicional. Las revisiones adicionales se facturarán a €75/hora. Las revisiones deben solicitarse dentro de los 7 días siguientes a la entrega.
            </p>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">6. Política de cancelación y reembolso</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Antes de iniciar el proyecto:</strong> reembolso completo del anticipo.</li>
              <li><strong>Durante el proyecto:</strong> se factura el trabajo realizado hasta la fecha de cancelación. El anticipo cubre este importe.</li>
              <li><strong>Una vez entregado el proyecto:</strong> no se realizan reembolsos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">7. Propiedad intelectual</h2>
            <p className="leading-relaxed">
              Una vez completado el pago total, el cliente recibe todos los derechos sobre los entregables creados específicamente para su negocio (web, textos, diseños). Kendrick se reserva el derecho de mencionar el proyecto como caso de estudio en su portfolio, salvo indicación contraria del cliente.
            </p>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">8. Limitación de responsabilidad</h2>
            <p className="leading-relaxed">
              Kendrick no garantiza resultados específicos en términos de ventas, leads o posicionamiento, ya que estos dependen de múltiples factores externos. Nos comprometemos a entregar el trabajo acordado con la máxima calidad y profesionalidad.
            </p>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">9. Ley aplicable</h2>
            <p className="leading-relaxed">
              Estos términos se rigen por la legislación española. Para cualquier disputa, las partes se someten a los juzgados y tribunales de Madrid, renunciando a cualquier otro fuero.
            </p>
          </section>

          <section>
            <h2 className="text-[#0B2545] text-xl font-bold mb-3">10. Contacto</h2>
            <p className="leading-relaxed">
              Para cualquier consulta sobre estos términos: <strong>veridiana@kendrick.com</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
