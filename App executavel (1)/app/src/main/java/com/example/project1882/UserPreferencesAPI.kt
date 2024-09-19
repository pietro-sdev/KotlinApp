package com.example.project1882

data class UserPreferences(
    val theme: String,  // Ex: "dark" ou "light"
    val colors: List<String>,  // Ex: ["blue", "green"]
    val categories: List<String>,  // Ex: ["Sports", "Technology"]
    val labels: List<String>  // Ex: ["Important", "Work"]
)

val userPreferencesDb = mutableMapOf<String, UserPreferences>()

// Função para buscar as preferências do usuário
fun getUserPreferences(userId: String): UserPreferences {
    return userPreferencesDb.getOrDefault(
        userId,
        UserPreferences("light", listOf("blue"), listOf("General"), listOf("Work"))
    )
}

// Função para atualizar as preferências do usuário
fun updateUserPreferences(userId: String, preferences: UserPreferences) {
    userPreferencesDb[userId] = preferences
}
