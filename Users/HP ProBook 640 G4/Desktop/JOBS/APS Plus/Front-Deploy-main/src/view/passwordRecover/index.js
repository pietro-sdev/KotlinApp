import React, {useState, useEffect} from 'react'
import styles from './passwordRecover.module.css'
import { InputAdornment, TextField } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import InputField from '../../components/input_field'
import api from '../../services/api'
import validator from 'validator'

function PasswordRecover() {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    const sendEmail = () => {
        // console.log(email)
        if(!validator.isEmail(email)){
            setEmailError("Formato de email inválido.")
        }
        setEmailError("")
        api.post("user/recoverPassword", {email: email})
            .then(()=>setEmailError("Email enviado!"))
            .catch(()=>setEmailError("Erro interno."))
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
                        <div className={styles.textFieldSectionTop}>
                            <h2>Recuperação de senha</h2>
                            <InputField
                                label="Digite seu Email"
                                id="fullWidth"
                                className={styles.textField}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    disableUnderline: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <MailOutlineIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <button onClick={sendEmail} className={styles.btn}>
                                Enviar email
                            </button>
                            {
                                emailError ? 
                                <p>
                                    { emailError } 
                                </p>:
                                null
                            }
                        </div>
                    </div>
                    <div className={styles.illustration}>
                        <img src='/Passwords/undraw_forgot_password.svg' />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.contentMobile}>
                <div className={styles.contentCardMobile}>
                    <div className={styles.textFieldSectionMobile}>
                        <div className={styles.textFieldSectionTopMobile}>
                            <h2>Recuperação de senha</h2>
                            <InputField
                                label="Digite seu Email"
                                id="fullWidth"
                                className={styles.textFieldMobile}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    disableUnderline: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <MailOutlineIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <button onClick={sendEmail} className={styles.btnMobile}>
                                Enviar email de verificação
                            </button>
                            {
                                emailError ? 
                                <p>
                                    { emailError } 
                                </p>:
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PasswordRecover
