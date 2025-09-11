// src/pages/Clientes.jsx
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeaderBottom from "@/components/HeaderBottom";
import emailjs from "emailjs-com";

// Assets
import imagenLogistica from "@/assets/imagenlogisticacliente.jpeg";
import logo from "@/assets/Logo.png"; // tu logo

/** ===== Modal de agradecimiento con animación ===== */
function ThankYouModal({ open, onClose }) {
  const [visible, setVisible] = useState(false);

  // Transición de entrada
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
                  transition-colors duration-500
                  ${visible ? "bg-black/50" : "bg-black/0"}`}
      onClick={onClose} // cerrar al clickear el overlay
    >
      <div
        className={`bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-4
                    transform transition-all duration-300
                    ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        onClick={(e) => e.stopPropagation()} // evitar cierre si clickean dentro
        role="dialog"
        aria-modal="true"
        aria-labelledby="thanks-title"
      >
        <img
          src={logo}
          alt="Logística Argentina"
          className="mx-auto mb-4 w-28 h-28 object-contain"
        />
        <h2 id="thanks-title" className="text-2xl font-bold text-gray-800 mb-2">
          ¡Gracias!
        </h2>
        <p className="text-gray-600">
          Un asesor se estara comunicando con usted.
        </p>
        <button
          onClick={onClose}
          className="mt-6 bg-custom-red text-white px-6 py-2 rounded-lg hover:bg-custom-red/80 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

const Clientes = () => {
  const form = useRef();
  const [showPopup, setShowPopup] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_d9v74oq",     // Service ID
        "template_nul9thn",    // Template ID real
        form.current,
        "JjxWeNLY6AHDKkGBn"    // Public Key
      )
      .then(
        () => {
          setShowPopup(true);
          form.current.reset();

          // 🔔 Autocerrar a los 4s (ajustable o quitar si no lo querés)
          setTimeout(() => setShowPopup(false), 4000);
        },
        (error) => {
          console.error(error?.text || error);
          alert("Error al enviar la consulta. Por favor, intenta nuevamente.");
        }
      );
  };

  return (
    <>
      <Navbar />

      {/* 🎥 Video YouTube embebido - full width con altura controlada */}
      <section className="w-full h-[25vh] min-h-[300px] max-h-[50vh] overflow-hidden relative">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/KDsLb_8vUFE?autoplay=1&mute=1&loop=1&playlist=KDsLb_8vUFE"
          title="Video para clientes"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </section>

      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 mt-6 text-custom-dark">
        ¿Tercerizar o tener vehículo propio?{" "}
        <span className="text-red-600">Compará y decidí</span>
      </h2>

      {/* ✅ Pros vs Contras estilo mitad/mitad */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 text-white">
        {/* PROS */}
        <div className="bg-red-700 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            ✅ Beneficios de tercerizar el transporte
          </h2>
          <ul className="space-y-4 list-disc list-inside">
            <li>Ahorrás en combustible, mantenimiento y seguros</li>
            <li>No necesitás contratar ni gestionar choferes</li>
            <li>Te enfocás 100% en tu negocio</li>
            <li>Accedés a trazabilidad y reportes en tiempo real</li>
            <li>Flexibilidad para escalar según tu demanda</li>
          </ul>
        </div>

        {/* CONTRAS */}
        <div className="bg-gray-200 text-gray-900 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-700">
            ❌ Costos de tener vehículo propio
          </h2>
          <ul className="space-y-4 list-disc list-inside">
            <li>Gastos de mantenimiento</li>
            <li>Seguros y patentes</li>
            <li>Sueldos, cargas sociales y conflictos laborales con choferes</li>
            <li>Repuestos, talleres y grúas</li>
            <li>El estrés de coordinar todo eso</li>
          </ul>
        </div>
      </section>

      {/* 🚚 Imagen completa debajo */}
      <section className="w-full">
        <img
          src={imagenLogistica}
          alt="Logística sin preocupaciones"
          className="w-full h-[400px] object-cover"
        />
      </section>

      <HeaderBottom />

      {/* 🚛 Beneficios + Formulario en dos columnas */}
      <section className="bg-white py-20 px-6 text-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 📝 Descripción a la izquierda */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-custom-dark">
              Por qué tercerizar la distribución de tus productos es la mejor decisión
            </h2>
            <p className="mb-4">
              En un mercado cada vez más competitivo,{" "}
              <strong>tercerizar la gestión de transporte</strong> no es un gasto,
              sino una <strong>inversión estratégica</strong> que impulsa la eficiencia y rentabilidad de tu empresa.
            </p>
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <strong>Reducción de costos fijos</strong>: evitás compra y mantenimiento de flota, sueldos, seguros y gastos operativos.
              </li>
              <li>
                <strong>Flexibilidad y escalabilidad</strong>: ajustás la capacidad sin sobrecargar estructura.
              </li>
              <li>
                <strong>Cobertura nacional inmediata</strong>: acceso a transportistas validados y disponibles en todo el país.
              </li>
              <li>
                <strong>Gestión profesional 360°</strong>: validación, trazabilidad, asignación inteligente de carga, seguimiento en tiempo real.
              </li>
              <li>
                <strong>Calidad garantizada</strong>: servicios alineados a SLA con foco en puntualidad y experiencia del cliente.
              </li>
            </ul>

            {/* Botón debajo del bloque */}
            <div className="mt-8">
      <Link
  to="/cotizar"
  className="
    bg-custom-red 
    text-white 
    text-sm md:text-base 
    font-semibold 
    w-full md:w-auto   /* ocupa todo el ancho en mobile, auto en desktop */
    px-6 py-3 
    md:px-12 md:py-5 
    rounded 
    shadow 
    hover:bg-custom-red/80 
    transition 
    block text-center   /* asegura que el texto quede centrado */
  "
>
  Quiero Cotizar
</Link>

            </div>
          </div>

          {/* 📋 Formulario a la derecha */}
          <div className="bg-custom-blue p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-custom-dark">
              Completá el formulario y obtené una demo gratuita
            </h3>

            <form
  ref={form}
  onSubmit={sendEmail}
  className="grid grid-cols-1 md:grid-cols-2 gap-4"
>
  <input
    type="text"
    name="nombre"
    placeholder="Nombre *"
    className="border border-gray-300 rounded px-4 py-2 w-full"
    required
  />
  <input
    type="text"
    name="apellido"
    placeholder="Apellido *"
    className="border border-gray-300 rounded px-4 py-2 w-full"
    required
  />
  <select
    name="pais"
    className="border border-gray-300 rounded px-4 py-2 w-full"
    required
  >
    <option value="">País *</option>
    <option value="Argentina">Argentina</option>
    <option value="Chile">Chile</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Paraguay">Paraguay</option>
  </select>
  <input
    type="text"
    name="cargo"
    placeholder="Cargo *"
    className="border border-gray-300 rounded px-4 py-2 w-full"
    required
  />
  <input
    type="text"
    name="empresa"
    placeholder="Empresa *"
    className="border border-gray-300 rounded px-4 py-2 w-full md:col-span-2"
    required
  />
  <input
    type="email"
    name="email"
    placeholder="Correo *"
    className="border border-gray-300 rounded px-4 py-2 w-full md:col-span-2"
    required
  />
  <input
    type="tel"
    name="telefono"
    placeholder="Teléfono *"
    className="border border-gray-300 rounded px-4 py-2 w-full md:col-span-2"
    required
  />
  <textarea
    name="mensaje"
    placeholder="Contanos un poco de tu empresa *"
    rows="3"
    className="border border-gray-300 rounded px-4 py-2 w-full resize-none md:col-span-2"
    required
  />
  <div className="col-span-1 md:col-span-2 text-center mt-4">
    <button
      type="submit"
      className="bg-custom-red text-white px-6 py-3 w-full md:w-auto rounded-lg hover:bg-custom-red/80 transition"
    >
      Enviar consulta
    </button>
  </div>
</form>

          </div>
        </div>

        {/* 🧾 Frase debajo del formulario */}
        <div className="mt-8 text-center bg-custom-blue py-6 px-4 rounded-lg">
          <p className="text-2xl md:text-3xl font-semibold text-gray-900">
            Dejá que nosotros nos ocupemos de la logística, vos ocupate de tu negocio.
          </p>
        </div>
      </section>

      {/* Modal de confirmación */}
      <ThankYouModal open={showPopup} onClose={() => setShowPopup(false)} />

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Clientes;
