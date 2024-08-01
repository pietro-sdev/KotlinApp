import React from "react";
import { useState, useEffect } from "react";
import styles from "./landingNavbar.module.css";
import { Box, Stack, Link, Drawer, Typography, IconButton, Icon } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MenuIcon from '@mui/icons-material/MenuRounded';
import MenuCloseIcon from '@mui/icons-material/HighlightOffRounded';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


export default function LandingNavBar() {

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  if(isDesktop) {
    return (
      <Stack direction="column" spacing={5}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <img src="/logo.svg" />
          </div>
          <Stack direction="row" spacing={10} sx={{mr: "5rem"}}> 
            <Link
              href="https://apsplus.com.br"
              variant="h5"
              underline="hover"
              sx={{ color: "black", fontWeight: 600 }}
            >
              Home
            </Link>
            <Link
              href="https://apsplus.com.br/sobre-nos/"
              variant="h5"
              underline="hover"
              sx={{ color: "black", fontWeight: 600 }}
            >
              Sobre Nós
            </Link>
            <Link
              href="https://apsplus.com.br/para-empresas/"
              variant="h5"
              underline="hover"
              sx={{ color: "black", fontWeight: 600 }}
            >
              Para empresas
            </Link>
          </Stack>
        </nav>
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
                  navigate("/");
                  setIsDrawerOpen(false);
                }}
                sx={{cursor:"pointer"}}>
                <img src="/logoMobile.png" alt="logo" className={styles.logoMobile}/>
              </Stack>
              <IconButton
                color="inherit"
                aria-label="sideBarButton"
                onClick={() => setIsDrawerOpen(true)}>
                  <MenuIcon style={{fontSize: "9vw"}}/>
              </IconButton>
              <Drawer
                anchor="top"
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
                          navigate("/");
                          setIsDrawerOpen(false);
                        }}
                        sx={{cursor:"pointer"}}
                        >
                        <img src="/logoMobile.png" alt="logo" className={styles.logoMobile}/>
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
                            navigate("/");
                            setIsDrawerOpen(false);
                          }}
                        sx={{
                          color:"black;", 
                          fontFamily: "Mulish", 
                          fontSize: "5vw", 
                          lineHeight: "7.78vw",
                          cursor: "pointer"
                      }}>
                        Home
                      </Typography>
                      <Typography 
                        onClick={
                          () => {
                            navigate("/sobre-nos");
                            setIsDrawerOpen(false);
                          }}
                        sx={{
                          color:"black;", 
                          fontFamily: "Mulish", 
                          fontSize: "5vw", 
                          lineHeight: "7.78vw",
                          cursor: "pointer"
                      }}>
                        Sobre Nós
                      </Typography>
                      <Typography 
                        onClick={
                          () => {
                            navigate("/para-empresas");
                            setIsDrawerOpen(false);
                          }}
                        sx={{
                          color:"black;", 
                          fontFamily: "Mulish", 
                          fontSize: "5vw", 
                          lineHeight: "7.78vw",
                          cursor: "pointer"
                      }}>
                        Para Empresas
                      </Typography>
                    </Stack>
                    <Stack className={styles.sideBarProfileMobile}>
                      <IconButton
                        sx={{color:"#FFF"}}>
                        <Typography
                          sx={{
                            fontFamily:"Mulish",
                            fontSize:"3.8vw",
                            fontStyle:"normal",
                            fontWeight:"800",
                            lineHeigth:"5vw"
                          }}>
                          Entre em contato
                        </Typography>
                      </IconButton>
                    </Stack>
                  </Box>
              </Drawer>
          </Stack>
          <Box display="flex" justifyContent="center" alignItems="center" style={{paddingTop:"3vw"}}>
            <Outlet/>
          </Box>
        </Stack>
    );
  };
}
