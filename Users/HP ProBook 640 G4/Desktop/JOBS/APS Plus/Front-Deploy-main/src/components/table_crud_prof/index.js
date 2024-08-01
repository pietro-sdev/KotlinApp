import React from 'react'
import styles from './table.module.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import {Link} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';

export default function TableCRUDProf({ quantity = 8, consultaArr = [] }) {

    let num_impressos = 0;

    return (
        <div className={styles.tabela}>
            <table>
                <tr className={styles.headerTab}>
                    <th><AccountCircleOutlinedIcon/></th>
                    <th>Tipo de consulta</th>
                    <th>Paciente</th>
                    <th>Data</th>
                    <th>Detalhes</th>
                </tr>
                {consultaArr.map((consulta) => {
                    num_impressos++;
                    if(num_impressos <= quantity) 
                        return (
                            <tr>
                                <td><AccountCircleOutlinedIcon/></td>
                                <td>{consulta.tipo}</td>
                                <td>{consulta.paciente}</td>
                                <td>{consulta.data}</td>
                                <td><Link href='/profissional/editconsulta' underline='hover' sx={{color:'black'}}>Ver detalhes</Link></td>
                            </tr>
                        )
                    })}
            </table>
        </div>
    )
}