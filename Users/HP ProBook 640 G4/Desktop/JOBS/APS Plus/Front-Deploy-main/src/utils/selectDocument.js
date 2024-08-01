export const selectDocument = (data) => {
    if (data == "Médico(a)") {
        return "CRM"
    }else if (data == "Enfermeiro(a)") {
        return "COREN"
    }else if (data == "Nutricionista") {
        return "CRN"
    }else if (data == "Psicólogo(a)") {
        return "CRP"
    }else if (data == "Educador(a) Físico") {
        return "CREF"
    }else if (data == "Assistente Social") {
        return "CRESS"
    }else{
        return ""
    }
}