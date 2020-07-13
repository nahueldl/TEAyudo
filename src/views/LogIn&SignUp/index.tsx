import React, { useContext, useCallback, useState } from "react";
import { IonContent, NavContext, IonSlides, IonSlide } from "@ionic/react";
import { TEAyudoContext } from "../../context";
import OverlayLeft from "./OverlayLeft";
import OverlayRight from "./OverlayRight";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import "./styles.css";

const LogInSignUpPage: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(false);

  const { navigate } = useContext(NavContext);
  const { isMobile, handleSignIn } = useContext(
    TEAyudoContext
  );

  const goToSelectPatient = useCallback(
    () => navigate("/pacientes", "forward"),
    [navigate]
  );

  const classRightPanelActive = showSignIn ? "rightPanelActive" : "";

  return (
    <IonContent>
      {isMobile ? (
        <IonSlides className="slides">
          <IonSlide>
            <SignInForm />
          </IonSlide>
          <IonSlide>
            <SignUpForm />
          </IonSlide>
        </IonSlides>
      ) : (
        <div className={`container ${classRightPanelActive}`}>
          <div className="formContainer signUpContainer">
            <SignUpForm />
          </div>
          <div className="formContainer signInContainer">
            <SignInForm />
          </div>
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


export default LogInSignUpPage;
