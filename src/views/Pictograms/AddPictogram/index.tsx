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
    const [ loading, isLoading ] = useState<boolean>(false);
    const  [error, hasError ] = useState<boolean>(false);
    const { photos, takePhoto } = usePhotoGallery();
    const [ nombrePictograma, setNombrePictograma ] = useState<string>();
    const [ etiquetaPictograma, setEtiquetaPictograma ] = useState<string>();
    const [ categoriaValue, setCategoriaValue ] = useState<number>();

    useEffect(() => obtenerCategorias(), []);

    const obtenerCategorias = () => {
        CategoriesService.getCategories(authData.token!)
        .then((res: any) => {
            setCategoriasPropias(res.data);
        })
        .catch((error: any) => {
            setErrorMessage(
              "Hubo un inconveniente, por favor intente más tarde."
            );
            hasError(true);
        });
    }

    const handleAddPictogram = () => {
        var base64;
        getBlobFromURL(photos[0].webviewPath!).then(data => {
            // getBlobFromURL("https://static.vix.com/es/sites/default/files/styles/large/public/imj/hogartotal/c/como-reutilizar-un-arbol-de-navidad-1.jpg").then(data => {
            getBase64(data).then(encoded => {
                base64 = encoded;
                // base64 = "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";
                // base64 = "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"
                PictogramsServices.loadPictogramToCategory(authData.token!, categoriaValue!, base64, {nombre: nombrePictograma!}, {nombre: etiquetaPictograma!})
                    .then((res:any) => {
                        goToPictogramsPage();
                    })
                    .catch(error => {
                        setErrorMessage(
                            "Hubo un inconveniente creando el pictograma, pruebe más tarde."
                          );
                          hasError(true);
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
                        <IonImg src="https://static.vix.com/es/sites/default/files/styles/large/public/imj/hogartotal/c/como-reutilizar-un-arbol-de-navidad-1.jpg" className="h-100 max-width-150 margin-auto"/>
                                {/* {photos.length ? (
                                    <IonImg src={photos[0].webviewPath} className="h-100 max-width-150 margin-auto"/>
                                ): (<></>)} */}
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
                    />
                </IonRow>
            </IonGrid>
      </IonContent>
    </Page>
);
}

export default AddPictogram;