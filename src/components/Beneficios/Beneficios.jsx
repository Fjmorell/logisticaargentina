// BeneficiosHeader.jsx
import React from "react";
import MiniCard from "@/components/Beneficios/Card";

const BeneficiosHeader = () => {
  return (
    <div id="beneficios">
      <header className="mt-20 flex h-40 flex-col justify-center bg-custom-blue p-6">
        <h2 className="text-center text-4xl font-bold text-custom-dark">
          Beneficios
        </h2>
      </header>
      <MiniCard />
       {/* CTA debajo del grid */}
      <div className="text-center mt-10">
        <a
          href="https://wa.me/543795073930"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold text-lg py-3 px-6 rounded-lg transition duration-300"
        >
          ¿Querés formar parte? Contáctanos
        </a>
      </div>
    </div>
  );
};

export default BeneficiosHeader;
