import React, { useContext, useState, useCallback } from "react";
import { AuthenticationContext } from "../../../context/authentication";
import {
  NavContext,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonInput,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonContent,
  IonLabel,
  IonAvatar,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg,
  IonIcon,
  IonActionSheet,
} from "@ionic/react";
import { Base64 } from "@ionic-native/base64/ngx";
import "./styles.css";
import PatientServices from "../../../services/patients.service";
import Page from "../../../components/Page";

const AddPatient: React.FC<InfoPatientProps> = ({ title, patient }) => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { navigate } = useContext(NavContext);
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
      : "https://api.adorable.io/avatars/50/"
  );
  const auxPatient = patient;

  const handleAddPatient = () => {
    setAuthData({ loading: true, error: false });
    PatientServices.postNewPatient(authData.token!, name, lastName, avatar)
      .then((res: any) => {
        debugger;
        setAuthData({ loading: false, error: false });
        // goToListPatients();
      })
      .catch((_error: any) => {
        debugger;
        setAuthData({ loading: false, error: true });
        //mostrar mensaje con error
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
                  <img className="height-auto" src={avatar} alt="Avatar" />
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
                  type="submit"
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
