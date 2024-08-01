export const translateModelOfConsultation = (model) => {
  switch (model) {
    case "Remoto":
      return "remote"
    case "Presencial":
      return "presential"
    case "Monitoramento":
      return "monitoring"
    case "presential":
      return "Presencial"
    case "remote":
      return "Remoto"
    case "monitoring":
      return "Monitoramento"
  }
}