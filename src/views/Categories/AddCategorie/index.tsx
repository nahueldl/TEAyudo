import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonList, IonRow } from "@ionic/react";
import React, { useContext, useState, useCallback } from "react";
import Page from "../../../components/Page";
import "../styles.css";

const AddCategorie: React.FC<[]> = () => {
  return (
    <Page pageTitle="Agregar categoría" showHomeButton>
        <IonContent>
            <IonGrid className="container-categorieAdd">
                <IonRow>
                    <IonCol size="6">
                        <IonButton size="large" expand="block" className="">
                            
                        </IonButton>
                    </IonCol>
                    <IonCol size="6">
                        <form className="form-no-background">
                            <IonList className="mt-5">
                                <IonItem className="inputMargin">
                                    <IonLabel>Nombre:</IonLabel>
                                    <IonInput
                                        name="name"
                                        required
                                        clearInput
                                        placeholder="Ingrese el nombre"
                                    />
                                    </IonItem>
                            </IonList>
                        </form>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </Page>
  );
};


export default AddCategorie;
