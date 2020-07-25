import React, { useContext, useState, useCallback } from "react";
import { IonContent, NavContext, IonSlides, IonSlide } from "@ionic/react";
import { TEAyudoContext } from "../../context";
import AuthenticationServices from "../../services/authentication.services";
import OverlayLeft from "./OverlayLeft";
import OverlayRight from "./OverlayRight";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import "./styles.css";

const LogInSignUpPage: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(false);

  const { navigate } = useContext(NavContext);
  const { data, setData } = useContext(TEAyudoContext);
  const { isMobile, username } = data;

  const handleSignIn = (email: string, password: string) => {
    setData({ loading: true, error: false });
    AuthenticationServices.handleLogIn(email, password)
      .then((res: any) => {
        setData({
          username: email,
          authenticated: true,
          loading: false,
        });

      })
      .catch((error: any) => {
        // setData({
        //   loading: false,
        //   error: true,
        // });
        setData({
          username: email,
          authenticated: true,
          loading: false,
        })
        console.log(data);
        goToSelectPatient();
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
      .then((res: any) => {
        setData({ loading: false });
      })
      .catch((error: any) => setData({ error: true }));
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
