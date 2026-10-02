package com.example.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.BugReport
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.model.PestCatalogItem
import com.example.ui.theme.AvgustGreenPrimary
import com.example.ui.theme.VerdictCritical
import com.example.ui.viewmodel.MipeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PestCatalogScreen(
    viewModel: MipeViewModel,
    modifier: Modifier = Modifier
) {
    val pests by viewModel.filteredPests.collectAsStateWithLifecycle()
    val searchQuery by viewModel.pestSearchQuery.collectAsStateWithLifecycle()
    val categoryFilter by viewModel.pestCategoryFilter.collectAsStateWithLifecycle()
    var selectedPestForModal by remember { mutableStateOf<PestCatalogItem?>(null) }

    BackHandler {
        viewModel.popBackStack()
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text("Biblioteca Fitosanitaria MIPE", fontWeight = FontWeight.Bold)
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
                .testTag("pest_catalog_screen"),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            item {
                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = { viewModel.pestSearchQuery.value = it },
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag("pest_search_input"),
                    placeholder = { Text("Buscar plaga, cultivo o síntoma...") },
                    leadingIcon = {
                        Icon(imageVector = Icons.Default.Search, contentDescription = "Buscar")
                    },
                    singleLine = true,
                    shape = RoundedCornerShape(12.dp)
                )
            }

            item {
                LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    val categories = listOf("TODOS", "PLAGA", "ENFERMEDAD")
                    items(categories) { cat ->
                        FilterChip(
                            selected = categoryFilter == cat,
                            onClick = { viewModel.pestCategoryFilter.value = cat },
                            label = { Text(cat, fontSize = 12.sp) }
                        )
                    }
                }
            }

            items(pests, key = { it.id }) { pest ->
                PestItemCard(
                    pest = pest,
                    onClick = { selectedPestForModal = pest }
                )
            }
        }
    }

    selectedPestForModal?.let { pest ->
        AlertDialog(
            onDismissRequest = { selectedPestForModal = null },
            title = {
                Column {
                    Text(pest.commonName, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                    Text(pest.scientificName, fontSize = 12.sp, fontStyle = androidx.compose.ui.text.font.FontStyle.Italic, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            },
            text = {
                LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    item { DetailRow("Categoría:", pest.category) }
                    item { DetailRow("Cultivos afectados:", pest.affectedCrops.joinToString(", ")) }
                    item { DetailRow("Órganos Diana:", pest.targetOrgans) }
                    item {
                        Spacer(modifier = Modifier.height(4.dp))
                        Text("Síntomas y Daño:", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        Text(pest.symptoms, fontSize = 12.sp)
                    }
                    item {
                        Spacer(modifier = Modifier.height(4.dp))
                        Text("Umbral de Daño Económico (UDE):", fontWeight = FontWeight.Bold, fontSize = 12.sp, color = VerdictCritical)
                        Text(pest.economicThreshold, fontSize = 12.sp)
                    }
                    item {
                        Spacer(modifier = Modifier.height(4.dp))
                        Text("Estrategia Cultural MIPE:", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        Text(pest.mipeCulturalStrategy, fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    item {
                        Spacer(modifier = Modifier.height(4.dp))
                        Text("Control Biológico Sugerido:", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        Text(pest.mipeBiologicalStrategy, fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    item {
                        Spacer(modifier = Modifier.height(4.dp))
                        Text("Solución Avgust Recomendada:", fontWeight = FontWeight.Bold, fontSize = 12.sp, color = AvgustGreenPrimary)
                        Text(pest.recommendedAvgustSolution, fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = AvgustGreenPrimary)
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = { selectedPestForModal = null }) {
                    Text("Cerrar")
                }
            }
        )
    }
}

@Composable
fun PestItemCard(
    pest: PestCatalogItem,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .testTag("pest_card_${pest.id}"),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
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
                Text(
                    text = pest.commonName,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Surface(
                    shape = RoundedCornerShape(6.dp),
                    color = if (pest.category == "PLAGA") Color(0xFFEF4444).copy(alpha = 0.12f) else Color(0xFF0284C7).copy(alpha = 0.12f)
                ) {
                    Text(
                        text = pest.category,
                        color = if (pest.category == "PLAGA") Color(0xFFEF4444) else Color(0xFF0284C7),
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                    )
                }
            }

            Text(
                text = pest.scientificName,
                fontSize = 11.sp,
                fontStyle = androidx.compose.ui.text.font.FontStyle.Italic,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = "Umbral: ${pest.economicThreshold}",
                fontSize = 11.sp,
                color = MaterialTheme.colorScheme.onSurface,
                maxLines = 2
            )

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = "Solución Avgust: ${pest.recommendedAvgustSolution}",
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                color = AvgustGreenPrimary
            )
        }
    }
}
