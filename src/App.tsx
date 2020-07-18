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
import { TEAyudoContext } from "./context";

const App: React.FC = () => {
  const { data } = useContext(TEAyudoContext);

  return (
    <IonApp>
      <IonReactRouter>
        {data.authenticated ? (
          data.patientName ? (
            // Si ambas son verdaderas, ir a la app
            <AppPostLogin />
          ) : (
            // Si está logueado pero no eligió paciente, debe elegir
            <Redirect from="*" to="/pacientes" />
          )
        ) : (
          //Si no está logueado, debe loguearse
          <Redirect from="*" to="/login" />
        )}

        <Route path="/login" component={LogInSignUpPage} exact />
        <Route path="/pacientes" component={PatientSelection} exact />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
