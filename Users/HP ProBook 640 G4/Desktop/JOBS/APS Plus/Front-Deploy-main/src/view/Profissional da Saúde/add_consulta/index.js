import React from "react";
import styles from "./addConsulta.module.css";
import InputField from "../../../components/input_field/index";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/user";
import { style } from "@mui/system";
import { Stack, Box, Divider, Typography, Link, Grid } from "@mui/material";
import StyledButton from "../../../components/button/index";
import PopUp from "../../../components/pop_up";
import { useLocation, useParams } from "react-router-dom";
import { userContext } from "./../../../context/user";
import api from "../../../services/api";
import AutoCompleteButton from "../../../components/autocomplete_button"
import StyledLink from "../../../components/link";

export default function AddConsultaProfissional() {
  let values_empty = {
    doctorName: "",
    meetDay: "",
    model: "",
    startTime: "",
    extended: true,
    patientName: "",
    patientContactNumber: "",
    patientBirthDate: "",
    patientCPF: "",
    patientEmail: "",
    patientRace: "",
    patientInsurance: "",
    medicalCard: "",
    link: ""
  };
  const location = useLocation();
  const { id } = useParams()
  const [component, setComponent] = useState(null);
  const [aba, setAba] = useState(0);
  const [openConfirmationPopUp, setOpenConfirmationPopUp] = useState(false);
  const [openStatusOKPopUp, setOpenStatusOKPopUp] = useState(false);
  const [openStatusErrPopUp, setOpenStatusErrPopUp] = useState(false);
  const [status4PopUp, setStatus4PopUp] = useState("");
  const [values, setValues] = useState(values_empty);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [availableDate, setAvailableDates] = useState([""]);
  const [availableTime, setAvailableTime] = useState([""]);
  // const patientId = location.state.patientId;

  const [duration, setDuration] = useState("20 min");
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
  const translateModelOfConsultation = (model) => {
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

  const get_data = async (id) => {
    let startUser
    await api.get(`/user/${id}`).then(resp => startUser = resp.data).catch((error) => console.log(error));
    let obj = {
      doctorName: "",
      meetDay: "",
      model: "",
      startTime: "",
      extended: true,
      patientName: startUser.name,
      patientContactNumber: startUser.contactNumber,
      patientBirthDate: startUser.dateBirth,
      patientCPF: startUser.CPF,
      patientEmail: startUser.email,
      patientRace: startUser.race,
      patientInsurance: startUser.patient.insurance,
      medicalCard: startUser.patient.medicalCard,
    }
    return obj
  };

  if (id != "1" && values == values_empty) {
    get_data(id).then(resp => setValues(resp)).catch(error => console.log(error))
  }

  const handleClickOpenConfirmationPopUp = (e) => {
    setOpenConfirmationPopUp(false);
    addQuery(e);
  };

  const handleCloseConfirmationPopUp = () => {
    setOpenConfirmationPopUp(false);
  };

  const handleClickOpenStatusOKPopUp = () => {
    setOpenStatusOKPopUp(true);
  };

  const handleCloseStatusOKPopUp = () => {
    setOpenStatusOKPopUp(false);
  };

  const handleClickOpenStatusErrPopUp = () => {
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

  const convert_time = (time_string) => {
    let converted_time
    converted_time = time_string.split(":")
    converted_time = (converted_time[0] * 60 + parseInt(converted_time[1], 10)) / 20
    converted_time = Math.ceil(converted_time)
    return converted_time
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

  const addQuery = async (e) => {
    let patient_id = id
    let doctor_id = get_id(values.doctorName, doctors)
    let startTime
    startTime = values.startTime.split(":")
    startTime = (startTime[0] * 60 + parseInt(startTime[1], 10)) / 20
    startTime = Math.ceil(startTime)

    await api
      .post("/query", {
        model: translateModelOfConsultation(values.model),
        description: values.description,
        start: startTime,
        date: values.meetDay,
        extended: true,
        patient: patient_id,
        doctor: doctorId,
        link: values.link,
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
      .catch(error => console.log(error));
    let meetDay = values.meetDay.split("/")
    meetDay = new Date(meetDay[2], meetDay[1] - 1, meetDay[0])
    for (let i = 0; i <= tranlateDurationToIterations(duration); i++) {
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
  };

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
    // console.log("CALENDAR:", calendar)
    if (!!values.meetDay && !!calendar && !!duration) {
      let available_time = []
      // console.log("DAYYYYY", values.meetDay)
      let chosen_day = values.meetDay.split("/")
      chosen_day = new Date(chosen_day[2], chosen_day[1] - 1, chosen_day[0])
      chosen_day = chosen_day.toISOString()
      // console.log("DAY", chosen_day)
      for (let start = calendar.start; start < calendar.end; available_time.push(start), start = start + 1) { }
      let todayBusyTime = calendar.busyTime.filter(obj => {
        delete obj._id
        return obj.day == chosen_day
      })

      // calendar.busyTime.forEach(obj => {
      //   delete obj._id
      // })

      // console.log("ANTES", available_time)
      available_time = available_time.filter(time => {
        let ok = true;

        todayBusyTime.forEach(obj => {
          // console.log(obj)
          for (let i = 0; i <= tranlateDurationToIterations(duration); i = i + 1) {
            if (JSON.stringify(obj) === JSON.stringify({ time: time + i, day: chosen_day }) || time + i >= calendar.end) {
              ok = false;
            }
          }
          // console.log("COMPARISON", JSON.stringify(obj), JSON.stringify({ time: time, day: chosen_day }))
          // console.log(obj, { time: time, day: chosen_day }, ok)
        })

        return ok
      })
      // console.log("DPS", available_time)
      let available_time_interface = available_time.map((time) => {
        return Math.floor(time / 3) + ":" + String(time * 20 - Math.floor(time / 3) * 60).padEnd(2, '0')
      })

      setAvailableTime(available_time_interface)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      get_doctors(values.doctorName).then(resp => setDoctors(resp))
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [values.doctorName])

  useEffect(() => {
    setValues({ ...values, startTime: "" })
    setAvailableTime([])
    getCalendar(doctorId).then(getMeetTimes(doctorId));
  }, [values.meetDay, duration])

  useEffect(() => {
    setValues({ ...values, meetDay: "" })
    setAvailableDates([])
    getCalendar(doctorId);
  }, [values.doctorName])

  useEffect(() => {
    // console.log("ID", doctorId)
    getCalendar(doctorId)
  }, [doctorId])

  useEffect(() => {
    // console.log("PROPS", values, duration)
    if (aba == 0) {
      setComponent(
        <div className={styles.dados}>
          <div className={styles.linha}>
            <AutoCompleteButton
              width="100%"
              freeSolo={false}
              label={"Nome do profissional"}
              names={doctors}
              variant="filled"
              backgroundColor={"#CDD3FF"}
              onInputChange={(event, value) => {
                setValues({ ...values, doctorName: value })
              }}
              margin={"20px 30px 20px 30px"}
            />
            <AutoCompleteButton
              width="100%"
              freeSolo={false}
              label={"Dia da consulta"}
              names={availableDate}
              variant="filled"
              backgroundColor={"#CDD3FF"}
              onInputChange={(event, value) => {
                setValues({ ...values, meetDay: value })
              }}
              margin={"20px 30px 20px 30px"}
            />
            <AutoCompleteButton
              width="100%"
              freeSolo={false}
              label={"Modelo de atendimento"}
              names={["Remoto", "Presencial", "Monitoramento"]}
              variant="filled"
              backgroundColor={"#CDD3FF"}
              onInputChange={(event, value) => {
                setValues({ ...values, model: value })
              }}
              margin={"20px 30px 20px 30px"}
            />
            {/* <InputField
              name={"doctorName"}
              value={values.doctorName}
              onChange={handleInputChange}
              label={"Nome do profissional"}
              margin={"20px 30px 20px 30px"}
              type={"text"}
            />
            <InputField
              name={"meetDay"}
              value={values.meetDay}
              onChange={handleInputChange}
              label={"Data da consulta"}
              margin={"20px 30px 20px 30px"}
              type={"text"}
            />
            <InputField
              name={"model"}
              value={values.model}
              onChange={handleInputChange}
              label={"Modelo de atendimento"}
              margin={"20px 30px 20px 30px"}
              type={"text"}
            /> */}
          </div>

          <div className={styles.linha2}>
            {/* <InputField
              error = {timeError}
              name={"startTime"}
              value={values.startTime}
              onChange={handleInputChange}
              label={"Horário"}
              margin={"20px 30px 20px 30px"}
              width={"30%"}
              type={"text"}
            /> */}
            <AutoCompleteButton
              width="100%"
              freeSolo={false}
              label={"Horário da consulta"}
              names={availableTime}
              variant="filled"
              backgroundColor={"#CDD3FF"}
              onInputChange={(event, value) => {
                setValues({ ...values, startTime: value })
              }}
              margin={"20px 30px 20px 30px"}
            />
            <InputField
              select={true}
              value={duration}
              onChange={(e) => {
                // console.log("evento.tagert = ", e.target.value)
                setDuration(e.target.value)
              }}
              names={["20 min", "40 min", '60 min']}
              label={"Tempo de consulta"}
              height={"30%"}
              name={"time"}
            />
            <InputField
              disabled={values.model != "Remoto"}
              name={"link"}
              value={values.link}
              onChange={handleInputChange}
              label={"Link para a consulta"}
              margin={"20px 30px 20px 30px"}
              type={"text"}
            />
          </div>

          <div className={styles.botao}>
            <Link
              to={`/profissional/crudconsultapaciente/`}
              state={{ patientId: patientId }}
              underline="hover"
              sx={{ cursor: "pointer", color: "black", pr: "3rem" }}
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
          </div>
        </div>
      );
    }
    if (aba == 1) {
      setComponent(
        <div className={styles.dados}>
          <div className={styles.linha}>
            <InputField
              name={"patientName"}
              value={values.patientName}
              onChange={handleInputChange}
              label={"Nome"}
              margin={"20px 30px 20px 30px"}
              type={"text"}
            />
            <InputField
              name={"patientContactNumber"}
              value={values.patientContactNumber}
              onChange={handleInputChange}
              label={"Contato"}
              margin={"20px 30px 20px 30px"}
              type={"text"}
            />
            <InputField
              name={"patientEmail"}
              value={values.patientEmail}
              onChange={handleInputChange}
              label={"Email"}
              margin={"20px 30px 20px 30px"}
              type={"text"}
            />
          </div>

          <div className={styles.linha}>
            <InputField
              name={"patientCPF"}
              value={values.patientCPF}
              onChange={handleInputChange}
              label={"CPF"}
              margin={"20px 30px 20px 30px"}
              type={"text"}
            />
            <InputField
              name={"patientBirthDate"}
              value={values.patientBirthDate}
              onChange={handleInputChange}
              label={"Nascimento"}
              margin={"20px 30px 20px 30px"}
              type={"text"}
            />
            <InputField
              name={"patientRace"}
              value={values.patientRace}
              onChange={handleInputChange}
              label={"Raça/Cor"}
              margin={"20px 30px 20px 30px"}
              type={"text"}
            />
          </div>

          <div className={styles.linha2}>
            <InputField
              name={"patientInsurance"}
              value={values.patientInsurance}
              onChange={handleInputChange}
              label={"Convênio"}
              margin={"20px 30px 20px 30px"}
              width={"30%"}
              type={"text"}
            />
            <InputField
              name={"medicalCard"}
              value={values.medicalCard}
              onChange={handleInputChange}
              label={"Carteirinha"}
              margin={"20px 30px 20px 30px"}
              type={"text"}
            />
          </div>

          <div className={styles.botao}>
            <Link
              href="/admin/crudconsulta"
              underline="hover"
              sx={{ cursor: "pointer", color: "black", pr: "3rem" }}
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
          </div>
        </div>
      );
    }
    if (aba == 2) {
      setComponent(
        <Stack direction={"column"} alignItems="center" spacing={1}>
          <img className={styles.image} src={"/prontuario/prancheta.svg"}></img>
          <Typography
            sx={{ color: "black", fontWeight: "800", fontFamily: "Mulish" }}
          >
            Ainda não há atendimentos.
          </Typography>
        </Stack>
      );
    }
  }, [aba, values, duration]);
  return (
    <div className={styles.pagina}>
      <div className={styles.voltar}>
        {" "}
        <Link
          href={`/profissional/crudconsultapaciente/${id}`}
          underline="none"
          sx={{ cursor: "pointer", color: "black" }}
        >
          &lt; Voltar
        </Link>
      </div>
      <div className={styles.barraLinks}>
        <div className={styles.link1}>
          {" "}
          <Link
            onClick={() => setAba(0)}
            underline="none"
            sx={{ cursor: "pointer", color: "black" }}
          >
            Informações da consulta
          </Link>
        </div>

        <div className={styles.linhaLinks}></div>

        <div className={styles.link2}>
          {" "}
          <Link
            onClick={() => setAba(1)}
            underline="none"
            sx={{ cursor: "pointer", color: "black" }}
          >
            Informações do paciente
          </Link>
        </div>

        <div className={styles.linhaLinks}></div>


        <div className={styles.link2}>
          {" "}
          <Link
            onClick={() => setAba(2)}
            underline="none"
            sx={{ cursor: "pointer", color: "black" }}
          >
            Prontuario do paciente
          </Link>
        </div>
      </div>
      <div className={styles.conteudo}>{component}</div>
      <PopUp
        onClick={addQuery}
        name={"Adicionar consulta"}
        description={"Você deseja adicionar uma nova consutla?"}
        action={"adicionar"}
        open={openConfirmationPopUp}
        handleClose={handleCloseConfirmationPopUp}
      />
      <PopUp
        onClick={() => {
          navigate("/profissional/crudconsulta");
        }}
        name={"Paciente adicionado com sucesso"}
        description={
          "A consulta foi adicionado com sucesso. Deseja retornar à página de consultas?"
        }
        action={"retornar"}
        open={openStatusOKPopUp}
        handleClickOpen={handleClickOpenStatusOKPopUp}
        handleClose={handleCloseStatusOKPopUp}
      />
      <PopUp
        onClick={handleCloseStatusErrPopUp}
        name={"Erro ao adicionar"}
        description={
          "Ocorreu um erro ao tentar adicionar a consulta. Deseja rever?"
        }
        action={"rever dados"}
        open={openStatusErrPopUp}
        handleClickOpen={handleClickOpenStatusErrPopUp}
        handleClose={handleCloseStatusErrPopUp}
      />
    </div>
  );
}