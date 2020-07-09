import React from "react";
import {
  IonIcon,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonList,
} from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import "./styles.css";

class LogInSignUpPage extends React.PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      showSignIn: false,
    };
  }

  handleActivationChange(value: boolean) {
    this.setState({ showSignIn: value }, () => {});
  }

  render() {
    const classRightPanelActive = this.state.showSignIn
      ? "rightPanelActive"
      : "";
    return (
      <IonContent>
        <div className={`container ${classRightPanelActive}`}>
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
                    required
                    clearInput
                    type="email"
                    placeholder="Email"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput
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
                    required
                    clearInput
                    type="email"
                    placeholder="Email"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput
                    required
                    clearInput
                    type="password"
                    placeholder="Contraseña"
                  ></IonInput>
                </IonItem>
              </IonList>
              <a href="#">¿Olvidaste tu contraseña?</a>
              <IonButton routerLink="/pacientes">Iniciar sesión</IonButton>
            </form>
          </div>
          <div className="overlayContainer">
            <div className="overlay">
              <div className="overlayPanel overlayLeft">
                <h1>¡Bienvenidx de vuelta!</h1>
                <p>
                  Para continuar, necesitamos que inicies sesión con tu cuenta
                </p>
                <IonButton
                  fill="outline"
                  onClick={() => this.handleActivationChange(false)}
                >
                  Iniciar sesión
                </IonButton>
              </div>
              <div className="overlayPanel overlayRight">
                <h1>¿Aún no estás registradx?</h1>
                <p>Para comenzar, sólo necesitas crear una cuenta</p>
                <IonButton
                  fill="outline"
                  onClick={() => this.handleActivationChange(true)}
                >
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
