import React, { useState, useContext, useEffect } from 'react';
import styles from './pagInicial.module.css';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import TelemedicineIcon from '@mui/icons-material/MedicalServices';
import PharmacyIcon from '@mui/icons-material/Medication';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PersonIcon from '@mui/icons-material/Person';
import api from '../../../services/api';
import { UserContext } from '../../../context/user';

export default function PagInicial() {
    const userId = localStorage.getItem('userId') ?? '';
    const [consultas, setConsultas] = useState([]);
    const {
        user
    } = useContext(UserContext);


    const navigate = useNavigate();
    useEffect(() => {
        api.get(`/queries/patient/${userId}`)
            .then((response) => {
                setConsultas(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    // Consultas já realizadas
    const consultasFinalizadas = consultas?.filter((consulta) => {
        return consulta.status === "Realizada"
    }).map((consulta) => {
        const data = consulta.date.split("/");
        const dia = parseInt(data[0], 10);
        const mes = parseInt(data[1], 10) - 1;
        const ano = parseInt(data[2], 10);
        return { ...consulta, date: new Date(ano, mes, dia) };
    })
    const numeroConsultasFinalizadas = consultasFinalizadas.length || 0;
    const contaConsulta = consultas?.filter((consulta) => {

        return consulta.status === "Realizada"
    })
    const numeroConsultas = contaConsulta.length || 0;

    // Consultas marcadas
    const consultasMarcadas = consultas?.filter((consulta) => {
        return consulta.status === "Agendada"
    })
    const numeroConsultasMarcadas = consultasMarcadas.length || 0;

    // Consultas hoje
    const hoje = new Date();
    const consultasHoje = consultas?.filter((consulta) => {
        let dataConsulta = new Date(Date.parse(consulta.date.split("/").reverse().join("-")));
        dataConsulta = new Date(dataConsulta.getTime() + dataConsulta.getTimezoneOffset() * 60 * 1000);	// Converte para o fuso horário do Brasil

        // Compare the components of the dateToCheck with today's date
        const isSameDate =
            dataConsulta.getDate() === hoje.getDate() &&
            dataConsulta.getMonth() === hoje.getMonth() &&
            dataConsulta.getFullYear() === hoje.getFullYear();

        // Return true if the dataConsulta is today, otherwise return false
        return isSameDate;
    })

    //Ultima consulta
    const ultimaConsulta = consultasFinalizadas.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    })

    const lastDoctor = {
        sex: ultimaConsulta && ultimaConsulta.length !== 0 ? ultimaConsulta[0]?.doctor?.sex === 'male' ? 'Dr' : 'Dra' : '',
        name: ultimaConsulta && ultimaConsulta.length !== 0 ? ultimaConsulta[0].doctor.nick ? ultimaConsulta[0].doctor.nick : ultimaConsulta[0].doctor.name : ``
    };

    // Verificar se Desktop
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


    const ConsultaStatus = () => {
        if (numeroConsultas === 0) {
            return (
                <p>Você ainda não tem uma consulta marcada</p>
            );
        } else {
            const progresso = Math.floor((numeroConsultas * 100) / (consultas?.length || 1));

            return (
                <p>
                    Está com:{" "}
                    <span className={styles.numeroDir}>{progresso}%</span> <br />
                    consultas completas
                    <progress
                        className={styles.progresscontainer}
                        value={progresso}
                        max={100}
                    ></progress>
                </p>
            );
        }
    };

    const ConsultaStatusMobile = () => {
        if (numeroConsultas === 0) {
            return (
                <p>Você ainda não tem uma consulta marcada</p>
            );
        } else {
            return (
                <p>Está com: <span className={styles.numeroDirMobile}>{Math.floor(contaConsulta?.length * 100 / consultas?.length)}%</span> <br />consultas necessárias completas<progress className={styles.progresscontainerMobile} value={contaConsulta?.length * 100 / consultas?.length} max='100'></progress></p>

            );
        }
    };

    if (isDesktop) {
        return (
            <div className={styles.pagInicial}>
                <div className={styles.menu} style={{ backgroundImage: "url(/pag_inicial_paciente/background-menu.svg)" }}>
                    <div className={styles.linkMenu} onClick={() => { navigate('/paciente') }}>
                        <HomeIcon />
                        <p className={styles.textoMenu}>Home</p>
                    </div>

                    <div className={styles.linkMenu} onClick={() => { navigate('/paciente/verconsultas') }}>
                        <CalendarMonthIcon />
                        <p className={styles.textoMenu}>Consultas</p>
                    </div>

                    <div className={styles.linkMenu} onClick={() => { navigate('/paciente/perfil') }}>
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

                <div className={styles.tela}>
                    <div className={styles.card}>
                        <div className={styles.topoCard}>
                            <div className={styles.saudacao}>
                                <div className={styles.title}>
                                    <p>Olá, {String(user).split(" ")[0]}! 👋</p>
                                </div>
                                <div className={styles.subtitle}>
                                    <p>aqui nós cuidamos da sua saúde como ninguém</p>
                                </div>
                            </div>

                            <div onClick={() => navigate('verconsultas')} className={styles.notificacao}>
                                <img src='/pag_inicial_paciente/consulta.svg' alt="consulta" />
                                <p>{`Você tem ${consultasHoje?.length} consultas hoje!`}</p>
                            </div>
                        </div>

                        <div className={styles.meioCard}>
                            <div className={styles.left}>
                                <div className={styles.consultasMarcadas} onClick={() => navigate('verconsultas')} style={{ backgroundImage: "url(/pag_inicial_paciente/box-consultas.svg)" }}>
                                    <p className={styles.numeroEsq}>{consultasMarcadas?.length}</p>
                                    <p className={styles.textConsultaMarcada}>Consultas Marcadas</p>
                                </div>
                                <div className={styles.novaConsulta} style={{ backgroundImage: "url(/pag_inicial_paciente/box-novas-consultas.svg)" }}>
                                    <p>Marque <u>nova consulta</u> com <br /> a <span className={styles.aps}>Aps</span> <span className={styles.plus}>Plus</span>!</p>
                                </div>

                                <div className={styles.ultimaConsulta} onClick={() => ultimaConsulta && navigate(`detalhesconsulta`, { 'state': { 'queryId': ultimaConsulta[0]._id } })} style={{ backgroundImage: "url(/pag_inicial_paciente/box-ultima-consulta.svg)" }}>
                                    {ultimaConsulta && ultimaConsulta.length !== 0 ? (
                                        <>
                                            <p>Última consulta realizada <br /><br /></p>
                                            <p><u>{`${ultimaConsulta[0].date.getDate().toString().padStart(2, "0")}/${(ultimaConsulta[0].date.getMonth() + 1).toString().padStart(2, "0")}/${ultimaConsulta[0].date.getFullYear().toString()}`}</u></p><br />
                                            <p>{`Consulta sobre: ${ultimaConsulta[0]?.doctor?.employee.speciality}`}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p>Você ainda não realizou uma consulta.</p>
                                        </>
                                    )}

                                </div>

                                <div className={styles.equipeSaude} onClick={() => navigate('/paciente/equipesaude')} style={{ backgroundImage: "url(/pag_inicial_paciente/box-sua-equipe.svg)" }}>
                                    <p>Sua <br />equipe<br /> de saúde</p>
                                </div>

                                <div className={styles.anexoExame} onClick={() => navigate('/paciente/verconsultas')} style={{ backgroundImage: "url(/pag_inicial_paciente/box-add-anexo.svg)" }}>
                                    <p>Adicionar<br /> anexo<br /> de exame</p>
                                </div>

                                <div className={styles.perfil} onClick={() => navigate('/paciente/perfil')} style={{ backgroundImage: "url(/pag_inicial_paciente/box-perfil-completo.svg)" }}>
                                    <p>Seu perfil</p>

                                </div>

                                <div className={styles.consultasCompletas} onClick={() => navigate('/paciente/verconsultas')} style={{ backgroundImage: "url(/pag_inicial_paciente/box-cons-nec-1.svg)" }}>
                                    {ConsultaStatus()}
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.ultimoProf} style={{ backgroundImage: "url(/pag_inicial_paciente/Vector 2.svg)" }}>
                                    <div className={styles.topo}>
                                        {ultimaConsulta && ultimaConsulta.length !== 0 ?
                                            (<PersonIcon sx={{ height: 100, fontSize: 100 }} />) :
                                            ''}
                                        <p> {lastDoctor.sex + lastDoctor.name}</p>
                                    </div>
                                    <p>{ultimaConsulta && ultimaConsulta.length !== 0 ? 'Último profissional que atendeu você' : 'Você ainda não realizou nenhum antendimento.'}</p>
                                </div>

                                <div className={styles.numeroConsultas} onClick={() => navigate('verconsultas')} style={{ backgroundImage: "url(/pag_inicial_paciente/box-cons-realizadas.svg)" }}>
                                    <p className={styles.numeroEsq}>{consultasFinalizadas?.length}</p>
                                    <p>Consultas já realizadas conosco!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className={styles.telaMobile}>
                <div className={styles.cardMobile} style={{ backgroundImage: "url(/pag_inicial_paciente/Rectangle.svg)" }}>
                    <div className={styles.topoCardMobile}>
                        <div className={styles.saudacaoMobile}>
                            <div className={styles.titleMobile}>
                                <p>Olá, {String(user).split(" ")[0]}!👋</p>
                            </div>
                            <div className={styles.subtitleMobile}>
                                <p>Aqui nós cuidamos da sua saúde como ninguém</p>
                            </div>
                        </div>

                        <div onClick={() => navigate('verconsultas')} className={styles.notificacaoMobile}>
                            <img src='/pag_inicial_paciente/consulta.svg' alt="consulta" />
                            <p>{`Você tem ${consultasHoje?.length} consultas hoje!`}</p>
                        </div>
                    </div>
                    <div className={styles.meioCardMobile}>
                        <div className={styles.leftMobile}>
                            <div className={styles.consultasMarcadasMobile} onClick={() => navigate('verconsultas')} style={{ backgroundImage: "url(/pag_inicial_paciente/box-consultas.svg)" }}>
                                <p className={styles.numeroEsqMobile}>{consultasMarcadas?.length}</p>
                                <p>Consultas Marcadas</p>
                            </div>
                            <div className={styles.ultimaConsultaMobile} onClick={() => ultimaConsulta && navigate(`detalhesconsulta`, { 'state': { 'queryId': ultimaConsulta[0]._id } })} style={{ backgroundImage: "url(/pag_inicial_paciente/box-ultima-consulta.svg)" }}>
                                {ultimaConsulta && ultimaConsulta.length !== 0 ? (
                                    <>
                                        <p>Última consulta:<br /></p>
                                        <p><u>{`${ultimaConsulta[0].date.getDate().toString().padStart(2, "0")}/${(ultimaConsulta[0].date.getMonth() + 1).toString().padStart(2, "0")}/${ultimaConsulta[0].date.getFullYear().toString()}`}</u></p><br />
                                        <p>{`Especialidade: ${ultimaConsulta[0]?.doctor?.employee.speciality ?? "-"}`}</p>
                                    </>
                                ) : (
                                    <>
                                        <p>Você ainda não realizou uma consulta.</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={styles.rightMobile}>
                            <div className={styles.ultimoProfMobile} style={{ backgroundImage: "url(/pag_inicial_paciente/vectorline.svg)" }}>
                                <div className={styles.topoMobile}>
                                    {ultimaConsulta && ultimaConsulta.length !== 0 ?
                                        (<PersonIcon sx={{ height: 120, fontSize: 100 }} />) :
                                        ''}
                                    <p> {ultimaConsulta && ultimaConsulta.length !== 0 ? ultimaConsulta[0]?.doctor?.sex === 'male' ? 'Dr' : 'Dra' : ''} {ultimaConsulta && ultimaConsulta.length !== 0 ? (ultimaConsulta[0]?.doctor?.nick ?? ultimaConsulta[0]?.doctor?.name) : ``}</p>
                                </div>
                                <p>{ultimaConsulta && ultimaConsulta.length !== 0 ? 'Último profissional que atendeu você' : 'Você ainda não realizou nenhum antendimento.'}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ultimoCardMobile}>
                        <div className={styles.novaConsultaMobile} style={{ backgroundImage: "url(/pag_inicial_paciente/box-novas-consultas.svg)" }} >
                            <p>Marque <u>nova consulta</u> com a <span className={styles.apsMobile}>Aps</span> <span className={styles.plusMobile}>Plus</span>!</p>
                        </div>
                        <div className={styles.equipeSaudeMobile} onClick={() => navigate('/paciente/equipesaude')} style={{ backgroundImage: "url(/pag_inicial_paciente/box-sua-equipe.svg)" }}>
                            <p>Sua equipe de saúde</p>
                        </div>
                        <div className={styles.anexoExameMobile} onClick={() => navigate('/paciente/verconsultas')} style={{ backgroundImage: "url(/pag_inicial_paciente/box-add-anexo.svg)" }}>
                            <p>Adicionar<br /> anexo<br /> de exame</p>
                        </div>
                        <div className={styles.perfilMobile} onClick={() => navigate('/paciente/perfil')} style={{ backgroundImage: "url(/pag_inicial_paciente/box-perfil-completo.svg)" }}>
                            <p>Seu perfil</p>

                        </div>
                        <div className={styles.consultasCompletasMobile} onClick={() => navigate('/paciente/verconsultas')} style={{ backgroundImage: "url(/pag_inicial_paciente/box-cons-nec-1.svg)" }}>
                            {ConsultaStatusMobile()}
                        </div>
                        <div className={styles.numeroConsultasMobile} onClick={() => navigate('verconsultas')} style={{ backgroundImage: "url(/pag_inicial_paciente/box-cons-realizadas.svg)" }}>
                            <p className={styles.numeroEsqMobile}>{consultasFinalizadas?.length}</p>
                            <p>Consultas já realizadas conosco!</p>
                        </div>
                    </div>
                </div>

            </div>

        );
    }

}
