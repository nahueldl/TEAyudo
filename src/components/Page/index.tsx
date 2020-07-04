import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from "@ionic/react";
import React from "react";

const Page: React.FC<PageProps> = ({pageTitle, children}) => {
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
    </IonPage>
  );
};

interface PageProps {
  pageTitle: string;
}

export default Page;
