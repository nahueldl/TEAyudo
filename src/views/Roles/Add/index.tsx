import { IonContent } from "@ionic/react";
import React from "react";
import Page from "../../../components/Page";

const AddRolePage: React.FC = () => {
  return (
    <Page pageTitle="Agregar un rol" showHomeButton={true}>
      <IonContent></IonContent>
    </Page>
  );
};

export default AddRolePage;
