import React, { useContext } from "react";
import { IonSplitPane, IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router";
import Menu from "./components/Menu/Menu";
import HomePage from "./views/Home";
import PictogramsPage from "./views/Pictograms";
import CategoriesPage from "./views/Categories";
import PatientsPage from "./views/Patients/Page";
import ProfessionalsPage from "./views/Professionals";
import ReportsPage from "./views/Reports";
import ConfigurationPage from "./views/Configuration";
import { AuthenticationContext } from "./context/authentication";
import ComunicationPage from "./views/Comunication";
import GamesPage from "./views/Game";

const AppPostLogin: React.FC = () => {

  const {authData} = useContext(AuthenticationContext);
  
  return (
    <IonSplitPane contentId="main">
      <Menu patientName={authData.patientName!} />
      <IonRouterOutlet id="main">
        <Route
          path="/inicio"
          component={HomePage}
          exact
        />
        <Route
          path="/pictogramas"
          component={PictogramsPage}
          exact
        />
        <Route
          path="/categorias"
          component={CategoriesPage}
          exact
        />
        <Route
          path="/pacientes"
          component={PatientsPage}
          exact
        />
        <Route
          path="/profesionales"
          component={ProfessionalsPage}
          exact
        />
        <Route
          path="/informes"
          component={ReportsPage}
          exact
        />
        <Route
          path="/configuracion"
          component={ConfigurationPage}
          exact
        />
        <Route path="/comunicacion" component={ComunicationPage}/>
        <Route path="/juegos" component={GamesPage} />
        <Redirect from="/" to="/inicio" />
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

export default AppPostLogin;
