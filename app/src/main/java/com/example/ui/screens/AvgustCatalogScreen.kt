package com.example.ui.screens

import androidx.activity.compose.BackHandler
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
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.model.AvgustProductItem
import com.example.ui.components.AvgustProductCard
import com.example.ui.theme.AvgustGreenPrimary
import com.example.ui.viewmodel.MipeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AvgustCatalogScreen(
    viewModel: MipeViewModel,
    modifier: Modifier = Modifier
) {
    val products by viewModel.filteredProducts.collectAsStateWithLifecycle()
    val searchQuery by viewModel.productSearchQuery.collectAsStateWithLifecycle()
    val categoryFilter by viewModel.productCategoryFilter.collectAsStateWithLifecycle()
    var selectedProductForModal by remember { mutableStateOf<AvgustProductItem?>(null) }

    BackHandler {
        viewModel.popBackStack()
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text("Portafolio Avgust Crop Protection", fontWeight = FontWeight.Bold)
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
                .testTag("avgust_catalog_screen"),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            item {
                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = { viewModel.productSearchQuery.value = it },
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag("product_search_input"),
                    placeholder = { Text("Buscar producto, plaga o ingrediente activo...") },
                    leadingIcon = {
                        Icon(imageVector = Icons.Default.Search, contentDescription = "Buscar")
                    },
                    singleLine = true,
                    shape = RoundedCornerShape(12.dp)
                )
            }

            item {
                LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    val categories = listOf("TODOS", "FUNGICIDA", "INSECTICIDA", "HERBICIDA", "COADYUVANTE")
                    items(categories) { cat ->
                        FilterChip(
                            selected = categoryFilter == cat,
                            onClick = { viewModel.productCategoryFilter.value = cat },
                            label = { Text(cat, fontSize = 12.sp) }
                        )
                    }
                }
            }

            items(products, key = { it.id }) { prod ->
                AvgustProductCard(
                    product = prod,
                    onClick = { selectedProductForModal = prod }
                )
            }
        }
    }

    selectedProductForModal?.let { prod ->
        AlertDialog(
            onDismissRequest = { selectedProductForModal = null },
            title = {
                Column {
                    Text(prod.tradeName, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                    Text(prod.formulation, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            },
            text = {
                LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    item { DetailRow("Ingrediente Activo:", prod.activeIngredient) }
                    item { DetailRow("Categoría:", prod.category) }
                    item { DetailRow("Código MOA:", prod.moaCode, highlight = true) }
                    item { DetailRow("Dosis Estándar:", prod.standardDose, highlight = true) }
                    item { DetailRow("Periodo Reingreso (PR):", "${prod.reEntryPeriodHours} horas") }
                    item { DetailRow("Carencia (PC):", "${prod.preHarvestIntervalDays} días") }
                    item {
                        Spacer(modifier = Modifier.height(4.dp))
                        Text("Cultivos Diana:", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        Text(prod.targetCrops.joinToString(", "), fontSize = 12.sp)
                    }
                    item {
                        Spacer(modifier = Modifier.height(4.dp))
                        Text("Blanco Biológico:", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        Text(prod.targetPests.joinToString("\n• ", prefix = "• "), fontSize = 12.sp)
                    }
                    item {
                        Spacer(modifier = Modifier.height(4.dp))
                        Text("Consejos de Mezcla & Calidad:", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        Text(prod.compatibilityTips, fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = { selectedProductForModal = null }) {
                    Text("Cerrar")
                }
            }
        )
    }
}
