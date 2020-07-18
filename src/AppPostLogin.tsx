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
import { TEAyudoContext } from "./context";

const AppPostLogin: React.FC = () => {

  const appContext = useContext(TEAyudoContext);
  
  return (
    <IonSplitPane contentId="main">
      <Menu patientName={appContext.data.patientName!} />
      <IonRouterOutlet id="main">
        <Route
          path={`/${appContext.data.patientName}/inicio`}
          component={HomePage}
          exact
        />
        <Route
          path={`/${appContext.data.patientName}/pictogramas`}
          component={PictogramsPage}
          exact
        />
        <Route
          path={`/${appContext.data.patientName}/categorias`}
          component={CategoriesPage}
          exact
        />
        <Route
          path={`/${appContext.data.patientName}/pacientes`}
          component={PatientsPage}
          exact
        />
        <Route
          path={`/${appContext.data.patientName}/profesionales`}
          component={ProfessionalsPage}
          exact
        />
        <Route
          path={`/${appContext.data.patientName}/informes`}
          component={ReportsPage}
          exact
        />
        <Route
          path={`/${appContext.data.patientName}/configuracion`}
          component={ConfigurationPage}
          exact
        />
        <Redirect from="/login" to={`/${appContext.data.patientName}/inicio`} />
        <Redirect from="/pacientes" to={`/${appContext.data.patientName}/inicio`} />
        <Redirect from="/" to={`/${appContext.data.patientName}/inicio`} />
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

export default AppPostLogin;
