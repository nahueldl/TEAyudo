import React, { useContext, useEffect, useState } from 'react';
import { IonModal, IonButton, IonContent, IonLabel, IonGrid, IonRow, IonCol, IonImg, IonThumbnail, IonTitle, IonList, IonItem, IonAvatar, IonToggle, IonInput, IonSelect, IonSelectOption, IonLoading, IonAlert } from '@ionic/react';
import "./styles.css";
import { Pictogram } from '../../types/Pictograms';
import PictogramsService from "../../services/pictograms.services";
import CategoriesService from "../../services/categories.services";
import { AuthenticationContext } from '../../context/authentication';
import { PatientContext } from '../../context/patient';
import { Category } from '../../types/Categories';

export const ModalPictogram: React.FC<Props> = ({showModal, onClick, pictogram}) => {
    const { authData, setAuthData } = useContext(AuthenticationContext);
    const { patientData } = useContext(PatientContext);
    const { error, loading } = authData;
    const [errorMessage, setErrorMessage] = useState<string>();
    const [ checked, setChecked ] = useState(false);
    const [ categoriasPropias, setCategoriasPropias ] = useState<[Category]>();
    
    useEffect(() => obtenerCategorias(), []);

    const obtenerCategorias = () => {
        CategoriesService.getCategories(authData.token!, patientData.patientSelected?.id_paciente)
        .then((res: any) => {
            setCategoriasPropias(res.data);
            setAuthData({ loading: false, error: false });
        })
        .catch((error: any) => {
            setErrorMessage(
              "Hubo un inconveniente, por favor intente más tarde."
            );
            setAuthData({ loading: false, error: true });
            //mostrar mensaje con error
          });
    }
    
    const marcarFavoritoPictograma = () => {
        // PictogramsService
    }

    const setShowModal = (value: boolean) => {
        onClick(value);
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
                    <IonTitle className="ion-text-center text-bold">{pictogram.nombres[0].nombre}</IonTitle>
                    <IonRow>
                        <IonCol size="2"/>
                        <IonCol size="8">
                            <IonList className="mt-5">
                                <IonImg src={pictogram!.ruta_acceso_local!} className="h-100"/>
                                <IonItem>
                                    <IonLabel>Pictograma favorito</IonLabel>
                                    <IonToggle color="secondary" checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Personalizar nombre</IonLabel>
                                    <IonInput className="pl-5 text-align-end" placeholder={pictogram.nombres[0].nombre}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Categoria</IonLabel>
                                    <IonSelect value="categoria" interface="action-sheet" cancelText="Cancelar">
                                        {categoriasPropias?.map((categoria, index) => (
                                            <IonSelectOption value={categoria.id_categoria}>{categoria.nombre}</IonSelectOption>
                                        ))}
                                        <IonSelectOption value="colores">Colores</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonList>
                        </IonCol>
                        <IonCol size="2"/>
                    </IonRow>
                </IonGrid>
                <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
                <IonAlert
                    isOpen={error!}
                    animated
                    backdropDismiss
                    keyboardClose
                    message={errorMessage}
                    onDidDismiss={() => setAuthData({ error: false })}
                />
            </IonModal>
        ): (<></>)}
    </IonContent>
  );
};

interface Props {
    showModal: any;
    onClick: any;
    pictogram?: Pictogram;
  }

  export default ModalPictogram;