export const SelectTag = (careLineName) => {
  let tags = [];
  switch (careLineName) {
    case "Saúde da criança":
      tags = ["0 a 2 anos", "2 a 7 anos", "7 a 12 anos", "12 a 16 anos", ''];
      break;
    case "Saúde da mulher":
      tags = [
        "Saúde Sexual E Reprodutiva",
        "O Enfrentamento À Violência Doméstica E Violência Sexual",
        "Atenção Ao Câncer De Mama E Colo Do Útero",
        ''
      ];
      break;
    case "Pré-natal":
      tags = [
        "Fase Gestacional - 1º Trimestre",
        "Fase Gestacional - 2º Trimestre",
        "Fase Gestacional - 3º Trimestre",
        "Risco Gestacional - Baixo",
        "Risco Gestacional - Alto",
        ''
      ];
      break;
    case "HAS e alterações cardiovasculares":
      tags = [
        "Risco cardiovascular - Baixo (<10%)",
        "Risco cardiovascular - Alto (>20%)",
        "Risco cardiovascular - Médio (10 a 19.9%)",
        ''
      ];
      break;
    case "DM e alteracões metabólicas":
      tags = [
        "Diabetes Tipo I",
        "Diabetes Tipo II",
        "Insulino Dependente",
        "Não Insulino Dependente",
        "Pré-Diabetes",
        ''
      ];
      break;
    case "Mudança de hábitos":
      tags = ["Obesidade", "Sedentarismo", "Tabagismo", ''];
      break;
    case "Saúde mental":
      tags = [
        "Transtornos de Humor",
        "Transtornos de Ansiedade",
        "Transtornos de Personalidade",
        "Transtornos Psicóticos",
        "Demência",
        "Etilismo",
        "Abuso de drogas",
        ''
      ];
      break;
    case "Alterações respiratórias":
      tags = ["Asma", "DPOC", "Síndrome Gripal", "Covid-19", ''];
      break;
    case "Pós alta":
      tags = ["Pós-operatório", "Internação Clínica", ''];
      break;
    case "Saúde do idoso":
      tags = ["Idoso Robusto", "Idoso em risco de Fragilidade", "Idoso Frágil", ''];
      break;
    case "Alterações crônicas":
      tags = [
        "Osteomusculares",
        "HIV",
        "Câncer",
        "Insuficiência renal crônica",
        ''
      ];
      break;
    case "Vida saudável":
      tags = ["Saúde do Homem", ''];
      break;
    case "Afecções Emergentes e Reemergentes":
      tags = ["Dengue", "Málaria", "Hepatites", "ISTS", "Varíola dos macacos", ''];
      break;
    default:
      tags = [''];
      break;
  }

  return tags;
};
