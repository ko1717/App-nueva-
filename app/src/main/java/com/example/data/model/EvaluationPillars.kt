package com.example.data.model

data class MipePillarScores(
    val pestMonitoringScore: Int,      // 0 to 25 pts (Incidencia, severidad y umbrales)
    val applicationQualityScore: Int,  // 0 to 25 pts (Boquillas, presión, cobertura, agua, mezcla)
    val culturalBiologicalScore: Int,  // 0 to 20 pts (Poda sanitaria, arvenses, benéficos, trampas)
    val moaResistanceScore: Int,       // 0 to 15 pts (Rotación FRAC/IRAC/HRAC, ingredientes activos)
    val bpaSafetyScore: Int            // 0 to 15 pts (EPP, triple lavado, calibración, registros)
) {
    val totalScore: Int
        get() = (pestMonitoringScore + applicationQualityScore + culturalBiologicalScore + moaResistanceScore + bpaSafetyScore).coerceIn(0, 100)

    val verdict: String
        get() = when {
            totalScore >= 88 -> "APROBADO_EXCELENCIA"
            totalScore >= 70 -> "CONFORME_OBSERVACIONES"
            else -> "NO_CONFORME_RIESGO"
        }

    val verdictTitle: String
        get() = when {
            totalScore >= 88 -> "Aprobado con Excelencia"
            totalScore >= 70 -> "Conforme con Observaciones"
            else -> "No Conforme - Alerta Fitosanitaria"
        }
}
