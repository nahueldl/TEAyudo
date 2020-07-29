import React, { useState } from "react";
import { IonModal } from "@ionic/react";

const ChooseRoleModal: React.FC<Props> = (chooseRole) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <IonModal isOpen={showModal} backdropDismiss={false}>
      <p>Para continuar, necesitamos que elijas tu rol</p>
      {/* TODO rol + explicación de cada uno */}
      {/* <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton> */}
    </IonModal>
  );
};

interface Props {
  chooseRole: (
    idType?: string,
    idNumber?: string,
    licenseNumber?: string
  ) => void;
}

export default ChooseRoleModal;
