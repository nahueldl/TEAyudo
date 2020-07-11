import React, { useState, useContext, useCallback } from "react";
import { IonIcon, IonList, IonItem, IonInput, IonButton, NavContext } from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import "./styles.css";

const SignInContainer: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = useState<boolean>(false);
  const {navigate} = useContext(NavContext);
  
  const validateEmail = () => {
    email ? setEmailValidation(true) : setEmailValidation(false);
  }

  const validatePassword = () => {
    password ? setPasswordValidation(true) : setPasswordValidation(false);
  }

  const validateButton = () => {
    return !(emailValidation && passwordValidation);
  }

  const handleSubmit = useCallback(() => navigate('/pacientes', 'forward'), [navigate]);

  return (
    <div className="formContainer signInContainer">
      <form action="#">
        <h1>Iniciar sesión</h1>
        <div>
          <a href="#">
            <IonIcon icon={logoGoogle} size="large" />
          </a>
          <a href="#">
            <IonIcon icon={logoFacebook} size="large" />
          </a>
        </div>
        <span>O utiliza tu cuenta</span>
        <IonList>
          <IonItem>
            <IonInput
              name="email"
              value={email}
              required
              clearInput
              type="email"
              placeholder="Email"
              onIonChange={e => setEmail(e.detail.value!)}
              onIonBlur={ e => validateEmail()}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              name="password"
              value={password}
              required
              clearInput
              type="password"
              placeholder="Contraseña"
              onIonChange={e => setPassword(e.detail.value!)}
              onIonBlur={e => validatePassword()}
            ></IonInput>
          </IonItem>
        </IonList>
        <a href="#">¿Olvidaste tu contraseña?</a>
        <IonButton disabled={validateButton()} onClick={handleSubmit}>Iniciar sesión</IonButton>
      </form>
    </div>
  );
};

interface Props {}

interface State {
  email: string;
  password: string;
}

export default SignInContainer;
