import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Clientes = () => {
  return (
    <>
      <Navbar />

      {/* 🎥 Video YouTube embebido */}
      <section className="relative w-full bg-black">
        <div className="relative pb-[35%] h-0 overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/KDsLb_8vUFE?autoplay=1&mute=1&loop=1&playlist=KDsLb_8vUFE"
            title="Video para clientes"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* ✅ Pros vs Contras */}
      <section className="bg-gray-100 py-12 px-4">
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
              ❌ Costos de tener logística propia
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
      <section className="bg-white text-gray-800 px-6 py-16 min-h-screen">
        <div className="max-w-5xl mx-auto text-center">

          <Link
            to="/contacto"
            className="inline-block mt-10 bg-custom-red text-white px-6 py-3 rounded hover:bg-custom-red/80 transition"
          >
            Quiero una solución logística
          </Link>

          {/* 📝 Formulario de contacto */}
          <div className="mt-16 bg-gray-100 p-8 rounded-lg shadow-md text-left">
            <h2 className="text-2xl font-bold mb-6 text-custom-dark">
              ¿Querés que te contactemos?
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre del negocio */}
              <div className="flex flex-col">
                <label htmlFor="nombre" className="mb-1 font-medium">Nombre del negocio</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="border border-gray-300 rounded px-4 py-2"
                  placeholder="Ej: Transporte Martínez SRL"
                  required
                />
              </div>

              {/* Rubro */}
              <div className="flex flex-col">
                <label htmlFor="rubro" className="mb-1 font-medium">Rubro / Actividad</label>
                <input
                  type="text"
                  id="rubro"
                  name="rubro"
                  className="border border-gray-300 rounded px-4 py-2"
                  placeholder="Ej: Distribución de alimentos"
                  required
                />
              </div>

              {/* Localidad */}
              <div className="flex flex-col">
                <label htmlFor="localidad" className="mb-1 font-medium">Localidad / Provincia</label>
                <input
                  type="text"
                  id="localidad"
                  name="localidad"
                  className="border border-gray-300 rounded px-4 py-2"
                  placeholder="Ej: Córdoba, Buenos Aires"
                  required
                />
              </div>

              {/* Envíos por mes */}
              <div className="flex flex-col">
                <label htmlFor="envios" className="mb-1 font-medium">Cantidad de envíos por mes</label>
                <input
                  type="number"
                  id="envios"
                  name="envios"
                  className="border border-gray-300 rounded px-4 py-2"
                  placeholder="Ej: 300"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 rounded px-4 py-2"
                  placeholder="ejemplo@empresa.com"
                  required
                />
              </div>

              {/* Teléfono */}
              <div className="flex flex-col">
                <label htmlFor="telefono" className="mb-1 font-medium">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  className="border border-gray-300 rounded px-4 py-2"
                  placeholder="+54 9 ..."
                  required
                />
              </div>
            </form>

            <div className="mt-8">
              <button
                type="submit"
                className="bg-custom-red text-white px-6 py-3 rounded hover:bg-custom-red/80 transition"
              >
                Enviar consulta
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Clientes;
