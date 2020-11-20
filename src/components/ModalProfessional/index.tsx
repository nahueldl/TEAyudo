import React, { useContext, useEffect, useState } from 'react';
import { IonModal, IonButton, IonContent, IonLabel, IonGrid, IonRow, IonCol, IonImg, IonThumbnail, IonTitle, IonList, IonItem, IonAvatar, IonToggle, IonInput, IonSelect, IonSelectOption, IonLoading, IonAlert, IonIcon } from '@ionic/react';
import "./styles.css";
import { Pictogram } from '../../types/Pictograms';
import PictogramsService from "../../services/pictograms.services";
import CategoriesService from "../../services/categories.services";
import { AuthenticationContext } from '../../context/authentication';
import { Category } from '../../types/Categories';
import { checkmarkCircleOutline, closeOutline } from 'ionicons/icons';
import { getBase64 } from '../../utils/encodeImg';
import { getBlobFromURL } from '../../utils/urlToBlob';
import { Professional } from '../../types/Professionals';
import { Patient } from '../CardWithImage';

export const ModalProfessional: React.FC<Props> = ({showModal, handleShowModal, profesional, patient}) => {
    const { authData, setAuthData } = useContext(AuthenticationContext);
    const [ errorMessage, setErrorMessage ] = useState<string>();
    const [ loading, isLoading ] = useState<boolean>(false);
    const [ error, hasError ] = useState<boolean>(false);
    const [ favorito, setFavorito ] = useState(false);
    const [ categoriasPropias, setCategoriasPropias ] = useState<[Category]>();
    const [ newName, setNewName ] = useState("");
    const [ categoriaValue ] = useState();
    
  return (
    <IonModal isOpen={showModal} cssClass="max-height-100">
        <IonGrid className="modal">
            <IonRow className="row-title">
                <IonCol className="flex-grow-5">
                    <IonTitle color="primary">
                    <h3 className="ion-text-uppercase modal-title">Asignación de profesional</h3>
                    </IonTitle>
                </IonCol>
                <IonCol className="flex-grow-1 icon-close">
                    <IonIcon
                    onClick={(_e) => handleShowModal(false,null)}
                    icon={closeOutline}
                    size="large"
                    color="primary"
                    />
                </IonCol>
            </IonRow>
            <IonRow className="container-asign-professional text-black ">
                <IonLabel color="margin-auto pt-5">
                    ¿Esta segurx que desea asignar el profesional {} al paciente {}?
                </IonLabel>
            </IonRow>
        </IonGrid>
        <IonButton color="success" onClick={() => handleShowModal(false, undefined)}>Si, estoy segurx</IonButton>
        <IonButton color="danger" onClick={() => handleShowModal(false, undefined)}>No</IonButton>
    </IonModal>
  );
};

interface Props {
    showModal: any;
    handleShowModal:  (value: boolean, data: any) => void;
    profesional: Professional;
    patient?: Patient;
  }

  export default ModalProfessional;