import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardTitle,
  IonImg
} from "@ionic/react";
import React from "react";
import styles from "./styles.module.css";
import Page from "../../components/Page";

const img: any = {
  src: "assets/imageedit_2_6506907493.jpg",
};

const HomePage: React.FC = () => {
  return (
    <Page pageTitle="Inicio" showHomeButton={false}>
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard button className={styles.ionCard}>
              <IonImg src={img.src} />
              <IonCardTitle className={styles.cardTitle}>
                Comunicarse
              </IonCardTitle>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonCard button className={styles.ionCard}>
              <IonImg src={img.src} />
              <IonCardTitle className={styles.cardTitle}>Jugar</IonCardTitle>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard button className={styles.ionCard}>
              <IonImg src={img.src} />
              <IonCardTitle className={styles.cardTitle}>
                Pictogramas
              </IonCardTitle>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonCard button className={styles.ionCard}>
              <IonImg src={img.src} />
              <IonCardTitle className={styles.cardTitle}>
                Categorias
              </IonCardTitle>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  );
};

export default HomePage;