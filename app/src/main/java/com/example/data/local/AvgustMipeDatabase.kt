package com.example.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.db.SupportSQLiteDatabase
import com.example.data.model.FarmLotEntity
import com.example.data.model.MipeAuditEntity
import com.example.data.sample.SampleData
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Database(
    entities = [
        MipeAuditEntity::class,
        FarmLotEntity::class
    ],
    version = 1,
    exportSchema = false
)
abstract class AvgustMipeDatabase : RoomDatabase() {

    abstract fun mipeDao(): MipeDao

    companion object {
        @Volatile
        private var INSTANCE: AvgustMipeDatabase? = null

        fun getDatabase(context: Context, scope: CoroutineScope = CoroutineScope(Dispatchers.IO)): AvgustMipeDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AvgustMipeDatabase::class.java,
                    "avgust_mipe_database.db"
                )
                .addCallback(object : RoomDatabase.Callback() {
                    override fun onCreate(db: SupportSQLiteDatabase) {
                        super.onCreate(db)
                        // Prepopulate database with initial lots and sample audits
                        scope.launch(Dispatchers.IO) {
                            val dao = getDatabase(context, scope).mipeDao()
                            dao.insertAllLots(SampleData.initialFarmLots)
                            dao.insertAllAudits(SampleData.initialAudits)
                        }
                    }
                })
                .fallbackToDestructiveMigration()
                .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
