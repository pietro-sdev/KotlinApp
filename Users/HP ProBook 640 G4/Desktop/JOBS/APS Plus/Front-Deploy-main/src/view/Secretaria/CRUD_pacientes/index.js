import SearchIcon from '../../../components/search_icon';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TodayIcon from '@mui/icons-material/Today';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress, Autocomplete, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import StyledPagination from '../../../components/pagination/index';
import InputField from '../../../components/input_field/index';
import styles from './crudPacientes.module.css';
import { Button } from '@mui/material';
import api from '../../../services/api'
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

export default function CrudPacienteProfissional(props) {

    const [listaPacientes, setListaPacientes] = useState([]);
    const [numberPacientes, setNumberPacientes] = useState(0);
    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(5);
    const [buscaPaciente, setBuscaPaciente] = useState('');
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [listConvenios, setListConvenios] = useState([]);
    const [convenio, setConvenio] = useState('');
    const [patientStatus, setPatientStatus] = useState('Ativos')

    const updateLista = () => {
        let url = `users/pacientes/${page}/${pageLimit}`
        if (patientStatus == 'Todos')
            url = `users/pacientes/todos/${page}/${pageLimit}`
        if (patientStatus == 'Inativos')
            url = `users/pacientes/inativos/${page}/${pageLimit}`
        let filter = '/?'
        if (!!buscaPaciente) {
            filter += '&name=' + buscaPaciente
        }
        if (!!convenio) {
            filter += '&convenio=' + convenio
        }
        url += filter
        api
            .get(url).then((response) => {
                setListaPacientes(response.data)
            })
            .catch((e) => console.log(e))
    }

    const updateCount = () => {
        let url = `users/count/pacientes`
        if (patientStatus == 'Todos')
            url = `users/count/pacientes/todos`
        if (patientStatus == 'Inativos')
            url = `users/count/pacientes/inativos`
        let filter = '/?'
        if (!!buscaPaciente) {
            filter += '&name=' + buscaPaciente
        }
        if (!!convenio) {
            filter += '&convenio=' + convenio
        }
        url += filter
        api.get(url).then((response) => {
            setNumberPacientes(response.data.count)
            setNumberOfPages(Math.ceil(response.data.count / pageLimit))
        }).catch((e) => console.log(e))
    }

    const updateConvenios = () => {
        let url
        url = "convenios"
        api.get(url).then((response) => {
            setListConvenios(response.data)
        }).catch((e) => console.log(e))
    }

    useEffect(() => {
        updateLista()
    }, [page])

    useEffect(() => {
        updateLista(1);
        updateCount()
        updateConvenios()
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            updateLista()
            updateCount()
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [buscaPaciente, pageLimit, convenio, patientStatus])

    return (
        <div className={styles.pagina}>
            <div className={styles.linha}>
                <div className={styles.buscar}>
                    <SearchIcon />
                    <InputField variant="standard"
                        value={buscaPaciente}
                        onChange={(e) =>
                            setBuscaPaciente(e.target.value)
                        }
                        label={"Buscar paciente"}
                        backgroundColor={"#FFFs"}
                    />
                </div>
                <div className={styles.linha}>
                    <Button
                        href='/secretaria/addpaciente'
                        endIcon={<AddOutlinedIcon />}
                        variant='outlined'
                        sx={{
                            textTransform: 'none',
                            fontFamily: 'Mulish',
                            color: '#003895',
                            backgroundColor: '#FFF',
                            width: "17rem",
                            height: "50px"
                        }}
                    >Adicionar paciente</Button>
                </div>
            </div>

            <div className={styles.linha}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={listConvenios}
                    sx={{ width: 300 }}
                    onInputChange={(event, newInputValue) => {
                        setConvenio(newInputValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Convênio" />}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={["Todos", "Ativos", "Inativos"]}
                    sx={{ width: 300 }}
                    value={patientStatus}
                    onInputChange={(event, newInputValue) => {
                        setPatientStatus(newInputValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Status dos pacientes" />}
                />
            </div>

            <div className={styles.tabela}>
                <table>
                    <thead>
                        <tr className={styles.headerTab}>
                            <th><AccountCircleOutlinedIcon /></th>
                            <th>Paciente</th>
                            <th>Convênio</th>
                            <th>Status do paciente</th>
                            <th>Agendar/ alterar consulta</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !listaPacientes ?
                                <CircularProgress /> :
                                listaPacientes.map((paciente) => {
                                    if (paciente.patient === undefined) {
                                        return null
                                    }
                                    return (
                                        <tr key={paciente._id} >
                                            <th><AccountCircleOutlinedIcon /></th>
                                            <th>{!!paciente.nick ? paciente.nick : paciente.name}</th>
                                            <th>{!!(paciente.patient) ?
                                                !!(paciente.patient.insurance) ?
                                                    paciente.patient.insurance :
                                                    "-" :
                                                "-"
                                            }</th>
                                            <th>
                                                {paciente.isActive ? "Ativo" : "Inativo"}
                                            </th>
                                            <th>
                                                <Link
                                                    to={`/secretaria/crudconsulta/`}
                                                    state={{ patientId: paciente._id }}
                                                >
                                                    <TodayIcon />
                                                </Link>
                                            </th>
                                            <th>
                                                <Link
                                                    to={`/secretaria/editpaciente`}
                                                    state={{ id: paciente._id }}
                                                >
                                                    <EditIcon />
                                                </Link>
                                            </th>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>

            <div className={styles.linha}>
                <StyledPagination page={page} setPage={setPage} numberOfPages={numberOfPages} variant="outlined" />
                <div className={styles.usuarios}>
                    <div className={styles.nUsuarios}>Usuários por página:</div>
                    <Box
                        sx={{ color: '#FFF' }}
                    >
                        <InputField
                            select={true}
                            value={pageLimit}
                            onChange={(e) => setPageLimit(e.target.value)}
                            backgroundColor='#003895'
                            textColor='#FFF'

                            names={[5, 10, 15, 20]}
                        />
                    </Box>
                </div>
            </div>

        </div>
    );

}