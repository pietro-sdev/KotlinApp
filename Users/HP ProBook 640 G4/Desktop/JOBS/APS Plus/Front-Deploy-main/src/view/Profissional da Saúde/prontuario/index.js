import React from "react";
import styles from "./prontuario.module.css";
import InputField from "../../../components/input_field/index";
import { useState, useEffect} from "react";
import DownloadIcon from '@mui/icons-material/Download';
import {Stack, Divider, Typography, Grid} from "@mui/material";
import StyledButton from "../../../components/button/index";
import PopUp from "../../../components/pop_up";
import { Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import api from "../../../services/api";
import fileDownload from 'js-file-download';
import AccordionCard from "../../../components/accordion";
import AutoCompleteButton from "../../../components/autocomplete_button";
import initMemed from "./../../../components/memed/index";
import Aside from "../../../components/aside_prontuario";
import { useNavigate, useLocation } from "react-router-dom";
import StyledLink from "../../../components/link";
import AutoCompleteButtonMultiple from "../../../components/autocomplete_button multiple";
import handleUpdateCareline from "../../../utils/handleUpdateCareline";

export default function AddProntuario() {
  const memedToken = localStorage.getItem("memedToken");
  const [component, setComponent] = useState(null);
  const [aba, setAba] = useState(0);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [examName, setExamName] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [statusOkPopUp, setStatusOkPopUp] = useState(false);
  const [statusErrPopUp, setStatusErrPopUp] = useState(false);
  const [openErrMemedPopUp, setOpenErrMemedPopUp] = useState(false);
  const [openPrescriptionPopUp, setOpenPrescriptionPopUp] = useState(false)
  const [statusErrPrescriptionPopUp, setStatusErrPrescriptionPopUp] = useState(false)
  const [statusOkPrescriptionPopUp, setStatusOkPrescriptionPopUp] = useState(false)
  const [prescriptionList, setPrescriptionList] = useState([])
  const [problemas, setProblemas] = React.useState(0);
  const [accordionArray, setAccordionArray] = React.useState([]);
  const [listaExames, setListaExames] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("")
  const [multipleController, setMultipleController] = useState("")

  const navigate = useNavigate();
  const location = useLocation();
  const patient_id = location.state.patient_id;
  const doctorId = localStorage.getItem("userId");
  const [values, setValues] = useState({
    patientSex: null,
    exames: [],
    patient_id: patient_id,
    patientCPF: "",
    patientNumber: "",
    patientName: "",
    patientNick: "",
    patientBirthday: "",
    patientAddress: "",
    patientCity: "",
    patientUF: "",
    date: new Date().toLocaleDateString(),
    doctor: "",
    doctorCRM: "",
    doctorDocumentType: "",
    doctorCRM_Location: "",
    doctor_speciality: "",
    doctorId: "",
    doctorRQE: "",
    doctorWorkplaceAddress: "",
    doctorWorkplaceCEP: "",
    doctorWorkplaceCity: "",
    doctorWorkplaceUF: "",
    doctorEmail: "",
    medicines: "",
    reason: "",
    respiratoryFrequency: "",
    cardiacFrequency: "",
    cephalicPerimeter: "",
    systolic: "",
    diastolic: "",
    oxigenSaturation: "",
    abdominalCircunference: "",
    temperature: "",
    glycemia: "",
    weight: "",
    imc: "",
    height: "",
    exam: "",
    complementar1: "",
    complementar2: "",
    result: "",
    request: [],
    referral: "",
    CID: "",
    status: "",
    diagnosis: "",
    resolution: "",
    observations: "",
    cidInfo: [],
    adicional1: "",
    adicional2: "",
    prescription: [],
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
    exames: [],
  });

  useEffect(() => { // reload the page on first mount to reset all memed scripts
    const hasReloaded = localStorage.getItem('hasReloaded');
    if (!hasReloaded) {
      localStorage.setItem('hasReloaded', true);
      window.location.reload();
    } else {
      localStorage.removeItem('hasReloaded');
    }
  }, []);

  const getPatientInfos = () => {
    api
      .get(`user/${patient_id}`)
      .then((response) => {
        const data = response.data;
        api
          .get("user/" + doctorId)
          .then((res) => {
            const doctor = res.data;
            if (!!data.patient) {
              setValues({
                ...values,
                doctor: !!doctor.name ? doctor.name : "",
                doctorCRM: !!doctor.employee.documentNumber
                  ? doctor.employee.documentNumber
                  : "",
                doctorDocumentType: !!doctor.employee.document ? doctor.employee.document : "",
                doctorRQE: !!doctor.employee.RQE ? doctor.employee.RQE : "",
                doctor_speciality: !!doctor.employee.speciality ? doctor.employee.speciality : "",
                doctorWorkplaceAddress: !!doctor.employee.workplace.address
                  ? doctor.employee.workplace.address
                  : "",
                doctorWorkplaceCEP: !!doctor.employee.workplace.CEP
                  ? doctor.employee.workplace.CEP
                  : "",
                doctorWorkplaceCity: !!doctor.employee.workplace.city
                  ? doctor.employee.workplace.city
                  : "",
                doctorWorkplaceUF: !!doctor.employee.workplace.UF
                  ? doctor.employee.workplace.UF
                  : "",
                doctorWorknumber: !!doctor.employee.workContactNumber
                  ? doctor.employee.workContactNumber
                  : "",
                doctorEmail: !!doctor.email ? doctor.email : "",
                doctorCRM_Location: !!doctor.employee.documentEmissionState
                  ? doctor.employee.documentEmissionState
                  : "",
                patientSex: !!data.sex ? data.sex : null,
                patientName: !!data.nick ? data.nick : data.name,
                patientNick: !!data.nick ? data.nick : "",
                patientCPF: !!data.CPF ? data.CPF : "",
                patientBirthday: !!data.dateBirth ? data.dateBirth : "",
                patientNumber: !!data.contactNumber ? data.contactNumber : "",
                patientAddress: !!data.address ? data.address.street : "",
                patientCity: !!data.address ? data.address.city : "",
                patientUF: !!data.address ? data.address.UF : "",
                relationshipStatus: !!data.patient.relationshipStatus
                  ? data.patient.relationshipStatus
                  : "",
                insurance: !!data.patient.insurance
                  ? data.patient.insurance
                  : "",
                insurancePlan: !!data.patient.insurancePlan
                  ? data.patient.insurancePlan
                  : "",
                insuranceNumber: !!data.patient.insuranceNumber
                  ? data.patient.insuranceNumber
                  : "",
                activeProblems: !!data.patient.activeProblems
                  ? data.patient.activeProblems
                  : "",
                personalAntecedents: !!data.patient.personalAntecedents
                  ? data.patient.personalAntecedents
                  : "",
                familyAntecedents: !!data.patient.familyAntecedents
                  ? data.patient.familyAntecedents
                  : "",
                progressTreatment: !!data.patient.progressTreatment
                  ? data.patient.progressTreatment
                  : "",
                allergies: !!data.patient.allergies
                  ? data.patient.allergies
                  : "",
                attachments: !!data.patient.attachments
                  ? data.patient.attachments
                  : "",
                notes: !!data.patient.notes ? data.patient.notes : "",
                careLineName: !!data.patient.careLineName
                  ? data.patient.careLineName
                  : "",
                careLineStatus: !!data.patient.careLineStatus
                  ? data.patient.careLineStatus
                  : "",
                careLineTag: !!data.patient.careLineTag
                  ? data.patient.careLineTag
                  : "",
                exames: !!data.patient.exames
                  ? data.patient.exames
                  : "",
              });
            } else {
              setValues({
                ...values,
                doctor: !!doctor.name ? doctor.name : "",
                doctorCRM: !!doctor.employee.documentNumber
                  ? doctor.employee.documentNumber
                  : "",
                doctorCRM_Location: !!doctor.employee.documentEmissionState
                  ? doctor.employee.documentEmissionState
                  : "",
                doctorRQE: !!doctor.employee.RQE ? doctor.employee.RQE : "",
                doctor_speciality: !!doctor.employee.speciality ? doctor.employee.speciality : "",
                doctorWorkplaceAddress: !!doctor.employee.workplace.address
                  ? doctor.employee.workplace.address
                  : "",
                doctorWorkplaceCEP: !!doctor.employee.workplace.CEP
                  ? doctor.employee.workplace.CEP
                  : "",
                doctorWorknumber: !!doctor.employee.workContactNumber
                  ? doctor.employee.workContactNumber
                  : "",
                doctorEmail: !!doctor.email ? doctor.email : "",
              });
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  const uploadFile = (e) => {
    e.preventDefault();

    // Create an object of formData
    let formData = new FormData();

    // Update the formData object
    formData.append('file', selectedFile);
    formData.append('examName', examName);
    const date = new Date(selectedFile.lastModifiedDate)
    formData.append('examDate', date.toISOString());

    api.post(`upload/record/${patient_id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        setPrescriptionList((list) => [...list, res.data])
      })
      .catch((error) => {
        setStatusErrPrescriptionPopUp(true)
        return setStatusMessage(error.response + " Por favor, selecione o exame")
      })
  };


  useEffect(() => {
    getPatientInfos();
  }, []);

  useEffect(() => {
    setListaExames(values.exames);
  }, [values.exames]);

  useEffect(() => {
    var today = new Date();
    var time =
      String(today.getHours()).padStart(2, "0") +
      ":" +
      String(today.getMinutes()).padStart(2, "0") +
      ":" +
      String(today.getSeconds()).padStart(2, "0");
    setStart(time);
    setStart(time);
  }, []);

  const [infos, setInfos] = useState({
    cids: [""],
    tuss: [""],
    specialty: [""],
  });

  const update_cid_info = (q) => {
    if (values.cidInfo.length < accordionArray.length) {
      accordionArray.forEach((e) => {
        values.cidInfo.push({
          CID: e.props.name,
          status: e.props.values.status,
          diagnosis: e.props.values.diagnosis,
          resolution: e.props.values.resolution,
          observations: e.props.values.observations,
        });
      });
    }
  };

  const handleClickOpen = () => {
    setOpenPopUp(true);
  };

  const handleClose = () => {
    setOpenPopUp(false);
  };

  const handleClickOpenStatusOk = () => {
    setStatusOkPopUp(true);
  };

  const handleCloseStatusOk = () => {
    setStatusOkPopUp(false);
  };

  const handleValuesChange = (name, value) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };
  const handleInputChange = (q) => {
    const { name, value } = q.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const getCids = () => {
    api.get(`/cids/info/${values.CID}`).then((resp) => {
      setInfos((values) => ({
        ...values,
        cids: Object.values(resp.data),
      }));
    });
  };

  const getTuss = () => {
    api.get(`/tusses/info/${multipleController}`).then((resp) => {
      setInfos((values) => ({
        ...values,
        tuss: Object.values(resp.data.map((obj) => obj.info)),
      }));
    });
  };

  const getSpecialty = () => {
    api.get(`/specialties/info/${values.referral}`).then((resp) => {
      setInfos((values) => ({
        ...values,
        specialty: Object.values(resp.data),
      }));
    });
  };
  const pushAccordionArray = (accordionProblem, accordionValues) => {
    if (!accordionArray.find((value) => value.props.name == accordionProblem)) {
      setAccordionArray((accordionArray) => [
        ...accordionArray,
        <AccordionCard
          name={accordionProblem}
          values={accordionValues}
          handleInputChange={handleInputChange}
          handleDelete={handleDelete}
          isDisable="true"
        />,
      ]);
    }
    setValues({
      ...values,
      CID: "",
      status: "",
      diagnosis: "",
      resolution: "",
      observations: "",
    });
  };

  const handleDelete = (name) => {
    setAccordionArray((accordionArray) =>
      accordionArray.filter((current) => {
        return current.props.name != name;
      })
    );
  };

  const addMeetToRecord = async (time) => {
    update_cid_info();
    let error = false;
    api.patch(`/user/${values.patient_id}`, {
      isPatient: true,
      patient: {
        relationshipStatus: values.relationshipStatus,
        insurance: values.insurance,
        insurancePlan: values.insurancePlan,
        insuranceNumber: values.insuranceNumber,
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
      },
    }).catch((error) => {
      handleClose();
      setStatusErrPopUp(true);
      console.log(error);
    });

    if (!error) {
      api
        .post(`/record/add`, {
          patient: {
            id: values.patient_id,
            CPF: values.patientCPF,
          },
          meet: {
            info: {
              date: values.date,
              patient_id: values.patient_id,
              doctor: values.doctor,
              doctorDocumentType: values.doctorDocumentType,
              doctorId: values.doctorId,
              doctorCRM: values.doctorCRM,
              doctorCRM_Location: values.doctorCRM_Location,
              doctor_speciality: values.doctor_speciality,
              start: start,
              end: time,
            },
            subjective: {
              allergies: values.allergies,
              medicines: values.medicines,
              adicional1: values.adicional1,
              reason: values.reason,
            },
            objective: {
              respiratoryFrequency: values.respiratoryFrequency,
              cardiacFrequency: values.cardiacFrequency,
              cephalicPerimeter: values.cephalicPerimeter,
              systolic: values.systolic,
              diastolic: values.diastolic,
              oxigenSaturation: values.oxigenSaturation,
              abdominalCircunference: values.abdominalCircunference,
              temperature: values.temperature,
              glycemia: values.glycemia,
              weight: values.weight,
              imc: Math.round((values.weight / (values.height / 100) ** 2) * 100) / 100,
              height: values.height,
              adicional2: values.adicional2,
              prescription: values.prescription,
              cardiacPressure: values.cardiacPressure,
            },
            plan: {
              request: values.request,
              referral: values.referral,
              complementar: values.complementar2,
            },
            diagnosis: values.cidInfo,
            exames: prescriptionList,
            complementar1: values.complementar1,
            lembrete: values.lembrete,
          },
        })
        .then((resp) => {
          handleClose();
          setStatusOkPopUp(true);
        })
        .catch((error) => {
          handleClose();
          setStatusErrPopUp(true);
          console.log(error);
        });
    };
  }
  const clearInput = (e) => {
    e.preventDefault();
    setExamName("")
    setStatusMessage("")
    setSelectedFile(null)
  }

  useEffect(() => {
    if (aba == 0) {
      setComponent(
        <Stack spacing={4}>
          <Stack>
            <div className={styles.label}>Motivo principal da consulta:</div>
            <InputField
              name="reason"
              value={values.reason}
              onChange={handleInputChange}
              variant="filled"
              placeholder="Escreva aqui..."
              multiline
              rows={10}
              sx={{
                borderRadius: "8px;",
                backgroundColor: "#CDD3FF",
              }}
            ></InputField>
          </Stack>
          <Stack>
            <div className={styles.label}>Informações adicionais:</div>
            <InputField
              name="adicional1"
              value={values.adicional1}
              onChange={handleInputChange}
              variant="filled"
              placeholder="Escreva aqui..."
              multiline
              rows={4}
              sx={{
                borderRadius: "8px;",
                backgroundColor: "#CDD3FF",
              }}
            ></InputField>
          </Stack>
          <Stack>
            <div className={styles.label}>Alergias:</div>
            <InputField
              name="allergies"
              value={values.allergies}
              onChange={handleInputChange}
              variant="filled"
              placeholder="Escreva aqui..."
              multiline
              rows={4}
              sx={{
                borderRadius: "8px;",
                backgroundColor: "#CDD3FF",
              }}
            ></InputField>
          </Stack>
          <Stack direction={"row"} justifyContent={"flex-end"}>
            <StyledButton
              onClick={() => setAba(1)}
              width={300}
              height={50}
              text={"Próxima página"}
              variant={"contained"}
            ></StyledButton>
          </Stack>
        </Stack>
      );
    }
    if (aba == 1) {
      // if (!!values.height && !!values.weight) {
      //   if (
      //     Math.round((values.weight / (values.height / 100) ** 2) * 100) / 100 !=
      //     Math.round((values.weight / values.height ** 2) * 100) / 100
      //   ) {
      //     fetchIMC();
      //   }
      // }
      setComponent(
        <Stack direction={"column"} spacing={4}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <InputField
                name={"systolic"}
                value={values.systolic}
                onChange={handleInputChange}
                label={"Pressão arterial sistólica (mmHg)"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                name={"diastolic"}
                value={values.diastolic}
                onChange={handleInputChange}
                label={"Pressão arterial diastólica (mmHg)"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                label={"Frequência respiratória (mrm)"}
                name={"respiratoryFrequency"}
                value={values.respiratoryFrequency}
                onChange={handleInputChange}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                label={"Frequência cardíaca (bpm)"}
                name={"cardiacFrequency"}
                alue={values.cardiacFrequency}
                onChange={handleInputChange}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                label={"Perímetro cefálico (cm)"}
                name={"cephalicPerimeter"}
                value={values.cephalicPerimeter}
                onChange={handleInputChange}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                label={"Saturação de oxigênio (SpO2)"}
                name="oxigenSaturation"
                value={values.oxigenSaturation}
                onChange={handleInputChange}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                label={"Circunferência abdominal (cm)"}
                name={"abdominalCircunference"}
                value={values.abdominalCircunference}
                onChange={handleInputChange}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                label={"Temperatura (°C)"}
                name={"temperature"}
                value={values.temperature}
                onChange={handleInputChange}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                label={"Glicemia (mg/dL)"}
                name={"glycemia"}
                value={values.glycemia}
                onChange={handleInputChange}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                label={"Peso (kg)"}
                name={"weight"}
                value={values.weight}
                onChange={handleInputChange}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                label={"Altura (cm)"}
                name={"height"}
                value={values.height}
                onChange={handleInputChange}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                label={"IMC"}
                name={"imc"}
                value={Math.round((values.weight / (values.height / 100) ** 2) * 100) / 100}
                type={"text"}
              />
            </Grid>
          </Grid>
          <Stack spacing={3}>
            <Stack>
            </Stack>
            <Stack>
              <table>
                <thead>
                  <tr className={styles.headerTab}>
                    <th>Exame</th>
                    <th>Data</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {listaExames.length == 0 ? (() => {
                    return (<tr>
                      <td></td>
                      <td>Não há exames</td>
                    </tr>)
                  }) :
                    (listaExames
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((exame) => {
                        let date = new Date(exame.date);
                        return (
                          <tr key={exame._id}>
                            <td>{exame.name}</td>
                            <td>
                              {date
                                .toLocaleString("pt-BR").split(" ")[0]
                              }
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
          <div className={styles.label}>Informações adicionais:</div>
          <InputField
            name="adicional2"
            value={values.adicional2}
            onChange={handleInputChange}
            variant="filled"
            placeholder="Escreva aqui..."
            multiline
            rows={4}
            sx={{
              ml: "30px",
              mb: "30px",
              borderRadius: "8px;",
              backgroundColor: "#CDD3FF",
            }}
          ></InputField>
          <Stack
            direction="row"
            justifyContent={"flex-end"}
            alignItems="center"
            spacing={4}
            sx={{ ml: "30rem" }}
          >
            <StyledButton
              onClick={() => setAba(0)}
              backgroundColor={"#EBB70C"}
              width={365}
              height={50}
              text={"Página anterior"}
              variant={"contained"}
            ></StyledButton>
            <StyledButton
              onClick={() => setAba(2)}
              width={365}
              height={50}
              text={"Próxima Pagina"}
              variant={"contained"}
            ></StyledButton>
          </Stack>
        </Stack>
      );
    }
    if (aba == 2) {
      setComponent(
        <div className={styles.dados}>
          <div className={styles.label}>
            Problemas ou Condições Trabalhados em Consultas Anteriores
          </div>
          <AutoCompleteButton
            freeSolo={false}
            label={"CID"}
            names={!!values.CID ? infos.cids : []}
            value={!!values.CID ? values.CID : ""}
            variant="filled"
            width="100%"
            backgroundColor={"#CDD3FF"}
            onInputChange={(event, value) => {
              setValues({ ...values, CID: value });
              if (values.CID.length > 1) {
                setTimeout(getCids, 300);
              }
            }}
          />
          <AccordionCard
            name={!!values.CID ? values.CID : "Insira um CID"}
            values={values}
            handleInputChange={handleInputChange}
            pushAccordionArray={pushAccordionArray}
            handleDelete={handleDelete}
          />

          {accordionArray}

          <Stack>
            <div className={styles.label}>Informações complementares:</div>
            <InputField
              name={"complementar1"}
              value={values.complementar1}
              onChange={handleInputChange}
              variant="filled"
              placeholder="Escreva aqui..."
              multiline={true}
              rows={4}
              margin={"dense"}
              sx={{
                width: "100%",
                borderRadius: "8px;",
                backgroundColor: "#CDD3FF",
              }}
            />
            <Stack
              mt={"30px"}
              direction="row"
              justifyContent={"flex-end"}
              alignItems="center"
              spacing={4}
            >
              <StyledButton
                onClick={() => setAba(1)}
                backgroundColor={"#EBB70C"}
                width={"20%"}
                height={"3rem"}
                text={"Página anterior"}
                variant={"contained"}
              ></StyledButton>
              <StyledButton
                onClick={() => setAba(3)}
                width={"25%"}
                height={"3rem"}
                text={"Próxima Pagina"}
                variant={"contained"}
              ></StyledButton>
            </Stack>
          </Stack>
        </div>
      );
    }
    if (aba == 3) {
      setComponent(
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <div className={styles.label}>Solicitação de exames:</div>
              <AutoCompleteButtonMultiple
                multiple={true}
                // freeSolo={true}
                label={"Exame de:"}
                value={multipleController}
                names={infos.tuss}
                variant="filled"
                backgroundColor={"#CDD3FF"}
                onChange={(event, newValue) => {
                  setValues({ ...values, request: newValue });
                }}
                onInputChange={(event, value) => {
                  setMultipleController(value)
                  if (!!multipleController && multipleController.length > 3) {
                    getTuss()
                  }
                }}
              />
            </Grid>
            <Grid item xs={10}>
              <div className={styles.label}>Pedido de encaminhamento:</div>
              <AutoCompleteButton
                freeSolo={true}
                label={"Especialidade"}
                value={values.referral}
                names={infos.specialty}
                variant="filled"
                backgroundColor={"#CDD3FF"}
                onInputChange={(event, value) => {
                  setValues({ ...values, referral: value });
                  getSpecialty();
                }}
              />
            </Grid>
            <Grid item xs={10}>
              <div className={styles.label}>Prescrição médica:</div>
              <Button
                endIcon={<AddOutlinedIcon />}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontFamily: "Mulish",
                  color: "#003895",
                  backgroundColor: "#FFF",
                  width: "17rem",
                  height: "50px",
                }}
                onClick={() => {
                  !!memedToken
                    ? initMemed(values, setValues, memedToken)
                    : setOpenErrMemedPopUp(true);
                }}
              >
                Adicionar prescrição(Memed)
              </Button>
            </Grid>
            <Grid item xs={10}>
              <div className={styles.label}>Prescrição manual:</div>
              <Grid container spacing={4} alignItems="center" justifyContent="flex-start" direction="row">
                <Grid item xs={4}
                  marginBottom={2}
                >
                  <InputField
                    value={examName}
                    name={"examName"}
                    onChange={(e) => setExamName(e.target.value)}
                    label={"Título da prescrição"}
                    type={"text"}
                    required={false}
                  />
                </Grid>
                <Grid item xs={7} >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid item >
                      <Button
                        variant="contained"
                        marginBottom={2}
                        component="label"
                      >
                        Selecionar Prescrição
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
                        {!!selectedFile ?
                          selectedFile.name :
                          "Nenhum arquivo selecionado"
                        }
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
                <Grid item>
                  <StyledButton
                    text={"Upload"}
                    width={150}
                    height={50}
                    value={"Upload"}
                    variant={"contained"}
                    onClick={(e) => uploadFile(e)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    {statusMessage}
                  </Typography>
                </Grid>
              </Grid>
              <Stack spacing={12} sx={{ paddingTop: "1rem" }}>
                <table>
                  <thead>
                    <tr className={styles.headerTab}>
                      <th>Nome da Prescrição</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptionList.length == 0 ? (<td>Não há arquivos</td>) :
                      (prescriptionList
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((prescription) => {
                          let date = new Date(prescription.date);
                          return (
                            <tr key={prescription._id}>
                              <td>{prescription.name}</td>
                              <td>
                                <StyledButton
                                  text={<DownloadIcon />}
                                  variant="contained"
                                  onClick={() => {
                                    api.post('downloadFile', { "key": prescription.awsKey }, { "responseType": "blob" })
                                      .then((response) => {
                                        fileDownload(response.data, prescription.awsKey);
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
            </Grid>
            <Grid item xs={10}>
              <div className={styles.label}>Informações complementares:</div>
              <InputField
                name="complementar2"
                value={values.complementar2}
                onChange={handleInputChange}
                variant="filled"
                placeholder="Escreva aqui..."
                multiline
                rows={4}
                sx={{
                  width: "75%",
                  borderRadius: "8px;",
                  backgroundColor: "#CDD3FF",
                }}
              ></InputField>
            </Grid>
            <Grid item xs={10}>
              <div className={styles.label}>Lembretes:</div>
              <InputField
                name="notes"
                value={values.notes}
                onChange={handleInputChange}
                variant="filled"
                placeholder="Escreva aqui..."
                multiline
                rows={4}
                sx={{
                  width: "75%",
                  borderRadius: "8px;",
                  backgroundColor: "#CDD3FF",
                }}
              ></InputField>
            </Grid>
          </Grid>
          <Stack
            direction="row"
            justifyContent={"flex-end"}
            alignItems="center"
            spacing={4}
          >
            <StyledButton
              onClick={() => setAba(2)}
              backgroundColor={"#EBB70C"}
              width={365}
              height={50}
              text={"Página anterior"}
              variant={"contained"}
            ></StyledButton>
            <StyledButton
              onClick={handleClickOpen}
              width={365}
              height={50}
              text={"Finalizar"}
              variant={"contained"}
            ></StyledButton>
          </Stack>
        </Stack>
      );
    }
  }, [aba, accordionArray, values, infos, examName, selectedFile, statusMessage, prescriptionList, multipleController]);
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        fontFamily: "Mulish",
        fontStyle: "normal",
        width: "100vw",
        height: "100%",
        ml: "5rem",
        margin: "0 1rem",
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#FFF",
          borderRadius: "8px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          p: "2rem",
        }}
      >
        <Stack sx={{ fontWeight: 700 }}>
          <StyledLink
            href="/profissional/editpaciente"
            state={{ patient_id: patient_id }}
            abaLink={false}
            underline={"none"}
            text={"<Voltar"}
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
            underline={aba == 0 ? "always" : "none"}
            text={"Subjetivo"}
          />

          <StyledLink
            onClick={() => setAba(1)}
            underline={aba == 1 ? "always" : "none"}
            text={"Objetivo"}
          />

          <StyledLink
            onClick={() => setAba(2)}
            underline={aba == 2 ? "always" : "none"}
            text={"Avaliação"}
          />

          <StyledLink
            onClick={() => setAba(3)}
            underline={aba == 3 ? "always" : "none"}
            text={"Plano"}
          />
        </Stack>
        <Stack
          sx={{
            fontFamily: "Mulish",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "24px",
          }}
        >
          {component}
        </Stack>
      </Stack>
      <Aside
        values={values}
        handleInputChange={handleInputChange}
        handleValuesChange={handleValuesChange}
        handleUpdateCareline={handleUpdateCareline.bind(null,setValues,values)}
      />
      <PopUp
        onClick={() => setOpenErrMemedPopUp(false)}
        open={openErrMemedPopUp}
        handleClose={() => setOpenErrMemedPopUp(false)}
        name={"Erro Memed"}
        description={
          "Você não consegue acessar o módulo de prescrição, pois não está cadastrado no Memed. Deseja retornar ao prontuário?"
        }
        action={"retornar"}
      />
      <PopUp
        onClick={() => {
          const today = new Date();
          const time =
            String(today.getHours()).padStart(2, "0") +
            ":" +
            String(today.getMinutes()).padStart(2, "0") +
            ":" +
            String(today.getSeconds()).padStart(2, "0");

          addMeetToRecord(time);
        }}
        open={openPopUp}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        name={"Adicionar consulta"}
        description={"Você deseja adicionar uma nova consulta?"}
        action={"adicionar"}
      />
      <PopUp
        onClick={() => {
          navigate("/profissional/crudpacientes");
        }}
        open={statusOkPopUp}
        handleClickOpen={handleClickOpenStatusOk}
        handleClose={handleCloseStatusOk}
        name={"Consulta Adicionada"}
        description={"A consulta foi adicionada com sucesso! Deseja retornar?"}
        action={"retornar"}
      />
      <PopUp
        onClick={() => {
          setStatusErrPrescriptionPopUp(false);
        }}
        open={statusErrPrescriptionPopUp}
        handleClickOpen={() => { setStatusErrPrescriptionPopUp(true) }}
        handleClose={() => { setStatusErrPrescriptionPopUp(false) }}
        name={"Erro ao adicionar uma prescrição"}
        description={
          "Ocorreu um erro ao adicionar a consulta. Deseja revisar os dados?"
        }
        action={"revisar"}
      />
      <PopUp
        onClick={() => {
          setStatusErrPrescriptionPopUp(false);
        }}
        open={statusErrPrescriptionPopUp}
        handleClickOpen={() => { setStatusErrPrescriptionPopUp(true) }}
        handleClose={() => { setStatusErrPrescriptionPopUp(false) }}
        name={"Erro ao adicionar uma prescrição"}
        description={
          "Ocorreu um erro ao adicionar a prescrição. Deseja revisar os dados?"
        }
        action={"revisar"}
      />
    </Stack>
  );
}
