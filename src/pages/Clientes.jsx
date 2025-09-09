import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeaderBottom from "@/components/HeaderBottom"; // 👈 nuevo


// importa la imagen para usarla en el <img>
import imagenLogistica from "@/assets/imagenlogisticacliente.jpeg";

const Clientes = () => {
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
        ></iframe>
      </section>

      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 mt-6 text-custom-dark">
        ¿Tercerizar o tener vehículo propio? <span className="text-red-600">Compará y decidí</span>
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



     {/* 🚚 Imagen completa debajo (ancho total con altura fija) */}
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
                <strong>Reducción de costos fijos</strong>: evitás compra y mantenimiento de flota,{" "}
                sueldos, seguros y gastos operativos.
              </li>
              <li>
                <strong>Flexibilidad y escalabilidad</strong>: ajustás la capacidad sin sobrecargar estructura.
              </li>
              <li>
                <strong>Cobertura nacional inmediata</strong>: acceso a transportistas validados y disponibles en todo el país.
              </li>
              <li>
                <strong>Gestión profesional 360°</strong>: validación, trazabilidad,{" "}
                asignación inteligente de carga, seguimiento en tiempo real.
              </li>
              <li>
                <strong>Calidad garantizada</strong>: servicios alineados a SLA con foco en puntualidad y experiencia del cliente.
              </li>
            </ul>

             {/* Botón debajo del bloque */}
  <div className="mt-8">
     <Link
      to="/cotizar"
      className="bg-custom-red text-white px-48 py-6 rounded shadow hover:bg-custom-red/80 transition"
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
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <input
                type="text"
                name="nombre"
                placeholder="Nombre *"
                className="border border-gray-300 rounded px-4 py-2 col-span-1"
                required
              />

              {/* Apellido */}
              <input
                type="text"
                name="apellido"
                placeholder="Apellido *"
                className="border border-gray-300 rounded px-4 py-2 col-span-1"
                required
              />

              {/* País */}
              <select
                name="pais"
                className="border border-gray-300 rounded px-4 py-2 col-span-1"
                required
              >
                <option value="">País *</option>
                <option value="Argentina">Argentina</option>
                <option value="Chile">Chile</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Paraguay">Paraguay</option>
              </select>

              {/* Cargo */}
              <input
                type="text"
                name="cargo"
                placeholder="Cargo *"
                className="border border-gray-300 rounded px-4 py-2 col-span-1"
                required
              />

              {/* Empresa */}
              <input
                type="text"
                name="empresa"
                placeholder="Empresa *"
                className="border border-gray-300 rounded px-4 py-2 col-span-2"
                required
              />

              {/* Correo */}
              <input
                type="email"
                name="correo"
                placeholder="Correo *"
                className="border border-gray-300 rounded px-4 py-2 col-span-2"
                required
              />

              {/* Teléfono */}
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono *"
                className="border border-gray-300 rounded px-4 py-2 col-span-2"
                required
              />

              {/* Mensaje */}
              <textarea
                name="mensaje"
                placeholder="Contanos un poco de tu empresa *"
                rows="3"
                className="border border-gray-300 rounded px-4 py-2 col-span-2 resize-none"
                required
              />

              {/* Botón */}
              <div className="col-span-2 text-center mt-4">
                <button
                  type="submit"
                  className="bg-custom-red text-white px-6 py-3 rounded hover:bg-custom-red/80 transition"
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
       

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Clientes;
