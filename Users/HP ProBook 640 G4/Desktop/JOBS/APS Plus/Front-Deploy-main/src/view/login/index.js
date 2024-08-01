import React, { useState, useContext, useEffect } from "react";
import validator from 'validator';
import { UserContext } from "../../context/user";
import styles from './login.module.css'
import { Container, Stack, Typography, TextField, Box, Link } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputField from "../../components/input_field";
import StyledButton from "../../components/button"
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { SelectUserType, SelectCorrectURL } from "../../utils/index";

const Login = () => {
  const { setEmail, setToken, setUser, setUserId, setIsAuthenticated, setUserType } = useContext(UserContext)
  const [values, setValues] = useState({ password: "", email: "" });
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loginError, setLoginError] = useState(false)
  const navigate = useNavigate();

  //com base nas propriedades name e value do textfield/Input atualiza os valores
  const handleInputChange = q => {
    const { name, value } = q.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const validate = () => {
    var isValid = true
    if (!validator.isEmail(values['email'])) {
      setEmailError("Email não é válido.")
      isValid = false
    } else {
      setEmailError("")
    }
    if (!values['password']) {
      setPasswordError("A senha é obrigatória.")
      isValid = false
    } else {
      setPasswordError("")
    }
    return isValid
  }

  const login = e => {

    var isValid
    isValid = validate()
    if (!isValid) {
      return
    }

    api.post('/login', { email: values.email, password: values.password }).then(
      res => {
        setLoginError(false)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("userId", res.data._id)
        localStorage.setItem("memedToken", res.data.memedToken)

        setIsAuthenticated(true)
        setEmail(res.data.email)
        setToken(res.data.token)
        setUserId(res.data._id)
        setUser(res.data.name)
        setUserType(SelectUserType(res.data))
        navigate(`/${SelectCorrectURL(SelectUserType(res.data))}`)
      }
    ).catch(error => {
      setLoginError(true)
    })
  }

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
      <Container maxWidth="lg" sx={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)", borderRadius: "24px", backgroundColor: "#FFF" }} disableGutters={true}>
        <img src="/Login/Rectangle 119.svg" className={styles.blobLogin} />
        <Stack direction="row" spacing={0}>
          <Stack direction="column" sx={{ backgroundColor: "#E5E9FF", padding: "5rem 3rem 5rem 3rem", width: "100%", borderRadius: "24px 0px 0px 24px;" }}>
            <Typography align="left" variant="h3" fontWeight={700}>
              Seja bem-vindo a APS Plus!
            </Typography>

            <InputField label="Digite seu Email" name="email" type="email"
              error={!!emailError}
              helperText={emailError}
              margin={"3rem 0 0 0"}
              value={values.email}
              onChange={handleInputChange}
              icon={<EmailOutlinedIcon />} />
            <InputField label="Digite seu Senha" name="password" type="password"
              error={!!passwordError}
              helperText={passwordError}
              margin={"2rem 0 0 0"}
              value={values.password}
              onChange={handleInputChange}
              icon={<LockOutlinedIcon />} />
            {!!loginError ?
              <Typography align="left" variant="p" sx={{ m: "2rem 0 0 0", color: "red" }}>
                Email e/ou senha não estão no sistema.
              </Typography>
              : null
            }
            <StyledButton variant={'contained'} width={"100%"} height={"auto"} text={"Login"} margin={"2rem 0 0 0"} onClick={e => login(e)} />
            <Link href='/passwordrecover' align="left" sx={{ width: "11rem", cursor: 'pointer', color: 'black', marginTop: "1rem", textDecoration: "underline" }}>
              Esqueci minha senha
            </Link>
          </Stack>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}>
            <img src="/Login/undraw_workout_gcgu_1.svg" alt="Mulher Pulando" />
          </Box>
        </Stack>
      </Container>
    )
  } else {
    return (
      <Container sx={{ backgroundColor: "#FFF", width: "100vw", backgroundImage: "url(/Login/Detalhe.svg)", backgroundSize: "100%", backgroundRepeat: "no-repeat", backgroundPosition: "right bottom", borderRadius: "0vh 0vh 3vh 3vh" }} disableGutters={true}>
        <Stack direction="column" sx={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)", backgroundColor: "#E5E9FF", padding: "5rem 3rem 5rem 3rem", width: "80vw", marginLeft: "10vw", marginBottom: "38.5vh", borderRadius: "3vh" }}>
          <Typography align="left" fontSize="3vh" fontWeight={700}>
            Seja bem-vindo a APS Plus!
          </Typography>

          <InputField label="Digite seu Email" name="email" type="email"
            error={!!emailError}
            helperText={emailError}
            margin={"3rem 0 0 0"}
            value={values.email}
            onChange={handleInputChange}
            icon={<EmailOutlinedIcon />} />
          <InputField label="Digite seu Senha" name="password" type="password"
            error={!!passwordError}
            helperText={passwordError}
            margin={"2rem 0 0 0"}
            value={values.password}
            onChange={handleInputChange}
            icon={<LockOutlinedIcon />} />
          {!!loginError ?
            <Typography align="left" variant="p" sx={{ m: "2rem 0 0 0", color: "red" }}>
              Email e/ou senha não estão no sistema.
            </Typography>
            : null
          }
          <StyledButton variant={'contained'} width={"100%"} height={"auto"} text={"Login"} margin={"2rem 0 0 0"} onClick={e => login(e)} />
          <Link href='/passwordrecover' align="left" sx={{ width: "11rem", cursor: 'pointer', color: 'black', marginTop: "1rem", textDecoration: "underline" }}>
            Esqueci minha senha
          </Link>
        </Stack>
      </Container>
    )
  }
}

export default Login;