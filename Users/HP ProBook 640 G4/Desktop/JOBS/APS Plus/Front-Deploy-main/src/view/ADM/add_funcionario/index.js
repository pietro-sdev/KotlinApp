import React from "react";
import styles from "./addFuncionario.module.css";
import InputField from "../../../components/input_field/index";
import { useState, useEffect, useContext, useParams } from "react";
import {
  Checkbox,
  Stack,
  FormControl,
  FormGroup,
  FormControlLabel,
  Typography,
  Grid,
  Link,
  Divider,
} from "@mui/material";
import StyledButton from "../../../components/button/index";
import PopUp from "../../../components/pop_up";
import api from "../../../services/api";
import AutoCompleteButton from "./../../../components/autocomplete_button";
import SelectButton from "./../../../components/select_button/index";
import { useNavigate, useLocation } from "react-router-dom";
import { translateSex } from "../../../utils";
import MaskedInput from "../../../components/masked_input";
import StyledLink from "../../../components/link";
import { selectDocument } from './../../../utils/selectDocument';

export default function AddFuncionarioAdmin() {
  const [checked, setChecked] = useState({
    "Domingo": false,
    "Segunda": false,
    "Terca": false,
    "Quarta": false,
    "Quinta": false,
    "Sexta": false,
    "Sabado": false,
  })
  const [openConfirmationPopUp, setOpenConfirmationPopUp] = useState(false);
  const [openStatusOKPopUp, setOpenStatusOKPopUp] = useState(false);
  const [openStatusInativPopUp, setOpenStatusInativPopUp] = useState(false);
  const [openStatusErrPopUp, setOpenStatusErrPopUp] = useState(false);
  const [openPopUpInativ, setOpenPopUpInativ] = useState(false);
  const [component, setComponent] = useState(null);
  const [aba, setAba] = useState(0);
  const [clinicList, setClinicList] = useState(["Sem clínicas"]);
  const [specialties, setSpecialties] = useState(["Sem especialidades"])
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    nick: "",
    sex: "",
    race: "",
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
    isPatient: false,
    isEmployee: true,
    isDoctor: false,
    isAdmin: false,
    isSecretary: false,
    entryDate: new Date().toISOString().slice(0, 10),
    exitDate: "",
    weekDays: [],
    workStart: "",
    workEnd: "",
    workLunchStart: "",
    workLunchEnd: "",
    nationality: "",
    documentNumber: "",
    documentEmissionState: "",
    permissionLevel: "",
    speciality: "",
    team: "",
    RQE: "",
    clinic: "",
    workplaceStreet: "",
    workplaceCEP: "",
    workplaceCity: "",
    workplaceUF: "",
    workContactNumber: "",
    employee: {},
    setFinalDate: "Não",
    setLunchTime: "Não",
  });

  const id = !!useLocation().state ? useLocation().state.id : "";

  const getClinicsNames = () => {
    api.get('/clinics').then(res => setClinicList(!!res.data ? res.data : '')).catch(e => console.log(e))
  }

  const convert_time = (time_string) => {
    let converted_time
    converted_time = time_string.split(":")
    converted_time = (converted_time[0] * 60 + parseInt(converted_time[1], 10)) / 20
    converted_time = Math.ceil(converted_time)
    return converted_time
  }

  const getSpecialties = () => {
    api
      .get('/specialties')
      .then(res => { setSpecialties(!!res.data ? res.data.map((specialty) => { return specialty.info }) : []) })
      .catch(err => console.log(err))
  }

  const navigate = useNavigate();

  const handleClickOpenConfirmationPopUp = () => {
    setOpenConfirmationPopUp(true);
  };

  const handleClickOpenPopUpInativ = () => {
    setOpenPopUpInativ(true);
  };

  const handleCloseConfirmationPopUp = () => {
    setOpenConfirmationPopUp(false);
  };

  const handleClosePopUpInativ = () => {
    setOpenPopUpInativ(false);
  };

  const handleClickOpenStatusOKPopUp = () => {
    setOpenStatusOKPopUp(true);
  };

  const handleClickOpenStatusInativPopUp = () => {
    setOpenStatusInativPopUp(true);
  };

  const handleCloseStatusOKPopUp = () => {
    setOpenStatusOKPopUp(false);
  };

  const handleCloseStatusInativPopUp = () => {
    setOpenStatusInativPopUp(false);
  };

  const handleClickOpenStatusErrPopUp = () => {
    setOpenStatusErrPopUp(true);
  };

  const handleCloseStatusErrPopUp = () => {
    setOpenStatusErrPopUp(false);
  };

  //com base nas propriedades name e value do textfield/Input atualiza os valores
  const handleInputChange = (q) => {
    const { name, value } = q.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCheckBox = (e) => {
    let weekDay = e.target.name
    setChecked({ ...checked, [weekDay]: !checked[weekDay] })
  }

  const addEmployee = async (e) => {

    let failed = false
    let logged = false
    let workDays = []
    let doctor_id
    for (let i = 0; i <= 6; i = i + 1) {
      if (Object.entries(checked)[i][1] == true)
        workDays.push(i)
    }

    await api
      .post("/user", {
        password: "Teste1234",
        isActive: true,
        email: values.email,
        password: "",
        name: values.name,
        nick: values.nick,
        sex: translateSex(values.sex),
        race: values.race,
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
        isPatient: false,
        isEmployee: true,
        employee: {
          isDoctor: values.profession == "Secretário(a)" || values.profession == "Administrador(a)" ? false : true,
          isAdmin: values.profession == "Administrador(a)" ? true : false,
          isSecretary: values.profession == "Secretário(a)" ? true : false,
          entryDate: values.entryDate,
          exitDate: values.setFinalDate == "Não" ? "01/01/4000" : values.exitDate,
          workDays: workDays,
          workStart: values.workStart,
          workEnd: values.workEnd,
          workLunchStart: values.setLunchTime == "Não" ? "" : values.workLunchStart,
          workLunchEnd: values.setLunchTime == "Não" ? "" : values.workLunchEnd,
          nationality: values.nationality,
          document: selectDocument(values.profession),
          documentEmissionState: values.documentEmissionState,
          documentNumber: values.documentNumber,
          clinic: values.clinic,
          speciality: values.speciality,
          RQE: values.RQE,
          workplace: {
            clinic: values.clinic,
            address: values.workplaceStreet,
            CEP: values.workplaceCEP,
            city: values.workplaceCity,
            UF: values.workplaceUF,
          },
          workContactNumber: values.workContactNumber
        },
      })
      .then((resp) => {
        doctor_id = resp.data._id

        if (values.profession == "Secretário(a)" || values.profession == "Administrador(a)" ? false : true) {

          api
            .post("/calendar", {
              start: convert_time(values.workStart),
              end: convert_time(values.workEnd),
              workLunchStart: !!values.workLunchStart ? convert_time(values.workLunchStart) : null,
              workLunchEnd: !!values.workLunchEnd ? convert_time(values.workLunchEnd) : null,
              busyTime: [],
              weekDay: workDays,
              doctor: doctor_id
            })
            .then(() => setOpenStatusOKPopUp(true))
            .catch(error => {
              console.log(error)
              failed = true
              setOpenStatusErrPopUp(true);
              api.
                delete(`/user/${doctor_id}`)
                .catch(error => console.log(error))
            })
        }
        setOpenStatusOKPopUp(true)
      })
      .catch((error) => {
        setOpenStatusErrPopUp(true);
        console.log(error);
      });
  };

  const editEmployee = async (e) => {
    if (!!id) {
      let failed = false
      let workDays = []
      let doctor_id
      let calendar_id

      for (let i = 0; i <= 6; i = i + 1) {
        if (Object.entries(checked)[i][1] == true)
          workDays.push(i)
      }

      await api
        .patch(`/user/${id}`, {
          isActive: true,
          email: values.email,
          name: values.name,
          nick: values.nick,
          sex: translateSex(values.sex),
          race: values.race,
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
          isPatient: false,
          isEmployee: true,
          employee: {
            isDoctor: values.profession == "Secretário(a)" || values.profession == "Administrador(a)" ? false : true,
            isAdmin: values.profession == "Administrador(a)" ? true : false,
            isSecretary: values.profession == "Secretário(a)" ? true : false,
            entryDate: values.entryDate,
            exitDate: values.exitDate,
            workDays: workDays,
            workStart: values.workStart,
            workEnd: values.workEnd,
            workLunchStart: values.setLunchTime == "Não" ? "" : values.workLunchStart,
            workLunchEnd: values.setLunchTime == "Não" ? "" : values.workLunchEnd,
            nationality: values.nationality,
            document: selectDocument(values.profession),
            documentEmissionState: values.documentEmissionState,
            documentNumber: values.documentNumber,
            clinic: values.clinic,
            speciality: values.speciality,
            team: values.team,
            RQE: values.RQE,
            workplace: {
              clinic: values.clinic,
              address: values.workplaceStreet,
              CEP: values.workplaceCEP,
              city: values.workplaceCity,
              UF: values.workplaceUF,
            },
            workContactNumber: values.workContactNumber
          },
        })
        .then((res) => {
          setOpenStatusOKPopUp(true);
        })
        .catch((error) => {
          failed = true
          setOpenStatusErrPopUp(true);
          console.log(error);
        });

      if (values.profession == "Secretário(a)" || values.profession == "Administrador(a)" ? false : true && !failed) {

        await api
          .get(`/calendar/${id}`)
          .then(resp => {
            calendar_id = resp.data[0]._id
            api
              .patch(`/calendar/${calendar_id}`, {
                start: convert_time(values.workStart),
                end: convert_time(values.workEnd),
                workLunchStart: !!values.workLunchStart ? convert_time(values.workLunchStart) : null,
                workLunchEnd: !!values.workLunchEnd ? convert_time(values.workLunchEnd) : null,
                weekDay: workDays,
              })
              .then(() => {
                setOpenStatusOKPopUp(true)
              })
              .catch(error => {
                console.log(error)
                failed = true
                setOpenStatusErrPopUp(true);
                if (error.status == '404') {
                  api
                    .post("/calendar", {
                      start: convert_time(values.workStart),
                      end: convert_time(values.workEnd),
                      workLunchStart: !!values.workLunchStart ? convert_time(values.workLunchStart) : null,
                      workLunchEnd: !!values.workLunchEnd ? convert_time(values.workLunchEnd) : null,
                      busyTime: [],
                      weekDay: workDays,
                      doctor: doctor_id
                    })
                    .then(() => setOpenStatusOKPopUp(true))
                    .catch(error => {
                      console.log(error)
                      failed = true
                      setOpenStatusErrPopUp(true);
                      api.
                        delete(`/user/${doctor_id}`)
                        .catch(error => console.log(error))
                    })
                }
              })
          })
          .catch(err => console.log(err))
      }
    }
  };

  const inativEmployee = async (e) => {
    await api.patch(`/user/${id}`, {
      isActive: false
    })
      .then(() => {
        setOpenStatusInativPopUp(true);
      })
      .catch((error) => {
        console.log(error);
        setOpenStatusErrPopUp(true);
      });
  }

  const fixDate = (date) => {
    let newDate = new Date(date);
    newDate = newDate.toISOString().split("T")[0];
    return newDate;
  };

  const getOldInfos = () => {
    if (!!id) {
      api
        .get(`/user/${id}`)
        .then((res) => {
          let data = res.data;
          setValues({
            email: data.email,
            name: data.name,
            nick: data.nick,
            sex: translateSex(data.sex),
            race: data.race,
            CPF: data.CPF,
            RG: data.RG,
            dateBirth: fixDate(data.dateBirth),
            contactNumber: data.contactNumber,
            // inside address
            street: !!data.address ? data.address.street : '',
            CEP: !!data.address ? data.address.CEP : '',
            city: !!data.address ? data.address.city : '',
            UF: !!data.address ? data.address.UF : '',

            company: data.company,
            profession: data.profession,

            // inside employee
            entryDate: !!data.employee ? fixDate(data.employee.entryDate) : new Date().toLocaleDateString(), //.toISOString().slice(0, 10),
            exitDate: !!data.employee ? fixDate(data.employee.exitDate) : '',
            weekDays: !!data.employee ? data.employee.workDays : [],
            workStart: !!data.employee ? data.employee.workStart : '',
            workEnd: !!data.employee ? data.employee.workEnd : '',
            workLunch: !!data.employee ? data.employee.workLunchStart : '',
            workLunch: !!data.employee ? data.employee.workLunchEnd : '',
            nationality: !!data.employee ? data.employee.nationality : '',
            documentNumber: !!data.employee ? !!data.employee.documentNumber ? data.employee.documentNumber : '' : '',
            documentEmissionState: !!data.employee ? data.employee.documentEmissionState : '',
            permissionLevel: !!data.employee ? data.employee.permissionLevel : '',
            speciality: !!data.employee ? data.employee.speciality : '',
            team: !!data.employee ? data.employee.team : '',
            RQE: !!data.employee ? data.employee.RQE : '',
            workContactNumber: !!data.employee ? data.employee.workContactNumber : '',

            // inside workplace
            clinic: !!data.employee ? !!data.employee.workplace ? data.employee.workplace.clinic : '' : '',
            workplaceStreet: !!data.employee ? !!data.employee.workplace ? data.employee.workplace.street : '' : '',
            workplaceCEP: !!data.employee ? !!data.employee.workplace ? data.employee.workplace.CEP : '' : '',
            workplaceCity: !!data.employee ? !!data.employee.workplace ? data.employee.workplace.City : '' : '',
            workplaceUF: !!data.employee ? !!data.employee.workplace ? data.employee.workplace.UF : '' : '',
            setFinalDate: "Não",
            setLunchTime: "Não",

          })
          let weekDays = !!data.employee ? data.employee.workDays : []
          setChecked({
            "Domingo": !!weekDays.includes(0) ? true : false,
            "Segunda": !!weekDays.includes(1) ? true : false,
            "Terca": !!weekDays.includes(2) ? true : false,
            "Quarta": !!weekDays.includes(3) ? true : false,
            "Quinta": !!weekDays.includes(4) ? true : false,
            "Sexta": !!weekDays.includes(5) ? true : false,
            "Sabado": !!weekDays.includes(6) ? true : false,
          })
        })
        .catch((error) => { console.log(error) })
    }
  }

  useEffect(() => getClinicsNames(), [])

  useEffect(() => { getSpecialties() }, [])

  useEffect(() => {
    if (!!id) {
      getOldInfos()
    }
  }, [])

  useEffect(() => {
    if (values.profession != "Secretário(a)" && values.profession != "Administrador(a)") {
      setValues({
        ...values,
        isDoctor: true
      })
    }
  }, [values.profession, aba])

  useEffect(() => {
    if (!!values.clinic && !!clinicList) {
      const clinic = clinicList.find(element => element.name == values.clinic)
      if (!!clinic) {
        setValues({
          ...values,
          workplaceCEP: clinic.address.CEP,
          workplaceStreet: clinic.address.street,
          workplaceUF: clinic.address.state,
          workplaceCity: clinic.address.city,
          workContactNumber: clinic.address.phone
        })
      }
    }
  }, [values.clinic])

  useEffect(() => {
    if (aba == 0) {
      setComponent(
        <Stack spacing={4}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <InputField
                value={values.name}
                name="name"
                onChange={handleInputChange}
                label={"Nome Completo"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.nick}
                name="nick"
                onChange={handleInputChange}
                label={"Nome Social"}
                type={"text"}
                required={false}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.email}
                name="email"
                onChange={handleInputChange}
                label={"Email"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.dateBirth}
                name="dateBirth"
                onChange={handleInputChange}
                label={"Data de nascimento"}
                type={"date"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                select={true}
                value={values.race}
                onChange={handleInputChange}
                names={["Branco(a)", "Pardo(a)", "Preto(a)", "Amarelo(a)", "Indígena", "Prefiro não informar"]}
                label={"Cor"}
                name={"race"}
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
              <MaskedInput
                value={values.contactNumber}
                name={"contactNumber"}
                onChange={handleInputChange}
                label={"Telefone pessoal"}
                mask={"(99)99999-9999"}
              />
            </Grid>
            <Grid item xs={4}>
              <MaskedInput
                value={values.CPF}
                name={"CPF"}
                onChange={handleInputChange}
                label={"CPF"}
                type={"text"}
                mask={"999.999.999-99"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.RG}
                name="RG"
                onChange={handleInputChange}
                label={"RG"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.street}
                name="street"
                onChange={handleInputChange}
                label={"Endereço"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <MaskedInput
                value={values.CEP}
                name="CEP"
                onChange={handleInputChange}
                label={"CEP"}
                mask={"99999-999"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.city}
                name="city"
                onChange={handleInputChange}
                label={"Cidade"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                select={true}
                value={values.UF}
                name="UF"
                onChange={handleInputChange}
                names={['', "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]}
                label={"UF"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.nationality}
                name="nationality"
                onChange={handleInputChange}
                label={"Nacionalidade"}
                type={"text"}
              />
            </Grid>
          </Grid>
          <Stack
            direction="row"
            justifyContent={"flex-end"}
            alignItems="center"
            spacing={4}
          >
            {!!id &&
              (<Link
                onClick={() => setOpenPopUpInativ(true)}
                underline="hover"
                sx={{
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "black",
                  pr: "3rem",
                }}
              >
                Inativar funcionário
              </Link>)
            }
            <StyledButton
              onClick={() => setAba(1)}
              width={365}
              height={50}
              variant="contained"
              text={"Próxima Página"}
            ></StyledButton>
          </Stack>
        </Stack>
      );
    }
    if (aba == 1) {
      setComponent(
        <Stack spacing={4}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <InputField
                select={true}
                required={true}
                value={values.profession}
                name="profession"
                label={"Atuação"}
                names={["Médico(a)", "Enfermeiro(a)", "Nutricionista", "Psicólogo(a)", "Educador(a) Físico", "Assistente Social", "Secretário(a)", "Administrador(a)"]}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.documentNumber}
                name="documentNumber"
                onChange={handleInputChange}
                label={!!selectDocument(values.profession) ? selectDocument(values.profession) : "Número do Órgão Regional"}
                type={"text"}
                required={values.profession == "Secretário(a)" || values.profession == "Administrador(a)" ? false : true}
                disabled={values.profession == "Secretário(a)" || values.profession == "Administrador(a)" ? true : false}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                select={true}
                value={values.documentEmissionState}
                name="documentEmissionState"
                onChange={handleInputChange}
                names={["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]}
                label={"Estado de Emissão"}
                required={values.profession == "Secretário(a)" || values.profession == "Administrador(a)" ? false : true}
                disabled={values.profession == "Secretário(a)" || values.profession == "Administrador(a)" ? true : false}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.RQE}
                name="RQE"
                onChange={handleInputChange}
                label={"RQE"}
                type={"text"}
                required={false}
                disabled={values.profession === "Médico(a)" ? false : true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                select={true}
                value={values.speciality}
                name="speciality"
                onChange={handleInputChange}
                names={specialties}
                label={"Especialidade"}
                type={"text"}
                required={false}
                disabled={values.profession === "Médico(a)" ? false : true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.entryDate}
                name="entryDate"
                onChange={handleInputChange}
                label={"Início de trabalho"}
                type={"date"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                select={true}
                value={values.clinic}
                name="clinic"
                onChange={handleInputChange}
                names={clinicList.map((obj) => obj.name)}
                label={"Clínica"}
                required={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.workplaceStreet}
                name="workplaceStreet"
                onChange={handleInputChange}
                label={"Endereço de trabalho"}
                type={"text"}
                required={true}
                disabled={true}
              />
            </Grid>
            <Grid item xs={4}>
              <MaskedInput
                value={values.workplaceCEP}
                name="workplaceCEP"
                onChange={handleInputChange}
                label={"CEP"}
                type={"text"}
                required={true}
                disabled={true}
                mask={"99999-999"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.workplaceCity}
                name="workplaceCity"
                onChange={handleInputChange}
                label={"Cidade"}
                type={"text"}
                required={true}
                disabled={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                select={true}
                value={values.workplaceUF}
                name="workplaceUF"
                onChange={handleInputChange}
                names={["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]}
                label={"UF"}
                required={true}
                disabled={true}

              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.team}
                name={"team"}
                onChange={handleInputChange}
                label={"Time"}
                type={"text"}
                required={false}
              />
            </Grid>
          </Grid>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            spacing={2}
          >
            {!!id &&
              (<Link
                onClick={() => setOpenPopUpInativ(true)}
                underline="hover"
                sx={{
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "black",
                  pr: "3rem",
                }}
              >
                Inativar funcionário
              </Link>)
            }
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
              text={"Próxima página"}
              variant={"contained"}
            ></StyledButton>
          </Stack>
        </Stack>
      );
    }
    if (aba == 2) {
      const sx1 = {
        backgroundColor: "#E5E9FF",
        padding: "0.2rem 1rem 0.2rem 1rem",
        borderRadius: "1rem",
      };
      const sx2 = {
        color: "#003895",
        fontFamily: "Mulish",
        fontWeight: 800,
      };

      setComponent(
        <Stack spacing={4}>
          <Stack spacing={4}>
            <Stack
              spacing={-10}
              direction={"row"}
              justifyContent={"space-evenly"}
            >
              <FormControlLabel
                sx={sx1}
                control={<Checkbox />}
                checked={checked.Segunda}
                name="Segunda"
                onChange={(e) => handleCheckBox(e)}
                label={<Typography sx={sx2}>Segunda-feira</Typography>}
              />
              <FormControlLabel
                sx={sx1}
                control={<Checkbox />}
                checked={checked.Terca}
                name="Terca"
                onChange={(e) => handleCheckBox(e)}
                label={<Typography sx={sx2}>Terça-feira</Typography>}
              />
              <FormControlLabel
                sx={sx1}
                control={<Checkbox />}
                checked={checked.Quarta}
                name="Quarta"
                onChange={(e) => handleCheckBox(e)}
                label={<Typography sx={sx2}>Quarta-feira</Typography>}
              />
              <FormControlLabel
                sx={sx1}
                control={<Checkbox />}
                checked={checked.Quinta}
                name="Quinta"
                onChange={(e) => handleCheckBox(e)}
                label={<Typography sx={sx2}>Quinta-feira</Typography>}
              />
              <FormControlLabel
                sx={sx1}
                control={<Checkbox />}
                checked={checked.Sexta}
                name="Sexta"
                onChange={(e) => handleCheckBox(e)}
                label={<Typography sx={sx2}>Sexta-feira</Typography>}
              />
            </Stack>
            <Stack
              spacing={-50}
              direction={"row"}
              justifyContent={"space-evenly"}
            >
              <FormControlLabel
                sx={sx1}
                control={<Checkbox />}
                checked={checked.Sabado}
                name="Sabado"
                onChange={(e) => handleCheckBox(e)}
                label={<Typography sx={sx2}>Sábado</Typography>}
              />
              <FormControlLabel
                sx={sx1}
                control={<Checkbox />}
                checked={checked.Domingo}
                name="Domingo"
                onChange={(e) => handleCheckBox(e)}
                label={<Typography sx={sx2}>Domingo</Typography>}
              />
            </Stack>
          </Stack>

          <Grid container spacing={4} justifyContent="center" >
            <Grid item xs={4}>
              <InputField
                value={values.entryDate}
                name="entryDate"
                onChange={handleInputChange}
                label={"Data Inicial"}
                type={"date"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.setFinalDate}
                name="setFinalDate"
                onChange={handleInputChange}
                label={"Deseaja indicar data de fim?"}
                select={true}
                names={["Sim", "Não"]}
                type={"date"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.exitDate}
                disabled={values.setFinalDate == "Não"}
                name="exitDate"
                onChange={handleInputChange}
                label={"Data Final"}
                type={values.setFinalDate == "Não" ? "text" : "date"}
              />
            </Grid>
            <Grid item xs={5}>
              <MaskedInput
                value={values.workStart}
                name="workStart"
                onChange={handleInputChange}
                label={"Horário de Início"}
                mask={"99:99"}
              />
            </Grid>
            <Grid item xs={5}>
              <MaskedInput
                value={values.workEnd}
                name="workEnd"
                onChange={handleInputChange}
                label={"Horário de fim"}
                mask={"99:99"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.setLunchTime}
                name="setLunchTime"
                onChange={handleInputChange}
                label={"Deseaja indicar horário de almoço?"}
                select={true}
                names={["Sim", "Não"]}
                type={"date"}
              />
            </Grid>
            <Grid item xs={4}>
              <MaskedInput
                value={values.workLunchStart}
                name="workLunchStart"
                disabled={values.setLunchTime == "Não"}
                onChange={handleInputChange}
                label={"Início do horário de almoço"}
                mask={"99:99"}
              />
            </Grid>
            <Grid item xs={4}>
              <MaskedInput
                value={values.workLunchEnd}
                name="workLunchEnd"
                disabled={values.setLunchTime == "Não"}
                onChange={handleInputChange}
                label={"Fim do horário de almoço"}
                mask={"99:99"}
              />
            </Grid>
          </Grid>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            marginTop={"2rem"}
          >
            {!!id &&
              (<Link
                onClick={() => setOpenPopUpInativ(true)}
                underline="hover"
                sx={{
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "black",
                  pr: "3rem",
                }}
              >
                Inativar funcionário
              </Link>)
            }
            <StyledButton
              onClick={() => setOpenConfirmationPopUp(true)}
              width={365}
              height={50}
              variant="contained"
              text={`${!!id ? 'Editar' : 'Adicionar'} Funcionário`}
            ></StyledButton>
          </Stack>
        </Stack>
      );
    }
  }, [aba, values, checked]);

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
            href={"/admin/crudfunc"}
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
            underline={aba == 0 ? "always" : "none"}
            text={"Dados pessoais"}
          />

          <StyledLink
            onClick={() => setAba(1)}
            underline={aba == 1 ? "always" : "none"}
            text={"Dados profissionais"}
          />

          <StyledLink
            onClick={() => setAba(2)}
            underline={aba == 2 ? "always" : "none"}
            text={"Horário de trabalho"}
          />
        </Stack>

        <Stack
          sx={{
            fontFamily: "Mulish",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "24px",
            width: "75rem",
          }}
        >
          {component}
        </Stack>
      </Stack>
      {openPopUpInativ && (
        <PopUp
          name={`Inativar Funcionário`}
          description={`Você deseja inativar este funcionário?`}
          action={`inativar`}
          onClick={() => {
            inativEmployee()
            setOpenPopUpInativ(false)
          }}
          open={openPopUpInativ}
          handleClickOpen={handleClickOpenPopUpInativ}
          handleClose={handleClosePopUpInativ}
        />
      )}
      {openConfirmationPopUp && (
        <PopUp
          name={`${!!id ? 'Editar' : 'Adicionar'} Funcionário`}
          description={`Você deseja ${!!id ? 'editar o' : 'adicionar um novo'} funcionário?`}
          action={`${!!id ? 'editar' : 'adicionar'}`}
          onClick={() => {
            if (!!id) editEmployee();
            else addEmployee();
            setOpenConfirmationPopUp(false)
          }}
          open={openConfirmationPopUp}
          handleClickOpen={handleClickOpenConfirmationPopUp}
          handleClose={handleCloseConfirmationPopUp}
        />
      )}
      {openStatusInativPopUp && (
        <PopUp
          onClick={() => {
            navigate("/admin/crudfunc");
          }}
          backgroundColor={"#C9323A"}
          name={`Funcionário inativado com sucesso`}
          description={`O funcionário ${!!values.nick ? values.nick.split(" ")[0] : values.name.split(" ")[0]
            }  foi inativado com sucesso. Deseja retornar à página de funcionários?`}
          action={"retornar"}
          open={openStatusInativPopUp}
          handleClickOpen={handleClickOpenStatusInativPopUp}
          handleClose={handleCloseStatusInativPopUp}
        />
      )}
      {openStatusOKPopUp && (
        <PopUp
          onClick={() => {
            navigate("/admin/crudfunc");
          }}
          name={`Funcionário ${!!id ? 'editado' : 'adicionado'} com sucesso`}
          description={`O funcionário ${!!values.nick ? values.nick.split(" ")[0] : values.name.split(" ")[0]
            }  foi ${!!id ? 'editado' : 'adicionado'} com sucesso. Deseja retornar à página de funcionários?`}
          action={"retornar"}
          open={openStatusOKPopUp}
          handleClickOpen={handleClickOpenStatusOKPopUp}
          handleClose={handleCloseStatusOKPopUp}
        />
      )}
      {openStatusErrPopUp && (
        <PopUp
          onClick={handleCloseStatusErrPopUp}
          name={`Erro ao ${!!id ? 'editar' : 'adicionar'} funcionário`}
          description={
            `Ocorreu um erro ao tentar ${!!id ? 'editar' : 'adicionar'} o funcionário. Deseja rever?`
          }
          action={"rever dados"}
          open={openStatusErrPopUp}
          handleClickOpen={handleClickOpenStatusErrPopUp}
          handleClose={handleCloseStatusErrPopUp}
        />
      )}
    </Stack>
  );
}
