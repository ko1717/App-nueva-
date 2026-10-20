import React from 'react';

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
    <header className="rounded-card bg-forest-900 px-5 pt-5 pb-4 text-white ring-1 ring-inset ring-white/5 sm:px-6 sm:pt-6">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] bg-white p-1 shadow-sm">
          <img
            src="/avgust-logo.png"
            alt="Avgust Crop Protection"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow text-brass-500">AVGUST CROP PROTECTION</span>
            {showBadge && (
              <span className="hidden shrink-0 rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white/75 sm:inline-flex">
                MIPE 360°
              </span>
            )}
          </div>
          <h1 className="mt-1 font-brand text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.01em] text-white sm:text-[1.875rem]">
            {title}
          </h1>
        </div>
      </div>

      {subtitle && (
        <div className="mt-4 border-t border-white/10 pt-3">
          <p className="max-w-2xl text-sm leading-relaxed text-white/75">{subtitle}</p>
        </div>
      )}
    </header>
  );
};
