import React, { useContext, useState, useCallback } from "react";
import { AuthenticationContext } from "../../../context/authentication";
import {
  NavContext,
  IonGrid,
  IonRow,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonContent,
  IonAvatar,
  IonActionSheet,
  IonLoading,
  IonAlert,
  IonIcon,
} from "@ionic/react";
import "./styles.css";
import { trash, close, refreshOutline } from "ionicons/icons";
import PatientServices from "../../../services/patients.services";
import Page from "../../../components/Page";
import { PatientContext } from "../../../context/patient";
import { getBlobFromURL } from "../../../components/encodeImg/urlToBlob";
import { getBase64 } from "../../../components/encodeImg/encodeImg";

const EditPatient = () => {
  const { token } = useContext(AuthenticationContext).authData;
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

  const [showActionDeletePatient, setShowActionDeletePatient] = useState(false);
  const [loading, isLoading] = useState<boolean>(false);
  const [error, hasError] = useState<boolean>(false);

  const handleEditPatient = () => {
    isLoading(true);
    hasError(false);
    var blob = getBlobFromURL(auxAvatar);
    blob.then((blobRes:any) => {
      var base64 = getBase64(blobRes);
      base64.then((base64res: any) => {
    PatientServices.putEditPatient(
      token!,
      patientData.patientSelected?.id_paciente,
      auxName!,
      auxLastName!,
      base64res!
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
        isLoading(false);
        goToViewPatient();
      })
      .catch((error: any) => {
        setErrorMessage(
          "Hubo un inconveniente editando al paciente, pruebe más tarde."
        );
        isLoading(false);
        hasError(true); //mostrar mensaje con error
      });
    });
  })
  };

  const getListPatients = () => {
    isLoading(true);
    hasError(false);
    PatientServices.getPatientsFromUser(token!)
      .then((res: any) => {
        isLoading(false);
        setPatientData({ patientsList: res.data });
      })
      .catch((_error: any) => {
        isLoading(false);
        hasError(true);
      });
  };

  const handleDeletePatient = () => {
    isLoading(true);
    hasError(false);
    PatientServices.deletePatient(
      token!,
      patientData.patientSelected?.id_paciente!
    )
      .then((res: any) => {
        getListPatients();
        isLoading(false);
        goToListPatients();
      })
      .catch((error: any) => {
        setErrorMessage(
          "Hubo un inconveniente eliminando al paciente, pruebe más tarde."
        );
        isLoading(false);
        hasError(true); //mostrar mensaje con error
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
                <IonButton color="tertiary" size="small" onClick={() => setAuxAvatar("https://avatars.dicebear.com/api/bottts/"+Math.floor(Math.random() * 200)+".svg")}>
                  <IonIcon className="pl-5" slot="end" icon={refreshOutline}></IonIcon> Cambiar
                </IonButton> 
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
            />
          </IonRow>
        </IonGrid>
      </IonContent>
    </Page>
  );
};

export default EditPatient;
