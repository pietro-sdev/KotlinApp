package com.example.project1882

import android.app.DatePickerDialog
import android.content.Context
import android.os.Build
import android.os.Bundle
import android.view.ContextThemeWrapper
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.annotation.RequiresApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.MaterialTheme
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChevronLeft
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.YearMonth
import java.time.format.TextStyle
import java.util.Locale

@RequiresApi(Build.VERSION_CODES.O)
class CalendarActivity : ComponentActivity() {
    private val viewModel: AppointmentViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CalendarScreen(viewModel, this) // Passando o contexto da Activity
        }
    }
}

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun CalendarScreen(viewModel: AppointmentViewModel, context: Context) {
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colors.background
    ) {
        var selectedDate by remember { mutableStateOf(LocalDate.now()) }

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Top
        ) {
            val currentMonth = remember { mutableStateOf(YearMonth.now()) }
            Text(
                text = currentMonth.value.month.getDisplayName(TextStyle.FULL, Locale.getDefault()),
                style = MaterialTheme.typography.h4,
                color = Color.Black
            )
            Spacer(modifier = Modifier.height(8.dp))

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                IconButton(
                    onClick = {
                        currentMonth.value = currentMonth.value.minusMonths(1)
                    }
                ) {
                    Icon(
                        imageVector = Icons.Default.ChevronLeft,
                        contentDescription = "Previous Month"
                    )
                }
                Text(
                    text = currentMonth.value.year.toString(),
                    style = MaterialTheme.typography.h6,
                    color = Color.Black
                )
                IconButton(
                    onClick = {
                        currentMonth.value = currentMonth.value.plusMonths(1)
                    }
                ) {
                    Icon(
                        imageVector = Icons.Default.ChevronRight,
                        contentDescription = "Próximo Mês"
                    )
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            // DatePickerDialog
            DatePickerDialog(context, selectedDate) { newDate ->
                selectedDate = newDate
                currentMonth.value = YearMonth.from(newDate)
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Calendar Grid
            CalendarGrid(currentMonth = currentMonth.value, selectedDate = selectedDate, appointments = viewModel.appointments.observeAsState(listOf()).value)
        }
    }
}

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun DatePickerDialog(context: Context, selectedDate: LocalDate, onDateSelected: (LocalDate) -> Unit) {
    var expanded by remember { mutableStateOf(false) }

    OutlinedTextField(
        value = selectedDate.toString(),
        onValueChange = { /* No-op */ },
        readOnly = true,
        label = { Text("Selecione a Data") },
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        trailingIcon = {
            IconButton(onClick = { expanded = true }) {
                Icon(Icons.Default.DateRange, contentDescription = "Selecione a Data")
            }
        }
    )

    if (expanded) {
        val datePicker = DatePickerDialog(
            context,
            { _, year, month, dayOfMonth ->
                val newDate = LocalDate.of(year, month + 1, dayOfMonth)
                onDateSelected(newDate)
                expanded = false
            },
            selectedDate.year,
            selectedDate.monthValue - 1,
            selectedDate.dayOfMonth
        )
        datePicker.show()
    }
}

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun CalendarGrid(currentMonth: YearMonth, selectedDate: LocalDate, appointments: List<Appointment>) {
    val daysOfWeek = daysOfWeekFromLocale()
    val daysInMonth = currentMonth.lengthOfMonth()
    val firstDayOfWeek = currentMonth.atDay(1).dayOfWeek.value

    // Group days by week rows
    val daysList = mutableListOf<List<Int>>()
    var currentWeek = mutableListOf<Int>()

    for (day in 1..daysInMonth) {
        val dayOfWeek = currentMonth.atDay(day).dayOfWeek.value

        if (dayOfWeek == DayOfWeek.MONDAY.value && currentWeek.isNotEmpty()) {
            daysList.add(currentWeek)
            currentWeek = mutableListOf()
        }

        currentWeek.add(day)
    }

    // Add last week
    if (currentWeek.isNotEmpty()) {
        daysList.add(currentWeek)
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color.White, shape = CircleShape)
    ) {
        // Item for days of the week
        item {
            Row(modifier = Modifier.fillMaxWidth()) {
                daysOfWeek.forEach { day ->
                    Text(
                        text = day,
                        modifier = Modifier
                            .weight(1f)
                            .padding(8.dp),
                        color = Color.Black,
                        style = MaterialTheme.typography.subtitle2,
                        textAlign = TextAlign.Center
                    )
                }
            }
        }

        // Items for days in the month
        itemsIndexed(daysList) { index, week ->
            Row(modifier = Modifier.fillMaxWidth()) {
                week.forEach { day ->
                    val date = LocalDate.of(currentMonth.year, currentMonth.monthValue, day)
                    val appointment = appointments.find { LocalDate.parse(it.date) == date } // Parse string to LocalDate
                    CalendarDay(day = day, isSelected = date == selectedDate, appointment = appointment)
                }
                // Fill remaining columns in the row if less than 7 days
                val remainingEmptyCells = 7 - week.size
                repeat(remainingEmptyCells) {
                    Spacer(modifier = Modifier.weight(1f))
                }
            }
        }
    }
}

@Composable
fun CalendarDay(day: Int, isSelected: Boolean, appointment: Appointment?) {
    val backgroundColor = if (isSelected) Color.Gray else Color.White
    val contentColor = if (isSelected) Color.White else Color.Black

    Box(
        modifier = Modifier
            .fillMaxWidth() // Garante que o Box ocupe toda a largura dentro do Row
            .aspectRatio(1f)
            .padding(4.dp)
            .background(backgroundColor, shape = CircleShape),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = if (day != 0) day.toString() else "",
                color = contentColor,
                style = MaterialTheme.typography.body1,
                modifier = Modifier.padding(4.dp)
            )
            if (appointment != null) {
                Text(
                    text = appointment.title,
                    color = Color.Red,
                    style = MaterialTheme.typography.body2,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.padding(top = 4.dp)
                )
            }
        }
    }
}

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun daysOfWeekFromLocale(): List<String> {
    val days = mutableListOf<String>()
    for (dayOfWeek in DayOfWeek.values()) {
        val displayName = dayOfWeek.getDisplayName(TextStyle.SHORT, Locale.getDefault())
        days.add(displayName)
    }
    return days
}

@RequiresApi(Build.VERSION_CODES.O)
@Preview(showBackground = true)
@Composable
fun PreviewCalendar() {
    CalendarScreen(viewModel = AppointmentViewModel(), context = ContextThemeWrapper(ContextThemeWrapper(), R.style.Theme_Project1882)) // Exemplo de contexto para o preview
}
