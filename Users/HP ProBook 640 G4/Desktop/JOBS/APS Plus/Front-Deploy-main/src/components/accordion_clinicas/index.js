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

export default function AccordionProntuario(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const objective = {
    Frequencia_respiratoria:
      props.objective.respiratoryFrequency,
    Frequencia_Cardiaca:
      props.objective.cardiacFrequency,
    Perimetro_cefalico:
      props.objective.cephalicPerimeter,
    Pressao_cardiaca:
      props.objective.cardiacPressure,
    Saturacao_do_Oxigenio:
      props.objective.oxigenSaturation,
    Circunferencia_Abdominal:
      props.objective.abdominalCircunference,
    Temperatura:
      props.objective.temperature,
    Glicemia:
      props.objective.glycemia,
    Peso:
      props.objective.weight,
    IMC:
      props.objective.imc,
    Altura:
      props.objective.height,
  }
  let objective_text = []
  let cid_text = []
  let plan_text = []
  let plan = props.plan
  for (const [key, value] of Object.entries(objective)) {
    objective_text.push(
      <Typography className={styles.subtitulo} noWrap={false}>
        {key + ":" + value}
      </Typography>
    )
  }
  props.diagnosis.forEach(diagnosis => {
    cid_text.push(
      <>
        <Typography component='div' className={styles.subtitulo} noWrap={false}>
          <Box fontWeight='fontWeightMedium' display='inline'>{diagnosis.CID}</Box>
        </Typography>
        <Typography className={styles.subtitulo} > {"Status:" + diagnosis.status} </Typography>
        <Typography className={styles.subtitulo} > {"Diagnostico:" + diagnosis.diagnosis} </Typography>
        <Typography className={styles.subtitulo} > {"Resolução:" + diagnosis.resolution} </Typography>
        <Typography className={styles.subtitulo} > {"Observações:" + diagnosis.observations} </Typography>

      </>
    )
  })
  plan_text.push(
    <>
      <Typography className={styles.subtitulo} > {"Informações:" + plan.info} </Typography>
      <Typography className={styles.subtitulo} > {"Encaminhamento:" + plan.referral} </Typography>
      <Typography className={styles.subtitulo} > {"Solicitação de exame:" + plan.request} </Typography>
    </>
  )
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
            sx={{ width: "80%", flexShrink: 0 }}
          >
            Resumo do atendimento realizado na data:{props.info.date}
            <Typography
              display="inline"
              className={styles.section}
              sx={{ color: "#003895" }}
            >
              {props.date}
            </Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={styles.subtitulo}>
            Início: {props.inicio} | Fim: {props.fim} &nbsp; &nbsp; &nbsp;{" "}
            {props.info.doctor} &nbsp; ({props.tipo}) &nbsp; CRM-SP {props.CRM}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Stack>
              <Stack>
                <Typography
                  className={styles.section}
                  sx={{ color: "#003895" }}
                >
                  Subjetivo
                </Typography>
                <Typography className={styles.subtitulo}>
                  Motivo da consulta:
                </Typography>
                <Typography>
                  {props.subjective.reason}
                </Typography>
                <Typography className={styles.subtitulo}>
                  Medicamentos em uso:
                </Typography>
                <Typography>
                  {props.subjective.medicines}
                </Typography>
                <Typography className={styles.subtitulo}>
                  Alergias:
                </Typography>
                <Typography>
                  {props.subjective.allergies}
                </Typography>
              </Stack>

              <Stack>
                <Typography
                  className={styles.section}
                  sx={{ color: "#003895" }}
                >
                  Avaliação
                </Typography>
                <Typography className={styles.subtitulo}>Condições</Typography>
                {cid_text}
              </Stack>
            </Stack>

            <Stack>
              <Stack>
                <Typography
                  className={styles.section}
                  sx={{ color: "#003895" }}
                >
                  Objetivo
                </Typography>
                {objective_text}
              </Stack>

              <Stack>
                <Typography
                  className={styles.section}
                  sx={{ color: "#003895" }}
                >
                  Plano
                </Typography>
                {plan_text}
              </Stack>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
