package com.example.ui.screens

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
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowForward
import androidx.compose.material.icons.filled.Assessment
import androidx.compose.material.icons.filled.BugReport
import androidx.compose.material.icons.filled.Calculate
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.model.FarmLotEntity
import com.example.data.model.MipeAuditEntity
import com.example.ui.components.AvgustHeader
import com.example.ui.theme.AvgustGoldPrimary
import com.example.ui.theme.AvgustGreenDark
import com.example.ui.theme.AvgustGreenLight
import com.example.ui.theme.AvgustGreenPrimary
import com.example.ui.theme.VerdictCritical
import com.example.ui.theme.VerdictExcellent
import com.example.ui.theme.VerdictWarning
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.MipeViewModel
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@Composable
fun DashboardScreen(
    viewModel: MipeViewModel,
    modifier: Modifier = Modifier
) {
    val audits by viewModel.filteredAudits.collectAsStateWithLifecycle()
    val allAudits by viewModel.allAudits.collectAsStateWithLifecycle()
    val lots by viewModel.allLots.collectAsStateWithLifecycle()
    val searchQuery by viewModel.auditSearchQuery.collectAsStateWithLifecycle()
    val cropFilter by viewModel.auditCropFilter.collectAsStateWithLifecycle()

    val totalAudits = allAudits.size
    val averageScore = if (allAudits.isNotEmpty()) allAudits.map { it.totalScore }.average().toInt() else 0
    val greenLotsCount = lots.count { it.riskStatus == "VERDE" }
    val yellowLotsCount = lots.count { it.riskStatus == "AMARILLO" }
    val redLotsCount = lots.count { it.riskStatus == "ROJO" }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .testTag("dashboard_screen"),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Avgust Brand Header
        item {
            AvgustHeader(
                title = "Aseguramiento MIPE",
                subtitle = "Manejo Integrado de Plagas y Enfermedades • Auditoría de Campo"
            )
        }

        // Primary Action: New MIPE Assurance CTA
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("start_new_audit_cta")
                    .clickable {
                        viewModel.resetDraft()
                        viewModel.navigateTo(AppScreen.NEW_AUDIT)
                    },
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = AvgustGreenPrimary
                ),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(18.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.weight(1f)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(48.dp)
                                .clip(CircleShape)
                                .background(Color.White.copy(alpha = 0.2f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.Add,
                                contentDescription = null,
                                tint = Color.White,
                                modifier = Modifier.size(28.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(14.dp))
                        Column {
                            Text(
                                text = "Nuevo Aseguramiento MIPE",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                            Text(
                                text = "Iniciar auditoría técnica fitosanitaria",
                                fontSize = 12.sp,
                                color = Color.White.copy(alpha = 0.85f)
                            )
                        }
                    }

                    Icon(
                        imageVector = Icons.Default.ArrowForward,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(22.dp)
                    )
                }
            }
        }

        // KPI Summary Metric Cards
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                MetricKpiCard(
                    title = "Aseguramientos",
                    value = "$totalAudits",
                    subtitle = "Registrados",
                    icon = Icons.Default.Assessment,
                    accentColor = AvgustGreenPrimary,
                    modifier = Modifier.weight(1f)
                )
                MetricKpiCard(
                    title = "Cumplimiento",
                    value = "$averageScore%",
                    subtitle = "Score Promedio",
                    icon = Icons.Default.Shield,
                    accentColor = if (averageScore >= 80) VerdictExcellent else VerdictWarning,
                    modifier = Modifier.weight(1f)
                )
                MetricKpiCard(
                    title = "En Alerta Roja",
                    value = "$redLotsCount",
                    subtitle = "Lotes críticos",
                    icon = Icons.Default.Warning,
                    accentColor = VerdictCritical,
                    modifier = Modifier.weight(1f)
                )
            }
        }

        // Quick Agronomic Tools Navigation Grid
        item {
            Text(
                text = "Módulos y Herramientas Técnicas",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onBackground
            )
            Spacer(modifier = Modifier.height(8.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                QuickModuleCard(
                    title = "Calculadora\nde Mezcla",
                    subtitle = "Calibración L/ha",
                    icon = Icons.Default.Calculate,
                    color = Color(0xFF0284C7),
                    onClick = { viewModel.navigateTo(AppScreen.SPRAY_CALCULATOR) },
                    modifier = Modifier.weight(1f)
                )
                QuickModuleCard(
                    title = "Portafolio\nAvgust",
                    subtitle = "Vademécum",
                    icon = Icons.Default.Shield,
                    color = AvgustGreenPrimary,
                    onClick = { viewModel.navigateTo(AppScreen.AVGUST_CATALOG) },
                    modifier = Modifier.weight(1f)
                )
                QuickModuleCard(
                    title = "Biblioteca\nPlagas MIPE",
                    subtitle = "Diagnóstico",
                    icon = Icons.Default.BugReport,
                    color = Color(0xFF9333EA),
                    onClick = { viewModel.navigateTo(AppScreen.PEST_CATALOG) },
                    modifier = Modifier.weight(1f)
                )
            }
        }

        // Farm & Lots Status Semaphore
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("farm_lots_summary_card")
                    .clickable { viewModel.navigateTo(AppScreen.FARM_LOTS) },
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.LocationOn,
                                contentDescription = null,
                                tint = AvgustGreenPrimary,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "Semáforo Fitosanitario por Lotes",
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        }
                        Text(
                            text = "Ver todos >",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = AvgustGreenPrimary
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        SemaphorePill(count = greenLotsCount, label = "Control Óptimo", color = VerdictExcellent)
                        SemaphorePill(count = yellowLotsCount, label = "En Monitoreo", color = VerdictWarning)
                        SemaphorePill(count = redLotsCount, label = "Plan de Choque", color = VerdictCritical)
                    }
                }
            }
        }

        // Search & Filter Header for Audits
        item {
            Column(modifier = Modifier.fillMaxWidth()) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "Historial de Aseguramientos MIPE",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onBackground
                    )
                    Text(
                        text = "${audits.size} actas",
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = { viewModel.auditSearchQuery.value = it },
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag("audit_search_input"),
                    placeholder = { Text("Buscar por finca, lote o plaga...") },
                    leadingIcon = {
                        Icon(imageVector = Icons.Default.Search, contentDescription = "Buscar")
                    },
                    singleLine = true,
                    shape = RoundedCornerShape(12.dp)
                )

                Spacer(modifier = Modifier.height(8.dp))

                // Crop Filter Chips
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    val crops = listOf("TODOS", "Rosa", "Café", "Aguacate", "Banano")
                    items(crops) { crop ->
                        FilterChip(
                            selected = cropFilter == crop,
                            onClick = { viewModel.auditCropFilter.value = crop },
                            label = { Text(crop, fontSize = 12.sp) }
                        )
                    }
                }
            }
        }

        // Audits List
        if (audits.isEmpty()) {
            item {
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 12.dp),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Icon(
                            imageVector = Icons.Default.Assessment,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.size(36.dp)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "No se encontraron aseguramientos",
                            fontWeight = FontWeight.SemiBold,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Text(
                            text = "Intenta con otro filtro o registra uno nuevo",
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        } else {
            items(audits, key = { it.id }) { audit ->
                AuditListItemCard(
                    audit = audit,
                    onClick = { viewModel.selectAuditAndNavigate(audit.id) }
                )
            }
        }
    }
}

