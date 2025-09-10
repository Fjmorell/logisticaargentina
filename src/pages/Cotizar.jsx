// src/pages/Cotizar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeaderBottom from "@/components/HeaderBottom";
import QuoteCalculator from "@/components/QuoteCalculator";

// importa la imagen si la necesitás
import imagenLogistica from "@/assets/imagenlogisticacliente.jpeg";

const Cotizar = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    setEnviado(true);
    setFormData({
      nombre: "",
      empresa: "",
      correo: "",
      telefono: "",
      mensaje: "",
    });
  };

  return (
    <>
      <Navbar />

      {/* 🎥 Video YouTube embebido */}
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

      {/* 🧭 Comparativa: Vehículo propio vs Business vs Personalizar */}
      <section className="bg-white py-16 px-6 text-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-custom-dark">
            Elegí la mejor forma de mover tus productos
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Pasá de costos fijos y complejidad operativa a un modelo flexible, escalable y con SLA.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Columna 1 - Vehículo propio */}

            <div className="border rounded-2xl p-6 shadow-sm bg-white h-full flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-custom-dark">Vehículo propio</h3>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Modelo tradicional</span>
              </div>
              <p className="mt-3 text-gray-600">
                Control total, pero con altos costos fijos y gestión compleja.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li>❌ Compra/mantenimiento de flota (CAPEX)</li>
                <li>❌ Sueldos, cargas sociales, vacaciones, reemplazos</li>
                <li>❌ Seguros, patentes, neumáticos, taller</li>
                <li>❌ Capacidad ociosa fuera de picos</li>
                <li>❌ Cobertura limitada a tu radio habitual</li>
                <li>⚠️ Riesgo operativo ante ausencias/roturas</li>
              </ul>
              <div className="mt-6 border-t pt-4 text-sm text-gray-600">
                <p><span className="font-semibold">Costo:</span> Alto y fijo</p>
                <p><span className="font-semibold">Escalabilidad:</span> Baja</p>
                <p><span className="font-semibold">Trazabilidad:</span> Limitada (depende de tu sistema)</p>
              </div>
              <a href="#cotizador" className="mt-6 inline-block w-full text-center bg-gray-200 text-custom-dark font-medium py-3 rounded hover:bg-gray-300 transition">
                Evaluar costos actuales
              </a>
            </div>
            {/* Columna 2 - Business (Recomendado) */}
            <div className="relative border-2 rounded-2xl p-6 shadow-md bg-white h-full flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg border-custom-red" >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-custom-red text-white px-3 py-1 rounded-full shadow">
                Recomendado
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-custom-dark">Business</h3>
                <span className="text-xs bg-custom-blue text-custom-dark px-2 py-1 rounded">Nuestro servicio</span>
              </div>
              <p className="mt-3 text-gray-600">
                Pagás por envío, con cobertura nacional y SLA medibles. Sin flota propia.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li>✅ Costo variable por envío (sin CAPEX)</li>
                <li>✅ Cobertura federal con transportistas validados</li>
                <li>✅ Trazabilidad y seguimiento en tiempo real</li>
                <li>✅ Escala inmediata en picos y campañas</li>
                <li>✅ KPIs y SLA alineados a tu negocio</li>
                <li>✅ Soporte operativo dedicado</li>
              </ul>
              <div className="mt-6 border-t pt-4 text-sm text-gray-600">
                <p><span className="font-semibold">Costo:</span> Variable y optimizado</p>
                <p><span className="font-semibold">Escalabilidad:</span> Alta</p>
                <p><span className="font-semibold">Trazabilidad:</span> Full (portal/integ.)</p>
              </div>
              <a href="#cotizador" className="mt-6 inline-block w-full text-center bg-custom-red text-white font-semibold py-3 rounded hover:bg-custom-red/90 transition">
                Quiero migrar a Business
              </a>
              <p className="mt-3 text-xs text-center text-gray-500">
                Ideal para empresas que quieren bajar costos fijos y ganar velocidad.
              </p>
            </div>

                                  {/* Columna 4 - Híbrido (Transición) */}
