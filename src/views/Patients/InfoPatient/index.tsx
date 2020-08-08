import React, { useContext, useState, useCallback } from "react";
import { TEAyudoContext } from "../../../context";
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
} from "@ionic/react";
import "./styles.css";
import PatientServices from "../../../services/patients.service";

const InfoPatient: React.FC<InfoPatientProps> = ({ title, patient }) => {
  const { data, setData } = useContext(TEAyudoContext);
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
  const [fase, setFase] = useState<string>(
    patient !== undefined ? patient.fase : ""
  );
  const fases = [1, 2, 3, 4];
  const [isEdit, setIsEdit] = useState<boolean>(
    patient !== undefined ? true : false
  );

  const handleAddPatient = () => {
    setData({ loading: true, error: false });
    PatientServices.postNewPatient(name, lastName, birthday, fase)
      .then((res: any) => {
        goToListPatients();
      })
      .catch((error: any) => {
        //mostrar mensaje con error
      });
  };

  const handleEditPatient = () => {
    setData({ loading: true, error: false });
    PatientServices.putEditPatient(name, lastName, birthday, fase)
      .then((res: any) => {
        //mostrar datos editados
      })
      .catch((error: any) => {
        //mostrar mensaje con error
      });
  };

  const handleDeletePatient = () => {
    setData({ loading: true, error: false });
    PatientServices.deletePatient(name)
      .then((res: any) => {
        goToListPatients();
      })
      .catch((error: any) => {
        //mostrar mensaje con error
      });
  };

  const goToListPatients = useCallback(
    () => navigate(`/${data.patientName}/pacientes`, "forward"),
    [navigate]
  );

  return (
    <IonContent>
      <IonGrid className="container-patientAdd">
        <IonRow>
          <form className="form-no-background">
            <h1>{title}</h1>
            <IonList className="mt-5">
              <IonAvatar className="avatars">
                <img src="https://api.adorable.io/avatars/99" alt="Avatar" />
              </IonAvatar>
              <IonItem className="inputMargin">
                <IonInput
                  name="name"
                  value={name}
                  required
                  disabled={isEdit}
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
                  disabled={isEdit}
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
              <IonItem className="p-0">
                <IonLabel>Seleccione fase</IonLabel>
                <IonSelect
                  value={fase}
                  okText="Aceptar"
                  placeholder="Fase"
                  className="full-width"
                  disabled={isEdit}
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
            ) : (
              <div>
                <IonButton
                  type="submit"
                  className="formButton mt-5"
                  onClick={handleEditPatient}
                  expand="block"
                >
                  Editar paciente
                </IonButton>
                <IonButton
                  type="submit"
                  className="formButton red-buttom mt-5"
                  onClick={handleDeletePatient}
                  expand="block"
                >
                  Eliminar paciente
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
  fase: string;
}

export default InfoPatient;
