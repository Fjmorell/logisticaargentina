// src/pages/Formulario.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import CustomModal from "@/components/CustomModal.jsx";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import YouTubeVideo from "../YoutubeVideo";
import { config } from "../../config";
import { FaWhatsapp } from "react-icons/fa";


// Imágenes por defecto
import img1 from "@/assets/formulario/img1.jpeg";
import img2 from "@/assets/formulario/img2.jpeg";
import img3 from "@/assets/beneficios/1.jpg";

// Íconos
import { FaDollarSign, FaCalendarAlt, FaRoute, FaRegPlayCircle } from "react-icons/fa";

// Componentes
import FormularioCard from "@/components/Formulario/FormularioCard";
import FormularioDocumentacion from "@/components/Formulario/FormularioDocumentacion";
import { BASE_URL } from "@/Api/Api";

const Formulario = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const servicio = location.state?.servicio;
  const usuario = location.state?.documents;

  const [imageSelected, setImageSelected] = React.useState(null);
  const [imgOpened, setImgOpened] = React.useState(null);

  // Prepara URLs de imágenes del servicio
  const serviceImages =
    servicio?.imagenes?.length > 0
      ? servicio.imagenes.map((img) =>
        img.imagen_url.startsWith("http")
          ? img.imagen_url
          : `${BASE_URL}${img.imagen_url.startsWith("/") ? "" : "/"}${img.imagen_url
          }`
      )
      : [];

  const defaultImages = [img1, img2, img3];
  const displayImages = [...serviceImages, ...defaultImages].slice(0, 3);

  useEffect(() => {
    // Selecciona la primera imagen del servicio o una por defecto
    if (displayImages.length > 0) {
      setImageSelected(displayImages[0]);
    }
  }
    , []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Debe iniciar sesión para acceder al formulario.",
        confirmButtonText: "Ir al Login",
        allowOutsideClick: false,
      }).then(() => navigate("/login"));
    }
  }, [navigate]);
  if (!servicio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-lg text-gray-700 mb-4">
          No se recibió información del servicio.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-custom-red text-white rounded hover:bg-custom-red/80 transition"
        >
          Volver
        </button>
      </div>
    );
  }


  // Descripciones dinámicas
  const tarifaDesc = `$${servicio?.tarifa_total} aprox.`;
  const plazosDesc = servicio?.servicios_plazo
    .map((p) => `- ${p.nombre}: ${p.descripcion}`)
    .join("\n");
  const serviciosDesc = servicio?.servicios_servicio
    .map((s) => `- ${s.nombre}: ${s.descripcion}`)
    .join("\n");

  const noPlazos = servicio?.servicios_plazo.length === 0;
  const noServicios = servicio?.servicios_servicio.length === 0;
  const extraerVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]+)/
    );
    return match ? match[1] : null;
  };

   const phoneNumber = servicio.soporte_telefonico || config.phoneNumberDefault;
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    'Hola, me gustaría obtener más información sobre el servicio de ' +
    servicio.empresa +
    '. ¿Podrías ayudarme?'
  )}`;

  const videoUrl = servicio?.video_url ? extraerVideoId(servicio.video_url) : null;
  const handleWhatsappClick = () => {
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };


  return (
    <div className="w-full bg-gradient-to-b from-custom-blue-medium/30 to-white">
      {/* Sección Superior: Imágenes responsive */}
      <div className="max-w-[1280px] mx-auto  grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
        <div className="p-4 col-span-full md:col-span-8">
          <div onClick={() => setImgOpened(imageSelected)} className="
                  mx-auto
                  mb-4
                  bg-gray-transparent 
                  w-full max-w-[1280px] 
                  h-64 sm:h-80 md:h-96 
                  flex items-center justify-center 
                  rounded-2xl overflow-hidden cursor-pointer
                ">
            {imageSelected?.includes('youtube') ? (
              <iframe
                id={`youtube-player-${videoUrl}`}
                className="h-full w-full rounded-md"
                src={`https://www.youtube.com/embed/${videoUrl}?enablejsapi=1`}
                title={`YouTube video ${videoUrl}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : <img className="w-full h-full max-h-96 object-cover"
              loading="lazy" src={imageSelected} alt={`Imagen seleccionada: ${imageSelected}`} />}

          </div>
          <div className="flex w-full justify-center items-center gap-4">
            {displayImages.map((src, idx) => (

              <div
                onClick={() => setImageSelected(src)}
                key={src}
                className={`
                    cursor-pointer
                    bg-gray-300 
                    w-32 
                    h-24 
                    flex items-center justify-center 
                    rounded-2xl overflow-hidden
                    
                    ${imageSelected === src ? "border-4 border-red-500" : "border-4 border-custom-blue"}
                  `}
              >
                <div className="w-5 h-5">{imageSelected === src}</div>
                <img
                  src={src}
                  alt={`Imagen ${idx + 1}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            ))}

            {servicio?.video_url && (
              <div
                onClick={() => setImageSelected(servicio.video_url)}
                className={`
                    cursor-pointer
                    bg-gray-300 
                    w-32 
                    h-24 
                    flex items-center justify-center 
                    rounded-2xl overflow-hidden
                    ${imageSelected === servicio.video_url ? "border-4 border-red-500" : "border-4 border-custom-blue"}
                  `}
              >
                <FaRegPlayCircle className="text-4xl text-gray-700" />
              </div>
            )}


          </div>
        </div>

        {/* Sección Intermedia: Tarjetas con datos del servicio */}
        <div className="w-full flex flex-col gap-4 p-4 col-span-full md:col-span-4">
          <FormularioCard
            icon={FaDollarSign}
            title="Tarifa Diaria"
            description={tarifaDesc}
          />
          <FormularioCard
            icon={FaCalendarAlt}
            title="Plazos de Pago"
            description={noPlazos ? "No hay plazos disponibles." : plazosDesc}
          />
          <FormularioCard
            icon={FaRoute}
            title="Servicio"
            description={
              noServicios ? "No hay servicios disponibles." : serviciosDesc
            }
          />
           <button
          type="button"
          onClick={handleWhatsappClick}
          className={`justify-center cursor-pointer flex gap-2 rounded-md bg-green-500 py-2 px-4 text-white shadow-lg transition-transform hover:bg-green-600`}
          aria-label="Chat en WhatsApp"
        >
          <FaWhatsapp className="h-6 w-6" />
          Más información
        </button>
        </div>

      </div>

      {/* VIDEO */}

      <YouTubeVideo videoId="Q4KwOpmxBVU" />

      {/* Sección Inferior: Documentación */}
      <div className="p-4 max-w-7xl mx-auto">
        <FormularioDocumentacion service={servicio} usuario={usuario} />
      </div>
      {imgOpened && (
        <CustomModal title="Imagen del servicio" onClose={() => setImgOpened(null)}>
          <TransformWrapper onInit={0} minScale={0} initialScale={1}
            initialPositionX={0}
            initialPositionY={0}>
            <TransformComponent >
              <img className="object-contain h-full w-full" src={imgOpened} alt="Imagen del servicio" />
            </TransformComponent>
          </TransformWrapper>
        </CustomModal>
      )}
    </div>

  );

};

export default Formulario;
