/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useCallback } from "react";
import {
  IonIcon,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  NavContext,
  IonSlides,
  IonSlide,
} from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import "./styles.css";

const MobileContainer: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordValidation, setPasswordValidation] = useState<boolean>();
  const { navigate } = useContext(NavContext);

  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

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
    <IonSlides className="slides">
      <IonSlide>
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

          <p>¿Aun no estás registradx? Desliza a la derecha para comenzar</p>
        </form>
      </IonSlide>
      <IonSlide>
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
                onIonChange={(e) => setName(e.detail.value!)}
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
              ></IonInput>
            </IonItem>
          </IonList>
          <IonButton type="submit" className="formButton">
            Registrarse{" "}
          </IonButton>
          <p>¿Ya estás registradx? Desliza a la izquierda para comenzar</p>
        </form>
      </IonSlide>
    </IonSlides>
  );
};

interface State {
  email: string;
  password: string;
}

export default MobileContainer;
