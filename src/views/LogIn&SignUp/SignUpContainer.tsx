import React from "react";
import { IonIcon, IonList, IonItem, IonInput, IonButton } from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import "./styles.css";

const SignUpContainer: React.FC<Props> = () => {
  return (
    <div className="formContainer signUpContainer">
      <form>
        <h1>Registrarse</h1>
        <div>
          <a href="#">
            <IonIcon icon={logoGoogle} size="large" />
          </a>
          <a href="#">
            <IonIcon icon={logoFacebook} size="large" />
          </a>
        </div>
        <span>O utiliza tu email</span>
        <IonList>
          <IonItem>
            <IonInput required clearInput placeholder="Nombre"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
            name="email"
            value="email"
              required
              clearInput
              type="email"
              placeholder="Email"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
            name="email"
            value="email"
              required
              clearInput
              type="password"
              placeholder="Contraseña"
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton>Registrarse </IonButton>
      </form>
    </div>
  );
};

interface Props {
  handleSignUp?: (provider: string) => any;
}

export default SignUpContainer;
