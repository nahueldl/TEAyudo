import Page from "../../components/Page";
import React, { useContext, useState } from "react";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonLoading,
  IonRow,
} from "@ionic/react";
import CardWithImage from "../../components/CardWithImage";
import { AuthenticationContext } from "../../context/authentication";
import GameServices from "../../services/game.services";
import { Move } from "../../types/Game";

const GamesPage: React.FC = () => {
  const { token, patientId } = useContext(AuthenticationContext).authData;

  const [playing, isPlaying] = useState<boolean>(false);
  const [loadingMove, setLoadingMove] = useState<boolean>(false);
  const [postingResult, setPostingResult] = useState<boolean>(false);
  const [move, setMove] = useState<Move>();
  const [error, hasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [resultSelected, setResultSelected] = useState<number>(-1);

  const startPlaying = (e: any) => {
    e.preventDefault();
    fetchMove();
  };

  const fetchMove = () => {
    setLoadingMove(true);
    hasError(false);
    GameServices.getMove(token!, patientId!)
      .then((res) => {
        setMove(res.data);
        setLoadingMove(false);
      })
      .catch((error) => {
        setLoadingMove(false);
        setErrorMsg(
          "Hubo un error inesperado; por favor intente nuevamente más tarde."
        );
        hasError(true);
      });
  };

  const selectPictogram = (result: 0 | 1) => {
    setResultSelected(result);
    return;
  };

  const postResult = () => {
    GameServices.postResult(token!, patientId!, move!.id_jugada, resultSelected)
      .then((res: any) => res)
      .catch((error: React.SetStateAction<string>) => hasError(true));
  };

  return (
    <Page pageTitle="Juegos" showHomeButton>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonRow>
              <IonCol>
                <div style={{ textAlign: "justify" }}>
                  El juego consiste en lo siguiente: te mostraremos un
                  pictograma, y cuatro significados posibles. Elige el adecuado,
                  y continúa.
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton onClick={(e) => startPlaying(e)}>¡Jugar!</IonButton>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
      {loadingMove ? (
        <IonLoading
          isOpen={loadingMove}
          message={"Trabajando..."}
          spinner="crescent"
        />
      ) : playing ? (
        <IonGrid>
          <IonRow>
            <IonCol>
              <CardWithImage
                img={{ src: move!.pictograma.ruta_acceso_local, alt: "" }}
                touchable={false}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            {move!.nombres_posibles.map((pictogram, index) => {
              return (
                <IonCol size="12" sizeMd="6" key={index}>
                  <IonCard
                    button
                    onClick={(e) => selectPictogram(pictogram.correcta)}
                  >
                    <IonCardTitle>{pictogram.nombre}</IonCardTitle>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={() => postResult()} color="primary">
                Aceptar
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="tertiary">Volver</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      ) : null}
      {error ? (
        <IonAlert
          isOpen={error!}
          animated
          backdropDismiss
          keyboardClose
          message={errorMsg}
        />
      ) : null}
    </Page>
  );
};

export default GamesPage;
