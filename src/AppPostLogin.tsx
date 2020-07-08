import React from "react";
import { IonSplitPane, IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router";
import Menu from "./components/Menu/Menu";
import HomePage from "./views/Home";
import PictogramsPage from "./views/Pictograms";
import CategoriesPage from "./views/Categories";
import PatientsPage from "./views/Patients";
import ProfessionalsPage from "./views/Professionals";
import ReportsPage from "./views/Reports";
import ConfigurationPage from "./views/Configuration";

const AppPostLogin: React.FC<Props> = ({ patientName }) => {
  return (
    <IonSplitPane contentId="main">
      <Menu patientName={patientName} />
      <IonRouterOutlet id="main">
        <Route path={`/${patientName}/inicio`} component={HomePage} exact />
        <Route
          path={`/${patientName}/pictogramas`}
          component={PictogramsPage}
          exact
        />
        <Route
          path={`/${patientName}/categorias`}
          component={CategoriesPage}
          exact
        />
        <Route
          path={`/${patientName}/pacientes`}
          component={PatientsPage}
          exact
        />
        <Route
          path={`/${patientName}/profesionales`}
          component={ProfessionalsPage}
          exact
        />
        <Route
          path={`/${patientName}/informes`}
          component={ReportsPage}
          exact
        />
        <Route
          path={`/${patientName}/configuracion`}
          component={ConfigurationPage}
          exact
        />
        <Redirect from="/login" to={`/${patientName}/inicio`} />
        <Redirect from="/pacientes" to={`/${patientName}/inicio`} />
        <Redirect from="/" to={`/${patientName}/inicio`} />
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

interface Props {
  username?: string;
  patientName: string;
  accountType?: "familiar" | "profesional";
}

export default AppPostLogin;
