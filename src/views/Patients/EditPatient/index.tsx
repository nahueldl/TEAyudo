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
  IonLoading,
  IonAlert,
} from "@ionic/react";
import "./styles.css";
import { trash, close } from "ionicons/icons";
import PatientServices from "../../../services/patients.service";
import Page from "../../../components/Page";
import { PatientContext } from "../../../context/patient";

const EditPatient = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { patientData, setPatientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);
  const [auxName, setAuxName] = useState<string>(
    patientData.patientSelected?.nombre!
  );
  const [auxLastName, setAuxLastName] = useState<string>(
    patientData.patientSelected?.apellido!
  );
  const [auxAvatar, setAuxAvatar] = useState<string>(
    patientData.patientSelected?.avatar!
  );
  const [errorMessage, setErrorMessage] = useState<string>();
  const { error, loading } = authData;
  const [showActionDeletePatient, setShowActionDeletePatient] = useState(false);

  const handleEditPatient = () => {
    setAuthData({ loading: true, error: false });
    PatientServices.putEditPatient(
      authData.token!,
      patientData.patientSelected?.id_paciente,
      auxName!,
      auxLastName!,
      auxAvatar!
    )
      .then((res: any) => {
        setPatientData({
          patientSelected: {
            nombre: auxName,
            apellido: auxLastName,
            avatar: auxAvatar,
          },
        });
        getListPatients();
        setAuthData({ loading: false, error: false });
        goToViewPatient();
      })
      .catch((error: any) => {
        setErrorMessage(
          "Hubo un inconveniente editando al paciente, pruebe más tarde."
        );
        setAuthData({ loading: false, error: true });
        //mostrar mensaje con error
      });
  };

  const getListPatients = () => {
    PatientServices.getPatientsFromUser(authData.token!)
      .then((res: any) => {
        setPatientData({ patientsList: res.data });
      })
      .catch((_error: any) => {
        setAuthData({ loading: false, error: true });
      });
  };

  const handleDeletePatient = () => {
    setAuthData({ loading: true, error: false });
    PatientServices.deletePatient(
      authData.token!,
      patientData.patientSelected?.id_paciente!
    )
      .then((res: any) => {
        getListPatients();
        setAuthData({ loading: false, error: false });
        goToListPatients();
      })
      .catch((error: any) => {
        setErrorMessage(
          "Hubo un inconveniente eliminando al paciente, pruebe más tarde."
        );
        setAuthData({ loading: false, error: true });
        //mostrar mensaje con error
      });
  };

  const goToListPatients = useCallback(() => navigate("/pacientes", "back"), [
    navigate,
  ]);

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
              <IonLoading
                isOpen={loading!}
                message={"Trabajando..."}
                spinner="crescent"
              />
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
                        handleDeletePatient();
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
            <IonAlert
              isOpen={error!}
              animated
              backdropDismiss
              keyboardClose
              message={errorMessage}
              onDidDismiss={() => setAuthData({ error: false })}
            />
          </IonRow>
        </IonGrid>
      </IonContent>
    </Page>
  );
};

export default EditPatient;
