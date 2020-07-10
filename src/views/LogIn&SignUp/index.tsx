import React from "react";
import { IonContent, isPlatform } from "@ionic/react";
import SignUpContainer from "./SignUpContainer";
import SignInContainer from "./SignInContainer";
import OverlayLeft from "./OverlayLeft";
import OverlayRight from "./OverlayRight";
import "./styles.css";

class LogInSignUpPageDesktop extends React.PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      showSignIn: false,
    };
    this.handleActivationChange = this.handleActivationChange.bind(this);
  }

  platform = isPlatform("desktop") ? "desktop" : "mobile";

  handleActivationChange(value: boolean) {
    this.setState({ showSignIn: value }, () => {});
  }

  handleSignUp(provider?: Provider) {}

  handleLogin(provider?: Provider) {}

  render() {
    const classRightPanelActive = this.state.showSignIn
      ? "rightPanelActive"
      : "";
    console.log(this.platform);
    return (
      <IonContent>
        <div className={`container ${classRightPanelActive}`}>
          <SignUpContainer />
          <SignInContainer />
          <div className="overlayContainer">
            <div className="overlay">
              <OverlayLeft
                handleActivationChange={this.handleActivationChange}
              />
              <OverlayRight
                handleActivationChange={this.handleActivationChange}
              />
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

type Provider = "facebook" | "google";

export default LogInSignUpPageDesktop;
