import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Trash2,
  Calendar,
  MapPin,
  User,
  Shield,
  CheckCircle2,
  Copy,
  Check,
  Droplets,
  AlertTriangle,
} from 'lucide-react';
import { MipeAuditEntity } from '../types';
import { AuditScoreCard } from '../components/AuditScoreCard';
import { HydrosensitiveCardPreview } from '../components/HydrosensitiveCardPreview';
import { generateShareableReportText } from '../utils/calculator';

interface AuditDetailScreenProps {
  audit: MipeAuditEntity;
  onBack: () => void;
  onDelete: (auditId: number) => void;
}

export const AuditDetailScreen: React.FC<AuditDetailScreenProps> = ({
  audit,
  onBack,
  onDelete,
}) => {
  const [copied, setCopied] = useState(false);

  const formattedDate = new Date(audit.auditDate).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCopyReport = () => {
    const text = generateShareableReportText(audit);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scores = {
    pestMonitoringScore: audit.scoreMonitoring,
    applicationQualityScore: audit.scoreApplication,
    culturalBiologicalScore: audit.scoreCultural,
    moaResistanceScore: audit.scoreMoa,
    bpaSafetyScore: audit.scoreBpa,
    totalScore: audit.totalScore,
    verdict: audit.verdict,
    verdictTitle:
      audit.verdict === 'APROBADO_EXCELENCIA'
        ? 'Aprobado con Excelencia'
        : audit.verdict === 'CONFORME_OBSERVACIONES'
        ? 'Conforme con Observaciones'
        : 'No Conforme - Alerta Fitosanitaria',
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Top action bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyReport}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl shadow-sm hover:bg-emerald-100 transition-colors"
            title="Copiar Acta Técnica para WhatsApp o Correo"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" /> ¡Acta Copiada!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" /> Compartir Acta
              </>
            )}
          </button>

          <button
            onClick={() => {
              if (window.confirm('¿Seguro que deseas eliminar esta auditoría?')) {
                onDelete(audit.id);
              }
            }}
            className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-xl hover:bg-rose-100 transition-colors"
            title="Eliminar auditoría"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Certificate Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Folio ID: MIPE-{String(audit.id).slice(-4)}
            </span>
            <h1 className="text-lg font-black text-slate-900 mt-1">
              {audit.farmName} — {audit.lotName}
            </h1>
            <p className="text-xs text-slate-600">
              Cultivo: <strong className="text-slate-800">{audit.crop}</strong> ({audit.phenologicalStage})
            </p>
          </div>
          <div className="text-right text-xs text-slate-600">
            <div className="flex items-center justify-end gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-600" /> {formattedDate}
            </div>
            <div className="mt-0.5">
              Auditor: <strong className="text-slate-700">{audit.auditorName}</strong>
            </div>
            <div>
              Responsable: <strong className="text-slate-700">{audit.farmResponsible}</strong>
            </div>
          </div>
        </div>

        {/* Ambient summary */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
          <span>
            Clima: <strong className="text-slate-700">{audit.weatherCondition}</strong>
          </span>
          <span>•</span>
          <span>
            Temp: <strong className="text-slate-700">{audit.temperatureCelsius}°C</strong>
          </span>
          <span>•</span>
          <span>
            Humedad: <strong className="text-slate-700">{audit.relativeHumidityPercent}%</strong>
          </span>
          <span>•</span>
          <span>
            Viento: <strong className="text-slate-700">{audit.windSpeedKmh} km/h</strong>
          </span>
        </div>
      </div>

      {/* Score Card with Full Breakdown */}
      <AuditScoreCard scores={scores} showPillars={true} />

      {/* Hydrosensitive Paper Evaluation Card */}
      <div className="space-y-1.5">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Inspección de Cobertura en Campo
        </h2>
        <HydrosensitiveCardPreview dropsPerCm2={audit.dropsPerCm2} quality={audit.coverageQuality} />
      </div>

      {/* 5-Pillar Details in structured panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pillar 1: Monitoreo */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-xs font-bold text-slate-800">
              1. Monitoreo Fitosanitario
            </span>
            <span className="text-xs font-bold text-emerald-700">
              {audit.scoreMonitoring} / 25 pts
            </span>
          </div>
          <div className="text-xs space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span>Blanco Evaluado:</span>
              <strong className="text-slate-800">{audit.targetProblemName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Tipo de Blanco:</span>
              <strong className="text-slate-800">{audit.targetProblemType}</strong>
            </div>
            <div className="flex justify-between">
              <span>Órgano Monitoreado:</span>
              <strong className="text-slate-800">{audit.organEvaluated}</strong>
            </div>
            <div className="flex justify-between">
              <span>Incidencia en Lote:</span>
              <strong className="text-slate-800">
                {audit.incidencePercent.toFixed(1)}% ({audit.infectedCount}/{audit.sampleSize} muestras)
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Severidad Media:</span>
              <strong className="text-slate-800">{audit.severityPercent.toFixed(1)}%</strong>
            </div>
            <div className="flex justify-between">
              <span>Nivel de Riesgo:</span>
              <strong
                className={
                  audit.pestRiskLevel === 'CRITICO'
                    ? 'text-rose-600'
                    : audit.pestRiskLevel === 'MEDIO'
                    ? 'text-amber-600'
                    : 'text-emerald-700'
                }
              >
                {audit.pestRiskLevel}
              </strong>
            </div>
          </div>
        </div>

        {/* Pillar 2: Calidad de Aplicación */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-xs font-bold text-slate-800">
              2. Calidad de Aplicación
            </span>
            <span className="text-xs font-bold text-emerald-700">
              {audit.scoreApplication} / 25 pts
            </span>
          </div>
          <div className="text-xs space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span>Boquilla:</span>
              <strong className="text-slate-800">{audit.nozzleType}</strong>
            </div>
            <div className="flex justify-between">
              <span>Estado de Boquillas:</span>
              <strong className={audit.nozzleConditionOk ? 'text-emerald-700' : 'text-rose-600'}>
                {audit.nozzleConditionOk ? 'Óptimo' : 'Desgastada'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Presión & Volumen:</span>
              <strong className="text-slate-800">
                {audit.sprayPressurePsi} PSI | {audit.targetVolumeLitersPerHa} L/ha
              </strong>
            </div>
            <div className="flex justify-between">
              <span>pH / Dureza Agua:</span>
              <strong className="text-slate-800">
                pH {audit.waterPh} | {audit.waterHardnessPpm} ppm CaCO3
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Protocolo WALES:</span>
              <strong className={audit.walesSequenceCorrect ? 'text-emerald-700' : 'text-rose-600'}>
                {audit.walesSequenceCorrect ? 'Correcto' : 'Incumplido'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Coadyuvante:</span>
              <strong className="text-slate-800">{audit.adjuvantUsed}</strong>
            </div>
          </div>
        </div>

        {/* Pillar 3: Cultural & Biológico */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-xs font-bold text-slate-800">
              3. Manejo Cultural & Biológico
            </span>
            <span className="text-xs font-bold text-emerald-700">
              {audit.scoreCultural} / 20 pts
            </span>
          </div>
          <div className="text-xs space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span>Poda Sanitaria:</span>
              <strong className={audit.sanitaryPruningDone ? 'text-emerald-700' : 'text-rose-600'}>
                {audit.sanitaryPruningDone ? 'Cumple' : 'Pendiente'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Manejo de Arvenses:</span>
              <strong className={audit.weedManagementOk ? 'text-emerald-700' : 'text-rose-600'}>
                {audit.weedManagementOk ? 'Adecuado' : 'Deficiente'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Trampas Cromáticas:</span>
              <strong className={audit.chromaticTrapsInstalled ? 'text-emerald-700' : 'text-rose-600'}>
                {audit.chromaticTrapsInstalled ? 'Instaladas' : 'No instaladas'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Control Biológico / Fauna Benéfica:</span>
              <strong className={audit.biologicalBeneficialsActive ? 'text-emerald-700' : 'text-rose-600'}>
                {audit.biologicalBeneficialsActive ? 'Activo' : 'Inactivo'}
              </strong>
            </div>
          </div>
        </div>

        {/* Pillar 4 & 5: MOA & BPA */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-xs font-bold text-slate-800">
              4. MOA & 5. BPA Bioseguridad
            </span>
            <span className="text-xs font-bold text-emerald-700">
              {audit.scoreMoa + audit.scoreBpa} / 30 pts
            </span>
          </div>
          <div className="text-xs space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span>Rotación MOA (FRAC/IRAC):</span>
              <strong className={audit.moaRotationCompliant ? 'text-emerald-700' : 'text-rose-600'}>
                {audit.moaRotationCompliant ? 'Cumple Rotación' : 'Riesgo de Resistencia'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Grupo MOA Actual:</span>
              <strong className="text-slate-800">{audit.currentMoaGroup}</strong>
            </div>
            <div className="flex justify-between">
              <span>Uso Completo de EPP:</span>
              <strong className={audit.ppeComplete ? 'text-emerald-700' : 'text-rose-600'}>
                {audit.ppeComplete ? 'Cumple' : 'Incompleto'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Triple Lavado & Inutilización:</span>
              <strong className={audit.tripleRinseDone ? 'text-emerald-700' : 'text-rose-600'}>
                {audit.tripleRinseDone ? 'Cumple' : 'Pendiente'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Bitácora de Calibración:</span>
              <strong className={audit.calibrationLogUpdated ? 'text-emerald-700' : 'text-rose-600'}>
                {audit.calibrationLogUpdated ? 'Al día' : 'Desactualizada'}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Avgust Agronomic Prescription */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-300 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 border-b border-emerald-200 pb-2">
          <Shield className="w-5 h-5 text-emerald-700" />
          <h2 className="text-sm font-bold text-emerald-950">
            Prescripción Agronómica & Solución Técnica Avgust
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-white/80 p-3 rounded-xl border border-emerald-200">
            <span className="text-[11px] font-semibold text-slate-600 block">
              Producto Recomendado:
            </span>
            <span className="text-sm font-black text-emerald-800 block mt-0.5">
              {audit.recommendedProduct}
            </span>
            <span className="text-[11px] text-slate-600">{audit.activeIngredient}</span>
          </div>

          <div className="bg-white/80 p-3 rounded-xl border border-emerald-200">
            <span className="text-[11px] font-semibold text-slate-600 block">
              Dosis & Preparación:
            </span>
            <span className="text-sm font-black text-slate-900 block mt-0.5">
              {audit.recommendedDose}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold">
              {audit.totalProductNeeded}
            </span>
          </div>

          <div className="bg-white/80 p-3 rounded-xl border border-emerald-200">
            <span className="text-[11px] font-semibold text-slate-600 block">
              Periodo de Reingreso al Lote:
            </span>
            <span className="text-xs font-bold text-slate-800">
              {audit.daysToReentry} día(s) (o secado completo del follaje)
            </span>
          </div>

          <div className="bg-white/80 p-3 rounded-xl border border-emerald-200">
            <span className="text-[11px] font-semibold text-slate-600 block">
              Periodo de Carencia (Días a Cosecha):
            </span>
            <span className="text-xs font-bold text-slate-800">
              {audit.safetyPeriodDays} días
            </span>
          </div>

          <div className="bg-white/80 p-3 rounded-xl border border-emerald-200 sm:col-span-2">
            <span className="text-[11px] font-semibold text-slate-600 block">
              Observaciones & Recomendaciones Técnicas del Auditor:
            </span>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
              {audit.technicalNotes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
