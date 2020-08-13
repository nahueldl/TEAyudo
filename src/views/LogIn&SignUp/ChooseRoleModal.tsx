import React, { useState } from "react";
import {
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";
import "./styles.css";

type IdType = "DNI" | "PASAPORTE";
type RolSelected = "F" | "M";

const ChooseRoleModal: React.FC<Props> = ({isOpen, handleSelection}) => {
  const [rolSelected, setRolSelected] = useState<RolSelected>();
  const [idType, setIdType] = useState<IdType>();
  const [idNumber, setIdNumber] = useState<number>();
  const [licenseNumber, setLicenseNumber] = useState<number>();

  const showSubmitButton = () => {
    switch (rolSelected) {
      case "F": return true;
      case "M": return idType && idNumber && licenseNumber ;
    }
  }

  const handleSubmit = () => {
    handleSelection(idType, idNumber, licenseNumber)
  }

  return (
    <IonModal isOpen={isOpen} backdropDismiss={false}>
      <div className="modalBody">
        <h2 className="title">Para continuar, necesitamos que elijas tu rol</h2>
        <IonList inset={true}>
          <IonRadioGroup>
            <IonItem onClick={() => setRolSelected("F")}>
              <IonRadio value="familiar" />
              <IonLabel>
                <h2 className="itemTitle">Familiar</h2>
                <h3>
                  Elegí este rol si sos el familiar de un paciente con TEA
                </h3>
              </IonLabel>
            </IonItem>
            <IonItem onClick={() => setRolSelected("M")}>
              <IonRadio value="medico" />
              <IonLabel>
                <h2 className="itemTitle">Médicx</h2>
                <h3>
                  Elegí este rol si sos le médicx tratante de un paciente con
                  TEA
                </h3>
              </IonLabel>
            </IonItem>
          </IonRadioGroup>
        </IonList>
        {rolSelected === "M" ? (
          <div className="doctorData">
            <h4 className="title">
              Necesitamos algunos datos extra para verificar
            </h4>
            <IonSelect
              value={idType}
              placeholder="Selecciona el tipo de documento"
              onIonChange={(e) => setIdType(e.detail.value)}
            >
              <IonSelectOption value="DNI">DNI</IonSelectOption>
              <IonSelectOption value="PASAPORTE">Pasaporte</IonSelectOption>
            </IonSelect>
            <IonItem>
              <IonInput
                value={idNumber}
                placeholder="Número de identificación"
                onIonChange={(e) => setIdNumber(parseInt(e.detail.value!, 10))}
                clearInput
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                value={licenseNumber}
                placeholder="Número de matrícula"
                onIonChange={(e) =>
                  setLicenseNumber(parseInt(e.detail.value!, 10))
                }
                clearInput
              ></IonInput>
            </IonItem>
          </div>
        ) : null}
      </div>
     <IonButton disabled={!showSubmitButton()} onClick={() => handleSubmit()}>Siguiente</IonButton>
    </IonModal>
  );
};

interface Props {
  isOpen: boolean;
  handleSelection: (
    idType?: string,
    idNumber?: number,
    licenseNumber?: number
  ) => void;
}

export default ChooseRoleModal;
