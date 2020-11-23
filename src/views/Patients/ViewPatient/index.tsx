import React, { useContext, useCallback } from "react";
import {
  NavContext,
  IonGrid,
  IonRow,
  IonList,
  IonItem,
  IonButton,
  IonContent,
  IonAvatar,
  IonActionSheet,
} from "@ionic/react";
import "./styles.css";
import Page from "../../../components/Page";
import { PatientContext } from "../../../context/patient";
import { AuthenticationContext } from "../../../context/authentication";
import ProfessionalServices from "../../../services/professionals.services";
import PatientServices from "../../../services/patients.services";
import { trash, close } from "ionicons/icons";
import { useState } from "react";

const ViewPatient: React.FC = () => {
  const { authData } = useContext(AuthenticationContext);
  const { patientData, setPatientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);
  const [  showActionDeleteProfessional, setShowActionDeleteProfessional ] = useState(false);
  const [ loading, isLoading ] = useState<boolean>(false);
  const [ error, hasError ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>();

  const handleEditPatient = () => {
    goToEditPatient();
  };

  const handleDeleteProfessional = () => {
    isLoading(true);
    hasError(false);
    ProfessionalServices.deleteProfessional(
      authData.token!,
      authData.patientId!,
    )
      .then((res: any) => {
        PatientServices.getPatientsFromUser(authData.token!)
      .then((res: any) => {
        isLoading(false);
        setPatientData({ patientsList: res.data });
      })
      .catch((_error: any) => {
        isLoading(false);
        hasError(true);
      });
      })
      .catch(() => {
        setErrorMessage(
          "Hubo un problema al desasignar el profesional, por favor intente nuevamente más tarde."
        );
        isLoading(false);
        hasError(true);
      });
  };

  const goToEditPatient = useCallback(
    () => navigate("/pacientes/edicion", "back"),
    [navigate]
  );

  const handleCancel = () => {
    goToListPatients();
  };

  const goToListPatients = useCallback(() => navigate("/pacientes", "back"), [
    navigate,
  ]);

  return (
    <Page pageTitle="Informacion paciente" showHomeButton>
      <IonContent>
        <IonGrid className="container-patientAdd">
          <IonRow>
            <form className="form-no-background">
              <IonList className="mt-5">
                <IonAvatar className="avatars">
                  <img
                    className="height-auto"
                    src={patientData.patientSelected?.avatar}
                    alt="Avatar"
                  />
                </IonAvatar>
                <IonItem className="inputMargin">
                  <label>
                    Nombre:{"  "}
                    <strong className="text-bold pl-5">
                      {patientData.patientSelected?.nombre}
                    </strong>
                  </label>
                </IonItem>
                <IonItem className="inputMargin">
                  <label>
                    Apellido:{"  "}
                    <strong className="text-bold pl-5">
                      {patientData.patientSelected?.apellido}
                    </strong>
                  </label>
                </IonItem>
              </IonList>
              <div>
                {authData.role === 1 ? (
                <IonButton
                  className="formButton mt-5"
                  onClick={handleEditPatient}
                  expand="block">
                    Editar paciente
                </IonButton>
                ):(
                  <>
                  {/* <IonButton
                  className="formButtonmt-5"
                  color="danger"
                  onClick={() => setShowActionDeleteProfessional(true)}
                  expand="block"
                >
                  Desasignar paciente
                </IonButton>
                <IonActionSheet
                  isOpen={showActionDeleteProfessional}
                  onDidDismiss={() => setShowActionDeleteProfessional(false)}
                  buttons={[
                    {
                      text: "Desasignar",
                      role: "destructive",
                      icon: trash,
                      handler: () => {
                        handleDeleteProfessional();
                      },
                    },
                    {
                      text: "Cancelar",
                      icon: close,
                      role: "cancel",
                      handler: () => {
                        setShowActionDeleteProfessional(false);
                      },
                    },
                  ]}
                ></IonActionSheet> */}
                </>
                )}
                <IonButton
                  className="formButton mt-5"
                  onClick={handleCancel}
                  color={authData.role===1?"danger":"warning"}
                  expand="block"
                >
                  Volver
                </IonButton>
              </div>
            </form>
          </IonRow>
        </IonGrid>
      </IonContent>
    </Page>
  );
};

export default ViewPatient;
