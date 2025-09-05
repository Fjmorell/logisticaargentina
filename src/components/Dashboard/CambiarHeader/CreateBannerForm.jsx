

import React, { useEffect, useState } from "react";
import {
  Section,
  InputText,
  Check,
  Select,
} from "@/components/Dashboard/ServicioAnuncio/FormControls";
import { FaTimes } from "react-icons/fa";
import QuillEditor from "./QuillEditor";
import { nanoid } from "nanoid";
import axios from "axios";
import { API_URL, BASE_URL } from "@/Api/Api";
import Swal from "sweetalert2";



const CreateBannerForm = ({ setCreateBanner, listLength, addNewImage, dataForEdit, removeImageInList }) => {
  const optionsSelect = [
    { value: 1, nombre: "Video" },
    { value: 2, nombre: "Imagen" },]
  const [descripcion, setDescripcion] = useState("");
  const token = localStorage.getItem("token");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [principalImage, setPrincipalImage] = useState(null);
  const [form, setForm] = useState({
    video_url: "",
  });

  useEffect(() => {
    if (dataForEdit) {
      setForm({
        titulo: dataForEdit.detalle?.titulo || '',
        url_externa: dataForEdit.detalle?.url_externa || '',
        correo: dataForEdit.detalle?.correo || '',
        whatsapp: dataForEdit.detalle?.whatsapp || '',
        telefono: dataForEdit.detalle?.telefono || '',
        optionSelected: dataForEdit.isVideo ? 'Video' : 'Imagen',
        video_url: dataForEdit?.url_imagen || '',
        orden: dataForEdit.orden,
      });
      setDescripcion(dataForEdit.detalle?.cuerpo || '');
      setPrincipalImage(!dataForEdit.isVideo ? dataForEdit.url_imagen : null);
      setImagenes(dataForEdit.detalle?.imagenes || []);
    } else {
      setForm({
        titulo: '',
        cuerpo: '',
        url_externa: '',
        correo: '',
        whatsapp: '',
        telefono: '',
        optionSelected: 'Imagen',
        video_url: ''
      });
      setDescripcion('');
      setPrincipalImage(null);
      setImagenes([]);
    }

  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes((prev) => [...prev, ...files]);
  };

  const handlePrincipalImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrincipalImage(file);
    } else {
      setPrincipalImage(null);
    }
  }

  const removeImage = (index) => {
    setImagenes((prev) => prev.filter((_, idx) => idx !== index));
  };

  function getYoutubeEmbedUrl(url) {
    if (!url) return "";
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  }

  const deleteBanner = async () => {
    if (!dataForEdit || loadingDelete) return;
    const result = await Swal.fire({
      title: "¿Estás seguro de eliminar este banner?",
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });
    console.log("🔽 Resultado de la confirmación:", result);
    if (result.isConfirmed) {
      Swal.fire({
        title: "Eliminando...",
        text: "Por favor espera mientras se elimina el banner.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      setLoadingDelete(true);
      const { id } = dataForEdit;
      try {
        const response = await axios.delete(`${API_URL.CARRUSEL_LISTAR}/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );
        console.log("Banner eliminado:", response);
        removeImageInList(id);
        Swal.fire("¡Eliminado!", "El banner ha sido eliminado con éxito.", "success");

      } catch (error) {
        console.error("Error al eliminar el banner:", error);
        Swal.fire("Error", "Hubo un problema al eliminar el banner.", "error");
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataForEdit && loadingDelete) return; // Evita enviar si se está eliminando
    if (!form.video_url && !principalImage) {
      Swal.fire("Error", "Por favor, selecciona una imagen o video.", "error");
      return;
    }

    const result = await Swal.fire({
      title: `¿Estás seguro de ${dataForEdit ? 'actualizar' : 'crear'} este banner?`,
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Sí, ${dataForEdit ? 'actualizar' : 'crear'}`,
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      Swal.fire({
        title: `${dataForEdit ? 'Actualizando' : 'Creando'}...`,
        text: `Por favor espera mientras se ${dataForEdit ? 'actualiza' : 'crea'} el banner.`,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }

    try {

      const anuncioId = nanoid(4);
      const tipo_usuario = 2; // el tipo de usuario es el role
      let imagenesData = [];
      let formForSubmit = {}

      if (principalImage && (principalImage instanceof File) && form.optionSelected !== 'Video') {
        const fd = new FormData();
        fd.append("file", principalImage);
        fd.append("filename", principalImage.name);
        fd.append("tipo_archivo", 23);
        fd.append("correo", anuncioId);
        fd.append("tipo_usuario", tipo_usuario);
        const res = await axios.post(API_URL.UPLOAD_IMAGE, fd, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        formForSubmit.url_imagen = `${BASE_URL}/${res.data.url}`;
      } else {
        formForSubmit.url_imagen = form.video_url || '';
      }
      if (imagenes.length) {
        for (const [index, file] of imagenes.entries()) {
          if (!(file instanceof File)) {
            imagenesData.push(file); // Si no es un archivo, lo agregamos directamente
            continue; // Skip if it's not a file
          }
          const fd = new FormData();
          fd.append("file", file);
          fd.append("filename", file.name);
          fd.append("tipo_archivo", 23);
          fd.append("correo", anuncioId);
          fd.append("tipo_usuario", tipo_usuario);
          const res = await axios.post(API_URL.UPLOAD_IMAGE, fd, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
          });
          const imageObj = {
            url_objeto: `${BASE_URL}/${res.data.url}`,
            url_link: res.data.url,
            orden: index + 1,
            isVideo: form.optionSelected === 'Video',
            titulo: '',
          }
          imagenesData.push(imageObj);
        }
      }

      formForSubmit = {
        ...formForSubmit,
        url_link: '',
        orden: form.orden ? parseFloat(form.orden) : listLength + 1,
        isVideo: form.optionSelected === 'Video',
        detalle:
        {
          ...form,
          titulo: form.titulo || '',
          cuerpo: descripcion,
          imagenes: imagenesData,
        }
      };
      let response;

      if (!dataForEdit) {
        response = await axios.post(API_URL.CARRUSEL_LISTAR, formForSubmit, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        setCreateBanner(false);
        addNewImage(response.data.data)
        Swal.fire("¡Creado!", "El banner ha sido creado con éxito.", "success");
      } else {
        response = await axios.put(`${API_URL.CARRUSEL_LISTAR}/${dataForEdit.id}`, formForSubmit, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        addNewImage(response.data.data);
        Swal.fire("¡Actualizado!", "El banner ha sido actualizado con éxito.", "success");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Swal.fire("Error", "Hubo un problema al crear o actualizar el banner.", "error");
    }

  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl items-center font-semibold">Crear Banner / Patrocinio</h2>
        {
          dataForEdit && (

            <button
              onClick={deleteBanner}
              type="button"
              className="px-4 py-2 bg-custom-red text-white rounded hover:bg-custom-red/80 transition"
            >
              Eliminar banner
            </button>
          )
        }

      </div>
      <form onSubmit={handleSubmit}>
        {
          dataForEdit && (
         <div className="mb-4">
          <label className="block text-gray-700 mb-2">Orden del banner</label>
          <input
            type="number"
            name="orden"
            min={1}
            value={form.orden || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue-medium"
            placeholder="Ingrese el orden del banner (1, 2, 3, ...)"
          />
        </div>
          )
        }
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Imagen o video <span className="text-custom-red">*</span></label>
          <Select
            label=""
            name="optionSelected"
            value={form.optionSelected}
            onChange={handleChange}
            options={optionsSelect}
          />
          {
            form.optionSelected === 'Video' && (
              <>
                {
                  form.video_url && (
                    <iframe
                      className="mt-4 w-full h-64 rounded"
                      src={form.video_url ? getYoutubeEmbedUrl(form.video_url) : ""}
                      title="Video"
                      allowFullScreen
                    ></iframe>
                  )
                }
                <div className="group relative mt-4">
                  <InputText
                    name="video_url"
                    label="Video"
                    type="text"
                    value={form.video_url}
                    onChange={handleChange}
                    placeholder="Ingresa la URL del video"
                  />
                </div>
              </>
            )
          }
          {
            form.optionSelected === 'Imagen' && (
              <div className="group relative mt-4">
                {
                  principalImage && (
                    <div className="relative w-fit">
                      <img
                        src={(principalImage instanceof File) ? URL.createObjectURL(principalImage) : principalImage}
                        alt={`Preview Principal`}
                        className="h-32 w-32 rounded object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setPrincipalImage(null)}
                        className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white opacity-0 transition group-hover:opacity-100"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )
                }
                <input
                  id="images-input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePrincipalImageChange}
                  className="mt-1 w-full rounded border p-2"
                />
              </div>
            )
          }
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Link externo</label>
          <input
            type="text"
            name="url_externa"
            value={form.url_externa || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue-medium"
            placeholder="Ingrese el título del banner"
          />
        </div>
        <div className="flex gap-5">
          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-2">Correo</label>
            <input
              type="text"
              name="correo"
              value={form.correo || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue-medium"
              placeholder="Ingrese el título del banner"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-2">Whatsapp</label>
            <input
              type="text"
              name="whatsapp"
              value={form.whatsapp || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue-medium"
              placeholder="Ingrese el título del banner"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-2">Telefono</label>
            <input
              type="text"
              name="telefono"
              value={form.telefono || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue-medium"
              placeholder="Ingrese el título del banner"
            />
          </div>

        </div>


        <div>
          <p className="text-xl font-semibold my-5">Detalles del banner</p>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Título</label>
            <input
              type="text"
              name="titulo"
              value={form.titulo || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue-medium"
              placeholder="Ingrese el título del banner"
            />
          </div>

          <div className="mb-4">
            <label className="mt-4 block font-medium">Imágenes</label>
            <input
              id="images-input"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="mt-1 w-full rounded border p-2"
            />
            {imagenes.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {imagenes.map((file, idx) => (
                  <div key={idx} className="group relative">
                    <img
                      src={!file?.url_objeto ? URL.createObjectURL(file) : file.url_objeto}
                      alt={`Preview ${idx + 1}`}
                      className="h-32 w-full rounded object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white opacity-0 transition group-hover:opacity-100"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Descripción</label>
            <QuillEditor value={descripcion} onChange={setDescripcion} />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-custom-blue-medium text-white rounded hover:bg-custom-blue-medium/80 transition"
          >
            {dataForEdit ? "Actualizar Banner" : "Crear Banner"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBannerForm;