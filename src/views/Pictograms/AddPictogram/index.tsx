import { IonAlert, IonButton, IonContent, IonGrid, IonList, IonLoading, IonRow, NavContext } from "@ionic/react";
import React, { useState, useContext, useEffect, useCallback } from "react";
import Page from "../../../components/Page";
import { AuthenticationContext } from "../../../context/authentication";

const AddPictogram: React.FC = () => {
    const { authData, setAuthData } = useContext(AuthenticationContext);
    const { navigate } = useContext(NavContext);
    const [errorMessage, setErrorMessage] = useState<string>();
    const { error, loading } = authData;

    const handleAddPictogram = () => {
        
    }

    const handleCancel = () => {
        goToPictogramsPage();
      };

    const goToPictogramsPage = useCallback(() => navigate("/pictogramas", "back"), [
    navigate,
    ]);

return (
    <Page pageTitle="Crear pictograma" showHomeButton>
        <IonContent>
            <IonGrid className="container-patientAdd">
                <IonRow>
                    <form className="form-no-background">
                        <IonList className="mt-5">
                        </IonList>
                        <IonButton className="formButton mt-5" onClick={handleAddPictogram} expand="block">
                            Agregar paciente
                        </IonButton>
                        <IonButton className="formButton red-buttom mt-5" onClick={handleCancel} expand="block">
                            Cancelar
                        </IonButton>
                    </form>
                    <IonLoading
                        isOpen={loading!}
                        message={"Trabajando..."}
                        spinner="crescent"
                    />
                    <IonAlert
                        isOpen={error!}
                        animated
                        backdropDismiss
                        keyboardClose
                        message={errorMessage}
                        onDidDismiss={() => setAuthData({ error: false })}
                    />
                </IonRow>
            </IonGrid>
      </IonContent>
    </Page>
);
}

export default AddPictogram;