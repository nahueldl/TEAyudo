import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonIcon,
} from "@ionic/react";

import React from "react";
import { useLocation } from "react-router-dom";
import "./Menu.css";
import { chevronForwardOutline, chevronDownOutline } from "ionicons/icons";

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
  const buildUrl = (pageUrl: string) => {
    return `/${patientName}${pageUrl}`;
  };

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
                  routerLink={buildUrl(appPage.url?.length ? appPage.url : "")}
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
interface Props {
  patientName: string;
}
export default Menu;
