import styles from './profile.module.css'
import React, { useState, useEffect } from "react"
import api from '../../../services/api'
import ProfileInputField from '../../../components/profile_input_field'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { translateSex, translateRelationshipStatus, getAge } from '../../../utils'
import ProfileMaskedInput from '../../../components/masked_input'
import PopUp from '../../../components/pop_up'
import { Opacity } from '@mui/icons-material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import StyledButton from '../../../components/button/index'

export default function Profile() {// local functions and changeable states go here

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navigate = useNavigate()
    const user = localStorage.getItem("user") ? localStorage.getItem("user") : ""
    const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : "id"
    const [editing, setEditing] = useState(false)
    const [openPopUpNew, setOpenPopUpNew] = useState(false)
    const [values, setValues] = useState({})// objeto relativo aos dados do usuario durante a edição não salva.
    const [storedValues, setStoredValues] = useState({// objeto relativo aos dados salvos do usuario.
        email: "",
        RG: "",
        CPF: "",
        race: "",
        contactNumber: "",
        relationshipStatus: "",
        profession: "",
        address: "",
        insurance: "",
        dateBirth: "",
        sex: "",
        name: "",
        nick: "",
        exames: []
    })
    const handleInputChange = (q) => {
        const { name, value } = q.target;

        setValues({
            ...values,
            [name]: value
        });
    }

    async function getUserData(id) {// GET a given user data using the api`s endpoint to user data.
        let userData = {}
        await api
            .get(`/user/${id}`)
            .then(resp => {
                userData = resp.data
            })
            .catch(error => {
                console.log(error)
            })
        let newValues =
        {
            email: !!userData.email ? userData.email : "",
            RG: !!userData.RG ? userData.RG : "-",
            CPF: !!userData.CPF ? userData.CPF : "-",
            race: !!userData.race ? userData.race : "-",
            contactNumber: !!userData.contactNumber ? userData.contactNumber : "-",
            relationshipStatus: !!userData.patient ? translateRelationshipStatus(userData.patient.relationshipStatus) : "-",
            profession: !!userData.profession ? userData.profession : "-",
            address: !!userData.address ? userData.address.street + "," + userData.address.city + "," + userData.address.UF : "-",
            insurance: !!userData.patient ? userData.patient.insurance : "-",
            dateBirth: !!userData.dateBirth ? userData.dateBirth : "-",
            sex: !!userData.sex ? userData.sex : "-",
            name: !!userData.name ? userData.name : "-",
            nick: !!userData.nick ? userData.nick : "",
            exames: !!userData.patient ? userData.patient.exames : []
        }
        setStoredValues({ ...newValues })
        setValues({ ...newValues })
    }

    async function updateUserData(id) {// PATCH a given user data in our database using the api`s endpoint to user data.
        let splitAddress = String(values.address).split(",");
        await api
            .patch(`/user/${id}`, {
                isPatient: true,  //remember to pass the identifier boolean so the api patches the user specific data.
                email: values.email,
                RG: values.RG,
                CPF: values.CPF,
                race: values.race,
                contactNumber: values.contactNumber,
                profession: values.profession,
                address: {
                    street: splitAddress[0],
                    city: splitAddress[1],
                    UF: splitAddress[2]
                },
                patient: {
                    insurance: values.insurance,
                    relationshipStatus: translateRelationshipStatus(values.relationshipStatus),
                    exames: values.exames
                },
                dateBirth: values.dateBirth,
                sex: values.sex,
                name: values.name,
                nick: values.nick
            })
            .catch(error => console.log(error))
    }

















    const profileBoxView = // profile box while not editing in desktop mode
        <>
            <div className={styles.profileBox}>
                <button
                    onClick={() => {
                        navigate('/paciente')
                    }}
                ><span>{"<"}</span>{"Voltar"}</button>
                <h3>Perfil</h3>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div style={{ borderRadius: "50%", background: "blue", width: "7rem", height: "7rem", marginTop: "2rem", marginRight: "2rem", textAlign: "center", opacity: "0.9" }} ><Person2OutlinedIcon sx={{ fontSize: 100 }} /></div>
                    <div className={styles.formBox}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                            <h3 style={{ marginTop: "1rem" }}>{storedValues.name}</h3>
                            <button style={{ marginRight: "1rem", marginTop: "1rem", fontStyle: "italic", fontSize: "0.9rem", font: "Mullish", fontWeight: "800", textDecoration: "underline" }}
                                onClick={() => {
                                    setEditing(true)
                                }}
                            >Editar</button>
                        </div>
                        <h4>{translateSex(storedValues.sex) + ", " + getAge(storedValues.dateBirth)}</h4>
                        <div style={{ display: "flex", flexDirection: "row", marginTop: "1rem", justifyContent: "space-between", padding:"5px", height: "20vh", overflow: "auto" }}>
                            <div className={styles.column}>
                                <div className={styles.topicBox}>
                                    <h4>Email</h4>
                                    <h3>{storedValues.email}</h3>
                                </div>
                                <div className={styles.topicBox}>
                                    <h4>Raça/cor autodeclarada</h4>
                                    <h3>{storedValues.race}</h3>
                                </div>
                                <div className={styles.topicBox}>
                                    <h4>Profissão</h4>
                                    <h3>{storedValues.profession}</h3>
                                </div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.topicBox}>
                                    <h4>RG</h4>
                                    <h3>{storedValues.RG}</h3>
                                </div>
                                <div className={styles.topicBox}>
                                    <h4>Telefone</h4>
                                    <h3>{storedValues.contactNumber}</h3>
                                </div>
                                <div className={styles.topicBox}>
                                    <h4>Endereço</h4>
                                    <h3>{storedValues.address}</h3>
                                </div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.topicBox}>
                                    <h4>CPF</h4>
                                    <h3>{storedValues.CPF}</h3>
                                </div>
                                <div className={styles.topicBox}>
                                    <h4>Estado civil</h4>
                                    <h3>{storedValues.relationshipStatus}</h3>
                                </div>
                                <div className={styles.topicBox}>
                                    <h4>Convênio</h4>
                                    <h3>{storedValues.insurance}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


















    const profileViewEdit = // profile view while editing in desktop mode
        <>
            <div className={styles.profileBox}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div style={{ borderRadius: "50%", background: "blue", width: "7rem", height: "7rem", marginTop: "2rem", marginRight: "2rem", textAlign: "center", opacity: "0.9" }} ><Person2OutlinedIcon sx={{ fontSize: 100 }} /></div>
                    <div className={styles.formBox}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>{/* save and cancel buttons */}
                            <h3 style={{ marginTop: "1rem" }}>{values.name}</h3>
                            <div>
                                <button style={{ marginRight: "1rem", marginTop: "1rem", fontStyle: "italic", fontSize: "0.9rem", font: "Mullish", fontWeight: "800" }}
                                    onClick={() => {
                                        setValues({ ...storedValues })
                                        setEditing(false)
                                    }}
                                >Cancelar</button>
                                <button style={{ marginRight: "1rem", marginTop: "1rem", fontStyle: "italic", fontSize: "0.9rem", font: "Mullish", fontWeight: "800", textDecoration: "underline" }}
                                    onClick={() => {
                                        setOpenPopUpNew(true)
                                    }}
                                >Salvar</button>
                            </div>
                        </div>
                        <h4>{translateSex(values.sex) + ", " + getAge(values.dateBirth)}</h4>
                        <div style={{ display: "flex", flexDirection: "row", marginTop: "1rem", justifyContent: "space-between", height: "25vh" }}>{/* forms box */}
                            <div className={styles.column}>
                                <ProfileInputField
                                    disabled={true}
                                    name="email"
                                    label={"email"}
                                    value={values.email}
                                    onChange={handleInputChange}
                                />
                                <ProfileInputField
                                    name="race"
                                    label={"Raça autodeclarada"}
                                    value={values.race}
                                    select={true}
                                    names={[
                                        "Branco(a)",
                                        "Pardo(a)",
                                        "Preto(a)",
                                        "Amarelo(a)",
                                        "Indígena",
                                        "Prefiro não informar",
                                    ]}
                                    onChange={handleInputChange}
                                />
                                <ProfileInputField
                                    name="profession"
                                    label={"Profissão"}
                                    value={values.profession}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.column}>
                                <ProfileInputField
                                    disabled={true}
                                    name="RG"
                                    label={"RG"}
                                    value={values.RG}
                                    onChange={handleInputChange}
                                />
                                <ProfileInputField
                                    name="contactNumber"
                                    label={"Número de telefone"}
                                    value={values.contactNumber}
                                    onChange={handleInputChange}
                                />
                                <ProfileInputField
                                    name="address"
                                    label={"Endereço"}
                                    value={values.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.column}>
                                <ProfileInputField
                                    disabled={true}
                                    name="CPF"
                                    label={"CPF"}
                                    value={values.CPF}
                                    onChange={handleInputChange}
                                />
                                {/* <ProfileMaskedInput
                                    name={"patientCPF"}
                                    value={values.CPF}
                                    onChange={handleInputChange}
                                    label={"CPF"}
                                    type={"text"}
                                    mask={"999.999.999-99"}
                                /> */}
                                <ProfileInputField
                                    name="relationshipStatus"
                                    label={"Estado civil"}
                                    value={values.relationshipStatus}
                                    select={true}
                                    names={[
                                        "Casado(a)",
                                        "Solteiro(a)",
                                        "Separado(a)",
                                        "Divorciado(a)",
                                        "Viúvo(a)",
                                    ]}
                                    onChange={handleInputChange}
                                />
                                <ProfileInputField
                                    name="insurance"
                                    label={"Convênio"}
                                    value={values.insurance}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>




    const profileBoxViewMobile = // profile box while not editing in mobile mode
        <>
            <div>
                <h1>Perfil</h1>
            </div>
            <div style={{ alignItems: "center" }}>
                <div style={{ borderRadius: "50%", background: "blue", width: "50vw", height: "50vw", marginTop: "2rem", marginLeft: "18.33vw", paddingTop: "10vw", textAlign: "center", opacity: "0.9" }} ><Person2OutlinedIcon sx={{ fontSize: 125 }} /></div>
            </div>
            <div className={styles.profileInformationMobile}>
                <h3 style={{ marginTop: "1rem" }}>{storedValues.name}</h3>
                <h4>{translateSex(storedValues.sex) + ", " + getAge(storedValues.dateBirth) + " anos"}</h4>
            </div>
            <div className={styles.profileInformationMobile}>
                <h4>Email</h4>
                <h3>{storedValues.email}</h3>
            </div>
            <div className={styles.profileInformationMobile}>
                <h4>RG</h4>
                <h3>{storedValues.RG}</h3>
            </div>
            <div className={styles.profileInformationMobile}>
                <h4>CPF</h4>
                <h3>{storedValues.CPF}</h3>
            </div>
            <div className={styles.profileInformationMobile}>
                <h4>Raça/cor autodeclarada</h4>
                <h3>{storedValues.race}</h3>
            </div>
            <div className={styles.profileInformationMobile}>
                <h4>Telefone</h4>
                <h3>{storedValues.contactNumber}</h3>
            </div>
            <div className={styles.profileInformationMobile}>
                <h4>Estado civil</h4>
                <h3>{storedValues.relationshipStatus}</h3>
            </div>
            <div className={styles.profileInformationMobile}>
                <h4>Profissão</h4>
                <h3>{storedValues.profession}</h3>
            </div>
            <div className={styles.profileInformationMobile}>
                <h4>Endereço</h4>
                <h3>{storedValues.address}</h3>

            </div>
            <div className={styles.profileInformationMobile}>
                <h4>Convênio</h4>
                <h3>{storedValues.insurance}</h3>
            </div>
            <div className={styles.profileInformationMobile}>

            </div>

            <div>
                <button className={styles.editButtonMobile}
                    onClick={() => {
                        setEditing(true)
                    }}
                >Editar</button>
            </div>
        </>


    const profileViewEditMobile = // profile view while editing in mobile mode
        <>
            <div>
                <h1>Perfil</h1>
            </div>
            <div>
                <div style={{
                    borderRadius: "50%", background: "blue", width: "50vw", height: "50vw",
                    // marginTop: "2rem", marginLeft: "18.33vw",
                    margin:"auto",
                    paddingTop: "10vw",
                    textAlign: "center", display: "flex",
                    alignItems: "center", opacity: "0.9"
                }} ><Person2OutlinedIcon sx={{
                    // fontSize: 125
                }} /></div>
            </div>
            <div className={styles.editProfileInformationMobile}>
                <h3 style={{ marginTop: "1rem" }}>{values.name}</h3>
                <h4>{translateSex(values.sex) + ", " + getAge(values.dateBirth)}</h4>
            </div>
            <div className={styles.editProfileInformationMobile}>
                <ProfileInputField
                    disabled={true}
                    name="email"
                    label={"email"}
                    value={values.email}
                    onChange={handleInputChange}
                />
            </div>
            <div>

            </div>
            <div className={styles.editProfileInformationMobile}>
                <ProfileInputField
                    name="profession"
                    label={"Profissão"}
                    value={values.profession}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.editProfileInformationMobile}>
                <ProfileInputField
                    name="race"
                    label={"Raça autodeclarada"}
                    value={values.race}
                    select={true}
                    names={[
                        "Branco(a)",
                        "Pardo(a)",
                        "Preto(a)",
                        "Amarelo(a)",
                        "Indígena",
                        "Prefiro não informar",
                    ]}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.editProfileInformationMobile}>
                <ProfileInputField
                    disabled={true}
                    name="RG"
                    label={"RG"}
                    value={values.RG}
                    onChange={handleInputChange}
                />


            </div>
            <div className={styles.editProfileInformationMobile}>
                <ProfileInputField
                    name="contactNumber"
                    label={"Número de telefone"}
                    value={values.contactNumber}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.editProfileInformationMobile}>
                <ProfileInputField
                    name="address"
                    label={"Endereço"}
                    value={values.address}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.editProfileInformationMobile}>
                <ProfileInputField
                    disabled={true}
                    name="CPF"
                    label={"CPF"}
                    value={values.CPF}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                {/* <ProfileMaskedInput
                                    name={"patientCPF"}
                                    value={values.CPF}
                                    onChange={handleInputChange}
                                    label={"CPF"}
                                    type={"text"}
                                    mask={"999.999.999-99"}
                                /> */}
            </div>
            <div className={styles.editProfileInformationMobile}>
                <ProfileInputField
                    name="relationshipStatus"
                    label={"Estado civil"}
                    value={values.relationshipStatus}
                    select={true}
                    names={[
                        "Casado(a)",
                        "Solteiro(a)",
                        "Separado(a)",
                        "Divorciado(a)",
                        "Viúvo(a)",
                    ]}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.editProfileInformationMobile}>
                <ProfileInputField
                    name="insurance"
                    label={"Convênio"}
                    value={values.insurance}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <button className={styles.saveButtonMobile}
                    onClick={() => {
                        setOpenPopUpNew(true)
                    }}
                >Salvar</button>
            </div>
            <div>
                <button className={styles.cancelButtonMobile}
                    onClick={() => {
                        setValues({ ...storedValues })
                        setEditing(false)
                    }}
                >Cancelar</button>

            </div>

        </>











    const [profileBoxDesktop, setProfileBoxDesktop] = useState(profileBoxView)//defines the user box for Desktop
    const [profileBoxMobile, setProfileBoxMobile] = useState(profileBoxView)//defines the user box for Mobile


    // Effects
    useEffect(() => {//initialize storedValues
        getUserData(userId)
    }, [])

    useEffect(() => { //update the profile box everytime the values get updated or the user starts/stops editing
        if (!editing) {
            setProfileBoxDesktop(profileBoxView);
            setProfileBoxMobile(profileBoxViewMobile);
        }
        else {
            setProfileBoxDesktop(profileViewEdit);
            setProfileBoxMobile(profileViewEditMobile);
        }
    }, [values, storedValues, editing])















    if (isDesktop) {
        return ( //front page code go here
            <div style={{ height: "calc(100vh - 4rem)", width: "100vw", display: "flex", flexDirection: "row" }}>
                <div className={styles.menu} style={{ backgroundImage: "url(/pag_inicial_paciente/background-menu.svg)" }}>
                    <div className={styles.linkMenu}>
                        <HomeIcon />
                        <button className={styles.textoMenu} onClick={() => { navigate('/paciente') }}
                        >Home</button>
                    </div>

                    <div className={styles.linkMenu}>
                        <CalendarMonthIcon />
                        <button className={styles.textoMenu} onClick={() => { navigate('/paciente/verconsultas') }}
                        >Consultas</button>
                    </div>

                    <div className={styles.linkMenu}>
                        <Person2OutlinedIcon />
                        <button className={styles.textoMenu} onClick={() => { navigate('/paciente/perfil') }}
                        >Perfil</button>
                    </div>
                </div>


                <div className={styles.mainBox}>
                    {profileBoxDesktop}
                    <div className={styles.profileBox} style={{ height: "40%" }}>
                        <h3>Plano</h3>
                        <h4>APS virtual</h4>
                        <div className={styles.formBox}>
                            <div style={{ display: "flex", flexDirection: "row", marginTop: "1rem", justifyContent: "space-between" }}>
                                <div className={styles.column}>
                                    <div className={styles.topicBox}>
                                        <h4>Email</h4>
                                        <h3>{storedValues.email}</h3>
                                    </div>
                                    <div className={styles.topicBox}>
                                        <h4>Raça/cor autodeclarada</h4>
                                        <h3>{storedValues.race}</h3>
                                    </div>
                                    <div className={styles.topicBox}>
                                        <h4>Profissão</h4>
                                        <h3>{storedValues.profession}</h3>
                                    </div>
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.topicBox}>
                                        <h4>RG</h4>
                                        <h3>{storedValues.RG}</h3>
                                    </div>
                                    <div className={styles.topicBox}>
                                        <h4>Telefone</h4>
                                        <h3>{storedValues.contactNumber}</h3>
                                    </div>
                                    <div className={styles.topicBox}>
                                        <h4>Endereço</h4>
                                        <h3>{storedValues.address}</h3>
                                    </div>
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.topicBox}>
                                        <h4>CPF</h4>
                                        <h3>{storedValues.CPF}</h3>
                                    </div>
                                    <div className={styles.topicBox}>
                                        <h4>Estado civil</h4>
                                        <h3>{storedValues.relationshipStatus}</h3>
                                    </div>
                                    <div className={styles.topicBox}>
                                        <h4>Convênio</h4>
                                        <h3>{storedValues.insurance}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PopUp
                    name={"Alterar dados do usuário"}
                    description={"Você deseja atualizar seus dados?"}
                    action={"atualizar"}
                    open={openPopUpNew}
                    onClick={() => {
                        updateUserData(userId, values)
                        setStoredValues({ ...values })
                        setEditing(false)
                        setOpenPopUpNew(false)
                    }}
                    handleClose={() => {
                        setOpenPopUpNew(false)
                    }}
                />
            </div>
        )





    } else {

        return (
            <div className={styles.screenMobile}>
                <div className={styles.linkVoltarMobile}>
                    <StyledButton
                        onClick={() => navigate(-1, { state: { id: userId } })}
                        startIcon={<ArrowBackIosIcon style={{ fontSize: "5.5vw" }} />}
                        text={"Voltar"}
                        fontSize={"5vw"}
                        fontWeigth={"800"}
                        backgroundColor={"#FFF"}
                        color={"black"}
                    />
                </div>
                <div className={styles.profileMobile}>
                    {profileBoxMobile}
                </div>
                <div className={styles.planMobile}>
                    <div className={styles.profileInformationMobile}>
                        <h1>Plano</h1>
                        <h3>APS virtual</h3>
                    </div>
                    <div className={styles.profileInformationMobile}>
                        <h4>Email</h4>
                        <h3>{storedValues.email}</h3>
                    </div>
                    <div className={styles.profileInformationMobile}>
                        <h4>RG</h4>
                        <h3>{storedValues.RG}</h3>
                    </div>
                    <div className={styles.profileInformationMobile}>
                        <h4>CPF</h4>
                        <h3>{storedValues.CPF}</h3>
                    </div>
                    <div className={styles.profileInformationMobile}>
                        <h4>Raça/cor autodeclarada</h4>
                        <h3>{storedValues.race}</h3>
                    </div>
                    <div className={styles.profileInformationMobile}>
                        <h4>Telefone</h4>
                        <h3>{storedValues.contactNumber}</h3>
                    </div>
                    <div className={styles.profileInformationMobile}>
                        <h4>Estado civil</h4>
                        <h3>{storedValues.relationshipStatus}</h3>
                    </div>
                    <div className={styles.profileInformationMobile}>
                        <h4>Profissão</h4>
                        <h3>{storedValues.profession}</h3>
                    </div>
                    <div className={styles.profileInformationMobile}>
                        <h4>Endereço</h4>
                        <h3>{storedValues.address}</h3>

                    </div>
                    <div className={styles.profileInformationMobile}>
                        <h4>Convênio</h4>
                        <h3>{storedValues.insurance}</h3>
                    </div>
                </div>
                <PopUp
                    name={"Salvar alterações"}
                    description={"Você deseja alterar os dados?"}
                    action={"atualizar"}
                    open={openPopUpNew}
                    onClick={() => {
                        updateUserData(userId, values)
                        setStoredValues({ ...values })
                        setEditing(false)
                        setOpenPopUpNew(false)
                    }}
                    handleClose={() => {
                        setOpenPopUpNew(false)
                    }}
                />

            </div>




        )

























    }
}