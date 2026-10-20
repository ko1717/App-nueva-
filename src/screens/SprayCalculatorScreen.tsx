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
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
        <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-800">
          Calibración Agronómica
        </span>
      </div>

      <AvgustHeader
        title="Calculadora de Calibración & Mezcla"
        subtitle="Determinación de caudal de boquillas, dosificación por tanque y protocolo de compatibilidad WALES."
      />

      {/* 1. Nozzle Flow Calculator */}
      <div className="surface p-5 space-y-4">
        <div className="flex items-center gap-3 border-b border-line pb-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-control border border-forest-200 bg-forest-50 text-xs font-semibold tabular-nums text-forest-800">
            1
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-ink">
              Calibración de Caudal por Boquilla (q)
            </h2>
            <p className="text-[11px] text-slate-600">
              Fórmula estándar: q (L/min) = (Q × v × d) / 60,000
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink">
              Velocidad de Avance (km/h)
            </label>
            <input
              type="number"
              step="0.1"
              value={speedKmh}
              onChange={(e) => setSpeedKmh(e.target.value)}
              className="field tabular-nums"
            />
            <span className="mt-1 block text-[11px] text-ink-muted">
              Tractor (4-7 km/h) o Manual (2-4 km/h)
            </span>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink">
              Distancia entre Boquillas (cm)
            </label>
            <input
              type="number"
              step="5"
              value={nozzleSpacingCm}
              onChange={(e) => setNozzleSpacingCm(e.target.value)}
              className="field tabular-nums"
            />
            <span className="mt-1 block text-[11px] text-ink-muted">
              Típicamente 35 cm, 40 cm o 50 cm
            </span>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink">
              Volumen Objetivo (Q en L/ha)
            </label>
            <input
              type="number"
              step="50"
              value={targetVolumeLha}
              onChange={(e) => setTargetVolumeLha(e.target.value)}
              className="field tabular-nums"
            />
            <span className="mt-1 block text-[11px] text-ink-muted">
              Volumen recomendado por ficha técnica
            </span>
          </div>
        </div>

        {/* Calculation Result */}
        <div className="rounded-control border border-sky-200 bg-sky-50 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-sky-950 block">
                Caudal Requerido por Cada Boquilla:
              </span>
              <span className="mt-0.5 block text-2xl font-semibold tracking-tight tabular-nums text-sky-900">
                {flowPerNozzleLmin.toFixed(3)} L / min
              </span>
            </div>
            <div className="rounded-control border border-sky-200 bg-white p-2.5 sm:text-right">
              <span className="text-[11px] text-ink-muted block">Para verificación en probeta:</span>
              <span className="text-sm font-semibold tabular-nums text-sky-950">
                {(flowPerNozzleLmin * 1000).toFixed(0)} ml / minuto por pastilla
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-sky-900">
            💡 <strong>Prueba de probeta:</strong> Coloca un recipiente graduado debajo de cada boquilla durante exactamente 60 segundos con la presión de trabajo ajustada. La variación entre boquillas no debe superar el ±5%.
          </p>
        </div>
      </div>

      {/* 2. Tank Dosifier */}
      <div className="surface p-5 space-y-4">
        <div className="flex items-center gap-3 border-b border-line pb-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-control border border-forest-200 bg-forest-50 text-xs font-semibold tabular-nums text-forest-800">
            2
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-ink">
              Dosificador para Tanque / Caneca de Mezcla
            </h2>
            <p className="text-[11px] text-slate-600">
              Cálculo de volumen exacto de producto fitosanitario y coadyuvante Avgust Star
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink">
              Capacidad del Tanque (Litros)
            </label>
            <input
              type="number"
              step="50"
              value={tankCapacityL}
              onChange={(e) => setTankCapacityL(e.target.value)}
              className="field tabular-nums"
            />
            <span className="mt-1 block text-[11px] text-ink-muted">Caneca 200L o Tanque 1000L/2000L</span>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink">
              Dosis Fitosanitario (cc o g / L)
            </label>
            <input
              type="number"
              step="0.1"
              value={dosePerLiterCc}
              onChange={(e) => setDosePerLiterCc(e.target.value)}
              className="field tabular-nums"
            />
            <span className="mt-1 block text-[11px] text-ink-muted">ej. 0.4 cc/L de Balerina SC</span>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink">
              Dosis Avgust Star (cc / L)
            </label>
            <input
              type="number"
              step="0.1"
              value={adjuvantPerLiterCc}
              onChange={(e) => setAdjuvantPerLiterCc(e.target.value)}
              className="field tabular-nums"
            />
            <span className="mt-1 block text-[11px] text-ink-muted">Recomendado: 0.25 a 0.5 cc/L</span>
          </div>
        </div>

        {/* Tank Results */}
        <div className="rounded-control border border-forest-200 bg-forest-50 p-4 space-y-2">
          <span className="text-xs font-semibold text-forest-950 block">
            Carga Exacta para Tanque de <span className="tabular-nums">{tankCap.toFixed(0)}</span> Litros:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="rounded-control border border-forest-100 bg-white p-3">
              <span className="text-[11px] text-ink-muted block">Fitosanitario Avgust:</span>
              <span className="text-lg font-semibold tabular-nums text-ink">
                {totalProductTankCc.toFixed(1)} cc / gramos
              </span>
            </div>

            <div className="rounded-control border border-forest-100 bg-white p-3">
              <span className="text-[11px] text-forest-800 font-semibold block">
                Coadyuvante Avgust Star:
              </span>
              <span className="text-lg font-semibold tabular-nums text-forest-800">
                {totalAdjuvantTankCc.toFixed(1)} cc
              </span>
            </div>

            <div className="rounded-control border border-forest-100 bg-white p-3">
              <span className="text-[11px] text-ink-muted block">Cobertura Estimada:</span>
              <span className="text-lg font-semibold tabular-nums text-ink">
                {areaPerTankHa.toFixed(2)} hectáreas / tanque
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. WALES Mixing Protocol */}
      <div className="surface p-5 space-y-3">
        <h2 className="border-b border-line pb-3 text-[15px] font-semibold text-ink">
          Orden Estándar de Mezcla (Protocolo Oficial WALES Avgust)
        </h2>
        <p className="text-xs text-slate-600">
          Respeta estrictamente este orden para evitar precipitaciones, cortes de emulsión o incompatibilidad físico-química:
        </p>

        <div className="space-y-2.5 pt-1">
          <div className="flex items-start gap-3 rounded-control border border-line bg-surface-muted p-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forest-800 text-sm font-semibold text-white">
              W
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">
                Water & Wettable Powders (WP / SP / Gránulos WG)
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Llenar el tanque al 50% con agua limpia. Si el pH es alcalino (&gt; 7.0), agregar primero el regulador/acidificante de agua y añadir los polvos o gránulos dispersables previamente premézclados en un balde.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-control border border-line bg-surface-muted p-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forest-800 text-sm font-semibold text-white">
              A
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">
                Agitation (Agitación Mecánica Continua)
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Mantener los agitadores hidráulicos o mecánicos en funcionamiento durante todo el proceso de adición de los productos y hasta terminar la aplicación en el campo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-control border border-line bg-surface-muted p-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forest-800 text-sm font-semibold text-white">
              L
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">
                Liquid Flowables (Suspensiones Concentradas SC / CS)
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Añadir productos en suspensión líquida como <strong>Balerina SC</strong> o <strong>Borey SC</strong> con agitación vigorosa.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-control border border-line bg-surface-muted p-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forest-800 text-sm font-semibold text-white">
              E
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">
                Emulsifiable Concentrates (Concentrados Emulsionables EC / ME)
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Incorporar productos en base oleosa o solvente como <strong>Sirocco EC</strong>, <strong>Kolosal Pro (ME)</strong> o <strong>Miura EC</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-control border border-forest-200 bg-forest-50 p-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forest-900 text-sm font-semibold text-white">
              S
            </div>
            <div>
              <div className="text-sm font-semibold text-forest-950">
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
