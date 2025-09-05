// src/components/Formulario/FileUploader.jsx
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import Swal from "sweetalert2"; // Solo esto

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const FileUploader = ({ label, onFilesAccepted, filePreviews, handleRemoveFileProp, multiple = false }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (filePreviews && filePreviews.length > 0) {
      const newFiles = filePreviews.map((file) => ({
        name: file.name,
      }));
      setFiles(newFiles);
      const newPreviews = filePreviews.map((file) =>
        file.type.startsWith("image/") ? URL.createObjectURL(file) : null
      );
      setPreviews(newPreviews);
    }
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log("Archivos aceptados:", acceptedFiles);
      if (filePreviews.length) return;
      const validFiles = acceptedFiles.filter((f) => f.size <= MAX_FILE_SIZE);
      const invalidFiles = acceptedFiles.filter((f) => f.size > MAX_FILE_SIZE);

      if (invalidFiles.length) {
        Swal.fire({
          icon: "error",
          title: "Archivo demasiado grande",
          html: `Los siguientes archivos superan los 2 MB:<br/><strong>${invalidFiles
            .map((f) => f.name)
            .join(", ")}</strong>`,
          confirmButtonText: "Entendido",
        });
      }

      if (!validFiles.length) return;

      if (multiple) {
        setFiles(validFiles);
        const newPreviews = validFiles.map((file) =>
          file.type.startsWith("image/") ? URL.createObjectURL(file) : null
        );
        setPreviews((prev) => [...prev, ...newPreviews]);
        onFilesAccepted(validFiles);
      } else {
        const file = validFiles[0];
        console.log("Solo un archivo permitido", file);
        setFiles([file]);
        setPreviews(
          file.type.startsWith("image/") ? [URL.createObjectURL(file)] : []
        );
        onFilesAccepted([file]);
      }
    },
    [multiple, onFilesAccepted]
  );

  useEffect(() => {
    return () => {
      previews.forEach((p) => p && URL.revokeObjectURL(p));
    };
  }, [previews]);

  const handleRemoveFile = (indexToRemove) => {
    console.log("Removing file:", files);
    const filteredFiles = files.filter((_, i) => i !== indexToRemove);
    setFiles(filteredFiles);
    setPreviews((curr) => curr.filter((_, i) => i !== indexToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 h-auto ${filePreviews.length ? "bg-gray-200" : "bg-white"}`}
    >
      <input disabled={filePreviews.length} {...getInputProps()} />
      {files.length > 0 ? (
        multiple ? (
          <div className="grid grid-cols-2 gap-2 w-full">
            {files.map((file, idx) => (
              <div key={idx} className="relative">
                {file.type?.startsWith("image/") ? (
                  <img
                    src={previews[idx]}
                    alt="Preview"
                    className="object-cover w-full h-24 rounded"
                  />
                ) : (
                  <div className="p-2 max-w-36 border truncate border-gray-300 rounded text-xs text-center text-gray-500">
                    {file.name}
                  </div>
                )}
                {
                  !filePreviews.length &&
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(idx);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                }
              </div>
            ))}
          </div>
        ) : files[0].type?.startsWith("image/") ? (
          <img
            src={previews[0]}
            alt="Preview"
            className="object-cover h-20 w-20 rounded"
          />
        ) : (
          <p className="text-gray-500 text-xs md:text-sm text-center">
            {files[0].name}
          </p>
        )
      ) : (
        <>
          <FaUpload className="text-2xl md:text-3xl text-gray-400 mb-1 md:mb-2" />
          <p className="text-gray-500 text-xs md:text-sm text-center">
            {isDragActive
              ? "Suelta el archivo"
              : `${label ? `${label} – ` : ""}Arrastra y suelta o haz clic`}
          </p>
        </>
      )}
    </div>
  );
};

export default FileUploader;
