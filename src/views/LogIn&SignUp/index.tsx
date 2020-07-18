import React, { useContext, useState } from "react";
import { IonContent, NavContext, IonSlides, IonSlide } from "@ionic/react";
import { TEAyudoContext } from "../../context";
import AuthenticationServices from "../../services/authentication.services"
import OverlayLeft from "./OverlayLeft";
import OverlayRight from "./OverlayRight";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import "./styles.css";

const LogInSignUpPage: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(false);

  const { navigate } = useContext(NavContext);
  const { data } = useContext(TEAyudoContext);
  const { isMobile } = data;

  const handleSignIn = (email: string, password: string) => {
    AuthenticationServices.handleLogIn(email, password).then();
  }

  // // const handleSignUp = (email: string,)
  // const goToSelectPatient = useCallback(
  //   // () => navigate(`/${username}/pacientes`, "forward"),
  //   // [navigate, username]
  // );

  const classRightPanelActive = showSignIn ? "rightPanelActive" : "";

  return (
    <IonContent>
      {isMobile ? (
        <IonSlides className="slides">
          <IonSlide>
            <SignInForm signIn={handleSignIn} />
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
            <SignInForm signIn={handleSignIn} />
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
