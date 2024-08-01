import SearchIcon from '../../../components/search_icon';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Autocomplete, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import StyledPagination from '../../../components/pagination/index';
import InputField from '../../../components/input_field/index';
import styles from './crudFuncionarios.module.css';
import { Button } from '@mui/material';
import api from '../../../services/api'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import SelectButton from '../../../components/select_button';


export default function CrudFuncionarioAdmin(props) {

  const [listaEmployees, setListaEmployees] = useState([]);
  const [numberEmployees, setNumberEmployees] = useState(0);
  const [listaSpeciality, setListaSpeciality] = useState([]);
  const [speciality, setSpeciality] = useState('');
  const [listaProfession, setListaProfession] = useState([]);
  const [profession, setProfession] = useState('');
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [buscaEmployee, setBuscaEmployee] = useState('');
  const [numberOfPages, setNumberOfPages] = useState(1);

  const navigate = useNavigate();

  const updateLista = () => {
    let url = `users/employees/${page}/${pageLimit}`
    let filter = '/?'
    if (!!buscaEmployee) {
      filter += '&name=' + buscaEmployee
    }
    if (!!profession) {
      filter += '&profession=' + profession
    }
    if (!!speciality) {
      filter += '&speciality=' + speciality
    }
    url += filter
    api.get(url).then((response) => {
      setListaEmployees(response.data)
    })
      .catch((e) => console.log(e))
  }

  const updateCount = () => {
    let url = `users/count/employees`
    let filter = '/?'
    if (!!buscaEmployee) {
      filter += '&name=' + buscaEmployee
    }
    if (!!profession) {
      filter += '&profession=' + profession
    }
    if (!!speciality) {
      filter += '&speciality=' + speciality
    }
    url += filter
    api.get(url).then((response) => {
      setNumberEmployees(response.data.count)
      setNumberOfPages(Math.ceil(response.data.count / pageLimit))
    }).catch((e) => console.log(e))
  }

  const updateSpecialities = () => {
    let url
    url = "specialities"
    api.get(url).then((response) => {
      setListaSpeciality(response.data)
    }).catch((e) => console.log(e))
  }

  const updateProfessions = () => {
    let url
    url = "professions"
    api.get(url).then((response) => {
      setListaProfession(response.data)
    }).catch((e) => console.log(e))
  }

  useEffect(() => {
    updateLista()
  }, [page])

  useEffect(() => {
    updateLista()
    updateCount()
  }, [buscaEmployee, profession, speciality])

  useEffect(() => {
    updateLista();
    updateCount()
    updateSpecialities()
    updateProfessions()
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateLista()
      updateCount()
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [buscaEmployee, speciality, profession, pageLimit])

  return (
    <div className={styles.pagina}>
      <div className={styles.buscar}>
        <SearchIcon />
        <InputField variant="standard" label={"Buscar funcionário"} value={buscaEmployee}
          onChange={(e) => setBuscaEmployee(e.target.value)} backgroundColor={"#FFFs"} />
      </div>
      <div className={styles.linha}>
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={listaSpeciality}
          sx={{ width: 300 }}
          onInputChange={(event, newInputValue) => {
            setSpeciality(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label="Especialidade" />}
        /> */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={listaProfession}
          sx={{ width: 300 }}
          onInputChange={(event, newInputValue) => {
            setProfession(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label="Profissão" />}
        />
        <Button
          href="/admin/crudclinicas"
          variant="outlined"
          sx={{
            textTransform: "none",
            fontFamily: "Mulish",
            color: "#003895",
            backgroundColor: "#FFF",
            width: "15rem",
            height: "50px",
          }}
        >
          Clínicas Cadastradas
        </Button>
        <Button href='/admin/addfunc' endIcon={<AddOutlinedIcon />} variant='outlined' sx={{ textTransform: 'none', fontFamily: 'Mulish', color: '#003895', backgroundColor: '#FFF', width: "17rem", height: "50px" }}>Adicionar membro</Button>
      </div>

      <div className={styles.tabela}>
        <table>
          <thead>
            <tr className={styles.headerTab}>
              <th><AccountCircleOutlinedIcon /></th>
              <th>Funcionário</th>
              <th>Atuação</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {listaEmployees.map((employee) => {
              return (
                <tr key={employee.email}>
                  <td><AccountCircleOutlinedIcon /></td>
                  <td>{!!employee.nick ? employee.nick : employee.name}</td>
                  <td>{employee.profession}</td>
                  <td>
                    <Link
                      to={`/admin/editfunc`}
                      state={{ id: employee._id }}
                    >

                      <ModeEditOutlineIcon />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.linha}>
        <StyledPagination page={page} setPage={setPage} numberOfPages={numberOfPages} variant="outlined" />
        <div className={styles.usuarios}>
          <div>Funcionários por página:</div>
          <InputField textColor='#fff' backgroundColor='#003895' width={'auto'} margin={'3px'} select={true} value={pageLimit} onChange={(e) => setPageLimit(e.target.value)} names={[5, 10, 15, 20]} />
        </div>
      </div>

    </div>
  )
}