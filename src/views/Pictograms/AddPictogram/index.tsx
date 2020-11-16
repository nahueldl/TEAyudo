import { IonAlert, IonButton, IonContent, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonList, IonLoading, IonRow, IonSelect, IonSelectOption, NavContext } from "@ionic/react";
import React, { useState, useContext, useEffect, useCallback } from "react";
import Page from "../../../components/Page";
import CategoriesService from "../../../services/categories.services";
import { AuthenticationContext } from "../../../context/authentication";
import { Category } from "../../../types/Categories";
import { Pictogram } from "../../../types/Pictograms";

const AddPictogram: React.FC = () => {
    const { authData, setAuthData } = useContext(AuthenticationContext);
    const { navigate } = useContext(NavContext);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [ categoriasPropias, setCategoriasPropias ] = useState<[Category]>();
    const { error, loading } = authData;
    const [ categoriaValue ] = useState();
    const [ pictograma, setPictograma ] = useState<Pictogram>();

    useEffect(() => obtenerCategorias(), []);

    const obtenerCategorias = () => {
        CategoriesService.getCategories(authData.token!, authData.patientId!)
        .then((res: any) => {
            setCategoriasPropias(res.data);
            setAuthData({ loading: false, error: false });
        })
        .catch((error: any) => {
            setErrorMessage(
              "Hubo un inconveniente, por favor intente más tarde."
            );
        });
    }

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
            <IonGrid className="container">
                <IonRow>
                    <form className="form-no-background">
                        <IonList className="mt-5">
                            <IonItem>
                                <IonImg src="" className="h-100"/>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Nombre</IonLabel>
                                {/* <IonInput className="pl-5 text-align-end" placeholder="Ingrese el nombre del pictograma" value={pictograma.n} onIonChange={e => setNewName(e.detail.value!)}> */}
                            </IonItem>
                            <IonItem>
                                <IonLabel>Etiqueta</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Categoria</IonLabel>
                                <IonSelect value={categoriaValue} interface="action-sheet" cancelText="Cancelar">
                                        {categoriasPropias?.map((categoria, index) => (
                                            <IonSelectOption key={index} value={categoria.id_categoria}>{categoria.nombre}</IonSelectOption>
                                        ))}
                                    </IonSelect>
                            </IonItem>
                        </IonList>
                        <IonButton className="formButton mt-5" onClick={handleAddPictogram} expand="block">
                            Crear pictograma
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