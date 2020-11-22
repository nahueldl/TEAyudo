import React, { useContext, useState, useCallback, useReducer } from "react";
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

const SIGN_IN_400 =
  "Hay un error con el mail o la contraseña proporcionadas, por favor intente nuevamente.";
const SIGN_UP_409 = "Ya existe un usuario con ese correo.";
const GENERIC_500 =
  "Hubo un problema inesperado en el servidor, por favor intente más tarde.";

const LogInSignUpPage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { setRegistrationData } = useContext(RegistrationContext);
  const { setAuthData } = useContext(AuthenticationContext);
  const { platformData } = useContext(PlatformContext);
  const { isMobile } = platformData;

  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [loading, isLoading] = useState<boolean>(false);
  const [errorSignIn, hasErrorSignIn] = useState<boolean>(false);
  const [errorSignInMsg, setErrorSignInMsg] = useState<string>("");
  const [errorSignUp, hasErrorSignUp] = useState<boolean>(false);
  const [errorSignUpMsg, setErrorSignUpMsg] = useState<string>("");

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleSignIn = ({ email, password }: any) => {
    isLoading(true);
    hasErrorSignIn(false);
    setErrorSignInMsg("");
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
        set("username", email);
        isLoading(false);
        goToSelectRole();
      })
      .catch((error: any) => {
        isLoading(false);
        console.log(error.response);
        const msg: string = error.response.data.msg;
        setErrorSignInMsg((prev) => prev + msg);
        forceUpdate();
        console.log(errorSignInMsg);
        hasErrorSignIn(true);
      });
  };

  const handleSignUpForm = ({ name, lastname, email, password }: any) => {
    isLoading(true);
    hasErrorSignUp(false);
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
        set("token", res.data.token);
        set("tokenExpirationDate", expirationDate);
        set("username", email!);
        isLoading(false);

        goToSelectRole();
      })
      .catch((error: any) => {
        isLoading(false);
        setErrorSignUpMsg(error.response.data.msg);

        hasErrorSignUp(true);
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
                error={errorSignIn}
                msg={errorSignInMsg}
              />
            </IonSlide>
            <IonSlide>
              <SignUpForm
                signUp={handleSignUpForm}
                loading={loading}
                error={errorSignUp}
                msg={errorSignUpMsg}
              />
            </IonSlide>
          </IonSlides>
        ) : (
          <div className={`container ${classRightPanelActive}`}>
            <div className="formContainer signUpContainer">
              <SignUpForm
                signUp={handleSignUpForm}
                loading={loading}
                error={errorSignUp}
                msg={errorSignUpMsg}
              />
            </div>
            <div className="formContainer signInContainer">
              <SignInForm
                signIn={handleSignIn}
                loading={loading}
                error={errorSignIn}
                msg={errorSignInMsg}
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
