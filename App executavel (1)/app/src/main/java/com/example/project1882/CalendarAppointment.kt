package com.example.project1882
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

data class CalendarAppointment(val title: String, val date: String)

class AppointmentViewModel : ViewModel() {
    private val _appointments = MutableLiveData<List<Appointment>>(listOf())
    val appointments: LiveData<List<Appointment>> get() = _appointments

    fun addAppointment(appointment: Appointment) {
        _appointments.value = _appointments.value?.plus(appointment)
    }
}