/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from "react";
import {
  IonIcon,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonLoading,
} from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import { TEAyudoContext } from "../../context";

const SignInForm: React.FC<Props> = ({signIn}) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { data } = useContext(TEAyudoContext);
  const { isMobile, error, loading } = data;

  return (
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
          ></IonInput>
        </IonItem>
      </IonList>
      <a href="#">¿Olvidaste tu contraseña?</a>
      <IonButton
        className="formButton"
        type="submit"
        onClick={(e) => signIn(email!,password!, e)}
      >
        Iniciar sesión
      </IonButton>
      <IonLoading
        isOpen={loading!}
        message={"Trabajando..."}
        spinner="crescent"
      />
      {isMobile ? (
        <p>¿Aun no estás registradx? Desliza a la derecha para comenzar</p>
      ) : null}
    </form>
  );
};

interface Props {
  signIn: (email: string, password: string, e:any) => void;
}
export default SignInForm;
