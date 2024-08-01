import * as React from "react";
import styles from "./editarPaciente.module.css";
import InputField from "../../../components/input_field/index";
import SelectButton from "../../../components/select_button";
import StyledButton from "../../../components/button/index";
import PopUp from "../../../components/pop_up";
import api from "../../../services/api";
import { useState, useEffect } from "react";
import { Link, Grid, Stack, Divider } from "@mui/material";
import { Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MaskedInput from "../../../components/masked_input";
import { translateSex, translateRelationshipStatus } from "../../../utils";
import StyledLink from "../../../components/link";
import { FaWhatsapp } from "react-icons/fa";
import { Modal, Box, TextField, Button } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};




export default function EditPacienteSecretaria() {
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
  const location = useLocation();
  const [identity, setIdentity] = useState("");
  const local_id = localStorage.getItem("userId");
  const id = location.state.id;
  const url = `user/` + id;
  // função para pegar os dados do paciente a ser editado
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
          race: !!data.race ? data.race : "",
          sex: !!data.sex ? translateSex(data.sex) : "",
          possuiCPF: !!data.possuiCPF ? data.possuiCPF : "Sim",
          CPF: !!data.CPF ? data.CPF : "",
          RG: !!data.RG ? data.RG : "",
          dateBirth: !!data.dateBirth ? data.dateBirth : "",
          contactNumber: !!data.contactNumber ? data.contactNumber : "",
          street: !!data.address
            ? !!data.address.street
              ? data.address.street
              : ""
            : "",
          CEP: !!data.address
            ? !!data.address.CEP
              ? data.address.CEP
              : ""
            : "",
          city: !!data.address
            ? !!data.address.city
              ? data.address.city
              : ""
            : "",
          UF: !!data.address
            ? !!data.address.UF
              ? data.address.UF
              : ""
            : "",
          profession: !!data.profession ? data.profession : "",
          relationshipStatus: !!data.patient
            ? !!data.patient.relationshipStatus
              ? translateRelationshipStatus(data.patient.relationshipStatus)
              : ""
            : "",
          insurance: !!data.patient
            ? !!data.patient.insurance
              ? data.patient.insurance
              : ""
            : "",
          insurancePlan: !!data.patient
            ? !!data.patient.insurancePlan
              ? data.patient.insurancePlan
              : ""
            : "",
          insuranceNumber: !!data.patient
            ? !!data.patient.insuranceNumber
              ? data.patient.insuranceNumber
              : ""
            : "",
          insuranceDependency: !!data.patient
            ? !!data.patient.insuranceDependency
              ? data.patient.insuranceDependency
              : ""
            : "",
        });
        setMessage(`Olá, ${data.name} está feliz por você se juntar a nós nesta jornada de cuidado! A partir de agora você tem uma equipe comprometida, que irá te acompanhar e auxiliar em sua jornada de saúde. Aqui você vive mais e melhor! Sua primeira conversa será com um profissional enfermeiro ou enfermeira, que irá colher seu histórico de saúde para seguir com a consulta com o seu médico ou médica de referência. Após essas etapas, você será incluído em um programa de cuidado. Preparado para sua jornada pessoal de saúde?! Agora a APS Plus está com você!`);

      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getOldInfos();
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = values.contactNumber.replace(/\D/g, ''); // Remove non-digit characters
    const fullPhoneNumber = `55${phoneNumber}`; // Adiciona o código do país +55
  
    const encodedMessage = encodeURIComponent(message); // Usa a mensagem do estado
    const whatsappURL = `https://wa.me/${fullPhoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };
  
  

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
    patient: {
      guardianName: "",
      guardianRelationship: "",
      insuranceExpirationDate: "",
    },
    possuiCPF: "Sim"
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
  const handleCloseStatusErrPopUp = () => {
    setOpenStatusErrPopUp(false);
  };
  const handleCloseStatusOKPopUp = () => {
    setOpenStatusOKPopUp(false);
  };
  const handleClickOpenStatusOKPopUp = () => {
    setOpenPopUpInativ(false);
    setOpenPopUpEdit(false);
    setOpenStatusOKPopUp(true);
  };

  const handleClickOpenStatusErrPopUp = () => {
    setOpenPopUpInativ(false);
    setOpenPopUpEdit(false);
    setOpenStatusErrPopUp(true);
  };

  const handleInputChange = (q) => {
    const { name, value } = q.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const editPaciente = () => {
    if (!!values._id) {
      api
        .patch("/user/" + values._id, {
          email: values.email,
          password: values.password,
          name: values.name,
          nick: values.nick,
          race: values.race,
          sex: translateSex(values.sex),
          possuiCPF: values.possuiCPF,
          CPF: values.CPF,
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
          possuiCPF: "Sim"
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
  const [message, setMessage] = useState("");


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
    api.get(`/user/${local_id}`).then((resp) => {
      let identity_booleans = resp.data.employee;
      if (identity_booleans.isAdmin) setIdentity("admin");
      else {
        if (identity_booleans.isDoctor) setIdentity("profissional");
        else setIdentity("secretaria");
      }
    });
  }, []);

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
  <Link
    onClick={handleOpen}
    underline="hover"
    sx={{
      fontSize: "16px",
      cursor: "pointer",
      color: "blue", // Alterar cor conforme necessário
      pr: "3rem",
      display: 'flex',
      alignItems: 'center',
      marginRight: '1rem', // Margem à direita do botão "Editar Mensagem"
    }}
  >
    Editar Mensagem
  </Link>
  <Link
    onClick={handleWhatsAppClick}
    underline="hover"
    sx={{
      fontSize: "16px",
      cursor: "pointer",
      color: "green",
      pr: "3rem",
      display: 'flex',
      alignItems: 'center',
      marginRight: '1rem', // Margem à direita do botão "Enviar Mensagem"
    }}
  >
    <FaWhatsapp size={24} style={{ marginRight: '0.5rem' }} />
    Enviar Mensagem
  </Link>
  <Link
    onClick={() => setOpenPopUpInativ(true)}
    underline="hover"
    sx={{
      fontSize: "16px",
      cursor: "pointer",
      color: "black",
      pr: "3rem",
      marginRight: '1rem', // Margem à direita do botão "Inativar paciente"
    }}
  >
    Inativar paciente
  </Link>
  <StyledButton
    onClick={() => setOpenPopUpEdit(true)}
    width={365}
    height={50}
    text={"Editar Paciente"}
    variant={"contained"}
  ></StyledButton>
</Stack>

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{ ...style, width: 400 }}>
    <h2 id="modal-modal-title">Editar Mensagem</h2>
    <TextField
      id="modal-modal-description"
      multiline
      rows={6}
      variant="outlined"
      fullWidth
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
      Salvar
    </Button>
  </Box>
</Modal>

          </Stack>
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
            navigate(`/${identity}/crudpacientes`);
          }}
          name={"Paciente editado com sucesso"}
          description={`O paciente ${!!values.nick ? values.nick.split(" ")[0] : values.name.split(" ")[0]
            }  foi editado com sucesso. Deseja retornar à página de pacientes?`}
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
            "Ocorreu um erro ao tentar editar o paciente. Deseja rever?"
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
