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
import "./styles.css";
import { trash, close } from "ionicons/icons";
import PatientServices from "../../../services/patients.service";

const InfoPatient: React.FC<InfoPatientProps> = ({ title, patient }) => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { navigate } = useContext(NavContext);
  const [titlePatient, setTitle] = useState<string>(
    title !== undefined ? title : ""
  );
  const [name, setName] = useState<string>(
    patient !== undefined ? patient.name : ""
  );
  const [lastName, setLastName] = useState<string>(
    patient !== undefined ? patient.lastName : ""
  );
  const [birthday, setBirthday] = useState<string>(
    patient !== undefined ? patient.birthday : ""
  );
  const [fase, setFase] = useState<any>(
    patient !== undefined ? patient.fase : ""
  );
  const [avatar, setAvatar] = useState<string>(
    patient !== undefined
      ? patient.avatar
      : "https://api.adorable.io/avatars/50/"
  );
  const fases = [1, 2, 3, 4];
  const auxPatient = patient;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showActionDeletePatient, setShowActionDeletePatient] = useState(false);

  const handleAddPatient = () => {
    debugger;
    setAuthData({ loading: true, error: false });
    PatientServices.postNewPatient(
      authData.token!,
      name,
      lastName
      // birthday,
      // fase,
      //avatar
    )
      .then((res: any) => {
        debugger;
        setAuthData({ loading: false, error: false });
        // goToListPatients();
      })
      .catch((error: any) => {
        debugger;
        setAuthData({ loading: false, error: true });
        //mostrar mensaje con error
      });
  };

  const editPatient = (opcion: boolean) => {
    if (opcion) {
      setTitle("Editar paciente");
      setIsEdit(true);
    } else {
      setName(auxPatient!.name);
      setLastName(auxPatient!.lastName);
      setBirthday(auxPatient!.birthday);
      setFase(auxPatient!.fase);
      setAvatar(auxPatient!.avatar);
      setTitle("");
      setIsEdit(false);
    }
  };

  const handleEditPatient = () => {
    setAuthData({ loading: true, error: false });
    PatientServices.putEditPatient(name, lastName, birthday, fase)
      .then((res: any) => {
        //mostrar datos editados
      })
      .catch((error: any) => {
        //mostrar mensaje con error
      });
  };

  const handleDeletePatient = () => {
    setAuthData({ loading: true, error: false });
    PatientServices.deletePatient(name)
      .then((res: any) => {
        // goToListPatients();
      })
      .catch((error: any) => {
        //mostrar mensaje con error
      });
  };

  return (
    <IonContent>
      <IonGrid className="container-patientAdd">
        <IonRow>
          <form className="form-no-background">
            <h1>{titlePatient}</h1>
            <IonList className="mt-5">
              <IonAvatar className="avatars">
                <img className="height-auto" src={avatar} alt="Avatar" />
              </IonAvatar>
              <IonItem className="inputMargin">
                <IonInput
                  name="name"
                  value={name}
                  required
                  disabled={patient !== undefined && !isEdit}
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
                  disabled={patient !== undefined && !isEdit}
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
                  disabled={patient !== undefined && !isEdit}
                  aria-required="true"
                  onIonChange={(e) => setBirthday(e.detail.value!)}
                ></IonDatetime>
              </IonItem>
              <IonItem className="p-0">
                <IonLabel>Seleccione fase</IonLabel>
                <IonSelect
                  value={fase}
                  okText="Aceptar"
                  placeholder="Fase"
                  className="full-width"
                  disabled={patient !== undefined && !isEdit}
                  title={"pepe"}
                  cancelText="Cerrar"
                  onIonChange={(e) => setFase(e.detail.value)}
                >
                  {fases.map((item, index) => (
                    <IonSelectOption value={item} key={index}>
                      {item}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
            {patient === undefined ? (
              <IonButton
                type="submit"
                className="formButton mt-5"
                onClick={handleAddPatient}
                expand="block"
              >
                Agregar paciente
              </IonButton>
            ) : !isEdit ? (
              <div>
                <IonButton
                  className="formButton mt-5"
                  onClick={() => editPatient(true)}
                  expand="block"
                >
                  Editar paciente
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
            ) : (
              <div>
                <IonButton
                  className="formButton mt-5"
                  onClick={handleEditPatient}
                  expand="block"
                >
                  Acetpar
                </IonButton>
                <IonButton
                  className="formButton red-buttom mt-5"
                  onClick={() => editPatient(false)}
                  expand="block"
                >
                  Cancelar
                </IonButton>
              </div>
            )}
          </form>
        </IonRow>
      </IonGrid>
    </IonContent>
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
  fase: any;
  avatar: string;
}

export default InfoPatient;
