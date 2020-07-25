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

const AppPostLogin: React.FC = () => {

  const {authData} = useContext(AuthenticationContext);
  
  return (
    <IonSplitPane contentId="main">
      <Menu patientName={authData.patientName!} />
      <IonRouterOutlet id="main">
        <Route
          path={`/${authData.patientName}/inicio`}
          component={HomePage}
          exact
        />
        <Route
          path={`/${authData.patientName}/pictogramas`}
          component={PictogramsPage}
          exact
        />
        <Route
          path={`/${authData.patientName}/categorias`}
          component={CategoriesPage}
          exact
        />
        <Route
          path={`/${authData.patientName}/pacientes`}
          component={PatientsPage}
          exact
        />
        <Route
          path={`/${authData.patientName}/profesionales`}
          component={ProfessionalsPage}
          exact
        />
        <Route
          path={`/${authData.patientName}/informes`}
          component={ReportsPage}
          exact
        />
        <Route
          path={`/${authData.patientName}/configuracion`}
          component={ConfigurationPage}
          exact
        />
        <Redirect from="/" to={`/${authData.patientName}/inicio`} />
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

export default AppPostLogin;
