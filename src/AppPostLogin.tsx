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
<<<<<<< Updated upstream
          path={`/${appContext.data.patientName}/inicio`}
=======
          path="/:patient/inicio"
>>>>>>> Stashed changes
          component={HomePage}
          exact
        />
        <Route
<<<<<<< Updated upstream
          path={`/${appContext.data.patientName}/pictogramas`}
=======
          path="/:patient/pictogramas"
>>>>>>> Stashed changes
          component={PictogramsPage}
          exact
        />
        <Route
<<<<<<< Updated upstream
          path={`/${appContext.data.patientName}/categorias`}
=======
          path="/:patient/categorias"
>>>>>>> Stashed changes
          component={CategoriesPage}
          exact
        />
        <Route
<<<<<<< Updated upstream
          path={`/${appContext.data.patientName}/pacientes`}
=======
          path="/:patient/pacientes"
>>>>>>> Stashed changes
          component={PatientsPage}
          exact
        />
        <Route
<<<<<<< Updated upstream
          path={`/${appContext.data.patientName}/profesionales`}
=======
          path="/:patient/profesionales"
>>>>>>> Stashed changes
          component={ProfessionalsPage}
          exact
        />
        <Route
<<<<<<< Updated upstream
          path={`/${appContext.data.patientName}/informes`}
=======
          path="/:patient/informes"
>>>>>>> Stashed changes
          component={ReportsPage}
          exact
        />
        <Route
<<<<<<< Updated upstream
          path={`/${appContext.data.patientName}/configuracion`}
          component={ConfigurationPage}
          exact
        />
        <Redirect from="/login" to={`/${appContext.data.patientName}/inicio`} />
        <Redirect from="/pacientes" to={`/${appContext.data.patientName}/inicio`} />
        <Redirect from="/" to={`/${appContext.data.patientName}/inicio`} />
=======
          path="/:patient/configuracion"
          component={ConfigurationPage}
          exact
        />
        <Redirect from="/login" to={`/${appContext.patientName}/inicio`} />
        <Redirect from="/pacientes" to={`/${appContext.patientName}/inicio`} />
        <Redirect from="/" to={`/${appContext.patientName}/inicio`} />
        <Redirect from="*" to={`/${appContext.patientName}/inicio`} />
>>>>>>> Stashed changes
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

export default AppPostLogin;
