/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from "react";
import {
  IonIcon,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  NavContext,
} from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import "./styles.css";

const SignUpContainer: React.FC<Props> = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = useState<boolean>(false);
  const { navigate } = useContext(NavContext);

  return (
    <div className="formContainer signUpContainer">
      <form>
        <h1>Registrarse</h1>
        <div className="iconsContainer">
            <a href="#">
              <IonIcon className="icon" icon={logoGoogle} size="large" />
            </a>
            <a href="#">
              <IonIcon className="icon" icon={logoFacebook} size="large" />
            </a>
          </div>
        <span>O utiliza tu email</span>
        <IonList>
          <IonItem className="inputMargin"> 
            <IonInput
              name="Nombre"
              value={name}
              required
              clearInput
              placeholder="Nombre"
              onIonChange={e => setName(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem className="inputMargin">
            <IonInput
              name="email"
              value={email}
              required
              clearInput
              type="email"
              placeholder="Email"
              onIonChange={e => setEmail(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem className="inputMargin">
            <IonInput
              name="password"
              value={password}
              required
              clearInput
              type="password"
              placeholder="Contraseña"
              onIonChange={e => setPassword(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton type="submit" className="formButton">Registrarse </IonButton>
      </form>
    </div>
  );
};

interface Props {
  handleSignUp?: (provider: string) => any;
}

export default SignUpContainer;
