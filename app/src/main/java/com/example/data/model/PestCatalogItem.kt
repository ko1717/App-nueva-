package com.example.data.model

data class PestCatalogItem(
    val id: String,
    val scientificName: String,
    val commonName: String,
    val category: String, // PLAGA, ENFERMEDAD, ARVENSE
    val affectedCrops: List<String>,
    val targetOrgans: String,
    val symptoms: String,
    val economicThreshold: String,
    val optimalConditions: String,
    val mipeCulturalStrategy: String,
    val mipeBiologicalStrategy: String,
    val recommendedAvgustSolution: String,
    val recommendedMoaGroup: String
)
