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
      <InfoPatient add={false}></InfoPatient>
    </Page>
  );
};

export default PatientsPage;
