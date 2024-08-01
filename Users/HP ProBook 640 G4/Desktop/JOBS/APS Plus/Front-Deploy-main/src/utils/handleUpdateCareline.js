import api from "../services/api"
import { translateRelationshipStatus } from "./translateRelationshipStatus"
import { translateSex } from "./translateSex";

export default async function handleUpdateCareline(setValues, values, updates) {
  const id = values._id ?? values.patient_id;
  const editPaciente = (id) => {
    api
      .patch("/user/" + id, {
        email: values.email,
        password: values.password,
        name: values.name,
        nick: values.nick,
        race: values.race,
        sex: translateSex(values.sex),
        possuiCPF: values.possuiCPF,
        CPF: values.CPF,
        RG: values.RG,
        dateBirth: values.dateBirth,
        contactNumber: values.contactNumber,
        address: {
          street: values.street,
          CEP: values.CEP,
          city: values.city,
          UF: values.UF,
        },
        company: values.company,
        profession: values.profession,
        isPatient: true,
        isEmployee: false,
        patient: {
          relationshipStatus: translateRelationshipStatus(
            values.relationshipStatus
          ),
          guardianName: values.guardianName,
          guardianRelationship: values.guardianRelationship,
          insurance: values.insurance,
          insurancePlan: values.insurancePlan,
          insuranceNumber: values.insuranceNumber,
          insuranceDependency: values.insuranceDependency,
          insuranceExpirationDate: values.insuranceExpirationDate,
          activeProblems: values.activeProblems,
          personalAntecedents: values.personalAntecedents,
          familyAntecedents: values.familyAntecedents,
          progressTreatment: values.progressTreatment,
          allergies: values.allergies,
          attachments: values.attachments,
          notes: values.notes,
          careLineName: updates.careLineName,
          careLineStatus: updates.careLineStatus,
          careLineTag: updates.careLineTag,
          exames: values.exames
        },
      })
      .then((res) => {
        console.log("updated success")
      })
      .catch((err) => {
        console.log(err);
      })
  };

  editPaciente(id)

  setValues({
    ...values,
    careLineName: updates.careLineName,
    careLineStatus: updates.careLineStatus,
    careLineTag: updates.careLineTag
  })
}