import React from "react";
import styles from "./addPaciente.module.css";
import InputField from "../../../components/input_field/index";
import StyledButton from "../../../components/button/index";
import SelectButton from "../../../components/select_button";
import PopUp from "../../../components/pop_up";
import api from "../../../services/api";
import { useState, useEffect } from "react";
import { Link, Stack, Grid, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MaskedInput from "../../../components/masked_input";
import {
  translateSex,
  translateRelationshipStatus,
} from "../../../utils/index";
import StyledLink from "../../../components/link";

export default function AddPacienteSecretaria() {
  const local_id = localStorage.getItem("userId")
  const [identity, setIdentity] = useState("")
  const [openConfirmationPopUp, setOpenConfirmationPopUp] = useState(false);
  const [openStatusOKPopUp, setOpenStatusOKPopUp] = useState(false);
  const [openStatusErrPopUp, setOpenStatusErrPopUp] = useState(false);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    _id: "",
    email: "",
    password: "",
    name: "",
    nick: "",
    race: "",
    sex: "",
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
    insurance: "",
    insurancePlan: "",
    insuranceNumber: "",
    insuranceDependency: "",
    relationshipStatus: "",
    possuiCPF: "Sim"
  });

  const handleClickOpenConfirmationPopUp = (e) => {
    setOpenConfirmationPopUp(false);
    addPatient(e);
  };

  const handleCloseConfirmationPopUp = () => {
    setOpenConfirmationPopUp(false);
  };

  const handleClickOpenStatusOKPopUp = () => {
    handleCloseConfirmationPopUp();
    setOpenStatusOKPopUp(true);
  };

  const handleCloseStatusOKPopUp = () => {
    setOpenStatusOKPopUp(false);
  };

  const handleClickOpenStatusErrPopUp = () => {
    handleCloseConfirmationPopUp();
    setOpenStatusErrPopUp(true);
  };

  const handleCloseStatusErrPopUp = () => {
    setOpenStatusErrPopUp(false);
  };

  //com base nas propriedades name e value do textfield/Input atualiza os valores
  const handleInputChange = (q) => {
    const { name, value } = q.target;
    const [keyObject, key] = name.split(".");
    if (!key)
      setValues({
        ...values,
        [name]: value,
      });
    else {
      const object = values[keyObject];
      setValues({
        ...values,
        [keyObject]: {
          ...object,
          [key]: value,
        },
      });
    }
  };

  const addPatient = (e) => {
    // close pop up
    setOpenConfirmationPopUp(false);
    // prevent page from reloading
    e.preventDefault();
    // send data to api
    api
      .post("/user", {
        isActive: true,
        email: values.email,
        password: values.password,
        name: values.name,
        nick: values.nick,
        race: values.race,
        sex: translateSex(values.sex),
        possuiCPF: values.possuiCPF,
        CPF: values.possuiCPF === "Sim" ? values.CPF : "000.000.000-00",
        RG: values.RG,
        dateBirth: values.dateBirth,
        contactNumber: values.contactNumber,
        address: {
          street: values.street,
          CEP: values.street,
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
        },
      })
      .then((res) => {
        api
          .post("/record", {
            meetList: [],
            patient: {
              CPF: res.data.CPF,
              id: res.data._id
            },
          })
          .catch((error) => {
            console.log(error);
          });
        handleClickOpenStatusOKPopUp();
      })
      .catch((err) => {
        console.log(err);
        handleClickOpenStatusErrPopUp();
      });
  };

  useEffect(() => {
    api.get(`/user/${local_id}`).then(resp => {
      let identity_booleans = resp.data.employee
      if (identity_booleans.isAdmin)
        setIdentity("admin")
      else {
        if (identity_booleans.isDoctor)
          setIdentity("profissional")
        else
          setIdentity("secretaria")
      }
    })
  }, [])


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
            href={`/${identity}/crudpacientes`}
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
          <StyledLink underline="always" text={"Dados Pessoais"} />
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
                  label={"Endereço"}
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
                  names={['', "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]}
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
              direction={"row"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <StyledButton
                onClick={() => setOpenConfirmationPopUp(true)}
                width={365}
                height={50}
                text={"Adicionar Paciente"}
                variant={"contained"}
              ></StyledButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {openConfirmationPopUp && (
        <PopUp
          onClick={(e) => handleClickOpenConfirmationPopUp(e)}
          name={"Adicionar paciente"}
          description={"Você deseja adicionar o paciente"}
          action={"adicionar"}
          open={openConfirmationPopUp}
          handleClose={handleCloseConfirmationPopUp}
        />
      )}
      {openStatusOKPopUp && (
        <PopUp
          onClick={() => {
            navigate(`/${identity}/crudpacientes`);
          }}
          name={"Paciente adicionado com sucesso"}
          description={`O paciente ${!!values.nick ? values.nick.split(" ")[0] : values.name.split(" ")[0]
            }  foi adicionado com sucesso. Deseja retornar à página de pacientes?`}
          action={"retornar"}
          open={openStatusOKPopUp}
          handleClose={handleCloseStatusOKPopUp}
        />
      )}
      {openStatusErrPopUp && (
        <PopUp
          onClick={handleCloseStatusErrPopUp}
          name={"Erro ao adicionar"}
          description={
            "Ocorreu um erro ao tentar adicionar o paciente. Deseja rever?"
          }
          action={"rever dados"}
          open={openStatusErrPopUp}
          handleClose={handleCloseStatusErrPopUp}
        />
      )}
    </Stack>
  );
}