<div className="border rounded-2xl p-6 shadow-sm bg-white h-full flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg">
  <div className="flex items-center justify-between">
    <h3 className="text-xl font-semibold text-custom-dark">Basic</h3>
    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Paso intermedio</span>
  </div>
  <p className="mt-3 text-gray-600">
    Combiná tu flota actual con la nuestra para potenciar tu rendimiento, liberar recursos y enfocarte en hacer crecer tu negocio. Accedé a rutas nuevas y zonas no cubiertas a nivel local.
  </p>

  <ul className="mt-6 space-y-3 text-sm">
    <li>✅ Uso mixto: flota propia + flota SLA</li>
    <li>✅ Absorbé picos sin comprar unidades</li>
    <li>✅ Expandí cobertura de forma inmediata</li>
    <li>✅ Hasta 30 paquetes por envío</li>
    <li>✅ Distribución hasta 100 km por operación</li>
    <li>✅ Planificación inteligente de entregas</li>
    <li>✅ Ruteo optimizado para máxima eficiencia</li>
    <li>✅ Seguimiento en tiempo real de tus paquetes</li>
    <li>✅ Reducción gradual de costos fijos</li>
    <li>✅ Ideal para migraciones por etapas</li>
  </ul>

  <div className="mt-6 border-t pt-4 text-sm text-gray-600">
    <p><span className="font-semibold">Costo:</span> Mixto (fijo + variable)</p>
    <p><span className="font-semibold">Escalabilidad:</span> Media → Alta</p>
    <p><span className="font-semibold">Trazabilidad:</span> Unificada</p>
  </div>

  <a
    href="#cotizador"
    className="mt-6 inline-block w-full text-center bg-custom-blue text-custom-dark font-medium py-3 rounded hover:opacity-90 transition"
  >
    Empezar transición
  </a>
</div>

            {/* Columna 3 - Personalizar */}
            <div className="border rounded-2xl p-6 shadow-sm bg-white h-full flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-custom-dark">Personalizar</h3>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">A medida</span>
              </div>
              <p className="mt-3 text-gray-600">
                Configuramos reglas, integraciones y branding a tu operación.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li>🛠️ Integración API/ERP/WMS</li>
                <li>🛠️ Reglas de despacho por zona, peso y SLA</li>
                <li>🛠️ Ventanas horarias y requisitos especiales</li>
                <li>🛠️ Etiquetas y documentación con tu marca</li>
                <li>🛠️ Reportes y KPIs personalizados</li>
                <li>ℹ️ Requiere onboarding y volumen mínimo</li>
              </ul>
              <div className="mt-6 border-t pt-4 text-sm text-gray-600">
                <p><span className="font-semibold">Costo:</span> Proyecto + variable</p>
                <p><span className="font-semibold">Escalabilidad:</span> Alta</p>
                <p><span className="font-semibold">Trazabilidad:</span> Full + KPIs a medida</p>
              </div>
              <a href="#cotizador" className="mt-6 inline-block w-full text-center bg-custom-dark text-white font-medium py-3 rounded hover:opacity-90 transition">
                Hablar con un asesor
              </a>
            </div>

          </div>




          {/* Franja de cierre */}
          <div className="mt-10 text-center bg-gradient-to-r from-custom-blue to-custom-blue-medium rounded-2xl p-6">
            <p className="text-custom-dark font-medium">
              Reducí costos fijos y ganá trazabilidad desde el primer mes. <span className="font-semibold">Te ayudamos a migrar sin frenar tu operación.</span>
            </p>
            <a href="#cotizador" className="inline-block mt-4 bg-custom-red text-white px-6 py-3 rounded hover:bg-custom-red/90 transition">
              Cotizar en 2 minutos
            </a>
          </div>
        </div>
      </section>

      {/* Carrusel de marcas debajo de la comparativa */}
      <HeaderBottom />

      {/* 🔽 Cotizador inmediato */}
      <QuoteCalculator />

     

      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Cotizar;
