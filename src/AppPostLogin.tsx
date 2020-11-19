import React, { useContext } from "react";
import { IonSplitPane, IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router";
import Menu from "./components/Menu/Menu";
import HomePage from "./views/Home";
import PictogramsPage from "./views/Pictograms";
import AddPictogramPage from "./views/Pictograms/AddPictogram";
import CategoriesPage from "./views/Categories";
import CategoriesAddPage from "./views/Categories/AddCategorie";
import CategoriesViewEditDeleteCategoryPage from "./views/Categories/ViewEditDeleteCategory";
import PatientsPage from "./views/Patients/Page";
import ProfessionalsPage from "./views/Professionals";
import ReportsPage from "./views/Reports";
import ConfigurationPage from "./views/Configuration";
import { AuthenticationContext } from "./context/authentication";
import ComunicationPage from "./views/Comunication";
import GamesPage from "./views/Game";
import AddPatientPage from "./views/Patients/AddPatient";
import ViewPatientPage from "./views/Patients/ViewPatient";
import EditPatientPage from "./views/Patients/EditPatient";
import RolesPage from "./views/Roles/Page";
import RoleSelection from "./views/Roles/Selection";
import LogInSignUpPage from "./views/LogIn&SignUp";
import AddRolePage from "./views/Roles/Page/AddRolePage";

const AppPostLogin: React.FC = () => {
  const { token, patientName } = useContext(AuthenticationContext).authData;

  return (
    <IonSplitPane contentId="main">
      <Menu patientName={patientName!} />
      <IonRouterOutlet id="main">
        <Route path="/inicio" component={HomePage} exact />
        <Route path="/login" component={LogInSignUpPage} exact />

        <Route path="/pictogramas" component={PictogramsPage} exact />
        <Route path="/pictograma/alta" component={AddPictogramPage} exact />
        <Route path="/categorias" component={CategoriesPage} exact />
        <Route path="/categorias/alta" component={CategoriesAddPage} exact />
        <Route
          path="/categorias/edicion"
          component={CategoriesViewEditDeleteCategoryPage}
          exact
        />

        <Route path="/profesionales" component={ProfessionalsPage} exact />

        <Route path="/informes" component={ReportsPage} exact />

        <Route path="/configuracion" component={ConfigurationPage} exact />

        <Route path="/pacientes" component={PatientsPage} exact />
        <Route path="/pacientes/alta" component={AddPatientPage} exact />
        <Route path="/pacientes/edicion" component={EditPatientPage} exact />
        <Route
          path="/pacientes/informacion"
          component={ViewPatientPage}
          exact
        />

        <Route path="/roles" component={RolesPage} exact />
        <Route path="/roles/alta" component={AddRolePage} exact />
        <Route path="/roles/seleccion" component={RoleSelection} exact />

        <Route path="/comunicacion" component={ComunicationPage} />

        <Route path="/juegos" component={GamesPage} />

 
        {token ? (
          <Redirect from="*" to="/inicio" />
        ) : (
          <Redirect from="*" to="/login" />
        )}
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

export default AppPostLogin;
