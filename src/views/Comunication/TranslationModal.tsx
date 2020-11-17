import React from "react";
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";

const TranslationModal: React.FC<Props> = ({
  isOpen,
  translation,
  handleClose,
}) => {
  return (
    <IonModal isOpen={isOpen} backdropDismiss={true}>
      <IonGrid className="modal">
        <IonRow className="row-title">
          <IonCol className="flex-grow-5">
            <IonTitle color="primary">
              <h3 className="ion-text-uppercase modal-title">Traducción</h3>
            </IonTitle>
          </IonCol>
          <IonCol className="flex-grow-1 icon-close">
            <IonIcon
              onClick={(_e) => handleClose()}
              icon={closeOutline}
              size="large"
              color="primary"
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="translation-container">
            <p className="translation">{translation}</p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonModal>
  );
};

interface Props {
  isOpen: boolean;
  translation: string;
  handleClose: () => void;
}

export default TranslationModal;
