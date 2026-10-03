export type AppScreen =
  | 'DASHBOARD'
  | 'NEW_AUDIT'
  | 'AUDIT_DETAIL'
  | 'SPRAY_CALCULATOR'
  | 'AVGUST_CATALOG'
  | 'PEST_CATALOG'
  | 'FARM_LOTS';

export interface MipePillarScores {
  pestMonitoringScore: number;      // 0 to 25 pts
  applicationQualityScore: number;  // 0 to 25 pts
  culturalBiologicalScore: number;  // 0 to 20 pts
  moaResistanceScore: number;       // 0 to 15 pts
  bpaSafetyScore: number;           // 0 to 15 pts
  totalScore: number;               // 0 to 100 pts
  verdict: 'APROBADO_EXCELENCIA' | 'CONFORME_OBSERVACIONES' | 'NO_CONFORME_RIESGO';
  verdictTitle: string;
}

export interface MipeAuditEntity {
  id: number;
  farmName: string;
  blockName: string;
  lotName: string;
  crop: string;
  phenologicalStage: string;
  auditDate: number;
  auditorName: string;
  farmResponsible: string;

  // Ambient / Weather Conditions
  temperatureCelsius: number;
  relativeHumidityPercent: number;
  windSpeedKmh: number;
  weatherCondition: string;

  // 1. Pest & Disease Monitoring
  targetProblemType: 'PLAGA' | 'ENFERMEDAD' | 'ARVENSE';
  targetProblemName: string;
  organEvaluated: string;
  sampleSize: number;
  infectedCount: number;
  incidencePercent: number;
  severityPercent: number;
  pestRiskLevel: 'BAJO' | 'MEDIO' | 'CRITICO';

  // 2. Application Quality
  nozzleType: string;
  nozzleConditionOk: boolean;
  sprayPressurePsi: number;
  targetVolumeLitersPerHa: number;
  dropsPerCm2: number;
  coverageQuality: 'OPTIMA' | 'ACEPTABLE' | 'BAJA' | 'DEFICIENTE' | 'EXCESIVA';
  waterPh: number;
  waterHardnessPpm: number;
  walesSequenceCorrect: boolean;
  adjuvantUsed: string;

  // 3. Cultural & Biological Control
  sanitaryPruningDone: boolean;
  weedManagementOk: boolean;
  chromaticTrapsInstalled: boolean;
  biologicalBeneficialsActive: boolean;

  // 4. MOA & Resistance Management
  moaRotationCompliant: boolean;
  currentMoaGroup: string;
  previousMoaGroup: string;

  // 5. BPA & Biosecurity
  ppeComplete: boolean;
  tripleRinseDone: boolean;
  calibrationLogUpdated: boolean;

  // Calculated Scores
  scoreMonitoring: number;
  scoreApplication: number;
  scoreCultural: number;
  scoreMoa: number;
  scoreBpa: number;
  totalScore: number;
  verdict: 'APROBADO_EXCELENCIA' | 'CONFORME_OBSERVACIONES' | 'NO_CONFORME_RIESGO';

  // Avgust Prescription & Agronomic Plan
  recommendedProduct: string;
  activeIngredient: string;
  recommendedDose: string;
  tankVolumeLiters: number;
  totalProductNeeded: string;
  daysToReentry: number;
  safetyPeriodDays: number;
  technicalNotes: string;
  nextInspectionDate?: number;
}

export interface FarmLotEntity {
  id: number;
  farmName: string;
  blockName: string;
  lotName: string;
  crop: string;
  variety: string;
  areaHectares: number;
  managerName: string;
  contactPhone?: string;
  locationRegion?: string;
  lastAuditScore: number;
  riskStatus: 'VERDE' | 'AMARILLO' | 'ROJO';
  lastAuditDate: number;
}

export interface AvgustProductItem {
  id: string;
  tradeName: string;
  category:
    | 'FUNGICIDA'
    | 'INSECTICIDA'
    | 'INSECTICIDA / ACARICIDA'
    | 'HERBICIDA'
    | 'COADYUVANTE'
    | 'TRATAMIENTO DE SEMILLAS'
    | 'ACONDICIONADOR / COADYUVANTE';
  activeIngredient: string;
  formulation: string;
  chemicalGroup: string;
  moaCode: string;
  targetPests: string[];
  targetCrops: string[];
  standardDose: string;
  reEntryPeriodHours: number;
  preHarvestIntervalDays: number;
  compatibilityTips: string;
  keyFeatures: string;
}

export interface PestCatalogItem {
  id: string;
  scientificName: string;
  commonName: string;
  category: 'PLAGA' | 'ENFERMEDAD' | 'ARVENSE';
  affectedCrops: string[];
  targetOrgans: string;
  symptoms: string;
  economicThreshold: string;
  optimalConditions: string;
  mipeCulturalStrategy: string;
  mipeBiologicalStrategy: string;
  recommendedAvgustSolution: string;
  recommendedMoaGroup: string;
}

export interface NewAuditDraft {
  // Step 1: General & Location
  farmName: string;
  blockName: string;
  lotName: string;
  crop: string;
  phenologicalStage: string;
  auditorName: string;
  farmResponsible: string;
  temperatureCelsius: number;
  relativeHumidityPercent: number;
  windSpeedKmh: number;
  weatherCondition: string;

  // Step 2: Pest & Disease Monitoring
  targetProblemType: 'PLAGA' | 'ENFERMEDAD' | 'ARVENSE';
  targetProblemName: string;
  organEvaluated: string;
  sampleSize: number;
  infectedCount: number;
  severityPercent: number;
  pestRiskLevel: 'BAJO' | 'MEDIO' | 'CRITICO';

  // Step 3: Spray Quality
  nozzleType: string;
  nozzleConditionOk: boolean;
  sprayPressurePsi: number;
  targetVolumeLitersPerHa: number;
  dropsPerCm2: number;
  waterPh: number;
  waterHardnessPpm: number;
  walesSequenceCorrect: boolean;
  adjuvantUsed: string;

  // Step 4: Cultural & BPA
  sanitaryPruningDone: boolean;
  weedManagementOk: boolean;
  chromaticTrapsInstalled: boolean;
  biologicalBeneficialsActive: boolean;
  moaRotationCompliant: boolean;
  currentMoaGroup: string;
  previousMoaGroup: string;
  ppeComplete: boolean;
  tripleRinseDone: boolean;
  calibrationLogUpdated: boolean;

  // Step 5: Avgust Solution
  recommendedProduct: string;
  activeIngredient: string;
  recommendedDose: string;
  tankVolumeLiters: number;
  technicalNotes: string;
}
