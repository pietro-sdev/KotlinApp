package com.example.project1882

// Remover a duplicata da classe Email, assumindo que ela já existe em outro arquivo.
import com.example.project1882.Email  // Certifique-se de importar a classe Email de onde foi definida corretamente

// Lista simulada de e-mails
val emails = mutableListOf(
    Email("Reunião", "Você tem uma reunião", "Alice"),
    Email("Projeto", "Atualização do projeto", "Bob")
)

// Função para listar e-mails
fun listEmails(): List<Email> {
    return emails
}

// Função para enviar um e-mail (simulação)
fun sendEmail(email: Email) {
    emails.add(email)
    println("Email enviado: ${email.subject}")
}

// Classe de evento do calendário
data class Appointment(val title: String, val date: String)

// Função para simular adição de eventos no calendário
fun addEventToCalendar(event: Appointment) {
    println("Evento adicionado: ${event.title} em ${event.date}")
}
