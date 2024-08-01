import SearchIcon from '../../../components/search_icon';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import React, { useState, useEffect } from 'react';
import StyledPagination from '../../../components/pagination/index';
import InputField from '../../../components/input_field/index';
import styles from './crudPacientes.module.css';
import { CircularProgress } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from '@mui/material';
import CheckboxButton from '../../../components/checkbox_button';
import TableCRUDProf from '../../../components/table_crud_prof/index'
import SelectButton from '../../../components/select_button'

export default function CrudConsultaMedico(props) {
    const [numUsuarios, setNumUsuarios] = useState(0);
    const [tipoConsulta, setTipoConsulta] = useState([]);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(5);
    const [buscaUsuario, setBuscaUsuario] = useState('');
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [listaConsulta, setListaConsulta] = useState([]);

    const translateTipoConsulta = (tipo) => {
        switch (tipo) {
            case "Remoto":
                return "remote"
            case "Presencial":
                return "presential"
            case "Monitoramento":
                return "monitoring"
            case "presential":
                return "Presencial"
            case "remote":
                return "Remoto"
            case "monitoring":
                return "Monitoramento"
        }
    }

    const updateLista = () => {
        let url
        if (!!buscaUsuario) {
            // IMPLEMENTAR A ROTA CORRETA!!!!!!!!!!!!!!!!!!!!!!
            // url = `users/pacientes/${page}/${pageLimit}/?name=${buscaUsuario}`
        } else {
            // IMPLEMENTAR A ROTA CORRETA!!!!!!!!!!!!!!!!!!!!!!
            // url = `users/pacientes/${page}/${pageLimit}`
        }
        api.get(url).then((response) => {
            setListaUsuarios(response.data)
        })
            .catch((e) => console.log(e))
    }

    const updateCount = () => {
        let url
        if (!!buscaUsuario) {
            // IMPLEMENTAR A ROTA CORRETA!!!!!!!!!!!!!!!!!!!!!!
            // url = "users/count/pacientes/?name=" + buscaUsuario
        } else {
            // IMPLEMENTAR A ROTA CORRETA!!!!!!!!!!!!!!!!!!!!!!
            // url = "users/count/pacientes"
        }
        api.get(url).then((response) => {
            setNumUsuarios(response.data.count)
            setNumberOfPages(Math.ceil(response.data.count / pageLimit))
        }).catch((e) => console.log(e))
    }

    const handleNumUsuarios = (event) => {
        const {
            target: { value },
        } = event;
        setNumUsuarios(value);
    };

    const handleTipoConsulta = (event) => {
        const {
            target: { value },
        } = event;
        setTipoConsulta(
            typeof value === 'string' ?
                value.split(',') :
                translateTipoConsulta(value),
        );
    };

    useEffect(() => {
        // updateLista()
    }, [page])

    useEffect(() => {
        // updateLista(1);
        // updateCount()
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // console.log(buscaUsuario)
            // updateLista()
            // updateCount()
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [buscaUsuario, pageLimit])

    return (
        <div className={styles.pagina}>
            <div className={styles.linha}>
                <div className={styles.buscar}>
                    <SearchIcon />
                    <InputField
                        variant="standard"
                        label={"Buscar funcionário"}
                        backgroundColor={"#FFFs"}
                    />
                </div>
            </div>
            <div className={styles.linha}>
                <CheckboxButton
                    label={"Tipo de Consulta"}
                    value={translateTipoConsulta(tipoConsulta)}
                    onChange={handleTipoConsulta}
                    selected={translateTipoConsulta(tipoConsulta)}
                    names={["Presencial", "Remoto", "Monitoramento"]}
                />

            </div>
            {/* <TableCRUDProf quantity={numUsuarios} /> */}
            <div className={styles.tabela}>
                <table>
                    <thead>
                        <tr className={styles.headerTab}>
                            <th><AccountCircleOutlinedIcon /></th>
                            <th>Tipo de consulta</th>
                            <th>Paciente</th>
                            <th>Data</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !listaConsulta ?
                                <CircularProgress /> :
                                listaConsulta.map((consulta) => {
                                    // num_impressos++;
                                    // if (num_impressos <= quantity)
                                    return (
                                        <tr>
                                            <td><AccountCircleOutlinedIcon /></td>
                                            <td>{!!consulta.model ? consulta.model : "-"}</td>
                                            <td>{!!consulta.patient ? consulta.patient : "-"}</td>
                                            <td>{!!consulta.date ? consulta.date : "-"}</td>
                                            <td><Link href='/profissional/editconsulta' underline='hover' sx={{ color: 'black' }}>Ver detalhes</Link></td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>

            <div className={styles.linha}>
                <div className={styles.linha}>
                    <StyledPagination page={page} setPage={setPage} numberOfPages={numberOfPages} variant="outlined" />
                </div>
                <div className={styles.usuarios}>
                    <div className={styles.nUsuarios}>Usuários por página:</div>
                    <div>
                        <InputField
                            select={true}
                            value={pageLimit}
                            onChange={(e) => setPageLimit(e.target.value)}
                            backgroundColor='#003895'
                            textColor='#FFF'
                            width={'63px'}
                            names={[5, 10, 15, 20]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}