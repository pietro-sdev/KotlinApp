import SearchIcon from "../../../components/search_icon";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CircleIcon from '@mui/icons-material/Circle';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React, { useState, useEffect } from "react";
import InputField from "../../../components/input_field/index";
import styles from "./consultarConsulta.module.css";
import CheckboxButton from "../../../components/checkbox_button/index";
import api from "../../../services/api";
import { Button, Box } from "@mui/material";
import { useParams, useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import StyledPagination from "../../../components/pagination";
import StyledLink from "./../../../components/link/index";
import { Autocomplete, TextField, Grid, Typography, Popover, Select, MenuItem, InputLabel } from "@mui/material";
import { FormControl, DialogContent, Dialog, DialogTitle, OutlinedInput, DialogActions } from "@mui/material";
import { green, red, yellow } from '@mui/material/colors';


export default function CrudConsultaSecretaria(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const patient_id = location.state ? location.state.patient_id : undefined;
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [paginationComponent, setPaginationComponent] = useState(null);
  const [listaPacientes, setListaPacientes] = useState([]);
  const [numberPacientes, setNumberPacientes] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [listaSpeciality, setListaSpeciality] = useState([]);
  const [listaEmployees, setListaEmployees] = useState([]);
  const [consulta, setConsulta] = useState();
  const [status, setStatus] = useState();
  const [timeQuery, setTimeQuery] = useState("Apenas Consultas Futuras");
  const [professional, setProfessional] = useState();
  const [speciality, setSpeciality] = useState();
  const [identity, setIdentity] = useState("");
  const [searchName, setSearchName] = useState("");
  const local_id = localStorage.getItem("userId");

  // Popover para consulta e paciente
  const [queryId, setQueryId] = useState("")
  const [anchorElChange, setAnchorElChange] = useState(null);
  const [anchorElConsulta, setAnchorElConsulta] = useState(null);
  const [anchorElPaciente, setAnchorElPaciente] = useState(null);
  const openConsulta = Boolean(anchorElConsulta);


  const handlePopoverOpenConsulta = (event) => {
    const id = event.target.id ? event.target.id : event.target.parentElement.id
    setQueryId(id)
    setAnchorElConsulta(event.currentTarget);
  };
  const handlePopoverCloseConsulta = () => {
    setAnchorElConsulta(null);
  };

  const consultaColor = (e) => {
    switch (e) {
      case 'Realizada':
        return green[500]
      case 'Não Realizada':
        return red[500]
      case 'Agendada':
        return yellow[500]
      default:
        return ""
    }
  }

  function convert_string_to_date(string) {
    let split_string = string.split("/");
    return new Date(split_string[2], split_string[1] - 1, split_string[0]);
  }
  function convert_model(tipo) {
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

  function convert_start_time(startTime) {
    startTime = parseInt(startTime)
    let hour = parseInt(startTime / 3)
    let minute = (startTime % 3) * 20

    if (hour < 10) hour = "0" + hour
    if (minute < 10) minute = "0" + minute

    return `${hour}:${minute}`
  }

  function date_compare(date1, date2) {
    date1 = date1.split("/");
    date2 = date2.split("/");
    if (
      date1[2] > date2[2] ||
      (date1[2] == date2[2] && date1[1] > date2[1]) ||
      (date1[2] == date2[2] && date1[1] == date2[1] && date1[0] > date2[0])
    )
      return true;
    return false;
  }

  function bblSort_by_date(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i - 1; j++) {
        if (date_compare(arr[j].date, arr[j + 1].date)) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }

  const updateLista = () => {
    let timeFilter = 1
    switch (timeQuery) {
      case "Apenas Consultas Futuras":
        timeFilter = 1
        break;
      case "Semana passada":
        timeFilter = 7
        break;
      case "Último Mês":
        timeFilter = 30
        break;
      case "Últimos 3 Meses":
        timeFilter = 90
        break;
      default:
        timeFilter = 1
        break;
    }

    let yesterday = new Date((new Date()).valueOf() - timeFilter * 1000 * 60 * 60 * 24)
    if (!!identity) {
      let url = `/queries`;
      if (!!patient_id) url = `/queries/patient/${patient_id}`;
      let ordered_array = [];

      api
        .get(url)
        .then((response) => {
          ordered_array = bblSort_by_date(response.data)
          if (searchName != "") {
            ordered_array = ordered_array.filter(
              (query) =>
                query.info.name.toLowerCase().includes(searchName.toLowerCase())
            );
          }
          if (timeQuery != "Todas as consultas") {
            if (identity == "profissional" && !patient_id) {
              ordered_array = ordered_array.filter(
                (query) =>
                  // query.doctor._id == local_id &&
                  convert_string_to_date(query.date) >= yesterday

              );
            } else {
              ordered_array = ordered_array.filter(
                (query) => convert_string_to_date(query.date) >= yesterday
              );
            }
          }
          let resArray = ordered_array;
          if (!!consulta) {
            resArray = resArray.filter(
              (query) => convert_model(query.model) == consulta
            );
          }
          if (!!professional) {
            resArray = resArray.filter(
              (query) => query.doctor ? query.doctor.name : "" == professional
            );
          }
          if (!!speciality) {
            resArray = resArray.filter(
              (query) => query.doctor ? query.doctor.speciality : "" == speciality
            );
          }
          if (!!status) {
            resArray = resArray.filter(
              (query) => query.status == status
            );
          }

          setListaPacientes(resArray);

          let listaDoutores = []
          resArray.forEach(element => {
            listaDoutores.push(element.doctor ? element.doctor.name : "Deprecated")
          });
          listaDoutores = [...new Set(listaDoutores)]

          setListaEmployees(listaDoutores)
          if(listaPacientes && professional)
            setListaPacientes(resArray.filter( query => query.doctor.name == professional));
        })
        .catch((e) => console.log(e));
    }
  };

  const updateCount = () => {
    if (!!listaPacientes) {
      setNumberPacientes(listaPacientes.length);
      setNumberOfPages(Math.ceil(listaPacientes.length / pageLimit));
    }
  };

  const updateSpecialities = () => {
    let url;
    url = "specialities";
    api
      .get(url)
      .then((response) => {
        setListaSpeciality(response.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    api.get(`/user/${local_id}`).then((resp) => {
      let identity_booleans = resp.data.employee;
      if (identity_booleans.isAdmin) setIdentity("admin");
      else {
        if (identity_booleans.isDoctor) setIdentity("profissional");
        else setIdentity("secretaria");
      }
    });
  }, []);

  useEffect(() => {
    updateLista();
    updateCount();
    updateSpecialities();
  }, [consulta, professional, speciality, status, timeQuery, searchName]);

  useEffect(() => {
    if (!!identity) {
      const delayDebounceFn = setTimeout(() => {
        updateLista();
      }, 100);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [identity, consulta]);

  useEffect(() => {
    if (!!identity) {
      const delayDebounceFn = setTimeout(() => {
        updateCount();
      }, 100);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [page, pageLimit, listaPacientes]);

  useEffect(() => {
    if (!!page && !!numberOfPages) {
      setPaginationComponent(
        <StyledPagination
          page={page}
          setPage={setPage}
          numberOfPages={numberOfPages}
          variant="outlined"
        />
      );
    }
  }, [numberOfPages, page]);

  // useEffect(() => {
  //   if (openConsulta == false) {
  //     updateLista();
  //     updateCount();
  //   }
  // }, [openConsulta]);

  return (
    <div className={styles.pagina}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={styles.voltar}>
          {" "}
          <StyledLink
            abaLink={false}
            href={`/${identity}/crudpacientes`}
            underline={"none"}
            text={`< Voltar`}
            state={{ patient_id: patient_id }}
            />
        </div>
        <div className={styles.buscar}>
          <SearchIcon />
          <InputField
            variant="standard"
            label={"Buscar consulta por paciente"}
            backgroundColor={"#FFFs"}
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            />
        </div>
      </div>
      <div className={styles.linha}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Presencial", "Remoto", "Monitoramento"]}
          sx={{ width: 200 }}
          onInputChange={(event, newInputValue) => {
            setConsulta(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Tipo de consulta" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={listaEmployees}
          sx={{ width: 200 }}
          onInputChange={(event, newInputValue) => {
            setProfessional(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Profissional" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Agendada", "Realizada", "Não Realizada"]}
          sx={{ width: 200 }}
          onInputChange={(event, newInputValue) => {
            setStatus(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Status da Consulta" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Todas as consultas", "Semana passada", "Último Mês", "Últimos 3 Meses", "Apenas Consultas Futuras"]}
          sx={{ width: 200 }}
          onInputChange={(event, newInputValue) => {
            setTimeQuery(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Filtrar Tempo" />
          )}
        />

        <Button
          endIcon={<AddOutlinedIcon />}
          variant="outlined"
          sx={{
            textTransform: "none",
            fontFamily: "Mulish",
            color: "#003895",
            backgroundColor: "#FFF",
            width: "17rem",
            height: "50px",
          }}
          onClick={() => {
            navigate(`/${identity}/addconsulta/`, { state: { patient_id: patient_id } })
          }}
        >
          Marcar nova consulta
        </Button>
      </div>

      <div className={styles.tabelaConsultas}>
        <table>
          <thead>
            <tr className={styles.headerTab}>
              <th>
                Status Consulta
              </th>
              <th>
                Paciente
              </th>
              <th>Profissional</th>
              <th>Data</th>
              {/* <th>Horário</th> */}
              <th>Duração</th>
              <th>Tipo de consulta</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {!listaPacientes ? (
              <CircularProgress />
            ) : (
              listaPacientes
                .map((query) => {
                  if (query.patient === undefined || query.doctor === undefined) {
                    return null;
                  }
                  return (
                    <tr key={query._id}>
                      <td>
                        <Button id={query._id} onClick={handlePopoverOpenConsulta}>
                          <CircleIcon id={query._id} sx={{ color: consultaColor(query.status) }} />
                        </Button>
                        <Dialog disableEscapeKeyDown open={openConsulta} onClose={handlePopoverCloseConsulta}>
                          <DialogTitle>Status da consulta com {
                            !!listaPacientes.find(x => x._id === queryId) ?
                              listaPacientes.find(x => x._id === queryId).info.name.split(' ')[0] :
                              null
                          }</DialogTitle>
                          <DialogContent>
                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                              <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                  value={!!listaPacientes.find(x => x._id === queryId) ?
                                    listaPacientes.find(x => x._id === queryId).status :
                                    ""
                                  }
                                  onChange={(event) => {
                                    listaPacientes.find(x => x._id === queryId).status = event.target.value
                                    api.patch(`/query/${queryId}`, {
                                      status: event.target.value
                                    }).then(response => {
                                      // reloads the list of patients
                                      updateLista();
                                      updateCount();
                                    }).catch(error => {
                                      console.log(error)
                                    })
                                    handlePopoverCloseConsulta()
                                  }}
                                  input={<OutlinedInput label="Status" />}
                                >
                                  <MenuItem value={'Agendada'}>Agendada</MenuItem>
                                  <MenuItem value={'Realizada'}>Realizada</MenuItem>
                                  <MenuItem value={'Não Realizada'}>Não Realizada</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </DialogContent>
                        </Dialog>
                      </td>
                      <td>
                        <Grid container direction="column" alignItems="center">
                          <Grid item sx={1}>
                            {query.info.name}
                          </Grid>
                          <Grid item sx={1}>
                          </Grid>
                        </Grid>
                      </td>
                      <td>
                        {query.doctor ? query.doctor.name : "Deprecated!"}
                      </td>
                      <td>{query.date} às {convert_start_time(query.startTime)}</td>
                      <td>{query.duration}</td>
                      <td>{convert_model(query.model)}</td>
                      <td>
                        <Link
                          to={`/${identity}/editconsulta/`}
                          state={{
                            appointment_id: query._id,
                            patient_id: query.patient._id,
                          }}
                        >
                          <EditOutlinedIcon />
                        </Link>
                      </td>
                    </tr>
                  );
                })
                .slice((page - 1) * pageLimit, page * pageLimit)
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.linha}>
        <StyledPagination
          page={page}
          setPage={setPage}
          numberOfPages={numberOfPages}
          variant="outlined"
        />
        <div className={styles.usuarios}>
          <div className={styles.nUsuarios}>Consultas por página:</div>
          <div>
            <InputField
              select={true}
              value={pageLimit}
              onChange={(e) => {
                setPageLimit(e.target.value)
                setPage(1)
              }}
              backgroundColor="#003895"
              textColor="#FFF"
              names={[5, 10, 15, 20]}
            />
          </div>
        </div>
      </div>
    </div >
  );
}