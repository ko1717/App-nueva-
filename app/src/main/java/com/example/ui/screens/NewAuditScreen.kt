package com.example.ui.screens

import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.AddAlert
import androidx.compose.material.icons.filled.Assessment
import androidx.compose.material.icons.filled.BugReport
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.Opacity
import androidx.compose.material.icons.filled.Save
import androidx.compose.material.icons.filled.Science
import androidx.compose.material.icons.filled.WaterDrop
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Slider
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.ui.components.AuditScoreCard
import com.example.ui.components.HydrosensitiveCardPreview
import com.example.ui.theme.AvgustGoldPrimary
import com.example.ui.theme.AvgustGreenDark
import com.example.ui.theme.AvgustGreenPrimary
import com.example.ui.theme.VerdictCritical
import com.example.ui.theme.VerdictExcellent
import com.example.ui.theme.VerdictWarning
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.MipeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NewAuditScreen(
    viewModel: MipeViewModel,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val currentStep by viewModel.newAuditStep.collectAsStateWithLifecycle()
    val draft by viewModel.newAuditDraft.collectAsStateWithLifecycle()
    val lots by viewModel.allLots.collectAsStateWithLifecycle()
    val pestCatalog = viewModel.pestCatalog
    val avgustProducts = viewModel.avgustProducts

    BackHandler {
        if (currentStep > 1) {
            viewModel.prevAuditStep()
        } else {
            viewModel.popBackStack()
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "Aseguramiento MIPE",
                            fontSize = 17.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Paso $currentStep de 5: ${getStepTitle(currentStep)}",
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                navigationIcon = {
                    IconButton(
                        onClick = {
                            if (currentStep > 1) viewModel.prevAuditStep() else viewModel.popBackStack()
                        },
                        modifier = Modifier.testTag("audit_wizard_back_button")
                    ) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Atrás"
                        )
                    }
                },
                actions = {
                    IconButton(
                        onClick = { viewModel.navigateTo(AppScreen.DASHBOARD) }
                    ) {
                        Icon(imageVector = Icons.Default.Close, contentDescription = "Cancelar")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        },
        bottomBar = {
            Surface(
                modifier = Modifier.fillMaxWidth(),
                tonalElevation = 8.dp,
                shadowElevation = 8.dp
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    if (currentStep > 1) {
                        OutlinedButton(
                            onClick = { viewModel.prevAuditStep() },
                            modifier = Modifier
                                .weight(1f)
                                .testTag("wizard_prev_button")
                        ) {
                            Icon(
                                imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                                contentDescription = null,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text("Anterior")
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                    }

                    if (currentStep < 5) {
                        Button(
                            onClick = { viewModel.nextAuditStep() },
                            colors = ButtonDefaults.buttonColors(containerColor = AvgustGreenPrimary),
                            modifier = Modifier
                                .weight(if (currentStep > 1) 1f else 2f)
                                .testTag("wizard_next_button")
                        ) {
                            Text("Siguiente")
                            Spacer(modifier = Modifier.width(6.dp))
                            Icon(
                                imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                                contentDescription = null,
                                modifier = Modifier.size(16.dp)
                            )
                        }
                    } else {
                        Button(
                            onClick = {
                                viewModel.saveDraftAudit { auditId ->
                                    Toast.makeText(
                                        context,
                                        "Acta de Aseguramiento MIPE #$auditId guardada con éxito",
                                        Toast.LENGTH_LONG
                                    ).show()
                                }
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = AvgustGreenPrimary),
                            modifier = Modifier
                                .weight(1f)
                                .testTag("wizard_submit_audit_button")
                        ) {
                            Icon(
                                imageVector = Icons.Default.CheckCircle,
                                contentDescription = null,
                                modifier = Modifier.size(18.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("Emitir Acta MIPE", fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 16.dp)
                .testTag("new_audit_form_step_$currentStep"),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Step Progress Indicator Bar
            item {
                StepIndicatorRow(currentStep = currentStep)
            }

            when (currentStep) {
                1 -> {
                    // Step 1: Farm & Climate
                    item {
                        Step1FarmAndClimate(
                            draft = draft,
                            lots = lots,
                            onUpdate = { viewModel.updateDraft(it) }
                        )
                    }
                }
                2 -> {
                    // Step 2: Pest Monitoring
                    item {
                        Step2PestMonitoring(
                            draft = draft,
                            pestCatalog = pestCatalog,
                            onUpdate = { viewModel.updateDraft(it) }
                        )
                    }
                }
                3 -> {
                    // Step 3: Application Quality
                    item {
                        Step3ApplicationQuality(
                            draft = draft,
                            onUpdate = { viewModel.updateDraft(it) }
                        )
                    }
                }
                4 -> {
                    // Step 4: Cultural & BPA
                    item {
                        Step4CulturalAndBpa(
                            draft = draft,
                            onUpdate = { viewModel.updateDraft(it) }
                        )
                    }
                }
                5 -> {
                    // Step 5: Avgust Solution & Summary
                    item {
                        Step5AvgustPrescription(
                            draft = draft,
                            avgustProducts = avgustProducts,
                            viewModel = viewModel,
                            onUpdate = { viewModel.updateDraft(it) }
                        )
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(32.dp))
            }
        }
    }
}

private fun getStepTitle(step: Int): String = when (step) {
    1 -> "Ubicación y Clima"
    2 -> "Monitoreo Fitosanitario"
    3 -> "Calidad de Aplicación"
    4 -> "Manejo Cultural y BPA"
    5 -> "Prescripción Avgust"
    else -> ""
}

@Composable
fun StepIndicatorRow(currentStep: Int) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        for (i in 1..5) {
            val isActive = i <= currentStep
            val isCurrent = i == currentStep
            val stepColor = if (isActive) AvgustGreenPrimary else MaterialTheme.colorScheme.surfaceVariant

            Box(
                modifier = Modifier
                    .size(34.dp)
                    .clip(CircleShape)
                    .background(stepColor)
                    .border(
                        width = if (isCurrent) 2.dp else 0.dp,
                        color = if (isCurrent) AvgustGoldPrimary else Color.Transparent,
                        shape = CircleShape
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "$i",
                    color = if (isActive) Color.White else MaterialTheme.colorScheme.onSurfaceVariant,
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp
                )
            }

            if (i < 5) {
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(3.dp)
                        .background(if (i < currentStep) AvgustGreenPrimary else MaterialTheme.colorScheme.surfaceVariant)
                )
            }
        }
    }
}

// ---------------- STEP 1 ----------------
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Step1FarmAndClimate(
    draft: com.example.ui.viewmodel.NewAuditDraft,
    lots: List<com.example.data.model.FarmLotEntity>,
    onUpdate: ((com.example.ui.viewmodel.NewAuditDraft) -> com.example.ui.viewmodel.NewAuditDraft) -> Unit
) {
    var expandedLotDropdown by remember { mutableStateOf(false) }

    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text(
            text = "1. Datos del Lote y Finca",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onBackground
        )

        // Preset Lot Selector
        if (lots.isNotEmpty()) {
            ExposedDropdownMenuBox(
                expanded = expandedLotDropdown,
                onExpandedChange = { expandedLotDropdown = !expandedLotDropdown }
            ) {
                OutlinedTextField(
                    value = "${draft.farmName} • ${draft.lotName}",
                    onValueChange = {},
                    readOnly = true,
                    label = { Text("Seleccionar de Fincas Registradas") },
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expandedLotDropdown) },
                    modifier = Modifier
                        .menuAnchor()
                        .fillMaxWidth()
                )
                ExposedDropdownMenu(
                    expanded = expandedLotDropdown,
                    onDismissRequest = { expandedLotDropdown = false }
                ) {
                    lots.forEach { lot ->
                        DropdownMenuItem(
                            text = {
                                Column {
                                    Text("${lot.farmName} - ${lot.lotName}", fontWeight = FontWeight.Bold)
                                    Text("${lot.crop} (${lot.variety})", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                }
                            },
                            onClick = {
                                onUpdate {
                                    it.copy(
                                        farmName = lot.farmName,
                                        blockName = lot.blockName,
                                        lotName = lot.lotName,
                                        crop = lot.crop,
                                        farmResponsible = lot.managerName
                                    )
                                }
                                expandedLotDropdown = false
                            }
                        )
                    }
                }
            }
        }

        OutlinedTextField(
            value = draft.farmName,
            onValueChange = { onUpdate { d -> d.copy(farmName = it) } },
            label = { Text("Nombre de la Finca / Hacienda") },
            modifier = Modifier
                .fillMaxWidth()
                .testTag("input_farm_name"),
            singleLine = true
        )

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = draft.blockName,
                onValueChange = { onUpdate { d -> d.copy(blockName = it) } },
                label = { Text("Bloque / Nave") },
                modifier = Modifier.weight(1f),
                singleLine = true
            )
            OutlinedTextField(
                value = draft.lotName,
                onValueChange = { onUpdate { d -> d.copy(lotName = it) } },
                label = { Text("Lote / Cama") },
                modifier = Modifier.weight(1f),
                singleLine = true
            )
        }

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = draft.crop,
                onValueChange = { onUpdate { d -> d.copy(crop = it) } },
                label = { Text("Cultivo y Variedad") },
                modifier = Modifier.weight(1f),
                singleLine = true
            )
            OutlinedTextField(
                value = draft.phenologicalStage,
                onValueChange = { onUpdate { d -> d.copy(phenologicalStage = it) } },
                label = { Text("Etapa Fenológica") },
                modifier = Modifier.weight(1f),
                singleLine = true
            )
        }

        OutlinedTextField(
            value = draft.farmResponsible,
            onValueChange = { onUpdate { d -> d.copy(farmResponsible = it) } },
            label = { Text("Responsable Técnico de la Finca") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true
        )

        OutlinedTextField(
            value = draft.auditorName,
            onValueChange = { onUpdate { d -> d.copy(auditorName = it) } },
            label = { Text("Evaluador / Agrónomo Avgust") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true
        )

        Spacer(modifier = Modifier.height(6.dp))

        Text(
            text = "Condiciones Ambientales en Campo",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onBackground
        )

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = draft.temperatureCelsius.toString(),
                onValueChange = { str ->
                    str.toDoubleOrNull()?.let { num -> onUpdate { it.copy(temperatureCelsius = num) } }
                },
                label = { Text("Temp (°C)") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                modifier = Modifier.weight(1f)
            )
            OutlinedTextField(
                value = draft.relativeHumidityPercent.toString(),
                onValueChange = { str ->
                    str.toIntOrNull()?.let { num -> onUpdate { it.copy(relativeHumidityPercent = num) } }
                },
                label = { Text("Humedad (%)") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                modifier = Modifier.weight(1f)
            )
            OutlinedTextField(
                value = draft.windSpeedKmh.toString(),
                onValueChange = { str ->
                    str.toDoubleOrNull()?.let { num -> onUpdate { it.copy(windSpeedKmh = num) } }
                },
                label = { Text("Viento (km/h)") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                modifier = Modifier.weight(1f)
            )
        }

        OutlinedTextField(
            value = draft.weatherCondition,
            onValueChange = { onUpdate { d -> d.copy(weatherCondition = it) } },
            label = { Text("Estado del Tiempo (ej: Soleado, Nublado, Llovizna)") },
            modifier = Modifier.fillMaxWidth()
        )
    }
}

// ---------------- STEP 2 ----------------
@Composable
fun Step2PestMonitoring(
    draft: com.example.ui.viewmodel.NewAuditDraft,
    pestCatalog: List<com.example.data.model.PestCatalogItem>,
    onUpdate: ((com.example.ui.viewmodel.NewAuditDraft) -> com.example.ui.viewmodel.NewAuditDraft) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text(
            text = "2. Monitoreo Fitosanitario & Umbrales",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onBackground
        )

        // Type selection: Plaga vs Enfermedad vs Arvense
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf("ENFERMEDAD", "PLAGA", "ARVENSE").forEach { cat ->
                FilterChip(
                    selected = draft.targetProblemType == cat,
                    onClick = { onUpdate { it.copy(targetProblemType = cat) } },
                    label = { Text(cat, fontWeight = FontWeight.Bold) },
                    modifier = Modifier.weight(1f)
                )
            }
        }

        // Quick Catalog Selector
        Text(
            text = "Seleccionar de la Biblioteca Fitosanitaria:",
            fontSize = 12.sp,
            fontWeight = FontWeight.SemiBold,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            items(pestCatalog.filter { it.category == draft.targetProblemType }) { pest ->
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = if (draft.targetProblemName == pest.scientificName) AvgustGreenPrimary else MaterialTheme.colorScheme.surfaceVariant,
                    modifier = Modifier.clickable {
                        onUpdate {
                            it.copy(
                                targetProblemName = "${pest.commonName} (${pest.scientificName})",
                                organEvaluated = pest.targetOrgans.take(30),
                                recommendedProduct = pest.recommendedAvgustSolution.take(20)
                            )
                        }
                    }
                ) {
                    Text(
                        text = pest.commonName,
                        color = if (draft.targetProblemName == pest.scientificName) Color.White else MaterialTheme.colorScheme.onSurface,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Medium,
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                    )
                }
            }
        }

        OutlinedTextField(
            value = draft.targetProblemName,
            onValueChange = { onUpdate { d -> d.copy(targetProblemName = it) } },
            label = { Text("Nombre de la Plaga / Enfermedad Diana") },
            modifier = Modifier
                .fillMaxWidth()
                .testTag("input_target_pest"),
            singleLine = true
        )

        OutlinedTextField(
            value = draft.organEvaluated,
            onValueChange = { onUpdate { d -> d.copy(organEvaluated = it) } },
            label = { Text("Órgano Evaluado (ej: Botones, Hojas basales, Fruto)") },
            modifier = Modifier.fillMaxWidth()
        )

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(14.dp)
            ) {
                Text(
                    text = "Conteo Fitosanitario e Incidencia",
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp
                )

                Spacer(modifier = Modifier.height(10.dp))

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedTextField(
                        value = draft.sampleSize.toString(),
                        onValueChange = { str ->
                            str.toIntOrNull()?.let { onUpdate { d -> d.copy(sampleSize = it) } }
                        },
                        label = { Text("Muestra (Plantas/Hojas)") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        modifier = Modifier.weight(1f)
                    )

                    OutlinedTextField(
                        value = draft.infectedCount.toString(),
                        onValueChange = { str ->
                            str.toIntOrNull()?.let { onUpdate { d -> d.copy(infectedCount = it) } }
                        },
                        label = { Text("Órganos Infectados") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        modifier = Modifier.weight(1f)
                    )
                }

                Spacer(modifier = Modifier.height(10.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Text(text = "Incidencia Calculada:", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Text(
                            text = "%.1f %%".format(draft.incidencePercent),
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Black,
                            color = if (draft.incidencePercent > 10.0) VerdictCritical else AvgustGreenPrimary
                        )
                    }

                    Column {
                        Text(text = "% Severidad (Daño):", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        OutlinedTextField(
                            value = draft.severityPercent.toString(),
                            onValueChange = { str ->
                                str.toDoubleOrNull()?.let { onUpdate { d -> d.copy(severityPercent = it) } }
                            },
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                            modifier = Modifier.width(100.dp),
                            singleLine = true
                        )
                    }
                }
            }
        }

        Text(text = "Nivel de Riesgo Fitosanitario / Umbral Económico:", fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf("BAJO", "MEDIO", "CRITICO").forEach { level ->
                FilterChip(
                    selected = draft.pestRiskLevel == level,
                    onClick = { onUpdate { it.copy(pestRiskLevel = level) } },
                    label = { Text(level, fontWeight = FontWeight.Bold) },
                    modifier = Modifier.weight(1f)
                )
            }
        }
    }
}

