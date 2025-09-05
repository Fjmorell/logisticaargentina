import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton"; // Asegurate que exista y esté bien la ruta

const Clientes = () => {
  return (
    <>
      <Navbar />

      {/* 🎥 Video YouTube embebido */}
      <section className="relative w-full bg-black">
        <div className="relative pb-[25%] h-0 overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/KDsLb_8vUFE?autoplay=1&mute=1&loop=1&playlist=KDsLb_8vUFE"
            title="Video para clientes"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
<h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-custom-dark">
  ¿Tercerizar o tener vehículo propio? Compará y decidí
</h2>

      {/* ✅ Pros vs Contras */}
      <section className="bg-custom-blue py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* PROS */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              ✅ Beneficios de tercerizar tu logística
            </h2>
            <ul className="space-y-4 list-disc list-inside text-gray-800">
              <li>Ahorrás en combustible, mantenimiento y seguros</li>
              <li>No necesitás contratar ni gestionar choferes</li>
              <li>Te enfocás 100% en tu negocio</li>
              <li>Accedés a trazabilidad y reportes en tiempo real</li>
              <li>Flexibilidad para escalar según tu demanda</li>
            </ul>
          </div>

          {/* CONTRAS */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-700">
              ❌ Costos de tener vehículo propio
            </h2>
            <ul className="space-y-4 list-disc list-inside text-gray-800">
              <li>Costos fijos altos por vehículos y sueldos</li>
              <li>Gastos de mantenimiento y repuestos</li>
              <li>Tiempo perdido en coordinación de entregas</li>
              <li>Complicaciones ante faltas o roturas</li>
              <li>Difícil escalar rápido en épocas pico</li>
            </ul>
          </div>
        </div>
      </section>
      

      {/* 🚛 Beneficios + Formulario */}
     {/* 🚛 Beneficios + Formulario en dos columnas */}
<section className="bg-white py-20 px-6 text-gray-800">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
    
    {/* 📝 Descripción a la izquierda */}
    <div>
      <h2 className=" text-3xl font-bold mb-6 text-custom-dark">
        Por qué tercerizar la distribución de tus productos es la mejor decisión
      </h2>
      <p className="mb-4">
        En un mercado cada vez más competitivo, <strong>tercerizar la gestión de transporte</strong> no es un gasto,
        sino una <strong>inversión estratégica</strong> que impulsa la eficiencia y rentabilidad de tu empresa.
      </p>
      <ul className="space-y-3 list-disc list-inside">
        <li><strong>Reducción de costos fijos</strong>: evitás compra y mantenimiento de flota, suledo, seguros y gastos operativos.</li>
        <li><strong>Flexibilidad y escalabilidad</strong>: ajustás la capacidad sin sobrecargar estructura.</li>
        <li><strong>Cobertura nacional inmediata</strong>: acceso a transportistas validados y disponible en todo el país.</li>
        <li><strong>Gestión profesional 360°</strong>: validación, trazabilidad, asignacion inteligente de carga, seguimiento en tiempo real.</li>
        <li><strong>Calidad garantizada</strong>: servicios alineados a SLA con foco en puntualidad y experinecia del cliente.</li>
      </ul>
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
          placeholder="Mensaje *"
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
