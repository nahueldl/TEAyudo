/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, useCallback } from "react";
import { IonContent, NavContext, IonSlides, IonSlide } from "@ionic/react";
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
  const { authData, setData } = useContext(AuthenticationContext);
  const { username } = authData;
  const { platformData } = useContext(PlatformContext);
  const { isMobile } = platformData;

  const [showSignIn, setShowSignIn] = useState<boolean>(false);

  const handleSignIn = (email: string, password: string) => {
    setData({ loading: false, error: true });
    AuthenticationServices.handleLogIn(email, password)
      .then((_res: any) => {
        setData({
          username: email,
          authenticated: true,
          loading: false,
        });
        goToSelectPatient();
      })
      .catch((_error: any) => {
        setData({
          loading: false,
          error: true,
        });
      });
  };

  const handleSignUp = (
    name: string,
    email: string,
    password: string,
    idDoc?: string,
    docNumber?: string,
    licenseNumber?: string
  ) => {
    setData({ loading: true, error: false });
    AuthenticationServices.handleSignUp(
      name,
      email,
      password,
      idDoc,
      docNumber,
      licenseNumber
    )
      .then((_res: any) => {
        setData({ loading: false });
      })
      .catch((_error: any) => setData({ error: true }));
  };

  const goToSelectPatient = useCallback(
    () => navigate(`/${username}/pacientes`, "forward"),
    [navigate, username]
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
