import { Search, Style } from '@mui/icons-material';
import SearchIcon from '../../../components/search_icon';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React from 'react';
import StyledPagination from '../../../components/pagination/index';
import InputField from '../../../components/input_field/index';
import styles from './consultarConsulta.module.css';
import CheckboxButton from '../../../components/checkbox_button/index';
import SelectButton from '../../../components/select_button';
import { Button } from '@mui/material';
import { Link } from '@mui/material';
import TableCRUDAdmin from '../../../components/table_crud_admin/index';

export default function CrudConsultaAdmin(props) {

    const [especialidade, setEspecialidade] = React.useState([]);
    const [consulta, setConsulta] = React.useState([]);
    const [profissional, setProfissional] = React.useState([]);
    const [numUsuarios, setNumUsuarios] = React.useState(8);

    const handleNumUsuarios = (event) => {
        const {
          target: { value },
        } = event;
        setNumUsuarios(value);
    };

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

    return (
        <div className={styles.pagina}>
             <div className={styles.buscar}>
                <SearchIcon />
                <InputField variant="standard" label={"Buscar funcionário"} backgroundColor={"#FFFs"} />
            </div>
            <div className={styles.linha}>
                <CheckboxButton label={"Tipo de consulta"} value={especialidade} onChange={handleConsulta}
                    selected={consulta} names={["Tipo 1", "Tipo 2", "Tipo 3"]} />

                <CheckboxButton label={"Especialidade"} value={especialidade} onChange={handleEspecialidade}
                    selected={especialidade} names={["Especialidade 1", "Especialidade 2", "Especialidade 3"]} />

                <CheckboxButton label={"Profissional"} value={especialidade} onChange={handleProfissional}
                    selected={profissional} names={["Médico", "Enfermeiro", "Atendente"]} />

                <Button href="/admin/addconsulta" endIcon={<AddOutlinedIcon />} variant='outlined' sx={{ textTransform: 'none', fontFamily: 'Mulish', color: '#003895', backgroundColor: '#FFF', width: "17rem", height: "50px" }}>Marcar nova consulta</Button>
            </div>

            <TableCRUDAdmin quantity={numUsuarios}/>

            <div className={styles.linha}>
                <div className={styles.linha}>
                    <StyledPagination count={10} variant="outlined" />
                </div>
                <div className={styles.usuarios}>
                    <div>Usuários por página:</div>
                    <div className={styles.nUsuarios}>
                        <SelectButton borderRadius={"10px"} width={"4rem"} names={[1, 2, 3, 4, 5, 6, 7, 8]}
                        onChange={handleNumUsuarios} defaultValue={8}></SelectButton>
                    </div>
                </div> 
            </div> 

        </div>
    );

}