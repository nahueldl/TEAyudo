import Page from "../../components/Page";
import React, { useCallback, useContext } from "react";
import { IonButton, NavContext } from "@ionic/react";
import "./styles.css";
import { clear } from "../../services/storage.services";
import { PatientContext } from "../../context/patient";
import { AuthenticationContext } from "../../context/authentication";
import { CategoryContext } from "../../context/category";
import { RegistrationContext } from "../../context/registration";

const ConfigurationPage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { setAuthData } = useContext(AuthenticationContext);
  const { setPatientData } = useContext(PatientContext);
  const { setCategoriaData } = useContext(CategoryContext);
  const { setRegistrationData } = useContext(RegistrationContext);

  const goToLoginPage = useCallback(() => navigate("/login"), [navigate]);

  const logout = () => {
    setPatientData({patientsList:undefined});
    setCategoriaData({categoriaSelected: undefined, categoriasList: undefined});
    setRegistrationData({name: undefined, lastname: undefined, email: undefined, password: undefined});
    setAuthData({username: undefined, patientId: undefined, authenticated: undefined, token: undefined, tokenExpirationDate: undefined, role: undefined});
    clear().then((res) => goToLoginPage());
  };

  return (
    <Page pageTitle="Configuración" showHomeButton>
      <div className="logout">
        <IonButton onClick={() => logout()}>Cerrar sesión</IonButton>
      </div>
    </Page>
  );
};

export default ConfigurationPage;
