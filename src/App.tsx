/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import { AuthenticationContext } from "./context/authentication";
import RoleSelection from "./views/Roles/Selection";
import AddRole from "./views/Roles/Add";
import AddPatientPage from "./views/Patients/AddPatient";
import AddRolePage from "./views/Roles/Page/AddRolePage";

const App: React.FC = () => {
  const { token, role, patientId } = useContext(AuthenticationContext).authData;

  return (
    <IonApp>
      <IonReactRouter>
        {token ? (
          //El token es válido
          role ? (
            //Eligió un rol
            patientId ? (
              //Tiene un paciente elegido
              <AppPostLogin />
            ) : (
              //No tiene un paciente elegido
              <Redirect from="*" to="/pacientes/seleccion" />
            )
          ) : (
            //No tiene un rol elegido
            <Redirect from="*" to="/roles/seleccion" />
          )
        ) : (
          //No hay un token
          <Redirect from="*" to="/login" />
        )}

        <Route path="/login" component={LogInSignUpPage} exact />
        <Route path="/pacientes/seleccion" component={PatientSelection} exact />
        <Route path="/roles/seleccion" component={RoleSelection} exact />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
