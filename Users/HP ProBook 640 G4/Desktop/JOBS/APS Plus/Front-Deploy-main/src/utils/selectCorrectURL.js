import { ADMIN, SECRETARIA, PROFISSIONAL, PACIENTE } from "./constants"

export const SelectCorrectURL = (userType) => {
    if (userType === ADMIN) {
        return "admin"
    } else if (userType === SECRETARIA) {
        return "secretaria"
    } else if (userType === PROFISSIONAL) {
        return "profissional"
    } else if (userType === PACIENTE) {
        return "paciente"
    }
    return "login"
}