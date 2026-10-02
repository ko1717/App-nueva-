package com.example

import com.example.data.model.MipePillarScores
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class ExampleUnitTest {

    @Test
    fun testPillarScoreCalculation_highCompliance() {
        val scores = MipePillarScores(
            pestMonitoringScore = 24,
            applicationQualityScore = 25,
            culturalBiologicalScore = 20,
            moaResistanceScore = 15,
            bpaSafetyScore = 15
        )
        assertEquals(99, scores.totalScore)
        assertEquals("APROBADO_EXCELENCIA", scores.verdict)
    }

    @Test
    fun testPillarScoreCalculation_criticalRisk() {
        val scores = MipePillarScores(
            pestMonitoringScore = 10,
            applicationQualityScore = 12,
            culturalBiologicalScore = 5,
            moaResistanceScore = 5,
            bpaSafetyScore = 5
        )
        assertEquals(37, scores.totalScore)
        assertEquals("NO_CONFORME_RIESGO", scores.verdict)
    }

    @Test
    fun testSprayNozzleFlowFormula() {
        // q (L/min) = (Q * v * d) / 60000
        val targetVolume = 400.0 // L/ha
        val speed = 5.0 // km/h
        val spacing = 50.0 // cm
        val flowPerNozzle = (targetVolume * speed * spacing) / 60000.0

        assertEquals(1.6666, flowPerNozzle, 0.001)
    }

    @Test
    fun testIncidenceCalculation() {
        val sampleSize = 100
        val infectedCount = 8
        val incidencePercent = (infectedCount.toDouble() / sampleSize.toDouble()) * 100.0
        assertEquals(8.0, incidencePercent, 0.001)
    }
}
