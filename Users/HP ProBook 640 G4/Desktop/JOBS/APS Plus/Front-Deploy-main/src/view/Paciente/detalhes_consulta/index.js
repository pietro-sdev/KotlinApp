import React, { useState, useContext, useEffect, useRef } from 'react';
import styles from './detalhesConsulta.module.css';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LinkIcon from '@mui/icons-material/Link';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AttachFileSharpIcon from '@mui/icons-material/AttachFileSharp';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import api from '../../../services/api';
import { Stack, Box, Divider, Typography, Link, Grid, SvgIcon, IconButton } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import { translateModelOfConsultation } from '../../../utils';
import StyledButton from "../../../components/button/index";
import fileDownload from "js-file-download";
import DownloadIcon from '@mui/icons-material/Download';
import StyledPagination from '../../../components/pagination';



export default function DetalhesConsulta() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryId = !!location.state ? location.state.queryId : "";
    // queryId = "6484c4095fe21bdbbf6e7f28"
    const userId = !!localStorage.getItem('userId') ? localStorage.getItem('userId') : "";
    const [consultas, setConsultas] = useState([]);
    const [consultasPaginacao, setConsultasPaginacao] = useState([]);
    const [consulta, setConsulta] = useState({
        _id: queryId,
        date: "",
        startTime: "",
        status: "",
        link: "",
        model: "",
        doctor: "",
        speciality: "",
        // careLineName: ""
    })
    const [listaExames, setListaExames] = useState([{}])
    const [layout, setLayout] = useState(0);
    const [page, setPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState(5)

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

    const userInfoData = (title, icon, body) => {
        return (
            <div className={styles.infoConsultaMobile}>
                <div className={styles.infoDadosConsultaMobile}>
                    <div className={styles.infoDadosConsultaTitleMobile}>
                        <div className={styles.infoDadosConsultaTitleTextoMobile}>
                            {title}
                        </div>
                        {icon}
                    </div>
                    <div className={styles.infoDadosConsultaBodyMobile}>
                        {body}
                    </div>
                </div>
            </div>
        );
    }

    const convert_time_to_string = (time) => {
        return (Math.floor(time / 3) + ":" + String(time * 20 - Math.floor(time / 3) * 60).padEnd(2, '0'))
    }

    const getUserData = async (userId) => { // get user data from db (Not working right now!!!)
        api
            .get(`user/${userId}`)
            .then(resp => {
                let arrayObj = []
                resp.data.patient.exames.forEach(obj => {
                    let tempObj = {}
                    for (let key in resp.data.patient.exames[0]) {
                        tempObj[key] = obj[key]
                    }
                    arrayObj.push(tempObj)
                })
                setListaExames(arrayObj)
            })
    }

    const getQuery = async (queries) => {
        if (!!queries)
            setConsulta(queries.find(obj => obj._id == queryId))
    }

    const getQueries = async () => {
        await api.get(`/queries/patient/${userId}`)
            .then((resp) => {
                let arrayObj = []
                resp.data.forEach(obj => {
                    let tempObj = new Object
                    for (let key in resp.data[0]) {
                        if (Object.keys(consulta).includes(key)) {
                            if (key == "doctor") {
                                tempObj[`${key}`] = obj[`${key}`]?.name
                                tempObj[`speciality`] = obj[`${key}`]?.employee.speciality
                            }
                            else
                                tempObj[`${key}`] = obj[`${key}`]
                        }
                    }
                    arrayObj.push(tempObj)
                })
                arrayObj.reverse();
                if (isDesktop) {
                    const quantPaginas = Math.ceil(arrayObj.length / 3)
                    setNumberOfPages(quantPaginas)
                    const inicio = (page - 1) * 3
                    const fim = inicio + 3
                    const arrayLimited = [...arrayObj].slice(inicio, fim)
                    setConsultas(arrayObj);
                    setConsultasPaginacao(arrayLimited);
                } else setConsultas(arrayObj);
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

    useEffect(() => {
        getUserData(userId)
        getQueries(userId).then(() => getQuery(consultas))
    }, [consultas])

    useEffect(() => {
        getQuery(consultas).then(() => setLayout(0))
    }, [queryId, consultas])

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
        switch (e) {
            case "male":
                return "Dr."
            case "female":
                return "Dra."
            default:
                return "Dr(a)."
        }
    }



    const renderizarConsultas = consultas => consultas.map((consulta, index) => {
        if (isDesktop) {
            return (
                <div className={styles.consultas} key={consulta?._id}>
                    <div className={styles.consulta}>
                        <div className={styles.informacoesConsulta}>
                            <div className={styles.consultaDoutor}>{doctor(consulta?.doctor?.sex)}{consulta?.doctor}</div>
                            <div className={styles.barra}>|</div>
                            <div className={styles.consultaData}>{consulta?.date}</div>
                            <div className={styles.barra}>|</div>
                            <div className={styles.consultaStatus} style={{ color: `${consultaColor(consulta?.status)}` }}>{consulta?.status}</div>
                        </div>
                        <button className={styles.consultaVerDetalhes}
                            onClick={() => navigate(`/paciente/detalhesconsulta`, { state: { queryId: consulta?._id } })}
                        >Ver detalhes</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.consultaMobile}>
                    <div className={styles.informacoesConsultaMobile}>
                        <div className={styles.consultaDoutorMobile}>{doctor(consulta.doctor.sex)}{consulta.doctor}</div>
                        <div className={styles.consultaDataStatusMobile}>
                            <div className={styles.consultaDataMobile}>{consulta.date}</div>
                            <div className={styles.barraMobile}></div>
                            <div className={styles.consultaStatusMobile} style={{ color: `${consultaColor(consulta.status)}` }}>{consulta.status}</div>
                        </div>
                        <button
                            className={styles.consultaVerDetalhesMobile}
                            onClick={() => navigate(`/paciente/detalhesconsulta`, { state: { queryId: consulta._id } })}
                        >
                            Ver detalhes
                        </button>
                    </div>
                </div>
            );
        }
    })

    const renderizarAnexos = anexos => anexos.map(anexo => {
        const dataString = anexo.date;
        const data = new Date(dataString);

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = String(data.getFullYear()).slice(-2);

        const dataFormatada = `${dia}/${mes}/${ano}`;

        if (isDesktop) {
            return (
                <div className={styles.anexo}>
                    <AttachFileSharpIcon sx={{ fontSize: 120 }} />
                    <div className={styles.anexoInformacao}>
                        <div>{anexo?.name}</div>
                        <div>Anexo registrado em: </div>
                        <div>{!!anexo.date ? dataFormatada : 'sem data'}</div>
                    </div>
                    <StyledButton
                        text={<DownloadIcon sx={{ fontSize: 15 }} />}
                        variant="contained"
                        onClick={() => {
                            api.post('downloadFile', { "key": anexo.awsKey }, { "responseType": "blob" })
                                .then((response) => {
                                    fileDownload(response.data, anexo.awsKey);
                                })
                                .catch((e) => console.log(e))
                        }}
                    />
                </div>
            )
        } else {
            return (
                <div className={styles.anexoMobile}>
                    <IconButton
                        onClick={() => {
                            api.post('downloadFile', { "key": anexo.awsKey }, { "responseType": "blob" })
                                .then((response) => {
                                    fileDownload(response.data, anexo.awsKey);
                                })
                                .catch((e) => console.log(e))
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" color="red" width="24vw" height="18vw" viewBox="0 0 87 65" fill="none" >
                            <path d="M87 41.0872L66.5514 61.4539C64.1806 63.8192 61.0667 65 57.9456 65C47.1721 65 41.6585 51.9531 49.3399 44.3047L69.4187 24.2992C71.1878 22.5442 73.5005 21.6667 75.8205 21.6667C81.2363 21.6667 84.8757 26.1192 84.8757 30.7631C84.8757 32.9658 84.0529 35.2119 82.215 37.0464L64.3872 54.8058C62.089 57.0953 58.3516 57.0953 56.0534 54.8058C53.7588 52.52 53.7588 48.7969 56.0534 46.5075L70.4482 32.1714L73.4497 35.1614L59.0549 49.4975C58.4096 50.1367 58.4096 51.1803 59.0549 51.8194C59.7001 52.4586 60.7405 52.4586 61.3857 51.8194L79.2171 34.06C81.0913 32.1931 81.0913 29.1597 79.2171 27.2928C77.343 25.4258 74.3016 25.4258 72.4239 27.2928L52.345 47.2983C49.2492 50.3786 49.2492 55.3908 52.345 58.4675C55.4335 61.5478 60.465 61.5478 63.5571 58.4675L84.0021 38.1008L87 41.0872ZM25.375 19.8611C25.375 16.8711 22.939 14.4444 19.9375 14.4444C16.936 14.4444 14.5 16.8711 14.5 19.8611C14.5 22.8547 16.936 25.2778 19.9375 25.2778C22.939 25.2778 25.375 22.8547 25.375 19.8611ZM52.8162 30.7414L47.125 21.6667L37.99 36.1111L29 29.0333L14.5 50.5556H38.7658C39.2878 46.4425 41.0495 42.4594 44.2141 39.3106L52.8162 30.7414ZM39.208 57.7778H7.25V7.22222H72.5V14.8994C73.5839 14.6756 74.6895 14.5528 75.8205 14.5528C77.1654 14.5528 78.474 14.7694 79.75 15.0836V0H0V65H42.8402C41.093 62.8153 39.875 60.3669 39.208 57.7778Z" fill="black" />
                        </svg>
                    </IconButton>
                    <div className={styles.anexoInformacaoMobile}>
                        <div className={styles.anexoTextoMobile}>{anexo?.name}</div>
                        <div className={styles.anexoTextoMobile}>Anexo registrado em: </div>
                        <div className={styles.anexoTextoMobile}>{!!anexo.date ? dataFormatada : 'sem data'}</div>
                    </div>
                </div>
            )
        }
    })

    function renderizarUsuario() {
        if (isDesktop) {
            return (
                <div className={styles.informacoes}>
                    <div className={styles.item}>
                        Data/horário
                        <p>{!!consulta ? consulta.date : ""}, às {convert_time_to_string(!!consulta ? consulta.startTime : 0)}</p>
                    </div>
                    <div className={styles.item}>
                        Especialidade
                        <p>{!!consulta ? consulta.speciality : ""}</p>
                    </div>
                    <div className={styles.item}>
                        Status
                        <p>Consulta {!!consulta ? consulta.status : ""}</p>
                    </div>
                    <div className={styles.item}>
                        Contatos(secretária)
                        <p>E-mail: fabiosecretaria@apsplus.com</p>
                        <p>Telefone: 4444-4444 </p>
                    </div>
                    <div className={styles.item}>
                        Link da consulta
                        <p>{!!consulta ? consulta.link : ""}</p>
                    </div>
                    <div></div>
                    <div className={styles.item}>
                        Modelo de atendimento
                        <p>{translateModelOfConsultation(!!consulta ? consulta.model : "")}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className={styles.infoMobile}>
                        <div className={styles.infoMedicoMobile}>
                            <Person2OutlinedIcon style={{ fontSize: '15vw' }} />
                            <div className={styles.infoMedicoTextoMobile}>
                                <div className={styles.infoMedicoNomeMobile}>
                                    {!!consulta ? consulta.doctor : ""}
                                </div>
                            </div>
                        </div>
                        {userInfoData(
                            "Data/Horário",
                            <CalendarMonthIcon style={{ fontSize: "8vw" }} />,
                            ((!!consulta ? consulta.date : "") + ", às " + (convert_time_to_string(!!consulta ? consulta.startTime : 0)))
                        )}
                        {userInfoData(
                            "Especialidade",
                            <MedicalInformationIcon style={{ fontSize: "8vw" }} />,
                            (!!consulta ? consulta.speciality : "")
                        )}
                        {userInfoData(
                            "Status",
                            <AssignmentIcon style={{ fontSize: "8vw" }} />,
                            ("Consulta " + (!!consulta ? consulta.status : ""))
                        )}
                        {userInfoData(
                            "Contatos(secretária)",
                            <ContactMailIcon style={{ fontSize: "8vw" }} />,
                            ("")
                        )}
                        {userInfoData(
                            "Link da consulta",
                            <LinkIcon style={{ fontSize: "8vw" }} />,
                            (!!consulta ? consulta.link : "")
                        )}
                        {userInfoData(
                            "Tipo de atendimento",
                            <VideoCameraFrontIcon style={{ fontSize: "8vw" }} />,
                            (translateModelOfConsultation(!!consulta ? consulta.model : ""))
                        )}
                    </div>
                </div>
            );
        };
    }



    const handleLayoutChange0 = (event) => {
        setLayout(0);
    }
    const handleLayoutChange1 = (event) => {
        setLayout(1);
    }
    const handleLayoutChange2 = (event) => {
        setLayout(2);
    }

    //Retornar layout com base no state layout

    function renderizarParte(layout) {
        switch (layout) {
            case 0:
                return (
                    <div>{renderizarUsuario()}</div>
                );
            case 1:
                if (isDesktop) {
                    return (
                        <div className={styles.listaAnexos}>
                            {renderizarAnexos(listaExames)}
                        </div>
                    );
                } else {
                    return (
                        <div className={styles.listaAnexosMobile}>
                            {renderizarAnexos(listaExames)}
                        </div>
                    )
                }
            case 2: {
                if (isDesktop) {
                    return (
                        <div>
                            <div className={styles.linhaCuidado}>
                                <p>Linha de Cuidado:</p>
                                <div className={styles.textoCuidado}></div>
                            </div>
                            <div className={styles.textoProgresso}>Progresso</div>
                            <div className={styles.Consultas}>
                                {renderizarConsultas(consultasPaginacao)}
                            </div>
                            <div className={styles.linha}>
                                <StyledPagination page={page} setPage={setPage} numberOfPages={numberOfPages} variant="outlined" />
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <div className={styles.linhaCuidadoMobile}>
                                <p>Linha de Cuidado:</p>
                                <div className={styles.textoCuidadoMobile}></div>
                            </div>
                            <div className={styles.listaConsultasMobile}>
                                {renderizarConsultas(consultas)}
                            </div>
                        </div>
                    );
                }

            }
        }
    }

    if (isDesktop) {
        return (
            <div className={styles.DetalhesConsulta}>
                <div className={styles.menu} style={{ backgroundImage: "url(/pag_inicial_paciente/background-menu.svg)" }}>
                    <div className={styles.linkMenu}>
                        <HomeIcon />
                        <button className={styles.textoMenu} onClick={() => { navigate('/paciente') }}
                        >Home</button>
                    </div>

                    <div className={styles.linkMenu}>
                        <CalendarMonthIcon />
                        <button className={styles.textoMenu} onClick={() => { navigate('/paciente/verconsultas') }}
                        >Consultas</button>
                    </div>

                    <div className={styles.linkMenu}>
                        <Person2OutlinedIcon />
                        <button className={styles.textoMenu} onClick={() => { navigate('/paciente/perfil') }}
                        >Perfil</button>
                    </div>
                </div>

                <div className={styles.tela}>
                    <div className={styles.card}>

                        <div className={styles.topoCard}>
                            <div className={styles.esquerda}>
                                <div className={styles.voltar}>
                                    <ArrowBackIosIcon />
                                    <a href='verconsultas' >Voltar</a>
                                </div>
                                <div className={styles.title}>
                                    Detalhe da Consulta
                                </div>
                            </div>
                            <div className={styles.direita}>
                                <Person2OutlinedIcon sx={{ fontSize: 100 }} />
                                <div>
                                    <div className={styles.medico}>{!!consulta ? consulta.doctor : ""}</div>
                                    <div className={styles.esp}>{!!consulta ? consulta.speciality : ""}</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.layoutBar}>
                            <div className={layout === 0 ? styles.ativo : styles.inativo}>
                                <button onClick={handleLayoutChange0} >Informações</button>
                            </div>
                            <div className={styles.barraAmarela}>|</div>
                            <div className={layout === 1 ? styles.ativo : styles.inativo} >
                                <button onClick={handleLayoutChange1}>Anexos Disponíveis</button>
                            </div>
                            <div className={styles.barraAmarela}>|</div>
                            <div className={layout === 2 ? styles.ativo : styles.inativo}>
                                <button onClick={handleLayoutChange2}>Linha de Cuidado</button>
                            </div>
                        </div>

                        <div>
                            {renderizarParte(layout)}
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
                        onClick={() => navigate(-1, { state: { id: userId } })}
                        startIcon={<ArrowBackIosIcon style={{ fontSize: "5.5vw" }} />}
                        text={"Voltar"}
                        fontSize={"5vw"}
                        fontWeigth={"800"}
                        backgroundColor={"#FFF"}
                        color={"black"}
                    />
                </div>
                <div className={styles.paginaContentBackgroundMobile}>
                    <div className={styles.paginaContentMobile}>
                        <div className={styles.detalhesConsultaMobile}>
                            Detalhes da consulta
                        </div>
                        <div className={styles.guiaConsultasMobile}>
                            <div
                                className={layout === 0 ? styles.ativoMobile : styles.inativo}
                                onClick={handleLayoutChange0}
                            >
                                <div className={styles.textoConsultasMobile}>
                                    Informações
                                </div>
                            </div>
                            <div className={styles.barraConsultasMobile} />
                            <div
                                className={layout === 1 ? styles.ativoMobile : styles.inativo}
                                onClick={handleLayoutChange1}
                            >
                                <div className={styles.textoConsultasMobile}>
                                    Anexos Disponíveis
                                </div>
                            </div>
                            <div className={styles.barraConsultasMobile} />
                            <div
                                className={layout === 2 ? styles.ativoMobile : styles.inativo}
                                onClick={handleLayoutChange2}
                            >
                                <div className={styles.textoConsultasMobile}>
                                    Histórico de consultas
                                </div>
                            </div>
                        </div>
                        <div className={styles.detalhesConsultaContentMobile}>
                            {renderizarParte(layout)}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}