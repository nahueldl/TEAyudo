import { IonAlert, IonAvatar, IonButton, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonLoading, IonRow, IonSelect, IonSelectOption, IonThumbnail, NavContext } from "@ionic/react";
import React, { useState, useContext, useEffect, useCallback } from "react";
import Page from "../../../components/Page";
import CategoriesService from "../../../services/categories.services";
import { AuthenticationContext } from "../../../context/authentication";
import { Category } from "../../../types/Categories";
import { Pictogram } from "../../../types/Pictograms";
import { usePhotoGallery } from '../../../utils/usePhotoGallery';
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
    const [ error, setError ] = useState<boolean>(false);
    const { photos, takePhoto } = usePhotoGallery();
    const [ nombrePictograma, setNombrePictograma ] = useState<string>();
    const [ etiquetaPictograma, setEtiquetaPictograma ] = useState<string>();
    const [ categoriaValue, setCategoriaValue ] = useState<number>();

    useEffect(() => obtenerCategorias(), []);

    const obtenerCategorias = () => {
        isLoading(true);
        setError(false);
        CategoriesService.getCategories(authData.token!)
        .then((res: any) => {
            if(res.data.length===1){
                setCategoriaValue(res.data[0].id_categoria);
            } 
            setCategoriasPropias(res.data);
            isLoading(false);
        })
        .catch((error: any) => {
            setErrorMessage(
              "Hubo un inconveniente, por favor intente más tarde."
            );
            isLoading(false);
            setError(true);
        });
    }

    const handleAddPictogram = () => {
        setError(false);
        if(categoriaValue===undefined || nombrePictograma===undefined ||etiquetaPictograma===undefined || photos.length===0){
            setErrorMessage( "Complete todos los campos y carge una imagen para crear un pictograma.");
            setError(true);
        } else {
            
            isLoading(true);
            var base64;
            getBlobFromURL(photos[0].webviewPath!).then(data => {
                getBase64(data).then(encoded => {
                    base64 = encoded;
                    PictogramsServices.loadPictogramToCategory(authData.token!, categoriaValue!, base64, {nombre: nombrePictograma!}, {nombre: etiquetaPictograma!})
                        .then((res:any) => {
                            isLoading(false);
                            goToPictogramsPage();
                        })
                        .catch(error => {
                            setErrorMessage(
                                "Hubo un inconveniente creando el pictograma, pruebe más tarde."
                            );
                            isLoading(false);
                            setError(true);
                        })
                });
            })
        }
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
                        onDidDismiss={e => setError(false)}
                        message={errorMessage}
                    />
                </IonRow>
            </IonGrid>
      </IonContent>
    </Page>
);
}

export default AddPictogram;