import React from "react";
import styles from "./editarConsulta.module.css";
import InputField from "../../../components/input_field/index";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/user";
import { style } from "@mui/system";
import { Stack, Box, Divider, Typography, Link, Grid } from "@mui/material";
import StyledButton from "../../../components/button/index";
import PopUp from "../../../components/pop_up";
import { useNavigate, useLocation } from "react-router-dom";
import StyledLink from "../../../components/link";

export default function EditConsultaAdmin() {
  const [component, setComponent] = useState(null);
  const [aba, setAba] = useState(0);
  const [openPopUpInativ, setOpenPopUpInativ] = useState(false);
  const [openPopUpEdit, setOpenPopUpEdit] = useState(false);
  const [openStatusOKPopUp, setOpenStatusOKPopUp] = useState(false);
  const [openStatusErrPopUp, setOpenStatusErrPopUp] = useState(false);
  const [status4PopUp, setStatus4PopUp] = useState("");
  const navigate = useNavigate();

  const handleClickOpenInativ = () => {
    setOpenPopUpInativ(true);
  };

  const handleCloseInativ = () => {
    setOpenPopUpInativ(false);
  };

  const handleClickOpenEdit = () => {
    setOpenPopUpEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenPopUpEdit(false);
  };

  const handleClickOpenStatusOKPopUp = () => {
    setOpenPopUpInativ(false);
    setOpenPopUpEdit(false);

    setOpenStatusOKPopUp(true);
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

  useEffect(() => {
    if (aba == 0) {
      setComponent(
        <Stack spacing={4}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <InputField label={"Nome do profissional"} type={"text"} />
            </Grid>
            <Grid item xs={4}>
              <InputField label={"Data da consulta"} type={"date"} />
            </Grid>
            <Grid item xs={4}>
              <InputField label={"Modelo de atendimento"} type={"date"} />
            </Grid>
            <Grid item xs={4}>
              <InputField label={"Horário"} type={"text"} />
            </Grid>
            <Grid item xs={4}>
              <InputField label={"Estendido"} type={"text"} />
            </Grid>
            <Grid item xs={4}>
              <InputField label={"Link da vídeochamada"} type={"text"} />
            </Grid>
          </Grid>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
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
              Apagar consulta
            </Link>
            <StyledButton
              onClick={() => setOpenPopUpEdit(true)}
              width={365}
              height={50}
              variant="contained"
              text={"Salvar"}
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
              <InputField label={"Nome"} type={"text"} />
            </Grid>
            <Grid item xs={4}>
              <InputField label={"Contato"} type={"text"} />
            </Grid>
            <Grid item xs={4}>
              <InputField label={"E-mail"} type={"email"} />
            </Grid>
            <Grid item xs={4}>
              <InputField label={"CPF"} type={"text"} />
            </Grid>
            <Grid item xs={4}>
              <InputField label={"Nascimento"} type={"date"} />
            </Grid>
            <Grid item xs={4}>
              <InputField label={"Raça/Cor"} type={"text"} />
            </Grid>
            <Grid item xs={4}>
              <InputField label={"Convênio"} type={"text"} />
            </Grid>
            <Grid item xs={4}>
              <InputField label={"Carteirinha"} type={"text"} />
            </Grid>
          </Grid>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
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
              Apagar consulta
            </Link>
            <StyledButton
              onClick={() => setOpenPopUpEdit(true)}
              width={365}
              height={50}
              variant="contained"
              text={"Salvar"}
            ></StyledButton>
          </Stack>
        </Stack>
      );
    }
  }, [aba]);
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
            navigate("/admin/crudconsulta");
          }}
          name={"Consulta editada com sucesso"}
          description={`A consulta foi editado com sucesso. Deseja retornar à página de consultas?`}
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