@Composable
fun MetricKpiCard(
    title: String,
    value: String,
    subtitle: String,
    icon: ImageVector,
    accentColor: Color,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    text = title,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = accentColor,
                    modifier = Modifier.size(16.dp)
                )
            }

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = value,
                fontSize = 20.sp,
                fontWeight = FontWeight.Black,
                color = accentColor
            )

            Text(
                text = subtitle,
                fontSize = 10.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
fun QuickModuleCard(
    title: String,
    subtitle: String,
    icon: ImageVector,
    color: Color,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier
            .clickable { onClick() }
            .testTag("module_card_${title.take(6)}"),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            horizontalAlignment = Alignment.Start
        ) {
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(color.copy(alpha = 0.12f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = color,
                    modifier = Modifier.size(20.dp)
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = title,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface,
                lineHeight = 15.sp
            )

            Text(
                text = subtitle,
                fontSize = 10.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
fun SemaphorePill(
    count: Int,
    label: String,
    color: Color
) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.padding(horizontal = 4.dp)
    ) {
        Box(
            modifier = Modifier
                .size(10.dp)
                .clip(CircleShape)
                .background(color)
        )
        Spacer(modifier = Modifier.width(6.dp))
        Column {
            Text(
                text = "$count Lotes",
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface
            )
            Text(
                text = label,
                fontSize = 10.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
fun AuditListItemCard(
    audit: MipeAuditEntity,
    onClick: () -> Unit
) {
    val verdictColor = when (audit.verdict) {
        "APROBADO_EXCELENCIA" -> VerdictExcellent
        "CONFORME_OBSERVACIONES" -> VerdictWarning
        else -> VerdictCritical
    }

    val formattedDate = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()).format(Date(audit.auditDate))

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .testTag("audit_item_${audit.id}"),
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
                    Surface(
                        shape = RoundedCornerShape(6.dp),
                        color = AvgustGreenPrimary.copy(alpha = 0.12f)
                    ) {
                        Text(
                            text = audit.crop.take(18),
                            color = AvgustGreenPrimary,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = formattedDate,
                        fontSize = 11.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                Surface(
                    shape = RoundedCornerShape(20.dp),
                    color = verdictColor.copy(alpha = 0.15f)
                ) {
                    Text(
                        text = "${audit.totalScore} pts",
                        color = verdictColor,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Black,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = audit.farmName,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface
            )

            Text(
                text = "${audit.blockName} • ${audit.lotName}",
                fontSize = 12.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            Spacer(modifier = Modifier.height(8.dp))

            // Problem & Avgust solution line
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.BugReport,
                        contentDescription = null,
                        tint = Color(0xFFEF4444),
                        modifier = Modifier.size(14.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = audit.targetProblemName.take(24),
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Medium,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }

                Text(
                    text = "Solución: ${audit.recommendedProduct}",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = AvgustGreenPrimary
                )
            }
        }
    }
}
