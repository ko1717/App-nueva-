package com.example.data.model

data class AvgustProductItem(
    val id: String,
    val tradeName: String,
    val category: String, // FUNGICIDA, INSECTICIDA, ACARICIDA, HERBICIDA, COADYUVANTE
    val activeIngredient: String,
    val formulation: String, // SC, EC, WG, SL, OD
    val chemicalGroup: String,
    val moaCode: String, // e.g. FRAC 3 + 11, IRAC 4A + 3A, HRAC 1
    val targetPests: List<String>,
    val targetCrops: List<String>,
    val standardDose: String,
    val reEntryPeriodHours: Int,
    val preHarvestIntervalDays: Int,
    val compatibilityTips: String,
    val keyFeatures: String
)
