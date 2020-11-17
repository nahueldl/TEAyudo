import React, { useContext, useState, useEffect } from "react";
import Page from "../../components/Page";
import { AuthenticationContext } from "../../context/authentication";
import { IonLoading, IonAlert, IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonListHeader, IonSelect, IonSelectOption, IonCheckbox, IonList, IonItem, IonLabel, IonItemDivider } from '@ionic/react';
import ReportsService from "../../services/reports.services";
import PatientServices from "../../services/patients.services";
import { PatientContext } from "../../context/patient";

const checkboxList = [
  { val: 'Pictograma mas usado', isChecked: true },
  { val: 'Porcentaje de respuestas correctas en Juegos', isChecked: false },
  { val: 'Cantidad de pictogramas que usa para armar una frase', isChecked: false },
  { val: 'Tipos de atributos mas usados en pictogramas', isChecked: false }
];

const ReportsPage: React.FC = () => {
  let patientSelected = {};
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { error, loading } = authData;
  const [patients, setPatients] = useState<any[]>([]);

  const handleGenerate = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
    setAuthData({ loading: true, error: false });
    ReportsService.getReport(authData.token!, authData.patientId!
      // , Date.prototype.toISOString()!
      )
      .then((res: any) => {
        setAuthData({ loading: false, error: false });
        // agregar logica para ver que hacer con el pdf
      })
      .catch((_error: any) => {
        setErrorMessage(
          "Hubo un inconveniente obteniendo el informe, pruebe más tarde."
        );
        setAuthData({ loading: false, error: true });
      });
  };

  useEffect(() => getPatients(), []);

  const getPatients = () => {
    setAuthData({ loading: true, error: false });
    PatientServices.getPatientsFromUser(authData.token!)
      .then((res: any) => {
        debugger
        setPatients(res.data)
        setAuthData({ loading: false });
      })
      .catch((_error: any) => {
        setAuthData({ loading: false, error: true });
      });
  };

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
            <IonSelect value={patients[0]} placeholder="Seleccione uno" >
              {patients?.map(patient => (
                <IonSelectOption key={patient.id_paciente} onIonChange={() => handleGenerate(patient)} value={patient}>
                  {patient.nombre}
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
        <IonButton expand="block" onClick={(e) => handleGenerate(e)}>Generar Informe</IonButton>
        {/* <IonLoading
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
          onDidDismiss={() => setAuthData({ error: false })}
        /> */}
      </IonContent>
    </Page>
  );
};

export default ReportsPage;
