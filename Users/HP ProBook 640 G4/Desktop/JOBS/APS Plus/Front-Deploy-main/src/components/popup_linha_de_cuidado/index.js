import {
  Stack,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import StyledButton from "../button";
import { padding } from "@mui/system";
import styles from "./popup_linha_de_cuidado.module.css";
import SelectButton from "../select_button";
import InputField from "../input_field";
import { SelectTag } from "../../utils/index";

const PopUpLinhasDeCuidado = ({
  name = "Editar Linhas do cuidado",
  backgroundColor = "#003895",
  handleClose,
  open,
  handleValuesChange,
  handleUpdateCareline
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [careLineName, setCareLineName] = useState('');
  const [careLineStatus, setCareLineStatus] = useState('');
  const [careLineTag, setCareLineTag] = useState('');

  const handleCareLineName = (event) => {
    const {
      target: { value },
    } = event;
    setCareLineName(value);

    // console.log(careLineName);
  };

  const handleCareLineStatus = (event) => {
    const {
      target: { value },
    } = event;
    setCareLineStatus(value);

    // console.log(careLineStatus);
  };

  const handleCareLineTag = (event) => {
    const {
      target: { value },
    } = event;
    setCareLineTag(value);

    // console.log(careLineTag);
  };
  const handleChange = () => {
    handleValuesChange("careLineName", careLineName);
    handleValuesChange("careLineStatus", careLineStatus);
    handleValuesChange("careLineTag", careLineTag);
    handleClose();
  };

  const expand = () => {
    setIsVisible(true);
  };

  const tags = SelectTag(careLineName);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            sx={{ fontFamily: "Mulish", fontWeight: 800, fontSize: 24 }}
          >
            {name}
          </Typography>

          <IconButton onClick={handleClose}>
            <HighlightOffIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Stack spacing={3}>
            <Stack
              direction="row"
              spacing={10}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Typography
                sx={{
                  fontFamily: "Mulish",
                  fontWeight: 400,
                  fontSize: 16,
                }}
              >
                Linha de cuidado
              </Typography>

              {/* <Typography
                sx={{ fontFamily: "Mulish", fontWeight: 400, fontSize: 16 }}
              >
                <Link href="" style={{ color: "#000" }}>
                  Remover
                </Link>
              </Typography> */}
            </Stack>
            <InputField
              select={true}
              name="name"
              value={careLineName}
              label="Nome"
              onChange={handleCareLineName}
              names={[
                "Saúde da criança",
                "Saúde da mulher",
                "Pré-natal",
                "HAS e alterações cardiovasculares",
                "DM e alteracões metabólicas",
                "Mudança de hábitos",
                "Saúde mental",
                "Alterações respiratórias",
                "Pós alta",
                "Saúde do idoso",
                "Alterações crônicas",
                "Vida saudável",
                "Afecções Emergentes e Reemergentes",
                ''
              ]}
            />
            <InputField
              select={true}
              name="status"
              value={careLineStatus}
              label="Status"
              onChange={handleCareLineStatus}
              names={[
                "Em investigação",
                "Em tratamento",
                "Confirmado",
                "Resolvido",
                "Compensado",
                "Descompensado",
                "Descartado",
                ''
              ]}
            />
            <InputField
              select={true}
              name="tag"
              value={careLineTag}
              label="Etiqueta"
              onChange={handleCareLineTag}
              names={tags}
            />
          </Stack>
        </Stack>

        {/* {!isVisible ? (
          <Stack direction="row" alignItems="center" spacing={1}>
          <AddCircleOutlinedIcon></AddCircleOutlinedIcon>
          
          <Typography
              align="center"
              onClick={expand}
              sx={{
                fontFamily: "Mulish",
                fontWeight: 800,
                fontSize: 16,
                textDecoration: "underline",
              }}
            >
              Adicionar nova linha de cuidado
            </Typography>
          </Stack>
        ) : null}

        {isVisible ? (
          <Stack>
            <Typography
              align="left"
              sx={{
                fontFamily: "Mulish",
                fontWeight: 400,
                fontSize: 16,
                margin: "20px 0 20px 0",
              }}
            >
              Selecione a nova linha de cuidado
            </Typography>

            <SelectButton
              variant={"filled"}
              label="Status"
              names={[""]}
              backgroundColor="#CDD3FF"
              width="100%"
              borderRadius={"8px"}
              color={"#606060"}
            />

            <Typography
              align="left"
              sx={{
                fontFamily: "Mulish",
                fontWeight: 400,
                fontSize: 16,
                margin: "20px 0 20px 0",
              }}
            >
              0 a 2 anos
            </Typography>

            <SelectButton
              variant={"filled"}
              label="Etiqueta"
              names={[""]}
              backgroundColor="#CDD3FF"
              width="100%"
              borderRadius={"8px"}
              color={"#606060"}
            />
          </Stack>
        ) : null} */}
      </DialogContent>
      <DialogActions sx={{ mb: "1rem" }}>
        <Stack
          direction={"column"}
          alignItems={"center"}
          justifyContent="space-between"
          spacing={2}
          width={"100%"}
        >
          <StyledButton
            onClick={() => handleUpdateCareline({careLineName,careLineStatus,careLineTag})}
            backgroundColor={backgroundColor}
            variant={"contained"}
            text={"Salvar alterações"}
            width={"90%"}
          ></StyledButton>

          <Typography
            align="center"
            sx={{
              fontFamily: "Mulish",
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            <Link onClick={handleClose} style={{ color: "#000" }}>
              Descartar
            </Link>
          </Typography>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpLinhasDeCuidado;
