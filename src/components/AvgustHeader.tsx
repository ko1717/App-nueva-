import React from 'react';
import { Sparkles } from 'lucide-react';

interface AvgustHeaderProps {
  title?: string;
  subtitle?: string;
  showBadge?: boolean;
}

export const AvgustHeader: React.FC<AvgustHeaderProps> = ({
  title = 'Aseguramiento MIPE',
  subtitle = 'Manejo Integrado de Plagas y Enfermedades • Auditoría de Campo',
  showBadge = true,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#004D20] via-[#007A33] to-[#0D9488] p-5 text-white shadow-lg border border-emerald-600/40">
      {/* Decorative leaf/field backdrop effect */}
      <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
      <div className="absolute right-4 top-2 w-28 h-28 opacity-20 pointer-events-none">
        <img src="/avgust-logo.svg" alt="" className="w-full h-full object-contain filter invert brightness-200" />
      </div>

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg shrink-0 border border-emerald-300/60">
            <img
              src="/avgust-logo.png"
              alt="Avgust Crop Protection"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-widest text-emerald-200 uppercase bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                AVGUST CROP PROTECTION
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
              {title}
            </h1>
          </div>
        </div>

        {showBadge && (
          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-400/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>MIPE 360°</span>
          </div>
        )}
      </div>

      {subtitle && (
        <p className="relative z-10 mt-2.5 text-xs sm:text-sm text-emerald-100 font-medium max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
