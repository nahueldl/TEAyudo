import React from 'react';
import { IonModal, IonButton, IonContent, IonLabel, IonGrid, IonRow, IonCol, IonImg, IonThumbnail, IonTitle } from '@ionic/react';
import "./styles.css";
import { Pictogram } from '../../types/Pictograms';

export const ModalPictogram: React.FC<Props> = ({showModal, onClick, pictogram}) => {
  const setShowModal = (value: boolean) => {
    onClick(value);
  }

  return (
    <IonContent>
        {pictogram != undefined ? (
            <IonModal isOpen={showModal}>
                <IonGrid className="text-black">
                    <IonTitle>{pictogram.nombres[0].nombre}</IonTitle>
                    <IonRow>
                        <IonCol size="2">
                            <IonLabel>Imagen:</IonLabel>
                        </IonCol>
                        <IonCol size="6">
                            <IonImg src={pictogram!.ruta_acceso_local!}/>
                        </IonCol>
                        <IonLabel className="text-bold text-black">This is modal content</IonLabel>
                    </IonRow>
                </IonGrid>
                <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
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