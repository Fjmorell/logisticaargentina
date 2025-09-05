// src/components/Formulario/FormularioDocumentacion.jsx
import React, { useState, useEffect } from "react";
import FileUploader from "@/components/Formulario/FileUploader";
import { docMapping, documentos } from "@/components/Formulario/estaticos";
import { submitDocumentation } from "@/components/Formulario/store/submitDocumentation";
import { FaSpinner } from "react-icons/fa";




const FormularioDocumentacion = ({ service, usuario }) => {
  console.log("usuario:", usuario);
  console.log("Servicio recibido:", service);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filesUploadedState, setFilesUploadedState] = useState([]);
 

  const searchFilesInUser = () => {
    let filesUploaded = [];
    const necessaryFiles = [...usuario.roles[0].archivos_necesarios];
    const userFiles = [...usuario.archivos_cargados].reverse() || [];
    necessaryFiles.forEach((file) => {
      const fileType = userFiles.find(
        (doc) => doc.tipo_archivos_id === file.id
      );
      if (fileType) {
        filesUploaded.push({
          id: fileType.id,
          docTitle: file.nombre,
          campo: file.nombre,
          file: {
            name: fileType.url.split("/").pop(),
            url: fileType.url,
            type: "application/pdf", // Asumimos PDF por defecto
          },
        });
      } else {
        filesUploaded.push(file);
      }
    })
    setFilesUploadedState(filesUploaded);
    return filesUploaded;
  }

  useEffect(() => {
    if (service && usuario) {
      searchFilesInUser();
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Extrae id de docMapping
  const getDocId = (docTitle, campo) => {
    const mapping = docMapping[docTitle];
    if (typeof mapping === "object") {
      const key = campo.replace(/\s+/g, "_");
      return mapping[key];
    }
    return mapping;
  };

  const handleRemoveFile = (file) => {
    console.log("handleRemoveFile called with file:", file);
  };


  const handleFileAccepted = (docTitle, campo, fileData) => {
    const id = getDocId(docTitle, campo);
    const entries = Array.isArray(fileData)
      ? fileData.map((f) => ({ id, docTitle, campo, file: f }))
      : [{ id, docTitle, campo, file: fileData }];

    setUploadedFiles((prev) => {
      const filtered = prev.filter(
        (x) => !(x.docTitle === docTitle && x.campo === campo)
      );
      return [...filtered, ...entries];
    });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await submitDocumentation(uploadedFiles, false);

      window.location.href = "/mensaje-transportista";

    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h2 className="text-center text-2xl">Documentación</h2>
       
      </div>    

      {/* Documentos Cargados */}

      {/* <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Documentos Cargados</h3>
        <div className="flex gap-2 flex-wrap">
        {
          
            filesUploadedState.map((file) => (
              
                <a
                  href={`${BASE_URL}/${file.file.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white w-fit shadow-md p-2 rounded-md mb-2  gap-5 hover:bg-gray-100 transition-colors"
                >
                  {file.file.name}
                </a>
          
            ))
       }
        </div>
      </div> */}

      {/* Grid de uploaders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filesUploadedState.length && documentos.length && documentos.map((doc) => (
          <div key={doc.title} className="bg-white shadow-lg p-4 rounded-md">
            <h3 className="text-lg font-bold text-center mb-4">{doc.title}</h3>
            {/* Siempre muestro todos, pero sólo los primeros 3 cuentan para el progreso */}
            {doc.campos.length > 0 ? (
              doc.campos.map((campo) => (
                <div key={campo} className="mb-3">
                  <FileUploader
                  filePreviews={filesUploadedState
                    .filter((f) => f.docTitle === campo)
                    .map((f) => f.file)}
                    label={campo}
                    onFilesAccepted={(file) =>
                      handleFileAccepted(doc.title, campo, file)
                    }
                  />
                </div>
              ))
            ) : (
              <div className="mb-3">
                <FileUploader
                handleRemoveFileProp={handleRemoveFile}
                filePreviews={filesUploadedState
                  .filter((f) => f.docTitle === doc.title)
                  .map((f) => f.file)}
                  label=""
                  multiple={doc.multiple || false}
                  onFilesAccepted={(file) =>
                    handleFileAccepted(doc.title, "", file)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botón Enviar */}
    { <div className="text-center w-full flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`
              py-2 px-6 rounded transition-colors flex items-center justify-center
              ${isSubmitting
                        ? "bg-gray-500 cursor-wait"
                        : "bg-red-500 hover:bg-red-600"
                      }
              text-white
            `}
        >
          {isSubmitting ? (
            <FaSpinner className="animate-spin h-5 w-5" />
          ) : (
            "Enviar Documentación"
          )}
        </button>
      </div>}
    </div>
  );
};

export default FormularioDocumentacion;
