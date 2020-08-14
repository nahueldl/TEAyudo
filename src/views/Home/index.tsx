import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardTitle,
  IonImg,
  NavContext,
} from "@ionic/react";
import React, { useContext, useCallback } from "react";
import styles from "./styles.module.css";
import Page from "../../components/Page";

const img: any = {
  src: "assets/imageedit_2_6506907493.jpg",
};

const HomePage: React.FC = () => {
  const { navigate } = useContext(NavContext);

  const goToComunicationPage = useCallback(
    () => navigate("/comunicacion", "forward"),
    [navigate]
  );

  const goToGamesPage = useCallback(() => navigate("/juegos", "forward"), [
    navigate,
  ]);

  const goToPictogramasPage = useCallback(
    () => navigate("/pictogramas", "forward"),
    [navigate]
  );

  const goToCategoriesPage = useCallback(
    () => navigate("/categorias", "forward"),
    [navigate]
  );

  return (
    <Page pageTitle="Inicio" showHomeButton={false}>
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard
              button
              className={styles.ionCard}
              onClick={goToComunicationPage}
            >
              <IonImg src={img.src} />
              <IonCardTitle className={styles.cardTitle}>
                Comunicarse
              </IonCardTitle>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonCard button className={styles.ionCard} onClick={goToGamesPage}>
              <IonImg src={img.src} />
              <IonCardTitle className={styles.cardTitle}>Jugar</IonCardTitle>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard
              button
              className={styles.ionCard}
              onClick={goToPictogramasPage}
            >
              <IonImg src={img.src} />
              <IonCardTitle className={styles.cardTitle}>
                Pictogramas
              </IonCardTitle>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonCard
              button
              className={styles.ionCard}
              onClick={goToCategoriesPage}
            >
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
