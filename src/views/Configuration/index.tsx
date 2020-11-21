import Page from "../../components/Page";
import React, { useCallback, useContext } from "react";
import { IonButton, NavContext } from "@ionic/react";
import { Plugins } from "@capacitor/core";
import "./styles.css";
import { PatientContext } from "../../context/patient";

const { Storage } = Plugins;
const ConfigurationPage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { setPatientData } = useContext(PatientContext);

  const goToLoginPage = useCallback(() => navigate("/login"), [navigate]);

  const logout = () => {
    setPatientData({patientsList:undefined});
    Storage.clear().then((res) => goToLoginPage());
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
