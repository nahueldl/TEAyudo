import Page from "../../components/Page";
import React, { useCallback, useContext } from "react";
import { IonButton, NavContext } from "@ionic/react";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;
const ConfigurationPage: React.FC = () => {
  const { navigate } = useContext(NavContext);

  const goToLoginPage = useCallback(() => navigate("/login"), [navigate]);

  const logout = () => {
    Storage.clear().then((res) => goToLoginPage());
  };

  return (
    <Page pageTitle="Configuración" showHomeButton>
      <div>
        <IonButton onClick={() => logout()}>Cerrar sesión</IonButton>
      </div>
    </Page>
  );
};

export default ConfigurationPage;
