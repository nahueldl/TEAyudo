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
} from "@ionic/react";
import "./styles.css";
import Page from "../../../components/Page";
import { PatientContext } from "../../../context/patient";
import { AuthenticationContext } from "../../../context/authentication";

const ViewPatient: React.FC = () => {
  const { authData } = useContext(AuthenticationContext);
  const { patientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);

  const handleEditPatient = () => {
    goToEditPatient();
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
                {/* <IonItem className="p-0">
                  <IonDatetime
                    displayFormat="DD MM YYYY"
                    placeholder="Fecha nacimiento"
                    value={patientData.birthday}
                    disabled={true}
                  ></IonDatetime>
                </IonItem> */}
              </IonList>
              <div>
                {authData.role == 1 ? (
                <IonButton
                  className="formButton mt-5"
                  onClick={handleEditPatient}
                  expand="block">
                    Editar paciente
                </IonButton>
                ):null}
                <IonButton
                  className="formButton red-buttom mt-5"
                  onClick={handleCancel}
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
