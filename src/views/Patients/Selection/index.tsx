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
  IonIcon,
  IonInput,
  IonItem,
  IonList,
} from "@ionic/react";
import { AuthenticationContext } from "../../../context/authentication";
import PatientServices from "../../../services/patients.services";
import CardWithImage from "../../../components/CardWithImage";
import { Plugins } from "@capacitor/core";
import { PatientContext } from "../../../context/patient";
import { getBase64 } from "../../../utils/encodeImg";
import { getBlobFromURL } from "../../../utils/urlToBlob";
import { refreshOutline } from "ionicons/icons";
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
          if(authData.role == 1) {
            isAddition(true);
          } else {
            setAuthData({ patientId: "NoAsignado" });
            goToHome();
          }
        } else {
          if (length === 1) {
            isLoading(false);
            handlePatientSelection(res.data[0]);
          } else {
            setPatients(res.data);
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
    setPatientData({ patientSelected: patient });
    goToHome();
  };

  const addPatient = () => {
    isLoading(true);
    var blob = getBlobFromURL(avatar);
    blob.then((blobRes: any) => {
      var base64 = getBase64(blobRes);
      base64.then((base64res: any) => {
        PatientServices.postNewPatient(token!, name!, lastName!, base64res)
          .then((res: any) => {
            isLoading(false);
            handlePatientSelection(res.data);
          })
          .catch((error: any) => {
            isLoading(false);
            hasError(true);
            setErrorMsg(error.response.data.msg);
          });
      });
    });
  };

  const enableSubmitButton = () => {
    return name && lastName && birthday;
  };

  const goToHome = useCallback(() => navigate("/inicio", "forward"), [
    navigate,
  ]);

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
                <IonCol key={index} size="4" sizeMd="6">
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
        ) : addition ? (
          <>
            <IonGrid className="container-patientAdd">
              <IonRow>
                <IonCol size="12">
                  <h1 className="title">Da de alta un paciente para avanzar</h1>
                </IonCol>
              </IonRow>
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
                    <IonButton
                      color="tertiary"
                      size="small"
                      onClick={() =>
                        setAvatar(
                          "https://avatars.dicebear.com/api/bottts/" +
                            Math.floor(Math.random() * 200) +
                            ".svg"
                        )
                      }
                    >
                      <IonIcon
                        className="pl-5"
                        slot="end"
                        icon={refreshOutline}
                      ></IonIcon>{" "}
                      Cambiar
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
                  </IonList>
                  <div>
                    <IonButton
                      type="button"
                      className="formButton mt-5"
                      onClick={(e) => addPatient()}
                      expand="block"
                      disabled={!enableSubmitButton()}
                    >
                      Agregar paciente
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
                  message={errorMsg}
                />
              </IonRow>
            </IonGrid>
          </>
        ) : null}
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
