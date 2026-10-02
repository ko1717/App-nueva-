package com.example.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.VerdictCritical
import com.example.ui.theme.VerdictExcellent
import com.example.ui.theme.VerdictWarning
import kotlin.random.Random

@Composable
fun HydrosensitiveCardPreview(
    dropsPerCm2: Int,
    quality: String,
    modifier: Modifier = Modifier
) {
    // Generate deterministic droplet points based on dropsPerCm2
    val dropletSeeds = remember(dropsPerCm2) {
        val rand = Random(dropsPerCm2 * 42)
        val count = dropsPerCm2.coerceIn(10, 180)
        List(count) {
            Triple(
                rand.nextFloat(), // x ratio
                rand.nextFloat(), // y ratio
                rand.nextFloat() * 2.8f + 1.2f // radius
            )
        }
    }

    val statusColor = when (quality) {
        "OPTIMA" -> VerdictExcellent
        "ACEPTABLE" -> VerdictWarning
        else -> VerdictCritical
    }

    val statusDescription = when (quality) {
        "OPTIMA" -> "Óptima para Fitosanitarios Avgust (50-80 gotas/cm²)"
        "DEFICIENTE", "BAJA" -> "Baja Cobertura (<35 gotas/cm²) - Riesgo de fallo de control"
        "ACEPTABLE" -> "Aceptable (35-49 gotas/cm²)"
        else -> "Excesiva (>90 gotas/cm²) - Riesgo de escurrimiento y pérdida"
    }

    Card(
        modifier = modifier
            .fillMaxWidth()
            .testTag("hydrosensitive_card_preview"),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.7f)
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Simulated Yellow Card with Blue Droplets
            Box(
                modifier = Modifier
                    .size(78.dp, 64.dp)
                    .clip(RoundedCornerShape(6.dp))
                    .background(Color(0xFFFEF08A)) // Hydrosensitive paper yellow
                    .border(1.dp, Color(0xFFCA8A04), RoundedCornerShape(6.dp))
            ) {
                Canvas(modifier = Modifier.matchParentSize()) {
                    dropletSeeds.forEach { (xRatio, yRatio, r) ->
                        drawCircle(
                            color = Color(0xFF1E40AF).copy(alpha = 0.88f), // Deep indigo droplet
                            radius = r.dp.toPx(),
                            center = Offset(xRatio * size.width, yRatio * size.height)
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.width(14.dp))

            Column(modifier = Modifier.weight(1f)) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = "Tarjeta Hidrosensible",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Surface(
                        shape = RoundedCornerShape(10.dp),
                        color = statusColor.copy(alpha = 0.15f)
                    ) {
                        Text(
                            text = "$dropsPerCm2 gotas/cm²",
                            color = statusColor,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(4.dp))

                Text(
                    text = statusDescription,
                    fontSize = 11.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    lineHeight = 14.sp
                )
            }
        }
    }
}
