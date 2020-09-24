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
  IonLabel,
} from "@ionic/react";
import "./styles.css";
import Page from "../../../components/Page";
import { PatientContext } from "../../../context/patient";

const ViewPatient: React.FC = () => {
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
              <IonList className="mt-5 width-75">
                <IonAvatar className="avatars">
                  <img
                    className="height-auto"
                    src={patientData.avatar}
                    alt="Avatar"
                  />
                </IonAvatar>
                <IonItem className="inputMargin">
                  <IonLabel>Nombre:</IonLabel>
                  <IonLabel className="text-bold">
                    {patientData.nombre}
                  </IonLabel>
                </IonItem>
                <IonItem className="inputMargin">
                  <IonLabel>Apellido:</IonLabel>
                  <IonLabel className="text-bold">
                    {patientData.apellido}
                  </IonLabel>
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
                <IonButton
                  className="formButton mt-5"
                  onClick={handleEditPatient}
                  expand="block"
                >
                  Editar paciente
                </IonButton>
                <IonButton
                  className="formButton red-buttom mt-5"
                  onClick={handleCancel}
                  expand="block"
                >
                  Cancelar
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
