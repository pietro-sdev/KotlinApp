import * as React from "react";
import { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./accordion_prontuario.module.css";
import { Grid } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import api from "../../services/api";
import StyledButton from "../button";
import fileDownload from 'js-file-download';
import {prontuarioExceptionParser} from '../../utils/exceptionParser'

export default function AccordionProntuario(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const formatKey = (key) => {
    switch (key) {
      case "Pressao_arterial_sistolica":
        return ["Pressão arterial sistólica", "mmHg"];
      case "Pressao_arterial_diastolica":
        return ["Pressão arterial diastólica", "mmHg"];
      case "Frequencia_respiratoria":
        return ["Frequência respiratória", "mrm"];
      case "Frequencia_Cardiaca":
        return ["Frequência cardíaca", "bpm"];
      case "Perimetro_cefalico":
        return ["Perímetro cefálico", "cm"];
      case "Saturacao_do_Oxigenio":
        return ["Saturação do oxigênio", "SpO2"];
      case "Circunferencia_Abdominal":
        return ["Circunferência abdominal", "cm"];
      case "Temperatura":
        return ["Temperatura", "°C"];
      case "Glicemia":
        return ["Glicemia", "mg/dL"];
      case "Peso":
        return ["Peso", "kg"];
      case "Altura":
        return ["Altura", "cm"];
      case "IMC":
        return ["IMC", ""];
      case "Comentario":
        return ["Comentário", ""]
      default:
        return key
    }
  };
  const objective = {
    Frequencia_respiratoria: props.objective.respiratoryFrequency,
    Frequencia_Cardiaca: props.objective.cardiacFrequency,
    Perimetro_cefalico: props.objective.cephalicPerimeter,
    Pressao_arterial_sistolica: props.objective.systolic,
    Pressao_arterial_diastolica: props.objective.diastolic,
    Saturacao_do_Oxigenio: props.objective.oxigenSaturation,
    Circunferencia_Abdominal: props.objective.abdominalCircunference,
    Temperatura: props.objective.temperature,
    Glicemia: props.objective.glycemia,
    Peso: props.objective.weight,
    IMC: props.objective.imc,
    Altura: props.objective.height,
    Comentario: props.objective.adicional2
  };
  let objective_text = [];
  let cid_text = [];
  let plan_text = [];
  let prescription_text = [];
  let plan = props.plan;
  let sxDetailLabel = {
    color: "#003895",
    fontFamily: "Mulish",
    fontWeight: 800,
    fontSize: "20px",
  };

  let sxDetailSubLabel = {
    fontFamily: "Mulish",
    fontWeight: 800,
  };

  let sxDetaiContent = {
    fontFamily: "Mulish",
  };
  for (const [key, value] of Object.entries(objective)) {
    let text
    if (!!value) {
      text = formatKey(key)[0] + ": " + value + " " + formatKey(key)[1];

      objective_text.push(
        <Typography
          sx={sxDetailSubLabel}
          className={styles.subtitulo}
          noWrap={false}
        >
          {text}
        </Typography>
      );
    }
    else
      text = formatKey(key)[0] + ": " + "--";

  }
  props.diagnosis.forEach((diagnosis) => {
    cid_text.push(
      <Stack spacing={1}>
        <Typography
          component="div"
          className={styles.subtitulo}
          noWrap={false}
          sx={sxDetailSubLabel}
        >
          <Box fontWeight="fontWeightMedium" display="inline">
            {diagnosis.CID}
          </Box>
        </Typography>
        <Stack>
          <Typography className={styles.subtitulo} sx={sxDetaiContent}>
            {"Status: " + diagnosis.status}
          </Typography>
          <Typography className={styles.subtitulo} sx={sxDetaiContent}>
            {"Diagnostico: " + diagnosis.diagnosis}
          </Typography>
          <Typography className={styles.subtitulo} sx={sxDetaiContent}>
            {"Resolução: " + diagnosis.resolution}
          </Typography>
          <Typography className={styles.subtitulo} sx={sxDetaiContent}>
            {"Observações: " + diagnosis.observations}
          </Typography>
        </Stack>
      </Stack>
    );
  });
  let sub_plan_text = []
  if (!!plan.request)
    plan.request.forEach((request, index) => {
      sub_plan_text.push(
        <Typography className={styles.subtitulo} sx={sxDetaiContent}>
          {`Solicitação de exame: ${index + 1}` + request}
        </Typography>
      )
    })

  plan_text.push(
    <Stack>
      <Typography className={styles.subtitulo} sx={sxDetaiContent}>
        {"Informações: " + plan.complementar}
      </Typography>
      <Typography className={styles.subtitulo} sx={sxDetaiContent}>
        {"Encaminhamento: " + plan.referral}
      </Typography>
      {sub_plan_text}
    </Stack>
  );
  if (!!props.exames) {
    props.exames.forEach((exam) => {
      prescription_text.push(
        <Stack marginBottom={1}>
          <Grid container spacing={2}>
            <Grid item xs={6}>

              <Typography className={styles.subtitulo} sx={sxDetaiContent}>
                {"Informações: " + exam.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <StyledButton
                text={<DownloadIcon />}
                // variant="contained"
                width={40}
                height={40}
                onClick={() => {
                  api.post('downloadFile', { "key": exam.awsKey }, { "responseType": "blob" })
                    .then((response) => {
                      fileDownload(response.data, exam.awsKey);
                    })
                    .catch((e) => console.log(e))
                }}
              />
            </Grid>
          </Grid>
        </Stack>
      )
    })
  }
  return (
    <div className={styles.accordion}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            className={styles.titulo}
            sx={{
              width: "80%",
              flexShrink: 0,
              fontFamily: "Mulish",
              fontWeight: 800,
            }}
          >
            Resumo do atendimento realizado na data:{" "}
            <Typography
              display="inline"
              className={styles.section}
              sx={{ color: "#003895", fontFamily: "Mulish", fontWeight: 800 }}
            >
              {props.info.date}
            </Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Typography
              className={styles.subtitulo}
              sx={{ fontFamily: "Mulish", fontWeight: 800 }}
            >
              Início: {props.info.start} | Fim: {props.info.end} &nbsp; &nbsp; &nbsp;{" "}
              {props.info.doctor} &nbsp; {props.info.doctor_speciality ? `(${props.info.doctor_speciality})` : ""} &nbsp; {props.info.doctorDocumentType ?? prontuarioExceptionParser(props.info)}-{`${props.info.doctorCRM_Location}:${props.info.doctorCRM}`}
              {props.CRM}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Stack>
                  <Typography sx={sxDetailLabel}>Subjetivo</Typography>
                  <Typography sx={sxDetailSubLabel}>
                    Motivo da consulta:
                  </Typography>
                  <Typography sx={sxDetaiContent}>
                    {" "}
                    {props.subjective.reason}
                  </Typography>

                  <Typography sx={sxDetailSubLabel}>
                    Medicamentos em uso:
                  </Typography>
                  <Typography sx={sxDetaiContent}>
                    {props.subjective.medicines}
                  </Typography>
                  <Typography sx={sxDetailSubLabel}>Alergias:</Typography>
                  <Typography sx={sxDetaiContent}>
                    {props.subjective.allergies}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack>
                  <Typography sx={sxDetailLabel}>Objetivo</Typography>
                  {objective_text}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack marginRight={2}>
                  <Typography sx={sxDetailLabel}>Avaliação</Typography>
                  <Typography sx={sxDetailSubLabel}>Condições</Typography>
                  <Stack sx={sxDetaiContent} spacing={1}>{cid_text}</Stack>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack marginRight={2}>
                  <Typography sx={sxDetailLabel}>Plano</Typography>
                  {plan_text}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack marginRight={1}>
                  <Typography sx={sxDetailLabel}>Prescrições</Typography>
                  {prescription_text}
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
