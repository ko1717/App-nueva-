package com.example.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "mipe_audits")
data class MipeAuditEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val farmName: String,
    val blockName: String,
    val lotName: String,
    val crop: String,
    val phenologicalStage: String,
    val auditDate: Long = System.currentTimeMillis(),
    val auditorName: String,
    val farmResponsible: String,
    
    // Ambient / Weather Conditions
    val temperatureCelsius: Double = 22.0,
    val relativeHumidityPercent: Int = 68,
    val windSpeedKmh: Double = 4.5,
    val weatherCondition: String = "Soleado con brisa leve", // Soleado, Nublado, Llovizna reciente

    // 1. Pest & Disease Monitoring
    val targetProblemType: String, // PLAGA, ENFERMEDAD, ARVENSE
    val targetProblemName: String, // e.g. "Thrips palmi", "Botrytis cinerea"
    val organEvaluated: String,    // e.g. "Botones florales", "Hojas basales", "Frutos"
    val sampleSize: Int = 100,     // e.g. 100 hojas / 50 plantas
    val infectedCount: Int = 8,
    val incidencePercent: Double = 8.0,
    val severityPercent: Double = 3.5,
    val pestRiskLevel: String = "MEDIO", // BAJO, MEDIO, CRITICO

    // 2. Application Quality
    val nozzleType: String = "Cono Hueco Cerámica TX-VK", // Cono hueco, Abanico plano, Aire inducido
    val nozzleConditionOk: Boolean = true,
    val sprayPressurePsi: Double = 45.0,
    val targetVolumeLitersPerHa: Double = 800.0,
    val dropsPerCm2: Int = 65,      // Standard hydrosensitive paper evaluation
    val coverageQuality: String = "OPTIMA", // OPTIMA (50-70), BAJA (<30), EXCESIVA (>100)
    val waterPh: Double = 6.2,
    val waterHardnessPpm: Int = 120,
    val walesSequenceCorrect: Boolean = true,
    val adjuvantUsed: String = "Avgust Star (0.5 cc/L)",

    // 3. Cultural & Biological Control
    val sanitaryPruningDone: Boolean = true,
    val weedManagementOk: Boolean = true,
    val chromaticTrapsInstalled: Boolean = true,
    val biologicalBeneficialsActive: Boolean = true, // e.g. Trichoderma, Chrysoperla, Phytoseiidae

    // 4. MOA & Resistance Management
    val moaRotationCompliant: Boolean = true,
    val currentMoaGroup: String = "FRAC 3 + 11 (Triazol + Estrobirulina)",
    val previousMoaGroup: String = "FRAC 9 (Anilinopirimidina)",

    // 5. BPA & Biosecurity
    val ppeComplete: Boolean = true,
    val tripleRinseDone: Boolean = true,
    val calibrationLogUpdated: Boolean = true,

    // Calculated Scores
    val scoreMonitoring: Int = 22,
    val scoreApplication: Int = 24,
    val scoreCultural: Int = 18,
    val scoreMoa: Int = 14,
    val scoreBpa: Int = 14,
    val totalScore: Int = 92,
    val verdict: String = "APROBADO_EXCELENCIA",

    // Avgust Prescription & Agronomic Plan
    val recommendedProduct: String = "Balerina SC",
    val activeIngredient: String = "Trifloxistrobin 375 g/L + Ciproconazol 160 g/L",
    val recommendedDose: String = "0.4 cc/L de agua",
    val tankVolumeLiters: Double = 200.0,
    val totalProductNeeded: String = "80 cc por caneca 200L",
    val daysToReentry: Int = 1,
    val safetyPeriodDays: Int = 7,
    val technicalNotes: String = "Aplicar a primeras horas de la mañana con Avgust Star. Asegurar calibración a 45 PSI para cobertura homogénea.",
    val nextInspectionDate: Long = System.currentTimeMillis() + (7L * 24 * 60 * 60 * 1000)
)
