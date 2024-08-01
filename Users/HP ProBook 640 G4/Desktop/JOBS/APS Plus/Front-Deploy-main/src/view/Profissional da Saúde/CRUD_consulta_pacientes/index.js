import SearchIcon from '../../../components/search_icon';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React, { useState, useEffect } from 'react';
import InputField from '../../../components/input_field/index';
import styles from './consultarConsulta.module.css';
import CheckboxButton from '../../../components/checkbox_button/index';
import { Button, Link } from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';
import StyledPagination from '../../../components/pagination';

export default function CrudConsultaProfissional(props) {
    const { patient_id } = useParams();
    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(5);
    const [listaPacientes, setListaPacientes] = useState([]);
    const [numberPacientes, setNumberPacientes] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [especialidade, setEspecialidade] = React.useState([]);
    const [consulta, setConsulta] = React.useState([]);
    const [profissional, setProfissional] = React.useState([]);

    function date_compare(date1, date2) {
        date1 = date1.split("/")
        date2 = date2.split("/")
        if (date1[2] > date2[2] || (date1[2] == date2[2] && date1[1] > date2[1]) || (date1[2] == date2[2] && date1[1] == date2[1] && date1[0] > date2[0]))
            return true
        return false
    }

    function bblSort_by_date(arr) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < (arr.length - i - 1); j++) {
                if (date_compare(arr[j].date, arr[j + 1].date)) {
                    var temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
        }
        return arr
    }

    const updateLista = () => {
        let url = `/queries/patient/${patient_id}`
        let ordered_array = []
        if (patient_id == "1")
            url = `/queries`
        api.get(url).then((response) => {
            // console.log("LISTA", response.data)
            ordered_array = bblSort_by_date(response.data)
            // ordered_array = response.data
            setListaPacientes(ordered_array)
        })
            .catch((e) => console.log(e))
    }

    const updateCount = () => {
        let url = `/queries/patient/${patient_id}`
        if (patient_id == "1")
            url = `/queries`
        api.get(url).then((response) => {
            setNumberPacientes(response.data.count)
            setNumberOfPages(Math.ceil(response.data.count / pageLimit))
        }).catch((e) => console.log(e))
    }

    const handleEspecialidade = (event) => {
        const {
            target: { value },
        } = event;
        setEspecialidade(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleConsulta = (event) => {
        const {
            target: { value },
        } = event;
        setConsulta(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleProfissional = (event) => {
        const {
            target: { value },
        } = event;
        setProfissional(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        updateLista()
    }, [page])

    useEffect(() => {
        updateLista(1);
        updateCount()
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            updateLista()
            updateCount()
            // console.log("LISTAs", listaPacientes)
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [pageLimit])

    return (
        <div className={styles.pagina}>
            <div className={styles.voltar}> <Link href="/profissional/crudpacientes" underline='none' sx={{ cursor: 'pointer', color: 'black' }}>&lt; Voltar</Link></div>

            <div className={styles.buscar}>
                <SearchIcon />
                <InputField variant="standard" label={"Buscar funcionário"} backgroundColor={"#FFFs"} />
            </div>
            <div className={styles.linha}>
                <CheckboxButton label={"Tipo de consulta"} value={consulta} onChange={handleConsulta}
                    selected={consulta} names={["Tipo 1", "Tipo 2", "Tipo 3"]} />

                <CheckboxButton label={"Especialidade"} value={especialidade} onChange={handleEspecialidade}
                    selected={especialidade} names={["Especialidade 1", "Especialidade 2", "Especialidade 3"]} />

                <CheckboxButton label={"Profissional"} value={profissional} onChange={handleProfissional}
                    selected={profissional} names={["Médico", "Enfermeiro", "Atendente"]} />

                <Button href={`/profissional/addConsulta/${patient_id}`} endIcon={<AddOutlinedIcon />} variant='outlined' sx={{ textTransform: 'none', fontFamily: 'Mulish', color: '#003895', backgroundColor: '#FFF', width: "17rem", height: "50px" }}>Marcar nova consulta</Button>
            </div>

            <div className={styles.tabela}>
                <table>
                    <thead>
                        <tr className={styles.headerTab}>
                            <th><AccountCircleOutlinedIcon /></th>
                            <th>Funcionário</th>
                            <th>Especialidade</th>
                            <th>Data</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!listaPacientes ? (
                            <CircularProgress />
                        ) : (
                            listaPacientes.map((query) => {
                                if (query.patient === undefined) {
                                    return null;
                                }
                                return (
                                    <tr key={query._id}>
                                        <td>
                                            <AccountCircleOutlinedIcon />
                                        </td>
                                        <td>
                                            {!!query.doctor
                                                ? query.doctor.name
                                                    ? query.doctor.name
                                                    : "error"
                                                : "Erro ao obter nome do medico"}
                                        </td>
                                        <td>
                                            {!!query.doctor.employee.speciality
                                                ? query.doctor.employee.speciality
                                                : "Erro ao obter especialidade"}
                                        </td>
                                        <td>{query.date}</td>
                                        <td>
                                            <Link
                                                href={`/profissional/editconsulta/${query._id}/${patient_id}`}
                                            >
                                                <EditOutlinedIcon />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <div className={styles.linha}>
                <StyledPagination page={page} setPage={setPage} numberOfPages={numberOfPages} variant="outlined" />
                <div className={styles.usuarios}>
                    <div>Usuários por página:</div>
                    <InputField select={true} value={pageLimit} onChange={(e) => setPageLimit(e.target.value)} names={[5, 10, 15, 20]} />
                </div>
            </div>

        </div>
    );

}