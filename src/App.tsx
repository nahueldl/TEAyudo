import Menu from './components/Menu';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Inicio from './Inicio/Inicio';
import Pictogramas from './Pictogramas/Pictogramas';
import Categorias from './Categorias/Categorias';
import Profesionales from './Profesionales/Profesionales';
import Informes from './Informes/Informes';
import Pacientes from './Pacientes/Pacientes';
import Configuracion from './Configuracion/Configuracion';

const App: React.FC = () => {
//Agregar el auth+redirect a un home fuera de la app
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            {/* Page lo reemplazaría por una variable :username */}
            <Route path="/page/inicio" component={Inicio} exact />
            <Route path="/page/pictogramas" component={Pictogramas} exact />
            <Route path="/page/categorias" component={Categorias} exact />
            <Route path="/page/pacientes" component={Pacientes} exact />
            <Route path="/page/profesionales" component={Profesionales} exact />
            <Route path="/page/informes" component={Informes} exact />
            <Route path="/page/configuracion" component={Configuracion} exact />
            <Redirect from="/" to="/page/inicio" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
