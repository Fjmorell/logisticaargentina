// src/components/QuoteCalculator.jsx
import React, { useMemo, useState } from "react";

/** ======= TABLAS DE TARIFAS (EDITABLES) ======= */
const COUNT_BANDS = {
  "1-10": { label: "1-10", assumed: 10, pricePerPackage: 3500 },
  "11-20": { label: "11-20", assumed: 20, pricePerPackage: 3150 },
  "21-40": { label: "21-40", assumed: 40, pricePerPackage: 2835 },
  "40+": { label: "+40", assumed: 50, pricePerPackage: 2500 },
};

const WEIGHT_RATES = {
  "1-100": { label: "1-100 kg", perKg: 25 },      // $25 por kg
  "101-200": { label: "101-200 kg", perKg: 22 },  // $22 por kg
  "200+": { label: "+200 kg", perKg: 19 },        // $19 por kg
};

const DISTANCE_BANDS = {
  "0-50":   { label: "0-50 km",    fee: 4500 },
  "51-100": { label: "51-100 km",  fee: 7500 },
  "100+":   { label: "+ de 100 km", fee: 11000 },
};

const TURNOS = {
  normal: { label: "Sin urgencia", recargo: 1.00 },
  mañana: { label: "Turno mañana (8-12hs)", recargo: 1.30 }, // +30%
  tarde:  { label: "Turno tarde (13-17hs)", recargo: 1.20 }, // +20%
};

const SURCHARGES = {
  seguro: 0.012,     // 1.2% del valor declarado
};

/** ======= PROMO / OFERTA ======= */
const PROMO = {
  enabled: true,
  label: "Oferta online -15%",
  percent: 0.15, // 15% de descuento sobre el subtotal del servicio (sin seguro)
};

