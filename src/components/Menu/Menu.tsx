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
    url: `/pictogramas`,
  },
  {
    title: "Categorías",
    url: "/categorias",
  },
  {
    title: "Pacientes",
    url: "/pacientes",
  },
  {
    title: "Profesionales",
    url: "/profesionales",
  },
  {
    title: "Informes",
    url: "/informes",
  },
  {
    title: "Configuración",
    url: "/configuracion",
  },
];

const Menu: React.FC<Props> = ({ patientName }) => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay" swipeGesture>
      <IonContent>
        <h1 className="title">{`Bienvenidx ${patientName}!`}</h1>
        <IonList id="menu-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false} color="secondary">
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonMenuToggle autoHide={false} className="centered">
          <IonItem lines="none" detail={false} style={{ textAlign: "center" }}>
            <IonLabel>Créditos</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
};
interface Props {
  patientName: string;
}
export default Menu;
