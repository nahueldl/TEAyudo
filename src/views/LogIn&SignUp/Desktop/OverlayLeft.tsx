import React from "react";
import { IonButton } from "@ionic/react";
import "./styles.css";
const OverlayLeft: React.FC<Props> = ({handleActivationChange}) => {
  return (
    <div className="overlayPanel overlayLeft">
      <h1>¡Bienvenidx de vuelta!</h1>
      <p>Para continuar, necesitamos que inicies sesión con tu cuenta</p>
      <IonButton className="overlayButton" fill="outline" onClick={() => handleActivationChange(false)}>Iniciar sesión</IonButton>
    </div>
  );
};
interface Props {
  handleActivationChange: (value:boolean) => void;
}
export default OverlayLeft;
