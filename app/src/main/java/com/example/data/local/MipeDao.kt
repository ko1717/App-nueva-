package com.example.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.example.data.model.FarmLotEntity
import com.example.data.model.MipeAuditEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface MipeDao {

    // --- MIPE Audits ---
    @Query("SELECT * FROM mipe_audits ORDER BY auditDate DESC")
    fun getAllAudits(): Flow<List<MipeAuditEntity>>

    @Query("SELECT * FROM mipe_audits WHERE id = :auditId LIMIT 1")
    fun getAuditByIdFlow(auditId: Long): Flow<MipeAuditEntity?>

    @Query("SELECT * FROM mipe_audits WHERE id = :auditId LIMIT 1")
    suspend fun getAuditById(auditId: Long): MipeAuditEntity?

    @Query("SELECT * FROM mipe_audits WHERE farmName = :farmName ORDER BY auditDate DESC")
    fun getAuditsByFarm(farmName: String): Flow<List<MipeAuditEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAudit(audit: MipeAuditEntity): Long

    @Update
    suspend fun updateAudit(audit: MipeAuditEntity)

    @Query("DELETE FROM mipe_audits WHERE id = :auditId")
    suspend fun deleteAuditById(auditId: Long)

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun insertAllAudits(audits: List<MipeAuditEntity>)

    // --- Farm Lots ---
    @Query("SELECT * FROM farm_lots ORDER BY farmName ASC, lotName ASC")
    fun getAllLots(): Flow<List<FarmLotEntity>>

    @Query("SELECT * FROM farm_lots WHERE id = :lotId LIMIT 1")
    suspend fun getLotById(lotId: Long): FarmLotEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLot(lot: FarmLotEntity): Long

    @Update
    suspend fun updateLot(lot: FarmLotEntity)

    @Query("DELETE FROM farm_lots WHERE id = :lotId")
    suspend fun deleteLotById(lotId: Long)

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun insertAllLots(lots: List<FarmLotEntity>)

    @Query("UPDATE farm_lots SET lastAuditScore = :score, riskStatus = :riskStatus, lastAuditDate = :date WHERE farmName = :farmName AND lotName = :lotName")
    suspend fun updateLotStatusAfterAudit(farmName: String, lotName: String, score: Int, riskStatus: String, date: Long)
}
