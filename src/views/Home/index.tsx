import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardTitle,
  NavContext,
} from "@ionic/react";
import React, { useCallback, useContext } from "react";
import styles from "./styles.module.css";
import Page from "../../components/Page";
import { AuthenticationContext } from "../../context/authentication";

const HomePage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { role } = useContext(AuthenticationContext).authData;
  const { patientId } = useContext(AuthenticationContext).authData;

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
              onClick={() => goToComunicationPage()}
              color="secondary"
            >
              <IonCardTitle className={styles.cardTitle}>
                Comunicarse
              </IonCardTitle>
            </IonCard>
          </IonCol>
          {patientId!="NoAsignado" ? (
            <IonCol size="12" sizeMd="6">
              <IonCard
                button
                className={styles.ionCard}
              >
                <IonCardTitle className={styles.cardTitle}>Jugar</IonCardTitle>
              </IonCard>
            </IonCol>
          ):null}
          <IonCol size="12" sizeMd="6">
            <IonCard
              button
              className={styles.ionCard}
              color="success"
              onClick={() => goToPictogramasPage()}
            >
              <IonCardTitle className={styles.cardTitle}>
                Pictogramas
              </IonCardTitle>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonCard
              button
              className={styles.ionCard}
              onClick={() => goToCategoriesPage()}
              color='tertiary'
              
            >
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
