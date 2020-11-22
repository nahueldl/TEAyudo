import React, { useContext, useState, useCallback } from "react";
import {
  IonContent,
  NavContext,
  IonSlides,
  IonSlide,
  IonPage,
} from "@ionic/react";
import { AuthenticationContext } from "../../context/authentication";
import AuthenticationService from "../../services/authentication.services";
import OverlayLeft from "./OverlayLeft";
import OverlayRight from "./OverlayRight";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import "./styles.css";
import { PlatformContext } from "../../context/platform";
import { RegistrationContext } from "../../context/registration";
import { set } from "../../services/storage.services";
const LogInSignUpPage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { setRegistrationData } = useContext(RegistrationContext);
  const { setAuthData } = useContext(AuthenticationContext);
  const { platformData } = useContext(PlatformContext);
  const { isMobile } = platformData;

  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [loading, isLoading] = useState<boolean>(false);
  const [error, hasError] = useState<boolean>(false);

  const handleSignIn = ({ email, password }: any) => {
    isLoading(true);
    hasError(false);
    AuthenticationService.handleLogIn(email, password)
      .then((res: any) => {
        const expirationDate = calculateExpirationDate();
        setAuthData({
          token: res.data.token,
          tokenExpirationDate: expirationDate.toJSON(),
          username: email,
          authenticated: true,
        });
        set("token", res.data.token);
        set("tokenExpirationDate", expirationDate);
        set("username",email);
        isLoading(false);
        goToSelectRole();
      })
      .catch((_error: any) => {
        isLoading(false);
        hasError(true);
      });
  };

  const handleSignUpForm = ({ name, lastname, email, password }: any) => {
    isLoading(true);
    hasError(false);
    setRegistrationData({ name: name, lastname: lastname, email: email });
    AuthenticationService.handleSignUp(name, lastname, email, password)
      .then((res: any) => {
        const expirationDate = calculateExpirationDate();
        setAuthData({
          token: res.data.token,
          tokenExpirationDate: expirationDate.toJSON(),
          username: email,
          authenticated: true,
        });
        set("token", res.data.token );
        set(
          "tokenExpirationDate",
          expirationDate);
        set("username", email! );
        isLoading(false);

        goToSelectRole();
      })
      .catch((_error: any) => {
        isLoading(false);
        hasError(true);
      });
  };

  const goToSelectRole = useCallback(
    () => navigate("/roles/seleccion", "forward"),
    [navigate]
  );

  const calculateExpirationDate = () => {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const expirationHours = currentHours + 1;
    currentDate.setHours(expirationHours);
    return currentDate;
  };

  const classRightPanelActive = showSignIn ? "rightPanelActive" : "";

  return (
    <IonPage>
      <IonContent>
        {isMobile ? (
          <IonSlides className="slides">
            <IonSlide>
              <SignInForm
                signIn={handleSignIn}
                loading={loading}
                error={error}
              />
            </IonSlide>
            <IonSlide>
              <SignUpForm
                signUp={handleSignUpForm}
                loading={loading}
                error={error}
              />
            </IonSlide>
          </IonSlides>
        ) : (
          <div className={`container ${classRightPanelActive}`}>
            <div className="formContainer signUpContainer">
              <SignUpForm
                signUp={handleSignUpForm}
                loading={loading}
                error={error}
              />
            </div>
            <div className="formContainer signInContainer">
              <SignInForm
                signIn={handleSignIn}
                loading={loading}
                error={error}
              />
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
    </IonPage>
  );
};

export default LogInSignUpPage;
