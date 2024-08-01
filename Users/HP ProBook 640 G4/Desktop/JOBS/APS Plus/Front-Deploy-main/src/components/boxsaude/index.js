import React from 'react'
import styles from "./boxsaude.module.css";
import PersonIcon from '@mui/icons-material/Person';
export default function BoxSaude (props) {

    return (
        <div className={styles.box}>
            <div className={styles.img}>
                {!!props.img ? <img src={props.img} alt="Foto" className={styles.foto}/> : <PersonIcon sx={{ fontSize: 50 }}/>}
            </div>
            <div className={styles.infos}>
                <div className={styles.name}>{props.nome}</div> 
                <div className={styles.ocupacao}>{props.ocupacao}</div> 

            </div>
        </div>
    )
}