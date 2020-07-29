import React, { useContext, useState, useCallback } from "react";
import {
  IonContent,
  NavContext,
  IonSlides,
  IonSlide,
  IonModal,
  IonButton,
} from "@ionic/react";
import { AuthenticationContext } from "../../context/authentication";
import AuthenticationServices from "../../services/authentication.services";
import OverlayLeft from "./OverlayLeft";
import OverlayRight from "./OverlayRight";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import "./styles.css";
import { PlatformContext } from "../../context/platform";

const LogInSignUpPage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { setAuthData } = useContext(AuthenticationContext);
  const { platformData } = useContext(PlatformContext);
  const { isMobile } = platformData;

  
  const [showSignIn, setShowSignIn] = useState<boolean>(false);

  const handleSignIn = ({ email, password }: any) => {
    setAuthData({ loading: false, error: true });
    AuthenticationServices.handleLogIn(email, password)
      .then((_res: any) => {
        setAuthData({
          username: email,
          authenticated: true,
          loading: false,
        });
        goToSelectPatient();
      })
      .catch((_error: any) => {
        setAuthData({
          loading: false,
          error: true,
        });
      });
  };

  const handleSignUp = ({ name, email, password }: any) => {
    console.log(name);
    setAuthData({ loading: true, error: false });
  };

  const goToSelectPatient = useCallback(
    () => navigate("/paciente", "forward"),
    [navigate]
  );

  const classRightPanelActive = showSignIn ? "rightPanelActive" : "";

  return (
    <IonContent>
      {isMobile ? (
        <IonSlides className="slides">
          <IonSlide>
            <SignInForm signIn={handleSignIn} />
          </IonSlide>
          <IonSlide>
            <SignUpForm signUp={handleSignUp} />
          </IonSlide>
        </IonSlides>
      ) : (
        <div className={`container ${classRightPanelActive}`}>
          <div className="formContainer signUpContainer">
            <SignUpForm signUp={handleSignUp} />
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
