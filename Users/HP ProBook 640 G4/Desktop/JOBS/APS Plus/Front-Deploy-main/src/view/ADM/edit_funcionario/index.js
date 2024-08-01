import React from "react";
import styles from "./editFuncionario.module.css";
import InputField from "../../../components/input_field/index";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/user";
import { style } from "@mui/system";
import {
  Stack,
  Box,
  Divider,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import StyledButton from "../../../components/button/index";
import PopUp from "../../../components/pop_up";
import { useNavigate, useLocation } from "react-router-dom";
import { translateSex } from "../../../utils";
import MaskedInput from "../../../components/masked_input";
import StyledLink from "../../../components/link";
import api from "../../../services/api";

export default function EditFuncionarioAdmin() {
  const location = useLocation();
  const id = location.state.id;
  const url = `user/` + id;

  const getOldInfos = () => {
    api
      .get(url)
      .then((response) => {
        let data = response.data;
        if (data.dateBirth) {
          data.dateBirth = new Date(data.dateBirth);
          data.dateBirth = data.dateBirth.toISOString().split("T")[0];
        }
        setValues({
          _id: data._id,
          email: !!data.email ? data.email : "",
          name: !!data.name ? data.name : "",
          nick: !!data.nick ? data.nick : "",
          sex: !!data.sex ? translateSex(data.sex) : "",
          CPF: !!data.CPF ? data.CPF : "",
          RG: !!data.RG ? data.RG : "",
          dateBirth: !!data.dateBirth ? data.dateBirth : "",
          contactNumber: !!data.contactNumber ? data.contactNumber : "",
          address: !!data.address ? data.address.street : "",
          company: !!data.company ? data.company : "",
          profession: !!data.profession ? data.profession : "",
          isFired: !!data.isFired ? data.isFired : "",
          isPatient: !!data.isPatient ? data.isPatient : "",
          isEmployee: !!data.isEmployee ? data.isEmployee : "",
          isDoctor: !!data.isDoctor ? data.isDoctor : "",
          isAdmin: !!data.isAdmin ? data.isAdmin : "",
          isSecretary: !!data.isFired ? data.isFired : "",
          entryDate: !!data.entryDate ? data.entryDate : "",
          exitDate: !!data.exitDate ? data.exitDate : "",
          workStart: !!data.workStart ? data.workStart : "",
          workEnd: !!data.workEnd ? data.workEnd : "",
          workInterval: !!data.workInterval ? data.workInterval : "",
          workLunch: !!data.workLunch ? data.workLunch : "",
          nationality: !!data.nationality ? data.nationality : "",
          document: !!data.document ? data.document : "",
          documentNumber: !!data.documentNumber ? data.document : "",
          documentEmissionState: !!data.documentEmissionState
            ? data.documentEmissionState
            : "",
          permissionLevel: !!data.permissionLevel ? data.permissionLevel : "",
          clinic: !!data.clinic ? data.clinic : "",
          specialities: !!data.specialities ? data.specialities : "",
          team: !!data.team ? data.team : "",
          CRM: !!data.CRM ? data.CRM : "",
          RQE: !!data.RQE ? data.RQE : "",
          workplace: !!data.workplace ? data.workplace : "",
        });
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getOldInfos();
  }, []);

  const [component, setComponent] = useState(null);
  const [aba, setAba] = useState(0);
  const [openPopUpInativ, setOpenPopUpInativ] = useState(false);
  const [openPopUpEdit, setOpenPopUpEdit] = useState(false);
  const [openStatusOKPopUp, setOpenStatusOKPopUp] = useState(false);
  const [openStatusErrPopUp, setOpenStatusErrPopUp] = useState(false);
  const [values, setValues] = useState({
    _id: "",
    email: "",
    password: "",
    name: "",
    nick: "",
    sex: "",
    CPF: "",
    RG: "",
    dateBirth: "",
    contactNumber: "",
    address: "",
    company: "",
    profession: "",
    isFired: false,
    isPatient: false,
    isEmployee: true,
    isDoctor: false,
    isAdmin: false,
    isSecretary: false,
    entryDate: "",
    exitDate: "",
    workStart: "",
    workEnd: "",
    workInterval: "",
    workLunch: "",
    nationality: "",
    document: "",
    documentNumber: "",
    documentEmissionState: "",
    permissionLevel: "",
    clinic: "",
    specialities: "",
    team: "",
    CRM: "",
    RQE: "",
    workplace: "",
  });

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

  //com base nas propriedades name e value do textfield/Input atualiza os valores
  const handleInputChange = (q) => {
    const { name, value } = q.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const editFunc = () => {
    if (!!values._id) {
      api
        .patch("/user/" + values._id, {
          email: values.email,
          name: values.name,
          password: values.password,
          nick: values.nick,
          sex: translateSex(values.sex),
          CPF: values.CPF,
          RG: values.RG,
          dateBirth: values.dateBirth,
          contactNumber: values.contactNumber,
          address: values.address,
          company: values.company,
          profession: values.profession,
          entryDate: values.entryDate,
          exitDate: values.exitDate,
          workStart: values.workStart,
          workEnd: values.workEnd,
          workInterval: values.workInterval,
          workLunch: values.workLunch,
          nationality: values.nationality,
          document: values.document,
          documentNumber: values.documentNumber,
          documentEmissionState: values.documentEmissionState,
          permissionLevel: values.permissionLevel,
          clinic: values.clinic,
          specialities: values.specialities,
          team: values.team,
          CRM: values.CRM,
          RQE: values.RQE,
          workplace: values.workplace,
        })
        .catch((err) => {
          console.log(err);
          handleCloseEdit();
          handleClickOpenStatusErrPopUp();
        })
        .then((res) => {
          handleCloseEdit();
          handleClickOpenStatusOKPopUp();
        });
    }
  };

  const inativPaciente = () => {
    if (!!values._id) {
      api
        .patch("/user/" + values._id, {
          isActive: false,
        })
        .catch((err) => {
          console.log(err);
          handleCloseInativ();
          handleClickOpenStatusErrPopUp();
        })
        .then((res) => {
          handleCloseInativ();
          handleClickOpenStatusOKPopUp();
        });
    }
  };

  useEffect(() => {
    if (aba == 0) {
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
                value={values.email}
                name="email"
                onChange={handleInputChange}
                label={"Email"}
                type={"email"}
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
                value={values.address}
                name="address"
                onChange={handleInputChange}
                label={"Endereço"}
                type={"text"}
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
                label={"Telefone"}
                mask={"(99)99999-9999"}
              />
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
              Inativar funcionário
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
                value={values.nationality}
                name="nationality"
                onChange={handleInputChange}
                label={"Nacionalidade"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.profession}
                name="profession"
                onChange={handleInputChange}
                label={"Profissão"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.document}
                name="document"
                onChange={handleInputChange}
                label={"Tipo de documento"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.documentNumber}
                name="documentNumber"
                onChange={handleInputChange}
                label={"Número do documento"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.documentEmissionState}
                name="documentEmissionState"
                onChange={handleInputChange}
                label={"Estado de emissão do documento"}
                type={"text"}
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
                select={true}
                value={values.isDoctor ? "Sim" : "Não"}
                label={"É médico?*"}
                names={["Não", "Sim"]}
                onChange={(e) => {
                  console.log(e.target);
                  const isDoctor = e.target.value;
                  isDoctor == "Sim"
                    ? setValues({ ...values, isDoctor: "true" })
                    : setValues({ ...values, isDoctor: false });
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.CRM}
                name="CRM"
                onChange={handleInputChange}
                label={"CRM"}
                type={"text"}
                disabled={!values.isDoctor ? true : false}
                required={false}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.CRM}
                name="RQE"
                onChange={handleInputChange}
                label={"RQE"}
                type={"text"}
                disabled={!values.isDoctor ? true : false}
                required={false}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.CRM}
                name="workplace"
                onChange={handleInputChange}
                label={"Endereço de trabalho"}
                type={"text"}
                disabled={!values.isDoctor ? true : false}
                required={false}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.specialities}
                name="specialities"
                onChange={handleInputChange}
                label={"Especialidades"}
                type={"text"}
                disabled={!values.isDoctor ? true : false}
                required={false}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.team}
                name="team"
                onChange={handleInputChange}
                label={"Time"}
                type={"text"}
                disabled={!values.isDoctor ? true : false}
                required={false}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.clinic}
                name="clinic"
                onChange={handleInputChange}
                label={"Clínicas"}
                type={"text"}
                disabled={!values.isDoctor ? true : false}
                required={false}
              />
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
              Inativar funcionário
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
                label={<Typography sx={sx2}>Segunda-feira</Typography>}
              />
              <FormControlLabel
                sx={sx1}
                control={<Checkbox />}
                label={<Typography sx={sx2}>Terça-feira</Typography>}
              />
              <FormControlLabel
                sx={sx1}
                control={<Checkbox />}
                label={<Typography sx={sx2}>Quarta-feira</Typography>}
              />
              <FormControlLabel
                sx={sx1}
                control={<Checkbox />}
                label={<Typography sx={sx2}>Quinta-feira</Typography>}
              />
              <FormControlLabel
                sx={sx1}
                control={<Checkbox />}
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
                label={<Typography sx={sx2}>Sábado</Typography>}
              />
              <FormControlLabel
                sx={sx1}
                control={<Checkbox />}
                label={<Typography sx={sx2}>Domingo</Typography>}
              />
            </Stack>
          </Stack>
          <Grid container spacing={3}>
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
                value={values.exitDate}
                name="exitDate"
                onChange={handleInputChange}
                label={"Data Final"}
                type={"date"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.workStart}
                name="workStart"
                onChange={handleInputChange}
                label={"Horário de Início"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.workInterval}
                name="workInterval"
                onChange={handleInputChange}
                label={"Intervalo"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.workEnd}
                name="workEnd"
                onChange={handleInputChange}
                label={"Horário de fim"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                value={values.workLunch}
                name="workLunch"
                onChange={handleInputChange}
                label={"Horário de almoço"}
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
          name={"Inativar paciente"}
          backgroundColor={"#C9323A"}
          onClick={inativPaciente}
          description={"Você deseja inativar este paciente"}
          action={"inativar"}
          open={openPopUpInativ}
          handleClickOpen={handleClickOpenInativ}
          handleClose={handleCloseInativ}
        />
      )}

      {openPopUpEdit && (
        <PopUp
          name={"Salvar alterações"}
          onClick={editFunc}
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
            navigate("/admin/crudfunc");
          }}
          name={"Paciente editado com sucesso"}
          description={`O funcionário ${!!values.nick ? values.nick.split(" ")[0] : values.name.split(" ")[0]
            }  foi editado com sucesso. Deseja retornar à página de funcionários?`}
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
            "Ocorreu um erro ao tentar editar o funcionário. Deseja rever?"
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
