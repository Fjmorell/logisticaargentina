// src/components/Trabajos/PostulacionesModal.jsx
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useModalStore } from "@/store/useModalStore";
import { usePostulacionDetail } from "@/Transportistas/usePostulacionDetail";
import CambiarPasswordForm from "@/Transportistas/CambiarPasswordForm";
import { useNavigate } from "react-router-dom";


const PostulacionesModal = () => {
  console.log("PostulacionesModal renderizado");
  const navigate = useNavigate();
  const isOpen = useModalStore((s) => s.isPostulacionesOpen);
  const close = useModalStore((s) => s.closePostulaciones);
  const { detail, loading, error, documents } = usePostulacionDetail(isOpen);
  console.log("PostulacionesModal detail:", detail);
  const [activeTab, setActiveTab] = useState("documentos");
  const goToForm = (servicio) => {
    close();
    navigate("/formulario", { state: { servicio, documents } });

  }


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto p-6 relative flex">
        {/* Botón Cerrar */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Cerrar"
        >
          <FaTimes size={20} />
        </button>

        {/* Sidebar */}
        <aside className="w-48 border-r pr-4">
          <h3 className="text-lg font-semibold mb-2">Opciones</h3>
          <button
            onClick={() => setActiveTab("documentos")}
            className={`block py-2 text-left ${activeTab === "documentos"
                ? "font-bold text-red-500"
                : "hover:text-gray-700"
              }`}
          >
            Postulaciones
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`block py-2 text-left ${activeTab === "password"
                ? "font-bold text-red-500"
                : "hover:text-gray-700"
              }`}
          >
            Cambiar Contraseña
          </button>
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 pl-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            {activeTab === "documentos" ? "Postulaciones" : "Cambiar Contraseña"}
          </h2>
          {loading && <p className="text-center">Cargando…</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {!loading && !error && !detail?.length && (
            <p className="text-center text-gray-600">
              No hay postulación activa.
            </p>
          )}
          {activeTab === "documentos" && detail?.length && (
            
            detail.map((postulacion) => (
              <button
                key={postulacion.id}
                onClick={() => goToForm(postulacion.servicio)}
                className="block w-full text-left bg-gray-100 hover:bg-gray-200 rounded-lg p-4 mb-2"
                aria-label={`Ver postulacion de ${postulacion.servicio.empresa}`}
                title={`Ver postulacion de ${postulacion.servicio.empresa} - ${postulacion.servicio.ciudad}`}
              >
                {`${postulacion.servicio.empresa} - ${postulacion.servicio.ciudad} - ${postulacion.servicio.categoria_vehiculo.nombre}`}
              </button>
            ))
          )}
          {/* Renderiza el formulario de cambiar contraseña si la pestaña activa es "password" */}


          {detail && activeTab === "password" && <CambiarPasswordForm />}
        </div>
      </div>
    </div>
  );
};

export default PostulacionesModal;
