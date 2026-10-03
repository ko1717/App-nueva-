import { MipeAuditEntity, MipePillarScores, NewAuditDraft } from '../types';

export function calculatePillarScores(params: {
  incidencePercent: number;
  severityPercent: number;
  pestRiskLevel: string;
  nozzleConditionOk: boolean;
  dropsPerCm2: number;
  waterPh: number;
  waterHardnessPpm: number;
  walesSequenceCorrect: boolean;
  hasAdjuvant: boolean;
  sanitaryPruningDone: boolean;
  weedManagementOk: boolean;
  chromaticTrapsInstalled: boolean;
  biologicalBeneficialsActive: boolean;
  moaRotationCompliant: boolean;
  ppeComplete: boolean;
  tripleRinseDone: boolean;
  calibrationLogUpdated: boolean;
}): MipePillarScores {
  // 1. Monitoring Pillar (max 25)
  let monitoring = 25;
  if (params.incidencePercent > 15.0) monitoring -= 10;
  else if (params.incidencePercent > 5.0) monitoring -= 5;

  if (params.severityPercent > 5.0) monitoring -= 6;
  else if (params.severityPercent > 2.0) monitoring -= 3;

  if (params.pestRiskLevel === 'CRITICO') monitoring -= 6;
  else if (params.pestRiskLevel === 'MEDIO') monitoring -= 2;
  monitoring = Math.max(5, Math.min(25, monitoring));

  // 2. Application Quality Pillar (max 25)
  let app = 25;
  if (!params.nozzleConditionOk) app -= 6;
  if (params.dropsPerCm2 < 45 || params.dropsPerCm2 > 85) app -= 5;
  if (params.waterPh < 5.5 || params.waterPh > 6.8) app -= 4;
  if (params.waterHardnessPpm > 180) app -= 3;
  if (!params.walesSequenceCorrect) app -= 4;
  if (!params.hasAdjuvant) app -= 3;
  app = Math.max(5, Math.min(25, app));

  // 3. Cultural & Biological Pillar (max 20)
  let cultural = 0;
  if (params.sanitaryPruningDone) cultural += 5;
  if (params.weedManagementOk) cultural += 5;
  if (params.chromaticTrapsInstalled) cultural += 5;
  if (params.biologicalBeneficialsActive) cultural += 5;

  // 4. MOA & Resistance Pillar (max 15)
  const moa = params.moaRotationCompliant ? 15 : 5;

  // 5. BPA & Biosecurity Pillar (max 15)
  let bpa = 0;
  if (params.ppeComplete) bpa += 5;
  if (params.tripleRinseDone) bpa += 5;
  if (params.calibrationLogUpdated) bpa += 5;

  const totalScore = Math.max(0, Math.min(100, monitoring + app + cultural + moa + bpa));

  let verdict: 'APROBADO_EXCELENCIA' | 'CONFORME_OBSERVACIONES' | 'NO_CONFORME_RIESGO';
  let verdictTitle: string;

  if (totalScore >= 88) {
    verdict = 'APROBADO_EXCELENCIA';
    verdictTitle = 'Aprobado con Excelencia';
  } else if (totalScore >= 70) {
    verdict = 'CONFORME_OBSERVACIONES';
    verdictTitle = 'Conforme con Observaciones';
  } else {
    verdict = 'NO_CONFORME_RIESGO';
    verdictTitle = 'No Conforme - Alerta Fitosanitaria';
  }

  return {
    pestMonitoringScore: monitoring,
    applicationQualityScore: app,
    culturalBiologicalScore: cultural,
    moaResistanceScore: moa,
    bpaSafetyScore: bpa,
    totalScore,
    verdict,
    verdictTitle
  };
}

export function calculateCoverageQuality(dropsPerCm2: number): 'OPTIMA' | 'ACEPTABLE' | 'BAJA' | 'EXCESIVA' {
  if (dropsPerCm2 >= 50 && dropsPerCm2 <= 80) return 'OPTIMA';
  if (dropsPerCm2 < 35) return 'BAJA';
  if (dropsPerCm2 >= 35 && dropsPerCm2 < 50) return 'ACEPTABLE';
  return 'EXCESIVA';
}

