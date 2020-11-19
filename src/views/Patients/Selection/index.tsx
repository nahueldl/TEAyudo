import React, { useContext, useCallback, useState, useEffect } from "react";
import "../styles.css";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  NavContext,
  IonPage,
  IonLoading,
  IonAlert,
  IonAvatar,
  IonButton,
  IonDatetime,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonLabel,
} from "@ionic/react";
import { AuthenticationContext } from "../../../context/authentication";
import PatientServices from "../../../services/patients.services";
import CardWithImage from "../../../components/CardWithImage";
import { Plugins } from "@capacitor/core";
import { PatientContext } from "../../../context/patient";
import AddPatient from "../AddPatient";
import { getBase64 } from "../../../utils/encodeImg";
import { getBlobFromURL } from "../../../utils/urlToBlob";
const { Storage } = Plugins;

const PatientSelection: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { setPatientData } = useContext(PatientContext);
  const { token } = authData;
  const { navigate } = useContext(NavContext);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, isLoading] = useState<boolean>(true);
  const [error, hasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [selection, isSelection] = useState<boolean>();
  const [addition, isAddition] = useState<boolean>();

  const [name, setName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [birthday, setBirthday] = useState<any>();
  const [avatar, setAvatar] = useState<string>(
    "https://avatars.dicebear.com/api/bottts/" +
      Math.floor(Math.random() * 200) +
      ".svg"
  );

  useEffect(() => {
    getPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPatients = () => {
    isLoading(true);
    hasError(false);
    isAddition(false);
    isSelection(false);
    PatientServices.getPatientsFromUser(token!)
      .then((res: any) => {
        const length = res.data.length;
        if (length === 0) {
          isLoading(false);
          isAddition(true);
        } else {
          if (length === 1) {
            isLoading(false);
            handlePatientSelection(res.data[0]);
          } else {
            isLoading(false);
            isSelection(true);
          }
        }
      })
      .catch((error: any) => {
        isLoading(false);
        hasError(true);
        setErrorMsg(error.response.data.msg);
      });
  };

  const handlePatientSelection = (patient: Patient) => {
    setAuthData({ patientId: patient.id_paciente.toString() });
    setAuthData({ patientName: patient.nombre });
    Storage.set({ key: "patientId", value: patient.id_paciente.toString() });
    Storage.set({ key: "patientName", value: patient.nombre });
    console.log("done");
    goToHome();
  };

  const addPatient = () => {
    debugger;
    isLoading(true);
    var blob = getBlobFromURL(avatar);
    blob.then((blobRes: any) => {
      var base64 = getBase64(blobRes);
      base64.then((base64res: any) => {
        PatientServices.postNewPatient(token!, name!, lastName!, base64res)
          .then((res: any) => {
            console.log("nuevo paciente!");
            isLoading(false);
            handlePatientSelection(res.data);
          })
          .catch((error: any) => {
            console.log(error);
            hasError(true);
            setErrorMsg(error.response.data.msg);
          });
      });
    });
  };

  const disableButton = () => {
    return !(name && lastName && birthday);
  };

  const goToHome = useCallback(() => navigate(`/`, "forward"), [navigate]);

  return (
    <IonPage>
      <IonContent>
        {loading ? (
          <IonLoading
            isOpen={loading}
            message={"Trabajando..."}
            spinner="crescent"
          />
        ) : error ? (
          <IonAlert
            isOpen={error!}
            animated
            backdropDismiss
            keyboardClose
            message={errorMsg}
          />
        ) : selection ? (
          <IonGrid className="container">
            <IonRow>
              <IonCol size="12">
                <h1 className="title">Selecciona un paciente para avanzar</h1>
              </IonCol>
            </IonRow>
            <IonRow>
              {patients?.map((patient: any, index: number) => (
                <IonCol key={index} size="12" sizeMd="6">
                  <CardWithImage
                    onClick={() => handlePatientSelection(patient)}
                    img={{
                      src: `${patient.avatar}`,
                      alt: `Avatar de ${patient.nombre}`,
                    }}
                    title={`${patient.nombre} ${patient.apellido}`}
                    touchable
                    patient={patient}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        ) : (
          <IonGrid>
            <IonRow>
              <IonCol>
                <h1 className="title">Agrega un paciente para avanzar</h1>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonAvatar>
                  <img src={avatar} alt="avatar" />
                </IonAvatar>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel>Nombre</IonLabel>
                <IonInput
                  value={name}
                  placeholder="Ingrese el nombre"
                  onIonChange={(e) => setName(e.detail.value!)}
                ></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel>Apellido</IonLabel>
                <IonInput
                  value={lastName}
                  placeholder="Ingrese el apellido"
                  onIonChange={(e) => setLastName(e.detail.value!)}
                ></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel>Fecha de nacimiento</IonLabel>
                <IonDatetime
                  displayFormat="DD MM YYYY"
                  placeholder="Fecha de nacimiento"
                  value={birthday}
                  onIonChange={(e) => setBirthday(e.detail.value!)}
                ></IonDatetime>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  disabled={disableButton()}
                  onClick={() => addPatient()}
                >
                  Aceptar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

interface Patient {
  id_paciente: number;
  nombre: string;
  apellido: string;
  avatar: string;
}

export default PatientSelection;
