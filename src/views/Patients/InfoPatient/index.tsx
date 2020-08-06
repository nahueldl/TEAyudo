import React, { useContext, useState } from "react";
import { TEAyudoContext } from "../../../context";
import {
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
import { arrowBackOutline } from "ionicons/icons";

const InfoPatient: React.FC<InfoPatientProps> = ({ title, add }) => {
  const { data, setData } = useContext(TEAyudoContext);
  const { username } = data;
  const [name, setName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [fase, setFase] = useState<string>();
  const fases = [1, 2, 3, 4];
  const img: any = {
    src: "assets/icon/icon.png",
  };

  const handleAddPatient = () => {};

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
              <IonItem className="p-0">
                <IonLabel>Seleccione fase</IonLabel>
                <IonSelect
                  value={fase}
                  okText="Aceptar"
                  placeholder="Fase"
                  className="full-width"
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
            {add ? (
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
                  expand="block"
                >
                  Editar paciente
                </IonButton>
                <IonButton
                  type="submit"
                  className="formButton red-buttom mt-5"
                  onClick={handleAddPatient}
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
  add: boolean;
}

export default InfoPatient;
