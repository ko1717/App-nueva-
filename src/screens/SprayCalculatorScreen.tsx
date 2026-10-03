import React, { useState } from 'react';
import { ArrowLeft, Gauge, Calculator, FlaskConical, Droplets, CheckCircle2 } from 'lucide-react';
import { AvgustHeader } from '../components/AvgustHeader';

interface SprayCalculatorScreenProps {
  onBack: () => void;
}

export const SprayCalculatorScreen: React.FC<SprayCalculatorScreenProps> = ({ onBack }) => {
  const [speedKmh, setSpeedKmh] = useState('5.0');
  const [nozzleSpacingCm, setNozzleSpacingCm] = useState('50.0');
  const [targetVolumeLha, setTargetVolumeLha] = useState('400.0');
  const [tankCapacityL, setTankCapacityL] = useState('200.0');
  const [dosePerLiterCc, setDosePerLiterCc] = useState('0.5');
  const [adjuvantPerLiterCc, setAdjuvantPerLiterCc] = useState('0.5');

  const speed = parseFloat(speedKmh) || 5.0;
  const spacing = parseFloat(nozzleSpacingCm) || 50.0;
  const targetVolume = parseFloat(targetVolumeLha) || 400.0;
  const tankCap = parseFloat(tankCapacityL) || 200.0;
  const dose = parseFloat(dosePerLiterCc) || 0.5;
  const adjuvantDose = parseFloat(adjuvantPerLiterCc) || 0.5;

  // Formula: q (L/min per nozzle) = (Q * v * d) / 60000
  const flowPerNozzleLmin = (targetVolume * speed * spacing) / 60000.0;
  const totalProductTankCc = dose * tankCap;
  const totalAdjuvantTankCc = adjuvantDose * tankCap;
  const areaPerTankHa = targetVolume > 0 ? tankCap / targetVolume : 0.0;

  return (
    <div className="space-y-5 pb-24">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Calibración Agronómica
        </span>
      </div>

      <AvgustHeader
        title="Calculadora de Calibración & Mezcla"
        subtitle="Determinación de caudal de boquillas, dosificación por tanque y protocolo de compatibilidad WALES."
      />

      {/* 1. Nozzle Flow Calculator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
            1
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Calibración de Caudal por Boquilla (q)
            </h2>
            <p className="text-[11px] text-slate-600">
              Fórmula estándar: q (L/min) = (Q × v × d) / 60,000
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Velocidad de Avance (km/h)
            </label>
            <input
              type="number"
              step="0.1"
              value={speedKmh}
              onChange={(e) => setSpeedKmh(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-sky-500"
            />
            <span className="text-[10px] text-slate-600 mt-0.5 block">
              Tractor (4-7 km/h) o Manual (2-4 km/h)
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Distancia entre Boquillas (cm)
            </label>
            <input
              type="number"
              step="5"
              value={nozzleSpacingCm}
              onChange={(e) => setNozzleSpacingCm(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-sky-500"
            />
            <span className="text-[10px] text-slate-600 mt-0.5 block">
              Típicamente 35 cm, 40 cm o 50 cm
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Volumen Objetivo (Q en L/ha)
            </label>
            <input
              type="number"
              step="50"
              value={targetVolumeLha}
              onChange={(e) => setTargetVolumeLha(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-sky-500"
            />
            <span className="text-[10px] text-slate-600 mt-0.5 block">
              Volumen recomendado por ficha técnica
            </span>
          </div>
        </div>

        {/* Calculation Result */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-sky-900 block">
                Caudal Requerido por Cada Boquilla:
              </span>
              <span className="text-2xl font-black text-sky-800 block mt-0.5">
                {flowPerNozzleLmin.toFixed(3)} L / min
              </span>
            </div>
            <div className="bg-white/80 border border-sky-300 rounded-xl p-2.5 sm:text-right">
              <span className="text-[11px] text-slate-600 block">Para verificación en probeta:</span>
              <span className="text-sm font-black text-sky-900">
                {(flowPerNozzleLmin * 1000).toFixed(0)} ml / minuto por pastilla
              </span>
            </div>
          </div>
          <p className="text-[11px] text-sky-800 mt-2">
            💡 <strong>Prueba de probeta:</strong> Coloca un recipiente graduado debajo de cada boquilla durante exactamente 60 segundos con la presión de trabajo ajustada. La variación entre boquillas no debe superar el ±5%.
          </p>
        </div>
      </div>

      {/* 2. Tank Dosifier */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Dosificador para Tanque / Caneca de Mezcla
            </h2>
            <p className="text-[11px] text-slate-600">
              Cálculo de volumen exacto de producto fitosanitario y coadyuvante Avgust Star
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Capacidad del Tanque (Litros)
            </label>
            <input
              type="number"
              step="50"
              value={tankCapacityL}
              onChange={(e) => setTankCapacityL(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-[10px] text-slate-600 mt-0.5 block">Caneca 200L o Tanque 1000L/2000L</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Dosis Fitosanitario (cc o g / L)
            </label>
            <input
              type="number"
              step="0.1"
              value={dosePerLiterCc}
              onChange={(e) => setDosePerLiterCc(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-[10px] text-slate-600 mt-0.5 block">ej. 0.4 cc/L de Balerina SC</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Dosis Avgust Star (cc / L)
            </label>
            <input
              type="number"
              step="0.1"
              value={adjuvantPerLiterCc}
              onChange={(e) => setAdjuvantPerLiterCc(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-[10px] text-slate-600 mt-0.5 block">Recomendado: 0.25 a 0.5 cc/L</span>
          </div>
        </div>

        {/* Tank Results */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
          <span className="text-xs font-bold text-emerald-950 block">
            Carga Exacta para Tanque de {tankCap.toFixed(0)} Litros:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-sm">
              <span className="text-[11px] text-slate-600 block">Fitosanitario Avgust:</span>
              <span className="text-lg font-black text-slate-900">
                {totalProductTankCc.toFixed(1)} cc / gramos
              </span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-sm">
              <span className="text-[11px] text-emerald-800 font-semibold block">
                Coadyuvante Avgust Star:
              </span>
              <span className="text-lg font-black text-emerald-800">
                {totalAdjuvantTankCc.toFixed(1)} cc
              </span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-sm">
              <span className="text-[11px] text-slate-600 block">Cobertura Estimada:</span>
              <span className="text-lg font-black text-slate-900">
                {areaPerTankHa.toFixed(2)} hectáreas / tanque
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. WALES Mixing Protocol */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <h2 className="text-sm font-bold text-slate-900 border-b pb-2">
          Orden Estándar de Mezcla (Protocolo Oficial WALES Avgust)
        </h2>
        <p className="text-xs text-slate-600">
          Respeta estrictamente este orden para evitar precipitaciones, cortes de emulsión o incompatibilidad físico-química:
        </p>

        <div className="space-y-2.5 pt-1">
          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-black text-sm flex-shrink-0">
              W
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Water & Wettable Powders (WP / SP / Gránulos WG)
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Llenar el tanque al 50% con agua limpia. Si el pH es alcalino (&gt; 7.0), agregar primero el regulador/acidificante de agua y añadir los polvos o gránulos dispersables previamente premézclados en un balde.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-black text-sm flex-shrink-0">
              A
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Agitation (Agitación Mecánica Continua)
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Mantener los agitadores hidráulicos o mecánicos en funcionamiento durante todo el proceso de adición de los productos y hasta terminar la aplicación en el campo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-black text-sm flex-shrink-0">
              L
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Liquid Flowables (Suspensiones Concentradas SC / CS)
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Añadir productos en suspensión líquida como <strong>Balerina SC</strong> o <strong>Borey SC</strong> con agitación vigorosa.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-black text-sm flex-shrink-0">
              E
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Emulsifiable Concentrates (Concentrados Emulsionables EC / ME)
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Incorporar productos en base oleosa o solvente como <strong>Sirocco EC</strong>, <strong>Kolosal Pro (ME)</strong> o <strong>Miura EC</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-300">
            <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-black text-sm flex-shrink-0">
              S
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-950">
                Surfactants & Coadyuvantes (Avgust Star)
              </div>
              <p className="text-xs text-emerald-900 mt-0.5">
                Añadir siempre de último el superspreader <strong>Avgust Star</strong>, completar el tanque al 100% de agua y verificar que no haya formación excesiva de espuma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
