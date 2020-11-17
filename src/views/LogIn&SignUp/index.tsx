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
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

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
    setAuthData({ loading: true, error: false });
    AuthenticationService.handleLogIn(email, password)
      .then((res: any) => {
        const expirationDate = calculateExpirationDate();
        setAuthData({
          token: res.data.token,
          tokenExpirationDate: expirationDate.toJSON(),
          username: email,
          authenticated: true,
          loading: false,
        });
        Storage.set({ key: "token", value: res.data.token });
        Storage.set({
          key: "tokenExpirationDate",
          value: expirationDate.toJSON(),
        });
        Storage.set({ key: "username", value: email });
        goToSelectRole();
      })
      .catch((_error: any) => {
        setAuthData({
          loading: false,
          error: true,
        });
      });
  };

  const handleSignUpForm = ({ name, lastname, email, password }: any) => {
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
    handleSignUp(idType, idNumber, licenseNumber);
  };

  const handleSignUp = (
    idType?: string,
    idNumber?: number,
    licenseNumber?: number
  ) => {
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
      .then((res: any) => {
        setAuthData({
          username: email,
          authenticated: true,
          loading: false,
          token: res.data.token,
        });
        goToAddPatient();
      })
      .catch((_error: any) => {
        setAuthData({ loading: false, error: true });
      });
  };

  const goToAddPatient = useCallback(
    () => navigate("/pacientes/alta", "forward"),
    [navigate]
  );

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
    <IonContent>
      {isMobile ? (
        <IonSlides className="slides">
          <IonSlide>
            <SignInForm signIn={handleSignIn} />
          </IonSlide>
          <IonSlide>
            <SignUpForm signUp={handleSignUpForm} />
          </IonSlide>
        </IonSlides>
      ) : (
        <div className={`container ${classRightPanelActive}`}>
          <div className="formContainer signUpContainer">
            <SignUpForm signUp={handleSignUpForm} />
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