export function calculateProductNeededText(recommendedDose: string, tankVolumeLiters: number): string {
  const match = recommendedDose.match(/[\d.]+/);
  const doseNum = match ? parseFloat(match[0]) : 0.5;
  const total = doseNum * tankVolumeLiters;
  return `${total.toFixed(1)} cc / g por caneca de ${tankVolumeLiters.toFixed(0)} L`;
}

export function generateShareableReportText(audit: MipeAuditEntity): string {
  const dateFormatted = new Date(audit.auditDate).toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const verdictText =
    audit.verdict === 'APROBADO_EXCELENCIA'
      ? '✅ APROBADO CON EXCELENCIA'
      : audit.verdict === 'CONFORME_OBSERVACIONES'
      ? '⚠️ CONFORME CON OBSERVACIONES'
      : '❌ NO CONFORME - ALERTA FITOSANITARIA';

  return `═══════════════════════════════════════
   🌱 ACTA DE ASEGURAMIENTO MIPE - AVGUST
      Protección de Cultivos de Calidad
═══════════════════════════════════════
📋 Folio ID: MIPE-${String(audit.id).padStart(4, '0')}
📅 Fecha: ${dateFormatted}
🏢 Finca: ${audit.farmName}
📍 Bloque/Lote: ${audit.blockName} - ${audit.lotName}
🌾 Cultivo: ${audit.crop} (${audit.phenologicalStage})
👨‍🌾 Responsable Finca: ${audit.farmResponsible}
👨‍💼 Auditor Avgust: ${audit.auditorName}
───────────────────────────────────────
📊 RESULTADO Y CALIFICACIÓN GLOBAL
🎯 Puntaje MIPE: ${audit.totalScore} / 100 pts
🎖 Dictamen: ${verdictText}
───────────────────────────────────────
🔬 1. MONITOREO FITOSANITARIO
• Blanco: ${audit.targetProblemName} (${audit.targetProblemType})
• Órgano evaluado: ${audit.organEvaluated}
• Incidencia: ${audit.incidencePercent.toFixed(1)}% (${audit.infectedCount}/${audit.sampleSize} muestras)
• Severidad: ${audit.severityPercent.toFixed(1)}%
• Nivel de Riesgo: ${audit.pestRiskLevel}
───────────────────────────────────────
💧 2. CALIDAD DE APLICACIÓN
• Boquilla: ${audit.nozzleType} (Estado: ${audit.nozzleConditionOk ? 'OK' : 'Desgastada'})
• Presión: ${audit.sprayPressurePsi} PSI | Gasto: ${audit.targetVolumeLitersPerHa} L/ha
• Cobertura: ${audit.dropsPerCm2} gotas/cm² (${audit.coverageQuality})
• Calidad de agua: pH ${audit.waterPh} | Dureza ${audit.waterHardnessPpm} ppm
• Coadyuvante: ${audit.adjuvantUsed}
───────────────────────────────────────
🌿 3. MANEJO CULTURAL, BIOLÓGICO Y BPA
• Poda fitosanitaria: ${audit.sanitaryPruningDone ? 'Cumple' : 'Pendiente'}
• Control biológico/Trampas: ${audit.biologicalBeneficialsActive ? 'Activo' : 'No implementado'}
• Rotación MOA (FRAC/IRAC): ${audit.moaRotationCompliant ? `Cumple con grupo ${audit.currentMoaGroup}` : 'Riesgo de resistencia'}
• EPP y Triple Lavado: ${audit.ppeComplete && audit.tripleRinseDone ? 'Cumple' : 'Incompleto'}
───────────────────────────────────────
🧪 4. PRESCRIPCIÓN & SOLUCIÓN TÉCNICA AVGUST
• Producto: ${audit.recommendedProduct}
• I.A.: ${audit.activeIngredient}
• Dosis recomendada: ${audit.recommendedDose}
• Preparación: ${audit.totalProductNeeded}
• Periodo de Reingreso: ${audit.daysToReentry} día(s)
• Notas Técnicas: ${audit.technicalNotes}
═══════════════════════════════════════
Avgust Crop Protection - Creciendo Juntos con Calidad`;
}