// ---------------- STEP 3 ----------------
@Composable
fun Step3ApplicationQuality(
    draft: com.example.ui.viewmodel.NewAuditDraft,
    onUpdate: ((com.example.ui.viewmodel.NewAuditDraft) -> com.example.ui.viewmodel.NewAuditDraft) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text(
            text = "3. Aseguramiento de Calidad de Aplicación",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onBackground
        )

        OutlinedTextField(
            value = draft.nozzleType,
            onValueChange = { onUpdate { d -> d.copy(nozzleType = it) } },
            label = { Text("Tipo de Boquilla y Calibre (ej: Cono Hueco TX-VK 8)") },
            modifier = Modifier.fillMaxWidth()
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = "¿Boquillas en buen estado (sin desgaste > 10%)?",
                fontSize = 12.sp,
                color = MaterialTheme.colorScheme.onSurface,
                modifier = Modifier.weight(1f)
            )
            Switch(
                checked = draft.nozzleConditionOk,
                onCheckedChange = { onUpdate { d -> d.copy(nozzleConditionOk = it) } }
            )
        }

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = draft.sprayPressurePsi.toString(),
                onValueChange = { str ->
                    str.toDoubleOrNull()?.let { onUpdate { d -> d.copy(sprayPressurePsi = it) } }
                },
                label = { Text("Presión (PSI)") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                modifier = Modifier.weight(1f)
            )

            OutlinedTextField(
                value = draft.targetVolumeLitersPerHa.toString(),
                onValueChange = { str ->
                    str.toDoubleOrNull()?.let { onUpdate { d -> d.copy(targetVolumeLitersPerHa = it) } }
                },
                label = { Text("Volumen (L/ha)") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                modifier = Modifier.weight(1f)
            )
        }

        // Hydrosensitive Paper Droplet Coverage
        Text(
            text = "Evaluación de Cobertura en Tarjeta Hidrosensible:",
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold
        )

        HydrosensitiveCardPreview(
            dropsPerCm2 = draft.dropsPerCm2,
            quality = draft.calculatedDropsQuality
        )

        Text(
            text = "Ajustar gotas/cm²: ${draft.dropsPerCm2}",
            fontSize = 11.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Slider(
            value = draft.dropsPerCm2.toFloat(),
            onValueChange = { onUpdate { d -> d.copy(dropsPerCm2 = it.toInt()) } },
            valueRange = 10f..120f,
            steps = 22,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(4.dp))

        Text(
            text = "Calidad del Agua y Caldo de Aplicación",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onBackground
        )

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = draft.waterPh.toString(),
                onValueChange = { str ->
                    str.toDoubleOrNull()?.let { onUpdate { d -> d.copy(waterPh = it) } }
                },
                label = { Text("pH del Agua (Óptimo 5.5-6.5)") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                modifier = Modifier.weight(1f)
            )

            OutlinedTextField(
                value = draft.waterHardnessPpm.toString(),
                onValueChange = { str ->
                    str.toIntOrNull()?.let { onUpdate { d -> d.copy(waterHardnessPpm = it) } }
                },
                label = { Text("Dureza (ppm)") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                modifier = Modifier.weight(1f)
            )
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = "Cumple orden de mezcla WALES (Wetting-Agitation-Liquid-Emulsion-Surfactant)",
                fontSize = 12.sp,
                modifier = Modifier.weight(1f)
            )
            Switch(
                checked = draft.walesSequenceCorrect,
                onCheckedChange = { onUpdate { d -> d.copy(walesSequenceCorrect = it) } }
            )
        }

        OutlinedTextField(
            value = draft.adjuvantUsed,
            onValueChange = { onUpdate { d -> d.copy(adjuvantUsed = it) } },
            label = { Text("Coadyuvante utilizado (ej: Avgust Star 0.5 cc/L)") },
            modifier = Modifier.fillMaxWidth()
        )
    }
}

