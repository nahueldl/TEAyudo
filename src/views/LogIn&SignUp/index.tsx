import React, { useContext, useCallback, useState } from "react";
import { IonContent, NavContext } from "@ionic/react";
import SignUpContainer from "./Desktop/SignUpContainer";
import SignInContainer from "./Desktop/SignInContainer";
import OverlayLeft from "./Desktop/OverlayLeft";
import OverlayRight from "./Desktop/OverlayRight";
import MobileContainer from "./Mobile/MobileContainer";
import "./styles.css";
import { TEAyudoContext } from "../../context";

const LogInSignUpPageDesktop: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(false);

  const { navigate } = useContext(NavContext);

  const handleSignUp = () => {};

  const handleSignIn = () => {};

  const goForward = useCallback(() => navigate("/pacientes", "forward"), [
    navigate,
  ]);

  const appContext = useContext(TEAyudoContext);

  const classRightPanelActive = showSignIn ? "rightPanelActive" : "";

  return (
    <IonContent>
      {appContext.isMobile ? (
        <MobileContainer />
      ) : (
        <div className={`container ${classRightPanelActive}`}>
          <SignUpContainer />
          <SignInContainer />
          <div className="overlayContainer">
            <div className="overlay">
              <OverlayLeft handleActivationChange={setShowSignIn} />
              <OverlayRight handleActivationChange={setShowSignIn} />
            </div>
          </div>
        </div>
      )}
    </IonContent>
  );
};

type Provider = "facebook" | "google";

export default LogInSignUpPageDesktop;
