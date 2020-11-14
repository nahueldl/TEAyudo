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
  IonContent,
  IonAvatar,
  IonAlert,
  IonLoading,
  IonButton,
  IonIcon,
} from "@ionic/react";
import "./styles.css";
import PatientServices from "../../../services/patients.services";
import Page from "../../../components/Page";
import { PatientContext } from "../../../context/patient";
import { getBase64 } from "../../../components/encodeImg/encodeImg";
import { getBlobFromURL } from "../../../components/encodeImg/urlToBlob";
import { refreshOutline } from "ionicons/icons";

const AddPatient: React.FC<InfoPatientProps> = ({ patient }) => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { patientData, setPatientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { error, loading } = authData;
  const [name, setName] = useState<string>(
    patient !== undefined ? patient.name : ""
  );
  const [lastName, setLastName] = useState<string>(
    patient !== undefined ? patient.lastName : ""
  );
  const [birthday, setBirthday] = useState<string>(
    patient !== undefined ? patient.birthday : ""
  );
  const [avatar, setAvatar] = useState<string>(
    patient !== undefined
      ? patient.avatar
      : "https://avatars.dicebear.com/api/bottts/" +
          Math.floor(Math.random() * 200) +
          ".svg"
  );

  const handleAddPatient = () => {
    setAuthData({ loading: true, error: false });
    var blob = getBlobFromURL(avatar);
    blob.then((blobRes:any) => {
      var base64 = getBase64(blobRes);
      base64.then((base64res: any) => {
        PatientServices.postNewPatient(authData.token!, name, lastName, base64res)
          .then((res: any) => {
            patientData.patientsList?.push(res.data);
            setPatientData({patientsList: patientData.patientsList});
            setAuthData({ loading: false, error: false });
            goToListPatients();
          })
          .catch((_error: any) => {
            setErrorMessage(
              "Hubo un inconveniente creando al paciente, pruebe más tarde."
            );
            setAuthData({ loading: false, error: true });
          });
      })
    })
  };

  const handleCancel = () => {
    goToListPatients();
  };

  const goToListPatients = useCallback(() => navigate("/pacientes", "back"), [
    navigate,
  ]);

  return (
    <Page pageTitle="Agregar paciente" showHomeButton>
      <IonContent>
        <IonGrid className="container-patientAdd">
          <IonRow>
            <form className="form-no-background">
              <IonList className="mt-5">
                <IonAvatar className="avatars">
                  <img
                    id="avatar"
                    className="height-auto"
                    src={avatar}
                    alt="Avatar"
                  />
                </IonAvatar>
                <IonButton color="tertiary" size="small" onClick={() => setAvatar("https://avatars.dicebear.com/api/bottts/"+Math.floor(Math.random() * 200)+".svg")}>
                  <IonIcon className="pl-5" slot="end" icon={refreshOutline}></IonIcon> Cambiar
                </IonButton> 
                <IonItem className="inputMargin">
                  <IonInput
                    name="name"
                    value={name}
                    required
                    clearInput
                    placeholder="Nombre"
                    onIonChange={(e) => setName(e.detail.value!)}
                  />
                </IonItem>
                <IonItem className="inputMargin">
                  <IonInput
                    name="apellido"
                    value={lastName}
                    required
                    clearInput
                    placeholder="Apellido"
                    onIonChange={(e) => setLastName(e.detail.value!)}
                  />
                </IonItem>
                <IonItem className="p-0">
                  <IonDatetime
                    displayFormat="DD MM YYYY"
                    placeholder="Fecha nacimiento"
                    value={birthday}
                    aria-required="true"
                    onIonChange={(e) => setBirthday(e.detail.value!)}
                  ></IonDatetime>
                </IonItem>
              </IonList>
              <div>
                <IonButton
                  className="formButton mt-5"
                  onClick={handleAddPatient}
                  expand="block"
                >
                  Agregar paciente
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
            <IonLoading
              isOpen={loading!}
              message={"Trabajando..."}
              spinner="crescent"
            />
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

interface InfoPatientProps {
  title?: string;
  patient?: Patient;
}

interface Patient {
  name: string;
  lastName: string;
  birthday: string;
  avatar: string;
}

export default AddPatient;
