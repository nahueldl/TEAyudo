import React, { useContext } from "react";
import { IonContent } from "@ionic/react";
import SignUpContainer from "./Desktop/SignUpContainer";
import SignInContainer from "./Desktop/SignInContainer";
import OverlayLeft from "./Desktop/OverlayLeft";
import OverlayRight from "./Desktop/OverlayRight";
import MobileContainer from "./Mobile/MobileContainer";
import "./styles.css";
import { TEAyudoContext } from "../../context";

class LogInSignUpPageDesktop extends React.PureComponent<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      showSignIn: false,
    };
    this.handleActivationChange = this.handleActivationChange.bind(this);
  }

  appContext = useContext(TEAyudoContext);

  handleActivationChange(value: boolean) {
    this.setState({ showSignIn: value }, () => {});
  }

  handleSignUp() {}

  handleLogin() {}

  render() {
    const { isMobile } = this.appContext;
    const classRightPanelActive = this.state.showSignIn
      ? "rightPanelActive"
      : "";
  
    return (
      <IonContent>
        {isMobile ? (
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
