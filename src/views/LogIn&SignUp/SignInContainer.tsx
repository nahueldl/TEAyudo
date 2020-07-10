import React from "react";
import { IonIcon, IonList, IonItem, IonInput, IonButton } from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import "./styles.css";

class SignInContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any, name: string) {
    //this.setState({ name: event.detail.value });
  }

  handleSubmit(event: any) {
    alert("Se hizo submit");
    event.preventDefault();
  }

  render() {
    const { email, password } = this.state;
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
                onIonChange={(e) => this.handleChange(e, "email")}
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
                onChange={this.handleChange}
              ></IonInput>
            </IonItem>
          </IonList>
          <a href="#">¿Olvidaste tu contraseña?</a>
          <IonButton routerLink="/pacientes">Iniciar sesión</IonButton>
        </form>
      </div>
    );
  }
}

interface Props {}

interface State {
  email: string;
  password: string;
}

export default SignInContainer;
