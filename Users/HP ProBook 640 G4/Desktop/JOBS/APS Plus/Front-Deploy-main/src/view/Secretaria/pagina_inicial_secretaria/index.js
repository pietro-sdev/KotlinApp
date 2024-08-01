import React from "react";
import styles from "./pagInicial.module.css";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { Button, Stack, Typography, Divider } from "@mui/material";

export default function PaginaInicialSecretaria() {
  return (
    <Stack>
      <img src={"/secretaria/azul_esq.svg"} className={styles.background} />
      <img src={"/secretaria/amarelo_esq.svg"} className={styles.background} />
      <Stack
        spacing={10}
        direction={"row"}
        sx={{ mt: "10rem" }}
        divider={
          <Divider
            sx={{ backgroundColor: "black" }}
            orientation="vertical"
            flexItem
          />
        }
      >
        <Button
          href="/secretaria/crudpacientes"
          variant="contained"
          sx={{
            color: "#FFF",
            backgroundColor: "#003895",
            borderRadius: "2rem",
            height: "23rem",
            width: "23rem",
          }}
        >
          <Stack spacing={3} alignItems={"center"}>
            <ManageAccountsOutlinedIcon
              sx={{ width: "10rem", height: "10rem" }}
            />
            <Typography variant="h4" fontSize={"1.6rem"} fontWeight={600}>
              Pacientes
            </Typography>
          </Stack>
        </Button>
      </Stack>
    </Stack>
  );
}
