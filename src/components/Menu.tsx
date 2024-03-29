import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon?: string;
  mdIcon?: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Pictogramas',
    url: '/page/pictogramas',
  },
  {
    title: 'Categorías',
    url: '/page/categorias',
  },
  {
    title: 'Pacientes',
    url: '/page/pacientes',
  },
  {
    title: 'Profesionales',
    url: '/page/profesionales',
  },
  {
    title: 'Informes',
    url: '/page/informes',
  },
  {
    title: 'Configuración',
    url: '/page/configuracion',
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
