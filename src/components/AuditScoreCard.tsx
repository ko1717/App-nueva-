import React from 'react';
import { Award, AlertTriangle, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { MipePillarScores } from '../types';

interface AuditScoreCardProps {
  scores: MipePillarScores;
  showPillars?: boolean;
}

export const AuditScoreCard: React.FC<AuditScoreCardProps> = ({
  scores,
  showPillars = true,
}) => {
  const isExcellent = scores.totalScore >= 88;
  const isConforming = scores.totalScore >= 70 && scores.totalScore < 88;

  const verdictBadge = isExcellent ? (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-forest-200 bg-forest-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-forest-800">
      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-forest-700" />
      <span>APROBADO CON EXCELENCIA</span>
    </div>
  ) : isConforming ? (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-amber-900">
      <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
      <span>CONFORME CON OBSERVACIONES</span>
    </div>
  ) : (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-rose-800">
      <AlertOctagon className="h-3.5 w-3.5 shrink-0 text-rose-600" />
      <span>NO CONFORME - ALERTA FITOSANITARIA</span>
    </div>
  );

  const ringColor = isExcellent
    ? 'text-forest-700'
    : isConforming
    ? 'text-amber-500'
    : 'text-rose-600';

  return (
    <div className="surface p-5">
      <div className="flex flex-col items-center justify-between gap-4 border-b border-line pb-4 sm:flex-row">
        <div className="flex items-center gap-4">
          {/* Radial score circle */}
          <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-surface-sunken"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={ringColor}
                strokeDasharray={`${scores.totalScore}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold leading-none tracking-tight tabular-nums text-ink">
                {scores.totalScore}
              </span>
              <span className="mt-0.5 text-[10px] font-medium tabular-nums text-ink-subtle">/100</span>
            </div>
          </div>

          <div>
            <div className="eyebrow">
              Índice de Aseguramiento
            </div>
            <div className="mt-0.5 text-base font-semibold text-ink">
              Cumplimiento Integral MIPE
            </div>
            <div className="mt-2">{verdictBadge}</div>
          </div>
        </div>

        <div className="hidden text-right text-xs text-ink-muted md:block">
          <div className="font-semibold text-ink">Norma Técnica Avgust</div>
          <div>Auditoría 5 Pilares</div>
        </div>
      </div>

      {showPillars && (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {/* Pillar 1 */}
          <div className="rounded-control border border-line bg-surface-muted p-3">
            <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-ink">1. Monitoreo Fitosanitario</span>
              <span className="shrink-0 font-semibold tabular-nums text-forest-800">{scores.pestMonitoringScore} / 25</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-forest-700 transition-all duration-300"
                style={{ width: `${(scores.pestMonitoringScore / 25) * 100}%` }}
              />
            </div>
            <span className="mt-1.5 block text-[11px] text-ink-muted">Incidencia y umbral económico</span>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-control border border-line bg-surface-muted p-3">
            <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-ink">2. Calidad de Aplicación</span>
              <span className="shrink-0 font-semibold tabular-nums text-forest-800">{scores.applicationQualityScore} / 25</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-forest-700 transition-all duration-300"
                style={{ width: `${(scores.applicationQualityScore / 25) * 100}%` }}
              />
            </div>
            <span className="mt-1.5 block text-[11px] text-ink-muted">Gotas/cm², boquillas, pH agua</span>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-control border border-line bg-surface-muted p-3">
            <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-ink">3. Cultural & Biológico</span>
              <span className="shrink-0 font-semibold tabular-nums text-forest-800">{scores.culturalBiologicalScore} / 20</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-forest-700 transition-all duration-300"
                style={{ width: `${(scores.culturalBiologicalScore / 20) * 100}%` }}
              />
            </div>
            <span className="mt-1.5 block text-[11px] text-ink-muted">Podas, arvenses, benéficos</span>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-control border border-line bg-surface-muted p-3">
            <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-ink">4. Rotación MOA</span>
              <span className="shrink-0 font-semibold tabular-nums text-forest-800">{scores.moaResistanceScore} / 15</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-forest-700 transition-all duration-300"
                style={{ width: `${(scores.moaResistanceScore / 15) * 100}%` }}
              />
            </div>
            <span className="mt-1.5 block text-[11px] text-ink-muted">Alternancia FRAC / IRAC / HRAC</span>
          </div>

          {/* Pillar 5 */}
          <div className="rounded-control border border-line bg-surface-muted p-3 sm:col-span-2 md:col-span-1">
            <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-ink">5. BPA & Bioseguridad</span>
              <span className="shrink-0 font-semibold tabular-nums text-forest-800">{scores.bpaSafetyScore} / 15</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-forest-700 transition-all duration-300"
                style={{ width: `${(scores.bpaSafetyScore / 15) * 100}%` }}
              />
            </div>
            <span className="mt-1.5 block text-[11px] text-ink-muted">EPP, triple lavado y bitácora</span>
          </div>
        </div>
      )}
    </div>
  );
};
