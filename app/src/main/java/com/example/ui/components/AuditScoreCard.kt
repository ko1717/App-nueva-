package com.example.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Error
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.AvgustGreenPrimary
import com.example.ui.theme.VerdictCritical
import com.example.ui.theme.VerdictExcellent
import com.example.ui.theme.VerdictWarning

@Composable
fun AuditScoreCard(
    score: Int,
    verdict: String,
    scoreMonitoring: Int = 22,
    scoreApplication: Int = 24,
    scoreCultural: Int = 18,
    scoreMoa: Int = 14,
    scoreBpa: Int = 14,
    modifier: Modifier = Modifier
) {
    val verdictColor = when (verdict) {
        "APROBADO_EXCELENCIA" -> VerdictExcellent
        "CONFORME_OBSERVACIONES" -> VerdictWarning
        else -> VerdictCritical
    }

    val verdictText = when (verdict) {
        "APROBADO_EXCELENCIA" -> "Aprobado con Excelencia"
        "CONFORME_OBSERVACIONES" -> "Conforme con Observaciones"
        else -> "No Conforme / Riesgo Fitosanitario"
    }

    val verdictIcon = when (verdict) {
        "APROBADO_EXCELENCIA" -> Icons.Default.CheckCircle
        "CONFORME_OBSERVACIONES" -> Icons.Default.Warning
        else -> Icons.Default.Error
    }

    val progressAnim by animateFloatAsState(
        targetValue = score / 100f,
        label = "score_anim"
    )

    Card(
        modifier = modifier
            .fillMaxWidth()
            .testTag("audit_score_card"),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant
        )
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
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "Índice de Calidad MIPE",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Surface(
                        shape = RoundedCornerShape(20.dp),
                        color = verdictColor.copy(alpha = 0.15f)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
                        ) {
                            Icon(
                                imageVector = verdictIcon,
                                contentDescription = null,
                                tint = verdictColor,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = verdictText,
                                color = verdictColor,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }

                // Circular Score Indicator
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier.size(76.dp)
                ) {
                    CircularProgressIndicator(
                        progress = { progressAnim },
                        modifier = Modifier.size(76.dp),
                        color = verdictColor,
                        trackColor = verdictColor.copy(alpha = 0.2f),
                        strokeWidth = 7.dp,
                    )
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            text = "$score",
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Black,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Text(
                            text = "/100",
                            fontSize = 10.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Pillars Breakdown
            Text(
                text = "Desglose por Pilares Técnicos MIPE:",
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            Spacer(modifier = Modifier.height(8.dp))

            PillarProgressRow("1. Monitoreo & Umbrales", scoreMonitoring, 25, AvgustGreenPrimary)
            PillarProgressRow("2. Calidad de Aplicación", scoreApplication, 25, Color(0xFF0284C7))
            PillarProgressRow("3. Manejo Cultural & Biológico", scoreCultural, 20, Color(0xFF16A34A))
            PillarProgressRow("4. Rotación MOA (FRAC/IRAC)", scoreMoa, 15, Color(0xFF9333EA))
            PillarProgressRow("5. Bioseguridad & BPA", scoreBpa, 15, Color(0xFFD97706))
        }
    }
}

@Composable
fun PillarProgressRow(
    label: String,
    score: Int,
    maxScore: Int,
    color: Color
) {
    val progress = (score.toFloat() / maxScore.toFloat()).coerceIn(0f, 1f)
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 3.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            fontSize = 11.sp,
            color = MaterialTheme.colorScheme.onSurface,
            modifier = Modifier.weight(1f)
        )
        LinearProgressIndicator(
            progress = { progress },
            modifier = Modifier
                .width(100.dp)
                .height(6.dp)
                .clip(RoundedCornerShape(3.dp)),
            color = color,
            trackColor = color.copy(alpha = 0.2f),
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = "$score/$maxScore",
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}
