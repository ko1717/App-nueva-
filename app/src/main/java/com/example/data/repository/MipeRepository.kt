package com.example.data.repository

import com.example.data.local.MipeDao
import com.example.data.model.AvgustProductItem
import com.example.data.model.FarmLotEntity
import com.example.data.model.MipeAuditEntity
import com.example.data.model.MipePillarScores
import com.example.data.model.PestCatalogItem
import com.example.data.sample.SampleData
import kotlinx.coroutines.flow.Flow

class MipeRepository(private val mipeDao: MipeDao) {

    // Reactive streams from Room Database
    val allAudits: Flow<List<MipeAuditEntity>> = mipeDao.getAllAudits()
    val allLots: Flow<List<FarmLotEntity>> = mipeDao.getAllLots()

    // Static / Curated Agronomic Catalogs
    val avGustProducts: List<AvgustProductItem> = SampleData.initialAvgustProducts
    val pestCatalog: List<PestCatalogItem> = SampleData.initialPestCatalog

    fun getAuditByIdFlow(id: Long): Flow<MipeAuditEntity?> = mipeDao.getAuditByIdFlow(id)

    suspend fun getAuditById(id: Long): MipeAuditEntity? = mipeDao.getAuditById(id)

    suspend fun insertAudit(audit: MipeAuditEntity): Long {
        val id = mipeDao.insertAudit(audit)
        
        // Update corresponding Farm Lot risk status & last score
        val risk = when {
            audit.totalScore >= 88 -> "VERDE"
            audit.totalScore >= 70 -> "AMARILLO"
            else -> "ROJO"
        }
        mipeDao.updateLotStatusAfterAudit(
            farmName = audit.farmName,
            lotName = audit.lotName,
            score = audit.totalScore,
            riskStatus = risk,
            date = audit.auditDate
        )
        return id
    }

    suspend fun deleteAudit(id: Long) = mipeDao.deleteAuditById(id)

    suspend fun insertLot(lot: FarmLotEntity): Long = mipeDao.insertLot(lot)

    suspend fun deleteLot(id: Long) = mipeDao.deleteLotById(id)

    // Calculation helper for MIPE compliance pillars
    fun calculatePillarScores(
        incidencePercent: Double,
        severityPercent: Double,
        pestRiskLevel: String,
        nozzleConditionOk: Boolean,
        dropsPerCm2: Int,
        waterPh: Double,
        waterHardnessPpm: Int,
        walesSequenceCorrect: Boolean,
        hasAdjuvant: Boolean,
        sanitaryPruningDone: Boolean,
        weedManagementOk: Boolean,
        chromaticTrapsInstalled: Boolean,
        biologicalBeneficialsActive: Boolean,
        moaRotationCompliant: Boolean,
        ppeComplete: Boolean,
        tripleRinseDone: Boolean,
        calibrationLogUpdated: Boolean
    ): MipePillarScores {
        // 1. Monitoring Pillar (max 25)
        var monitoring = 25
        if (incidencePercent > 15.0) monitoring -= 10
        else if (incidencePercent > 5.0) monitoring -= 5

        if (severityPercent > 5.0) monitoring -= 6
        else if (severityPercent > 2.0) monitoring -= 3

        if (pestRiskLevel == "CRITICO") monitoring -= 6
        else if (pestRiskLevel == "MEDIO") monitoring -= 2
        monitoring = monitoring.coerceIn(5, 25)

        // 2. Application Quality Pillar (max 25)
        var app = 25
        if (!nozzleConditionOk) app -= 6
        if (dropsPerCm2 !in 45..85) app -= 5
        if (waterPh !in 5.5..6.8) app -= 4
        if (waterHardnessPpm > 180) app -= 3
        if (!walesSequenceCorrect) app -= 4
        if (!hasAdjuvant) app -= 3
        app = app.coerceIn(5, 25)

        // 3. Cultural & Biological Pillar (max 20)
        var cultural = 0
        if (sanitaryPruningDone) cultural += 5
        if (weedManagementOk) cultural += 5
        if (chromaticTrapsInstalled) cultural += 5
        if (biologicalBeneficialsActive) cultural += 5

        // 4. MOA & Resistance Pillar (max 15)
        val moa = if (moaRotationCompliant) 15 else 5

        // 5. BPA & Biosecurity Pillar (max 15)
        var bpa = 0
        if (ppeComplete) bpa += 5
        if (tripleRinseDone) bpa += 5
        if (calibrationLogUpdated) bpa += 5

        return MipePillarScores(
            pestMonitoringScore = monitoring,
            applicationQualityScore = app,
            culturalBiologicalScore = cultural,
            moaResistanceScore = moa,
            bpaSafetyScore = bpa
        )
    }
}