export default function QuoteCalculator() {
  const [form, setForm] = useState({
    // Rangos
    paquetesBand: "1-10",
    weightBand: "1-100",
    distanceBand: "0-50",

    // Ubicación
    origenPais: "Argentina",
    origenProvincia: "",
    origenCiudad: "",
    destinoPais: "Argentina",
    destinoProvincia: "",
    destinoCiudad: "",

    // Turno y extras
    turno: "normal", // Reemplaza urgencia24h
    seguro: true,
    valorDeclarado: "",

    observaciones: "",
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  /** ======= CÁLCULO BASE ======= */
  const price = useMemo(() => {
    const count = COUNT_BANDS[form.paquetesBand];
    const weight = WEIGHT_RATES[form.weightBand];
    const dist = DISTANCE_BANDS[form.distanceBand];
    const turno = TURNOS[form.turno];

    if (!count || !weight || !dist || !turno) {
      return { subtotal: 0, total: 0, breakdown: [], error: "" };
    }

    const baseOperativa = 3000;              // fijo por servicio
    const costoDistancia = dist.fee;         // por banda de km
    
    // Calcular el costo por paquetes según la banda seleccionada
    const costoPaquetes = count.assumed * count.pricePerPackage;
    
    // Calcular el peso medio según la banda seleccionada
    let pesoMedio;
    if (form.weightBand === "1-100") {
      pesoMedio = 50; // Valor medio de la banda 1-100 kg
    } else if (form.weightBand === "101-200") {
      pesoMedio = 150; // Valor medio de la banda 101-200 kg
    } else {
      pesoMedio = 250; // Valor estimado para +200 kg
    }
    
    const costoPeso = Math.round(pesoMedio * weight.perKg);

    let subtotal = baseOperativa + costoDistancia + costoPaquetes + costoPeso;

    const breakdown = [
      { label: "Base operativa", value: baseOperativa },
      { label: `Distancia (${dist.label})`, value: costoDistancia },
      {
        label: `Paquetes (${count.label}) · $${count.pricePerPackage.toLocaleString()}/paq`,
        value: costoPaquetes,
      },
      {
        label: `Peso (${weight.label}) · $${weight.perKg}/kg`,
        value: costoPeso,
      },
    ];

    // Recargo por turno urgente
    if (form.turno !== "normal") {
      const prev = subtotal;
      subtotal = Math.round(subtotal * turno.recargo);
      const porcentajeRecargo = Math.round((turno.recargo - 1) * 100);
      breakdown.push({ 
        label: `${turno.label} (+${porcentajeRecargo}%)`, 
        value: subtotal - prev 
      });
    }

    // Seguro (sobre valor declarado)
    const declarado = Number(form.valorDeclarado) || 0;
    let seguro = 0;
    if (form.seguro && declarado > 0) {
      seguro = Math.round(declarado * SURCHARGES.seguro);
      breakdown.push({
        label: `Seguro (1.2% de $${declarado.toLocaleString()})`,
        value: seguro,
      });
    }

    const total = subtotal + seguro;
    return { subtotal, total, breakdown, error: "" };
  }, [form]);

  /** ======= CÁLCULO PROMO (descuento sobre subtotal del servicio) ======= */
  const promo = useMemo(() => {
    if (!PROMO.enabled) return { totalPromo: price.total, descuento: 0 };
    const descuento = Math.round((price.subtotal || 0) * PROMO.percent);
    const extras = (price.total || 0) - (price.subtotal || 0); // seguro y otros
    const totalPromo = Math.max((price.subtotal || 0) - descuento, 0) + extras;
    return { totalPromo, descuento };
  }, [price]);

  /** ======= WHATSAPP ======= */
  const whatsappHref = useMemo(() => {
    const phone = "5491156193199"; // ← Reemplazá por tu número (sin + ni 00)
    const msg = [
      "¡Hola! Quiero cotizar una distribución 👇",
      `• Cantidad de paquetes: ${COUNT_BANDS[form.paquetesBand]?.label || "-"}`,
      `• Peso total: ${WEIGHT_RATES[form.weightBand]?.label || "-"}`,
      `• Kilómetros (aprox.): ${DISTANCE_BANDS[form.distanceBand]?.label || "-"}`,
      `• Turno: ${TURNOS[form.turno]?.label || "-"}`,
      `• Origen: ${form.origenCiudad || "-"}, ${form.origenProvincia || "-"}, ${form.origenPais || "-"}`,
      `• Destino: ${form.destinoCiudad || "-"}, ${form.destinoProvincia || "-"}, ${form.destinoPais || "-"}`,
      `• Seguro: ${form.seguro ? "Sí" : "No"} ${form.valorDeclarado ? `(valor declarado $${Number(form.valorDeclarado).toLocaleString()})` : ""}`,
      "",
      `Precio de lista: $${(price.total || 0).toLocaleString()}`,
      PROMO.enabled ? `Precio especial (${PROMO.label}): $${(promo.totalPromo || 0).toLocaleString()}` : "",
    ].join("\n");
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }, [form, price, promo]);

  return (
    <section id="cotizador" className="bg-gray-50 py-16 px-6 text-gray-800 scroll-mt-24">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 text-center">
          Cotizador inmediato
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Estimá tu distribución por rangos y recibí el total al instante.
        </p>

        {/* ===== FORM ===== */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cantidad de paquetes */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium mb-1 text-blue-800">
              <i className="fas fa-box mr-2"></i>Cantidad de paquetes
            </label>
            <select
              name="paquetesBand"
              value={form.paquetesBand}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.keys(COUNT_BANDS).map((k) => (
                <option key={k} value={k}>{COUNT_BANDS[k].label}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              <i className="fas fa-info-circle mr-1"></i>Se asume {COUNT_BANDS[form.paquetesBand].assumed} paquetes para el cálculo.
            </p>
          </div>

          {/* Peso total */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium mb-1 text-blue-800">
              <i className="fas fa-weight-hanging mr-2"></i>Peso total de la carga
            </label>
            <select
              name="weightBand"
              value={form.weightBand}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1-100">1-100 kg</option>
              <option value="101-200">101-200 kg</option>
              <option value="200+">+200 kg</option>
            </select>
          </div>

          {/* Km aprox */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium mb-1 text-blue-800">
              <i className="fas fa-route mr-2"></i>Kilómetros (aprox.)
            </label>
            <select
              name="distanceBand"
              value={form.distanceBand}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="0-50">{DISTANCE_BANDS["0-50"].label}</option>
              <option value="51-100">{DISTANCE_BANDS["51-100"].label}</option>
              <option value="100+">{DISTANCE_BANDS["100+"].label}</option>
            </select>
          </div>

          {/* Turno */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium mb-1 text-blue-800">
              <i className="fas fa-clock mr-2"></i>Selecciona el turno
            </label>
            <select
              name="turno"
              value={form.turno}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="mañana">Turno mañana (8-12hs) +30%</option>
              <option value="tarde">Turno tarde (13-17hs) +20%</option>
            </select>
          </div>

          {/* Origen */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium mb-1 text-blue-800">País (origen)</label>
              <select name="origenPais" value={form.origenPais} onChange={onChange} className="w-full border rounded-lg px-4 py-2">
                <option>Argentina</option>
                <option>Chile</option>
                <option>Uruguay</option>
                <option>Paraguay</option>
              </select>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium mb-1 text-blue-800">Provincia (origen)</label>
              <input name="origenProvincia" value={form.origenProvincia} onChange={onChange} className="w-full border rounded-lg px-4 py-2" placeholder="Ej: Buenos Aires" />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium mb-1 text-blue-800">Ciudad (origen)</label>
              <input name="origenCiudad" value={form.origenCiudad} onChange={onChange} className="w-full border rounded-lg px-4 py-2" placeholder="Ej: CABA" />
            </div>
          </div>


          {/* Seguro / Valor declarado */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg flex items-center">
              <input id="seguro" name="seguro" type="checkbox" checked={form.seguro} onChange={onChange} className="h-5 w-5 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="seguro" className="ml-2 block text-sm text-gray-900">
                <span className="font-medium">Seguro</span> (1.2% valor declarado)
              </label>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium mb-1 text-blue-800">Valor declarado ($)</label>
              <input name="valorDeclarado" type="number" min="0" value={form.valorDeclarado} onChange={onChange} className="w-full border rounded-lg px-4 py-2" placeholder="Opcional" />
            </div>
          </div>

          {/* Observaciones */}
          <div className="md:col-span-3 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium mb-1 text-blue-800">Observaciones</label>
              <textarea name="observaciones" rows={2} value={form.observaciones} onChange={onChange} className="w-full border rounded-lg px-4 py-2 resize-none" placeholder="Ventana horaria, referencias, manejo especial, etc." />
            </div>
          </div>
        </div>

        {/* ===== RESULTADO ===== */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Detalle del cálculo</h3>
            <div className="bg-gray-50 rounded-xl p-5">
              <ul className="space-y-3">
                {price.breakdown.map((b, i) => (
                  <li key={i} className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">{b.label}</span>
                    <span className="font-medium">${b.value.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 relative">
            {PROMO.enabled && (
              <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">
                -15%
              </div>
            )}
            
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm text-blue-800">Subtotal estimado</p>
              {PROMO.enabled && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                  {PROMO.label}
                </span>
              )}
            </div>

            {/* Precio de lista tachado */}
            <div className="mb-3">
              <span className="text-xs text-gray-500">Precio de lista</span>
              <p className="text-xl font-semibold text-gray-500 line-through">
                ${(price.total || 0).toLocaleString()}
              </p>
            </div>

            {/* Precio especial */}
            <div className="mb-3">
              <span className="text-xs text-blue-800">Precio especial</span>
              <p className="text-3xl font-extrabold text-blue-900">
                ${(promo.totalPromo || 0).toLocaleString()}
              </p>
            </div>

            {/* Ahorro */}
            {PROMO.enabled && promo.descuento > 0 && (
              <p className="text-sm text-green-600 mb-4">
                <i className="fas fa-money-bill-wave mr-1"></i>Ahorrás ${promo.descuento.toLocaleString()} en servicio.
              </p>
            )}

            <hr className="my-4 border-blue-200" />

            {/* Resumen servicio/seguro */}
            <div className="text-xs text-blue-700 space-y-1 mb-5">
              <p>Servicio (con promo): ${(Math.max((price.subtotal || 0) - (promo.descuento || 0), 0)).toLocaleString()}</p>
              <p>Seguro: ${(((price.total || 0) - (price.subtotal || 0)) || 0).toLocaleString()}</p>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center"
            >
              <i className="fab fa-whatsapp mr-2 text-xl"></i>
              Solicitar servicio por WhatsApp
            </a>
            <p className="text-xs text-gray-500 mt-3 text-center">
              * Oferta aplicada al servicio. Seguro y extras no incluidos en el descuento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}