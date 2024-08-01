import React, { useState, useContext, useEffect } from 'react';
import styles from './verConsultas.module.css';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import TelemedicineIcon from '@mui/icons-material/MedicalServices';
import PharmacyIcon from '@mui/icons-material/Medication';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import StyledPagination from '../../../components/pagination';
import api from '../../../services/api';
import { UserContext } from '../../../context/user';
import { Divider, IconButton } from '@mui/material';
import StyledButton from '../../../components/button/index'


export default function VerConsultas() {

    const navigate = useNavigate();
    let userId = localStorage.getItem('userId') ?? '';
    const [consultas, setConsultas] = useState([]);
    const [consultasPaginacao, setConsultasPaginacao] = useState([]);
    const [page, setPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState(5)
    const [user,setUser] = useState(null)

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    useEffect(() => {
        api.get(`/user/${userId}`)
        .then((response) => {
            setUser(response.data)
        }).catch((error) => {
            console.log(error)
        })

        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);
        getQueries(userId);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const getQueries = async () => {
        await api.get(`/queries/patient/${userId}`)
            .then((resp) => {
                let arrayObj = []
                resp.data.forEach(obj => {
                    let tempObj = new Object
                    for (let key in resp.data[0]) {
                        if (["doctor", "date", "status", "sex", "_id","careLineName"].includes(key))
                            tempObj[`${key}`] = obj[`${key}`]
                    }
                    arrayObj.push(tempObj)
                })
                arrayObj.reverse(); 
                setConsultas(arrayObj);
                if (isDesktop) {
                        const quantPaginas = Math.ceil(arrayObj.length / 3)
                        setNumberOfPages(quantPaginas)
                        const inicio = (page - 1) * 3
                        const fim = inicio + 3
                        const arrayLimited = [...arrayObj].slice(inicio, fim)
                        setConsultasPaginacao(arrayLimited);
                    }
            }).catch((error) => {
                console.error(error)
            })
    }

    const getPagination = () => {
        const quantPaginas = Math.ceil(consultas.length / 3)
        setNumberOfPages(quantPaginas)
        const inicio = (page - 1) * 3
        const fim = inicio + 3
        const arrayLimited = [...consultas].slice(inicio, fim)
        setConsultasPaginacao(arrayLimited);
    }

    useEffect(() => { //
        getPagination();
    }, [page])

    const consultaColor = (e) => {
        switch (e) {
            case 'Realizada':
                return 'green'
            case 'Não Realizada':
                return 'red'
            case 'Agendada':
                return '#FFC107'
            default:
                return ""
        }
    }

    const doctor = (e) => {
        switch(e){
            case "male":
                return "Dr."
            case "female":
                return "Dra."
            default:
                return "Dr(a)."
        }
    }
    
    const renderizarConsultas = consultas => consultas.map((consulta, index) => {
        if(isDesktop) {
            return (
                <div className={styles.consulta} key={index}>
                    <div className={styles.informacoesConsulta}>
                        <div className={styles.consultaDoutor}>{doctor(consulta.doctor?.sex)} {consulta.doctor?.name}</div>
                        <div className={styles.barra}>|</div>
                        <div className={styles.consultaData}>{consulta.date}</div>
                        <div className={styles.barra}>|</div>
                        <div className={styles.consultaStatus} style={{ color: `${consultaColor(consulta.status)}` }}>{consulta.status}</div>
                    </div>
                    <button className={styles.consultaVerDetalhes}
                        onClick={() => navigate(`/paciente/detalhesconsulta`, { state: { queryId: consulta._id } })}
                    >Ver detalhes</button>
                </div>
            );
        } else {
            return(
                <div className={styles.consultaMobile} key={index}>
                    <div className={styles.informacoesConsultaMobile}>
                        <div className={styles.consultaDoutorMobile}>{doctor(consulta.doctor?.sex)} {consulta.doctor?.name}</div>
                        <div className={styles.consultaDataStatusMobile}>
                            <div className={styles.consultaDataMobile}>{consulta.date}</div>
                            <div className={styles.barraMobile}></div>
                            <div className={styles.consultaStatusMobile} style={{ color: `${consultaColor(consulta.status)}` }}>{consulta.status}</div>
                        </div>
                        <button 
                            className={styles.consultaVerDetalhesMobile}
                            onClick={() => navigate(`/paciente/detalhesconsulta`, { state: { queryId: consulta._id}})}
                        >
                            Ver detalhes
                        </button>
                    </div>
                </div>
            );
        }
    })

    
    if (isDesktop) {
        return (
            <div className={styles.pagina}>
                <div className={styles.menu} style={{ backgroundImage: "url(/pag_inicial_paciente/background-menu.svg)" }}>
                    <div className={styles.linkMenu}
                        onClick={() => navigate('/paciente', { state: { id: userId } })}>
                        <HomeIcon />
                        <p className={styles.textoMenu}>Home</p>
                    </div>
    
    
                    <div className={styles.linkMenu}
                        onClick={() => navigate('/paciente/verconsultas', { state: { id: userId } })}>
                        <CalendarMonthIcon />
                        <p className={styles.textoMenu}>Consultas</p>
                    </div>
    
                    <div className={styles.linkMenu}
                        onClick={() => navigate('/paciente/perfil', { state: { id: userId } })}>
                        <Person2OutlinedIcon />
                        <p className={styles.textoMenu}>Perfil</p>
                    </div>

                    <div className={styles.linkMenu} onClick={() => { navigate('') }}>
                        <PharmacyIcon />
                        <p className={styles.textoMenu}>Fármacia</p>
                    </div>

                    <div className={styles.linkMenu} onClick={() => { navigate('') }}>
                        <TelemedicineIcon />
                        <p className={styles.textoMenu}>Telemedicina</p>
                    </div>
                </div>
                
                <div className={styles.imagemBackground}>
                    <div className={styles.tela}>
                        <div className={styles.topo}>
                            <div className={styles.linkVoltar}
                                onClick={() => navigate(-1, { state: { id: userId } })}>
                                <ArrowBackIosIcon />
                                <p className={styles.textoMenu}>Voltar</p>
                            </div>
                            <div className={styles.linhaCuidado}>
                                <p>Linha de Cuidado:</p>
                                <div className={styles.textoCuidado}>{user?.patient.careLineName ?? 'Nenhuma linha de cuidado'}</div>
                            </div>
                            <div className={styles.textoProgresso}>Progresso</div>
                            <div className={styles.listaConsultas}>
                                {renderizarConsultas(consultasPaginacao)}
                            </div>
                            <div className={styles.linha}>
                                <StyledPagination page={page} setPage={setPage} numberOfPages={numberOfPages} variant="outlined" />
                            </div>
    
                        </div>
    
                    </div>
                </div>
    
            </div>
        );
    } else {
        return (
            <div className={styles.paginaMobile}>
                <div className={styles.linkVoltarMobile}>
                    <StyledButton
                        onClick={() => navigate(-1, { state: { id: userId }})}
                        startIcon={<ArrowBackIosIcon style={{fontSize:"5.5vw"}}/>}
                        text={"Voltar"}
                        fontSize={"5vw"}
                        fontWeigth={"800"}
                        backgroundColor={"#FFF"}
                        color={"black"}
                    />
                </div>
                <div className={styles.paginaContentBackgroundMobile}>
                    <div className={styles.paginaContentMobile}>
                        <div className={styles.linhaCuidadoMobile}>
                            <p>Linha de Cuidado:</p>
                            <div className={styles.textoCuidadoMobile}>{user?.patient.careLineName}</div>
                        </div>
                        <div className={styles.listaConsultasMobile}>
                            {renderizarConsultas(consultas)}    
                        </div>
                    </div>
                </div>        
            </div>
        );
    }
}
