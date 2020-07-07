import React from "react";
import { IonIcon, IonContent, IonButton, IonInput } from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import styles from "./styles.module.css";
import classNames from "classnames";

class LogInSignUpPage extends React.PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      showSignIn: true,
    };
  }

  handleActivationChange(value: boolean) {
    this.setState({ showSignIn: value }, () => {});
  }

  render() {
    return (
      <IonContent>
        <div className="container">
          <div className="formContainer signUpContainer">
            <form>
              <h1>Registrarse</h1>
              <div>
                <a href="#" className="social">
                  <IonIcon icon={logoGoogle} />
                </a>
                <a href="#" className="social">
                  <IonIcon icon={logoFacebook} />
                </a>
              </div>
              <span>O utiliza tu email</span>
              <IonInput autofocus clearInput placeholder="Nombre"></IonInput>
              <IonInput clearInput type="email" placeholder="Email"></IonInput>
              <IonInput
                clearInput
                type="password"
                placeholder="Contraseña"
              ></IonInput>
              <IonButton>Registrarse </IonButton>
            </form>
          </div>
          <div className="formContainer signInContainer rightPanelActive">
            <form action="#">
              <h1>Iniciar sesión</h1>
              <div>
                <a href="#" className="social">
                  <IonIcon icon={logoGoogle} />
                </a>
                <a href="#" className="social">
                  <IonIcon icon={logoFacebook} />
                </a>
              </div>
              <span>O utiliza tu cuenta</span>
              <IonInput
                autofocus
                clearInput
                type="email"
                placeholder="Email"
              ></IonInput>
              <IonInput
                clearInput
                type="password"
                placeholder="Contraseña"
              ></IonInput>
              <a href="#">¿Olvidaste tu contraseña?</a>
              <IonButton>Iniciar sesión</IonButton>
            </form>
          </div>
          <div className="overlayContainer">
            <div className="overlay">
              <div className="overlayPanel overlayLeft">
                <h1>¡Bienvenidx de vuelta!</h1>
                <p>
                  Para continuar, necesitamos que inicies sesión con tu cuenta
                </p>
                <IonButton onClick={() => this.handleActivationChange(true)}>
                  Iniciar sesión
                </IonButton>
              </div>
              <div className="overlayPanel overlayRight">
                <h1>¿Aún no estás registradx?</h1>
                <IonButton onClick={() => this.handleActivationChange(false)}>
                  Registrarse
                </IonButton>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    );
  }
}
interface Props {}

interface State {
  showSignIn: boolean;
}

export default LogInSignUpPage;
