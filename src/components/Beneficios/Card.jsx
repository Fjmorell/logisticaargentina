import React from "react";
import beneficio1 from "@/assets/beneficios/1.webp";
import beneficio2 from "@/assets/beneficios/2.webp";
import beneficio3 from "@/assets/beneficios/3.webp";
import beneficio4 from "@/assets/beneficios/4.webp";
import beneficio5 from "@/assets/beneficios/5.webp";

const MiniCard = () => {
  const miniCardsData = [
    {
      imageUrl: beneficio1,
      title: "Cuenta Corriente de Combustible",
      description: "Siempre ten tu tanque lleno y listo para la distribución!",
    },
    {
      imageUrl: beneficio2,
      title: "10% en Neumáticos",
      description: "Te ayudamos a tener siempre lo mejor y más nuevo",
    },
    {
      imageUrl: beneficio3,
      title: "10% en Repuestos",
      description:
        "Que nada te impida estar siempre en movimiento y generando ingresos",
    },
    {
      imageUrl: beneficio4,
      title: "10% en Lubricantes",
      description:
        "Queremos tanto como vos que tu vehículo siempre funcione con lo mejor",
    },
    {
      imageUrl: beneficio5,
      title: "Viaja Seguro y Tranquilo",
      description:
        "Te damos una póliza de seguro y paga una tarifa de hasta un 20% de lo que pagas actualmente",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {miniCardsData.map((card, index) => (
          <div
            key={index}
            className="group relative w-full bg-custom-blue-medium rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-48 sm:h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="p-4 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white transition-colors duration-300 group-hover:text-yellow-300">
                {card.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-custom-dark transition-opacity duration-300 group-hover:opacity-90">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCard;
