package com.example.ui.screens

import android.content.Intent
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Assessment
import androidx.compose.material.icons.filled.BugReport
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Opacity
import androidx.compose.material.icons.filled.Science
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.Verified
import androidx.compose.material.icons.filled.WaterDrop
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
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
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.model.MipeAuditEntity
import com.example.ui.components.AuditScoreCard
import com.example.ui.components.HydrosensitiveCardPreview
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

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AuditDetailScreen(
    viewModel: MipeViewModel,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val audit by viewModel.selectedAudit.collectAsStateWithLifecycle()
    var showDeleteDialog by remember { mutableStateOf(false) }

    BackHandler {
        viewModel.popBackStack()
    }

    if (audit == null) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("No se encontró el aseguramiento seleccionado")
                Spacer(modifier = Modifier.height(12.dp))
                Button(onClick = { viewModel.navigateTo(AppScreen.DASHBOARD) }) {
                    Text("Volver al Inicio")
                }
            }
        }
        return
    }

    val currentAudit = audit!!
    val formattedDate = SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault()).format(Date(currentAudit.auditDate))

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "Acta Oficial MIPE-${currentAudit.id.toString().padStart(4, '0')}",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = currentAudit.farmName,
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                navigationIcon = {
                    IconButton(
                        onClick = { viewModel.popBackStack() },
                        modifier = Modifier.testTag("detail_back_button")
                    ) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Volver"
                        )
                    }
                },
                actions = {
                    IconButton(
                        onClick = {
                            val shareText = viewModel.generateShareableReportText(currentAudit)
                            val sendIntent = Intent().apply {
                                action = Intent.ACTION_SEND
                                putExtra(Intent.EXTRA_TEXT, shareText)
                                type = "text/plain"
                            }
                            val shareIntent = Intent.createChooser(sendIntent, "Compartir Reporte Técnico MIPE Avgust")
                            context.startActivity(shareIntent)
                        },
                        modifier = Modifier.testTag("share_audit_button")
                    ) {
                        Icon(imageVector = Icons.Default.Share, contentDescription = "Compartir")
                    }

                    IconButton(
                        onClick = { showDeleteDialog = true },
                        modifier = Modifier.testTag("delete_audit_button")
                    ) {
                        Icon(
                            imageVector = Icons.Default.Delete,
                            contentDescription = "Eliminar",
                            tint = Color(0xFFEF4444)
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
                .testTag("audit_detail_screen"),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Official Avgust Quality Certificate Banner
            item {
                OfficialCertificateHeader(audit = currentAudit, formattedDate = formattedDate)
            }

            // Score & Pillar Breakdown
            item {
                AuditScoreCard(
                    score = currentAudit.totalScore,
                    verdict = currentAudit.verdict,
                    scoreMonitoring = currentAudit.scoreMonitoring,
                    scoreApplication = currentAudit.scoreApplication,
                    scoreCultural = currentAudit.scoreCultural,
                    scoreMoa = currentAudit.scoreMoa,
                    scoreBpa = currentAudit.scoreBpa
                )
            }

            // Technical Section 1: Pest Diagnostic & Thresholds
            item {
                SectionCard(
                    title = "1. Monitoreo Fitosanitario & Umbrales",
                    icon = Icons.Default.BugReport,
                    iconColor = Color(0xFFEF4444)
                ) {
                    DetailRow("Blanco Fitosanitario:", "${currentAudit.targetProblemName} (${currentAudit.targetProblemType})")
                    DetailRow("Órgano Evaluado:", currentAudit.organEvaluated)
                    DetailRow("Tamaño de Muestra:", "${currentAudit.sampleSize} unidades evaluadas")
                    DetailRow("Órganos Afectados:", "${currentAudit.infectedCount} infectados")
                    DetailRow("Incidencia Calculada:", "%.1f %%".format(currentAudit.incidencePercent), highlight = true)
                    DetailRow("Severidad Estimada:", "%.1f %%".format(currentAudit.severityPercent))
                    DetailRow("Nivel de Riesgo:", currentAudit.pestRiskLevel, highlight = true)
                }
            }

            // Technical Section 2: Application Quality Assurance
            item {
                SectionCard(
                    title = "2. Calidad de Aplicación en Campo",
                    icon = Icons.Default.WaterDrop,
                    iconColor = Color(0xFF0284C7)
                ) {
                    DetailRow("Tipo de Boquilla:", currentAudit.nozzleType)
                    DetailRow("Estado de Boquillas:", if (currentAudit.nozzleConditionOk) "Buen estado / Calibrada" else "Desgaste detectado")
                    DetailRow("Presión de Trabajo:", "${currentAudit.sprayPressurePsi} PSI")
                    DetailRow("Volumen de Caldo:", "${currentAudit.targetVolumeLitersPerHa} L/ha")
                    DetailRow("Calidad del Agua:", "pH ${currentAudit.waterPh} • Dureza ${currentAudit.waterHardnessPpm} ppm")
                    DetailRow("Secuencia WALES:", if (currentAudit.walesSequenceCorrect) "Cumple orden de mezcla" else "Mezcla inadecuada")
                    DetailRow("Coadyuvante:", currentAudit.adjuvantUsed)

                    Spacer(modifier = Modifier.height(10.dp))
                    HydrosensitiveCardPreview(
                        dropsPerCm2 = currentAudit.dropsPerCm2,
                        quality = currentAudit.coverageQuality
                    )
                }
            }

            // Technical Section 3: Cultural, Biological & BPA
            item {
                SectionCard(
                    title = "3. Manejo Cultural, Biológico y BPA",
                    icon = Icons.Default.Eco,
                    iconColor = Color(0xFF16A34A)
                ) {
                    ComplianceRow("Poda y Sanidad Fitosanitaria:", currentAudit.sanitaryPruningDone)
                    ComplianceRow("Manejo de Arvenses Hospederas:", currentAudit.weedManagementOk)
                    ComplianceRow("Monitoreo con Trampas:", currentAudit.chromaticTrapsInstalled)
                    ComplianceRow("Control Biológico Activo:", currentAudit.biologicalBeneficialsActive)
                    ComplianceRow("Rotación MOA (FRAC/IRAC):", currentAudit.moaRotationCompliant)
                    DetailRow("Grupo Químico Actual:", currentAudit.currentMoaGroup)
                    DetailRow("Grupo Químico Previo:", currentAudit.previousMoaGroup)
                    ComplianceRow("EPP de Operarios Completo:", currentAudit.ppeComplete)
                    ComplianceRow("Triple Lavado de Envases:", currentAudit.tripleRinseDone)
                    ComplianceRow("Bitácora de Calibración al Día:", currentAudit.calibrationLogUpdated)
                }
            }

            // Technical Section 4: Avgust Solution Prescription
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = AvgustGreenPrimary.copy(alpha = 0.08f)),
                    border = androidx.compose.foundation.BorderStroke(1.5.dp, AvgustGreenPrimary)
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
                                tint = AvgustGreenPrimary,
                                modifier = Modifier.size(24.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "Prescripción Oficial Avgust Crop Protection",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = AvgustGreenPrimary
                            )
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        DetailRow("Producto Sugerido:", currentAudit.recommendedProduct, highlight = true)
                        DetailRow("Ingrediente Activo:", currentAudit.activeIngredient)
                        DetailRow("Dosis Prescrita:", currentAudit.recommendedDose)
                        DetailRow("Preparación en Tanque:", currentAudit.totalProductNeeded, highlight = true)
                        DetailRow("Periodo de Reingreso (PR):", "${currentAudit.daysToReentry} día(s)")
                        DetailRow("Periodo de Carencia (PC):", "${currentAudit.safetyPeriodDays} días")

                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "Notas Técnicas del Agrónomo:",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = currentAudit.technicalNotes,
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            lineHeight = 16.sp
                        )
                    }
                }
            }

            // Share Action Button at Bottom
            item {
                Button(
                    onClick = {
                        val shareText = viewModel.generateShareableReportText(currentAudit)
                        val sendIntent = Intent().apply {
                            action = Intent.ACTION_SEND
                            putExtra(Intent.EXTRA_TEXT, shareText)
                            type = "text/plain"
                        }
                        val shareIntent = Intent.createChooser(sendIntent, "Compartir Acta MIPE")
                        context.startActivity(shareIntent)
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = AvgustGreenPrimary),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(50.dp)
                        .testTag("export_report_button")
                ) {
                    Icon(imageVector = Icons.Default.Share, contentDescription = null)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Compartir Acta Técnica Oficial", fontWeight = FontWeight.Bold)
                }
            }
        }
    }

    if (showDeleteDialog) {
        AlertDialog(
            onDismissRequest = { showDeleteDialog = false },
            title = { Text("¿Eliminar Aseguramiento MIPE?") },
            text = { Text("Esta acción eliminará de forma permanente el acta MIPE-${currentAudit.id.toString().padStart(4, '0')} de la finca ${currentAudit.farmName}.") },
            confirmButton = {
                Button(
                    onClick = {
                        viewModel.deleteAudit(currentAudit.id)
                        showDeleteDialog = false
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFEF4444))
                ) {
                    Text("Eliminar")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteDialog = false }) {
                    Text("Cancelar")
                }
            }
        )
    }
}

