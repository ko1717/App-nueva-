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
    <div className="space-y-5">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleCopyReport}
            className="btn-primary"
            title="Copiar Acta Técnica para WhatsApp o Correo"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" /> ¡Acta Copiada!
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
            className="btn-secondary w-10 px-0 text-rose-700 hover:border-rose-200 hover:bg-rose-50"
            title="Eliminar auditoría"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Certificate Header */}
      <div className="surface p-5 space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control border border-line bg-white p-0.5">
              <img src="/avgust-logo.png" alt="Avgust" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="inline-block rounded-full border border-brass-200 bg-brass-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider tabular-nums text-brass-700">
                Folio ID: MIPE-{String(audit.id).slice(-4)}
              </span>
              <h1 className="mt-1 text-lg font-semibold leading-snug text-ink">
                {audit.farmName} — {audit.lotName}
              </h1>
              <p className="mt-0.5 text-xs text-ink-muted">
                Cultivo: <strong className="font-semibold text-ink">{audit.crop}</strong> ({audit.phenologicalStage})
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-ink-muted">
            <div className="flex items-center justify-end gap-1 font-medium">
              <Calendar className="h-3.5 w-3.5 text-ink-subtle" /> {formattedDate}
            </div>
            <div className="mt-0.5">
              Auditor: <strong className="font-semibold text-ink">{audit.auditorName}</strong>
            </div>
            <div>
              Responsable: <strong className="font-semibold text-ink">{audit.farmResponsible}</strong>
            </div>
          </div>
        </div>

        {/* Ambient summary */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-ink-muted">
          <span>
            Clima: <strong className="font-semibold text-ink">{audit.weatherCondition}</strong>
          </span>
          <span className="text-line-strong">•</span>
          <span>
            Temp: <strong className="font-semibold text-ink">{audit.temperatureCelsius}°C</strong>
          </span>
          <span className="text-line-strong">•</span>
          <span>
            Humedad: <strong className="font-semibold text-ink">{audit.relativeHumidityPercent}%</strong>
          </span>
          <span className="text-line-strong">•</span>
          <span>
            Viento: <strong className="font-semibold text-ink">{audit.windSpeedKmh} km/h</strong>
          </span>
        </div>
      </div>

      {/* Score Card with Full Breakdown */}
      <AuditScoreCard scores={scores} showPillars={true} />

      {/* Hydrosensitive Paper Evaluation Card */}
      <div className="space-y-2.5">
        <h2 className="eyebrow">
          Inspección de Cobertura en Campo
        </h2>
        <HydrosensitiveCardPreview dropsPerCm2={audit.dropsPerCm2} quality={audit.coverageQuality} />
      </div>

      {/* 5-Pillar Details in structured panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pillar 1: Monitoreo */}
        <div className="surface p-4 space-y-3">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
            <span className="text-sm font-semibold text-ink">
              1. Monitoreo Fitosanitario
            </span>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-forest-800">
              {audit.scoreMonitoring} / 25 pts
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-ink-muted">
            <div className="flex justify-between gap-3">
              <span>Blanco Evaluado:</span>
              <strong className="text-right font-semibold text-ink">{audit.targetProblemName}</strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Tipo de Blanco:</span>
              <strong className="text-right font-semibold text-ink">{audit.targetProblemType}</strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Órgano Monitoreado:</span>
              <strong className="text-right font-semibold text-ink">{audit.organEvaluated}</strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Incidencia en Lote:</span>
              <strong className="text-right font-semibold text-ink">
                {audit.incidencePercent.toFixed(1)}% ({audit.infectedCount}/{audit.sampleSize} muestras)
              </strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Severidad Media:</span>
              <strong className="text-right font-semibold text-ink">{audit.severityPercent.toFixed(1)}%</strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Nivel de Riesgo:</span>
              <strong
                className={
                  audit.pestRiskLevel === 'CRITICO'
                    ? 'font-semibold text-rose-600'
                    : audit.pestRiskLevel === 'MEDIO'
                    ? 'font-semibold text-amber-700'
                    : 'font-semibold text-forest-700'
                }
              >
                {audit.pestRiskLevel}
              </strong>
            </div>
          </div>
        </div>

        {/* Pillar 2: Calidad de Aplicación */}
        <div className="surface p-4 space-y-3">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
            <span className="text-sm font-semibold text-ink">
              2. Calidad de Aplicación
            </span>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-forest-800">
              {audit.scoreApplication} / 25 pts
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-ink-muted">
            <div className="flex justify-between gap-3">
              <span>Boquilla:</span>
              <strong className="text-right font-semibold text-ink">{audit.nozzleType}</strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Estado de Boquillas:</span>
              <strong className={audit.nozzleConditionOk ? 'text-right font-semibold text-forest-700' : 'text-right font-semibold text-rose-600'}>
                {audit.nozzleConditionOk ? 'Óptimo' : 'Desgastada'}
              </strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Presión & Volumen:</span>
              <strong className="text-right font-semibold text-ink">
                {audit.sprayPressurePsi} PSI | {audit.targetVolumeLitersPerHa} L/ha
              </strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>pH / Dureza Agua:</span>
              <strong className="text-right font-semibold text-ink">
                pH {audit.waterPh} | {audit.waterHardnessPpm} ppm CaCO3
              </strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Protocolo WALES:</span>
              <strong className={audit.walesSequenceCorrect ? 'text-right font-semibold text-forest-700' : 'text-right font-semibold text-rose-600'}>
                {audit.walesSequenceCorrect ? 'Correcto' : 'Incumplido'}
              </strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Coadyuvante:</span>
              <strong className="text-right font-semibold text-ink">{audit.adjuvantUsed}</strong>
            </div>
          </div>
        </div>

        {/* Pillar 3: Cultural & Biológico */}
        <div className="surface p-4 space-y-3">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
            <span className="text-sm font-semibold text-ink">
              3. Manejo Cultural & Biológico
            </span>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-forest-800">
              {audit.scoreCultural} / 20 pts
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-ink-muted">
            <div className="flex justify-between gap-3">
              <span>Poda Sanitaria:</span>
              <strong className={audit.sanitaryPruningDone ? 'text-right font-semibold text-forest-700' : 'text-right font-semibold text-rose-600'}>
                {audit.sanitaryPruningDone ? 'Cumple' : 'Pendiente'}
              </strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Manejo de Arvenses:</span>
              <strong className={audit.weedManagementOk ? 'text-right font-semibold text-forest-700' : 'text-right font-semibold text-rose-600'}>
                {audit.weedManagementOk ? 'Adecuado' : 'Deficiente'}
              </strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Trampas Cromáticas:</span>
              <strong className={audit.chromaticTrapsInstalled ? 'text-right font-semibold text-forest-700' : 'text-right font-semibold text-rose-600'}>
                {audit.chromaticTrapsInstalled ? 'Instaladas' : 'No instaladas'}
              </strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Control Biológico / Fauna Benéfica:</span>
              <strong className={audit.biologicalBeneficialsActive ? 'text-right font-semibold text-forest-700' : 'text-right font-semibold text-rose-600'}>
                {audit.biologicalBeneficialsActive ? 'Activo' : 'Inactivo'}
              </strong>
            </div>
          </div>
        </div>

        {/* Pillar 4 & 5: MOA & BPA */}
        <div className="surface p-4 space-y-3">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
            <span className="text-sm font-semibold text-ink">
              4. MOA & 5. BPA Bioseguridad
            </span>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-forest-800">
              {audit.scoreMoa + audit.scoreBpa} / 30 pts
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-ink-muted">
            <div className="flex justify-between gap-3">
              <span>Rotación MOA (FRAC/IRAC):</span>
              <strong className={audit.moaRotationCompliant ? 'text-right font-semibold text-forest-700' : 'text-right font-semibold text-rose-600'}>
                {audit.moaRotationCompliant ? 'Cumple Rotación' : 'Riesgo de Resistencia'}
              </strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Grupo MOA Actual:</span>
              <strong className="text-right font-semibold text-ink">{audit.currentMoaGroup}</strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Uso Completo de EPP:</span>
              <strong className={audit.ppeComplete ? 'text-right font-semibold text-forest-700' : 'text-right font-semibold text-rose-600'}>
                {audit.ppeComplete ? 'Cumple' : 'Incompleto'}
              </strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Triple Lavado & Inutilización:</span>
              <strong className={audit.tripleRinseDone ? 'text-right font-semibold text-forest-700' : 'text-right font-semibold text-rose-600'}>
                {audit.tripleRinseDone ? 'Cumple' : 'Pendiente'}
              </strong>
            </div>
            <div className="flex justify-between gap-3">
              <span>Bitácora de Calibración:</span>
              <strong className={audit.calibrationLogUpdated ? 'text-right font-semibold text-forest-700' : 'text-right font-semibold text-rose-600'}>
                {audit.calibrationLogUpdated ? 'Al día' : 'Desactualizada'}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Avgust Agronomic Prescription */}
      <div className="rounded-card border border-forest-200 bg-forest-50 p-5 shadow-card space-y-4">
        <div className="flex items-center gap-2.5 border-b border-forest-200 pb-3">
          <Shield className="h-5 w-5 shrink-0 text-forest-700" />
          <h2 className="text-[15px] font-semibold leading-snug text-forest-950">
            Prescripción Agronómica & Solución Técnica Avgust
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-control border border-forest-100 bg-white p-3">
            <span className="block text-[11px] font-semibold text-ink-muted">
              Producto Recomendado:
            </span>
            <span className="mt-0.5 block text-sm font-semibold text-forest-800">
              {audit.recommendedProduct}
            </span>
            <span className="text-[11px] text-ink-muted">{audit.activeIngredient}</span>
          </div>

          <div className="rounded-control border border-forest-100 bg-white p-3">
            <span className="block text-[11px] font-semibold text-ink-muted">
              Dosis & Preparación:
            </span>
            <span className="mt-0.5 block text-sm font-semibold tabular-nums text-ink">
              {audit.recommendedDose}
            </span>
            <span className="text-[11px] font-semibold tabular-nums text-forest-700">
              {audit.totalProductNeeded}
            </span>
          </div>

          <div className="rounded-control border border-forest-100 bg-white p-3">
            <span className="block text-[11px] font-semibold text-ink-muted">
              Periodo de Reingreso al Lote:
            </span>
            <span className="text-sm font-semibold text-ink">
              {audit.daysToReentry} día(s) (o secado completo del follaje)
            </span>
          </div>

          <div className="rounded-control border border-forest-100 bg-white p-3">
            <span className="block text-[11px] font-semibold text-ink-muted">
              Periodo de Carencia (Días a Cosecha):
            </span>
            <span className="text-sm font-semibold text-ink">
              {audit.safetyPeriodDays} días
            </span>
          </div>

          <div className="rounded-control border border-forest-100 bg-white p-3 sm:col-span-2">
            <span className="block text-[11px] font-semibold text-ink-muted">
              Observaciones & Recomendaciones Técnicas del Auditor:
            </span>
            <p className="mt-1 text-xs leading-relaxed text-ink">
              {audit.technicalNotes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
