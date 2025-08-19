import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_URL } from "@/Api/Api";
import axios from "axios";
import { FaChevronDown } from 'react-icons/fa';
import CreateBannerForm from "./CreateBannerForm";


const CambiarHeader = () => {
  const [imagenes, setImagenes] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [createBanner, setCreateBanner] = useState(false);

  useEffect(() => {
    getImages()
  }, [])

  const addNewImage = (imageData) => {
    const findImage = imagenes.find(img => img.id === imageData.id);
    if (findImage) {
      setImagenes((prevImages) => prevImages.map((img) =>
        img.id === findImage.id ? { ...img, ...imageData } : img
      ));
      return;
    }
    setImagenes((prevImages) => [...prevImages, {
      id: Date.now(), // Genera un ID único basado en el tiempo actual
      nameImg: `Banner-${prevImages.length + 1}`,
      file: null,
      preview: imageData.preview || null,
      ...imageData // Agrega cualquier otro dato que necesites
    }])
  }
  const removeImage = (id) => {
    setImagenes((prevImages) => prevImages.filter((img) => img.id !== id));
  }

  const getImages = async () => {
    try {
      setLoadingImages(true);
      const response = await axios.get(
        API_URL.CARRUSEL_LISTAR_ADMIN,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      console.log("🔽 Respuesta de imágenes:", response.data);
      const imagesWithUrls = response.data.data.map((img, index) => {
        const label = `Banner-${index + 1}`;
        return {
          nameImg: label,
          file: null,
          ...img,
          preview: img.url_imagen,
        }
      })
      imagesWithUrls.sort((a, b) => a.orden - b.orden);
      setImagenes(imagesWithUrls)
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
      return null;
    } finally {
      setLoadingImages(false);
    }
  }

  return (
    !loadingImages &&
    <div className="flex flex-col gap-4 p-4">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">Patrocionios y banners</h2>
        <p className="text-gray-500 text-sm mb-4">
  📐 Las dimensiones recomendadas para los banners son <strong>1440×400 px</strong> (desktop) y <strong>600×300 px</strong> (mobile).
</p>
        <button
          onClick={() => setCreateBanner(!createBanner)}
          type="submit"
          className="px-4 py-2 bg-custom-blue-medium text-white rounded hover:bg-custom-blue-medium/80 transition"
        >
          {createBanner ? "Ir al listado" : "Crear Banner"}
        </button>
      </div>
      {/* CREACION DE BANNER FORM */}
      {createBanner && (
        <CreateBannerForm addNewImage={addNewImage} listLength={imagenes.length} setCreateBanner={setCreateBanner} />
      )}


      {/* Lista de zonas de banners */}
      {!createBanner && imagenes.length === 0 && (
        <p className="text-gray-500">No hay banners disponibles.</p>
      )}

      {!createBanner && imagenes.map((img) => (
        <details
          onClick={() => img.isEdit = !!img.isEdit}
          key={img.id}
          className="group border rounded-lg bg-white shadow-sm transition-all
                             [&[open]]:shadow-md"
        >
          <summary
            className="flex w-full items-center justify-between gap-2
                               cursor-pointer select-none p-4
                               text-gray-700 font-medium
                               marker:hidden"
          >
            <span className="text-base md:text-lg">
              {`${img.detalle?.titulo || img.nameImg} - Orden: ${img.orden}`}
            </span>
            <FaChevronDown
              className="w-5 h-5 shrink-0 transition-transform duration-300
                                 group-open:-rotate-180"
            />
          </summary>

          <div className="p-4 border-t text-sm text-gray-600">
            <CreateBannerForm removeImageInList={removeImage} dataForEdit={img} addNewImage={addNewImage} listLength={imagenes.length} setCreateBanner={setCreateBanner} />

          </div>
        </details>
      ))}
    </div>
  );
};

export default CambiarHeader;
