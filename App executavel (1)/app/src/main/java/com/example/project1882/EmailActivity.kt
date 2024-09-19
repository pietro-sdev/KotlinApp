package com.example.project1882

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import java.time.LocalDate

class EmailActivity : ComponentActivity() {
    private val viewModel: AppointmentViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            EmailScreen(viewModel)
        }
    }

    @SuppressLint("UnusedMaterialScaffoldPaddingParameter")
    @Composable
    fun EmailScreen(viewModel: AppointmentViewModel) {
        var newEmailSubject by remember { mutableStateOf("") }
        var newEmailDate by remember { mutableStateOf("") }
        var searchText by remember { mutableStateOf("") }

        val emails = remember {
            mutableListOf(
                Email("Lembrete de reunião", "Você tem uma reunião às 10h.\n", "Alice"),
                Email("Atualização do projeto", "O projeto está no caminho certo.", "Bob"),
                Email("Convite para almoço", "Você gostaria de participar do almoço?", "Charlie"),
                Email("Detalhes do evento", "Aqui estão os detalhes do próximo evento.", "David"),
                Email("Newsletter", "A newsletter deste mês já saiu.", "Eve")
            )
        }

        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text(text = "Emails") },
                    backgroundColor = Color(android.graphics.Color.parseColor("#EA6D35")),
                    contentColor = Color.White
                )
            },
            content = {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        OutlinedTextField(
                            value = searchText,
                            onValueChange = { searchText = it },
                            placeholder = { Text("Procurar e-mails") },
                            modifier = Modifier.weight(1f)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        IconButton(
                            onClick = { }
                        ) {
                            Icon(
                                painter = painterResource(id = R.drawable.ic_search),
                                contentDescription = "Search Icon"
                            )
                        }
                    }
                    Spacer(modifier = Modifier.height(16.dp))
                    LazyColumn(
                        modifier = Modifier.weight(1f),
                        contentPadding = PaddingValues(8.dp)
                    ) {
                        items(emails.filter {
                            it.subject.contains(searchText, ignoreCase = true) ||
                                    it.body.contains(searchText, ignoreCase = true) ||
                                    it.sender.contains(searchText, ignoreCase = true)
                        }) { email ->
                            EmailItem(email, onSenderClicked = {
                                // Ao clicar no nome do remetente, adiciona o nome automaticamente
                                newEmailSubject = email.subject
                            })
                        }
                    }
                    Spacer(modifier = Modifier.height(16.dp))
                    OutlinedTextField(
                        value = newEmailSubject,
                        onValueChange = { newEmailSubject = it },
                        placeholder = { Text("Digite o assunto") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = newEmailDate,
                        onValueChange = { newEmailDate = it },
                        placeholder = { Text("Insira a data (dd/MM/yyyy)") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Button(
                        onClick = {
                            if (newEmailSubject.isNotBlank() && newEmailDate.isNotBlank()) {
                                // Convertendo a string para LocalDate
                                val dateParts = newEmailDate.split("/")
                                if (dateParts.size == 3) {
                                    val day = dateParts[0].toIntOrNull() ?: return@Button
                                    val month = dateParts[1].toIntOrNull() ?: return@Button
                                    val year = dateParts[2].toIntOrNull() ?: return@Button
                                    val newAppointment = Appointment(
                                        newEmailSubject,
                                        LocalDate.of(year, month, day).toString()
                                    )

                                    // Adiciona o novo Appointment ao ViewModel
                                    viewModel.addAppointment(newAppointment)

                                    // Limpa os campos após a adição
                                    newEmailSubject = ""
                                    newEmailDate = ""
                                }
                            }
                        },
                        modifier = Modifier.align(Alignment.End)
                            .padding(bottom = 16.dp)
                            .padding(horizontal = 16.dp)
                            .height(48.dp),
                        shape = MaterialTheme.shapes.medium,
                        colors = ButtonDefaults.buttonColors(
                            backgroundColor = Color(android.graphics.Color.parseColor("#EA6D35")),
                            contentColor = Color.White
                        )
                    ) {
                        Text("Enviar Email")
                    }

                }
            }
        )
    }


    @Composable
    fun EmailItem(email: Email, onSenderClicked: () -> Unit) {
        Card(
            backgroundColor = Color.White,
            elevation = 4.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier
                    .padding(16.dp)
                    .fillMaxWidth()
                    .clickable(onClick = onSenderClicked)
            ) {
                Text(
                    text = email.sender,
                    fontWeight = MaterialTheme.typography.subtitle1.fontWeight,
                    fontSize = 18.sp,
                    color = Color(android.graphics.Color.parseColor("#EA6D35"))
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = email.subject,
                    fontWeight = MaterialTheme.typography.subtitle2.fontWeight,
                    fontSize = 16.sp,
                    color = Color(android.graphics.Color.parseColor("#3b608c"))
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = email.body,
                    fontSize = 14.sp,
                    color = Color.Gray
                )
            }
        }
    }
}

