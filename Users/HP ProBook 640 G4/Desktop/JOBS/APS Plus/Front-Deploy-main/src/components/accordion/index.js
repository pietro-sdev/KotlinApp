import React, { useEffect, useState } from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Accordion, Stack, Typography, TextField, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./accordion.module.css";
import StyledButton from "../button";

export default function AccordionCard({ name, values, handleInputChange, isDisable = false, pushAccordionArray, handleDelete, fontFamily = 'Mulish',
  fontStyle = 'normal', fontWeight = '500', fontSize = '18px', lineHeight = '24px', textColor = "#000", multiline = false, rows = 4 }) {
  const [component, setComponent] = useState(null);
  const [expand, setExpand] = React.useState(false);

  const handleExpandAcordion = () => {
    setExpand(!expand);
  };

  const handleChange = () => {
    handleExpandAcordion();
    pushAccordionArray(name, values);
  }
  useEffect(() => {
    if (isDisable) {
      setComponent(
        <Stack className={styles.accordion}>
          <Accordion expanded={expand}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => handleExpandAcordion()}
            >
              <Typography
                sx={{
                  fontFamily: "Mulish",
                  fontWeight: 700,
                  fontSize: "20px",
                }}
              >
                {name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction={"column"}>
                <Stack
                  direction={"row"}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <TextField
                    disabled
                    name="status"
                    value={values.status}
                    onChange={handleInputChange}
                    variant="filled"
                    placeholder="Status"
                    multiline
                    rows={1}
                    sx={{
                      mb: "30px",
                      width: "25%",
                      borderRadius: "8px;",
                      backgroundColor: "#CDD3FF",

                      "& .MuiInputBase-root": {
                        color: textColor,
                        fontFamily: fontFamily,
                        fontStyle: fontStyle,
                        fontWeight: fontWeight,
                        fontSize: fontSize,
                        lineHeight: lineHeight
                      }
                    }}
                  ></TextField>
                  <TextField
                    disabled
                    name="diagnosis"
                    value={values.diagnosis}
                    onChange={handleInputChange}
                    variant="filled"
                    placeholder="Diagnóstico"
                    multiline
                    rows={1}
                    sx={{
                      mb: "30px",
                      width: "25%",
                      borderRadius: "8px;",
                      backgroundColor: "#CDD3FF",

                      "& .MuiInputBase-root": {
                        color: textColor,
                        fontFamily: fontFamily,
                        fontStyle: fontStyle,
                        fontWeight: fontWeight,
                        fontSize: fontSize,
                        lineHeight: lineHeight,
                      },
                    }}
                  ></TextField>
                  <TextField
                    disabled
                    name="resolution"
                    value={values.resolution}
                    onChange={handleInputChange}
                    variant="filled"
                    placeholder="Resolução"
                    multiline
                    rows={1}
                    sx={{
                      mb: "30px",
                      width: "25%",
                      borderRadius: "8px;",
                      backgroundColor: "#CDD3FF",
                      "& .MuiInputBase-root": {
                        color: textColor,
                        fontFamily: fontFamily,
                        fontStyle: fontStyle,
                        fontWeight: fontWeight,
                        fontSize: fontSize,
                        lineHeight: lineHeight,
                      },
                    }}
                  ></TextField>
                </Stack>
                <TextField
                  disabled
                  name="observations"
                  value={values.observations}
                  onChange={handleInputChange}
                  variant="filled"
                  placeholder="Observações"
                  multiline
                  rows={4}
                  sx={{
                    mb: "30px",
                    borderRadius: "8px;",
                    backgroundColor: "#CDD3FF",
                    "& .MuiInputBase-root": {
                      color: textColor,
                      fontFamily: fontFamily,
                      fontStyle: fontStyle,
                      fontWeight: fontWeight,
                      fontSize: fontSize,
                      lineHeight: lineHeight,
                    },
                  }}
                ></TextField>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                >
                  <StyledButton
                    onClick={(e) => {
                      handleDelete(name)
                    }}
                    key={1}
                    variant={"contained"}
                    text={"Deletar"}
                    width={"25%"}
                    height={"2.5rem"}
                    backgroundColor={"red"}
                  ></StyledButton>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      );
    } else {
      setComponent(
        <Stack className={styles.accordion}>
          <Accordion expanded={expand}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => handleExpandAcordion()}
            >
              <Typography
                sx={{
                  fontFamily: "Mulish",
                  fontWeight: 700,
                  fontSize: "20px",
                }}
              >
                {name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction={"column"}>
                <Stack
                  direction={"row"}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <TextField
                    name="status"
                    value={values.status}
                    onChange={handleInputChange}
                    variant="filled"
                    placeholder="Status"
                    multiline
                    rows={1}
                    sx={{
                      mb: "30px",
                      width: "25%",
                      borderRadius: "8px;",
                      backgroundColor: "#CDD3FF",
                      "& .MuiInputBase-root": {
                        color: textColor,
                        fontFamily: fontFamily,
                        fontStyle: fontStyle,
                        fontWeight: fontWeight,
                        fontSize: fontSize,
                        lineHeight: lineHeight,
                      },
                    }}
                  ></TextField>
                  <TextField
                    name="diagnosis"
                    value={values.diagnosis}
                    onChange={handleInputChange}
                    variant="filled"
                    placeholder="Diagnóstico"
                    multiline
                    rows={1}
                    sx={{
                      mb: "30px",
                      width: "25%",
                      borderRadius: "8px;",
                      backgroundColor: "#CDD3FF",
                      "& .MuiInputBase-root": {
                        color: textColor,
                        fontFamily: fontFamily,
                        fontStyle: fontStyle,
                        fontWeight: fontWeight,
                        fontSize: fontSize,
                        lineHeight: lineHeight,
                      },
                    }}
                  ></TextField>
                  <TextField
                    name="resolution"
                    value={values.resolution}
                    onChange={handleInputChange}
                    variant="filled"
                    placeholder="Resolução"
                    multiline
                    rows={1}
                    sx={{
                      mb: "30px",
                      width: "25%",
                      borderRadius: "8px;",
                      backgroundColor: "#CDD3FF",
                      "& .MuiInputBase-root": {
                        color: textColor,
                        fontFamily: fontFamily,
                        fontStyle: fontStyle,
                        fontWeight: fontWeight,
                        fontSize: fontSize,
                        lineHeight: lineHeight,
                      },
                    }}
                  ></TextField>
                </Stack>
                <TextField
                  name="observations"
                  value={values.observations}
                  onChange={handleInputChange}
                  variant="filled"
                  placeholder="Observações"
                  multiline
                  rows={4}
                  sx={{
                    mb: "30px",
                    borderRadius: "8px;",
                    backgroundColor: "#CDD3FF",
                    "& .MuiInputBase-root": {
                      color: textColor,
                      fontFamily: fontFamily,
                      fontStyle: fontStyle,
                      fontWeight: fontWeight,
                      fontSize: fontSize,
                      lineHeight: lineHeight,
                    },
                  }}
                ></TextField>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                >
                  <StyledButton
                    onClick={() => {
                      if(!isDisable){
                        handleChange()
                      }
                    }}
                    variant={"contained"}
                    text={"Salvar"}
                    width={"25%"}
                    height={"2.5rem"}
                  ></StyledButton>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      );
    }
  }, [name, expand, values]);

  return <div> {component} </div>;
}
