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
import { TeayudoContextConsumer } from "./context";

const AppPostLogin: React.FC = () => {
  return (
    <TeayudoContextConsumer>
      {(appContext) =>
        appContext && (
          <IonSplitPane contentId="main">
            <Menu patientName={appContext.patientName} />
            <IonRouterOutlet id="main">
              <Route
                path={`/${appContext.patientName}/inicio`}
                component={HomePage}
                exact
              />
              <Route
                path={`/${appContext.patientName}/pictogramas`}
                component={PictogramsPage}
                exact
              />
              <Route
                path={`/${appContext.patientName}/categorias`}
                component={CategoriesPage}
                exact
              />
              <Route
                path={`/${appContext.patientName}/pacientes`}
                component={PatientsPage}
                exact
              />
              <Route
                path={`/${appContext.patientName}/profesionales`}
                component={ProfessionalsPage}
                exact
              />
              <Route
                path={`/${appContext.patientName}/informes`}
                component={ReportsPage}
                exact
              />
              <Route
                path={`/${appContext.patientName}/configuracion`}
                component={ConfigurationPage}
                exact
              />
              <Redirect from="/login" to={`/${appContext.patientName}/inicio`} />
              <Redirect from="/pacientes" to={`/${appContext.patientName}/inicio`} />
              <Redirect from="/" to={`/${appContext.patientName}/inicio`} />
            </IonRouterOutlet>
          </IonSplitPane>
        )
      }
    </TeayudoContextConsumer>
  );
};


export default AppPostLogin;
