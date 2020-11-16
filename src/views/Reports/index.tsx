import React, { useState } from "react";
import Page from "../../components/Page";
import { IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonListHeader, IonSelect, IonSelectOption, IonCheckbox, IonList, IonItem, IonLabel, IonItemDivider } from '@ionic/react';

const checkboxList = [
  { val: 'Pictograma mas usado', isChecked: true },
  { val: 'Porcentaje de respuestas correctas en Juegos', isChecked: false },
  { val: 'Cantidad de pictogramas que usa para armar una frase', isChecked: false },
  { val: 'Tipos de atributos mas usados en pictogramas', isChecked: false }
];

const patients = [
  {
    id: 1,
    name: 'Nano'
  },
  {
    id: 2,
    name: 'Toto'
  }
];

type Patient = typeof patients[number];

const ReportsPage: React.FC = () => {

  const [patient, setPatient] = useState<string>();
  // ver como poner un patient default, el primero

  return (
    <Page pageTitle="Informes" showHomeButton>
      <IonContent>
        <IonList>
        <IonListHeader>
            <IonLabel>
              Seleccione un Paciente
            </IonLabel>
          </IonListHeader>

          <IonItem>
            <IonLabel>Nombre</IonLabel>
            <IonSelect value={patient} placeholder="Seleccione uno" onIonChange={e => setPatient(e.detail.value)}>
              {/* <IonSelectOption value="nano">Nano</IonSelectOption>
              <IonSelectOption value="toto">Toto</IonSelectOption> */}
              {patients.map(patient => (
                <IonSelectOption key={patient.id} value={patient}>
                  {patient.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItemDivider>Estadísticas a generar</IonItemDivider>

          {checkboxList.map(({ val, isChecked }, i) => (
            <IonItem key={i}>
              <IonLabel>{val}</IonLabel>
              <IonCheckbox slot="end" value={val} checked={isChecked} />
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="block">Generar Informe</IonButton>
      </IonContent>
    </Page>
  );
};

export default ReportsPage;