@Composable
fun OfficialCertificateHeader(
    audit: MipeAuditEntity,
    formattedDate: String
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.Transparent)
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    Brush.verticalGradient(
                        listOf(AvgustGreenDark, Color(0xFF064E3B))
                    )
                )
                .padding(18.dp)
        ) {
            Column(modifier = Modifier.fillMaxWidth()) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = "avgust",
                            color = Color.White,
                            fontWeight = FontWeight.Black,
                            fontSize = 20.sp,
                            letterSpacing = 1.sp
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Surface(
                            shape = RoundedCornerShape(4.dp),
                            color = AvgustGoldPrimary
                        ) {
                            Text(
                                text = "MIPE",
                                color = Color.White,
                                fontWeight = FontWeight.Bold,
                                fontSize = 11.sp,
                                modifier = Modifier.padding(horizontal = 5.dp, vertical = 2.dp)
                            )
                        }
                    }

                    Text(
                        text = "Acta #${audit.id.toString().padStart(4, '0')}",
                        color = Color.White.copy(alpha = 0.9f),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                Text(
                    text = audit.farmName,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Black,
                    color = Color.White
                )

                Text(
                    text = "${audit.blockName} • ${audit.lotName}",
                    fontSize = 13.sp,
                    color = Color.White.copy(alpha = 0.85f)
                )

                Spacer(modifier = Modifier.height(8.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Text(text = "Cultivo / Variedad:", fontSize = 10.sp, color = Color.White.copy(alpha = 0.7f))
                        Text(text = audit.crop, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
                    }

                    Column {
                        Text(text = "Fecha de Auditoría:", fontSize = 10.sp, color = Color.White.copy(alpha = 0.7f))
                        Text(text = formattedDate, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
                    }
                }

                Spacer(modifier = Modifier.height(8.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Text(text = "Responsable Finca:", fontSize = 10.sp, color = Color.White.copy(alpha = 0.7f))
                        Text(text = audit.farmResponsible, fontSize = 11.sp, color = Color.White)
                    }

                    Column {
                        Text(text = "Agrónomo Avgust:", fontSize = 10.sp, color = Color.White.copy(alpha = 0.7f))
                        Text(text = audit.auditorName, fontSize = 11.sp, color = Color.White)
                    }
                }
            }
        }
    }
}

@Composable
fun SectionCard(
    title: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    iconColor: Color,
    content: @Composable () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = iconColor,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            content()
        }
    }
}

@Composable
fun DetailRow(
    label: String,
    value: String,
    highlight: Boolean = false
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 3.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = label,
            fontSize = 12.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Text(
            text = value,
            fontSize = 12.sp,
            fontWeight = if (highlight) FontWeight.Bold else FontWeight.Medium,
            color = if (highlight) AvgustGreenPrimary else MaterialTheme.colorScheme.onSurface
        )
    }
}

@Composable
fun ComplianceRow(
    label: String,
    compliant: Boolean
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 3.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = label,
            fontSize = 12.sp,
            color = MaterialTheme.colorScheme.onSurface,
            modifier = Modifier.weight(1f)
        )
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(
                imageVector = if (compliant) Icons.Default.CheckCircle else Icons.Default.Close,
                contentDescription = null,
                tint = if (compliant) VerdictExcellent else VerdictCritical,
                modifier = Modifier.size(16.dp)
            )
            Spacer(modifier = Modifier.width(4.dp))
            Text(
                text = if (compliant) "Cumple" else "No cumple",
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                color = if (compliant) VerdictExcellent else VerdictCritical
            )
        }
    }
}
