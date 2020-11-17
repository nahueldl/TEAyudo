import { IonAlert, IonAvatar, IonButton, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonLoading, IonRow, IonSelect, IonSelectOption, IonThumbnail, NavContext } from "@ionic/react";
import React, { useState, useContext, useEffect, useCallback } from "react";
import Page from "../../../components/Page";
import CategoriesService from "../../../services/categories.services";
import { AuthenticationContext } from "../../../context/authentication";
import { Category } from "../../../types/Categories";
import { Pictogram } from "../../../types/Pictograms";
import { usePhotoGallery } from '../../../hooks/usePhotoGallery';
import { camera } from "ionicons/icons";
import { getBlobFromURL } from "../../../utils/urlToBlob";
import { getBase64 } from "../../../utils/encodeImg";
import PictogramsServices from "../../../services/pictograms.services";

const AddPictogram: React.FC = () => {
    const { authData, setAuthData } = useContext(AuthenticationContext);
    const { navigate } = useContext(NavContext);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [ categoriasPropias, setCategoriasPropias ] = useState<[Category]>();
    const { error, loading } = authData;
    const { photos, takePhoto } = usePhotoGallery();
    const [ nombrePictograma, setNombrePictograma ] = useState<string>();
    const [ etiquetaPictograma, setEtiquetaPictograma ] = useState<string>();
    const [ categoriaValue, setCategoriaValue ] = useState<number>();

    useEffect(() => obtenerCategorias(), []);

    const obtenerCategorias = () => {
        CategoriesService.getCategories(authData.token!)
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
        var base64;
        getBlobFromURL(photos[0].webviewPath!).then(data => {
            getBase64(data).then(encoded => {
                // base64 = encoded;
                base64 = "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"
                PictogramsServices.loadPictogramToCategory(authData.token!, categoriaValue!, base64, {nombre: nombrePictograma!}, {nombre: etiquetaPictograma!})
                    .then((res:any) => {
                        setAuthData({ loading: false, error: false });
                        goToPictogramsPage();
                    })
                    .catch(error => {
                        setErrorMessage(
                            "Hubo un inconveniente creando el pictograma, pruebe más tarde."
                          );
                          setAuthData({ loading: false, error: true });
                    })
            });
        })
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
            <IonGrid className="container-addPictogram">
                <IonRow>
                    <form className="form-no-background">
                        <IonList className="mt-5">
                                {photos.length ? (
                                    <IonImg src={photos[0].webviewPath} className="h-100 max-width-150 margin-auto"/>
                                ): (<></>)}
                                <IonButton onClick={() => takePhoto()} size="large" shape="round" color="tertiary">
                                    <IonIcon icon={camera}></IonIcon>
                                </IonButton>
                            <IonItem>
                                <IonLabel className="text-bold">Nombre</IonLabel>
                                <IonInput className="pl-5 text-align-end" placeholder="Ingrese el nombre" value={nombrePictograma}  onIonChange={e => setNombrePictograma(e.detail.value!)}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel className="text-bold">Etiqueta</IonLabel>
                                <IonInput className="pl-5 text-align-end" placeholder="Ingrese la etiqueta" value={etiquetaPictograma}  onIonChange={e => setEtiquetaPictograma(e.detail.value!)}/>
                            </IonItem>
                            <IonItem>
                                <IonLabel className="text-bold">Categoria</IonLabel>
                                <IonSelect value={categoriaValue} interface="action-sheet" cancelText="Cancelar" placeholder="Seleccione la categoria" onIonChange={e => setCategoriaValue(e.detail.value)}>
                                        {categoriasPropias?.map((categoria, index) => (
                                            <IonSelectOption key={index} value={categoria.id_categoria}>{categoria.nombre}</IonSelectOption>
                                        ))}
                                    </IonSelect>
                            </IonItem>
                        </IonList>
                        <div>
                            <IonButton className="formButton mt-5" onClick={handleAddPictogram} expand="block">
                                Crear pictograma
                            </IonButton>
                            <IonButton className="formButton red-buttom mt-5" onClick={handleCancel} expand="block">
                                Cancelar
                            </IonButton>
                        </div>
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