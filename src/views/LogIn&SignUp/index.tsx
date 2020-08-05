import React, { useContext, useState, useCallback } from "react";
import { IonContent, NavContext, IonSlides, IonSlide } from "@ionic/react";
import { AuthenticationContext } from "../../context/authentication";
import AuthenticationService from "../../services/authentication.services";
import OverlayLeft from "./OverlayLeft";
import OverlayRight from "./OverlayRight";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import "./styles.css";
import { PlatformContext } from "../../context/platform";
import ChooseRoleModal from "./ChooseRoleModal";
import { RegistrationContext } from "../../context/registration";

const LogInSignUpPage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { registrationData, setRegistrationData } = useContext(
    RegistrationContext
  );
  const { setAuthData } = useContext(AuthenticationContext);
  const { platformData } = useContext(PlatformContext);
  const { isMobile } = platformData;

  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSignIn = ({ email, password }: any) => {
    setAuthData({ loading: false, error: false });
    AuthenticationService.handleLogIn(email, password)
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

  const handleSignUp = ({ name, lastname, email, password }: any) => {
    setRegistrationData({
      name: name,
      lastname: lastname,
      email: email,
      password: password,
    });
    setShowModal(true);
  };

  const handleRolSelection = (
    idType?: string,
    idNumber?: number,
    licenseNumber?: number
  ) => {
    setShowModal(false);
    setAuthData({ loading: true, error: false });
    const { name, lastname, email, password } = registrationData;
    AuthenticationService.handleSignUp(
      name!,
      lastname!,
      email!,
      password!,
      idType,
      (idNumber as unknown) as string,
      (licenseNumber as unknown) as string
    )
      .then((_res: any) => {
        setAuthData({ username: email, authenticated: true, loading: false });
        goToAddPatient();
      })
      .catch((_error: any) => {
        setAuthData({ loading: false, error: true });
      });
  };

  const goToSelectPatient = useCallback(
    () => navigate("/pacientes/seleccion", "forward"),
    [navigate]
  );

  const goToAddPatient = useCallback(
    () => navigate("/pacientes/alta", "forward", "replace"),
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
      <ChooseRoleModal
        isOpen={showModal}
        handleSelection={handleRolSelection}
      />
    </IonContent>
  );
};

export default LogInSignUpPage;
