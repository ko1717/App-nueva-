import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  Thermometer,
  Wind,
  Shield,
  Save,
  Info,
} from 'lucide-react';
import { NewAuditDraft, FarmLotEntity, AvgustProductItem, PestCatalogItem, MipeAuditEntity } from '../types';
import { calculatePillarScores, calculateCoverageQuality, calculateProductNeededText } from '../utils/calculator';
import { HydrosensitiveCardPreview } from '../components/HydrosensitiveCardPreview';
import { AuditScoreCard } from '../components/AuditScoreCard';

interface NewAuditScreenProps {
  lots: FarmLotEntity[];
  products: AvgustProductItem[];
  pests: PestCatalogItem[];
  initialPest?: PestCatalogItem | null;
  initialProduct?: AvgustProductItem | null;
  onSaveAudit: (newAudit: MipeAuditEntity) => void;
  onCancel: () => void;
}

export const NewAuditScreen: React.FC<NewAuditScreenProps> = ({
  lots,
  products,
  pests,
  initialPest,
  initialProduct,
  onSaveAudit,
  onCancel,
}) => {
  const [step, setStep] = useState<number>(initialPest ? 2 : initialProduct ? 5 : 1);

  const [draft, setDraft] = useState<NewAuditDraft>(() => ({
    farmName: lots[0]?.farmName || 'Flores del Sol - Sede Sabana',
    blockName: lots[0]?.blockName || 'Bloque B-04 (Variedad Freedom)',
    lotName: lots[0]?.lotName || 'Lote 12 - Exportación',
    crop: initialProduct?.targetCrops[0] || initialPest?.affectedCrops[0] || lots[0]?.crop || 'Rosa (Corte Exportación)',
    phenologicalStage: 'Botón Floral y Corte',
    auditorName: 'Ing. Agrónomo Avgust',
    farmResponsible: lots[0]?.managerName || 'Ing. Carlos Mendoza',
    temperatureCelsius: 21.0,
    relativeHumidityPercent: 65,
    windSpeedKmh: 4.0,
    weatherCondition: 'Soleado con brisa leve',

    targetProblemType: initialPest?.category || 'ENFERMEDAD',
    targetProblemName: initialPest
      ? `${initialPest.scientificName} (${initialPest.commonName})`
      : 'Botrytis cinerea (Moho gris)',
    organEvaluated: initialPest?.targetOrgans || 'Botones florales y cálices',
    sampleSize: 100,
    infectedCount: 4,
    severityPercent: 2.0,
    pestRiskLevel: 'BAJO',

    nozzleType: 'Cono Hueco Cerámica TX-VK',
    nozzleConditionOk: true,
    sprayPressurePsi: 45.0,
    targetVolumeLitersPerHa: 800.0,
    dropsPerCm2: 65,
    waterPh: 6.0,
    waterHardnessPpm: 110,
    walesSequenceCorrect: true,
    adjuvantUsed: 'Avgust Star (0.5 cc/L)',

    sanitaryPruningDone: true,
    weedManagementOk: true,
    chromaticTrapsInstalled: true,
    biologicalBeneficialsActive: true,
    moaRotationCompliant: true,
    currentMoaGroup: initialProduct ? `${initialProduct.moaCode} (${initialProduct.tradeName})` : initialPest?.recommendedMoaGroup || 'FRAC 11 + 3 (Balerina SC)',
    previousMoaGroup: 'FRAC 9 (Pirimetanil)',
    ppeComplete: true,
    tripleRinseDone: true,
    calibrationLogUpdated: true,

    recommendedProduct: initialProduct?.tradeName || initialPest?.recommendedAvgustSolution.split(' ')[0] || 'Balerina SC',
    activeIngredient: initialProduct?.activeIngredient || 'Trifloxistrobin 375 g/L + Ciproconazol 160 g/L',
    recommendedDose: initialProduct ? initialProduct.standardDose.split(' ')[0] : '0.4 cc/L',
    tankVolumeLiters: 200.0,
    technicalNotes: initialProduct
      ? `Prescripción técnica directa: ${initialProduct.tradeName} (${initialProduct.chemicalGroup} - ${initialProduct.moaCode}). Dosis: ${initialProduct.standardDose}. PR: ${initialProduct.reEntryPeriodHours}h, PC: ${initialProduct.preHarvestIntervalDays} días. ${initialProduct.compatibilityTips}`
      : initialPest
      ? `Estrategia MIPE recomendada: ${initialPest.mipeCulturalStrategy}. Rotación con ${initialPest.recommendedMoaGroup}.`
      : 'Mantener monitoreo semanal de incidencia y asegurar adición de Avgust Star al final de la mezcla.',
  }));

  const incidencePercent = useMemo(() => {
    return draft.sampleSize > 0
      ? (draft.infectedCount / draft.sampleSize) * 100.0
      : 0.0;
  }, [draft.sampleSize, draft.infectedCount]);

  const scores = useMemo(() => {
    return calculatePillarScores({
      incidencePercent,
      severityPercent: draft.severityPercent,
      pestRiskLevel: draft.pestRiskLevel,
      nozzleConditionOk: draft.nozzleConditionOk,
      dropsPerCm2: draft.dropsPerCm2,
      waterPh: draft.waterPh,
      waterHardnessPpm: draft.waterHardnessPpm,
      walesSequenceCorrect: draft.walesSequenceCorrect,
      hasAdjuvant: !!draft.adjuvantUsed && !draft.adjuvantUsed.toLowerCase().includes('sin'),
      sanitaryPruningDone: draft.sanitaryPruningDone,
      weedManagementOk: draft.weedManagementOk,
      chromaticTrapsInstalled: draft.chromaticTrapsInstalled,
      biologicalBeneficialsActive: draft.biologicalBeneficialsActive,
      moaRotationCompliant: draft.moaRotationCompliant,
      ppeComplete: draft.ppeComplete,
      tripleRinseDone: draft.tripleRinseDone,
      calibrationLogUpdated: draft.calibrationLogUpdated,
    });
  }, [draft, incidencePercent]);

  const coverageQuality = useMemo(() => {
    return calculateCoverageQuality(draft.dropsPerCm2);
  }, [draft.dropsPerCm2]);

  const totalProductNeeded = useMemo(() => {
    return calculateProductNeededText(draft.recommendedDose, draft.tankVolumeLiters);
  }, [draft.recommendedDose, draft.tankVolumeLiters]);

  const handleProductSelect = (productName: string) => {
    const prod = products.find((p) => p.tradeName === productName);
    if (prod) {
      setDraft((prev) => ({
        ...prev,
        recommendedProduct: prod.tradeName,
        activeIngredient: prod.activeIngredient,
        recommendedDose: prod.standardDose.split(' ')[0] || '0.5 cc/L',
        currentMoaGroup: `${prod.moaCode} (${prod.tradeName})`,
      }));
    }
  };

  const handleLotSelect = (lotIdStr: string) => {
    const selectedLot = lots.find((l) => l.id.toString() === lotIdStr);
    if (selectedLot) {
      setDraft((prev) => ({
        ...prev,
        farmName: selectedLot.farmName,
        blockName: selectedLot.blockName,
        lotName: selectedLot.lotName,
        crop: selectedLot.crop,
        farmResponsible: selectedLot.managerName,
      }));
    }
  };

  const handleSubmit = () => {
    const newAudit: MipeAuditEntity = {
      id: Date.now(),
      farmName: draft.farmName,
      blockName: draft.blockName,
      lotName: draft.lotName,
      crop: draft.crop,
      phenologicalStage: draft.phenologicalStage,
      auditDate: Date.now(),
      auditorName: draft.auditorName,
      farmResponsible: draft.farmResponsible,
      temperatureCelsius: draft.temperatureCelsius,
      relativeHumidityPercent: draft.relativeHumidityPercent,
      windSpeedKmh: draft.windSpeedKmh,
      weatherCondition: draft.weatherCondition,
      targetProblemType: draft.targetProblemType,
      targetProblemName: draft.targetProblemName,
      organEvaluated: draft.organEvaluated,
      sampleSize: draft.sampleSize,
      infectedCount: draft.infectedCount,
      incidencePercent,
      severityPercent: draft.severityPercent,
      pestRiskLevel: draft.pestRiskLevel,
      nozzleType: draft.nozzleType,
      nozzleConditionOk: draft.nozzleConditionOk,
      sprayPressurePsi: draft.sprayPressurePsi,
      targetVolumeLitersPerHa: draft.targetVolumeLitersPerHa,
      dropsPerCm2: draft.dropsPerCm2,
      coverageQuality,
      waterPh: draft.waterPh,
      waterHardnessPpm: draft.waterHardnessPpm,
      walesSequenceCorrect: draft.walesSequenceCorrect,
      adjuvantUsed: draft.adjuvantUsed,
      sanitaryPruningDone: draft.sanitaryPruningDone,
      weedManagementOk: draft.weedManagementOk,
      chromaticTrapsInstalled: draft.chromaticTrapsInstalled,
      biologicalBeneficialsActive: draft.biologicalBeneficialsActive,
      moaRotationCompliant: draft.moaRotationCompliant,
      currentMoaGroup: draft.currentMoaGroup,
      previousMoaGroup: draft.previousMoaGroup,
      ppeComplete: draft.ppeComplete,
      tripleRinseDone: draft.tripleRinseDone,
      calibrationLogUpdated: draft.calibrationLogUpdated,
      scoreMonitoring: scores.pestMonitoringScore,
      scoreApplication: scores.applicationQualityScore,
      scoreCultural: scores.culturalBiologicalScore,
      scoreMoa: scores.moaResistanceScore,
      scoreBpa: scores.bpaSafetyScore,
      totalScore: scores.totalScore,
      verdict: scores.verdict,
      recommendedProduct: draft.recommendedProduct,
      activeIngredient: draft.activeIngredient,
      recommendedDose: draft.recommendedDose,
      tankVolumeLiters: draft.tankVolumeLiters,
      totalProductNeeded,
      daysToReentry: 1,
      safetyPeriodDays: 7,
      technicalNotes: draft.technicalNotes,
    };

    onSaveAudit(newAudit);
  };

  const stepsHeaders = [
    '1. Ubicación & Lote',
    '2. Monitoreo Fitosanitario',
    '3. Calidad de Aplicación',
    '4. Cultural & BPA',
    '5. Solución Avgust',
  ];

  return (
    <div className="space-y-5">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onCancel}
          className="btn-secondary"
        >
          <ArrowLeft className="w-4 h-4" /> Cancelar
        </button>
        <span className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider tabular-nums text-forest-800">
          Paso {step} de 5
        </span>
      </div>

      {/* Step Progress Bar */}
      <div className="surface p-3.5">
        <div className="mb-2.5 grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-colors ${
                s === step
                  ? 'bg-forest-600 ring-2 ring-forest-200'
                  : s < step
                  ? 'bg-forest-800'
                  : 'bg-line'
              }`}
            />
          ))}
        </div>
        <div className="text-center">
          <span className="text-sm font-semibold text-ink">
            {stepsHeaders[step - 1]}
          </span>
        </div>
      </div>

      {/* STEP 1: General & Location */}
      {step === 1 && (
        <div className="surface p-5 space-y-4">
          <h2 className="flex items-center gap-2.5 border-b border-line pb-3 text-[15px] font-semibold leading-snug text-ink">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-forest-200 bg-forest-50 text-xs font-semibold tabular-nums text-forest-800">
              1
            </span>
            Datos Generales y Condiciones Ambientales
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Lote Registrado (Opcional para autocompletar)
              </label>
              <select
                onChange={(e) => handleLotSelect(e.target.value)}
                className="field"
              >
                <option value="">Seleccionar de lotes de la finca...</option>
                {lots.map((l) => (
                  <option key={l.id} value={l.id.toString()}>
                    {l.farmName} — {l.lotName} ({l.crop})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Finca Agrícola
              </label>
              <input
                type="text"
                value={draft.farmName}
                onChange={(e) => setDraft({ ...draft, farmName: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Bloque / Módulo
              </label>
              <input
                type="text"
                value={draft.blockName}
                onChange={(e) => setDraft({ ...draft, blockName: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Lote / Válvula
              </label>
              <input
                type="text"
                value={draft.lotName}
                onChange={(e) => setDraft({ ...draft, lotName: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Cultivo Evaluado
              </label>
              <input
                type="text"
                value={draft.crop}
                onChange={(e) => setDraft({ ...draft, crop: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Etapa Fenológica
              </label>
              <input
                type="text"
                value={draft.phenologicalStage}
                onChange={(e) => setDraft({ ...draft, phenologicalStage: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Auditor Técnico Avgust
              </label>
              <input
                type="text"
                value={draft.auditorName}
                onChange={(e) => setDraft({ ...draft, auditorName: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Responsable Finca / Agrónomo
              </label>
              <input
                type="text"
                value={draft.farmResponsible}
                onChange={(e) => setDraft({ ...draft, farmResponsible: e.target.value })}
                className="field"
              />
            </div>
          </div>

          {/* Ambient Conditions */}
          <div className="border-t border-line pt-4">
            <h3 className="eyebrow mb-2.5 flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-amber-500" />
              Condiciones Climáticas al Momento de la Auditoría
            </h3>
            <div className="grid grid-cols-2 items-end gap-3 sm:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs text-ink-muted">
                  Temperatura (°C)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={draft.temperatureCelsius}
                  onChange={(e) => setDraft({ ...draft, temperatureCelsius: parseFloat(e.target.value) || 20 })}
                  className="field"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-ink-muted">
                  Humedad Relativa (%)
                </label>
                <input
                  type="number"
                  value={draft.relativeHumidityPercent}
                  onChange={(e) => setDraft({ ...draft, relativeHumidityPercent: parseInt(e.target.value) || 60 })}
                  className="field"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-ink-muted">
                  Velocidad Viento (km/h)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={draft.windSpeedKmh}
                  onChange={(e) => setDraft({ ...draft, windSpeedKmh: parseFloat(e.target.value) || 3 })}
                  className="field"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-ink-muted">
                  Estado del Tiempo
                </label>
                <input
                  type="text"
                  value={draft.weatherCondition}
                  onChange={(e) => setDraft({ ...draft, weatherCondition: e.target.value })}
                  className="field"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Pest & Disease Monitoring */}
      {step === 2 && (
        <div className="surface p-5 space-y-4">
          <h2 className="flex items-center gap-2.5 border-b border-line pb-3 text-[15px] font-semibold leading-snug text-ink">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-forest-200 bg-forest-50 text-xs font-semibold tabular-nums text-forest-800">
              2
            </span>
            Pilar 1: Monitoreo Fitosanitario y Umbrales Económicos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Tipo de Blanco
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['ENFERMEDAD', 'PLAGA', 'ARVENSE'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDraft({ ...draft, targetProblemType: type })}
                    className={`min-h-10 rounded-control border px-2 py-2 text-xs font-semibold leading-tight transition-colors ${
                      draft.targetProblemType === type
                        ? 'bg-forest-700 text-white border-forest-700'
                        : 'bg-surface border-line-strong text-ink-muted hover:bg-surface-muted hover:text-ink'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Sugerencias del Catálogo de Plagas
              </label>
              <select
                onChange={(e) => {
                  const pest = pests.find((p) => p.scientificName === e.target.value);
                  if (pest) {
                    setDraft({
                      ...draft,
                      targetProblemName: `${pest.scientificName} (${pest.commonName})`,
                      organEvaluated: pest.targetOrgans,
                    });
                  }
                }}
                className="field"
              >
                <option value="">Seleccionar plaga/enfermedad conocida...</option>
                {[...pests]
                  .sort((a, b) => a.commonName.localeCompare(b.commonName, 'es', { sensitivity: 'base' }))
                  .map((p) => (
                    <option key={p.id} value={p.scientificName}>
                      {p.commonName} — {p.scientificName}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Nombre del Blanco Fitosanitario
              </label>
              <input
                type="text"
                value={draft.targetProblemName}
                onChange={(e) => setDraft({ ...draft, targetProblemName: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Órgano Evaluado (Hojas, Botones, Frutos, etc.)
              </label>
              <input
                type="text"
                value={draft.organEvaluated}
                onChange={(e) => setDraft({ ...draft, organEvaluated: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Tamaño de Muestra (Unidades evaluadas)
              </label>
              <input
                type="number"
                min="1"
                value={draft.sampleSize}
                onChange={(e) => setDraft({ ...draft, sampleSize: parseInt(e.target.value) || 100 })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Unidades Afectadas / Positivas
              </label>
              <input
                type="number"
                min="0"
                value={draft.infectedCount}
                onChange={(e) => setDraft({ ...draft, infectedCount: parseInt(e.target.value) || 0 })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                % Severidad Media Estimada
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="100"
                value={draft.severityPercent}
                onChange={(e) => setDraft({ ...draft, severityPercent: parseFloat(e.target.value) || 0 })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Nivel de Riesgo Fitosanitario
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['BAJO', 'MEDIO', 'CRITICO'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDraft({ ...draft, pestRiskLevel: lvl })}
                    className={`min-h-10 rounded-control border px-2 py-2 text-xs font-semibold leading-tight transition-colors ${
                      draft.pestRiskLevel === lvl
                        ? lvl === 'BAJO'
                          ? 'bg-forest-700 text-white border-forest-700'
                          : lvl === 'MEDIO'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-rose-600 text-white border-rose-600'
                        : 'bg-surface border-line-strong text-ink-muted hover:bg-surface-muted hover:text-ink'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Calculated Incidence */}
          <div className="flex items-center justify-between gap-3 rounded-control border border-forest-200 bg-forest-50 p-3.5">
            <div>
              <span className="block text-xs font-semibold text-forest-950">
                Incidencia Fitosanitaria Calculada
              </span>
              <span className="text-[11px] tabular-nums text-forest-700">
                {draft.infectedCount} afectadas de {draft.sampleSize} evaluadas
              </span>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-xl font-semibold tabular-nums text-forest-800">
                {incidencePercent.toFixed(1)}%
              </span>
              <span className="block whitespace-nowrap text-[11px] font-medium tabular-nums text-forest-700">
                Puntaje Pilar: {scores.pestMonitoringScore} / 25
              </span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Spray Application Quality */}
      {step === 3 && (
        <div className="surface p-5 space-y-4">
          <h2 className="flex items-center gap-2.5 border-b border-line pb-3 text-[15px] font-semibold leading-snug text-ink">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-forest-200 bg-forest-50 text-xs font-semibold tabular-nums text-forest-800">
              3
            </span>
            Pilar 2: Calidad de Aplicación y Evaluación Hidrosensible
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Tipo de Boquilla
              </label>
              <input
                type="text"
                value={draft.nozzleType}
                onChange={(e) => setDraft({ ...draft, nozzleType: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Estado Físico de Boquillas
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDraft({ ...draft, nozzleConditionOk: true })}
                  className={`min-h-10 rounded-control border px-2 py-2 text-xs font-semibold leading-tight transition-colors ${
                    draft.nozzleConditionOk
                      ? 'bg-forest-700 text-white border-forest-700'
                      : 'bg-surface border-line-strong text-ink-muted hover:bg-surface-muted hover:text-ink'
                  }`}
                >
                  Óptimo (Sin desgaste)
                </button>
                <button
                  type="button"
                  onClick={() => setDraft({ ...draft, nozzleConditionOk: false })}
                  className={`min-h-10 rounded-control border px-2 py-2 text-xs font-semibold leading-tight transition-colors ${
                    !draft.nozzleConditionOk
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-surface border-line-strong text-ink-muted hover:bg-surface-muted hover:text-ink'
                  }`}
                >
                  Desgastada / Dañada
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Presión de Trabajo (PSI)
              </label>
              <input
                type="number"
                step="5"
                value={draft.sprayPressurePsi}
                onChange={(e) => setDraft({ ...draft, sprayPressurePsi: parseFloat(e.target.value) || 45 })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Volumen Caldo Objetivo (L/ha)
              </label>
              <input
                type="number"
                step="50"
                value={draft.targetVolumeLitersPerHa}
                onChange={(e) => setDraft({ ...draft, targetVolumeLitersPerHa: parseFloat(e.target.value) || 800 })}
                className="field"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Densidad de Impactos (Gotas / cm² en papel hidrosensible)
              </label>
              <input
                type="range"
                min="10"
                max="140"
                value={draft.dropsPerCm2}
                onChange={(e) => setDraft({ ...draft, dropsPerCm2: parseInt(e.target.value) || 60 })}
                className="w-full cursor-pointer accent-forest-700"
              />
              <HydrosensitiveCardPreview dropsPerCm2={draft.dropsPerCm2} quality={coverageQuality} />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                pH del Agua de Mezcla (Óptimo 5.5 - 6.5)
              </label>
              <input
                type="number"
                step="0.1"
                value={draft.waterPh}
                onChange={(e) => setDraft({ ...draft, waterPh: parseFloat(e.target.value) || 6.0 })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Dureza del Agua (ppm CaCO3)
              </label>
              <input
                type="number"
                step="10"
                value={draft.waterHardnessPpm}
                onChange={(e) => setDraft({ ...draft, waterHardnessPpm: parseInt(e.target.value) || 100 })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Coadyuvante / Humectante Empleado
              </label>
              <input
                type="text"
                value={draft.adjuvantUsed}
                onChange={(e) => setDraft({ ...draft, adjuvantUsed: e.target.value })}
                className="field"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">
                Secuencia de Mezcla WALES
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDraft({ ...draft, walesSequenceCorrect: true })}
                  className={`min-h-10 rounded-control border px-2 py-2 text-xs font-semibold leading-tight transition-colors ${
                    draft.walesSequenceCorrect
                      ? 'bg-forest-700 text-white border-forest-700'
                      : 'bg-surface border-line-strong text-ink-muted hover:bg-surface-muted hover:text-ink'
                  }`}
                >
                  Correcta (WALES)
                </button>
                <button
                  type="button"
                  onClick={() => setDraft({ ...draft, walesSequenceCorrect: false })}
                  className={`min-h-10 rounded-control border px-2 py-2 text-xs font-semibold leading-tight transition-colors ${
                    !draft.walesSequenceCorrect
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-surface border-line-strong text-ink-muted hover:bg-surface-muted hover:text-ink'
                  }`}
                >
                  Incorrecta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Cultural, Biological, MOA & BPA */}
      {step === 4 && (
        <div className="surface p-5 space-y-4">
          <h2 className="flex items-center gap-2.5 border-b border-line pb-3 text-[15px] font-semibold leading-snug text-ink">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-forest-200 bg-forest-50 text-xs font-semibold tabular-nums text-forest-800">
              4
            </span>
            Pilares 3, 4 y 5: Manejo Cultural, Rotación MOA y BPA
          </h2>

          <div className="space-y-4">
            {/* Cultural & Biological Checkbox buttons */}
            <div>
              <h3 className="eyebrow mb-2.5">
                Pilar 3: Manejo Cultural & Biológico (20 pts)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    label: 'Poda y desbotone sanitario realizado',
                    val: draft.sanitaryPruningDone,
                    toggle: () => setDraft({ ...draft, sanitaryPruningDone: !draft.sanitaryPruningDone }),
                  },
                  {
                    label: 'Manejo de arvenses hospederas al día',
                    val: draft.weedManagementOk,
                    toggle: () => setDraft({ ...draft, weedManagementOk: !draft.weedManagementOk }),
                  },
                  {
                    label: 'Trampas cromáticas instaladas y monitoreadas',
                    val: draft.chromaticTrapsInstalled,
                    toggle: () => setDraft({ ...draft, chromaticTrapsInstalled: !draft.chromaticTrapsInstalled }),
                  },
                  {
                    label: 'Fauna benéfica / bio-insumos activos',
                    val: draft.biologicalBeneficialsActive,
                    toggle: () => setDraft({ ...draft, biologicalBeneficialsActive: !draft.biologicalBeneficialsActive }),
                  },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={item.toggle}
                    className={`flex min-h-12 items-center justify-between gap-3 rounded-control border p-3 text-left transition-colors ${
                      item.val
                        ? 'bg-forest-50 border-forest-300 text-forest-900'
                        : 'bg-surface border-line-strong text-ink-muted hover:bg-surface-muted'
                    }`}
                  >
                    <span className="text-xs font-semibold">{item.label}</span>
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border ${
                        item.val
                          ? 'bg-forest-700 border-forest-700 text-white'
                          : 'border-line-strong bg-surface'
                      }`}
                    >
                      {item.val && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* MOA Rotation */}
            <div className="border-t border-line pt-4">
              <h3 className="eyebrow mb-2.5">
                Pilar 4: Rotación MOA (FRAC/IRAC/HRAC) (15 pts)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink">
                    ¿Cumple con alternancia de Modo de Acción?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDraft({ ...draft, moaRotationCompliant: true })}
                      className={`min-h-10 rounded-control border px-2 py-2 text-xs font-semibold leading-tight transition-colors ${
                        draft.moaRotationCompliant
                          ? 'bg-forest-700 text-white border-forest-700'
                          : 'bg-surface border-line-strong text-ink-muted hover:bg-surface-muted hover:text-ink'
                      }`}
                    >
                      Sí, Rota Grupo
                    </button>
                    <button
                      type="button"
                      onClick={() => setDraft({ ...draft, moaRotationCompliant: false })}
                      className={`min-h-10 rounded-control border px-2 py-2 text-xs font-semibold leading-tight transition-colors ${
                        !draft.moaRotationCompliant
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-surface border-line-strong text-ink-muted hover:bg-surface-muted hover:text-ink'
                      }`}
                    >
                      No (Riesgo Resistencia)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink">
                    Grupo MOA Anterior
                  </label>
                  <input
                    type="text"
                    value={draft.previousMoaGroup}
                    onChange={(e) => setDraft({ ...draft, previousMoaGroup: e.target.value })}
                    className="field"
                  />
                </div>
              </div>
            </div>

            {/* BPA & Biosecurity */}
            <div className="border-t border-line pt-4">
              <h3 className="eyebrow mb-2.5">
                Pilar 5: BPA, Bioseguridad y Operario (15 pts)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    label: 'Uso completo de EPP por operarios',
                    val: draft.ppeComplete,
                    toggle: () => setDraft({ ...draft, ppeComplete: !draft.ppeComplete }),
                  },
                  {
                    label: 'Triple lavado de envases e inutilización',
                    val: draft.tripleRinseDone,
                    toggle: () => setDraft({ ...draft, tripleRinseDone: !draft.tripleRinseDone }),
                  },
                  {
                    label: 'Bitácora y calibración de equipos al día',
                    val: draft.calibrationLogUpdated,
                    toggle: () => setDraft({ ...draft, calibrationLogUpdated: !draft.calibrationLogUpdated }),
                  },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={item.toggle}
                    className={`flex min-h-12 items-center justify-between gap-3 rounded-control border p-3 text-left transition-colors ${
                      item.val
                        ? 'bg-forest-50 border-forest-300 text-forest-900'
                        : 'bg-surface border-line-strong text-ink-muted hover:bg-surface-muted'
                    }`}
                  >
                    <span className="text-xs font-semibold">{item.label}</span>
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border ${
                        item.val
                          ? 'bg-forest-700 border-forest-700 text-white'
                          : 'border-line-strong bg-surface'
                      }`}
                    >
                      {item.val && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Avgust Solution & Final Audit Verdict */}
      {step === 5 && (
        <div className="space-y-4">
          {/* Live Scorecard Preview */}
          <AuditScoreCard scores={scores} showPillars={true} />

          <div className="surface p-5 space-y-4">
            <h2 className="flex items-center gap-2.5 border-b border-line pb-3 text-[15px] font-semibold leading-snug text-ink">
              <Shield className="h-5 w-5 shrink-0 text-forest-700" />
              Prescripción Agronómica y Solución Técnica Avgust
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">
                  Producto Avgust Recomendado
                </label>
                <select
                  value={draft.recommendedProduct}
                  onChange={(e) => handleProductSelect(e.target.value)}
                  className="field font-semibold"
                >
                  {[...products]
                    .sort((a, b) => a.tradeName.localeCompare(b.tradeName, 'es', { sensitivity: 'base' }))
                    .map((p) => (
                      <option key={p.id} value={p.tradeName}>
                        {p.tradeName} ({p.category}) — {p.moaCode}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">
                  Ingrediente Activo & Concentración
                </label>
                <input
                  type="text"
                  value={draft.activeIngredient}
                  onChange={(e) => setDraft({ ...draft, activeIngredient: e.target.value })}
                  className="field"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">
                  Dosis Técnica Recomendada
                </label>
                <input
                  type="text"
                  value={draft.recommendedDose}
                  onChange={(e) => setDraft({ ...draft, recommendedDose: e.target.value })}
                  placeholder="ej. 0.4 cc/L"
                  className="field"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">
                  Capacidad de Caneca / Tanque (Litros)
                </label>
                <input
                  type="number"
                  step="50"
                  value={draft.tankVolumeLiters}
                  onChange={(e) => setDraft({ ...draft, tankVolumeLiters: parseFloat(e.target.value) || 200 })}
                  className="field"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between gap-3 rounded-control border border-forest-200 bg-forest-50 p-3.5 text-xs">
                  <span className="font-semibold text-forest-950">
                    Preparación Calculada para Mezcla:
                  </span>
                  <span className="text-right text-sm font-semibold tabular-nums text-forest-800">
                    {totalProductNeeded}
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-ink">
                  Recomendaciones Técnicas y Observaciones del Asesor
                </label>
                <textarea
                  rows={3}
                  value={draft.technicalNotes}
                  onChange={(e) => setDraft({ ...draft, technicalNotes: e.target.value })}
                  className="field"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="btn-secondary min-h-11 px-4"
          >
            <ArrowLeft className="w-4 h-4" /> Anterior
          </button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="btn-primary ml-auto min-h-11 px-5"
          >
            Siguiente <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="btn-primary ml-auto min-h-11 px-5"
          >
            <Save className="w-4 h-4" /> Guardar y Emitir Dictamen MIPE
          </button>
        )}
      </div>
    </div>
  );
};
