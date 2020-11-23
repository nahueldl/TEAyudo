import React, { useState, useContext, useEffect, useCallback } from "react";
import Page from "../../components/Page";
import { NavContext, IonLoading, IonGrid, IonRow, IonCol, IonLabel, IonSearchbar, IonButton, IonIcon, IonAlert } from "@ionic/react";
import { AuthenticationContext } from "../../context/authentication";
import PictogramServices from "../../services/pictograms.services";
import CategoriesService from "../../services/categories.services";
import { Pictogram } from "../../types/Pictograms";
import { PatientContext } from "../../context/patient";
import ListPictograms from "./ListPictograms";
import { addOutline } from "ionicons/icons";

const PictogramsPage: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const [pictograms, setPictograms] = useState<[Pictogram]>();
  const { navigate } = useContext(NavContext);
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, isLoading] = useState<boolean>(false);
  const [error, hasError] = useState<boolean>(false);

  const getPictogramSearchText = (textBusqueda: string) => {
    setSearchText(textBusqueda);
    if(textBusqueda.length > 2) {
      isLoading(true);
      hasError(false);
      PictogramServices.getPictogramsByName(authData.token!, textBusqueda, authData.patientId!)
        .then((res: any) => {
          setPictograms(res.data);
          isLoading(false);
        })
        .catch((_error: any) => {
          isLoading(false);
          hasError(true);
        });
    } 
  };

  const handleClickAddPictogarm = () => {
    isLoading(true);
    hasError(false);
    CategoriesService.getCategories(authData.token!)
        .then((res: any) => {
          if(res.data.length) {
            isLoading(false);
            hasError(false);
            goToAddPictogram();
          } else {
            setErrorMessage(
              "Debe crear una categoria antes de crear un pictograma."
            );
            isLoading(false);
            hasError(true);
          }
            
        })
        .catch((error: any) => {
            setErrorMessage(
              "Hubo un inconveniente, por favor intente mas tarde."
            );
            isLoading(false);
            hasError(true);
        });
  }

  const goToAddPictogram = useCallback(
    () => navigate("/pictograma/alta", "forward"),
    [navigate]
  );

  return (
    <Page pageTitle="Pictogramas" showHomeButton>
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <IonCol size="12">
              <IonLabel>Buscar un pictograma</IonLabel>
            </IonCol>
            <IonCol size="12">
              <IonSearchbar value={searchText} placeholder="Buscar..." enterkeyhint="enter" onIonChange={e => getPictogramSearchText(e.detail.value!)} showCancelButton="never" onIonClear={e => setPictograms(undefined)} debounce={1000}></IonSearchbar>
            </IonCol>
            <IonCol size="12">
              <IonLabel>Crear un nuevo pictograma</IonLabel>
              <IonButton color="tertiary" onClick={handleClickAddPictogarm}>Crear pictograma <IonIcon  className="pl-5" slot="end" icon={addOutline}></IonIcon></IonButton>
            </IonCol>
          </IonCol>
          <IonCol size="8">
            {loading ? (
              <IonLoading
                isOpen={loading!}
                message="Trabajando..."
                spinner="crescent"
              />
            ) : pictograms?.length ? (
              <ListPictograms pictograms={pictograms}></ListPictograms>
            ) : (
              <IonLabel>La busqueda no devuelve resultados o ingrese al menos 3 caracteres para realizar una busqueda.</IonLabel>
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonAlert
          isOpen={error!}
          animated
          backdropDismiss
          keyboardClose
          message={errorMessage}
      />
    </Page>
  );
};

export default PictogramsPage;
