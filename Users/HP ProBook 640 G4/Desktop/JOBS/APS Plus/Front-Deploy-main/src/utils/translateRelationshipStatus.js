export const translateRelationshipStatus = (relationshipStatus) => {
  switch (relationshipStatus) {
    case "Casado(a)":
      return "married";
    case "Solteiro(a)":
      return "single";
    case "Separado(a)":
      return "separated";
    case "Divorciado(a)":
      return "divorced";
    case "Viúvo(a)":
      return "widdow";
    case "single":
      return "Solteiro(a)";
    case "married":
      return "Casado(a)";
    case "separated":
      return "Separado(a)";
    case "divorced":
      return "Divorciado(a)";
    case "widdow":
      return "Viúvo(a)";
    default:
      return "";
  }
}