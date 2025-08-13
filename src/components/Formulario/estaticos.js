export const documentos = [
  { title: "DNI", campos: ["CEDULA", "CEDULA DORSO"] },
  { title: "LICENCIA", campos: ["LICENCIA", "LICENCIA DORSO"] },
  { title: "CEDULA VERDE", campos: ["CEDULA VERDE", "CEDULA VERDE DORSO"] },
  {
    title: "CEDULA AZUL / AUTORIZACION DE MANEJO",
    campos: ["CEDULA AZUL", "CEDULA AZUL DORSO"],
  },
  { title: "RTO, VTV, ITV", campos: [], multiple: true },
  { title: "TITULO", campos: [], multiple: true },
  { title: "POLIZA", campos: [], multiple: true },
  {
    title: "FOTOS DEL VEHÍCULO",
    campos: ["FOTOS DEL VEHÍCULO FRENTE", "FOTOS DEL VEHÍCULO LATERALES", "FOTOS DEL VEHÍCULO TRASERAS", "FOTOS DEL VEHÍCULO LATERALES DOS"],
  },
  { title: "CERTIFICADO DE ANTECEDENTES PENALES NACIONAL", campos: [] },
];

export // Diccionario para mapear cada documento y subcampo a un ID
  const docMapping = {
    DNI: {
      "CEDULA": 6,
      "CEDULA_DORSO": 7,
    },
    LICENCIA: {
      "LICENCIA": 29,
      "LICENCIA_DORSO": 30,
    },
    "CEDULA VERDE": {
      "CEDULA_VERDE": 31,
      "CEDULA_VERDE_DORSO": 32,
    },
    "CEDULA AZUL / AUTORIZACION DE MANEJO": {
      "CEDULA_AZUL": 8,
      "CEDULA_AZUL_DORSO": 9,
    },
    "RTO, VTV, ITV": 10,
    TITULO: 11,
    POLIZA: 12,
    "FOTOS DEL VEHÍCULO": {
      "FOTOS_DEL_VEHÍCULO_FRENTE": 13,
      "FOTOS_DEL_VEHÍCULO_LATERALES": 14,
      "FOTOS_DEL_VEHÍCULO_TRASERAS": 15,
      "FOTOS_DEL_VEHÍCULO_LATERALES_DOS": 17,
    },
    "CERTIFICADO DE ANTECEDENTES PENALES NACIONAL": 16,
  };

export const labelAliases = {
  6: "CEDULA", // 6 y 7 son los IDs que viste en el ejemplo
  7: "CEDULA DORSO",
  // Si mañana aparece otra variación, la agregas aquí:  id: "texto"
};