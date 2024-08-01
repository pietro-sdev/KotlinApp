import React, { useState, useEffect } from "react";
import styles from "./equipeSaude.module.css";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import Person2Icon from '@mui/icons-material/Person2';
import BoxSaude from "../../../components/boxsaude";
// import data from '../../../utils/maraca';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import StyledButton from '../../../components/button/index'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import apsLogo from './'

import api from '../../../services/api';

export default function EquipeSaude() {
  const [tamanhoEquipe, setTamanhoEquipe] = useState(0);
  const [renderizaBox, setRenderizaBox] = useState([]);
  const [data, setData] = useState([])
  let userId = localStorage.getItem('userId') ?? '';
  const unknowPerson = 'https://th.bing.com/th/id/R.7289e453ee99466bb6570607aa62f0c6?rik=7M2vbE%2bgWliHQQ&pid=ImgRaw&r=0'
  const navigate = useNavigate();
  

  const getData = async () => {
    await api.get(`/queries/patient/${userId}`)
      .then((resp) => {
        let arrayDoctors = []
        resp.data.forEach(obj => {
          let tempObj = new Object
          for (let key in resp.data[0].doctor) {
            if (["nick", "profession", "imageLink", "_id"].includes(key))
              tempObj[`${traduction(key)}`] = obj.doctor[`${key}`]
          }
          arrayDoctors.push(tempObj)
        })
        setData([...arrayDoctors])
        const tamanho = arrayDoctors.length
        setTamanhoEquipe(tamanho)
      }).catch((error) => {
          error(error)
      })
  }

  const traduction = (e) => {
    switch (e) {
      case 'nick':
        return 'nome'
      case 'profession':
        return 'ocupacao'
      case 'imageLink':
        return 'imagem'
      case '_id':
        return 'id'
      default:
        return ""
    }
  }

  useEffect(() => {
    mudaBox(tamanhoEquipe)
  }, [tamanhoEquipe])

  useEffect(() => {
    getData()
  }, [])

  function mudaBox(tamanho) {
    const componente = [];
    for (let i = 0; i < tamanho; i++) {
      componente.push(<div><BoxSaude nome={data[i].nome} ocupacao={data[i].ocupacao} img= {data[i].imagem} /></div>)
    }
    setRenderizaBox(componente)
    return componente;
  }

  const renderizarMedicos = (medicos) => {
    return medicos.map((boxComponent, index) => {
      return (
        <div key={index} className={styles.boxe}>{boxComponent}</div>
      )
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

  if(isDesktop){
    return (
      <div className={styles.equipeSaude}>
        <div
          className={styles.menu}
          style={{
            backgroundImage: "url(/pag_inicial_paciente/background-menu.svg)",
          }}
        >
  
          <Link to="/paciente" className={styles.linkMenu}>
            <HomeIcon />
            <p className={styles.textoMenu}>Home</p>
          </Link>
  
  
  
          <Link to="/paciente/verconsultas" className={styles.linkMenu}>
            <CalendarMonthIcon />
            <p className={styles.textoMenu}>Consultas</p>
          </Link >
  
          <Link to="/paciente/perfil" className={styles.linkMenu}>
            <Person2OutlinedIcon />
            <p className={styles.textoMenu}>Perfil</p>
          </Link>
        </div>
        <div className={styles.tela}>
          <div className={styles.card}>
          <Link to="/paciente" >
            <button className={styles.topoCard}><NavigateBeforeIcon /> Voltar </button>
          </Link>
            <div className={styles.textoEquipe}>Equipe de Saúde <SupervisorAccountIcon className={styles.iconSize} /></div>
  
            <div className={styles.containerSaude}>
              {renderizarMedicos(renderizaBox)}
            </div>
            <div>
              <img src="/Ícone 1.png" alt="Icone canto direito" className={styles.icone} />
            </div>
          </div>
        </div>
  
  
      </div>
    );
  }else{
    return(
      <div className={styles.equipeSaude }  style={{ backgroundImage: "url(/pag_inicial_paciente/Rectangle.svg)" }}>
        <div className={styles.VoltarMobile}>
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
         
        <div className={styles.telaMobile} >
            <div className={styles.textoEquipeMobile}>Equipe de Saúde <SupervisorAccountIcon className={styles.iconSizeMobile} /></div>
            <div className={styles.containerSaudeMobile}>
              {renderizarMedicos(renderizaBox)}
            </div>
            <div className= {styles.IconMobile} > 
             <img src="/icone1.png" ></img>
            </div>
        </div>
  
  
      </div>
      )
  }
}
