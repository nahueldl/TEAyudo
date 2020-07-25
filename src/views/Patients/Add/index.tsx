import React, { useContext, useState } from "react";
import { TEAyudoContext } from "../../../context";
import { IonGrid, IonRow, IonCol, IonList, IonItem, IonInput } from "@ionic/react";
const PatientAdd: React.FC = () => {
  const { data, setData } = useContext(TEAyudoContext);
  const { username } = data;
  const [name, setName] = useState<string>();
  return (
    // nombre, apellido, fecha de nacimiento, fase
    <IonGrid>
      <IonRow>
        <IonCol size="12">{/* logo */}</IonCol>
      </IonRow>
      <IonRow>
        <form action="#">
          <h1>Agregar un paciente</h1>
          <IonList>
              <IonItem>
                  <IonInput name="name" value={name} required clearInput placeholder="Nombre" onIonChange={(e) => setName(e.detail.value!)} />
              </IonItem>
          </IonList>
        </form>
      </IonRow>
    </IonGrid>
  );
};

export default PatientAdd;
