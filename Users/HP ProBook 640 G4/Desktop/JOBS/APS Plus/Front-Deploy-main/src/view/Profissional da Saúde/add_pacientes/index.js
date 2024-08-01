import React from "react";
import styles from "./addPaciente.module.css";
import InputField from "../../../components/input_field/index";
import { useState, useEffect } from "react";
import { Stack, Box, Divider, Typography, Link, Grid, Button } from "@mui/material";
import StyledButton from "../../../components/button/index";
import PopUp from "../../../components/pop_up";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import MaskedInput from "../../../components/masked_input";
import StyledLink from "../../../components/link";
import { translateSex, translateRelationshipStatus } from "../../../utils";
import * as XLSX from "xlsx";

export default function AddPacienteProfissional() {
  const [openConfirmationPopUp, setOpenConfirmationPopUp] = useState(false);
  const [openStatusOKPopUp, setOpenStatusOKPopUp] = useState(false);
  const [openStatusErrPopUp, setOpenStatusErrPopUp] = useState(false);
  const [component, setComponent] = useState(null);
  const [aba, setAba] = useState(0);

  const [values, setValues] = useState({
    isActive: true,
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
    relationshipStatus: "",
    insurance: "",
    insurancePlan: "",
    insuranceNumber: "",
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
    possuiCPF: "Sim"
  });

  const navigate = useNavigate();

  const handleClickOpenConfirmationPopUp = (e) => {
    addPatient(e);
  };

  const handleCloseConfirmationPopUp = () => {
    setOpenConfirmationPopUp(false);
  };

  const handleClickOpenStatusOKPopUp = () => {
    setOpenStatusOKPopUp(false);
    navigate("/profissional/crudpacientes");
  };

  const handleCloseStatusOKPopUp = () => {
    setOpenStatusOKPopUp(false);
  };

  const handleCloseStatusErrPopUp = () => {
    setOpenStatusErrPopUp(false);
  };

  const handleInputChange = (q) => {
    const { name, value } = q.target;
    const [keyObject, key] = name.split(".");
    if (!key) {
      setValues({
        ...values,
        [name]: value,
      });
    } else {
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
    setOpenConfirmationPopUp(false);
    e.preventDefault();
    console.log("Enviando dados do paciente:", values);  // Adicionando log
    api
      .post("/user", {
        isActive: values.isActive,
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
          insuranceNumber: values.insuranceNumber,
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
          .then(response => {
            setOpenConfirmationPopUp(false);
            setOpenStatusOKPopUp(true);
          })
          .catch((error) => {
            console.log("Erro ao criar registro do paciente:", error);  // Adicionando log de erro
            api.delete("/user/" + res.data._id).catch(err => console.log(err))
            setOpenConfirmationPopUp(false);
            setOpenStatusErrPopUp(true);
          });
        setOpenConfirmationPopUp(false);
      })
      .catch((error) => {
        console.log("Erro ao adicionar usuário:", error);  // Adicionando log de erro
        setOpenConfirmationPopUp(false);
        setOpenStatusErrPopUp(true);  // Mostrar pop-up de erro
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Arquivo selecionado:", file);  // Verificar o arquivo selecionado
    if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        worksheet.forEach((row) => {
          const newValues = {
            isActive: row.isActive || true,
            email: row.email || "",
            password: row.password || "",
            name: row.name || "",
            nick: row.nick || "",
            race: row.race || "",
            sex: row.sex || "",
            CPF: row.CPF || "",
            RG: row.RG || "",
            dateBirth: row.dateBirth || "",
            contactNumber: row.contactNumber || "",
            address: {
              street: row.street || "",
              CEP: row.CEP || "",
              city: row.city || "",
              UF: row.UF || "",
            },
            company: row.company || "",
            profession: row.profession || "",
            isPatient: true,
            isEmployee: false,
            patient: {
              relationshipStatus: row.relationshipStatus || "",
              guardianName: row.guardianName || "",
              guardianRelationship: row.guardianRelationship || "",
              insurance: row.insurance || "",
              insuranceNumber: row.insuranceNumber || "",
              insuranceExpirationDate: row.insuranceExpirationDate || "",
            },
          };

          console.log("Adicionando paciente da planilha:", newValues);  // Adicionando log
          api
            .post("/user", newValues)
            .then((res) => {
              api
                .post("/record", {
                  meetList: [],
                  patient: {
                    CPF: res.data.CPF,
                    id: res.data._id,
                  },
                })
                .then((response) => {
                  setOpenStatusOKPopUp(true);
                })
                .catch((error) => {
                  console.log("Erro ao criar registro do paciente da planilha:", error);  // Adicionando log de erro
                  api.delete("/user/" + res.data._id).catch((err) => console.log(err));
                  setOpenStatusErrPopUp(true);
                });
            })
            .catch((error) => {
              console.log("Erro ao adicionar usuário da planilha:", error);  // Adicionando log de erro
              setOpenStatusErrPopUp(true);
            });
        });
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error("Por favor, selecione um arquivo Excel válido.");
    }
  };

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
                names={["Sim", "Não, gerar um CPF temporário"]}
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
                names={["Branco(a)", "Pardo(a)", "Preto(a)", "Amarelo(a)", "Indígena", "Prefiro não informar"]}
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
            <input
              accept=".xlsx, .xls"
              style={{ display: "none" }}
              id="upload-file"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="upload-file">
              <Button
                variant="contained"
                component="span"
                sx={{
                  ml: 2,
                  backgroundColor: "#003895",
                  color: "#FFF",
                  textTransform: "none",
                  fontFamily: "Mulish",
                  height: "50px",
                }}
              >
                Upload Planilha
              </Button>
            </label>
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
            text={"Dados Pessoais"}
          />
        </Stack>
        <Stack
          sx={{
            fontFamily: "Mulish",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "24px",
            width: "72rem",
          }}
        >
          {component}
        </Stack>
      </Stack>
      {openConfirmationPopUp && (
        <PopUp
          name={"Adicionar paciente"}
          description={"Você deseja adicionar o paciente"}
          action={"adicionar"}
          open={openConfirmationPopUp}
          onClick={(e) => handleClickOpenConfirmationPopUp(e)}
          handleClose={handleCloseConfirmationPopUp}
        />
      )}
      {openStatusOKPopUp && (
        <PopUp
          name={"Paciente adicionado com sucesso"}
          description={`O paciente ${values.nick ? values.nick.split(" ")[0] : values.name.split(" ")[0]
            }  foi adicionado com sucesso. Deseja retornar à página de pacientes?`}
          action={"retornar"}
          open={openStatusOKPopUp}
          onClick={handleClickOpenStatusOKPopUp}
          handleClose={handleCloseStatusOKPopUp}
        />
      )}
      {openStatusErrPopUp && (
        <PopUp
          name={"Erro ao adicionar"}
          description={
            "Ocorreu um erro ao tentar adicionar o paciente. Deseja rever?"
          }
          action={"rever dados"}
          open={openStatusErrPopUp}
          onClick={handleCloseStatusErrPopUp}
          handleClose={handleCloseStatusErrPopUp}
        />
      )}
    </Stack>
  );
}
