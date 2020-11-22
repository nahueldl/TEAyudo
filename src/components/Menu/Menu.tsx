import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../context/authentication";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon?: string;
  mdIcon?: string;
  title: string;
}

const appPagesFamiliar: AppPage[] = [
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
    title: "Roles",
    url: "/roles",
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

const appPageMedicx: AppPage[] = [
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
    title: "Roles",
    url: "/roles",
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
  const { role } = useContext(AuthenticationContext).authData;
  return (
    <IonMenu contentId="main" type="overlay" swipeGesture>
      <IonContent>
        <h1 className="title">{`Bienvenidx${patientName==null ? "" : " "+patientName}!`}</h1>
        <IonList id="menu-list">
          {role === 1
            ? appPagesFamiliar.map((appPage, index) => {
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
              })
            : appPageMedicx.map((appPage, index) => {
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
