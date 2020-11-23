import {
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonCardHeader,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import Page from "../../components/Page";
import arasaac from "./ARASAAC.png";
import azure from "./Azure.png";
import sisa from "./SISA.png";
import utn from "./UTN.png";
import germinar from "./Germinar.jpeg";

const CreditosPage: React.FC = () => {
  return (
    <Page pageTitle="Créditos" showHomeButton>
      <IonGrid>
        <IonRow>
          <IonCol>
            <div>Nuestros agradecimientos a</div>
          </IonCol>
        </IonRow>
        <IonRow>
        <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonImg src={germinar}></IonImg>
              <IonCardHeader>
                <IonCardTitle>Germinar</IonCardTitle>
                <IonCardSubtitle>Equipo Interdisciplinario</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonImg src={arasaac}></IonImg>
              <IonCardHeader>
                <IonCardTitle>ARASAAC</IonCardTitle>
                <IonCardSubtitle>
                  Centro Aragonés para la Comunicación Aumentativa y Alternativa
                </IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonImg src={azure}></IonImg>
              <IonCardHeader>
                <IonCardTitle>Microsoft Azure</IonCardTitle>
                <IonCardSubtitle>
                  Servicios de informática en la nube
                </IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonImg src={sisa}></IonImg>
              <IonCardHeader>
                <IonCardTitle>SISA</IonCardTitle>
                <IonCardSubtitle>
                  Sistema Integrado de Información Sanitaria Argentino
                </IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonImg src={utn}></IonImg>
              <IonCardHeader>
                <IonCardTitle>UTN FRBA</IonCardTitle>
                <IonCardSubtitle>
                  Universidad Tecnológica Nacional
                </IonCardSubtitle>
                <IonCardSubtitle>
                  Facultad Regional Buenos Aires
                </IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
       
        </IonRow>
      </IonGrid>
    </Page>
  );
};

export default CreditosPage;
