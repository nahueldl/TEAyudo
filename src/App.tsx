import Menu from "./components/Menu/Menu";
import React from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
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
import HomePage from "./views/Home";
import PictogramsPage from "./views/Pictograms";
import CategoriesPage from "./views/Categories";
import ProfessionalsPage from "./views/Professionals";
import ReportsPage from "./views/Reports";
import PatientsPage from "./views/Patients";
import ConfigurationPage from "./views/Configuration";

const App: React.FC = () => {
  //Agregar el auth+redirect a un home fuera de la app
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            {/* Page lo reemplazaría por una variable :username */}
            <Route path="/page/inicio" component={HomePage} exact />
            <Route path="/page/pictogramas" component={PictogramsPage} exact />
            <Route path="/page/categorias" component={CategoriesPage} exact />
            <Route path="/page/pacientes" component={PatientsPage} exact />
            <Route path="/page/profesionales" component={ProfessionalsPage} exact />
            <Route path="/page/informes" component={ReportsPage} exact />
            <Route path="/page/configuracion" component={ConfigurationPage} exact />
            <Redirect from="/" to="/page/inicio" exact />
            {/*Agregar redirect obligatorio para elección de paciente inicial*/}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
