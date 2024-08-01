import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./view/login/index";
import PasswordRecover from "./view/passwordRecover";
import PasswordRedefine from "./view/passwordRedefine";
import SetInitialPassword from "./view/setInitialPassword";
import NavBarAdmin from "./components/navbar_admin";
import NavBarSecretaria from "./components/navbar_secretaria";
import NavBarProfissional from "./components/navbar_profissional";
import PagInicialAdmin from "./view/ADM/pagina_inicial_admin";
import CrudFuncionarioAdmin from "./view/ADM/CRUD_funcionarios";
import CrudClinicasAdmin from "./view/ADM/CRUD_clinicas";
import AddEditClinica from "./view/ADM/add_edit_clinica";
import AddFuncionarioAdmin from "./view/ADM/add_funcionario/index";
import PaginaInicialSecretaria from "./view/Secretaria/pagina_inicial_secretaria";
import CrudConsultaSecretaria from "./view/Secretaria/CRUD_consulta";
import AddEditConsultaSecretaria from "./view/Secretaria/edit_consulta";
import CrudPacienteSecretaria from "./view/Secretaria/CRUD_pacientes";
import AddPacienteSecretaria from "./view/Secretaria/add_pacientes";
import EditPacienteSecretaria from "./view/Secretaria/edit_pacientes";
import PagInicialProfissional from "./view/Profissional da Saúde/pagina_inicial_profissional";
import AddPacienteProfissional from "./view/Profissional da Saúde/add_pacientes";
import EditPacienteProfissional from "./view/Profissional da Saúde/edit_pacientes";
import CrudPacienteProfissional from "./view/Profissional da Saúde/CRUD_pacientes";
import AddProntuario from "./view/Profissional da Saúde/prontuario";
import LandingNavBar from "./components/landingNavbar";
import TestUpload from "./view/test";
import PagInicial from "./view/Paciente/pagina_inicial";
import CrudPacienteAdmin from "./view/ADM/CRUD_pacientes";
import NavBarPaciente from "./components/navbar_paciente";
import Profile from "./view/Paciente/profile";
import VerConsultas from "./view/Paciente/pagina_ver_consultas";
import DetalhesConsulta from "./view/Paciente/detalhes_consulta";
import Equipe from "./view/Paciente/equipe_saude";


function RoutesComponent() {
  return (
    <Routes>
      <Route path="" element={<LandingNavBar />}>
        <Route exact path="login" element={<Login />} />
        <Route exact path="passwordrecover" element={<PasswordRecover />} />
        <Route exact path="passwordredefine" element={<PasswordRedefine />} />
        <Route exact path="setinitialpassword" element={<SetInitialPassword />} />
      </Route>

      <Route path="admin" element={<NavBarAdmin />}>
        <Route exact path="" element={<PagInicialAdmin />} />

        <Route exact path="crudfunc" element={<CrudFuncionarioAdmin />} />
        <Route exact path="addfunc" element={<AddFuncionarioAdmin />} />
        <Route exact path="editfunc" element={<AddFuncionarioAdmin />} />

        <Route exact path="crudconsulta" element={<CrudConsultaSecretaria />} />
        <Route exact path="addconsulta" element={<AddEditConsultaSecretaria />} />
        <Route exact path="editconsulta" element={<AddEditConsultaSecretaria />} />

        <Route exact path="crudclinicas" element={<CrudClinicasAdmin />} />
        <Route exact path="addeditclinica" element={<AddEditClinica />} />

        <Route exact path="crudpacientes" element={<CrudPacienteAdmin />} />
        <Route exact path="editpaciente" element={<EditPacienteSecretaria />} />

        <Route exact path="addpaciente" element={<AddPacienteSecretaria />} />
      </Route>

      <Route path="secretaria" element={<NavBarSecretaria />}>
        <Route exact path="" element={<PaginaInicialSecretaria />} />

        <Route exact path="crudconsulta" element={<CrudConsultaSecretaria />} />
        <Route exact path="addconsulta" element={<AddEditConsultaSecretaria />} />
        <Route exact path="editconsulta" element={<AddEditConsultaSecretaria />} />

        <Route exact path="crudpacientes" element={<CrudPacienteSecretaria />} />
        <Route exact path="addpaciente" element={<AddPacienteSecretaria />} />
        <Route exact path="editpaciente" element={<EditPacienteSecretaria />} />
      </Route>

      <Route path="profissional" element={<NavBarProfissional />}>
        <Route exact path="" element={<PagInicialProfissional />} />

        <Route exact path="crudpacientes" element={<CrudPacienteProfissional />} />
        <Route exact path="addpaciente" element={<AddPacienteProfissional />} />
        <Route exact path="editpaciente" element={<EditPacienteProfissional />} />
        <Route exact path="addprontuario" element={<AddProntuario />} />

        <Route exact path="crudconsulta" element={<CrudConsultaSecretaria />} />
        <Route exact path="crudconsultamedico" element={<CrudConsultaSecretaria />} />
        <Route exact path="addconsulta" element={<AddEditConsultaSecretaria />} />
        <Route exact path="editconsulta" element={<AddEditConsultaSecretaria />} />

      </Route>

      <Route path="teste" element={<TestUpload />}></Route>
      <Route path="paciente" element={<NavBarPaciente />}>
        <Route exact path="" element={<PagInicial />} />
        <Route exact path="perfil" element={<Profile />} />
        <Route exact path="detalhesconsulta" element={<DetalhesConsulta />} />
        <Route exact path="verconsultas" element={<VerConsultas />} />
        <Route exact path="equipesaude" element={<Equipe />} />
      </Route>
    </Routes>
  );
}

export default RoutesComponent;
