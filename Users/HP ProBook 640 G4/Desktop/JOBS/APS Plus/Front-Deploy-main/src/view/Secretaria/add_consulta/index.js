import React from "react";
import styles from "./criarConsultaInfoConsulta.module.css";
import InputField from "../../../components/input_field/index";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/user";
import { style } from "@mui/system";
import { Stack, Box, Divider, Typography, Link, Grid, Button } from "@mui/material";
import StyledButton from "../../../components/button/index";
import PopUp from "../../../components/pop_up";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import StyledLink from "../../../components/link";
import api from "../../../services/api";
import AutoCompleteButton from "../../../components/autocomplete_button"
import { fixDate, translateModelOfConsultation } from "../../../utils";

export default function AddConsultaSecretaria() {
  const location = useLocation();
  const patient_id = !!location.state ? location.state.patient_id : ""
  const [visibleStartTime, setVisibleStartTime] = useState("")
  const [component, setComponent] = useState(null);
  const [aba, setAba] = useState(0);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    doctorName: "",
    meetDay: "",
    model: "Remoto",
    startTime: "",
    duration: "20 min",
    patientName: "",
    patientContactNumber: "",
    patientBirthDate: "",
    patientCPF: "",
    patientEmail: "",
    patientRace: "",
    patientInsurance: "",
    medicalCard: "",
    link: ""
  });
  const [timeError, setTimeError] = useState(true)
  const [doctors, setDoctors] = useState([])
  const [doctorId, setDoctorId] = useState("")
  const [availableDate, setAvailableDates] = useState([""])
  const [availableTime, setAvailableTime] = useState([""])
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openPopUpInativ, setOpenPopUpInativ] = useState(false);
  const [openPopUpAdd, setOpenPopUpAdd] = useState(false);
  const [openStatusOKPopUp, setOpenStatusOKPopUp] = useState(false);
  const [openStatusErrPopUp, setOpenStatusErrPopUp] = useState(false);
  const [status4PopUp, setStatus4PopUp] = useState("");

  const handleClickOpenInativ = () => {
    setOpenPopUpInativ(true);
  };

  const handleCloseInativ = () => {
    setOpenPopUpInativ(false);
  };
  const handleClickOpenEdit = () => {
    setOpenPopUpAdd(true);
  };
  const handleCloseEdit = () => {
    setOpenPopUpAdd(false);
  };

  const tranlateDurationToIterations = (duration) => {
    switch (duration) {
      case "20 min":
        return 0;
      case '40 min':
        return 1;
      case '60 min':
        return 2;
    }
  }

  const get_data = async (id) => {
    let startUser
    await api.get(`/user/${id}`).then(resp => startUser = resp.data).catch((error) => console.log(error));
    let obj = {
      doctorName: "",
      meetDay: "",
      model: "",
      startTime: "",
      patientName: !!startUser.nick ? startUser.nick : startUser.name,
      patientContactNumber: startUser.contactNumber,
      patientBirthDate: fixDate(startUser.dateBirth),
      patientCPF: startUser.CPF,
      patientEmail: startUser.email,
      patientRace: startUser.race,
      patientInsurance: startUser.patient.insurance,
      medicalCard: startUser.patient.medicalCard,
    }
    return obj
  };

  const handleClickOpen = () => {
    setOpenPopUp(true);
  };

  const handleClose = () => {
    setOpenPopUp(false);
  };

  const convert_string_to_time = (time_string) => {
    let converted_time
    converted_time = time_string.split(":")
    converted_time = (converted_time[0] * 60 + parseInt(converted_time[1], 10)) / 20
    converted_time = Math.ceil(converted_time)
    return converted_time
  }

  const convert_time_to_string = (time) => {
    return (Math.floor(time / 3) + ":" + String(time * 20 - Math.floor(time / 3) * 60).padEnd(2, '0'))
  }

  const get_id = (name, doctors) => {
    // buscar na array o nome name e retornar o campo _id
    if (!!doctors) {
      for (let i = 0; i < doctors.length; i++) {
        if (doctors[i].name == name) {
          return doctors[i]._id
        }
      }
    }
    return "id not found"
  };

  const handleClickOpenStatusOKPopUp = () => {
    setOpenPopUpInativ(false);
    setOpenPopUpAdd(false);
    setOpenStatusOKPopUp(true);
  };

  const handleCloseStatusOKPopUp = () => {
    setOpenStatusOKPopUp(false);
  };

  const handleClickOpenStatusErrPopUp = () => {
    setOpenPopUpInativ(false);
    setOpenPopUpAdd(false);

    setOpenStatusErrPopUp(true);
  };

  const handleCloseStatusErrPopUp = () => {
    setOpenStatusErrPopUp(false);
  };

  const handleInputChange = (q) => {
    const { name, value } = q.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  // const addQuery = async (e) => {
  //   let patient_id = id
  //   let doctor_id = get_id(values.doctorName, doctors)
  //   let startTime
  //   startTime = values.startTime.split(":")
  //   startTime = (startTime[0] * 60 + parseInt(startTime[1], 10)) / 20
  //   startTime = Math.ceil(startTime)

  //   await api
  //     .post("/query", {
  //       model: translateModelOfConsultation(values.model),
  //       description: values.description,
  //       start: startTime,
  //       date: values.meetDay,
  //       duration: true,
  //       patient: patient_id,
  //       doctor: doctorId,
  //       link: values.link,
  //       info: {
  //         name: values.patientName,
  //         contactNumber: values.patientContactNumber,
  //         birthDay: values.patientBirthDate,
  //         CPF: values.patientCPF,
  //         email: values.patientEmail,
  //         race: values.patientRace,
  //         insurance: values.patientInsurance,
  //         medicalCard: values.medicalCard,
  //       }
  //     })
  //     .catch(error => console.log(error));
  //   let meetDay = values.meetDay.split("/")
  //   meetDay = new Date(meetDay[2], meetDay[1] - 1, meetDay[0])
  //   for (let i = 0; i <= tranlateDurationToIterations(duration); i++) {
  //     let newTime = startTime + i
  //     await api
  //       .patch(`/calendar/busyTime`, {
  //         time: newTime,
  //         date: meetDay,
  //         doctor_id: doctorId,
  //         insert_boolean: true
  //       })
  //       .catch(error => console.log(error))
  //   }
  // };

  const addQuery = async (e) => {
    let error = false
    let startTime = values.startTime

    await api
      .post("/query", {
        model: translateModelOfConsultation(values.model),
        description: values.description,
        startTime: startTime,
        date: values.meetDay,
        duration: values.duration,
        patient: patient_id,
        doctor: doctorId,
        link: values.model == "Remoto" ? values.link : "",
        info: {
          name: values.patientName,
          contactNumber: values.patientContactNumber,
          birthDay: values.patientBirthDate,
          CPF: values.patientCPF,
          email: values.patientEmail,
          race: values.patientRace,
          insurance: values.patientInsurance,
          medicalCard: values.medicalCard,
        }
      })
      .then(() => {
        setOpenPopUpAdd(false)
        setOpenStatusOKPopUp(true)
      })
      .catch(err => {
        console.log(err)
        error = true
      });
    let meetDay = values.meetDay.split("/")
    meetDay = new Date(meetDay[2], meetDay[1] - 1, meetDay[0])
    for (let i = 0; i <= tranlateDurationToIterations(values.duration); i++) {
      let newTime = startTime + i
      await api
        .patch(`/calendar/busyTime`, {
          time: newTime,
          date: meetDay,
          doctor_id: doctorId,
          insert_boolean: true
        })
        .catch(error => console.log(error))
    }

    setOpenPopUpAdd(false)
    if (error)
      setOpenStatusOKPopUp(true)
    else
      setOpenStatusErrPopUp(true)
  }

  const get_doctors = async (name) => {
    let doctors
    let doctors_names = []
    await api
      .get(`/users/name/${name}`)
      .then(response => doctors = response.data)
      .catch(error => console.log(error))
    doctors = doctors.filter(user => user.employee.isDoctor == true)

    // console.log("a lista eh", doctors)
    setDoctorId(get_id(name, doctors))

    for (const [key, value] of Object.entries(doctors)) {
      doctors_names.push(value.name)
    }

    return doctors_names
  }

  const convertDateInterface = (date) => {
    let this_date = date
    var dd = String(this_date.getDate()).padStart(2, '0');
    var mm = String(this_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this_date.getFullYear();

    return this_date = dd + '/' + mm + '/' + yyyy;
  }

  const getCalendar = async (_id) => {
    let calendar
    await api
      .get(`/calendar/${_id}`)
      .then(resp => calendar = resp.data[0])
      .catch(error => console.log(error))

    if (!!calendar) {

      let today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth()
      let yyyy = today.getFullYear()
      let finalDate

      if (mm = 11) {
        finalDate = new Date(yyyy + 1, 0, dd)
      } else {
        finalDate = new Date(yyyy, mm + 1, dd)
      }
      let available_date = []


      while (today < finalDate) {
        if (calendar.weekDay.includes(today.getDay()))
          available_date.push(convertDateInterface(today))
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
      }
      setAvailableDates(available_date)
    }
  }

  const getMeetTimes = async (_id) => {
    let calendar
    await api
      .get(`/calendar/${_id}`)
      .then(resp => calendar = resp.data[0])
      .catch(error => console.log(error))
    if (!!values.meetDay && !!calendar && !!values.duration) {
      let available_time = []
      let chosen_day = values.meetDay.split("/")
      chosen_day = new Date(chosen_day[2], chosen_day[1] - 1, chosen_day[0])
      chosen_day = chosen_day.toISOString()
      for (let start = calendar.start; start < calendar.end; available_time.push(start), start = start + 1) { }
      let todayBusyTime = calendar.busyTime.filter(obj => {
        delete obj._id
        return obj.day == chosen_day
      })

      available_time = available_time.filter(time => {
        let ok = true;

        todayBusyTime.forEach(obj => {
          for (let i = 0; i <= tranlateDurationToIterations(values.duration); i = i + 1) {
            if (JSON.stringify(obj) === JSON.stringify({ time: time + i, day: chosen_day }) || time + i >= calendar.end) {
              ok = false;
            }
          }
          // console.log("COMPARISON", JSON.stringify(obj), JSON.stringify({ time: time, day: chosen_day }))
          // console.log(obj, { time: time, day: chosen_day }, ok)
        })

        return ok
      })
      let available_time_interface = available_time.map((time) => {
        return Math.floor(time / 3) + ":" + String(time * 20 - Math.floor(time / 3) * 60).padEnd(2, '0')
      })

      setAvailableTime(available_time_interface)
      // console.log(available_time_interface)
    }
  }
  useEffect(() => {
    get_data(patient_id).then(resp => setValues(resp)).catch(error => console.log(error))
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      get_doctors(values.doctorName).then(resp => setDoctors(resp.filter( doctor => doctor.isActive)))
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [values.doctorName])

  useEffect(() => {
    setTimeout(() => {
      if (!!doctorId) {
        getMeetTimes(doctorId)
      }
    }, 500)
  }, [values.meetDay, values.duration])

  useEffect(() => {
    setValues({ ...values, meetDay: "" })
    setAvailableDates([])
    getCalendar(doctorId);
  }, [values.doctorName])

  useEffect(() => {
    getCalendar(doctorId)
  }, [doctorId])

  useEffect(() => {
    if (aba == 0) {
      setComponent(
        <Stack spacing={4}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <AutoCompleteButton
                backgroundColor={"#CDD3FF"}
                freeSolo={false}
                names={doctors}
                value={values.doctorName}
                name={"doctorName"}
                variant="filled"
                onInputChange={(event, value) => {
                  setValues({ ...values, doctorName: value })
                }}
                label={"Nome do profissional"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <AutoCompleteButton
                freeSolo={false}
                label={"Dia da consulta"}
                value={values.meetDay}
                names={availableDate}
                variant="filled"
                backgroundColor={"#CDD3FF"}
                onInputChange={(event, value) => {
                  setValues({ ...values, meetDay: value })
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <AutoCompleteButton
                freeSolo={false}
                label={"Modelo de atendimento"}
                names={["Remoto", "Presencial", "Monitoramento"]}
                variant="filled"
                backgroundColor={"#CDD3FF"}
                onInputChange={(event, value) => {
                  setValues({ ...values, model: value })
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <AutoCompleteButton
                freeSolo={false}
                label={"Horário da consulta"}
                value={visibleStartTime}
                names={availableTime}
                variant="filled"
                backgroundColor={"#CDD3FF"}
                onInputChange={(event, value) => {
                  setValues({ ...values, startTime: convert_string_to_time(value) })
                  setVisibleStartTime(value)
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <AutoCompleteButton
                freeSolo={false}
                label={"Tempo da consulta"}
                values={values.duration}
                names={["20 min", "40 min", "60 min"]}
                variant="filled"
                backgroundColor={"#CDD3FF"}
                onInputChange={(event, value) => {
                  setValues({ ...values, duration: value })
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                disabled={values.model != "Remoto"}
                value={values.link}
                name={"link"}
                onChange={handleInputChange}
                label={"Link da vídeochamada"}
                type={"text"}
              />
            </Grid>
          </Grid>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Link
              href={`/secretaria/crudconsulta/${patient_id}`}
              underline="hover"
              sx={{
                fontSize: "16px",
                cursor: "pointer",
                color: "black",
                pr: "3rem",
              }}
            >
              Cancelar
            </Link>
            <StyledButton
              onClick={() => {
                setOpenPopUp(true)
              }}
              width={365}
              height={50}
              text={"Adicionar Consulta"}
              variant={"contained"}
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
                value={values.patientName}
                onChange={handleInputChange}
                name={'patientName'}
                label={"Nome"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.patientContactNumber}
                onChange={handleInputChange}
                name={'patientContactNumber'}
                label={"Contato"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.patientEmail}
                onChange={handleInputChange}
                name={'patientEmail'}
                label={"E-mail"}
                type={"email"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.patientCPF}
                onChange={handleInputChange}
                name={'patientCPF'}
                label={"CPF"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.patientBirthDate}
                onChange={handleInputChange}
                name={'patientBirthDate'}
                label={"Nascimento"}
                type={"date"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.patientRace}
                onChange={handleInputChange}
                name={'patientRace'}
                label={"Raça/Cor"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.patientInsurance}
                onChange={handleInputChange}
                name={'patientInsurance'}
                label={"Convênio"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.medicalCard}
                onChange={handleInputChange}
                name={'medicalCard'}
                label={"Carteirinha"}
                type={"text"}
              />
            </Grid>
          </Grid>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Link
              href="/admin/crudconsulta"
              underline="hover"
              sx={{
                fontSize: "16px",
                cursor: "pointer",
                color: "black",
                pr: "3rem",
              }}
            >
              Cancelar
            </Link>
            <StyledButton
              onClick={() => setOpenPopUp(true)}
              width={365}
              height={50}
              text={"Adicionar Consulta"}
              variant={"contained"}
            ></StyledButton>
          </Stack>
        </Stack>
      );
    }
  }, [aba, values, availableDate, availableTime, doctors]);
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
            href={`/secretaria/crudconsulta/${patient_id}`}
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
            text={"Informações da consulta"}
          />

          <StyledLink
            onClick={() => setAba(1)}
            underline={aba == 1 ? "always" : "none"}
            text={"Informações do paciente"}
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
          name={"Apagar consulta"}
          backgroundColor={"#C9323A"}
          description={"Você deseja apagar esta consulta"}
          action={"apagar"}
          open={openPopUpInativ}
          handleClickOpen={handleClickOpenInativ}
          handleClose={handleCloseInativ}
        />
      )}

      {openPopUpAdd && (
        <PopUp
          name={"Salvar alterações"}
          onClick={addQuery}
          description={"Você deseja adicionar uma consulta com esses dados?"}
          action={"alterar"}
          open={openPopUpAdd}
          handleClickOpen={handleClickOpenEdit}
          handleClose={handleCloseEdit}
        />
      )}

      {openStatusOKPopUp && (
        <PopUp
          onClick={() => {
            navigate("/secretaria/crudconsulta");
          }}
          name={"Consulta editada com sucesso"}
          description={`A consulta foi adicionada com sucesso. Deseja retornar à página de consultas?`}
          action={"retornar"}
          open={openStatusOKPopUp}
          handleClickOpen={handleClickOpenStatusOKPopUp}
          handleClose={handleCloseStatusOKPopUp}
        />
      )}

      {openStatusErrPopUp && (
        <PopUp
          onClick={handleCloseStatusErrPopUp}
          name={"Erro ao editar"}
          description={
            "Ocorreu um erro ao tentar editar a consulta. Deseja rever?"
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