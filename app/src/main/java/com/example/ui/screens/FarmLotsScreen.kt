package com.example.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.model.FarmLotEntity
import com.example.ui.theme.AvgustGreenPrimary
import com.example.ui.theme.VerdictCritical
import com.example.ui.theme.VerdictExcellent
import com.example.ui.theme.VerdictWarning
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.MipeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FarmLotsScreen(
    viewModel: MipeViewModel,
    modifier: Modifier = Modifier
) {
    val lots by viewModel.allLots.collectAsStateWithLifecycle()
    var showAddDialog by remember { mutableStateOf(false) }

    BackHandler {
        viewModel.popBackStack()
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text("Gestión de Fincas y Lotes", fontWeight = FontWeight.Bold)
                },
                navigationIcon = {
                    IconButton(onClick = { viewModel.popBackStack() }) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Volver"
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showAddDialog = true },
                containerColor = AvgustGreenPrimary,
                modifier = Modifier.testTag("add_lot_fab")
            ) {
                Icon(imageVector = Icons.Default.Add, contentDescription = "Agregar Lote", tint = androidx.compose.ui.graphics.Color.White)
            }
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = modifier
                .fillMaxSize()
                .padding(innerPadding)
                .testTag("farm_lots_screen"),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            item {
                Text(
                    text = "Monitoreo Territorial MIPE (${lots.size} Lotes Registrados)",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            items(lots, key = { it.id }) { lot ->
                FarmLotCard(
                    lot = lot,
                    onStartAudit = {
                        viewModel.resetDraft()
                        viewModel.updateDraft {
                            it.copy(
                                farmName = lot.farmName,
                                blockName = lot.blockName,
                                lotName = lot.lotName,
                                crop = lot.crop,
                                farmResponsible = lot.managerName
                            )
                        }
                        viewModel.navigateTo(AppScreen.NEW_AUDIT)
                    }
                )
            }
        }
    }

    if (showAddDialog) {
        var farmName by remember { mutableStateOf("") }
        var blockName by remember { mutableStateOf("") }
        var lotName by remember { mutableStateOf("") }
        var crop by remember { mutableStateOf("Rosa (Corte Exportación)") }
        var variety by remember { mutableStateOf("") }
        var areaHa by remember { mutableStateOf("2.0") }
        var managerName by remember { mutableStateOf("") }
        var region by remember { mutableStateOf("Sabana de Bogotá") }

        AlertDialog(
            onDismissRequest = { showAddDialog = false },
            title = { Text("Registrar Nueva Finca / Lote", fontWeight = FontWeight.Bold) },
            text = {
                LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    item {
                        OutlinedTextField(
                            value = farmName,
                            onValueChange = { farmName = it },
                            label = { Text("Nombre Finca / Hacienda") },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                    item {
                        OutlinedTextField(
                            value = blockName,
                            onValueChange = { blockName = it },
                            label = { Text("Bloque / Nave") },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                    item {
                        OutlinedTextField(
                            value = lotName,
                            onValueChange = { lotName = it },
                            label = { Text("Lote / Cama") },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                    item {
                        OutlinedTextField(
                            value = crop,
                            onValueChange = { crop = it },
                            label = { Text("Cultivo (ej: Rosa, Café, Aguacate)") },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                    item {
                        OutlinedTextField(
                            value = variety,
                            onValueChange = { variety = it },
                            label = { Text("Variedad") },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                    item {
                        OutlinedTextField(
                            value = areaHa,
                            onValueChange = { areaHa = it },
                            label = { Text("Área (Hectáreas)") },
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                    item {
                        OutlinedTextField(
                            value = managerName,
                            onValueChange = { managerName = it },
                            label = { Text("Responsable Técnico de Campo") },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                    item {
                        OutlinedTextField(
                            value = region,
                            onValueChange = { region = it },
                            label = { Text("Ubicación / Región") },
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (farmName.isNotBlank() && lotName.isNotBlank()) {
                            viewModel.addNewLot(
                                farmName = farmName,
                                blockName = blockName.ifBlank { "Bloque 01" },
                                lotName = lotName,
                                crop = crop,
                                variety = variety.ifBlank { "Estándar" },
                                areaHectares = areaHa.toDoubleOrNull() ?: 1.0,
                                managerName = managerName.ifBlank { "Responsable de Campo" },
                                region = region
                            )
                            showAddDialog = false
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = AvgustGreenPrimary)
                ) {
                    Text("Guardar Lote")
                }
            },
            dismissButton = {
                TextButton(onClick = { showAddDialog = false }) {
                    Text("Cancelar")
                }
            }
        )
    }
}

@Composable
fun FarmLotCard(
    lot: FarmLotEntity,
    onStartAudit: () -> Unit
) {
    val statusColor = when (lot.riskStatus) {
        "VERDE" -> VerdictExcellent
        "AMARILLO" -> VerdictWarning
        else -> VerdictCritical
    }

    val statusText = when (lot.riskStatus) {
        "VERDE" -> "Control Óptimo"
        "AMARILLO" -> "En Monitoreo"
        else -> "Alerta Crítica"
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .testTag("farm_lot_card_${lot.id}"),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.weight(1f)) {
                    Box(
                        modifier = Modifier
                            .size(10.dp)
                            .clip(CircleShape)
                            .background(statusColor)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = lot.farmName,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }

                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = statusColor.copy(alpha = 0.15f)
                ) {
                    Text(
                        text = statusText,
                        color = statusColor,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = "${lot.blockName} • ${lot.lotName}",
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            Text(
                text = "Cultivo: ${lot.crop} (${lot.variety}) • ${lot.areaHectares} ha",
                fontSize = 12.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            Text(
                text = "Responsable: ${lot.managerName} • Región: ${lot.locationRegion}",
                fontSize = 11.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            Spacer(modifier = Modifier.height(10.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Último Score: ${lot.lastAuditScore}/100",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = statusColor
                )

                Button(
                    onClick = onStartAudit,
                    colors = ButtonDefaults.buttonColors(containerColor = AvgustGreenPrimary)
                ) {
                    Text("Auditar Lote", fontSize = 12.sp)
                }
            }
        }
    }
}
