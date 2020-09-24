import React, { useContext, useState, useCallback } from "react";
import { AuthenticationContext } from "../../../context/authentication";
import {
  NavContext,
  IonGrid,
  IonRow,
  IonList,
  IonItem,
  IonInput,
  IonDatetime,
  IonButton,
  IonContent,
  IonAvatar,
  IonActionSheet,
} from "@ionic/react";
import "./styles.css";
import { trash, close } from "ionicons/icons";
import PatientServices from "../../../services/patients.service";
import Page from "../../../components/Page";
import { PatientContext } from "../../../context/patient";

const EditPatient = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { patientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);
  const [auxName, setAuxName] = useState<string>(patientData.nombre!);
  const [auxLastName, setAuxLastName] = useState<string>(patientData.apellido!);
  const [auxAvatar, setAuxAvatar] = useState<string>(patientData.avatar!);

  const [showActionDeletePatient, setShowActionDeletePatient] = useState(false);

  const handleEditPatient = () => {
    setAuthData({ loading: true, error: false });
    PatientServices.putEditPatient(
      authData.token!,
      auxName!,
      auxLastName!,
      auxAvatar!
    )
      .then((res: any) => {
        //mostrar datos editados
      })
      .catch((error: any) => {
        //mostrar mensaje con error
      });
  };

  const handleDeletePatient = () => {
    setAuthData({ loading: true, error: false });
    PatientServices.deletePatient(authData.token!, auxName!)
      .then((res: any) => {
        // goToListPatients();
      })
      .catch((error: any) => {
        //mostrar mensaje con error
      });
  };

  const handleCancel = () => {
    goToViewPatient();
  };

  const goToViewPatient = useCallback(
    () => navigate("/pacientes/informacion", "back"),
    [navigate]
  );

  return (
    <Page pageTitle="Editar paciente" showHomeButton>
      <IonContent>
        <IonGrid className="container-patientAdd">
          <IonRow>
            <form className="form-no-background">
              <IonList className="mt-5">
                <IonAvatar className="avatars">
                  <img className="height-auto" src={auxAvatar} alt="Avatar" />
                </IonAvatar>
                <IonItem className="inputMargin">
                  <IonInput
                    name="name"
                    value={auxName}
                    required
                    clearInput
                    placeholder="Nombre"
                    onIonChange={(e) => setAuxName(e.detail.value!)}
                  />
                </IonItem>
                <IonItem className="inputMargin">
                  <IonInput
                    name="apellido"
                    value={auxLastName}
                    required
                    clearInput
                    placeholder="Apellido"
                    onIonChange={(e) => setAuxLastName(e.detail.value!)}
                  />
                </IonItem>
                {/* <IonItem className="p-0">
                  <IonDatetime
                    displayFormat="DD MM YYYY"
                    placeholder="Fecha nacimiento"
                    value={auxBirthday}
                    aria-required="true"
                    onIonChange={(e) => setAuxBirthday(e.detail.value!)}
                  ></IonDatetime>
                </IonItem> */}
              </IonList>
              <div>
                <IonButton
                  className="formButton green-buttom mt-5"
                  onClick={() => handleEditPatient()}
                  expand="block"
                >
                  Aceptar
                </IonButton>
                <IonButton
                  className="formButton mt-5"
                  onClick={handleCancel}
                  expand="block"
                >
                  Cancelar
                </IonButton>
                <IonButton
                  className="formButton red-buttom mt-5"
                  onClick={() => setShowActionDeletePatient(true)}
                  expand="block"
                >
                  Eliminar paciente
                </IonButton>
                <IonActionSheet
                  isOpen={showActionDeletePatient}
                  onDidDismiss={() => setShowActionDeletePatient(false)}
                  buttons={[
                    {
                      text: "Eliminar",
                      role: "destructive",
                      icon: trash,
                      handler: () => {
                        console.log("Delete clicked");
                      },
                    },
                    {
                      text: "Cancelar",
                      icon: close,
                      role: "cancel",
                      handler: () => {
                        setShowActionDeletePatient(false);
                      },
                    },
                  ]}
                ></IonActionSheet>
              </div>
            </form>
          </IonRow>
        </IonGrid>
      </IonContent>
    </Page>
  );
};

export default EditPatient;
