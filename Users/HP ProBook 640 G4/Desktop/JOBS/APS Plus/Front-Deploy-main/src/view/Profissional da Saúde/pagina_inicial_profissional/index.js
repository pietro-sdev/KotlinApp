import React from "react";
import styles from "./pagInicialProfissional.module.css";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import StyledButton from "../../../components/button";
import { Button, Typography, Stack, Divider } from "@mui/material";

export default function PagInicialProfissional() {
  return (
    <Stack>
      <img src={"/pag_inicial_admin/azul_dir.svg"} className={styles.dir}></img>
      <img
        src={"/pag_inicial_admin/amarelo_dir.svg"}
        className={styles.dir}
      ></img>
      <img src={"/pag_inicial_admin/azul_esq.svg"} className={styles.esq}></img>
      <img
        src={"/pag_inicial_admin/amarelo_esq.svg"}
        className={styles.esq}
      ></img>

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
          href="/profissional/crudpacientes"
          variant="contained"
          sx={{
            color: "#FFF",
            backgroundColor: "#003895",
            borderRadius: "2rem",
            height: "23rem",
            width: "23rem",
          }}
        >
          <Stack spacing={3} alignItems={"center"} justifyContent={"center"}>
            <ManageAccountsOutlinedIcon
              sx={{ width: "10rem", height: "10rem" }}
            />
            <Typography variant="h4" fontSize={"1.6rem"} fontWeight={600}>
              Administração
            </Typography>
          </Stack>
        </Button>

        <Button
          href="/profissional/crudconsultamedico"
          variant="contained"
          sx={{
            color: "#FFF",
            backgroundColor: "#003895",
            borderRadius: "2rem",
            height: "23rem",
            width: "23rem",
          }}
        >
          <Stack spacing={3} alignItems={"center"} justifyContent={"center"}>
            <CalendarMonthOutlinedIcon
              sx={{ width: "10rem", height: "10rem" }}
            />
            <Typography variant="h4" fontSize={"1.6rem"} fontWeight={600}>
              Agenda
            </Typography>
          </Stack>
        </Button>
      </Stack>
    </Stack>
  );
}
