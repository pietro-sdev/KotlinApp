import React from "react";
import styles from "./addEditClinica.module.css";
import InputField from "../../../components/input_field/index";
import { useState, useEffect, useContext } from "react";
import {
    Checkbox,
    Stack,
    FormControl,
    FormGroup,
    FormControlLabel,
    Typography,
    Grid,
    Divider,
} from "@mui/material";
import StyledButton from "../../../components/button/index";
import PopUp from "../../../components/pop_up";
import api from "../../../services/api";
import AutoCompleteButton from "./../../../components/autocomplete_button";
import SelectButton from "./../../../components/select_button/index";
import { useNavigate, useLocation } from "react-router-dom";
import { translateSex } from "../../../utils";
import MaskedInput from "../../../components/masked_input";
import StyledLink from "../../../components/link";
import { selectDocument } from './../../../utils/selectDocument';

export default function AddEditClinica() {
    const [openConfirmationPopUp, setOpenConfirmationPopUp] = useState(false);
    const [openStatusOKPopUp, setOpenStatusOKPopUp] = useState(false);
    const [openStatusErrPopUp, setOpenStatusErrPopUp] = useState(false);
    const [status4PopUp, setStatus4PopUp] = useState("");
    const [aba, setAba] = useState(0);
    const [component, setComponent] = useState(null);
    const [values, setValues] = useState({
        name: "",
        phone: "",
        street: "",
        CEP: "",
        city: "",
        state: "",
        UF: '',
    });

    const navigate = useNavigate();
    const location = useLocation();
    const id = !!location.state ? location.state.id : null;

    const handleClickOpenConfirmationPopUp = () => {
        setOpenConfirmationPopUp(true);
    };

    const handleCloseConfirmationPopUp = () => {
        setOpenConfirmationPopUp(false);
    };

    const handleClickOpenStatusOKPopUp = () => {
        setOpenStatusOKPopUp(true);
    };

    const handleCloseStatusOKPopUp = () => {
        setOpenStatusOKPopUp(false);
    };

    const handleClickOpenStatusErrPopUp = () => {
        setOpenStatusErrPopUp(true);
    };

    const handleCloseStatusErrPopUp = () => {
        setOpenStatusErrPopUp(false);
    };

    //com base nas propriedades name e value do textfield/Input atualiza os valores
    const handleInputChange = (q) => {
        const { name, value } = q.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const addClinica = (e) => {
        api
            .post("/clinic", {
                name: values.name,
                address: {
                    street: values.street,
                    CEP: values.CEP,
                    city: values.city,
                    state: values.UF,
                    phone: values.phone,
                },
            })
            .then((res) => {
                setOpenStatusOKPopUp(true);
            })
            .catch((error) => {
                console.log(error);
                setOpenStatusErrPopUp(true);
            });
    };

    const editClinica = (e) => {
        api
            .patch(`/clinic/${id}`, {
                name: values.name,
                address: {
                    street: values.street,
                    CEP: values.CEP,
                    city: values.city,
                    state: values.UF,
                    phone: values.phone,
                },
            })
            .then((res) => {
                setOpenStatusOKPopUp(true);
            })
            .catch((error) => {
                setOpenStatusErrPopUp(true);
                console.log(error);
            });
    };

    const getOldInfo = (e) => {
        api
            .get(`/clinic/${id}`)
            .then((res) => {
                setValues({
                    name: res.data.name,
                    phone: res.data.address.phone,
                    street: res.data.address.street,
                    CEP: res.data.address.CEP,
                    city: res.data.address.city,
                    UF: res.data.address.state,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (!!id) {
            getOldInfo();
        }
    }, []);

    useEffect(() => {
        setComponent(
            <Stack spacing={4}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <InputField
                            value={values.name}
                            name="name"
                            onChange={handleInputChange}
                            label={"Nome da Clínica"}
                            type={"text"}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <MaskedInput
                            value={values.phone}
                            name={"phone"}
                            onChange={handleInputChange}
                            label={"Telefone da Clínica"}
                            mask={"(99)99999-9999"}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            value={values.street}
                            name="street"
                            onChange={handleInputChange}
                            label={"Endereço"}
                            type={"text"}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <MaskedInput
                            value={values.CEP}
                            name="CEP"
                            onChange={handleInputChange}
                            label={"CEP"}
                            mask={"99999-999"}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            value={values.city}
                            name="city"
                            onChange={handleInputChange}
                            label={"Cidade"}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            select={true}
                            value={values.UF}
                            name="UF"
                            onChange={handleInputChange}
                            names={['', "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]}
                            label={"UF"}
                        />
                    </Grid>
                </Grid>

                <Stack
                    direction={"row"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                >
                    <StyledButton
                        onClick={() => setOpenConfirmationPopUp(true)}
                        width={365}
                        height={50}
                        variant="contained"
                        text={!!id ? "Editar Clínica" : "Adicionar Clínica"}
                    ></StyledButton>
                </Stack>
            </Stack>
        );
    }, [values]);
    return (
        <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
                fontFamily: "Mulish",
                fontStyle: "normal",
                width: "100%",
                height: "100%",
                ml: "5rem",
            }}
        >
            <Stack direction={"column"}>
                <Stack sx={{ fontWeight: 700 }}>
                    <StyledLink
                        abaLink={false}
                        href={"/admin/crudclinicas"}
                        underline={"none"}
                        text={`< Voltar`}
                    />
                </Stack>

                <Stack
                    divider={
                        <Divider
                            sx={{ backgroundColor: "black" }}
                            orientation="vertical"
                            flexItem
                        />
                    }
                    direction={"row"}
                    spacing={2}
                    sx={{ fontWeight: 800, fontSize: "24px", mt: "2rem", mb: "4rem" }}
                >
                    <StyledLink
                        onClick={() => setAba(0)}
                        underline={aba == 0 ? "always" : "none"}
                        text={"Dados da Clínica"}
                    />
                </Stack>

                <Stack
                    sx={{
                        fontFamily: "Mulish",
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "24px",
                        width: "75rem",
                    }}
                >
                    {component}
                </Stack>
            </Stack>
            {/* caso: Não tenho id => Add Clínica */}
            {!id && openConfirmationPopUp && (
                <PopUp
                    name={"Adicionar Clínica"}
                    description={"Você deseja adicionar uma nova clínica?"}
                    action={"adicionar"}
                    onClick={() => {
                        addClinica();
                        setOpenConfirmationPopUp(false)
                    }}
                    open={openConfirmationPopUp}
                    handleClickOpen={handleClickOpenConfirmationPopUp}
                    handleClose={handleCloseConfirmationPopUp}
                />
            )}
            {/* caso: tenho id => Edit Clínica */}
            {!!id && openConfirmationPopUp && (
                <PopUp
                    name={"Editar Clínica"}
                    description={"Você deseja editar a clínica?"}
                    action={"editar"}
                    onClick={() => {
                        editClinica();
                        setOpenConfirmationPopUp(false)
                    }}
                    open={openConfirmationPopUp}
                    handleClickOpen={handleClickOpenConfirmationPopUp}
                    handleClose={handleCloseConfirmationPopUp}
                />
            )}
            {/* caso: Não tenho id => Add Clínica */}
            {!id && openStatusOKPopUp && (
                <PopUp
                    onClick={() => {
                        navigate("/admin/crudclinicas");
                    }}
                    name={"Clínica adicionada com sucesso"}
                    description={`A clínica ${values.name.split(" ")[0]
                        }  foi adicionada com sucesso. Deseja retornar à página de clínicas?`}
                    action={"retornar"}
                    open={openStatusOKPopUp}
                    handleClickOpen={handleClickOpenStatusOKPopUp}
                    handleClose={handleCloseStatusOKPopUp}
                />
            )}
            {/* caso: Tenho id => Edit Clínica */}
            {!!id && openStatusOKPopUp && (
                <PopUp
                    onClick={() => {
                        navigate("/admin/crudclinicas");
                    }}
                    name={"Clínica editada com sucesso"}
                    description={`A clínica ${values.name.split(" ")[0]
                        }  foi editada com sucesso. Deseja retornar à página de clínicas?`}
                    action={"retornar"}
                    open={openStatusOKPopUp}
                    handleClickOpen={handleClickOpenStatusOKPopUp}
                    handleClose={handleCloseStatusOKPopUp}
                />
            )}
            {openStatusErrPopUp && (
                <PopUp
                    onClick={handleCloseStatusErrPopUp}
                    name={"Erro ao adicionar"}
                    description={
                        "Ocorreu um erro ao tentar adicionar o funcionário. Deseja rever?"
                    }
                    action={"rever dados"}
                    open={openStatusErrPopUp}
                    handleClickOpen={handleClickOpenStatusErrPopUp}
                    handleClose={handleCloseStatusErrPopUp}
                />
            )}
        </Stack>
    );
}
