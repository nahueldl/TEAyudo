import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import React from "react";
import { homeOutline } from "ionicons/icons";

const Page: React.FC<PageProps> = ({ pageTitle, children, showHomeButton }) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>{children}</IonContent>
      {showHomeButton && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/inicio" routerDirection="back">
            <IonIcon icon={homeOutline} />
          </IonFabButton>
        </IonFab>
      )}
    </IonPage>
  );
};

interface PageProps {
  pageTitle: string;
  showHomeButton: boolean;
}

export default Page;
