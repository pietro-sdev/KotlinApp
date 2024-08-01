import React, { useState, useEffect } from 'react'
import styles from './setInitialPassword.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { InputAdornment, TextField } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LandingNavBar from '../../components/landingNavbar/index'
import api from '../../services/api'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function SetInitialPassword() {
    const [passwordOne, setPasswordOne] = useState("")
    const [passwordTwo, setPasswordTwo] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const query = useQuery()
    const navigate = useNavigate()


    const hash = query.get("hash")
    const id = query.get("id")

    const sendNewPasssowrd = () => {
        if (passwordOne !== passwordTwo) {
            return setPasswordError("Senhas estão diferentes!")
        }
        if (passwordOne.length < 8) {
            return setPasswordError("Senha deve ter pelo menos 8 letras.")
        }
        api.post("/user/setInitialPassword", {
            hash,
            _id: id,
            password: passwordOne
        }).then(() => {
            setPasswordError("Senha criada! Entre na sua conta pelo login.")
            setInterval(function () {
                navigate("/login")
            }, 2000);
        }).catch((err) => {
            console.log(err)
            setPasswordError("Não autenticado!")
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
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <div className={styles.textFieldSection}>
                        <h2>Definir senha</h2>
                        <TextField
                            fullWidth
                            variant="filled"
                            label="Digite sua senha"
                            id="fullWidth"
                            value={passwordOne}
                            onChange={e => setPasswordOne(e.target.value)}
                            className={styles.textField}
                            type="password"
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <br />
                        <TextField
                            fullWidth
                            variant="filled"
                            label="Re-digite sua senha"
                            id="fullWidth"
                            className={styles.textField}
                            type="password"
                            value={passwordTwo}
                            onChange={e => setPasswordTwo(e.target.value)}
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <button onClick={sendNewPasssowrd} className={styles.btn}>Definir senha</button>
                        <p>{passwordError}</p>
                    </div>
                    <div className={styles.illustration}>
                        <img src='/Passwords/undraw_secure_login_pdn4.svg' />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.contentMobile}>
                <div className={styles.contentCardMobile}>
                    <div className={styles.textFieldSectionMobile}>
                        <h2>Definir senha</h2>
                        <TextField
                            fullWidth
                            variant="filled"
                            label="Digite sua senha"
                            id="fullWidth"
                            value={passwordOne}
                            onChange={e => setPasswordOne(e.target.value)}
                            className={styles.textFieldMobile}
                            type="password"
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <br />
                        <TextField
                            fullWidth
                            variant="filled"
                            label="Re-digite sua senha"
                            id="fullWidth"
                            className={styles.textFieldMobile}
                            type="password"
                            value={passwordTwo}
                            onChange={e => setPasswordTwo(e.target.value)}
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <button onClick={sendNewPasssowrd} className={styles.btn}>Definir senha</button>
                        <p>{passwordError}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SetInitialPassword
