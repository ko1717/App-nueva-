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
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-sm">
      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
      <span>APROBADO CON EXCELENCIA</span>
    </div>
  ) : isConforming ? (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold shadow-sm">
      <AlertTriangle className="w-4 h-4 text-amber-600" />
      <span>CONFORME CON OBSERVACIONES</span>
    </div>
  ) : (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold shadow-sm">
      <AlertOctagon className="w-4 h-4 text-rose-600" />
      <span>NO CONFORME - ALERTA FITOSANITARIA</span>
    </div>
  );

  const ringColor = isExcellent
    ? 'text-emerald-600'
    : isConforming
    ? 'text-amber-500'
    : 'text-rose-600';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          {/* Radial score circle */}
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={ringColor}
                strokeDasharray={`${scores.totalScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-black text-slate-900 leading-none">
                {scores.totalScore}
              </span>
              <span className="text-[9px] font-bold text-slate-600 uppercase">/100</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Índice de Aseguramiento
            </div>
            <div className="text-base font-bold text-slate-900 mt-0.5">
              Cumplimiento Integral MIPE
            </div>
            <div className="mt-1.5">{verdictBadge}</div>
          </div>
        </div>

        <div className="text-right text-xs text-slate-600 hidden md:block">
          <div className="font-semibold text-slate-700">Norma Técnica Avgust</div>
          <div>Auditoría 5 Pilares</div>
        </div>
      </div>

      {showPillars && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {/* Pillar 1 */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-700">1. Monitoreo Fitosanitario</span>
              <span className="font-bold text-emerald-700">{scores.pestMonitoringScore} / 25</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(scores.pestMonitoringScore / 25) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-600 mt-1 block">Incidencia y umbral económico</span>
          </div>

          {/* Pillar 2 */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-700">2. Calidad de Aplicación</span>
              <span className="font-bold text-emerald-700">{scores.applicationQualityScore} / 25</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(scores.applicationQualityScore / 25) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-600 mt-1 block">Gotas/cm², boquillas, pH agua</span>
          </div>

          {/* Pillar 3 */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-700">3. Cultural & Biológico</span>
              <span className="font-bold text-emerald-700">{scores.culturalBiologicalScore} / 20</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(scores.culturalBiologicalScore / 20) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-600 mt-1 block">Podas, arvenses, benéficos</span>
          </div>

          {/* Pillar 4 */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-700">4. Rotación MOA</span>
              <span className="font-bold text-emerald-700">{scores.moaResistanceScore} / 15</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(scores.moaResistanceScore / 15) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-600 mt-1 block">Alternancia FRAC / IRAC / HRAC</span>
          </div>

          {/* Pillar 5 */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2 md:col-span-1">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-700">5. BPA & Bioseguridad</span>
              <span className="font-bold text-emerald-700">{scores.bpaSafetyScore} / 15</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(scores.bpaSafetyScore / 15) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-600 mt-1 block">EPP, triple lavado y bitácora</span>
          </div>
        </div>
      )}
    </div>
  );
};
