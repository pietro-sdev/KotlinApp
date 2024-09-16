package com.example.project1882

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Switch
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModel
import com.example.project1882.ui.theme.Project1882Theme

class SettingsActivity : ComponentActivity() {
    private val viewModel: SettingsViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            var isDarkTheme by rememberSaveable { mutableStateOf(viewModel.isDarkTheme) }

            Project1882Theme(darkTheme = isDarkTheme) {
                SettingsScreen(
                    viewModel = viewModel,
                    onThemeChange = { isDarkTheme = it }
                )
            }
        }
    }
}

class SettingsViewModel : ViewModel() {
    var userName by mutableStateOf("Nome de Usuário")
    var isDarkTheme by mutableStateOf(false)
    var notificationsEnabled by mutableStateOf(true)
}

@Composable
fun SettingsScreen(
    viewModel: SettingsViewModel,
    onThemeChange: (Boolean) -> Unit
) {
    var userName by remember { mutableStateOf(TextFieldValue(viewModel.userName)) }
    var isDarkTheme by remember { mutableStateOf(viewModel.isDarkTheme) }
    var notificationsEnabled by remember { mutableStateOf(viewModel.notificationsEnabled) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Top,
        horizontalAlignment = Alignment.Start
    ) {
        Text(text = "Configurações", style = MaterialTheme.typography.h4, modifier = Modifier.padding(bottom = 16.dp))

        // User Name Setting
        Text(text = "Nome de Usuário", style = MaterialTheme.typography.h6)
        BasicTextField(
            value = userName,
            onValueChange = {
                userName = it
                viewModel.userName = it.text
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp)
                .background(MaterialTheme.colors.surface, shape = MaterialTheme.shapes.small)
                .padding(16.dp)
        )

        // Dark Theme Setting
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(vertical = 8.dp)
        ) {
            Text(text = "Dark Theme", style = MaterialTheme.typography.h6)
            Spacer(modifier = Modifier.weight(1f))
            Switch(
                checked = isDarkTheme,
                onCheckedChange = {
                    isDarkTheme = it
                    viewModel.isDarkTheme = it
                    onThemeChange(it)
                }
            )
        }

        // Notifications Setting
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(vertical = 8.dp)
        ) {
            Text(text = "Ativar notificações", style = MaterialTheme.typography.h6)
            Spacer(modifier = Modifier.weight(1f))
            Switch(
                checked = notificationsEnabled,
                onCheckedChange = {
                    notificationsEnabled = it
                    viewModel.notificationsEnabled = it
                }
            )
        }

        // Save Button
        Spacer(modifier = Modifier.height(24.dp))
        Button(
            onClick = {
                // Save action or additional logic here
            },
            modifier = Modifier.align(Alignment.End)
        ) {
            Text("Salvar")
        }
    }
}

