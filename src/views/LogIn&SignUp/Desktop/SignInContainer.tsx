/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useCallback } from "react";
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

const SignInContainer: React.FC<Props> = ({ isMobile }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordValidation, setPasswordValidation] = useState<boolean>();
  const { navigate } = useContext(NavContext);

  const validatePassword = () => {
    if (password) {
      password.length > 8
        ? setPasswordValidation(true)
        : setPasswordValidation(false);
    } else setPasswordValidation(false);
  };

  const goForward = useCallback(() => navigate("/pacientes", "forward"), [
    navigate,
  ]);

  const handleSubmit = () => {};

  return (
    <div className="formContainer signInContainer">
      <form action="#">
        <h1>Iniciar sesión</h1>
        <div className="iconsContainer">
          <a href="#">
            <IonIcon className="icon" icon={logoGoogle} size="large" />
          </a>
          <a href="#">
            <IonIcon className="icon" icon={logoFacebook} size="large" />
          </a>
        </div>
        <span>O utiliza tu cuenta</span>
        <IonList>
          <IonItem className="inputMargin">
            <IonInput
              name="email"
              value={email}
              required
              clearInput
              type="email"
              placeholder="Email"
              onIonChange={(e) => setEmail(e.detail.value!)}
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
              onIonChange={(e) => setPassword(e.detail.value!)}
              onIonBlur={(e) => validatePassword()}
            ></IonInput>
          </IonItem>
        </IonList>
        <a href="#">¿Olvidaste tu contraseña?</a>
        <IonButton
          className="formButton"
          type="submit"
          onClick={(e) => handleSubmit()}
        >
          Iniciar sesión
        </IonButton>
        {isMobile ? (
          <div>
            <a href="#">
              ¿Aún no estás registradx? Hace click acá
            </a>
          </div>
        ) : null}
      </form>
    </div>
  );
};

interface Props {
  isMobile: boolean;
}

interface State {
  email: string;
  password: string;
}

export default SignInContainer;
