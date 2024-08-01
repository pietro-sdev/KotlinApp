import { Html, RecordVoiceOver, Search, Style } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React, { useState, useEffect } from "react";
import StyledPagination from "../../../components/pagination";
import InputField from "../../../components/input_field";
import styles from "./crudClinicas.module.css";
import { Button, Grid } from "@mui/material";
import CheckboxButton from "../../../components/checkbox_button";
import { Link } from "@mui/material";
import TableCRUDAdmin from "../../../components/table_crud_admin/index";
import SelectButton from "../../../components/select_button";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function CrudClinicasAdmin(props) {
    const [listaClinicas, setListaClinicas] = useState([]);
    const [numberClinicas, setNumberClinicas] = useState(0);
    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(5);
    const [buscaClinica, setBuscaClinica] = useState("");
    const [numberOfPages, setNumberOfPages] = useState(1);
    const elementPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

    const updateLista = () => {
        let url;
        if (!!buscaClinica) {
            url = `clinics/${page}/${pageLimit}/?name=${buscaClinica}`;
        } else {
            url = `clinics/${page}/${pageLimit}`;
        }
        api
            .get(url)
            .then((response) => {
                var reqData = response.data.map((req) => {
                    return {
                        _id: req._id,
                        name: req.name,
                        city: !!req.address.city ? req.address.city : "",
                    };
                });

                setListaClinicas(reqData);
            })
            .catch((e) => console.log(e));
    };

    const updateCount = () => {
        let url;
        if (!!buscaClinica) {
            url = "clinics/count/?name=" + buscaClinica;
        } else {
            url = "clinics/count";
        }
        api
            .get(url)
            .then((response) => {
                setNumberClinicas(response.data.count);
                setNumberOfPages(Math.ceil(response.data.count / pageLimit));
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        updateLista();
    }, [page]);

    useEffect(() => {
        updateLista(1);
        updateCount();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            updateLista();
            updateCount();
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [buscaClinica, pageLimit]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setBuscaClinica(value);
    };

    return (
        <div className={styles.pagina}>
            <div className={styles.buscar}>
                <SearchIcon />
                <InputField
                    variant="standard"
                    value={buscaClinica}
                    onChange={handleInputChange}
                    label={"Buscar clínica"}
                    backgroundColor={"#FFFs"}
                />
            </div>
            <div className={styles.linha}>
                <Grid container justifyContent={"space-between"}>
                    <Grid item xs={2}>
                        <Button
                            href="/admin/addeditclinica/"
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
                        >
                            Adicionar Clínica
                        </Button>
                    </Grid>
                </Grid>
            </div>


            <div className={styles.tabela}>
                <table>
                    <thead>
                        <tr className={styles.headerTab}>
                            <th>
                                <AccountCircleOutlinedIcon />
                            </th>
                            <th>Clínica</th>
                            <th>Cidade</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaClinicas.map((clinica) => {
                            return (
                                <tr key={clinica._id}>
                                    <td>
                                        <AccountCircleOutlinedIcon />
                                    </td>
                                    <td>{clinica.name}</td>
                                    <td>{!!clinica.city ? clinica.city : "-"}</td>
                                    <td>
                                        <Link
                                            onClick={() => navigate(`/admin/addeditclinica/`, { state: { id: clinica._id } })}

                                        >
                                            <EditOutlinedIcon />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className={styles.linha}>
                <div className={styles.linha}>
                    <StyledPagination
                        page={page}
                        setPage={setPage}
                        numberOfPages={numberOfPages}
                        variant="outlined"
                    />
                </div>
                <div className={styles.usuarios}>
                    <div>Clínicas por página:</div>
                    <div className={styles.nUsuarios}>
                        <InputField
                            select={true}
                            value={pageLimit}
                            onChange={(e) => {
                                setPageLimit(e.target.value);
                                setPage(1);
                            }}
                            backgroundColor="#003895"
                            textColor="#FFF"
                            width={"63px"}
                            names={[5, 10, 15, 20]}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}
