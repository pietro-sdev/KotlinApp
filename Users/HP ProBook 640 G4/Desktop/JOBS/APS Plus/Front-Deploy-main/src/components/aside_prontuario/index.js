import React, { useEffect } from "react";
import { Stack, Typography, TextField, IconButton, Card, CardContent, } from "@mui/material";
import styles from "./aside.module.css";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import InputField from "../input_field";
import PopUpLinhasDeCuidado from "../popup_linha_de_cuidado";
import { getAge, translateSex } from "../../utils";

export default function Aside({ isEditable = true, values, handleInputChange, handleValuesChange, hasCareLine = true , handleUpdateCareline}) {
  const [isEdit, setIsEdit] = useState(false);
  const [component, setComponent] = useState(null);
  const [open, setOpen] = useState(false);
  const showPatientName = ( values.patientNick || values.patientName ) ? ( values.patientNick && values.patientNick != '' ? values.patientNick : values.patientName ) : ( !!values.nick && values.nick != '' ? values.nick : values.name)
  const showPatientAge = getAge(values.dateBirth ?? values.patientBirthday)
  const showPatientSex = values.sex ?? translateSex(values.patientSex)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (hasCareLine) {
      if (isEdit) {
        setComponent(
          <Stack
          sx={{ backgroundColor: "#9EA7FF" }}
          spacing={1}
          >
            <Stack>
              <Typography
                sx={{
                  fontFamily: "Mulish",
                  fontStyle: "normal",
                  fontSize: "20px",
                  fontWeight: "800",
                }}
              >
                Linha de Cuidado
              </Typography>
              <Stack spacing={1}>
                <Typography sx={sx1}>{values.careLineName}</Typography>
                <Typography sx={sx2}>{values.careLineStatus}</Typography>
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  sx={{
                    borderRadius: "0.7rem",
                    backgroundColor: "#EEE",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Mulish",
                      fontStyle: "normal",
                      fontSize: "15px",
                      fontWeight: "400",
                      padding: "0rem 1rem 0rem 1rem",
                    }}
                  >
                    {values.careLineTag}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Stack spacing={3}>
              <Typography
                sx={{
                  fontFamily: "Mulish",
                  fontStyle: "normal",
                  fontSize: "20px",
                  fontWeight: "800",
                }}
              >
                Lista de Problemas
              </Typography>
              <Stack spacing={1}>
                <Typography sx={sx1}>Problemas Ativos</Typography>
                <InputField
                  variant={"standard"}
                  backgroundColor={"#9EA7FF"}
                  type={"text"}
                  name={"activeProblems"}
                  value={values.activeProblems}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography sx={sx1}>Antecedentes Pessoais</Typography>
                <InputField
                  variant={"standard"}
                  backgroundColor={"#9EA7FF"}
                  type={"text"}
                  name={"personalAntecedents"}
                  value={values.personalAntecedents}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography sx={sx1}>Antecedentes Familiares</Typography>
                <InputField
                  variant={"standard"}
                  backgroundColor={"#9EA7FF"}
                  type={"text"}
                  name={"familyAntecedents"}
                  value={values.familyAntecedents}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography sx={sx1}>Tratamentos em andamento</Typography>
                <InputField
                  variant={"standard"}
                  backgroundColor={"#9EA7FF"}
                  type={"text"}
                  name={"progressTreatment"}
                  value={values.progressTreatment}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography sx={sx1}>Alergias</Typography>
                <InputField
                  variant={"standard"}
                  backgroundColor={"#9EA7FF"}
                  type={"text"}
                  name={"allergies"}
                  value={values.allergies}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography sx={sx1}>Anexos</Typography>
                <InputField
                  variant={"standard"}
                  backgroundColor={"#9EA7FF"}
                  type={"text"}
                  name={"attachments"}
                  value={values.attachments}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography sx={sx1}>Lembretes</Typography>
                <InputField
                  variant={"standard"}
                  backgroundColor={"#9EA7FF"}
                  type={"text"}
                  name={"notes"}
                  value={values.notes}
                  onChange={handleInputChange}
                />
              </Stack>
            </Stack>
          </Stack>
        );
      } else {
        setComponent(
          <Stack
            sx={{ backgroundColor: "#9EA7FF" }}
            spacing={1}
          >
            <Stack>
              <Typography
                sx={{
                  fontFamily: "Mulish",
                  fontStyle: "normal",
                  fontSize: "20px",
                  fontWeight: "800",
                }}
              >
                Linha de Cuidado
              </Typography>
              <Stack spacing={1}>
                <Typography sx={sx1}>{values.careLineName}</Typography>
                <Typography sx={sx2}>{values.careLineStatus}</Typography>
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  sx={{
                    borderRadius: "0.7rem",
                    backgroundColor: "#FFF",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Mulish",
                      fontStyle: "normal",
                      fontSize: "16px",
                      fontWeight: "400",
                      padding: "0rem 1rem 0rem 1rem",
                    }}
                  >
                    {values.careLineTag}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing={3}>
              <Typography
                sx={{
                  fontFamily: "Mulish",
                  fontStyle: "normal",
                  fontSize: "20px",
                  fontWeight: "800",
                }}
              >
                Lista de Problemas
              </Typography>
              <Stack spacing={1}>
                <Typography sx={sx1}>Problemas Ativos</Typography>
                <Typography sx={sx2}>{values.activeProblems}</Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography sx={sx1}>Antecedentes Pessoais</Typography>
                <Typography sx={sx2}>{values.personalAntecedents}</Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography sx={sx1}>Antecedentes Familiares</Typography>
                <Typography sx={sx2}>{values.familyAntecedents}</Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography sx={sx1}>Tratamentos em andamento</Typography>
                <Typography sx={sx2}>{values.progressTreatment}</Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography sx={sx1}>Alergias</Typography>
                <Typography sx={sx2}>{values.allergies}</Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography sx={sx1}>Anexos</Typography>
                <Typography sx={sx2}>{values.attachments}</Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography sx={sx1}>Lembretes</Typography>
                <Typography sx={sx2}>{values.notes}</Typography>
              </Stack>
            </Stack>
          </Stack>
        );
      }
    } else {
      if (isEdit) {
        setComponent(
          <Stack
            sx={{ backgroundColor: "#9EA7FF" }}
            spacing={3}
          >
            <Typography
              sx={{
                fontFamily: "Mulish",
                fontStyle: "normal",
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              Lista de Problemas
            </Typography>
            <Stack spacing={1}>
              <Typography sx={sx1}>Problemas Ativos</Typography>
              <InputField
                variant={"standard"}
                backgroundColor={"#9EA7FF"}
                type={"text"}
                name={"activeProblems"}
                value={values.activeProblems}
                onChange={handleInputChange}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography sx={sx1}>Antecedentes Pessoais</Typography>
              <InputField
                variant={"standard"}
                backgroundColor={"#9EA7FF"}
                type={"text"}
                name={"personalAntecedents"}
                value={values.personalAntecedents}
                onChange={handleInputChange}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography sx={sx1}>Antecedentes Familiares</Typography>
              <InputField
                variant={"standard"}
                backgroundColor={"#9EA7FF"}
                type={"text"}
                name={"familyAntecedents"}
                value={values.familyAntecedents}
                onChange={handleInputChange}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography sx={sx1}>Tratamentos em andamento</Typography>
              <InputField
                variant={"standard"}
                backgroundColor={"#9EA7FF"}
                type={"text"}
                name={"progressTreatment"}
                value={values.progressTreatment}
                onChange={handleInputChange}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography sx={sx1}>Alergias</Typography>
              <InputField
                variant={"standard"}
                backgroundColor={"#9EA7FF"}
                type={"text"}
                name={"allergies"}
                value={values.allergies}
                onChange={handleInputChange}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography sx={sx1}>Anexos</Typography>
              <InputField
                variant={"standard"}
                backgroundColor={"#9EA7FF"}
                type={"text"}
                name={"attachments"}
                value={values.attachments}
                onChange={handleInputChange}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography sx={sx1}>Lembretes</Typography>
              <InputField
                variant={"standard"}
                backgroundColor={"#9EA7FF"}
                type={"text"}
                name={"notes"}
                value={values.notes}
                onChange={handleInputChange}
              />
            </Stack>
          </Stack>
        );
      } else {
        setComponent(
          <Stack
            sx={{ backgroundColor: "#9EA7FF" }}
            spacing={3}
          >
            <Typography
              sx={{
                fontFamily: "Mulish",
                fontStyle: "normal",
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              Lista de Problemas
            </Typography>
            <Stack spacing={1}>
              <Typography sx={sx1}>Problemas Ativos</Typography>
              <Typography sx={sx2}>{values.activeProblems}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography sx={sx1}>Antecedentes Pessoais</Typography>
              <Typography sx={sx2}>{values.personalAntecedents}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography sx={sx1}>Antecedentes Familiares</Typography>
              <Typography sx={sx2}>{values.familyAntecedents}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography sx={sx1}>Tratamentos em andamento</Typography>
              <Typography sx={sx2}>{values.progressTreatment}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography sx={sx1}>Alergias</Typography>
              <Typography sx={sx2}>{values.allergies}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography sx={sx1}>Anexos</Typography>
              <Typography sx={sx2}>{values.attachments}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography sx={sx1}>Lembretes</Typography>
              <Typography sx={sx2}>{values.notes}</Typography>
            </Stack>
          </Stack>
        );
      }
    }
  }, [isEdit, values, handleInputChange]);

  const sx2 = {
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontSize: "16px",
    fontWeight: "400",
  };
  const sx1 = {
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontSize: "16px",
    fontWeight: "800",
  };

  return (
    <div className={styles.aside}>
      {isEditable ? <IconButton
        onClick={() => {
          if (isEdit) {
            setIsEdit(false);
          } else {
            handleClickOpen();
            setIsEdit(true);
          }
        }}
        sx={{
          backgroundColor: "#9EA7FF",
          position: "relative",
          left: "90%",
        }}
      >
        <EditIcon />
      </IconButton> : <></>}
      {showPatientSex && <>
        <Typography sx={sx1}>{"Sexo: " + showPatientSex }</Typography>
      </>}
      <Typography sx={sx1}>{"Nome: " + showPatientName }</Typography>
      <Typography sx={sx1}>{"Idade: " + showPatientAge }</Typography>
      {component}
      <PopUpLinhasDeCuidado
        values={values}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleValuesChange={handleValuesChange}
        handleUpdateCareline={handleUpdateCareline}
      />
    </div >
  );
}
