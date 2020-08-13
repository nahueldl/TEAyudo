import React, { useContext } from "react";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import AppPostLogin from "./AppPostLogin";
import LogInSignUpPage from "./views/LogIn&SignUp";
import PatientSelection from "./views/Patients/Selection";
import PatientPage from "./views/Patients/Page";
import PatientAdd from "./views/Patients/InfoPatient";
import { AuthenticationContext } from "./context/authentication";
import RoleSelection from "./views/Roles/Selection";

const App: React.FC = () => {
  const { authData } = useContext(AuthenticationContext);

  return (
    <IonApp>
      <IonReactRouter>
        {authData.token ? (
          authData.patientName ? (
            // Si ambas son verdaderas, ir a la app
            <AppPostLogin />
          ) : (
            //Está autenticado, registró cuenta nueva (faltaría elegir rol, cargar datos extra si necesario, cargar un paciente)
            <Redirect from="*" to="/login" />
          )
        ) : (
          //Si no está autenticado, debe iniciar sesión/registrarse
          <Redirect from="*" to="/login" />
        )} */}
        <AppPostLogin />
        <Route path="/alta" component={PatientAdd} exact />
        <Route path="/login" component={LogInSignUpPage} exact />
        <Route path="/pacientes/seleccion" component={PatientSelection} exact />
        <Route path="/pacientes/principal" component={PatientPage} exact />
        {/* <Route path="/pacientes/alta" component={} exact /> */}
        <Route path="/pacientes/alta" component={PatientSelection} exact />
        <Route path="/roles/seleccion" component={RoleSelection} exact />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
