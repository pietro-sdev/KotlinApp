import React, { useState, useContext, useEffect } from 'react';
import styles from './viewConsultas.module.css';

import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import TelemedicineIcon from '@mui/icons-material/MedicalServices';
import PharmacyIcon from '@mui/icons-material/Medication';

import api from '../../../services/api';


export default function VerConsultas() {

    const LinhaDeCuidado = 'Saúde da Criança'

    const listaConsultas = [
        {
            doutor: "Dr. André Oliveira da Cruz (Médico de Família)",
            data: "17/06/2022",
            status: "Realizada",
        },
        {
            doutor: "Dr. André Oliveira da Cruz (Médico de Família)",
            data: "17/06/2022",
            status: "Agendada",
        },
        {
            doutor: "Dr. André Oliveira da Cruz (Médico de Família)",
            data: "17/06/2022",
            status: "Agendada",
        },
        {
            doutor: "Dr. André Oliveira da Cruz (Médico de Família)",
            data: "17/06/2022",
            status: "Não Realizada",
        },
        {
            doutor: "Dr. André Oliveira da Cruz (Médico de Família)",
            data: "17/06/2022",
            status: "Não Realizada",
        },
    ];

    const consultaColor = (e) => {
        switch (e) {
            case 'Realizada':
                return 'green'
            case 'Não Realizada':
                return 'red'
            case 'Agendada':
                return 'yellow'
            default:
                return ""
        }
    }

    const renderizarConsultas = consultas => consultas.map(consulta => {
        return (
            <div className={styles.consulta}>
                <div className={styles.informacoesConsulta}>
                    <div className={styles.consultaDoutor}>{consulta.doutor}</div>
                    <div className={styles.barra}>|</div>
                    <div className={styles.consultaData}>{consulta.data}</div>
                    <div className={styles.barra}>|</div>
                    <div className={styles.consultaStatus} style={{color: `${consultaColor(consulta.status)}` }}>{consulta.status}</div>
                </div>
                <button className={styles.consultaVerDetalhes}>Ver detalhes</button>
            </div>
        )
    })

    return (
        <div className={styles.pagina}>
            <div className={styles.menu} style={{ backgroundImage: "url(/pag_inicial_paciente/background-menu.svg)" }}>
                <div className={styles.linkMenu}>
                    <HomeIcon />
                    <p className={styles.textoMenu}>Home</p>
                </div>


                <div className={styles.linkMenu}>
                    <CalendarMonthIcon />
                    <p className={styles.textoMenu}>Consultas</p>
                </div>

                <div className={styles.linkMenu}>
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
                        <div className={styles.linkVoltar}>
                            <HomeIcon />
                            <p className={styles.textoMenu}>Voltar</p>
                        </div>
                        <div className={styles.linhaCuidado}>
                            <p>Linha de Cuidado:</p>
                            <div className={styles.textoCuidado}>{LinhaDeCuidado}</div>
                        </div>
                        <div className={styles.textoProgresso}>Progresso</div>
                        <div className={styles.listaConsultas}>
                            {renderizarConsultas(listaConsultas)}
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    );

    /*
    Passos:
    background ser o mesmo que os outros, com imagem, símbolo da aps plus, botões home, consultas e perfil, botões de login.

    imagem do azul para o amarelo. Talvez comum às outras, com dimensões diferentes.

    Botão de voltar

    Linha de cuidado

    Lista de consultas
        - médico
        - data
        - realizada, agendada
        - ver detalhes (link)


    */


}