// ---------------- STEP 4 ----------------
@Composable
fun Step4CulturalAndBpa(
    draft: com.example.ui.viewmodel.NewAuditDraft,
    onUpdate: ((com.example.ui.viewmodel.NewAuditDraft) -> com.example.ui.viewmodel.NewAuditDraft) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text(
            text = "4. Manejo Cultural, Biológico y Buenas Prácticas (BPA)",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onBackground
        )

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(14.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                CheckItemRow(
                    label = "Poda y desbotone sanitario ejecutado oportunamente",
                    checked = draft.sanitaryPruningDone,
                    onCheckedChange = { onUpdate { d -> d.copy(sanitaryPruningDone = it) } }
                )
                CheckItemRow(
                    label = "Manejo de arvenses hospederas en calles y bordes",
                    checked = draft.weedManagementOk,
                    onCheckedChange = { onUpdate { d -> d.copy(weedManagementOk = it) } }
                )
                CheckItemRow(
                    label = "Trampas cromáticas / feromonas activas y contabilizadas",
                    checked = draft.chromaticTrapsInstalled,
                    onCheckedChange = { onUpdate { d -> d.copy(chromaticTrapsInstalled = it) } }
                )
                CheckItemRow(
                    label = "Presencia / Liberación de control biológico (Phytoseiidae, Trichoderma, etc.)",
                    checked = draft.biologicalBeneficialsActive,
                    onCheckedChange = { onUpdate { d -> d.copy(biologicalBeneficialsActive = it) } }
                )
            }
        }

        Text(
            text = "Rotación de Mecanismo de Acción (MOA FRAC / IRAC)",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onBackground
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = "¿Cumple con la rotación anti-resistencia de grupos químicos?",
                fontSize = 12.sp,
                modifier = Modifier.weight(1f)
            )
            Switch(
                checked = draft.moaRotationCompliant,
                onCheckedChange = { onUpdate { d -> d.copy(moaRotationCompliant = it) } }
            )
        }

        OutlinedTextField(
            value = draft.currentMoaGroup,
            onValueChange = { onUpdate { d -> d.copy(currentMoaGroup = it) } },
            label = { Text("Grupo MOA Actual (ej: FRAC 11 + 3 - Balerina SC)") },
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = draft.previousMoaGroup,
            onValueChange = { onUpdate { d -> d.copy(previousMoaGroup = it) } },
            label = { Text("Grupo MOA de la Aplicación Anterior") },
            modifier = Modifier.fillMaxWidth()
        )

        Text(
            text = "Bioseguridad y Seguridad Laboral",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onBackground
        )

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(14.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                CheckItemRow(
                    label = "Equipo de Protección Personal (EPP) completo para operarios",
                    checked = draft.ppeComplete,
                    onCheckedChange = { onUpdate { d -> d.copy(ppeComplete = it) } }
                )
                CheckItemRow(
                    label = "Triple lavado e inutilización de envases vacíos (Campo Limpio)",
                    checked = draft.tripleRinseDone,
                    onCheckedChange = { onUpdate { d -> d.copy(tripleRinseDone = it) } }
                )
                CheckItemRow(
                    label = "Bitácora de calibración de bombas y mantenimiento al día",
                    checked = draft.calibrationLogUpdated,
                    onCheckedChange = { onUpdate { d -> d.copy(calibrationLogUpdated = it) } }
                )
            }
        }
    }
}

