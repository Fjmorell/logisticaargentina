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
              
            </div>
            {/* Columna 2 - Business (Recomendado) */}
            <div className="relative border-2 rounded-2xl p-6 shadow-md bg-white h-full flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg border-custom-red" >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-custom-red text-white px-3 py-1 rounded-full shadow">
                Recomendado
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-custom-dark">Empresario – Plan Premium</h3>
                <span className="text-xs bg-custom-blue text-custom-dark px-2 py-1 rounded">Nuestro servicio</span>
              </div>
              <p className="mt-3 text-gray-600">
                Pagás por volumen con cobertura total, integración avanzada y soporte exclusivo. Diseñado para compañías que necesitan escalar operaciones sin límites.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li>✅ Flota  nuestra → distribución total de tu mercadería</li>
                <li>✅ Cobertura full: local e interior</li>
                <li>✅ Más de 50 paquetes por envío</li>
                <li>✅ Cobertura superior a 100 km</li>
                <li>✅ Ruteo optimizado y planificación para máxima eficiencia</li>
                <li>✅ Seguimiento en tiempo real de tus paquetes</li>
                <li>✅ Reducción total de costos fijos (pólizas, choferes, daños de unidades)</li>
                <li>✅ Migración total de la distribución: vos solo enfocate en crecer</li>
              </ul>
              <div className="mt-6 border-t pt-4 text-sm text-gray-600">
                <p><span className="font-semibold">Costo:</span> Volumen optimizado (variable → decreciente)</p>
                <p><span className="font-semibold">Escalabilidad:</span> Máxima</p>
                <p><span className="font-semibold">Trazabilidad:</span> Total (portal + integración completa)</p>
              </div>
              <a
  href="https://wa.me/5491156193199?text=Hola! Quiero más info sobre el plan Premium 🚀"
  target="_blank"
  rel="noreferrer"
  className="mt-6 inline-block w-full text-center bg-custom-red text-white font-semibold py-3 rounded hover:bg-custom-red/90 transition"
>
  Quiero migrar a Business
</a>

              <p className="mt-3 text-xs text-center text-gray-500">
                Ideal para empresas que quieren bajar costos fijos y ganar velocidad.
              </p>
            </div>

                                  {/* Columna 4 - Híbrido (Transición) */}
<div className="relative border-2 rounded-2xl p-6 shadow-md bg-white h-full flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg border-custom-blue" >
  <div className="flex items-center justify-between">
    <h3 className="text-xl font-semibold text-custom-dark">Flex</h3>
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
    href="https://wa.me/5491156193199?text=Hola! Quiero más info sobre el plan Flex 🚀"
    target="_blank"
  rel="noreferrer"
    className="mt-6 inline-block w-full text-center bg-custom-blue text-custom-dark font-medium py-3 rounded hover:opacity-90 transition"
  >
    Empezar transición
  </a>
</div>

            {/* Columna 3 - Personalizar */}
<div className="relative border-2 rounded-2xl p-6 shadow-md bg-white h-full flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg border-purple-500">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-custom-dark">Personalizar</h3>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">A medida</span>
              </div>
              <p className="mt-3 text-gray-600">
                Configurá la distribución de tus paquetes según tus necesidades y optimizá tu negocio al máximo.

              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li>🛠️ Definí la cantidad de paquetes que necesitás distribuir</li>
                <li>🛠️ Ajustá la cantidad de kilómetros de recorrido a tu operación</li>
                <li>🛠️ Optimización total de tu distribución</li>
                <li>🛠️ Seguro de paquetería incluido</li>
                <li>ℹ️ Requiere volumen mínimo y onboarding dedicado</li>
              </ul>
              <div className="mt-6 border-t pt-4 text-sm text-gray-600">
                <p><span className="font-semibold">Costo:</span> Proyecto + variable</p>
                <p><span className="font-semibold">Escalabilidad:</span> Alta</p>
              </div>
              <a href="#cotizador" className="mt-6 inline-block w-full text-center bg-custom-dark text-white font-medium py-3 rounded hover:opacity-90 transition">
                Hablar con un asesor
              </a>
            </div>

          </div>

<div
  className="
    mt-10 
    text-center 
    bg-gradient-to-r 
    from-custom-blue 
    to-custom-blue-medium 
    rounded-2xl 
    p-4              /* menos padding en mobile */
    md:p-6           /* padding normal en desktop */
  "
>
  <p className="text-custom-dark font-medium text-sm md:text-base leading-relaxed">
    Reducí costos fijos y ganá trazabilidad desde el primer mes.{" "}
    <span className="font-semibold">
      Te ayudamos a migrar sin frenar tu operación.
    </span>
  </p>
  <a
    href="#cotizador"
    className="
      inline-block 
      mt-4 
      bg-custom-red 
      text-white 
      font-semibold 
      text-xs md:text-sm   /* letra más chica en mobile */
      px-4 py-2 
      rounded 
      hover:bg-custom-red/90 
      transition 
    "
  >
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
