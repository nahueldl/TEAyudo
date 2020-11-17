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
} from "@ionic/react";
import "./styles.css";
import PatientServices from "../../../services/patients.services";
import Page from "../../../components/Page";
import { PatientContext } from "../../../context/patient";

const AddPatient: React.FC<InfoPatientProps> = ({ patient }) => {
  const { token } = useContext(AuthenticationContext).authData;
  const { patientData, setPatientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, isLoading] = useState<boolean>(false);
  const [error, hasError] = useState<boolean>(false);
  const [name, setName] = useState<string>(
    patient !== undefined ? patient.name : ""
  );
  const [lastName, setLastName] = useState<string>(
    patient !== undefined ? patient.lastName : ""
  );
  const [birthday, setBirthday] = useState<string>(
    patient !== undefined ? patient.birthday : ""
  );
  const [avatar] = useState<string>(
    patient !== undefined
      ? patient.avatar
      : "https://api.adorable.io/avatars/" +
          Math.floor(Math.random() * 200) +
          "/"
  );
  const encodeImg = (filePath?: string) => {
    debugger;
    // Base64.prototype.encodeFile(filePath == undefined ? "" : filePath).then(
    //   (base64File: string) => {
    //     console.log(base64File);
    //     return base64File;
    //   },
    //   (err: any) => {
    //     console.log(err);
    //   }
    // );
  };

  const handleAddPatient = (e:any) => {
    e.preventDefault();
    isLoading(false);
    hasError(false);
    debugger;
    PatientServices.postNewPatient(token!, name, lastName)
      .then((res: any) => {
        debugger;
        patientData.patientsList?.push(res.data);
        setPatientData({ patientsList: patientData.patientsList });
        isLoading(false);
        goToListPatients();
      })
      .catch((_error: any) => {
        debugger;
        setErrorMessage(
          "Hubo un inconveniente creando al paciente, pruebe más tarde."
        );
        isLoading(false);
        hasError(true);
      });
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
                  type="button"
                  className="formButton mt-5"
                  onClick={e => handleAddPatient(e)}
                  expand="block"
                >
                  Agregar paciente
                </IonButton>

                <IonButton
                  type="button"
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
