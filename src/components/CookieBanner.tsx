import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setTimeout(() => setVisible(true), 1500);
  }, []);

  const accept = (all: boolean) => {
    localStorage.setItem("cookie-consent", all ? "all" : "necessary");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
        <Cookie size={20} className="text-[#C5A880] shrink-0 mt-0.5" />
        <p className="text-sm text-gray-600 flex-1 leading-relaxed">
          Usamos cookies técnicas (necesarias) y analíticas (para medir visitas de forma anónima).
          No compartimos tus datos con terceros para publicidad.{" "}
          <Link to="/privacidad" className="text-[#0B2545] underline hover:text-[#C5A880]">
            Política de Privacidad
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => accept(false)}
            className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 border border-gray-200 rounded transition-colors"
          >
            Solo necesarias
          </button>
          <button
            onClick={() => accept(true)}
            className="text-sm bg-[#0B2545] text-white px-4 py-2 rounded hover:bg-[#1a3a6b] transition-colors font-semibold"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
