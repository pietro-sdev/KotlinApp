import React from "react";
import styles from "./criarConsultaInfoConsulta.module.css";
import InputField from "../../../components/input_field/index";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/user";
import { style } from "@mui/system";
import { Stack, Box, Divider, Typography, Link, Grid } from "@mui/material";
import StyledButton from "../../../components/button/index";
import PopUp from "../../../components/pop_up";
import api from "../../../services/api";
import MaskedInput from "../../../components/masked_input";
import { useNavigate } from "react-router-dom";
import StyledLink from "../../../components/link";

export default function AddConsultaAdmin() {
  const [openConfirmationPopUp, setOpenConfirmationPopUp] = useState(false);
  const [openStatusOKPopUp, setOpenStatusOKPopUp] = useState(false);
  const [openStatusErrPopUp, setOpenStatusErrPopUp] = useState(false);
  const [status4PopUp, setStatus4PopUp] = useState("");
  const [component, setComponent] = useState(null);
  const [aba, setAba] = useState(0);
  const [values, setValues] = useState({
    doctorName: "",
    meetDay: "",
    model: "",
    startTime: "",
    description: "",
    patientName: "",
    patientContactNumber: "",
    patientBirthDate: "",
    patientCPF: "",
    patientEmail: "",
    patientRace: "",
    patientInsurance: "",
    medicalCard: "",
  });

  const navigate = useNavigate();

  const handleClickOpenConfirmationPopUp = () => {
    setOpenConfirmationPopUp(true);
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

  const handleInputChange = (q) => {
    const { name, value } = q.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const get_id = (q) => {
    _id = api.get("/user", { name: q }).catch((error) => console.log(error));

    return _id;
  };

  const addQuery = (e) => {
    handleCloseConfirmationPopUp();

    api
      .post("/query", {
        model: values.model,
        description: values.description,
        start: values.startTime,
        day: values.meetDay,
        patient: get_id(values.patientName),
        doctor: get_id(values.doctorName),
      })
      .catch((error) => {
        console.log(error);
        setStatus4PopUp("Erro");
        setOpenConfirmationPopUp(false);
      })
      .then((response) => {
        setStatus4PopUp("OK");
        setOpenConfirmationPopUp(false);
      });

    if (status4PopUp === "Erro") {
      setOpenStatusErrPopUp(true);
    } else {
      setOpenStatusOKPopUp(true);
    }
  };

  useEffect(() => {
    if (aba == 0) {
      setComponent(
        <Stack spacing={4}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <InputField
                name={"doctorName"}
                value={values.doctorName}
                onChange={handleInputChange}
                label={"Nome do profissional"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                name={"meetDay"}
                value={values.meetDay}
                onChange={handleInputChange}
                label={"Data da consulta"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                name={"model"}
                value={values.model}
                onChange={handleInputChange}
                label={"Modelo de atendimento"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                name={"startTime"}
                value={values.startTime}
                onChange={handleInputChange}
                label={"Horário"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                name={"description"}
                value={values.description}
                onChange={handleInputChange}
                label={"Estendido"}
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
    if (aba == 1) {
      setComponent(
        <Stack spacing={4}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <InputField
                name={"patientName"}
                value={values.patientName}
                onChange={handleInputChange}
                label={"Nome"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <MaskedInput
                name={"patientContactNumber"}
                value={values.patientContactNumber}
                onChange={handleInputChange}
                label={"Contato"}
                type={"text"}
                mask={"(99) 99999-9999"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                name={"patientEmail"}
                value={values.patientEmail}
                onChange={handleInputChange}
                label={"Email"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <MaskedInput
                name={"patientCPF"}
                value={values.patientCPF}
                onChange={handleInputChange}
                label={"CPF"}
                type={"text"}
                mask={"999.999.999-99"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                name={"patientBirthDate"}
                value={values.patientBirthDate}
                onChange={handleInputChange}
                label={"Nascimento"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                name={"patientRace"}
                value={values.patientRace}
                onChange={handleInputChange}
                label={"Raça/Cor"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                name={"patientInsurance"}
                value={values.patientInsurance}
                onChange={handleInputChange}
                label={"Convênio"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                name={"medicalCard"}
                value={values.medicalCard}
                onChange={handleInputChange}
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
  }, [aba, values]);
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
            href={"/admin/crudconsulta"}
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
      {openConfirmationPopUp && (
        <PopUp
          onClick={addQuery}
          name={"Adicionar consulta"}
          description={"Você deseja adicionar uma nova consutla?"}
          action={"adicionar"}
          open={openConfirmationPopUp}
          handleClickOpen={handleClickOpenConfirmationPopUp}
          handleClose={handleCloseConfirmationPopUp}
        />
      )}
      {openStatusOKPopUp && (
        <PopUp
          onClick={() => {
            navigate("/admin/crudconsulta");
          }}
          name={"Paciente adicionado com sucesso"}
          description={
            "A consulta foi adicionada com sucesso. Deseja retornar à página de consultas?"
          }
          action={"retornar"}
          open={openStatusOKPopUp}
          handleClickOpen={handleClickOpenStatusOKPopUp}
          handleClose={handleCloseStatusOKPopUp}
        />
      )}
      {openStatusErrPopUp && (
        <PopUp
          onClick={handleCloseStatusErrPopUp}
          name={"Erro ao adicionar"}
          description={
            "Ocorreu um erro ao tentar adicionar a consutla. Deseja rever?"
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
