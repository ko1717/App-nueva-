import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

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
      <div className="absolute right-8 top-3 opacity-15 pointer-events-none">
        <Shield className="w-28 h-28 text-white" />
      </div>

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
            <Shield className="w-6 h-6 text-emerald-200 fill-emerald-400/30" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-widest text-emerald-200 uppercase bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-400/20">
                AVGUST CROP PROTECTION
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
              {title}
            </h1>
          </div>
        </div>

        {showBadge && (
          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-400/30 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>MIPE 360°</span>
          </div>
        )}
      </div>

      {subtitle && (
        <p className="relative z-10 mt-2 text-xs sm:text-sm text-emerald-100 font-medium max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
