import React from "react";
import styles from "./navbar.module.css";
import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/user";
import { Stack, Box, Divider, Typography, Link } from "@mui/material";
import api from "../../services/api";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import StyledButton from "../button";
import { SelectCorrectURL, SelectUserType, ADMIN } from "../../utils";
import StyledLink from "../link";

export default function NavBarAdmin() {
  //confirmar dados dos usarios
  const {
    user,
    userType,
    setUserType,
    setUserId,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    setEmail,
    setToken,
  } = useContext(UserContext);
  const [component, setComponent] = useState(null);
  const [width, setWidth] = useState(0);
  const navigate = useNavigate();

  const getUserInformation = (token, storageUserId) => {
    api
      .get("/user/" + storageUserId)
      .then((response) => {
        setToken(token);
        setUser(!!response.data.nick ? response.data.nick : response.data.name);
        setEmail(response.data.email);
        setUserId(response.data._id);
        setUserType(SelectUserType(response.data));
        setIsAuthenticated(true);
        if (SelectUserType(response.data) !== ADMIN) {
          navigate(`/${SelectCorrectURL(SelectUserType(response.data))}`);
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
      });
  };

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  const logOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("memedToken");
    navigate("/login");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      const token = localStorage.getItem("token");
      const storageUserId = localStorage.getItem("userId");
      if (token !== null) {
        getUserInformation(token, storageUserId);
      } else {
        navigate("/login");
      }
    } else if (userType !== ADMIN) {
      navigate(`/${SelectCorrectURL(userType)}`);
    }
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [isAuthenticated]);

  useEffect(() => {
    setComponent(
      <Stack
        direction={"row"}
        spacing={6}
        sx={{ fontWeight: 800, fontSize: "24px" }}
      >
        <StyledLink
          onClick={() => navigate("/admin")}
          underline={"hover"}
          text={"Início"}
          themeDefault={false}
        />
        <StyledLink
          onClick={() => navigate("/admin/crudfunc")}
          underline={"hover"}
          text={"Administração"}
          themeDefault={false}
        />
        <StyledLink
          onClick={() => navigate("/admin/crudconsulta")}
          underline={"hover"}
          text={"Agenda"}
          themeDefault={false}
        />
        <StyledLink
          onClick={() => navigate("/admin/crudpacientes")}
          underline={"hover"}
          text={"Pacientes"}
          themeDefault={false}
        />
        <StyledLink
          abaLink={true}
          href="https://docs.google.com/spreadsheets/d/1Jq81mZA5eGgEdMqw9Olysq6oQqL2-MatCEXhv6AeWtE/edit#gid=2030888083 "
          underline={"hover"}
          text={"Coordenação"}
          themeDefault={false}
        />
      </Stack>
    );
  }, [isAuthenticated]);

  return (
    <Stack direction="column" spacing={3}>
      <Stack
        direction="row"
        className={styles.navbar}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <img src="/logo.svg" alt="logo" className={styles.logo} />
        {component}
        <Stack direction="row" spacing={4}>
          <StyledButton
            onClick={logOut}
            startIcon={<LogoutOutlinedIcon sx={{ color: "#003895" }} />}
            width={"9rem"}
            height={"3rem"}
            variant={"outlined"}
            text={"Log-out"}
            backgroundColor={"#FFF"}
            color={"#003895"}
          />
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#003895  ",
              borderRadius: "8px;",
              padding: "0.2rem 1rem 0.2rem 1rem",
            }}
          >
            <PermIdentityOutlinedIcon
              sx={{ color: "#FFF", margin: 0, pt: 0 }}
            />
            <Typography
              sx={{ color: " #FFF;", fontFamily: "Mulish" }}
              padding={"0px 10px"}
            >
              {user}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Outlet />
      </Box>
    </Stack>
  );
}
