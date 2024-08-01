
import React from "react";
import styles from "./navbar.module.css";
import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/user";
import { Stack, Box, Divider, Typography, Link, Drawer, IconButton } from "@mui/material";
import api from "../../services/api";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MenuIcon from '@mui/icons-material/MenuRounded';
import MenuCloseIcon from '@mui/icons-material/HighlightOffRounded';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import StyledButton from "../button";
import { SelectCorrectURL, SelectUserType, PACIENTE, ADMIN } from "../../utils";
import StyledLink from "../link";
export default function NavBarPaciente() {
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        if (SelectUserType(response.data) !== PACIENTE) {
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
    } else if (userType !== PACIENTE) {
      navigate(`/${SelectCorrectURL(userType)}`);
    }
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [isAuthenticated]);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  if (isDesktop) {
    return (
        <Stack direction="column" sx={{ minWidth: "1024px" }}>
          <Stack
            direction="row"
            className={styles.navbar}>
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
                  onClick={() => navigate("/paciente/perfil")}
                  sx={{ color: " #FFF;", fontFamily: "Mulish", cursor: "pointer" }}
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
  } else {
    return(
      <Stack 
        direction="column"
        width="100%"
        height="auto"
        display="flex"
        alignItems="center">
        <Stack
          direction="row"
          className={styles.navbarMobile}>
            <Stack 
            className={styles.hudlogoMobile}
            onClick={() => {
              navigate("/paciente");
              setIsDrawerOpen(false);
            }}
            sx={{cursor:"pointer"}}>
              <img src="/logoMobile.png" alt="logo" className={styles.logoMobile} />
            </Stack>
            <IconButton  
              color='inherit' 
              aria-label='sideBarButton' 
              onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon style={{fontSize: '9vw'}}/>
            </IconButton>
            <Drawer
            anchor='top' 
            open={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)}>
            <Box className={styles.sideBarMobile}>
              <Stack
                direction="row"
                className={styles.navbarMobile}
                sx={{background:"#F3F3F3"}}>
                <Stack 
                className={styles.hudlogoMobile}
                onClick={() => {
                  navigate("/paciente");
                  setIsDrawerOpen(false);
                }}
                sx={{cursor:"pointer"}}>
                  <img src="/logoMobile.png" alt="logo" className={styles.logoMobile} />
                </Stack>
                <IconButton
                  color='inherit'
                  aria-label='sideBarCloseButton'
                  onClick={() => setIsDrawerOpen(false)}>
                  <MenuCloseIcon style={{fontSize: '9vw'}}/>
                </IconButton>
              </Stack>
              <Stack className={styles.sideBarMenuMobile}>
                <Typography 
                  onClick={
                    () => {
                      navigate("/paciente/");
                      setIsDrawerOpen(false);
                    }}
                  sx={{
                    color:"black;", 
                    fontFamily: "Mulish", 
                    fontSize: "4.5vw", 
                    lineHeight: "5vw",
                    cursor: "pointer",
                    fontWeight:700
                }}>
                  Home
                </Typography>
                <Typography 
                  onClick={
                    () => {
                      navigate("/paciente/verconsultas");
                      setIsDrawerOpen(false);
                    }}
                  sx={{
                    color:"black;", 
                    fontFamily: "Mulish", 
                    fontSize: "4.5vw", 
                    lineHeight: "5vw",
                    cursor: "pointer",
                    fontWeight:700
                }}>
                  Consultas
                </Typography>
                <Typography 
                  onClick={
                    () => {
                      navigate("/paciente/perfil");
                      setIsDrawerOpen(false);
                    }}
                  sx={{
                    color:"black;", 
                    fontFamily: "Mulish", 
                    fontSize: "4.5vw", 
                    lineHeight: "5vw",
                    cursor: "pointer",
                    fontWeight:700
                }}>
                  Perfil
                </Typography>
              </Stack>
              <Stack className={styles.sideBarLogoutMenuMobile}>
                <Stack className={styles.sideBarLogoutMobile}>
                  <IconButton  
                  sx={{color:"var(--primary-primary-01, #003895)"}}
                  onClick={logOut}>
                    <LogoutOutlinedIcon style={{fontSize:"9vw"}}/>
                    <Typography
                      sx={{
                        fontFamily:"Mulish",
                        fontSize:"3.8vw",
                        fontStyle:"normal",
                        fontWeight:"800",
                        lineHeigth:"5vw"
                      }}>
                      Log-out
                    </Typography>
                  </IconButton>
                </Stack>
                <Stack className={styles.sideBarProfileMobile}>
                  <IconButton  
                  sx={{color:"var(--primary-50, #E5E9FF);"}}
                  onClick={() => {
                    navigate("/paciente/perfil");
                    setIsDrawerOpen(false);
                  }}>
                    <AccountBoxIcon style={{fontSize:"9vw"}}/>
                    <Typography
                      sx={{
                        fontFamily:"Mulish",
                        fontSize:"3.8vw",
                        fontStyle:"normal",
                        fontWeight:"800",
                        lineHeigth:"5vw"
                      }}>
                      {user}
                    </Typography>
                  </IconButton>
                </Stack>
              </Stack>
            </Box>
          </Drawer>
        </Stack>
        <Box display="flex" justifyContent="center" alignItems="center" style={{paddingTop:"0vw"}}>
          <Outlet/>
        </Box>
      </Stack>
    );
  };
}
