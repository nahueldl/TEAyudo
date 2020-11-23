import React from 'react';
import { IonModal, IonButton, IonLabel, IonGrid, IonRow, IonCol, IonTitle, IonIcon } from '@ionic/react';
import "./styles.css";
import { closeOutline } from 'ionicons/icons';
import { Professional } from '../../types/Professionals';
import { Patient } from '../CardWithImage';

export const ModalProfessional: React.FC<Props> = ({showModal, handleShowModal, handleAsignProfessional, profesional, patient}) => {
    
  return (
    <IonModal isOpen={showModal} cssClass="h-300">
        <IonGrid className="modal">
            <IonRow className="row-title">
                <IonCol className="flex-grow-5">
                    <IonTitle color="primary">
                    <h3 className="ion-text-uppercase modal-title">Asignación de profesional</h3>
                    </IonTitle>
                </IonCol>
                <IonCol className="flex-grow-1 icon-close">
                    <IonIcon
                    onClick={(_e) => handleShowModal(false)}
                    icon={closeOutline}
                    size="large"
                    color="primary"
                    />
                </IonCol>
            </IonRow>
            <IonRow className="container-asign-professional text-black ">
                <IonLabel color="margin-auto pt-5">
  ¿Esta segurx que desea asignar el profesional <b>{profesional.apellido} {profesional.nombre}</b> al paciente <b>{patient.nombre}</b>?
                </IonLabel>
            </IonRow>
        </IonGrid>
        <IonButton color="success" onClick={() => handleAsignProfessional()}>Si, estoy segurx</IonButton>
        <IonButton color="danger" onClick={() => handleShowModal(false)}>No</IonButton>
    </IonModal>
  );
};

interface Props {
    showModal: any;
    handleShowModal:  (value: boolean) => void;
    handleAsignProfessional: () => void;
    profesional: Professional;
    patient: Patient;
  }

  export default ModalProfessional;