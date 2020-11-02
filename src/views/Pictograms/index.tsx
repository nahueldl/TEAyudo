import React, { useState, useContext, useEffect, useCallback } from "react";
import Page from "../../components/Page";
import { NavContext, IonLoading, IonGrid, IonRow, IonCol, IonLabel, IonSearchbar } from "@ionic/react";
import { AuthenticationContext } from "../../context/authentication";
import PictogramServices from "../../services/pictograms.services";
import { Pictogram } from "../../types/Pictograms";
import { PatientContext } from "../../context/patient";
import ListPictograms from "./ListPictograms";

const PictogramsPage: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { patientData, setPatientData } = useContext(PatientContext);
  const [pictograms, setPictograms] = useState<[Pictogram]>();
  const { navigate } = useContext(NavContext);
  const [searchText, setSearchText] = useState('');

  const getPictogramSearchText = (textBusqueda: string) => {
    setSearchText(textBusqueda);
    if(textBusqueda.length > 2) {
      setAuthData({ loading: true, error: false });
      PictogramServices.getPictogramsByName(authData.token!, textBusqueda, authData.patientId!)
        .then((res: any) => {
          if (res.data?.length > 0) {
            setPictograms(res.data);
            setAuthData({ loading: false });
          } else {
            goToAddPictogram();
            setAuthData({ loading: false });
          }
        })
        .catch((_error: any) => {
          setAuthData({ loading: false, error: true });
        });
    } 
  };

  const goToAddPictogram = useCallback(
    () => navigate("/pictogram/alta", "forward"),
    [navigate]
  );

  return (
    <Page pageTitle="Pictogramas" showHomeButton>
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <IonCol size="12">
              <IonLabel>Buscar un pictograma:</IonLabel>
            </IonCol>
            <IonCol size="12">
              <IonSearchbar value={searchText} placeholder="Buscar..." onIonChange={e => getPictogramSearchText(e.detail.value!)} showCancelButton="never"></IonSearchbar>
            </IonCol>
          </IonCol>
          <IonCol size="8">
            {authData.loading ? (
              <IonLoading
                isOpen={authData.loading!}
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
    </Page>
  );
};

export default PictogramsPage;
