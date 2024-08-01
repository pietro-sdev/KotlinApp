export const translateSex = (sex) => {
  switch (sex) {
    case "Masculino":
      return "male";
    case "Feminino":
      return "female";
    case "Outro":
      return "other";
    case "male":
      return "Masculino";
    case "female":
      return "Feminino";
    case "other":
      return "Outro";
  }
};
