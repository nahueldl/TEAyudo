import Page from "../../components/Page";
import React, { useCallback, useContext } from "react";
import { IonButton, IonCol, IonGrid, IonRow, NavContext } from "@ionic/react";
import "./styles.css";
import { clear } from "../../services/storage.services";
import { PatientContext } from "../../context/patient";
import { AuthenticationContext } from "../../context/authentication";
import { CategoryContext } from "../../context/category";
import { ProfessionalContext } from "../../context/professional";
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

  const goToSelectPatient = useCallback(() => navigate("/pacientes/seleccion", "forward"),  [navigate]);

  return (
    <Page pageTitle="Configuración" showHomeButton>
      <IonGrid className="overflow-auto">
        <IonRow>
          <IonCol size="5" sizeMd="4" className="margin-auto">
            <div className="mt-5">
              <IonButton onClick={() => goToSelectPatient()} expand="block">Cambiar paciente</IonButton>
            </div>
            <div className="mt-5">
              <IonButton onClick={() => logout()} color="danger" expand="block">Cerrar sesión</IonButton>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  );
};

export default ConfigurationPage;