// ---------------- STEP 5 ----------------
@Composable
fun Step5AvgustPrescription(
    draft: com.example.ui.viewmodel.NewAuditDraft,
    avgustProducts: List<com.example.data.model.AvgustProductItem>,
    viewModel: MipeViewModel,
    onUpdate: ((com.example.ui.viewmodel.NewAuditDraft) -> com.example.ui.viewmodel.NewAuditDraft) -> Unit
) {
    val pillarScores = remember(draft) { viewModel.calculatePillarsForDraft() }

    Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
        Text(
            text = "5. Prescripción Técnica & Emisión de Dictamen",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onBackground
        )

        // Live Score Preview Card
        AuditScoreCard(
            score = pillarScores.totalScore,
            verdict = pillarScores.verdict,
            scoreMonitoring = pillarScores.pestMonitoringScore,
            scoreApplication = pillarScores.applicationQualityScore,
            scoreCultural = pillarScores.culturalBiologicalScore,
            scoreMoa = pillarScores.moaResistanceScore,
            scoreBpa = pillarScores.bpaSafetyScore
        )

        Text(
            text = "Seleccionar Solución Técnica del Portafolio Avgust:",
            fontSize = 12.sp,
            fontWeight = FontWeight.SemiBold,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            items(avgustProducts) { prod ->
                Surface(
                    shape = RoundedCornerShape(10.dp),
                    color = if (draft.recommendedProduct == prod.tradeName) AvgustGreenPrimary else MaterialTheme.colorScheme.surfaceVariant,
                    modifier = Modifier.clickable {
                        onUpdate {
                            it.copy(
                                recommendedProduct = prod.tradeName,
                                activeIngredient = prod.activeIngredient,
                                recommendedDose = prod.standardDose.take(20),
                                currentMoaGroup = "${prod.moaCode} (${prod.tradeName})"
                            )
                        }
                    }
                ) {
                    Column(modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp)) {
                        Text(
                            text = prod.tradeName,
                            color = if (draft.recommendedProduct == prod.tradeName) Color.White else MaterialTheme.colorScheme.onSurface,
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp
                        )
                        Text(
                            text = prod.category,
                            color = if (draft.recommendedProduct == prod.tradeName) Color.White.copy(alpha = 0.8f) else MaterialTheme.colorScheme.onSurfaceVariant,
                            fontSize = 10.sp
                        )
                    }
                }
            }
        }

        OutlinedTextField(
            value = draft.recommendedProduct,
            onValueChange = { onUpdate { d -> d.copy(recommendedProduct = it) } },
            label = { Text("Producto Avgust Sugerido") },
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = draft.activeIngredient,
            onValueChange = { onUpdate { d -> d.copy(activeIngredient = it) } },
            label = { Text("Ingrediente Activo y Concentración") },
            modifier = Modifier.fillMaxWidth()
        )

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = draft.recommendedDose,
                onValueChange = { onUpdate { d -> d.copy(recommendedDose = it) } },
                label = { Text("Dosis Sugerida") },
                modifier = Modifier.weight(1f)
            )

            OutlinedTextField(
                value = draft.tankVolumeLiters.toString(),
                onValueChange = { str ->
                    str.toDoubleOrNull()?.let { onUpdate { d -> d.copy(tankVolumeLiters = it) } }
                },
                label = { Text("Tanque (L)") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                modifier = Modifier.weight(1f)
            )
        }

        // Calculated Tank Mix
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(10.dp),
            colors = CardDefaults.cardColors(containerColor = AvgustGreenPrimary.copy(alpha = 0.1f))
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.Science,
                    contentDescription = null,
                    tint = AvgustGreenPrimary
                )
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(
                        text = "Dosificación para Campo Calculada:",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = AvgustGreenPrimary
                    )
                    Text(
                        text = draft.totalProductNeededText,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        }

        OutlinedTextField(
            value = draft.technicalNotes,
            onValueChange = { onUpdate { d -> d.copy(technicalNotes = it) } },
            label = { Text("Observaciones Agronómicas y Plan de Choque Avgust") },
            modifier = Modifier
                .fillMaxWidth()
                .height(100.dp),
            maxLines = 4
        )
    }
}

@Composable
fun CheckItemRow(
    label: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onCheckedChange(!checked) },
        verticalAlignment = Alignment.CenterVertically
    ) {
        Checkbox(
            checked = checked,
            onCheckedChange = onCheckedChange
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = label,
            fontSize = 12.sp,
            color = MaterialTheme.colorScheme.onSurface,
            modifier = Modifier.weight(1f)
        )
    }
}
