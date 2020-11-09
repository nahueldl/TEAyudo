import Page from "../../components/Page";
import React, { useContext, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonTitle,
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
  const [error, setError] = useState<string>("");
  const [resultSelected, setResultSelected] = useState<number>(-1);

  const startPlaying = (e: any) => {
    e.preventDefault();
    isPlaying(true);
    fetchMove();
  };

  const fetchMove = () => {
    setLoadingMove(true);
    GameServices.getMove(token!, patientId!)
      .then((res) => {
        setMove(res);
        setLoadingMove(false);
      })
      .catch((error) => {
        setLoadingMove(false);
        setError(error);
      });
  };

  const selectPictogram = (result: 0 | 1) => {
    setResultSelected(result);
    return;
  }

  const postResult = () => {
    GameServices.postResult(token!, patientId!, move!.id_jugada, resultSelected)
      .then((res: any) => res)
      .catch((error: React.SetStateAction<string>) => setError(error));
  };

  return (
    <Page pageTitle="Juegos" showHomeButton>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonTitle>
              El juego consiste en lo siguiente: te mostraremos un pictograma, y
              cuatro significados posibles. Elige el adecuado, y continúa
            </IonTitle>
            <IonButton onClick={(e) => startPlaying(e)}>¡Jugar!</IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
      {playing ? (
        <IonGrid>
          <IonRow>
            <IonCol>
              {/* TODO: agregar properties del componente */}
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
                  <IonCard button onClick={(e) => selectPictogram(pictogram.correcta)}>
                    <IonCardTitle>{pictogram.nombre}</IonCardTitle>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={() => postResult()} color="primary">Aceptar</IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="tertiary">Volver</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      ) : null}
    </Page>
  );
};

export default GamesPage;
