import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AuthenticationProvider } from "./context/authentication";
import { RegistrationProvider } from "./context/registration";
import { PlatformProvider } from "./context/platform";
import { PatientProvider } from "./context/patient";
import { CategoriaProvider } from "./context/category";
import { defineCustomElements } from '@ionic/pwa-elements/loader';

ReactDOM.render(
  <PlatformProvider>
    <AuthenticationProvider>
      <RegistrationProvider>
        <PatientProvider>
          <CategoriaProvider>
          <App />
          </CategoriaProvider>
        </PatientProvider>
      </RegistrationProvider>
    </AuthenticationProvider>
  </PlatformProvider>,
  document.getElementById("root")
);
defineCustomElements(window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
