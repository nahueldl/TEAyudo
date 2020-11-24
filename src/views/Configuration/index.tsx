import Page from "../../components/Page";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { IonButton, IonCol, IonGrid, IonLoading, IonRow, NavContext } from "@ionic/react";
import "./styles.css";
import { clear } from "../../services/storage.services";
import { PatientContext } from "../../context/patient";
import { AuthenticationContext } from "../../context/authentication";
import { CategoryContext } from "../../context/category";
import { RegistrationContext } from "../../context/registration";
import PatientServices from "../../services/patients.services";

const ConfigurationPage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { setPatientData } = useContext(PatientContext);
  const { setCategoriaData } = useContext(CategoryContext);
  const { setRegistrationData } = useContext(RegistrationContext);
  const [loading, isLoading] = useState<boolean>(true);
  const [showChangePatient, setShowChangePatient] = useState<boolean>(false);

  useEffect(() => { getPatients(); }, []);

  const getPatients = () => {
    isLoading(true);
    PatientServices.getPatientsFromUser(authData.token!)
      .then((res: any) => {
        const length = res.data.length;
        if (length > 1) {
          setShowChangePatient(true);
        }
        isLoading(false);
      })
      .catch((error: any) => {
        isLoading(false);
      });
  };

  const goToLoginPage = useCallback(() => navigate("/login"), [navigate]);

  const logout = () => {
    setPatientData({patientsList:undefined});
    setCategoriaData({categoriaSelected: undefined, categoriasList: undefined});
    setRegistrationData({name: undefined, lastname: undefined, email: undefined, password: undefined});
    setAuthData({username: undefined, patientId: undefined, authenticated: undefined, token: undefined, tokenExpirationDate: undefined, role: undefined});
    clear().then((res) => goToLoginPage());
  };

  const changePatient = () => {
    setAuthData({patientId: undefined, authenticated: undefined});
    clear().then((res) => goToSelectPatient());
  }

  const goToSelectPatient = useCallback(() => navigate("/pacientes/seleccion", "forward"),  [navigate]);

  return (
    <Page pageTitle="Configuración" showHomeButton>
      <IonGrid className="overflow-auto">
        <IonRow>
          <IonCol size="5" sizeMd="4" className="margin-auto">
            {showChangePatient? (
              <div className="mt-5">
                <IonButton onClick={() => changePatient()} expand="block">Cambiar paciente</IonButton>
              </div>
            ):null}
            <div className="mt-5">
              <IonButton onClick={() => logout()} color="danger" expand="block">Cerrar sesión</IonButton>
            </div>
          </IonCol>
        </IonRow>
        <IonLoading
            isOpen={loading}
            message={"Trabajando..."}
            spinner="crescent"
        />
      </IonGrid>
    </Page>
  );
};

export default ConfigurationPage;
