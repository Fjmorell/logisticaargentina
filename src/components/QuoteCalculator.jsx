// src/components/QuoteCalculator.jsx
import React, { useMemo, useState } from "react";

/** ======= TABLAS DE TARIFAS (EDITABLES) ======= */
const COUNT_BANDS = {
  "0-10":  { label: "0-10",  assumed: 10,  discount: 1.00 },
  "11-20": { label: "11-20", assumed: 20,  discount: 0.95 },
  "21-30": { label: "21-30", assumed: 30,  discount: 0.92 },
  "31-40": { label: "31-40", assumed: 40,  discount: 0.90 },
  "41-50": { label: "41-50", assumed: 50,  discount: 0.88 },
  "50+":   { label: "+50",   assumed: 60,  discount: 0.85 },
};

const SIZE_RATES = {
  small: { label: "Hasta 35 kg",  perPackage: 1200 },
  large: { label: "Más de 35 kg", perPackage: 2000 },
};

const DISTANCE_BANDS = {
  "0-50":   { label: "0-50 km",    fee: 6000 },
  "51-100": { label: "51-100 km",  fee: 10000 },
  "100+":   { label: "+ de 100 km", fee: 15000 },
};

const SURCHARGES = {
  urgencia24h: 1.25, // +25% sobre subtotal (sin seguro)
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
    paquetesBand: "0-10",
    size: "small",
    distanceBand: "0-50",

    // Ubicación
    origenPais: "Argentina",
    origenProvincia: "",
    origenCiudad: "",
    destinoPais: "Argentina",
    destinoProvincia: "",
    destinoCiudad: "",

    // Extras
    urgencia24h: false,
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
    const size = SIZE_RATES[form.size];
    const dist = DISTANCE_BANDS[form.distanceBand];

    if (!count || !size || !dist) {
      return { subtotal: 0, total: 0, breakdown: [], error: "" };
    }

    const baseOperativa = 3000;              // fijo por servicio
    const costoDistancia = dist.fee;         // por banda de km
    const paquetesSinDesc = size.perPackage * count.assumed;
    const paquetesConDesc = Math.round(paquetesSinDesc * count.discount);

    let subtotal = baseOperativa + costoDistancia + paquetesConDesc;

    const breakdown = [
      { label: "Base operativa", value: baseOperativa },
      { label: `Distancia (${dist.label})`, value: costoDistancia },
      {
        label: `Paquetes (${count.label}) · ${size.label} ${count.discount < 1 ? `(desc. ${(100 - count.discount * 100).toFixed(0)}%)` : ""}`,
        value: paquetesConDesc,
      },
    ];

    // Urgencia 24h (multiplicador sobre subtotal del servicio)
    if (form.urgencia24h) {
      const prev = subtotal;
      subtotal = Math.round(subtotal * SURCHARGES.urgencia24h);
      breakdown.push({ label: "Urgencia 24h (+25%)", value: subtotal - prev });
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
    const phone = "54911XXXXXXXX"; // ← Reemplazá por tu número (sin + ni 00)
    const msg = [
      "¡Hola! Quiero cotizar una distribución 👇",
      `• Cantidad de paquetes: ${COUNT_BANDS[form.paquetesBand]?.label || "-"}`,
      `• Tamaño: ${SIZE_RATES[form.size]?.label || "-"}`,
      `• Kilómetros (aprox.): ${DISTANCE_BANDS[form.distanceBand]?.label || "-"}`,
      `• Origen: ${form.origenCiudad || "-"}, ${form.origenProvincia || "-"}, ${form.origenPais || "-"}`,
      `• Destino: ${form.destinoCiudad || "-"}, ${form.destinoProvincia || "-"}, ${form.destinoPais || "-"}`,
      `• Urgencia 24h: ${form.urgencia24h ? "Sí" : "No"}`,
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
        <h2 className="text-2xl md:text-3xl font-bold text-custom-dark text-center">
          Cotizador inmediato
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Estimá tu distribución por rangos y recibí el total al instante.
        </p>

        {/* ===== FORM ===== */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cantidad de paquetes */}
          <div>
            <label className="block text-sm font-medium mb-1">Cantidad de paquetes</label>
            <select
              name="paquetesBand"
              value={form.paquetesBand}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            >
              {Object.keys(COUNT_BANDS).map((k) => (
                <option key={k} value={k}>{COUNT_BANDS[k].label}</option>
              ))}
            </select>
            <p className="text-[11px] text-gray-500 mt-1">
              Se asume {COUNT_BANDS[form.paquetesBand].assumed} paquetes para el cálculo.
            </p>
          </div>

          {/* Tamaño */}
          <div>
            <label className="block text-sm font-medium mb-1">Tamaño del paquete</label>
            <select
              name="size"
              value={form.size}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="small">{SIZE_RATES.small.label}</option>
              <option value="large">{SIZE_RATES.large.label}</option>
            </select>
          </div>

          {/* Km aprox */}
          <div>
            <label className="block text-sm font-medium mb-1">Kilómetros (aprox.)</label>
            <select
              name="distanceBand"
              value={form.distanceBand}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="0-50">{DISTANCE_BANDS["0-50"].label}</option>
              <option value="51-100">{DISTANCE_BANDS["51-100"].label}</option>
              <option value="100+">{DISTANCE_BANDS["100+"].label}</option>
            </select>
          </div>

          {/* Origen */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">País (origen)</label>
              <select name="origenPais" value={form.origenPais} onChange={onChange} className="w-full border rounded px-3 py-2">
                <option>Argentina</option>
                <option>Chile</option>
                <option>Uruguay</option>
                <option>Paraguay</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Provincia (origen)</label>
              <input name="origenProvincia" value={form.origenProvincia} onChange={onChange} className="w-full border rounded px-3 py-2" placeholder="Ej: Buenos Aires" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ciudad (origen)</label>
              <input name="origenCiudad" value={form.origenCiudad} onChange={onChange} className="w-full border rounded px-3 py-2" placeholder="Ej: CABA" />
            </div>
          </div>

          {/* Destino */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">País (destino)</label>
              <select name="destinoPais" value={form.destinoPais} onChange={onChange} className="w-full border rounded px-3 py-2">
                <option>Argentina</option>
                <option>Chile</option>
                <option>Uruguay</option>
                <option>Paraguay</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Provincia (destino)</label>
              <input name="destinoProvincia" value={form.destinoProvincia} onChange={onChange} className="w-full border rounded px-3 py-2" placeholder="Ej: Córdoba" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ciudad (destino)</label>
              <input name="destinoCiudad" value={form.destinoCiudad} onChange={onChange} className="w-full border rounded px-3 py-2" placeholder="Ej: Río Cuarto" />
            </div>
          </div>

          {/* Seguro / Urgencia / Valor declarado */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input id="urgencia24h" name="urgencia24h" type="checkbox" checked={form.urgencia24h} onChange={onChange} />
              <span className="text-sm">Urgencia 24h (+25%)</span>
            </label>

            <label className="flex items-center gap-2">
              <input id="seguro" name="seguro" type="checkbox" checked={form.seguro} onChange={onChange} />
              <span className="text-sm">Seguro sobre valor declarado (1.2%)</span>
            </label>

            <div>
              <label className="block text-sm font-medium mb-1">Valor declarado ($)</label>
              <input name="valorDeclarado" type="number" min="0" value={form.valorDeclarado} onChange={onChange} className="w-full border rounded px-3 py-2" placeholder="Opcional" />
            </div>
          </div>

          {/* Observaciones */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1">Observaciones</label>
            <textarea name="observaciones" rows={2} value={form.observaciones} onChange={onChange} className="w-full border rounded px-3 py-2 resize-none" placeholder="Ventana horaria, referencias, manejo especial, etc." />
          </div>
        </div>

        {/* ===== RESULTADO ===== */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-custom-dark">Detalle del cálculo</h3>
            <ul className="mt-3 text-sm space-y-2">
              {price.breakdown.map((b, i) => (
                <li key={i} className="flex justify-between border-b pb-1">
                  <span>{b.label}</span>
                  <span>${b.value.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">Subtotal estimado</p>
              {PROMO.enabled && (
                <span className="text-[11px] bg-custom-red/10 text-custom-red px-2 py-0.5 rounded">
                  {PROMO.label}
                </span>
              )}
            </div>

            {/* Precio de lista tachado */}
            <div className="mt-1">
              <span className="text-xs text-gray-500">Precio de lista</span>
              <p className="text-xl font-semibold text-gray-500 line-through">
                ${(price.total || 0).toLocaleString()}
              </p>
            </div>

            {/* Precio especial */}
            <div className="mt-2">
              <span className="text-xs text-gray-600">Precio especial</span>
              <p className="text-3xl font-extrabold text-custom-dark">
                ${(promo.totalPromo || 0).toLocaleString()}
              </p>
            </div>

            {/* Ahorro */}
            {PROMO.enabled && promo.descuento > 0 && (
              <p className="mt-1 text-sm text-green-600">
                Ahorrás ${promo.descuento.toLocaleString()} en servicio.
              </p>
            )}

            <hr className="my-3" />

            {/* Resumen servicio/seguro */}
            <div className="text-xs text-gray-600 space-y-1">
              <p>Servicio (con promo): ${(Math.max((price.subtotal || 0) - (promo.descuento || 0), 0)).toLocaleString()}</p>
              <p>Seguro: ${(((price.total || 0) - (price.subtotal || 0)) || 0).toLocaleString()}</p>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="block mt-5 w-full text-center bg-custom-red text-white font-semibold py-3 rounded hover:bg-custom-red/90 transition"
            >
              Solicitar servicio por WhatsApp
            </a>
            <p className="text-[11px] text-gray-500 mt-2">
              * Oferta aplicada al servicio. Seguro y extras no incluidos en el descuento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
