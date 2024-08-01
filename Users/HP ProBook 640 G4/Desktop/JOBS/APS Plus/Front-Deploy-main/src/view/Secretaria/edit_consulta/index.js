import React from "react";
import styles from "./editarConsulta.module.css";
import InputField from "../../../components/input_field/index";
import { useState, useEffect } from "react";
import { Stack, Divider, Typography, Grid, Button, Link } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import StyledButton from "../../../components/button/index";
import PopUp from "../../../components/pop_up";
import { useNavigate, useLocation } from "react-router-dom";
import StyledLink from "../../../components/link";
import api from "../../../services/api";
import MaskedInput from "../../../components/masked_input";
import AutoCompleteButton from "../../../components/autocomplete_button"
import { fixDate, translateModelOfConsultation } from "../../../utils";
import AccordionProntuario from "../../../components/accordion_prontuario";
import Aside from "../../../components/aside_prontuario";
import fileDownload from "js-file-download";

export default function AddEditConsultaSecretaria() {
  const location = useLocation()
  const patient_id = !!location.state ? !!location.state.patient_id ? location.state.patient_id : "" : ""
  const appointment_id = !!location.state ? !!location.state.appointment_id ? location.state.appointment_id : "" : ""
  const local_id = localStorage.getItem("userId")
  const [patient_id_adm, setPatientIdAdm] = useState("")
  const [lockButton, setLockButton] = useState(false)
  const [uniqueBool, setUniqueBool] = useState(false)
  const [cpfs, setCpfs] = useState([])
  const [patientsObj, setPatientsObj] = useState([])
  const [identity, setIdentity] = useState("")
  const [medicalRecords, setMedicalRecords] = useState([])
  const [component, setComponent] = useState(null)
  const [exclusiveComponent, setExclusiveComponent] = useState(null)
  const [exclusiveComponent2, setExclusiveComponent2] = useState(null)
  const [aba, setAba] = useState(0)
  const navigate = useNavigate();
  const [asideInfo, setAsideInfo] = useState({
    careLineName: "",
    careLineStatus: "",
    careLineTag: "",
    activeProblems: "",
    personalAntecedents: "",
    familyAntecedents: "",
    progressTreatment: "",
    allergies: "",
    attachments: "",
    notes: "",
  })
  const [initialValues, setInitialValues] = useState({
    startBool: false,
    doctorName: "",
    meetDay: "",
    model: "",
    startTime: 0,
    duration: "",
    patientName: "",
    patientContactNumber: "",
    patientBirthDate: "",
    patientCPF: "",
    patientEmail: "",
    patientRace: "",
    patientInsurance: "",
    medicalCard: "",
    link: "",
  })

  const [values, setValues] = useState({
    doctorName: "",
    meetDay: "",
    model: "",
    startTime: 0,
    duration: "",
    patientName: "",
    patientContactNumber: "",
    patientBirthDate: "",
    patientCPF: "",
    patientEmail: "",
    patientRace: "",
    patientInsurance: "",
    medicalCard: "",
    link: "",
    exames: [],
  });

  const [examName, setExamName] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [listaExames, setListaExames] = useState([]);
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [doctorsNameList, setDoctorsNameList] = useState([""])
  const [doctorId, setDoctorId] = useState("")
  const [availableDate, setAvailableDate] = useState([])
  const [availableTime, setAvailableTime] = useState([])
  const [openPopUpApagar, setOpenPopUpApagar] = useState(false);
  const [openPopUpConfirmation, setOpenPopUpConfirmation] = useState(false);
  const [openPopUpNew, setOpenPopUpNew] = useState(false);
  const [openStatusOKPopUp, setOpenStatusOKPopUp] = useState(false);
  const [openStatusOKApagarPopUp, setOpenStatusOKApagarPopUp] = useState(false);
  const [openStatusErrPopUp, setOpenStatusErrPopUp] = useState(false);


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Get info functions
  const get_id = (name, doctors) => {
    // buscar na array o nome name e retornar o campo _id
    if (!!doctors) {
      for (let doc of doctors) {
        if (doc.name == name) {
          return doc._id
        }
      }
    }
    return "id not found"
  }
  const getMedicalRecords = (id) => {
    api.get(`/record/${id}/meets`)
      .then(resp => {
        let resp_data = Object.entries(resp)[0][1]
          .map(e => {
            return (
              <AccordionProntuario
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
            )
          })
        if (resp_data.length == 0)
          resp_data = []
        setMedicalRecords(resp_data.reverse());
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const getCalendar = async (_id) => {
    await api
      .get(`/calendar/${_id}`)
      .then(resp => {
        let calendar = resp.data[0]
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth()
        let yyyy = today.getFullYear()
        let finalDate

        if (mm == 11) {
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
        setAvailableDate(available_date)
      }
      )
      .catch(error => console.log(error))
  }
  const getMeetTimes = async (id, duration) => {
    let available_time = []
    let calendar
    await api
      .get(`/calendar/${id}`)
      .then(resp => calendar = resp.data[0])
      .catch(error => console.log(error))

    if (!!values.meetDay && !!calendar && !!duration) {
      let chosen_day = values.meetDay.split("/")
      chosen_day = new Date(chosen_day[2], chosen_day[1] - 1, chosen_day[0])
      chosen_day = chosen_day.toISOString()
      for (let start = calendar.start; start < calendar.end; available_time.push(start), start = start + 1) { }
      available_time = available_time.filter(start => {
        let ok = false
        if (!!calendar.workLunchStart) {
          if (start < calendar.workLunchStart || calendar.workLunchEnd <= start)
            ok = true
        } else {
          ok = true
        }
        return ok
      })
      let todayBusyTime = calendar.busyTime.filter(obj => {
        delete obj._id
        return obj.day == chosen_day
      })
      let exception = []
      for (let start = initialValues.startTime; start <= initialValues.startTime + tranlateDurationToIterations(initialValues.duration); start = start + 1) {
        exception.push(start)
      }


      available_time = available_time.filter(time => {
        let ok = true;

        todayBusyTime.forEach(obj => {
          for (let i = 0; i <= tranlateDurationToIterations(duration); i = i + 1) {
            if (((!exception.includes(obj.time) && values.meetDay == initialValues.meetDay) || !appointment_id) && (JSON.stringify(obj) === JSON.stringify({ time: time + i, day: chosen_day }))) {
              ok = false;
            }
          }
        })

        for (let i = 0; i <= tranlateDurationToIterations(duration); i = i + 1) {
          if (time + i >= calendar.end)
            ok = false
        }

        return ok
      })
      let available_time_interface = available_time.map((time) => {
        return Math.floor(time / 3) + ":" + String(time * 20 - Math.floor(time / 3) * 60).padEnd(2, '0')
      })
      setAvailableTime(available_time_interface)
    }
  }
  const get_data = () => {
    let startQuery
    if (!!appointment_id) {
      let tempDoctorId
      api.get(`/query/${appointment_id}`)
        .then(resp => {
          startQuery = resp.data
          tempDoctorId = startQuery.doctor._id
          setDoctorId(tempDoctorId)
          setValues({
            doctorName: !!startQuery.doctor.name ? startQuery.doctor.name : "",
            meetDay: !!startQuery.date ? startQuery.date : "",
            model: !!startQuery.model ? translateModelOfConsultation(startQuery.model) : "",
            date: !!startQuery.date ? startQuery.date : "",
            startTime: !!startQuery.startTime ? startQuery.startTime : 0,
            duration: !!startQuery.duration ? startQuery.duration : "",
            patientName: !!startQuery.info.name ? startQuery.info.name : "",
            patientContactNumber: !!startQuery.info.contactNumber ? startQuery.info.contactNumber : "",
            patientBirthDate: fixDate(!!startQuery.info.dateBirth ? startQuery.info.dateBirth : ""),
            patientCPF: !!startQuery.info.CPF ? startQuery.info.CPF : "",
            patientEmail: !!startQuery.info.email ? startQuery.info.email : "",
            patientRace: !!startQuery.info.race ? startQuery.info.race : "",
            patientInsurance: !!startQuery.info.insurance ? startQuery.info.insurance : "",
            medicalCard: !!startQuery.info.medicalCard ? startQuery.info.medicalCard : "",
            link: !!startQuery.link ? startQuery.link : "",
            exames: !!startQuery.exames ? startQuery.exames : [],
          })
          setListaExames(!!startQuery.patient.patient? !!startQuery.patient.patient.exames ? startQuery.patient.patient.exames : []: [])
          setInitialValues({
            startBool: true,
            doctorName: !!startQuery.doctor.name ? startQuery.doctor.name : "",
            meetDay: !!startQuery.date ? startQuery.date : "",
            model: !!startQuery.model ? translateModelOfConsultation(startQuery.model) : "",
            date: !!startQuery.date ? startQuery.date : "",
            startTime: !!startQuery.startTime ? startQuery.startTime : 0,
            duration: !!startQuery.duration ? startQuery.duration : "",
            patientName: !!startQuery.info.name ? startQuery.info.name : "",
            patientContactNumber: !!startQuery.info.contactNumber ? startQuery.info.contactNumber : "",
            patientBirthDate: fixDate(!!startQuery.info.dateBirth ? startQuery.info.dateBirth : ""),
            patientCPF: !!startQuery.info.CPF ? startQuery.info.CPF : "",
            patientEmail: !!startQuery.info.email ? startQuery.info.email : "",
            patientRace: !!startQuery.info.race ? startQuery.info.race : "",
            patientInsurance: !!startQuery.info.insurance ? startQuery.info.insurance : "",
            medicalCard: !!startQuery.info.medicalCard ? startQuery.info.medicalCard : "",
            link: !!startQuery.link ? startQuery.link : "",
            exames: !!startQuery.exames ? startQuery.exames : [],
          })

          // doctor part:
          if (!!tempDoctorId) {
            getCalendar(tempDoctorId).then(getMeetTimes(tempDoctorId))
          }
        })
        .catch((error) => console.log(error));

      api.get(!!patient_id ? `/user/${patient_id}` : `/user/${patient_id_adm}`).
        then(resp => {
          let patient = resp.data
          setAsideInfo({
            careLineName: !!patient.patient ? patient.patient.careLineName : "",
            careLineStatus: !!patient.patient ? patient.patient.careLineStatus : "",
            careLineTag: !!patient.patient ? patient.patient.careLineTag : "",
            activeProblems: !!patient.patient ? patient.patient.activeProblems : "",
            personalAntecedents: !!patient.patient ? patient.patient.personalAntecedents : "",
            familyAntecedents: !!patient.patient ? patient.patient.familyAntecedents : "",
            progressTreatment: !!patient.patient ? patient.patient.progressTreatment : "",
            allergies: !!patient.patient ? patient.patient.allergies : "",
            attachments: !!patient.patient ? patient.patient.attachments : "",
            notes: !!patient.patient ? patient.patient.notes : "",
          })
        })
      getMedicalRecords(patient_id)
    }
    else if (!!patient_id || !!patient_id_adm) {
      api.get(!!patient_id ? `/user/${patient_id}` : `/user/${patient_id_adm}`).
        then(resp => {
          let patient = resp.data
          setValues({
            doctorName: !!values.doctorName ? values.doctorName : "",
            patientName: !!patient.nick ? patient.nick : patient.name,
            patientContactNumber: !!patient.contactNumber ? patient.contactNumber : "",
            patientBirthDate: fixDate(patient.dateBirth),
            patientCPF: patient.CPF,
            patientEmail: patient.email,
            patientRace: !!patient.race ? patient.race : "",
            patientInsurance: !!patient.patient ? patient.patient.insurance : "",
            medicalCard: !!patient.patient ? patient.patient.insuranceNumber : "",
          })
          setAsideInfo({
            careLineName: !!patient.patient ? patient.patient.careLineName : "",
            careLineStatus: !!patient.patient ? patient.patient.careLineStatus : "",
            careLineTag: !!patient.patient ? patient.patient.careLineTag : "",
            activeProblems: !!patient.patient ? patient.patient.activeProblems : "",
            personalAntecedents: !!patient.patient ? patient.patient.personalAntecedents : "",
            familyAntecedents: !!patient.patient ? patient.patient.familyAntecedents : "",
            progressTreatment: !!patient.patient ? patient.patient.progressTreatment : "",
            allergies: !!patient.patient ? patient.patient.allergies : "",
            attachments: !!patient.patient ? patient.patient.attachments : "",
            notes: !!patient.patient ? patient.patient.notes : "",
          })
          getMedicalRecords(patient_id ? patient_id : patient_id_adm)
        })
    }

  }
  const get_doctors = async () => {
    let doctors = []
    let doctorsList = []
    await api
      .get(`/users`)
      .then(response => doctors = response.data)
      .catch(error => console.log(error))
    doctors = doctors.filter(user => (user.employee.isDoctor == true && user.isActive))

    for (let obj of doctors) {
      doctorsList.push(obj.name)
    }
    doctorsList.push("")

    setDoctors(doctors)
    setDoctorsNameList(doctorsList)
  }
  const get_patients = async (name) => {
    let func_patients = []
    let patients_names = []
    let patients_obj = []
    await api
      .get(`/users/name/${name}`)
      .then(response => func_patients = response.data)
      .catch(error => console.log(error))

    func_patients = func_patients.filter(user => user.isPatient == true)

    for (const [key, value] of Object.entries(func_patients)) {
      patients_names.push(!!value.nick ? value.nick : value.name)
      patients_obj.push(value)
    }
    return [patients_names, patients_obj]
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Edit query functions
  const addQuery = async (e) => {
    if (!lockButton) {
      setLockButton(true)
      let error = false
      let startTime = values.startTime
      let newQueryId = ''
      await api
        .post("/query", {
          status: "Agendada",
          model: translateModelOfConsultation(values.model),
          description: values.description,
          startTime: startTime,
          date: values.meetDay,
          duration: values.duration,
          patient: !!patient_id ? patient_id : patient_id_adm,
          doctor: doctorId,
          link: values.model == "Remoto" ? values.link : "",
          info: {
            name: !!values.nick ? values.nick : values.patientName,
            contactNumber: values.patientContactNumber,
            dateBirth: values.patientBirthDate,
            CPF: values.patientCPF,
            email: values.patientEmail,
            race: values.patientRace,
            insurance: values.patientInsurance,
            medicalCard: values.medicalCard,
          }
        })
        .then( resp => newQueryId = resp.data._id)
        .catch(err => {
          console.log(err)
          error = true
          setLockButton(false)
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
          .catch(async (error) => {
            console.log(error)
            await api
            .delete(`/query/${newQueryId}`)
            .then( console.log("Houve um erro interno, avise seu administrador !"))
            error = true;
          })
      }

      setOpenPopUpConfirmation(false)
      if (error)
        setOpenStatusErrPopUp(true)
      else
        setOpenStatusOKPopUp(true)
    }

  }
  const deleteQuery = async (e) => {
    let doctor_id = await get_id(values.doctorName, doctors)

    // deleta consulta
    await api
      .delete('/query/' + appointment_id)

    // libera o horario da consulta excluida na agenda do medico
    let meetDay = values.meetDay.split("/")
    let initialMeetDay = initialValues.meetDay.split("/")
    meetDay = new Date(meetDay[2], meetDay[1] - 1, meetDay[0])
    initialMeetDay = new Date(initialMeetDay[2], initialMeetDay[1] - 1, initialMeetDay[0])
    for (let i = 0; i <= tranlateDurationToIterations(initialValues.duration); i++) {
      let newTime = initialValues.startTime + i
      await api
        .patch(`/calendar/busyTime`, {
          time: newTime,
          date: meetDay,
          doctor_id: doctor_id,
          insert_boolean: false
        })
        .catch(error => {
          console.log(error)
          error = true
        })
    }

    setOpenPopUpApagar(false);
    setOpenStatusOKApagarPopUp(true);
  }
  const editQuery = async (e) => {
    if (!lockButton) {
      setLockButton(true)
      let error = false
      let doctor_id = await get_id(values.doctorName, doctors)
      let startTime = values.startTime

      await api
        .patch(`/query/${appointment_id}`, {
          model: translateModelOfConsultation(values.model),
          link: values.model == "Remoto" ? values.link : "",
          description: values.description,
          startTime: startTime,
          date: values.meetDay,
          duration: values.duration,
          patient: patient_id,
          doctor: doctor_id,
          calendar: appointment_id,
          info: {
            name: !!values.nick ? values.nick : values.patientName,
            contactNumber: values.patientContactNumber,
            dateBirth: values.patientBirthDate,
            CPF: values.patientCPF,
            email: values.patientEmail,
            race: values.patientRace,
            insurance: values.patientInsurance,
            medicalCard: values.medicalCard,
          }
        })
        .catch((error) => {
          console.log(error)
          error = true
          setLockButton(false)
        });

      let meetDay = values.meetDay.split("/")
      let initialMeetDay = initialValues.meetDay.split("/")
      meetDay = new Date(meetDay[2], meetDay[1] - 1, meetDay[0])
      initialMeetDay = new Date(initialMeetDay[2], initialMeetDay[1] - 1, initialMeetDay[0])
      if (!error) {
        for (let i = 0; i <= tranlateDurationToIterations(initialValues.duration); i++) {
          let newTime = initialValues.startTime + i
          await api
            .patch(`/calendar/busyTime`, {
              time: newTime,
              date: meetDay,
              doctor_id: doctorId,
              insert_boolean: false
            })
            .catch(error => {
              console.log(error)
              error = true
              setLockButton(false)
            })
        }

        for (let i = 0; i <= tranlateDurationToIterations(values.duration); i++) {
          let newTime = startTime + i
          await api
            .patch(`/calendar/busyTime`, {
              time: newTime,
              date: meetDay,
              doctor_id: doctorId,
              insert_boolean: true
            })
            .catch(error => {
              console.log(error)
              error = true
              setLockButton(false)
            })
        }

        setOpenPopUpConfirmation(false)
        if (error)
          setOpenStatusErrPopUp(true)
        else
          setOpenStatusOKPopUp(true)
      }
    }
  };
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
      !!selectedFile.lastModifiedDate ?
        selectedFile.lastModifiedDate :
        !!selectedFile.lastModified ?
          selectedFile.lastModified :
          Date.now()
    )
    formData.append('examDate', date.toISOString());
    formData.append('fixedFileName', fixedFileName);

    api.post("uploadExam/" + patient_id, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        get_data()
        return setStatusMessage("Exame enviado com sucesso!")
      })
      .catch((error) => {
        return setStatusMessage(error + " Por favor, selecione o exame, indique o nome do exame e tente novamente.")
      })

  };
  const clearInput = (e) => {
    e.preventDefault();
    setExamName("")
    setStatusMessage("")
    setSelectedFile(null)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Auxs functions
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
  const distinct = (value, index, self) => {
    return self.indexOf(value) === index
  }
  const convert_string_to_time = (time_string) => {
    let converted_time
    converted_time = time_string.split(":")
    converted_time = (converted_time[0] * 60 + parseInt(converted_time[1], 10)) / 20
    converted_time = Math.ceil(converted_time)
    return !!converted_time ? converted_time : -10000
  }
  const convert_time_to_string = (time) => {
    if (time <= 0)
      return null
    return (Math.floor(time / 3) + ":" + String(time * 20 - Math.floor(time / 3) * 60).padEnd(2, '0'))
  }
  const convertDateInterface = (date) => {
    let this_date = date
    var dd = String(this_date.getDate()).padStart(2, '0');
    var mm = String(this_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this_date.getFullYear();

    return this_date = dd + '/' + mm + '/' + yyyy;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Components functions

  const handleInputChange = (q) => {
    const { name, value } = q.target;
    // if you are changing the doctor, you need to reset the meetDay and duration
    // and get the new calendar
    if (name == "doctorName") {
      doctors.forEach((doctor) => {
        if (doctor.name == value) {
          setValues({
            ...values,
            [name]: value,
            doctorId: doctor._id,
            meetDay: "",
            duration: "",
            startTime: null
          });
          getCalendar(doctor._id)
          setDoctorId(doctor._id)
        }
      })
    }
    // if you are changing the meetDay, you need to reset the duration
    // and get the new meetTimes
    else if (name == "meetDay") {
      setValues({
        ...values,
        [name]: value,
        duration: "",
      });
      getMeetTimes(values.doctorId)
    }
    // if you are changing the duration, you need to reset the meetTime
    else if (name == "duration") {
      setValues({
        ...values,
        [name]: value,
      });
      getMeetTimes(values.doctorId)
    }
    // if you are changing the patient, you need to reset all the patient info
    else if (name == "patientName") {
      patients.forEach((patient) => {
        if (patient.name == value) {
          setValues({
            ...values,
            [name]: value,
            patientCPF: "",
            patientBirthDate: "",
            patientContactNumber: "",
            patientEmail: "",
            patientInsurance: "",
            patientRace: "",
            medicalCard: ""
          })
          // setPatientId(patient._id)
        }
      })
    }
    // any other change
    else {
      setValues({
        ...values,
        [name]: value,
        patientCPF: "",
      });
    }
  };
  const handleClickOpenApagar = () => {
    setOpenPopUpApagar(true);
    deleteQuery();
  };
  const handleValuesChange = (name, value) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };
  const handleCloseApagar = () => {
    setOpenPopUpApagar(false);
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
  const handleClickOpenConfirmation = () => {
    setOpenPopUpConfirmation(true);
  };
  const handleCloseConfirmation = () => {
    setOpenPopUpConfirmation(false);
  };
  const handleClickOpenStatusOKPopUp = () => {
    setOpenPopUpApagar(false);
    setOpenPopUpConfirmation(false);
    setOpenStatusOKPopUp(true);
  };
  const handleCloseStatusOKPopUp = () => {
    setOpenStatusOKPopUp(false);
  };
  const handleClickOpenStatusOKApagarPopUp = () => {
    setOpenPopUpApagar(false);
    setOpenStatusOKPopUp(true);
    navigate(`/${identity}/crudconsulta/`, { state: { patient_id: patient_id ? patient_id : "" } })
  };
  const handleCloseStatusOKApagarPopUp = () => {
    setOpenStatusOKPopUp(false);
  };
  const handleClickOpenStatusErrPopUp = () => {
    setOpenPopUpApagar(false);
    setOpenPopUpConfirmation(false);

    setOpenStatusErrPopUp(true);
  };
  const handleCloseStatusErrPopUp = () => {
    setOpenStatusErrPopUp(false);
  };
  const handleInputAsideChange = (q) => {
    const { name, value } = q.target;
    setAsideInfo({
      ...values,
      [name]: value,
    });
  };
  const handleValuesAsideChange = (name, value) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // useEffects

  useEffect(() => { // gets the identity of the user & the get functions
    api.get(`/user/${local_id}`).then(resp => {
      let identity_booleans = resp.data.employee
      if (identity_booleans.isAdmin)
        setIdentity("admin")
      else {
        if (identity_booleans.isDoctor) {
          setIdentity("profissional")
          if (identity == "profissional" && !!!medicalRecords && !!patient_id) {
            getMedicalRecords(patient_id)
            setListaExames(values.exames)
          }
        }
        else
          setIdentity("secretaria")
      }
    })
    get_doctors()
    get_data()
  }, [])

  useEffect(() => { // create medicalRecodrs if you are a doctor
    if (identity == "profissional" /*&& medicalRecords != null*/) {
      setExclusiveComponent(
        <StyledLink
          onClick={() => setAba(2)}
          underline={aba == 2 ? "always" : "none"}
          text={"Prontuário do paciente"}
        />
      )

      setExclusiveComponent2(
        <>
          <img className={styles.image} src={"/prontuario/prancheta.svg"}></img>
          <Typography
            sx={{ color: "black", fontWeight: "800", fontFamily: "Mulish" }}
          >
            Ainda não há atendimentos.
          </Typography>
        </>
      )
    }
  }, [identity, aba, medicalRecords])

  useEffect(()=>{
    if(!!values.exames){
      setListaExames(values.exames);
    }
  },[medicalRecords])

  useEffect(() => {
    if (!!values.patientCPF) {
        let patients_CPF = []
        if (!!cpfs && !!patients && !!patientsObj && !appointment_id && !!values.patientName) {
          let unique_patient = []
          let chosen_patients = []

          chosen_patients = patientsObj.filter(obj => {
            let ok = false
            let name = obj.nick ? obj.nick : obj.name
            if (name == values.patientName)
              ok = true
            return ok
          }
          )
          for (const [key, value] of Object.entries(chosen_patients)) {
            patients_CPF.push(value.CPF)
          }
          setCpfs(patients_CPF)
          if (!!values.patientCPF && !!values.patientName) {
            unique_patient = chosen_patients.filter(patient => { return (patient.CPF == values.patientCPF) })
            if (unique_patient.length == 1) {
              let date = unique_patient[0].dateBirth.split("-")
              date = date[0] + "-" + date[1] + "-" + date[2].split("T")[0]
              setUniqueBool(true)
              setPatientIdAdm(unique_patient[0]._id)
              setValues({
                ...values,
                patientContactNumber: !!unique_patient[0].contactNumber ? unique_patient[0].contactNumber : "",
                patientBirthDate: !!date ? date : "",
                patientInsurance: !!unique_patient[0].patient.insurance ? unique_patient[0].patient.insurance : "",
                medicalCard: !!unique_patient[0].patient.insuranceNumber ? unique_patient[0].patient.insuranceNumber : "",
                patientEmail: !!unique_patient[0].email ? unique_patient[0].email : "",
                patientRace: !!unique_patient[0].race ? unique_patient[0].race : "",
              })
            }
          }
        } else {
          setUniqueBool(false)
        }
    }
  }, [values.patientName, values.patientCPF])

  useEffect(() => {
    if (identity) {
      if (!appointment_id) {
        get_patients(!!values.patientName ? values.patientName : "").then(resp => {
          setPatients(resp[0])
          setPatientsObj(resp[1])
        })
      }
    }
  }, [identity])

  useEffect(() => {
    if(values.duration && values.meetDay)
      getMeetTimes(doctorId, values.duration)
  },[values.duration,values.meetDay])

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Compontents
  useEffect(() => {
    if (identity) {
      if (aba == 0) {
        setComponent(
          <Stack spacing={4}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                {
                  !!appointment_id ?
                    <>
                      <InputField
                        disabled={true}
                        value={values.doctorName}
                        onChange={handleInputChange}
                        name={'doctorName'}
                        label={"Nome"}
                        type={"text"}
                      />
                    </> : <>
                      <AutoCompleteButton
                        backgroundColor={"#CDD3FF"}
                        disabled={!!appointment_id ? true : false}
                        freeSolo={false}
                        names={doctors.map(doctor => { return doctor.name })}
                        name={"doctorName"}
                        inputValue={values.doctorName}
                        value={values.doctorName}
                        variant="filled"
                        // onInputChange={handleInputChange}
                        onInputChange={(event, value) => {
                          handleInputChange({ target: { name: "doctorName", value: value } })
                          // setValues({ ...values, doctorName: value })
                        }}
                        label={"Nome do profissional"}
                        type={"text"}
                      />
                    </>
                }
              </Grid>
              <Grid item xs={4}>
                <AutoCompleteButton
                  freeSolo={false}
                  label={"Dia da consulta"}
                  inputValue={values.meetDay}
                  value={values.meetDay}
                  names={availableDate}
                  variant="filled"
                  backgroundColor={"#CDD3FF"}
                  onInputChange={(event, value) => {
                    if (availableDate.includes(value)){
                      setValues({ ...values, meetDay: value, startTime:null })
                    }
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <AutoCompleteButton
                  freeSolo={false}
                  label={"Tempo da consulta"}
                  inputValue={values.duration}
                  value={values.duration}
                  names={["20 min", "40 min", "60 min"]}
                  variant="filled"
                  backgroundColor={"#CDD3FF"}
                  onInputChange={ async (event, value) => {
                    setValues({ ...values, duration: value , meetDay:'', startTime: null})
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <AutoCompleteButton
                  freeSolo={false}
                  label={"Horário da consulta"}
                  inputValue={convert_time_to_string(values.startTime)}
                  value={convert_time_to_string(values.startTime)}
                  names={availableTime}
                  variant="filled"
                  isOptionEqualToValue={false}
                  backgroundColor={"#CDD3FF"}
                  onInputChange={(event, value) => {
                    setValues({ ...values, startTime: convert_string_to_time(value) })
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <AutoCompleteButton
                  freeSolo={false}
                  label={"Modelo de atendimento"}
                  inputValue={values.model}
                  value={values.model}
                  names={["", "Remoto", "Presencial", "Monitoramento"]}
                  variant="filled"
                  backgroundColor={"#CDD3FF"}
                  onInputChange={(event, value) => {
                    setValues({ ...values, model: value })
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  value={values.link}
                  disabled={!(values.model == "Remoto")}
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
              {!!appointment_id &&
                <Link
                  onClick={() => setOpenPopUpApagar(true)}
                  underline="hover"
                  style={{
                    fontSize: "16px",
                    cursor: "pointer",
                    color: "black",
                    pr: "3rem",
                    marginRight: "3rem",
                  }}
                >
                  Apagar consulta
                </Link>}
              <StyledButton
                onClick={() => setAba(1)}
                width={365}
                height={50}
                text={"Próxima página"}
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
                {(!!appointment_id || patient_id) ?
                  <InputField
                    disabled={true}
                    value={values.patientName}
                    onChange={handleInputChange}
                    name={'patientName'}
                    label={"Nome do Paciente"}
                    type={"nome"}
                  />
                  :
                  <AutoCompleteButton
                    backgroundColor={"#CDD3FF"}
                    // disabled={!appointment_id}
                    freeSolo={false}
                    names={patients.filter(distinct)}
                    value={values.patientName}
                    name={"patientName"}
                    variant="filled"
                    onInputChange={(event, value) => {
                      setValues({ ...values, patientName: value, patientCPF: "" })
                    }}
                    label={"Nome do paciente"}
                    type={"text"}
                  />}
              </Grid>
              <Grid item xs={4}>
                {(!!appointment_id || patient_id) ?
                  <InputField
                    disabled={true}
                    value={values.patientCPF}
                    onChange={handleInputChange}
                    name={'patientCPF'}
                    label={"CPF do Paciente"}
                    type={"cpf"}
                  />
                  : <AutoCompleteButton
                    backgroundColor={"#CDD3FF"}
                    disabled={uniqueBool || !!appointment_id}
                    freeSolo={false}
                    names={patientsObj.filter(patient => {
                      if (!!values.patientName && (patient.name == values.patientName) || (patient.nick == values.patientName))
                        return patient
                      else
                        return null
                    })
                      .map(patient => { return patient.CPF })}
                    value={values.patientCPF}
                    name={"patientCPF"}
                    variant="filled"
                    onInputChange={(event, value) => {
                      setValues({ ...values, patientCPF: value })
                    }}
                    label={"cpf"}
                    type={"text"}
                  />
                }
              </Grid>
              <Grid item xs={4}>
                <InputField
                  disabled={true}
                  value={values.patientEmail}
                  onChange={handleInputChange}
                  name={'patientEmail'}
                  label={"E-mail"}
                  type={"email"}
                />
              </Grid>
              <Grid item xs={4}>
                <MaskedInput
                  disabled={true}
                  value={values.patientContactNumber}
                  onChange={handleInputChange}
                  name={'patientContactNumber'}
                  label={"Contato"}
                  mask={"(99)99999-9999"}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  disabled={true}
                  value={values.patientBirthDate}
                  onChange={handleInputChange}
                  name={'patientBirthDate'}
                  label={"Nascimento"}
                  type={"date"}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  disabled={true}
                  value={values.patientRace}
                  onChange={handleInputChange}
                  name={'patientRace'}
                  label={"Raça/Cor"}
                  type={"text"}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  disabled={true}
                  value={values.patientInsurance}
                  onChange={handleInputChange}
                  name={'patientInsurance'}
                  label={"Convênio"}
                  type={"text"}
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  disabled={true}
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
                onClick={() => setOpenPopUpApagar(true)}
                underline="hover"
                style={{
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "black",
                  pr: "3rem",
                  marginRight: "3rem",
                }}
              >
                Apagar consulta
              </Link>
              <StyledButton
                onClick={() => setOpenPopUpConfirmation(true)}
                width={365}
                height={50}
                text={`${!!appointment_id ? "Editar" : "Adicionar"} Consulta`}
                variant={"contained"}
              ></StyledButton>
            </Stack>
          </Stack>
        );
      }
      if (aba == 2) {
        setComponent(
          <Stack margin={2} spacing={4} >
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
              <Grid item xs={7} >
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid item
                    // marginRigth={1}
                  >
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
                  <Grid item marginLeft={1} >
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
                  {listaExames.length == 0 ? (<td>Não há exames</td>) :
                    (listaExames
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((exame) => {
                        let date = new Date(exame.date);
                        return (
                          <tr key={exame.awsKey}>
                            <td>{exame.name}</td>
                            <td>
                              {date.toLocaleString("pt-BR").split(" ")[0].split(",")[0]
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
            < Stack direction={"row"} justifyContent={"flex-end"} >
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
            </Stack >
            {
              medicalRecords.length > 0 ? (
                // If there are medicalRecords:
                medicalRecords
              ) : (
                // If there are no medicalRecords:
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
              )
            }
          </Stack >
        );
      }
    } else {
    }
  }, [aba, values, availableTime, identity, cpfs, uniqueBool, availableDate, doctorsNameList, examName, statusMessage, listaExames, selectedFile]);

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
            href={`/${identity}/crudconsulta/`}
            underline={"none"}
            text={`< Voltar`}
            state={{ patient_id: patient_id }}
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

          {exclusiveComponent}

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

      {aba == 2 && (
        <Aside
          isEditable = {false}
          values={asideInfo}
        ></Aside>
      )}

      {openPopUpNew &&
        <PopUp
          name={"Novo atendimento"}
          description={"Você deseja começar um novo atendimento?"}
          action={"começar"}
          open={openPopUpNew}
          onClick={handleClickOpenNew}
          handleClose={handleCloseNew}
        />
      }

      {openPopUpApagar && (
        <PopUp
          name={"Apagar consulta"}
          backgroundColor={"#C9323A"}
          description={"Você deseja apagar esta consulta?"}
          action={"apagar"}
          open={openPopUpApagar}
          onClick={handleClickOpenApagar}
          handleClose={handleCloseApagar}
        />
      )}

      {openPopUpConfirmation && (
        <PopUp
          name={"Salvar alterações"}
          onClick={!!appointment_id ? editQuery : addQuery}
          description={`Você deseja ${!!appointment_id ? "alterar" : "adicionar"} a consulta?`}
          action={`${!!appointment_id ? "alterar" : "adicionar"}`}
          open={openPopUpConfirmation}
          handleClickOpen={handleClickOpenConfirmation}
          handleClose={handleCloseConfirmation}
        />
      )}

      {openStatusOKPopUp && (
        <PopUp
          onClick={() => { navigate(`/${identity}/crudconsulta/`, { state: { patient_id: patient_id ? patient_id : "" } }) }}
          name={`Consulta ${!!appointment_id ? "alterada" : "criada"} com sucesso`}
          description={`A consulta foi ${!!appointment_id ? "editada" : "adicionada"} com sucesso. Deseja retornar à página de consultas?`}
          action={"retornar"}
          open={openStatusOKPopUp}
          handleClickOpen={handleClickOpenStatusOKPopUp}
          handleClose={handleCloseStatusOKPopUp}
        />
      )}

      {openStatusOKApagarPopUp && (
        <PopUp
          name={`Consulta apagada com sucesso`}
          description={`A consulta foi apagada com sucesso. Deseja retornar à página de consultas?`}
          action={"retornar"}
          open={openStatusOKApagarPopUp}
          onClick={handleClickOpenStatusOKApagarPopUp}
          handleClose={handleCloseStatusOKApagarPopUp}
        />
      )}

      {openStatusErrPopUp && (
        <PopUp
          onClick={handleCloseStatusErrPopUp}
          name={`Erro ao ${!!appointment_id ? "editar" : "adicionar"}`}
          description={`Ocorreu um erro ao tentar ${!!appointment_id ? "editar" : "adicionar"} a consulta. Deseja rever?`}
          action={"rever dados"}
          open={openStatusErrPopUp}
          handleClickOpen={handleClickOpenStatusErrPopUp}
          handleClose={handleCloseStatusErrPopUp}
        />
      )}
    </Stack>
  );
}