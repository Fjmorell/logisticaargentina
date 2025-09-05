import React from "react";


const FormularioCard = ({ icon, title, description }) => {
  return (
    <div className="text-gray-900 w-full">
      {/* Ícono */}
      <div className="flex items-center justify-start text-2xl md:text-3xl">
        {icon}
      </div>

      {/* Título */}
      <h3 className="text-base md:text-xl font-bold">{title}</h3>

      {/* Descripción (con soporte para saltos de línea) */}
      <p className="text-xs md:text-sm whitespace-pre-line">{description}</p>
    </div>
  );
};

export default FormularioCard;
