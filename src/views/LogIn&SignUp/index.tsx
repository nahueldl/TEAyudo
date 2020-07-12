import React from "react";
import { IonContent, getPlatforms } from "@ionic/react";
import SignUpContainer from "./Desktop/SignUpContainer";
import SignInContainer from "./Desktop/SignInContainer";
import OverlayLeft from "./Desktop/OverlayLeft";
import OverlayRight from "./Desktop/OverlayRight";
import MobileContainer from "./Mobile/MobileContainer";
import "./styles.css";

class LogInSignUpPageDesktop extends React.PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      showSignIn: false,
    };
    this.handleActivationChange = this.handleActivationChange.bind(this);
  }

  platforms = getPlatforms();
  isMobile =
    this.platforms.includes("mobile") && !this.platforms.includes("tablet");

  handleActivationChange(value: boolean) {
    this.setState({ showSignIn: value }, () => {});
  }

  handleSignUp(provider?: Provider) {}

  handleLogin(provider?: Provider) {}

  render() {
    const classRightPanelActive = this.state.showSignIn
      ? "rightPanelActive"
      : "";
    console.log(getPlatforms());
    return (
      <IonContent>
        {this.isMobile ? (
          <MobileContainer />
        ) : (
          <div className={`container ${classRightPanelActive}`}>
            <SignUpContainer />
            <SignInContainer isMobile={false} />
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
        )}
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
