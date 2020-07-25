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
} from "@ionic/react";
import "./styles.css";

const PatientAdd: React.FC = () => {
  const { data, setData } = useContext(TEAyudoContext);
  const { username } = data;
  const [name, setName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [fase, setFase] = useState<string>();
  const fases = [1, 2, 3, 4];

  const handleAddPatient = () => {};

  return (
    <IonContent>
      <IonGrid className="container">
        <IonRow>
          <IonCol size="12">{/* logo */}</IonCol>
        </IonRow>
        <IonRow>
          <form>
            <h1>Agregar un paciente</h1>
            <IonList>
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
            <IonButton
              type="submit"
              className="formButton mt-5"
              onClick={handleAddPatient}
            >
              Agregar
            </IonButton>
          </form>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default PatientAdd;
