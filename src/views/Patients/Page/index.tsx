import React from "react";
import Page from "../../../components/Page";
import {
  IonNav,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import ListPatients from "../ListPatients";
import InfoPatient from "../InfoPatient";

const PatientsPage: React.FC = () => {
  const showComponent = () => {};

  return (
    <Page pageTitle="Pacientes" showHomeButton>
      <ListPatients></ListPatients>
    </Page>
  );
};

export default PatientsPage;
