import React from "react";
import styles from "./editarPaciente.module.css";
import InputField from "../../../components/input_field/index";
import { useState, useEffect } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import MaskedInput from "../../../components/masked_input";
import imageSource from './logoMobile.png';
import {
  Button,
  Stack,
  Box,
  Divider,
  Typography,
  Link,
  Grid,
  TextField,
} from "@mui/material";
import StyledButton from "../../../components/button/index";
import PopUp from "../../../components/pop_up";
import AccordionProntuario from "../../../components/accordion_prontuario";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Aside from "../../../components/aside_prontuario";
import api from "../../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { translateSex, translateRelationshipStatus } from "../../../utils";
import StyledLink from "../../../components/link";
import { getAge } from "../../../utils";
import handleUpdateCareline from "../../../utils/handleUpdateCareline";
import fileDownload from "js-file-download";
import { pdf, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';

export default function EditPacienteProfissional() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient_id = location.state ? location.state.patient_id : undefined;
  const initialAba = location.state ? location.state.aba : 0;  // Definindo a aba inicial
  const [component, setComponent] = useState(null);
  const [aba, setAba] = useState(initialAba);  // Usando a aba inicial do estado
  const [openPopUpInativ, setOpenPopUpInativ] = useState(false);
  const [openPopUpEdit, setOpenPopUpEdit] = useState(false);
  const [openStatusOKPopUp, setOpenStatusOKPopUp] = useState(false);
  const [openStatusOKInativPopUp, setOpenStatusOKInativPopUp] = useState(false);
  const [openStatusErrPopUp, setOpenStatusErrPopUp] = useState(false);
  const [openPopUpNew, setOpenPopUpNew] = useState(false);
  const [meets, setMeets] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [examName, setExamName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [listaExames, setListaExames] = useState(null);
  const [values, setValues] = useState({
    isActive: true,
    email: "",
    password: "",
    name: "",
    nick: "",
    race: "",
    sex: "",
    possuiCPF: "Sim",
    CPF: "",
    RG: "",
    dateBirth: "",
    contactNumber: "",
    street: "",
    CEP: "",
    city: "",
    UF: "",
    company: "",
    profession: "",
    isFired: false,
    isPatient: true,
    isEmployee: false,
    relationshipStatus: "",
    guardianName: "",
    guardianRelationship: "",
    insurance: "",
    insuranceNumber: "",
    insuranceDependency: "",
    insurancePlan: "",
    insuranceExpirationDate: "",
    activeProblems: "",
    personalAntecedents: "",
    familyAntecedents: "",
    progressTreatment: "",
    allergies: "",
    attachments: "",
    notes: "",
    careLineName: "",
    careLineStatus: "",
    careLineTag: "",
    exames: []
  });

  // API calls
  const getOldInfos = () => {
    const url = `/user/` + patient_id;
    api.get(url)
      .then((response) => {
        let data = response.data;
        if (!!data.dateBirth) {
          data.dateBirth = new Date(data.dateBirth);
          data.dateBirth = data.dateBirth.toISOString().split("T")[0];
        }
        if (!!data.patient) {
          setValues({
            _id: patient_id,
            email: !!data.email ? data.email : "",
            name: !!data.name ? data.name : "",
            nick: !!data.nick ? data.nick : "",
            race: !!data.race ? data.race : "",
            sex: !!data.sex ? translateSex(data.sex) : "",
            possuiCPF: !!data.possuiCPF ? data.possuiCPF : "Sim",
            CPF: !!data.CPF ? data.CPF : "",
            RG: !!data.RG ? data.RG : "",
            dateBirth: !!data.dateBirth ? data.dateBirth : "",
            contactNumber: !!data.contactNumber ? data.contactNumber : "",
            street: !!data.address ? !!data.address.street ? data.address.street : "" : "",
            CEP: !!data.address ? !!data.address.CEP ? data.address.CEP : "" : "",
            city: !!data.address ? !!data.address.city ? data.address.city : "" : "",
            UF: !!data.address ? !!data.address.UF ? data.address.UF : "" : "",
            profession: !!data.profession ? data.profession : "",
            relationshipStatus: !!data.patient.relationshipStatus ? translateRelationshipStatus(data.patient.relationshipStatus) : "",
            insurance: !!data.patient.insurance ? data.patient.insurance : "",
            insurancePlan: !!data.patient.insurancePlan ? data.patient.insurancePlan : "",
            insuranceNumber: !!data.patient.insuranceNumber ? data.patient.insuranceNumber : "",
            insuranceDependency: !!data.patient.insuranceDependency ? data.patient.insuranceDependency : "",
            activeProblems: !!data.patient.activeProblems ? data.patient.activeProblems : "",
            personalAntecedents: !!data.patient.personalAntecedents ? data.patient.personalAntecedents : "",
            familyAntecedents: !!data.patient.familyAntecedents ? data.patient.familyAntecedents : "",
            progressTreatment: !!data.patient.progressTreatment ? data.patient.progressTreatment : "",
            allergies: !!data.patient.allergies ? data.patient.allergies : "",
            attachments: !!data.patient.attachments ? data.patient.attachments : "",
            notes: !!data.patient.notes ? data.patient.notes : "",
            careLineName: !!data.patient.careLineName ? data.patient.careLineName : "",
            careLineStatus: !!data.patient.careLineStatus ? data.patient.careLineStatus : "",
            careLineTag: !!data.patient.careLineTag ? data.patient.careLineTag : "",
            exames: !!data.patient.exames ? data.patient.exames : [],
          });
        } else {
          setValues({
            _id: patient_id,
            email: !!data.email ? data.email : "",
            name: !!data.name ? data.name : "",
            nick: !!data.nick ? data.nick : "",
            race: !!data.race ? data.race : "",
            sex: !!data.sex ? translateSex(data.sex) : "",
            possuiCPF: !!data.possuiCPF ? data.possuiCPF : "Sim",
            CPF: !!data.CPF ? data.CPF : "",
            RG: !!data.RG ? data.RG : "",
            dateBirth: !!data.dateBirth ? data.dateBirth : "",
            contactNumber: !!data.contactNumber ? data.contactNumber : "",
            street: !!data.address ? !!data.address.street ? data.address.street : "" : "",
            CEP: !!data.address ? !!data.address.CEP ? data.address.CEP : "" : "",
            city: !!data.address ? !!data.address.city ? data.address.city : "" : "",
            UF: !!data.address ? !!data.address.UF ? data.address.UF : "" : "",
            profession: !!data.profession ? data.profession : "",
            exames: !!data.patient.exames ? data.patient.exames : [],
          });
        }
        getMeets(patient_id);
      })
      .catch((e) => console.log(e));
  };

  const editPaciente = () => {
    if (!!values._id) {
      api.patch("/user/" + values._id, {
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
          relationshipStatus: translateRelationshipStatus(values.relationshipStatus),
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
          careLineName: values.careLineName,
          careLineStatus: values.careLineStatus,
          careLineTag: values.careLineTag,
          exames: values.exames
        },
      })
      .then((res) => {
        handleCloseEdit();
        handleClickOpenStatusOKPopUp();
      })
      .catch((err) => {
        console.log(err);
        handleCloseEdit();
        handleClickOpenStatusErrPopUp();
      })
    }
  };

  const getMeets = (id) => {
    api.get(`/record/${id}/meets`)
      .then((resp) => {
        let resp_data = Object.entries(resp)[0][1].map((e) => {
          return (
            <AccordionProntuario
              patient={{ name: values.nick ?? values.name, CPF: values.possuiCPF == 'Sim' ? values.CPF : "Paciente não possuí CPF" }}
              diagnosis={e.diagnosis}
              info={e.info}
              exames={e.exames}
              objective={e.objective}
              plan={e.plan}
              subjective={e.subjective}
              inicio={e.inicio}
              fim={e.fim}
              tipo={e.tipo}
            />
          );
        });
        setMeets(resp_data.reverse());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const inativPaciente = () => {
    if (!!values._id) {
      api.patch("/user/" + values._id, {
        isActive: false,
      })
      .catch((err) => {
        console.log(err);
        handleCloseInativ();
        handleClickOpenStatusErrPopUp();
      })
      .then(() => {
        handleCloseInativ();
        handleClickOpenStatusOKPopUp();
      });
    }
  };

  const recoverExams = () => {
    if (!!values._id) {
      api.post(`/recover/exams/` + patient_id)
        .then(resp => setListaExames(resp.data))
        .catch(err => console.log(err))
    }
  }

  // Popup event handlers
  const handleClickOpenInativ = (e) => {
    setOpenPopUpInativ(false);
    setValues({ ...values, isActive: false });
    editPaciente(e);
  };

  const handleCloseInativ = () => {
    setOpenPopUpInativ(false);
  };

  const handleClickOpenEdit = (e) => {
    setOpenPopUpEdit(false);
    editPaciente(e);
  };

  const handleCloseEdit = () => {
    setOpenPopUpEdit(false);
  };

  const handleClickOpenNew = () => {
    setOpenPopUpNew(false);
    navigate(`/profissional/addprontuario`, {
      state: { patient_id: patient_id },
    });
  };

  const handleCloseNew = () => {
    setOpenPopUpNew(false);
  };

  const handleClickOpenStatusOKPopUp = () => {
    setOpenPopUpInativ(false);
    setOpenPopUpEdit(false);
    setOpenStatusOKPopUp(true);
    setOpenStatusOKInativPopUp(false);
  };

  const handleCloseStatusOKPopUp = () => {
    setOpenStatusOKPopUp(false);
  };

  const handleClickOpenStatusErrPopUp = () => {
    setOpenPopUpInativ(false);
    setOpenPopUpEdit(false);
    setOpenStatusErrPopUp(true);
  };

  const handleCloseStatusErrPopUp = () => {
    setOpenStatusErrPopUp(false);
  };

  const handleValuesChange = (name, value) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleInputChange = (q) => {
    const { name, value } = q.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Utils
  const uploadFile = (e) => {
    if (!selectedFile) {
      alert("Selecione um arquivo");
      return;
    }
    if (!examName) {
      alert("Digite o nome do exame");
      return;
    }
    let fixedFileName = selectedFile.name.split(" ").join("_");
    fixedFileName = fixedFileName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    e.preventDefault();

    // Create an object of formData
    let formData = new FormData();

    // Update the formData object
    formData.append('file', selectedFile);
    formData.append('examName', examName);
    const date = new Date(
      !!selectedFile.lastModifiedDate ? selectedFile.lastModifiedDate : !!selectedFile.lastModified ? selectedFile.lastModified : Date.now()
    )
    formData.append('examDate', date.toISOString());
    formData.append('fixedFileName', fixedFileName);

    api.post("uploadExam/" + patient_id, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        getOldInfos();
        return setStatusMessage("Exame enviado com sucesso!")
      })
      .catch((error) => {
        return setStatusMessage(error.response.statusText + " Por favor, selecione o exame, indique o nome do exame e tente novamente.")
      })
  };

  const clearInput = (e) => {
    e.preventDefault();
    setExamName("");
    setStatusMessage("");
    setSelectedFile(null);
  };

  // reactPDF utils
  const meetPDF = (props) => {
    const objective = {
      Frequencia_respiratoria: props.objective.respiratoryFrequency,
      Frequencia_Cardiaca: props.objective.cardiacFrequency,
      Perimetro_cefalico: props.objective.cephalicPerimeter,
      Pressao_arterial_sistolica: props.objective.systolic,
      Pressao_arterial_diastolica: props.objective.diastolic,
      Saturacao_do_Oxigenio: props.objective.oxigenSaturation,
      Circunferencia_Abdominal: props.objective.abdominalCircunference,
      Temperatura: props.objective.temperature,
      Glicemia: props.objective.glycemia,
      Peso: props.objective.weight,
      IMC: props.objective.imc,
      Altura: props.objective.height,
      Comentario: props.objective.adicional2
    };
    const styles = StyleSheet.create({
      image: {
        width: '100%',
        height: 'auto',
        paddingBottom: '40px'
      },
      page: {
        backgroundColor: '#fff'
      },
      pageCenter: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        margin: 30,
        fontWeight: 800,
        fontSize: '20px',
        justifyContent: 'center',
        height: '80%'
      },
      sectionCenter: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        margin: 30,
        fontWeight: 800,
        fontSize: '20px',
        justifyContent: 'space-between',
        padding: '10px 0 10px 0'
      },
      firstSectionCenter: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        margin: 30,
        fontWeight: 800,
        fontSize: '20px',
        justifyContent: 'space-between',
      },
      sectionLeft: {
        textAlign: 'left',
        margin: '30px',
        fontWeight: 800,
        fontSize: '20px',
        paddingLeft: '10px'
      },
      text: {
        color: 'black',
        padding: '3px'
      },
      underline: {
        color: 'blue',
        textDecoration: 'underline',
        padding: '10px 0 10px 0'
      },
      blueText: {
        color: 'blue',
        padding: '10px'
      },
      titulo: {
        fontWeight: 800,
        fontSize: '20px',
      },
      subtitulo: {
        textAlign: 'center',
        fontWeight: 800,
        fontSize: '16px',
        marginBottom: '2%',
        padding: '10px'
      },
      stack: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      },
    })
    let objective_text = [];
    let cid_text = [];
    let plan_text = [];
    let plan = props.plan;
    let sub_plan_text = [];

    const formatKey = (key) => {
      switch (key) {
        case "Pressao_arterial_sistolica":
          return ["Pressão arterial sistólica", "mmHg"];
        case "Pressao_arterial_diastolica":
          return ["Pressão arterial diastólica", "mmHg"];
        case "Frequencia_respiratoria":
          return ["Frequência respiratória", "mrm"];
        case "Frequencia_Cardiaca":
          return ["Frequência cardíaca", "bpm"];
        case "Perimetro_cefalico":
          return ["Perímetro cefálico", "cm"];
        case "Saturacao_do_Oxigenio":
          return ["Saturação do oxigênio", "SpO2"];
        case "Circunferencia_Abdominal":
          return ["Circunferência abdominal", "cm"];
        case "Temperatura":
          return ["Temperatura", "°C"];
        case "Glicemia":
          return ["Glicemia", "mg/dL"];
        case "Peso":
          return ["Peso", "kg"];
        case "Altura":
          return ["Altura", "cm"];
        case "IMC":
          return ["IMC", ""];
        case "Comentario":
          return ["Comentário", ""];
        default:
          return key;
      }
    };

    if (!!plan.request) {
      plan.request.forEach((request, index) => {
        sub_plan_text.push(
          <Text className={styles.text}>
            {`Solicitação de exame: ${index + 1}` + request}
          </Text>
        )
      });
    }

    plan_text.push(
      <View className={styles.sectionLeft}>
        <Text className={styles.text}>
          {"Informações: " + plan.complementar ? plan.complementar : "Não especificado"}
        </Text>
        <Text className={styles.text}>
          {"Encaminhamento: " + plan.referral ? plan.referral : "Não especificado"}
        </Text>
        {sub_plan_text}
      </View>
    );

    props.diagnosis.forEach((diagnosis) => {
      cid_text.push(
        <View style={styles.sectionLeft}>
          <Text style={styles.text}>
            {"CID: " + diagnosis.CID}
          </Text>
          <Text style={styles.text} >
            {"Status: " + (diagnosis.status ? diagnosis.status : "Não especificado")}
          </Text>
          <Text style={styles.text} >
            {"Diagnóstico: " + (diagnosis.diagnosis ? diagnosis.diagnosis : "Não especificado")}
          </Text>
          <Text style={styles.text} >
            {"Resolução: " + (diagnosis.resolution ? diagnosis.resolution : "Não especificado")}
          </Text>
          <Text style={styles.text} >
            {"Observações: " + (diagnosis.observations ? diagnosis.observations : "Não especificado")}
          </Text>
        </View>
      );
    });

    for (const [key, value] of Object.entries(objective)) {
      let text;
      if (!!value) {
        text = formatKey(key)[0] + ": " + value + " " + formatKey(key)[1];
        objective_text.push(
          <Text style={styles.text}>
            {text}
          </Text>
        );
      }
    }

    const MyDoc = (
      <>
        <Page size="A4" style={styles.page}>
          <View style={styles.pageCenter}>
            <Image src={imageSource} style={styles.image} />
            <Text style={styles.text}>
              {"Exame realizado no dia : " + props.info.date}
            </Text>
            <Text style={styles.text}>
              {`Início: ${props.info.start} | Fim: ${props.info.end}`}
            </Text>
            <Text style={styles.text}>
              {"Nome do paciente : " + values.name}
            </Text>
            <Text style={styles.text}>
              {"CPF do paciente : " + values.CPF}
            </Text>
            <Text style={styles.text}>
              {"Nome do profissional : " + props.info.doctor}
            </Text>
            <Text style={styles.text}>
              Especialidade : {props.info.doctor_speciality} , CRM-{`${props.info.doctorCRM_Location}:${props.info.doctorCRM}`}
            </Text>
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.firstSectionCenter}>
            <Text style={styles.underline}>Objetivo</Text>
          </View>
          <View style={styles.sectionLeft}>
            {objective_text}
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.sectionCenter}>
            <Text style={styles.underline}>Subjetivo</Text>
          </View>
          <View style={styles.sectionLeft}>
            <Text style={styles.blueText}>
              Motivo da consulta:
            </Text>
            <Text style={styles.text}>
              {props.subjective.reason ? props.subjective.reason : "Não informado"}
            </Text>
            <Text style={styles.blueText}>
              Medicamentos em uso:
            </Text>
            <Text style={styles.text}>
              {props.subjective.medicines.filter(element => element !== '').length > 0 ? props.subjective.medicines.reduce((prev, curr) => curr + ', ' + prev) : "Não informado"}
            </Text>
            <Text style={styles.blueText}>Alergias:</Text>
            <Text style={styles.text}>
              {props.subjective.allergies}
            </Text>
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.sectionCenter}>
            <Text style={styles.underline}>Condições</Text>
          </View>
          {cid_text}
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.sectionCenter}>
            <Text style={styles.underline}>Plano</Text>
            {plan_text}
          </View>
        </Page>
      </>
    );
    return MyDoc;
  }

  const prontuarioPDF = async () => {
    if (!!meets) {
      let allMeets = [];
      meets.forEach(meet => {
        allMeets.push(meetPDF(meet.props));
      });
      const MyDoc = (
        <Document>
          {allMeets}
        </Document>
      );

      let blob = null;
      await pdf(MyDoc).toBlob().then(value => blob = value);
      fileDownload(blob, `Prontuario/${values.name + "/" + new Date() + "apsPlus"}.pdf`);
    }
  }

  useEffect(() => {
    getOldInfos();
  }, []);

  useEffect(() => {
    setListaExames(values.exames);
  }, [values]);

  useEffect(() => {
    if (aba === 0) {
      setComponent(
        <Stack spacing={4}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <InputField
                value={values.name}
                name={"name"}
                onChange={handleInputChange}
                label={"Nome Completo"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.nick}
                name={"nick"}
                onChange={handleInputChange}
                label={"Nome social"}
                required={false}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.RG}
                name={"RG"}
                onChange={handleInputChange}
                label={"RG"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.possuiCPF}
                name={"possuiCPF"}
                onChange={handleInputChange}
                label={"Possui CPF?"}
                select
                names={["Sim", "Não"]}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <MaskedInput
                value={values.possuiCPF === "Sim" ? values.CPF : "000.000.000-00"}
                name={"CPF"}
                onChange={handleInputChange}
                label={"CPF"}
                disabled={values.possuiCPF === "Não"}
                type={"text"}
                mask={"999.999.999-99"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.dateBirth}
                name={"dateBirth"}
                onChange={handleInputChange}
                label={"Data de nascimento"}
                type={"date"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                select={true}
                value={values.sex}
                onChange={handleInputChange}
                names={["Masculino", "Feminino", "Outro"]}
                label={"Gênero"}
                name={"sex"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                select={true}
                value={values.race}
                name={"race"}
                onChange={handleInputChange}
                names={[
                  "Branco(a)",
                  "Pardo(a)",
                  "Preto(a)",
                  "Amarelo(a)",
                  "Indígena",
                  "Prefiro não informar",
                ]}
                label={"Raça / cor autodeclarada"}
              />
            </Grid>
            <Grid item xs={4}>
              <MaskedInput
                value={values.contactNumber}
                name={"contactNumber"}
                onChange={handleInputChange}
                label={"Telefone"}
                mask={"(99)99999-9999"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.email}
                name={"email"}
                onChange={handleInputChange}
                label={"E-mail"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                select={true}
                value={values.relationshipStatus}
                onChange={handleInputChange}
                names={[
                  "Solteiro(a)",
                  "Casado(a)",
                  "Separado(a)",
                  "Divorciado(a)",
                  "Viúvo(a)",
                  "",
                ]}
                label={"Estado civil"}
                name={"relationshipStatus"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.profession}
                name={"profession"}
                onChange={handleInputChange}
                label={"Profissão"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.street}
                name="street"
                onChange={handleInputChange}
                label={"Endereço completo"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.CEP}
                name="CEP"
                onChange={handleInputChange}
                label={"CEP"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.city}
                name="city"
                onChange={handleInputChange}
                label={"Cidade"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                select={true}
                value={values.UF}
                name="UF"
                onChange={handleInputChange}
                names={[
                  "",
                  "AC",
                  "AL",
                  "AP",
                  "AM",
                  "BA",
                  "CE",
                  "DF",
                  "ES",
                  "GO",
                  "MA",
                  "MT",
                  "MS",
                  "MG",
                  "PA",
                  "PB",
                  "PR",
                  "PE",
                  "PI",
                  "RJ",
                  "RN",
                  "RS",
                  "RO",
                  "RR",
                  "SC",
                  "SP",
                  "SE",
                  "TO",
                ]}
                label={"UF"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.insurance}
                name={"insurance"}
                onChange={handleInputChange}
                label={"Convênio"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.insurancePlan}
                name={"insurancePlan"}
                onChange={handleInputChange}
                label={"Plano"}
                type={"text"}
                required={false}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.insuranceNumber}
                name={"insuranceNumber"}
                onChange={handleInputChange}
                label={"Número do Convênio"}
                type={"text"}
                required={false}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.insuranceDependency}
                name={"insuranceDependency"}
                onChange={handleInputChange}
                label={"Relação com o titular do convênio"}
                select
                names={["Titular", "Dependente"]}
                type={"text"}
                required={false}
              />
            </Grid>
          </Grid>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Link
              onClick={() => setOpenPopUpInativ(true)}
              underline="hover"
              sx={{
                fontSize: "16px",
                cursor: "pointer",
                color: "black",
                pr: "3rem",
              }}
            >
              Inativar paciente
            </Link>
            <StyledButton
              onClick={() => setOpenPopUpEdit(true)}
              width={365}
              height={50}
              text={"Salvar"}
              variant={"contained"}
            ></StyledButton>
          </Stack>
        </Stack>
      );
    }
    if (aba === 1) {
      setComponent(
        <Stack>
          <Stack margin={2} spacing={4}>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <TextField
                  sx={{
                    label: { fontFamily: "Mulish", fontWeight: 700 },
                    input: { fontFamily: "Mulish", fontWeight: 900 },
                  }}
                  value={!!values.nick ? values.nick : values.name}
                  name={"name"}
                  label={"Nome"}
                  type={"text"}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  sx={{
                    label: { fontFamily: "Mulish", fontWeight: 900 },
                    input: { fontFamily: "Mulish", fontWeight: 900, },
                  }}
                  value={getAge(values.dateBirth)}
                  name={"idade"}
                  label={"Idade"}
                  type={"text"}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  sx={{
                    label: { fontFamily: "Mulish", fontWeight: 700 },
                    input: { fontFamily: "Mulish", fontWeight: 900 },
                  }}
                  value={values.sex}
                  label={"Gênero"}
                  name={"sex"}
                />
              </Grid>
            </Grid>
          </Stack>

          <Stack direction={"row"} justifyContent={"flex-end"}>
            <Button
              onClick={() => setOpenPopUpNew(true)}
              href=""
              endIcon={<AddOutlinedIcon />}
              variant="outlined"
              sx={{
                textTransform: "none",
                fontFamily: "Mulish",
                color: "#003895",
                backgroundColor: "#FFF",
                width: "17rem",
                height: "50px",
                mr: "5rem",
              }}
            >
              Novo atendimento
            </Button>
          </Stack>
          {meets.length > 0 ? (
            <>
              <StyledButton
                onClick={prontuarioPDF}
                width={'100%'}
                height={'100%'}
                text={'Download'}
                endIcon={<DownloadIcon />}
              >Download
              </StyledButton>
              {meets}
            </>
          ) : (
            <Stack
              direction={"column"}
              alignItems={"center"}
              sx={{
                height: "50vh",
                padding: "10px 0px",
              }}
            >
              <img
                className={styles.image}
                src={"/prontuario/prancheta.svg"}
              ></img>
              <Typography
                sx={{ color: "black", fontWeight: "800", fontFamily: "Mulish" }}
              >
                Ainda não há atendimentos.
              </Typography>
            </Stack>
          )}
        </Stack>
      );
    }
    if (aba === 2) {
      setComponent(
        <Stack margin={2} spacing={4}>
          <Grid container spacing={4} alignItems="center" justifyContent="flex-start" direction="row">
            <Grid item xs={4}>
              <InputField
                value={examName}
                name={"examName"}
                onChange={(e) => setExamName(e.target.value)}
                label={"Nome do exame"}
                type={"text"}
                required={false}
              />
            </Grid>
            <Grid item xs={7}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item marginRigth={1}>
                  <Button
                    variant="contained"
                    component="label"
                  >
                    Selecionar exame
                    <input
                      type="file"
                      hidden
                      name="uploadFile"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </Button>
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography>
                    {!!selectedFile ? selectedFile.name : "Nenhum arquivo selecionado"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item marginRight={1}>
              <StyledButton
                text={"Resetar"}
                width={150}
                height={50}
                value={"Resetar"}
                variant={"contained"}
                onClick={(e) => clearInput(e)}
              />
            </Grid>
            <Grid item marginRight={1}>
              <StyledButton
                text={"Upload"}
                width={150}
                height={50}
                value={"Upload"}
                variant={"contained"}
                onClick={(e) => uploadFile(e)}
              />
            </Grid>
            <Grid item marginRight={1}>
              <StyledButton
                text={"Recuperar"}
                width={150}
                height={50}
                value={"Recuperar"}
                variant={"contained"}
                onClick={() => recoverExams()}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>
                {statusMessage}
              </Typography>
            </Grid>
          </Grid>
          <Stack spacing={3}>
            <table>
              <thead>
                <tr className={styles.headerTab}>
                  <th>Exame</th>
                  <th>Data</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {listaExames.length === 0 ? (<td>Não há exames</td>) :
                  (listaExames
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((exame) => {
                      let date = new Date(exame.date);
                      return (
                        <tr key={exame.name + exame.date}>
                          <td>{exame.name}</td>
                          <td>
                            {date.toLocaleString("pt-BR").split(" ")[0].split(",")[0]}
                          </td>
                          <td>
                            <StyledButton
                              text={<DownloadIcon />}
                              variant="contained"
                              onClick={() => {
                                api.post('downloadFile', { "key": exame.awsKey }, { "responseType": "blob" })
                                  .then((response) => {
                                    fileDownload(response.data, exame.awsKey);
                                  })
                                  .catch((e) => console.log(e))
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
              </tbody>
            </table>
          </Stack>
        </Stack>
      );
    }
  }, [aba, examName, selectedFile, statusMessage, listaExames, meets]);

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        fontFamily: "Mulish",
        fontStyle: "normal",
        width: "100%",
        height: "100%",
        ml: "5rem",
      }}
    >
      <Stack direction={"column"}>
        <Stack sx={{ fontWeight: 700 }}>
          <StyledLink
            abaLink={false}
            href={"/profissional/crudpacientes"}
            underline={"none"}
            text={`< Voltar`}
          />
        </Stack>
        <Stack
          divider={
            <Divider
              sx={{ backgroundColor: "black" }}
              orientation="vertical"
              flexItem
            />
          }
          direction={"row"}
          spacing={2}
          sx={{ fontWeight: 800, fontSize: "24px", mt: "2rem", mb: "4rem" }}
        >
          <StyledLink
            onClick={() => setAba(0)}
            underline={aba === 0 ? "always" : "none"}
            text={"Dados pessoais"}
          />

          <StyledLink
            onClick={() => setAba(1)}
            underline={aba === 1 ? "always" : "none"}
            text={"Prontuário"}
          />

          <StyledLink
            onClick={() => setAba(2)}
            underline={aba === 2 ? "always" : "none"}
            text={"Adicionar exames"}
          />

          <StyledLink
            onClick={() => setAba(4)}
            underline={aba === 4 ? "always" : "none"}
            text={"Linhas de Cuidado"}
          />

          <StyledLink
            onClick={() => setAba(5)}
            underline={aba === 5 ? "always" : "none"}
            text={"Teleconsulta"}
          />

        </Stack>
        <Stack
          sx={{
            fontFamily: "Mulish",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "24px",
            width: "70vw",
          }}
        >
          {component}
        </Stack>
      </Stack>
      {aba === 1 && (
        <Aside
          values={values}
          handleInputChange={handleInputChange}
          handleValuesChange={handleValuesChange}
          handleUpdateCareline={handleUpdateCareline.bind(null, setValues, values)}
        ></Aside>
      )}
      <PopUp
        name={"Inativar paciente"}
        backgroundColor={"#C9323A"}
        onClick={inativPaciente}
        description={"Você deseja inativar este paciente"}
        action={"inativar"}
        open={openPopUpInativ}
        handleClickOpen={handleClickOpenInativ}
        handleClose={handleCloseInativ}
      />

      <PopUp
        name={"Novo atendimento"}
        description={"Você deseja começar um novo atendimento?"}
        action={"começar"}
        open={openPopUpNew}
        handleClickOpen={handleClickOpenNew}
        handleClose={handleCloseNew}
      />

      {openPopUpEdit && (
        <PopUp
          name={"Salvar alterações"}
          onClick={editPaciente}
          description={"Você deseja alterar os dados?"}
          action={"alterar"}
          open={openPopUpEdit}
          handleClickOpen={handleClickOpenEdit}
          handleClose={handleCloseEdit}
        />
      )}

      {openStatusOKPopUp && (
        <PopUp
          onClick={() => {
            navigate("/profissional/crudpacientes");
          }}
          name={"Paciente editado com sucesso"}
          description={`O paciente ${!!values.nick ? values.nick.split(" ")[0] : values.name.split(" ")[0]}  foi editado com sucesso. Deseja retornar à página de pacientes?`}
          action={"retornar"}
          open={openStatusOKPopUp}
          handleClickOpen={handleClickOpenStatusOKPopUp}
          handleClose={handleCloseStatusOKPopUp}
        />
      )}

      <PopUp
        name={"Erro ao editar"}
        description={"Ocorreu um erro ao tentar editar o paciente. Deseja rever?"}
        action={"rever dados"}
        open={openStatusErrPopUp}
        onClick={handleCloseStatusErrPopUp}
        handleClose={handleCloseStatusErrPopUp}
      />

      <PopUp
        name={"Novo atendimento"}
        description={"Você deseja começar um novo atendimento?"}
        action={"começar"}
        open={openPopUpNew}
        onClick={handleClickOpenNew}
        handleClose={handleCloseNew}
      />
    </Stack>
  );
}
