import React, { useState, useContext } from "react";
import {
  IonIcon,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import { AuthenticationContext } from "../../context/authentication";
import { PlatformContext } from "../../context/platform";

const SignInForm: React.FC<Props> = ({ signIn }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { authData, setData } = useContext(AuthenticationContext);
  const { error, loading } = authData;
  const { platformData } = useContext(PlatformContext);
  const { isMobile } = platformData;
  return (
    <>
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
          onClick={(e) => signIn(email!, password!)}
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
      <IonAlert
        isOpen={error!}
        animated
        backdropDismiss
        keyboardClose
        message={
          "Hubo un error al iniciar sesión, por favor intenta nuevamente más tarde"
        }
        onDidDismiss={() => setData({ error: false })}
      />
    </>
  );
};

interface Props {
  signIn: (email: string, password: string) => void;
}
export default SignInForm;
