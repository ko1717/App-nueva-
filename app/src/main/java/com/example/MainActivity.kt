package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddCircle
import androidx.compose.material.icons.filled.Assessment
import androidx.compose.material.icons.filled.BugReport
import androidx.compose.material.icons.filled.Calculate
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.ui.screens.AuditDetailScreen
import com.example.ui.screens.AvgustCatalogScreen
import com.example.ui.screens.DashboardScreen
import com.example.ui.screens.FarmLotsScreen
import com.example.ui.screens.NewAuditScreen
import com.example.ui.screens.PestCatalogScreen
import com.example.ui.screens.SprayCalculatorScreen
import com.example.ui.theme.AvgustGreenPrimary
import com.example.ui.theme.AvgustMipeTheme
import com.example.ui.viewmodel.AppScreen
import com.example.ui.viewmodel.MipeViewModel

class MainActivity : ComponentActivity() {

    private val viewModel: MipeViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            AvgustMipeTheme {
                AvgustMipeApp(viewModel = viewModel)
            }
        }
    }
}

@Composable
fun AvgustMipeApp(viewModel: MipeViewModel) {
    val currentScreen by viewModel.currentScreen.collectAsStateWithLifecycle()

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {
            // Show bottom navigation on primary screens
            if (currentScreen != AppScreen.NEW_AUDIT && currentScreen != AppScreen.AUDIT_DETAIL) {
                NavigationBar(
                    modifier = Modifier
                        .windowInsetsPadding(WindowInsets.navigationBars)
                        .testTag("avgust_bottom_navigation")
                ) {
                    NavigationBarItem(
                        selected = currentScreen == AppScreen.DASHBOARD,
                        onClick = { viewModel.navigateTo(AppScreen.DASHBOARD) },
                        icon = { Icon(imageVector = Icons.Default.Home, contentDescription = "Inicio") },
                        label = { Text("Inicio", fontSize = 11.sp) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = AvgustGreenPrimary,
                            indicatorColor = AvgustGreenPrimary.copy(alpha = 0.15f)
                        )
                    )

                    NavigationBarItem(
                        selected = currentScreen == AppScreen.NEW_AUDIT,
                        onClick = {
                            viewModel.resetDraft()
                            viewModel.navigateTo(AppScreen.NEW_AUDIT)
                        },
                        icon = { Icon(imageVector = Icons.Default.AddCircle, contentDescription = "Asegurar") },
                        label = { Text("Asegurar", fontSize = 11.sp) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = AvgustGreenPrimary,
                            indicatorColor = AvgustGreenPrimary.copy(alpha = 0.15f)
                        )
                    )

                    NavigationBarItem(
                        selected = currentScreen == AppScreen.SPRAY_CALCULATOR,
                        onClick = { viewModel.navigateTo(AppScreen.SPRAY_CALCULATOR) },
                        icon = { Icon(imageVector = Icons.Default.Calculate, contentDescription = "Calibración") },
                        label = { Text("Calibrar", fontSize = 11.sp) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = AvgustGreenPrimary,
                            indicatorColor = AvgustGreenPrimary.copy(alpha = 0.15f)
                        )
                    )

                    NavigationBarItem(
                        selected = currentScreen == AppScreen.AVGUST_CATALOG,
                        onClick = { viewModel.navigateTo(AppScreen.AVGUST_CATALOG) },
                        icon = { Icon(imageVector = Icons.Default.Shield, contentDescription = "Avgust") },
                        label = { Text("Avgust", fontSize = 11.sp) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = AvgustGreenPrimary,
                            indicatorColor = AvgustGreenPrimary.copy(alpha = 0.15f)
                        )
                    )

                    NavigationBarItem(
                        selected = currentScreen == AppScreen.FARM_LOTS,
                        onClick = { viewModel.navigateTo(AppScreen.FARM_LOTS) },
                        icon = { Icon(imageVector = Icons.Default.LocationOn, contentDescription = "Lotes") },
                        label = { Text("Lotes", fontSize = 11.sp) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = AvgustGreenPrimary,
                            indicatorColor = AvgustGreenPrimary.copy(alpha = 0.15f)
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            AnimatedContent(
                targetState = currentScreen,
                transitionSpec = { fadeIn() togetherWith fadeOut() },
                label = "screen_transition"
            ) { screen ->
                when (screen) {
                    AppScreen.DASHBOARD -> DashboardScreen(viewModel = viewModel)
                    AppScreen.NEW_AUDIT -> NewAuditScreen(viewModel = viewModel)
                    AppScreen.AUDIT_DETAIL -> AuditDetailScreen(viewModel = viewModel)
                    AppScreen.SPRAY_CALCULATOR -> SprayCalculatorScreen(viewModel = viewModel)
                    AppScreen.AVGUST_CATALOG -> AvgustCatalogScreen(viewModel = viewModel)
                    AppScreen.PEST_CATALOG -> PestCatalogScreen(viewModel = viewModel)
                    AppScreen.FARM_LOTS -> FarmLotsScreen(viewModel = viewModel)
                }
            }
        }
    }
}
