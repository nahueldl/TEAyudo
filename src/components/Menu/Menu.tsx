import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import React from "react";
import { useLocation } from "react-router-dom";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon?: string;
  mdIcon?: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Pictogramas",
    url: "/page/pictogramas",
  },
  {
    title: "Categorías",
    url: "/page/categorias",
  },
  {
    title: "Pacientes",
    url: "/page/pacientes",
  },
  {
    title: "Profesionales",
    url: "/page/profesionales",
  },
  {
    title: "Informes",
    url: "/page/informes",
  },
  {
    title: "Configuración",
    url: "/page/configuracion",
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay" swipeGesture>
      <IonContent>
        <h1>Bienvenidx Nano!</h1>
        <IonList id="menu-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonLabel className="centered">{appPage.title}</IonLabel>
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
