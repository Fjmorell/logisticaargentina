// src/components/WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const WhatsAppButton = () => {
  /* 1️⃣ Ruta actual */
  const { pathname } = useLocation();

  /* 2️⃣ Si es /dashboard o cualquier sub-ruta → no mostrar el botón */
  if (/^\/dashboard(\/|$)/i.test(pathname)) return null;

  /* 3️⃣ Link de WhatsApp */
  const phoneNumber = "5491169663208"; // sin + ni espacios, formato internacional
  const message = "¡Hola! Me gustaría obtener más información.";
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  /* 4️⃣ Botón flotante */
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-5 rounded-full shadow-xl z-50 transition-all duration-300 animate-bounceWhatsapp"
      aria-label="Whatsapp"
    >
      <FaWhatsapp className="text-4xl" />
    </a>
  );
};

export default WhatsAppButton;
