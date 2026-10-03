import React, { useMemo } from 'react';

interface HydrosensitiveCardPreviewProps {
  dropsPerCm2: number;
  quality?: string;
  className?: string;
}

export const HydrosensitiveCardPreview: React.FC<HydrosensitiveCardPreviewProps> = ({
  dropsPerCm2,
  quality,
  className = '',
}) => {
  // Generate deterministic droplets based on drops count
  const droplets = useMemo(() => {
    const count = Math.min(180, Math.max(10, dropsPerCm2));
    // Simple deterministic pseudo-random generator
    let seed = dropsPerCm2 * 42 + 7;
    const nextRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: nextRandom() * 92 + 4, // percentage
        y: nextRandom() * 88 + 6, // percentage
        r: nextRandom() * 2.2 + 1.2, // px radius
        opacity: nextRandom() * 0.25 + 0.75,
      });
    }
    return items;
  }, [dropsPerCm2]);

  const effectiveQuality =
    quality ||
    (dropsPerCm2 >= 50 && dropsPerCm2 <= 80
      ? 'OPTIMA'
      : dropsPerCm2 < 35
      ? 'DEFICIENTE'
      : dropsPerCm2 < 50
      ? 'ACEPTABLE'
      : 'EXCESIVA');

  const statusConfig = {
    OPTIMA: {
      color: 'text-emerald-700 bg-emerald-100 border-emerald-300',
      badge: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      label: 'Óptima para Fitosanitarios Avgust (50-80 gotas/cm²)',
    },
    ACEPTABLE: {
      color: 'text-amber-800 bg-amber-100 border-amber-300',
      badge: 'text-amber-700 bg-amber-50 border-amber-200',
      label: 'Aceptable (35-49 gotas/cm²)',
    },
    DEFICIENTE: {
      color: 'text-rose-700 bg-rose-100 border-rose-300',
      badge: 'text-rose-700 bg-rose-50 border-rose-200',
      label: 'Baja Cobertura (<35 gotas/cm²) - Riesgo de fallo fitosanitario',
    },
    BAJA: {
      color: 'text-rose-700 bg-rose-100 border-rose-300',
      badge: 'text-rose-700 bg-rose-50 border-rose-200',
      label: 'Baja Cobertura (<35 gotas/cm²) - Riesgo de fallo fitosanitario',
    },
    EXCESIVA: {
      color: 'text-purple-700 bg-purple-100 border-purple-300',
      badge: 'text-purple-700 bg-purple-50 border-purple-200',
      label: 'Excesiva (>90 gotas/cm²) - Riesgo de escurrimiento y desperdicio',
    },
  }[effectiveQuality] || {
    color: 'text-slate-700 bg-slate-100 border-slate-300',
    badge: 'text-slate-700 bg-slate-50 border-slate-200',
    label: `${dropsPerCm2} gotas/cm²`,
  };

  return (
    <div className={`p-4 rounded-xl border bg-white shadow-sm flex flex-col sm:flex-row items-center gap-4 ${className}`}>
      {/* Simulated Hydrosensitive Paper (yellow card with indigo blue droplets) */}
      <div className="relative w-36 h-24 rounded-lg bg-[#FEF08A] border-2 border-[#CA8A04] shadow-inner overflow-hidden flex-shrink-0">
        <div className="absolute top-1 left-1.5 text-[9px] font-black uppercase text-[#854D0E] tracking-tighter opacity-70">
          26x76 mm
        </div>
        <svg className="w-full h-full pointer-events-none">
          {droplets.map((d, i) => (
            <circle
              key={i}
              cx={`${d.x}%`}
              cy={`${d.y}%`}
              r={d.r}
              fill="#1E40AF"
              fillOpacity={d.opacity}
            />
          ))}
        </svg>
      </div>

      {/* Details & Status */}
      <div className="flex-1 min-w-0 w-full">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Simulador de Tarjeta Hidrosensible
          </span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${statusConfig.badge}`}>
            {dropsPerCm2} gotas / cm²
          </span>
        </div>
        <p className="text-xs text-slate-600 mb-2 leading-relaxed">
          {statusConfig.label}
        </p>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
          <div className="h-full bg-rose-400 w-[35%]" title="Deficiente (<35)" />
          <div className="h-full bg-amber-400 w-[15%]" title="Aceptable (35-49)" />
          <div className="h-full bg-emerald-500 w-[30%]" title="Óptima (50-80)" />
          <div className="h-full bg-purple-400 w-[20%]" title="Excesiva (>80)" />
        </div>
        <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-medium">
          <span>0 (Deficiente)</span>
          <span>50 - 80 Óptimo MIPE</span>
          <span>100+ (Exceso)</span>
        </div>
      </div>
    </div>
  );
};
