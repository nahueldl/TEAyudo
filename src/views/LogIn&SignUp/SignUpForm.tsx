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

const SignUpForm: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { isMobile, error, loading } = useContext(TEAyudoContext);
  return (
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
        Registrarse
      </IonButton>
      <IonLoading
        isOpen={loading}
        message={"Trabajando..."}
        spinner="crescent"
      />
      {isMobile ? (
        <p>¿Ya estás registradx? Desliza a la izquierda para comenzar</p>
      ) : null}
    </form>
  );
};

interface Props {}

export default SignUpForm;
