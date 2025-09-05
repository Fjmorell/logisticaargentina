import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "@/Api/Api";
import CustomModal from "@/components/CustomModal.jsx";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdLocalPhone } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import "quill/dist/quill.snow.css"; // Tema por defecto


import Layout from "@/components/Layout";

export default function BannerDetail() {
  const [loadingImages, setLoadingImages] = useState(false);
  const [bannerDetail, setBannerDetail] = useState(null);
  const [imageSelected, setImageSelected] = useState(null);
  const [imgOpened, setImgOpened] = useState(null);

  const { id } = useParams();
  console.log("id", id);

  const handleWhatsappClick = (data) => {
    const phoneNumber = data.detalle.whatsapp; // sin + ni espacios, formato internacional
    const message = `¡Hola! Me gustaría obtener más información sobre el servicio: ${data.detalle.titulo}`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  }

  const getImage = async () => {
    try {
      setLoadingImages(true);
      const response = await axios.get(`${API_URL.CARRUSEL_LISTAR}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      response.data.data.detalle.imagenes.unshift({
        url_objeto: response.data.data.url_imagen,
      })
      console.log("response", response);
      setBannerDetail(response.data.data);
      if (response.data.data.detalle.imagenes.length > 0) {
        setImageSelected(response.data.data.detalle.imagenes[0].url_objeto);
      } else {
        setImageSelected(null);
      }
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
    } finally {
      setLoadingImages(false);
    }
  };
  useEffect(() => {
    getImage();
    return () => {
      setBannerDetail(null);
    };
  }, [id])

  return (

    <Layout>

      <div className="flex flex-col items-center justify-center p-4">
        {loadingImages && (
          <div className="flex items-center justify-center w-full h-screen">
            <div className="loader"></div>
          </div>
        )}
        {
          !loadingImages && bannerDetail && (
            <div >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full max-w-[1280px] mx-auto">
                <div className="p-4 col-span-full md:col-span-9">
                  <div onClick={() => setImgOpened(imageSelected)} className="
                        mx-auto
                        mb-4
                        bg-gray-transparent 
                        w-full max-w-[1280px] 
                        h-64 sm:h-80 md:h-96 
                        flex items-center justify-center 
                        rounded-2xl overflow-hidden cursor-pointer
                      ">
                    <img className="w-full h-full max-h-96 object-cover"
                      loading="lazy" src={imageSelected} alt={`Imagen seleccionada: ${imageSelected}`} />

                  </div>
                  <div className="flex flex-wrap justify-center w-full items-center gap-4">
                    {bannerDetail.detalle.imagenes.map((img) => (
                      <div
                        onClick={() => setImageSelected(img.url_objeto)}
                        key={img.id}
                        className={`
                          cursor-pointer
                          bg-gray-300 
                          w-32 
                          h-24 
                          flex items-center justify-center 
                          rounded-2xl overflow-hidden
                          
                          ${imageSelected === img.url_objeto ? "border-4 border-red-500" : "border-4 border-custom-blue"}
                        `}
                      >
                        <div className="w-5 h-5">{imageSelected === img.url_objeto}</div>
                        <img
                          src={img.url_objeto}
                          alt={`Imagen número ${img.id}`}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4 p-4 col-span-full md:col-span-3">
                  <h1 className="text-2xl font-bold">{bannerDetail.detalle.titulo}</h1>
                  <p className="text-lg text-gray-700 flex items-center gap-2"><HiOutlineMail />{bannerDetail.detalle.correo}</p>
                  <p onClick={() => handleWhatsappClick(bannerDetail)} className="cursor-pointer hover:text-gray-500/80 text-lg text-gray-500 flex items-center gap-2">
                    <FaWhatsapp className="h-6 w-6" />{bannerDetail.detalle.whatsapp}
                  </p>
                  <p className="text-lg text-gray-500 flex items-center gap-2">
                    <MdLocalPhone className="h-6 w-6" />{bannerDetail.detalle.telefono}
                  </p>

                  <a href={bannerDetail.detalle.url_externa} target="_blank" className="cursor-pointer hover:text-gray-500/80 text-lg text-gray-500 flex items-center gap-2">
                    <TbWorldWww className="h-6 w-6" />{bannerDetail.detalle.url_externa}
                  </a>
                </div>
              </div>
              <div className="p-4 max-w-[1280px]">
                <h2 className="text-xl font-semibold mb-2">Descripción</h2>
                <div
                  className="ql-editor px-0"
                  dangerouslySetInnerHTML={{ __html: bannerDetail.detalle.cuerpo }}
                ></div>
              </div>
            </div>
          )
        }
        {imgOpened && (
          <CustomModal title="Imagen del detalle" onClose={() => setImgOpened(null)}>
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
      

    </Layout>
  );
}