import React from "react";
import { IonButton } from "@ionic/react";
import "./styles.css";
const OverlayRight: React.FC<Props> = ({handleActivationChange}) => {
  return (
    <div className="overlayPanel overlayRight">
      <h1>¿Aún no estás registradx?</h1>
      <p>Para comenzar, sólo necesitas crear una cuenta</p>
      <IonButton className="overlayButton" fill="outline" onClick={() => handleActivationChange(true)}>Registrarse</IonButton>
    </div>
  );
};

interface Props {
  handleActivationChange: (value:boolean) => void;
};

export default OverlayRight;
