// src/components/QuoteCalculator.jsx
import React, { useMemo, useState } from "react";

const RATES = {
  moto:   { label: "Moto (docs/paquetes livianos)", base: 2500, perKm: 180, perKg: 30,  min: 4200,  maxKg: 10 },
  furgon: { label: "Furgón (paquetería/mediano)",   base: 5000, perKm: 220, perKg: 45,  min: 8500,  maxKg: 800 },
  camion: { label: "Camión (paletizado/grande)",    base: 9000, perKm: 260, perKg: 80,  min: 16000, maxKg: 30000 },
};

const SURCHARGES = {
  urgencia24h: 1.25,  // +25%
  seguro: 0.012,      // 1.2% del valor declarado
};

export default function QuoteCalculator() {
  const [form, setForm] = useState({
    unidad: "furgon",
    distanciaKm: "",
    pesoKg: "",
    valorDeclarado: "",
    urgencia24h: false,
    seguro: true,
    origen: "",
    destino: "",
    observaciones: "",
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const currentRate = useMemo(() => RATES[form.unidad], [form.unidad]);

  const quote = useMemo(() => {
    const km = Number(form.distanciaKm) || 0;
    const kg = Number(form.pesoKg) || 0;
    const decl = Number(form.valorDeclarado) || 0;

    if (!currentRate || km <= 0 || kg <= 0) {
      return { subtotal: 0, total: 0, breakdown: [], error: "" };
    }
    if (currentRate.maxKg && kg > currentRate.maxKg) {
      return {
        subtotal: 0,
        total: 0,
        breakdown: [],
        error: `El peso (${kg} kg) excede el máximo para ${currentRate.label} (${currentRate.maxKg} kg).`,
      };
    }

    const base = currentRate.base;
    const tramoKm = km * currentRate.perKm;
    const tramoKg = Math.max(currentRate.min, kg * currentRate.perKg);

    let subtotal = base + tramoKm + tramoKg;
    const breakdown = [
      { label: "Base", value: base },
      { label: `Distancia (${km} km)`, value: tramoKm },
      { label: `Peso (${kg} kg)`, value: tramoKg },
    ];

    if (form.urgencia24h) {
      const prev = subtotal;
      subtotal = Math.round(subtotal * SURCHARGES.urgencia24h);
      breakdown.push({ label: "Urgencia 24h (+25%)", value: subtotal - prev });
    }

    let seguro = 0;
    if (form.seguro && decl > 0) {
      seguro = Math.round(decl * SURCHARGES.seguro);
      breakdown.push({ label: `Seguro (1.2% de $${decl.toLocaleString()})`, value: seguro });
    }

    const total = subtotal + seguro;
    return { subtotal, total, breakdown, error: "" };
  }, [form, currentRate]);

  const whatsappHref = useMemo(() => {
    const phone = "54911XXXXXXXX"; // ← poné tu número (sin + ni 00)
    const msg = [
      "¡Hola! Quiero cotizar un envío 👇",
      `• Opción: ${currentRate?.label || "-"}`,
      `• Origen: ${form.origen || "-"}`,
      `• Destino: ${form.destino || "-"}`,
      `• Distancia: ${form.distanciaKm || "-"} km`,
      `• Peso: ${form.pesoKg || "-"} kg`,
      `• Urgencia 24h: ${form.urgencia24h ? "Sí" : "No"}`,
      `• Seguro: ${form.seguro ? "Sí" : "No"} (${form.valorDeclarado ? "$" + Number(form.valorDeclarado).toLocaleString() : "-"})`,
      "",
      `Subtotal estimado: $${(quote.subtotal || 0).toLocaleString()}`,
      `Total estimado: $${(quote.total || 0).toLocaleString()}`,
      form.observaciones ? `\nNotas: ${form.observaciones}` : "",
    ].join("\n");
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }, [form, quote, currentRate]);

  return (
    <section id="cotizador" className="bg-gray-50 py-16 px-6 text-gray-800 scroll-mt-24">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-custom-dark text-center">Cotizador inmediato</h2>
        <p className="text-center text-gray-600 mt-2">Estimá tu envío en segundos. Después coordinamos la recolección.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de unidad</label>
            <select name="unidad" value={form.unidad} onChange={onChange} className="w-full border rounded px-3 py-2">
              <option value="moto">Moto</option>
              <option value="furgon">Furgón</option>
              <option value="camion">Camión</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">{RATES[form.unidad].label}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Distancia (km)</label>
            <input name="distanciaKm" type="number" min="1" value={form.distanciaKm} onChange={onChange} className="w-full border rounded px-3 py-2" placeholder="Ej: 25" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Peso (kg)</label>
            <input name="pesoKg" type="number" min="1" value={form.pesoKg} onChange={onChange} className="w-full border rounded px-3 py-2" placeholder="Ej: 50" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Origen</label>
            <input name="origen" value={form.origen} onChange={onChange} className="w-full border rounded px-3 py-2" placeholder="Ej: CABA - Villa Crespo" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Destino</label>
            <input name="destino" value={form.destino} onChange={onChange} className="w-full border rounded px-3 py-2" placeholder="Ej: La Plata - Centro" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Valor declarado ($)</label>
            <input name="valorDeclarado" type="number" min="0" value={form.valorDeclarado} onChange={onChange} className="w-full border rounded px-3 py-2" placeholder="Opcional (para seguro)" />
          </div>

          <label className="flex items-center gap-2">
            <input id="urgencia24h" name="urgencia24h" type="checkbox" checked={form.urgencia24h} onChange={onChange} />
            <span className="text-sm">Urgencia 24h (+25%)</span>
          </label>

          <label className="flex items-center gap-2">
            <input id="seguro" name="seguro" type="checkbox" checked={form.seguro} onChange={onChange} />
            <span className="text-sm">Seguro sobre valor declarado (1.2%)</span>
          </label>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1">Observaciones</label>
            <textarea name="observaciones" rows={2} value={form.observaciones} onChange={onChange} className="w-full border rounded px-3 py-2 resize-none" placeholder="Ventana horaria, referencias, tipo de carga, etc." />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-custom-dark">Detalle del cálculo</h3>
            {quote.error ? (
              <div className="mt-3 p-3 rounded bg-red-50 text-red-700 text-sm">{quote.error}</div>
            ) : (
              <ul className="mt-3 text-sm space-y-2">
                {quote.breakdown.map((b, i) => (
                  <li key={i} className="flex justify-between border-b pb-1">
                    <span>{b.label}</span>
                    <span>${b.value.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border">
            <p className="text-sm text-gray-600">Subtotal estimado</p>
            <p className="text-2xl font-bold text-custom-dark">${(quote.subtotal || 0).toLocaleString()}</p>
            <hr className="my-3" />
            <p className="text-sm text-gray-600">Total estimado</p>
            <p className="text-3xl font-extrabold text-custom-dark">${(quote.total || 0).toLocaleString()}</p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="block mt-5 w-full text-center bg-custom-red text-white font-semibold py-3 rounded hover:bg-custom-red/90 transition"
            >
              Solicitar servicio por WhatsApp
            </a>
            <p className="text-[11px] text-gray-500 mt-2">
              * Valores estimados. Pueden variar por accesos, manipulación, volumen y ventanas horarias.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
