package com.example.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "farm_lots")
data class FarmLotEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val farmName: String,
    val blockName: String,
    val lotName: String,
    val crop: String,
    val variety: String,
    val areaHectares: Double,
    val managerName: String,
    val contactPhone: String = "",
    val locationRegion: String = "",
    val lastAuditScore: Int = 85,
    val riskStatus: String = "VERDE", // VERDE, AMARILLO, ROJO
    val lastAuditDate: Long = System.currentTimeMillis()
)
