package com.example.project1882

// Contador de envios de e-mails por usuário
val emailSendCount = mutableMapOf<String, Int>()

data class Email(val subject: String, val body: String, val sender: String)

// Função para simular envio de e-mails com controle de spam
fun sendEmailWithSpamCheck(email: Email) {
    val userId = email.sender // Simulação do ID do usuário que enviou o e-mail
    val currentCount = emailSendCount.getOrDefault(userId, 0)

    if (currentCount >= 10) {
        println("Erro: Limite de envio de e-mails atingido para o usuário $userId. Tente novamente mais tarde.")
    } else {
        emailSendCount[userId] = currentCount + 1
        println("E-mail enviado: ${email.subject} por $userId")
    }
}

// Função para resetar o contador de envio de e-mails (se necessário)
fun resetEmailCount(userId: String) {
    emailSendCount[userId] = 0
}
