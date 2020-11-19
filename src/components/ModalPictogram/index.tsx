import React, { useContext, useEffect, useState } from 'react';
import { IonModal, IonButton, IonContent, IonLabel, IonGrid, IonRow, IonCol, IonImg, IonThumbnail, IonTitle, IonList, IonItem, IonAvatar, IonToggle, IonInput, IonSelect, IonSelectOption, IonLoading, IonAlert, IonIcon } from '@ionic/react';
import "./styles.css";
import { Pictogram } from '../../types/Pictograms';
import PictogramsService from "../../services/pictograms.services";
import CategoriesService from "../../services/categories.services";
import { AuthenticationContext } from '../../context/authentication';
import { PatientContext } from '../../context/patient';
import { Category } from '../../types/Categories';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { getBase64 } from '../../utils/encodeImg';
import { getBlobFromURL } from '../../utils/urlToBlob';

export const ModalPictogram: React.FC<Props> = ({showModal, handleShowModal, pictogram}) => {
    const { authData, setAuthData } = useContext(AuthenticationContext);
    const [ errorMessage, setErrorMessage ] = useState<string>();
    const [ loading, isLoading ] = useState<boolean>(false);
    const [ error, hasError ] = useState<boolean>(false);
    const [ favorito, setFavorito ] = useState(false);
    const [ categoriasPropias, setCategoriasPropias ] = useState<[Category]>();
    const [ newName, setNewName ] = useState("");
    const [ categoriaValue ] = useState();
    
    useEffect(() => obtenerCategorias(), []);

    const obtenerCategorias = () => {
        setFavorito(pictogram?.favorito!);
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
    
    const marcarFavoritoPictograma = (favorito: boolean) => {
        debugger;
        if(favorito != undefined) {
            PictogramsService.editPictogram(authData.token!, pictogram?.id_pictograma!, parseInt(authData.patientId!), undefined, undefined, favorito)
            .then((res:any) => {
                setFavorito(favorito);
            })
            .catch((error: any) => {
                setErrorMessage(
                "Hubo un problema al marcar como favorito el pictograma, por favor intente más tarde."
                );
                hasError(true);
            });
        }
    }

    const crearNuevoPictogramaYAgregarACategoria = () => {
        var base64;
        getBlobFromURL(pictogram?.ruta_acceso_local!).then(data => {
            getBase64(data).then(encoded => {
                base64 = encoded;
                PictogramsService.loadPictogramToCategory(authData.token!, categoriaValue!, base64, pictogram!.nombres[0], pictogram!.etiquetas[0])
                    .then((res:any) => {
                        // setAuthData({ loading: false, error: false });
                    })
                    .catch(error => {
                        setErrorMessage(
                            "Hubo un inconveniente agregando el pictograma a la categoria, pruebe más tarde."
                          );
                          hasError(true);
                    })
            });
        })
    }

    const personalizarNombrePictograma = () => {
        PictogramsService.editPictogram(authData.token!, pictogram?.id_pictograma!, parseInt(authData.patientId!), undefined, newName, undefined)
            .then((res:any) => {
                if(pictogram != undefined)
                    pictogram.nombres[0].nombre = newName;
            })
            .catch((error: any) => {
                setErrorMessage(
                "Hubo un problema al personalizar el nombre, por favor intente más tarde."
                );
                hasError(true);
            });
    }

  return (
    <IonContent>
        {pictogram != undefined ? (
            <IonModal isOpen={showModal}>
                <IonLoading
                    isOpen={loading!}
                    message={"Trabajando..."}
                    spinner="crescent"
              />
                <IonGrid className="text-black">
                    <IonTitle className="ion-text-center text-bold">{pictogram.nombre_personalizado != null ? pictogram.nombre_personalizado : pictogram.nombres[0].nombre}</IonTitle>
                    <IonRow>
                        <IonCol size="2"/>
                        <IonCol size="8">
                            <IonList className="mt-5">
                                <IonImg src={pictogram!.ruta_acceso_local!} className="h-100"/>
                                <IonItem key="1">
                                    <IonLabel>Pictograma favorito</IonLabel>
                                    <IonToggle color="secondary" checked={favorito} onIonChange={e => marcarFavoritoPictograma(e.detail.checked)} />
                                </IonItem>
                                <IonItem key="2">
                                    <IonLabel>Personalizar nombre</IonLabel>
                                    <IonInput className="pl-5 text-align-end" placeholder={pictogram.nombre_personalizado != null ? pictogram.nombre_personalizado : pictogram.nombres[0].nombre} value={newName} onIonChange={e => setNewName(e.detail.value!)}>
                                    {newName.length>2?   
                                        <IonButton fill="clear" onClick={personalizarNombrePictograma}>
                                            <IonIcon className="" slot="end" icon={checkmarkCircleOutline} color="success"></IonIcon>
                                        </IonButton> 
                                    : <></>}
                                    </IonInput>
                                </IonItem>
                                <IonItem key="3">
                                    <IonLabel>Categoria</IonLabel>
                                    <IonSelect value={categoriaValue} interface="action-sheet" cancelText="Cancelar" onIonChange={e => crearNuevoPictogramaYAgregarACategoria()}>
                                        {categoriasPropias?.map((categoria, index) => (
                                            <IonSelectOption key={index} value={categoria.id_categoria}>{categoria.nombre}</IonSelectOption>
                                        ))}
                                    </IonSelect>
                                </IonItem>
                            </IonList>
                        </IonCol>
                        <IonCol size="2"/>
                    </IonRow>
                </IonGrid>
                <IonButton color="danger" onClick={() => handleShowModal(false, undefined)}>Cerrar</IonButton>
                <IonAlert
                    isOpen={error!}
                    animated
                    backdropDismiss
                    keyboardClose
                    message={errorMessage}
                />
            </IonModal>
        ): (<></>)}
    </IonContent>
  );
};

interface Props {
    showModal: any;
    handleShowModal:  (value: boolean, data: any) => void;
    pictogram?: Pictogram;
  }

  export default ModalPictogram;