package com.example.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.local.AvgustMipeDatabase
import com.example.data.model.AvgustProductItem
import com.example.data.model.FarmLotEntity
import com.example.data.model.MipeAuditEntity
import com.example.data.model.MipePillarScores
import com.example.data.model.PestCatalogItem
import com.example.data.repository.MipeRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

enum class AppScreen {
    DASHBOARD,
    NEW_AUDIT,
    AUDIT_DETAIL,
    SPRAY_CALCULATOR,
    AVGUST_CATALOG,
    PEST_CATALOG,
    FARM_LOTS
}

data class NewAuditDraft(
    // Step 1: General & Location
    val farmName: String = "Flores del Sol - Sede Sabana",
    val blockName: String = "Bloque B-04 (Variedad Freedom)",
    val lotName: String = "Lote 12 - Exportación",
    val crop: String = "Rosa (Corte Exportación)",
    val phenologicalStage: String = "Botón Floral y Corte",
    val auditorName: String = "Ing. Agrónomo Avgust",
    val farmResponsible: String = "Ing. Carlos Mendoza",
    val temperatureCelsius: Double = 21.0,
    val relativeHumidityPercent: Int = 65,
    val windSpeedKmh: Double = 4.0,
    val weatherCondition: String = "Soleado con brisa leve",

    // Step 2: Pest & Disease Monitoring
    val targetProblemType: String = "ENFERMEDAD",
    val targetProblemName: String = "Botrytis cinerea (Moho gris)",
    val organEvaluated: String = "Botones florales y cálices",
    val sampleSize: Int = 100,
    val infectedCount: Int = 4,
    val severityPercent: Double = 2.0,
    val pestRiskLevel: String = "BAJO",

    // Step 3: Spray Quality
    val nozzleType: String = "Cono Hueco Cerámica TX-VK",
    val nozzleConditionOk: Boolean = true,
    val sprayPressurePsi: Double = 45.0,
    val targetVolumeLitersPerHa: Double = 800.0,
    val dropsPerCm2: Int = 65,
    val waterPh: Double = 6.0,
    val waterHardnessPpm: Int = 110,
    val walesSequenceCorrect: Boolean = true,
    val adjuvantUsed: String = "Avgust Star (0.5 cc/L)",

    // Step 4: Cultural & BPA
    val sanitaryPruningDone: Boolean = true,
    val weedManagementOk: Boolean = true,
    val chromaticTrapsInstalled: Boolean = true,
    val biologicalBeneficialsActive: Boolean = true,
    val moaRotationCompliant: Boolean = true,
    val currentMoaGroup: String = "FRAC 11 + 3 (Balerina SC)",
    val previousMoaGroup: String = "FRAC 9 (Pirimetanil)",
    val ppeComplete: Boolean = true,
    val tripleRinseDone: Boolean = true,
    val calibrationLogUpdated: Boolean = true,

    // Step 5: Avgust Solution
    val recommendedProduct: String = "Balerina SC",
    val activeIngredient: String = "Trifloxistrobin 375 g/L + Ciproconazol 160 g/L",
    val recommendedDose: String = "0.4 cc/L",
    val tankVolumeLiters: Double = 200.0,
    val technicalNotes: String = "Mantener monitoreo semanal de incidencia y asegurar adición de Avgust Star al final de la mezcla."
) {
    val incidencePercent: Double
        get() = if (sampleSize > 0) (infectedCount.toDouble() / sampleSize.toDouble()) * 100.0 else 0.0

    val calculatedDropsQuality: String
        get() = when {
            dropsPerCm2 in 50..80 -> "OPTIMA"
            dropsPerCm2 < 35 -> "DEFICIENTE"
            dropsPerCm2 in 35..49 -> "ACEPTABLE"
            else -> "EXCESIVA"
        }

    val totalProductNeededText: String
        get() {
            val doseNum = recommendedDose.filter { it.isDigit() || it == '.' }.toDoubleOrNull() ?: 0.5
            val totalCc = doseNum * tankVolumeLiters
            return "%.1f cc / g por caneca de %.0f L".format(totalCc, tankVolumeLiters)
        }
}

class MipeViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: MipeRepository

    init {
        val database = AvgustMipeDatabase.getDatabase(application, viewModelScope)
        repository = MipeRepository(database.mipeDao())
    }

    // Navigation State
    private val _currentScreen = MutableStateFlow(AppScreen.DASHBOARD)
    val currentScreen: StateFlow<AppScreen> = _currentScreen.asStateFlow()

    private val _navigationStack = MutableStateFlow<List<AppScreen>>(listOf(AppScreen.DASHBOARD))

    // Selected Audit for detail view
    private val _selectedAuditId = MutableStateFlow<Long?>(null)
    val selectedAuditId: StateFlow<Long?> = _selectedAuditId.asStateFlow()

    val selectedAudit: StateFlow<MipeAuditEntity?> = _selectedAuditId
        .combine(repository.allAudits) { id, audits ->
            if (id == null) audits.firstOrNull() else audits.find { it.id == id }
        }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)

    // Data Streams
    val allAudits: StateFlow<List<MipeAuditEntity>> = repository.allAudits
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val allLots: StateFlow<List<FarmLotEntity>> = repository.allLots
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val avgustProducts: List<AvgustProductItem> = repository.avGustProducts
    val pestCatalog: List<PestCatalogItem> = repository.pestCatalog

    // Search and Filter State for Audits
    val auditSearchQuery = MutableStateFlow("")
    val auditCropFilter = MutableStateFlow("TODOS")

    // Filtered Audits
    val filteredAudits: StateFlow<List<MipeAuditEntity>> = combine(
        allAudits,
        auditSearchQuery,
        auditCropFilter
    ) { list, query, crop ->
        list.filter { audit ->
            val matchesQuery = query.isBlank() ||
                    audit.farmName.contains(query, ignoreCase = true) ||
                    audit.lotName.contains(query, ignoreCase = true) ||
                    audit.targetProblemName.contains(query, ignoreCase = true) ||
                    audit.crop.contains(query, ignoreCase = true)
            val matchesCrop = crop == "TODOS" || audit.crop.contains(crop, ignoreCase = true)
            matchesQuery && matchesCrop
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    // Product search in catalog
    val productSearchQuery = MutableStateFlow("")
    val productCategoryFilter = MutableStateFlow("TODOS")

    val filteredProducts: StateFlow<List<AvgustProductItem>> = combine(
        productSearchQuery,
        productCategoryFilter
    ) { query, cat ->
        avgustProducts.filter { prod ->
            val matchesQuery = query.isBlank() ||
                    prod.tradeName.contains(query, ignoreCase = true) ||
                    prod.activeIngredient.contains(query, ignoreCase = true) ||
                    prod.moaCode.contains(query, ignoreCase = true) ||
                    prod.targetPests.any { it.contains(query, ignoreCase = true) } ||
                    prod.targetCrops.any { it.contains(query, ignoreCase = true) }
            val matchesCat = cat == "TODOS" || prod.category.contains(cat, ignoreCase = true)
            matchesQuery && matchesCat
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), avgustProducts)

    // Pest search
    val pestSearchQuery = MutableStateFlow("")
    val pestCategoryFilter = MutableStateFlow("TODOS")

    val filteredPests: StateFlow<List<PestCatalogItem>> = combine(
        pestSearchQuery,
        pestCategoryFilter
    ) { query, cat ->
        pestCatalog.filter { pest ->
            val matchesQuery = query.isBlank() ||
                    pest.scientificName.contains(query, ignoreCase = true) ||
                    pest.commonName.contains(query, ignoreCase = true) ||
                    pest.affectedCrops.any { it.contains(query, ignoreCase = true) } ||
                    pest.recommendedAvgustSolution.contains(query, ignoreCase = true)
            val matchesCat = cat == "TODOS" || pest.category.contains(cat, ignoreCase = true)
            matchesQuery && matchesCat
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), pestCatalog)

    // --- New Audit Wizard Draft State ---
    private val _newAuditDraft = MutableStateFlow(NewAuditDraft())
    val newAuditDraft: StateFlow<NewAuditDraft> = _newAuditDraft.asStateFlow()

    private val _newAuditStep = MutableStateFlow(1) // 1 to 5
    val newAuditStep: StateFlow<Int> = _newAuditStep.asStateFlow()

    fun updateDraft(updater: (NewAuditDraft) -> NewAuditDraft) {
        _newAuditDraft.value = updater(_newAuditDraft.value)
    }

    fun setAuditStep(step: Int) {
        _newAuditStep.value = step.coerceIn(1, 5)
    }

    fun nextAuditStep() {
        if (_newAuditStep.value < 5) {
            _newAuditStep.value += 1
        }
    }

    fun prevAuditStep() {
        if (_newAuditStep.value > 1) {
            _newAuditStep.value -= 1
        }
    }

    fun resetDraft() {
        _newAuditDraft.value = NewAuditDraft()
        _newAuditStep.value = 1
    }

    fun calculatePillarsForDraft(): MipePillarScores {
        val draft = _newAuditDraft.value
        return repository.calculatePillarScores(
            incidencePercent = draft.incidencePercent,
            severityPercent = draft.severityPercent,
            pestRiskLevel = draft.pestRiskLevel,
            nozzleConditionOk = draft.nozzleConditionOk,
            dropsPerCm2 = draft.dropsPerCm2,
            waterPh = draft.waterPh,
            waterHardnessPpm = draft.waterHardnessPpm,
            walesSequenceCorrect = draft.walesSequenceCorrect,
            hasAdjuvant = draft.adjuvantUsed.isNotBlank() && !draft.adjuvantUsed.contains("Sin", ignoreCase = true),
            sanitaryPruningDone = draft.sanitaryPruningDone,
            weedManagementOk = draft.weedManagementOk,
            chromaticTrapsInstalled = draft.chromaticTrapsInstalled,
            biologicalBeneficialsActive = draft.biologicalBeneficialsActive,
            moaRotationCompliant = draft.moaRotationCompliant,
            ppeComplete = draft.ppeComplete,
            tripleRinseDone = draft.tripleRinseDone,
            calibrationLogUpdated = draft.calibrationLogUpdated
        )
    }

    fun saveDraftAudit(onComplete: (Long) -> Unit) {
        viewModelScope.launch {
            val draft = _newAuditDraft.value
            val scores = calculatePillarsForDraft()

            val auditEntity = MipeAuditEntity(
                farmName = draft.farmName,
                blockName = draft.blockName,
                lotName = draft.lotName,
                crop = draft.crop,
                phenologicalStage = draft.phenologicalStage,
                auditDate = System.currentTimeMillis(),
                auditorName = draft.auditorName,
                farmResponsible = draft.farmResponsible,
                temperatureCelsius = draft.temperatureCelsius,
                relativeHumidityPercent = draft.relativeHumidityPercent,
                windSpeedKmh = draft.windSpeedKmh,
                weatherCondition = draft.weatherCondition,
                targetProblemType = draft.targetProblemType,
                targetProblemName = draft.targetProblemName,
                organEvaluated = draft.organEvaluated,
                sampleSize = draft.sampleSize,
                infectedCount = draft.infectedCount,
                incidencePercent = draft.incidencePercent,
                severityPercent = draft.severityPercent,
                pestRiskLevel = draft.pestRiskLevel,
                nozzleType = draft.nozzleType,
                nozzleConditionOk = draft.nozzleConditionOk,
                sprayPressurePsi = draft.sprayPressurePsi,
                targetVolumeLitersPerHa = draft.targetVolumeLitersPerHa,
                dropsPerCm2 = draft.dropsPerCm2,
                coverageQuality = draft.calculatedDropsQuality,
                waterPh = draft.waterPh,
                waterHardnessPpm = draft.waterHardnessPpm,
                walesSequenceCorrect = draft.walesSequenceCorrect,
                adjuvantUsed = draft.adjuvantUsed,
                sanitaryPruningDone = draft.sanitaryPruningDone,
                weedManagementOk = draft.weedManagementOk,
                chromaticTrapsInstalled = draft.chromaticTrapsInstalled,
                biologicalBeneficialsActive = draft.biologicalBeneficialsActive,
                moaRotationCompliant = draft.moaRotationCompliant,
                currentMoaGroup = draft.currentMoaGroup,
                previousMoaGroup = draft.previousMoaGroup,
                ppeComplete = draft.ppeComplete,
                tripleRinseDone = draft.tripleRinseDone,
                calibrationLogUpdated = draft.calibrationLogUpdated,
                scoreMonitoring = scores.pestMonitoringScore,
                scoreApplication = scores.applicationQualityScore,
                scoreCultural = scores.culturalBiologicalScore,
                scoreMoa = scores.moaResistanceScore,
                scoreBpa = scores.bpaSafetyScore,
                totalScore = scores.totalScore,
                verdict = scores.verdict,
                recommendedProduct = draft.recommendedProduct,
                activeIngredient = draft.activeIngredient,
                recommendedDose = draft.recommendedDose,
                tankVolumeLiters = draft.tankVolumeLiters,
                totalProductNeeded = draft.totalProductNeededText,
                daysToReentry = 1,
                safetyPeriodDays = 7,
                technicalNotes = draft.technicalNotes
            )

            val newId = repository.insertAudit(auditEntity)
            _selectedAuditId.value = newId
            resetDraft()
            navigateTo(AppScreen.AUDIT_DETAIL)
            onComplete(newId)
        }
    }

    fun deleteAudit(auditId: Long) {
        viewModelScope.launch {
            repository.deleteAudit(auditId)
            if (_selectedAuditId.value == auditId) {
                _selectedAuditId.value = null
                navigateTo(AppScreen.DASHBOARD)
            }
        }
    }

    // Navigation methods
    fun navigateTo(screen: AppScreen) {
        _currentScreen.value = screen
        val currentStack = _navigationStack.value.toMutableList()
        if (currentStack.lastOrNull() != screen) {
            currentStack.add(screen)
            _navigationStack.value = currentStack
        }
    }

    fun selectAuditAndNavigate(auditId: Long) {
        _selectedAuditId.value = auditId
        navigateTo(AppScreen.AUDIT_DETAIL)
    }

    fun popBackStack(): Boolean {
        val currentStack = _navigationStack.value.toMutableList()
        return if (currentStack.size > 1) {
            currentStack.removeAt(currentStack.lastIndex)
            _navigationStack.value = currentStack
            _currentScreen.value = currentStack.last()
            true
        } else {
            false
        }
    }

    // Add New Lot
    fun addNewLot(
        farmName: String,
        blockName: String,
        lotName: String,
        crop: String,
        variety: String,
        areaHectares: Double,
        managerName: String,
        region: String
    ) {
        viewModelScope.launch {
            val newLot = FarmLotEntity(
                farmName = farmName,
                blockName = blockName,
                lotName = lotName,
                crop = crop,
                variety = variety,
                areaHectares = areaHectares,
                managerName = managerName,
                locationRegion = region,
                lastAuditScore = 100,
                riskStatus = "VERDE"
            )
            repository.insertLot(newLot)
        }
    }

    // Spray Calibration Calculator State
    val calcSpeedKmh = MutableStateFlow("5.0")
    val calcNozzleSpacingCm = MutableStateFlow("50.0")
    val calcTargetVolumeLha = MutableStateFlow("400.0")
    val calcTankCapacityL = MutableStateFlow("200.0")
    val calcDosePerLiterCc = MutableStateFlow("0.5")
    val calcAdjuvantPerLiterCc = MutableStateFlow("0.5")

    // Formats formal technical report for sharing
    fun generateShareableReportText(audit: MipeAuditEntity): String {
        return buildString {
            appendLine("═══════════════════════════════════════")
            appendLine("   🌱 ACTA DE ASEGURAMIENTO MIPE - AVGUST")
            appendLine("      Protección de Cultivos de Calidad")
            appendLine("═══════════════════════════════════════")
            appendLine("📋 Folio ID: MIPE-${audit.id.toString().padStart(4, '0')}")
            appendLine("📅 Fecha: ${java.text.SimpleDateFormat("dd/MM/yyyy HH:mm", java.util.Locale.getDefault()).format(java.util.Date(audit.auditDate))}")
            appendLine("🏢 Finca: ${audit.farmName}")
            appendLine("📍 Bloque/Lote: ${audit.blockName} - ${audit.lotName}")
            appendLine("🌾 Cultivo: ${audit.crop} (${audit.phenologicalStage})")
            appendLine("👨‍🌾 Responsable Finca: ${audit.farmResponsible}")
            appendLine("👨‍💼 Auditor Avgust: ${audit.auditorName}")
            appendLine("───────────────────────────────────────")
            appendLine("📊 RESULTADO Y CALIFICACIÓN GLOBAL")
            appendLine("🎯 Puntaje MIPE: ${audit.totalScore} / 100 pts")
            appendLine("🎖 Dictamen: ${when(audit.verdict) {
                "APROBADO_EXCELENCIA" -> "✅ APROBADO CON EXCELENCIA"
                "CONFORME_OBSERVACIONES" -> "⚠️ CONFORME CON OBSERVACIONES"
                else -> "❌ NO CONFORME - ALERTA FITOSANITARIA"
            }}")
            appendLine("───────────────────────────────────────")
            appendLine("🔬 1. MONITOREO FITOSANITARIO")
            appendLine("• Blanco: ${audit.targetProblemName} (${audit.targetProblemType})")
            appendLine("• Órgano evaluado: ${audit.organEvaluated}")
            appendLine("• Incidencia: ${"%.1f".format(audit.incidencePercent)}% (${audit.infectedCount}/${audit.sampleSize} muestras)")
            appendLine("• Severidad: ${"%.1f".format(audit.severityPercent)}%")
            appendLine("• Nivel de Riesgo: ${audit.pestRiskLevel}")
            appendLine("───────────────────────────────────────")
            appendLine("💧 2. CALIDAD DE APLICACIÓN")
            appendLine("• Boquilla: ${audit.nozzleType} (Estado: ${if(audit.nozzleConditionOk) "OK" else "Desgastada"})")
            appendLine("• Presión: ${audit.sprayPressurePsi} PSI | Gasto: ${audit.targetVolumeLitersPerHa} L/ha")
            appendLine("• Cobertura: ${audit.dropsPerCm2} gotas/cm² (${audit.coverageQuality})")
            appendLine("• Calidad de agua: pH ${audit.waterPh} | Dureza ${audit.waterHardnessPpm} ppm")
            appendLine("• Coadyuvante: ${audit.adjuvantUsed}")
            appendLine("───────────────────────────────────────")
            appendLine("🌿 3. MANEJO CULTURAL, BIOLÓGICO Y BPA")
            appendLine("• Poda fitosanitaria: ${if(audit.sanitaryPruningDone) "Cumple" else "Pendiente"}")
            appendLine("• Control biológico/Trampas: ${if(audit.biologicalBeneficialsActive) "Activo" else "No implementado"}")
            appendLine("• Rotación MOA (FRAC/IRAC): ${if(audit.moaRotationCompliant) "Cumple con grupo ${audit.currentMoaGroup}" else "Riesgo de resistencia"}")
            appendLine("• EPP y Triple Lavado: ${if(audit.ppeComplete && audit.tripleRinseDone) "Cumple" else "Incompleto"}")
            appendLine("───────────────────────────────────────")
            appendLine("🧪 4. PRESCRIPCIÓN & SOLUCIÓN TÉCNICA AVGUST")
            appendLine("• Producto: ${audit.recommendedProduct}")
            appendLine("• I.A.: ${audit.activeIngredient}")
            appendLine("• Dosis recomendada: ${audit.recommendedDose}")
            appendLine("• Preparación: ${audit.totalProductNeeded}")
            appendLine("• Periodo de Reingreso: ${audit.daysToReentry} día(s)")
            appendLine("• Notas Técnicas: ${audit.technicalNotes}")
            appendLine("═══════════════════════════════════════")
            appendLine("Avgust Crop Protection - Creciendo Juntos con Calidad")
        }
    }
}
