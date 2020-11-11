import Page from "../../components/Page";
import React, { useCallback, useContext } from "react";
import { IonButton, NavContext } from "@ionic/react";
const ConfigurationPage: React.FC = () => {

  const { navigate } = useContext(NavContext);

  const goToLoginPage = useCallback(() => navigate("/login"), [navigate])

  const logout = () => {
    localStorage.clear();
    goToLoginPage();
  }

  return (
    <Page pageTitle="Configuración" showHomeButton>
      <div>
        {/* TODO: Cambio de paciente, cambio de rol, cierre de sesión */}
        <IonButton onClick={() => logout()}>Cerrar sesión</IonButton>
      </div>
    </Page>
  );
};

export default ConfigurationPage;
