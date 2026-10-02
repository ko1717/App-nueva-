package com.example.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Calculate
import androidx.compose.material.icons.filled.Science
import androidx.compose.material.icons.filled.Speed
import androidx.compose.material.icons.filled.WaterDrop
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.ui.theme.AvgustGreenPrimary
import com.example.ui.viewmodel.MipeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SprayCalculatorScreen(
    viewModel: MipeViewModel,
    modifier: Modifier = Modifier
) {
    val speedKmh by viewModel.calcSpeedKmh.collectAsStateWithLifecycle()
    val nozzleSpacingCm by viewModel.calcNozzleSpacingCm.collectAsStateWithLifecycle()
    val targetVolumeLha by viewModel.calcTargetVolumeLha.collectAsStateWithLifecycle()
    val tankCapacityL by viewModel.calcTankCapacityL.collectAsStateWithLifecycle()
    val dosePerLiterCc by viewModel.calcDosePerLiterCc.collectAsStateWithLifecycle()
    val adjuvantPerLiterCc by viewModel.calcAdjuvantPerLiterCc.collectAsStateWithLifecycle()

    BackHandler {
        viewModel.popBackStack()
    }

    // Calculations
    val speed = speedKmh.toDoubleOrNull() ?: 5.0
    val spacing = nozzleSpacingCm.toDoubleOrNull() ?: 50.0
    val targetVolume = targetVolumeLha.toDoubleOrNull() ?: 400.0
    val tankCap = tankCapacityL.toDoubleOrNull() ?: 200.0
    val dose = dosePerLiterCc.toDoubleOrNull() ?: 0.5
    val adjuvantDose = adjuvantPerLiterCc.toDoubleOrNull() ?: 0.5

    // Formula: q (L/min per nozzle) = (Q * v * d) / 60000
    val flowPerNozzleLmin = (targetVolume * speed * spacing) / 60000.0
    val totalProductTankCc = dose * tankCap
    val totalAdjuvantTankCc = adjuvantDose * tankCap
    val areaPerTankHa = if (targetVolume > 0) tankCap / targetVolume else 0.0

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text("Calculadora de Calibración & Mezcla", fontWeight = FontWeight.Bold)
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
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = modifier
                .fillMaxSize()
                .padding(innerPadding)
                .testTag("spray_calculator_screen"),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Nozzle Flow Calculator Section
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.Speed,
                                contentDescription = null,
                                tint = Color(0xFF0284C7)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "1. Calibración de Caudal por Boquilla",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            OutlinedTextField(
                                value = speedKmh,
                                onValueChange = { viewModel.calcSpeedKmh.value = it },
                                label = { Text("Velocidad (km/h)") },
                                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                                modifier = Modifier.weight(1f)
                            )

                            OutlinedTextField(
                                value = nozzleSpacingCm,
                                onValueChange = { viewModel.calcNozzleSpacingCm.value = it },
                                label = { Text("Distancia (cm)") },
                                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                                modifier = Modifier.weight(1f)
                            )
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        OutlinedTextField(
                            value = targetVolumeLha,
                            onValueChange = { viewModel.calcTargetVolumeLha.value = it },
                            label = { Text("Volumen Objetivo (L/ha o L/cama)") },
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                            modifier = Modifier.fillMaxWidth()
                        )

                        Spacer(modifier = Modifier.height(14.dp))

                        // Result Box
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = Color(0xFF0284C7).copy(alpha = 0.1f),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.padding(12.dp)) {
                                Text(
                                    text = "Gasto Requerido por Boquilla:",
                                    fontSize = 12.sp,
                                    color = Color(0xFF0284C7),
                                    fontWeight = FontWeight.SemiBold
                                )
                                Text(
                                    text = "%.3f Litros / minuto".format(flowPerNozzleLmin),
                                    fontSize = 20.sp,
                                    fontWeight = FontWeight.Black,
                                    color = Color(0xFF0284C7)
                                )
                                Text(
                                    text = "Equivalente a %.0f ml/min (recoger en probeta graduada durante 1 min para verificar)".format(flowPerNozzleLmin * 1000.0),
                                    fontSize = 11.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }
                }
            }

            // Tank Dosifier Section
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.Science,
                                contentDescription = null,
                                tint = AvgustGreenPrimary
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "2. Dosificador para Tanque / Caneca",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            OutlinedTextField(
                                value = tankCapacityL,
                                onValueChange = { viewModel.calcTankCapacityL.value = it },
                                label = { Text("Capacidad Tanque (L)") },
                                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                                modifier = Modifier.weight(1f)
                            )

                            OutlinedTextField(
                                value = dosePerLiterCc,
                                onValueChange = { viewModel.calcDosePerLiterCc.value = it },
                                label = { Text("Dosis Producto (cc/L)") },
                                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                                modifier = Modifier.weight(1f)
                            )
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        OutlinedTextField(
                            value = adjuvantPerLiterCc,
                            onValueChange = { viewModel.calcAdjuvantPerLiterCc.value = it },
                            label = { Text("Dosis Avgust Star (cc/L)") },
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                            modifier = Modifier.fillMaxWidth()
                        )

                        Spacer(modifier = Modifier.height(14.dp))

                        // Results
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = AvgustGreenPrimary.copy(alpha = 0.1f),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.padding(12.dp)) {
                                Text(
                                    text = "Dosis Exacta por Tanque de ${tankCap.toInt()} Litros:",
                                    fontSize = 12.sp,
                                    color = AvgustGreenPrimary,
                                    fontWeight = FontWeight.SemiBold
                                )
                                Spacer(modifier = Modifier.height(4.dp))
                                Text(
                                    text = "• Producto Fitosanitario: %.1f cc / gramos".format(totalProductTankCc),
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = MaterialTheme.colorScheme.onSurface
                                )
                                Text(
                                    text = "• Coadyuvante Avgust Star: %.1f cc".format(totalAdjuvantTankCc),
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = AvgustGreenPrimary
                                )
                                Text(
                                    text = "• Cobertura estimada: %.2f hectáreas por tanque".format(areaPerTankHa),
                                    fontSize = 11.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }
                }
            }

            // Mixing Sequence WALES Guide
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    ) {
                        Text(
                            text = "Orden Estándar de Mezcla (Protocolo WALES Avgust)",
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        WalesStepItem("W", "Water & Wettable Powders (WP/SP)", "Llenar tanque a 50%, regular pH si es necesario y agregar polvos solubles.")
                        WalesStepItem("A", "Agitation (Agitación continua)", "Mantener retorno de agitación siempre activo.")
                        WalesStepItem("L", "Liquid Flowables (SC / CS)", "Agregar suspensiones concentradas como Balerina SC o Borey SC.")
                        WalesStepItem("E", "Emulsifiable Concentrates (EC)", "Agregar concentrados emulsionables como Sirocco EC o Miura EC.")
                        WalesStepItem("S", "Surfactants / Coadyuvantes", "Agregar siempre al final coadyuvante Avgust Star y completar agua al 100%.")
                    }
                }
            }
        }
    }
}

@Composable
fun WalesStepItem(letter: String, title: String, description: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        verticalAlignment = Alignment.Top
    ) {
        Box(
            modifier = Modifier
                .size(24.dp)
                .clip(CircleShape)
                .background(AvgustGreenPrimary),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = letter,
                color = Color.White,
                fontWeight = FontWeight.Bold,
                fontSize = 12.sp
            )
        }
        Spacer(modifier = Modifier.width(8.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(text = title, fontWeight = FontWeight.Bold, fontSize = 12.sp)
            Text(text = description, fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}
