package com.example.project1882

data class UserSettings(  // Nome modificado
    val theme: String,  // Ex: "dark" ou "light"
    val colors: List<String>,  // Ex: ["blue", "green"]
    val categories: List<String>,  // Ex: ["Sports", "Technology"]
    val labels: List<String>  // Ex: ["Important", "Work"]
)

val userSettingsDb = mutableMapOf<String, UserSettings>()

// Função para buscar as configurações do usuário
fun getUserSettings(userId: String): UserSettings {
    return userSettingsDb.getOrDefault(userId, UserSettings("light", listOf("blue"), listOf("General"), listOf("Work")))
}

// Função para atualizar as configurações do usuário
fun updateUserSettings(userId: String, preferences: UserSettings) {
    userSettingsDb[userId] = preferences
}
