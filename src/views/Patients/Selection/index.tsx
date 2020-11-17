import React, { useContext, useCallback, useState, useEffect } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, IonContent, NavContext } from "@ionic/react";
import { AuthenticationContext } from "../../../context/authentication";
import PatientServices from "../../../services/patients.services";
import CardWithImage from "../../../components/CardWithImage";
import { Plugins } from "@capacitor/core";
import { PatientContext } from "../../../context/patient";
const { Storage } = Plugins;

const PatientSelection: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { setPatientData } = useContext(PatientContext);
  const { username, token } = authData;
  const { navigate } = useContext(NavContext);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, isLoading] = useState<boolean>(true);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let unmounted = false;
    getPatients();
    return () => {
      unmounted = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPatients = () => {
    isLoading(true);
    PatientServices.getPatientsFromUser(token!)
      .then((res: any) => {
        if (res.data?.length > 0) {
          setPatients(res.data);
          isLoading(false);
        } else {
          goToAddPatient();
        }
      })
      .catch((_error: any) => {
        isLoading(false);
      });
  };

  const handleClick = (patient: Patient) => {
    setAuthData({
      patientName: `${patient.nombre} ${patient.apellido}`,
      patientId: patient.id_paciente,
    });
    setPatientData({ patientSelected: patient });
    Storage.set({ key: "patientName", value: patient.nombre }).then();
    Storage.set({ key: "patientId", value: patient.id_paciente }).then();
    goToHome();
  };

  const goToHome = useCallback(() => navigate(`/`, "forward"), [navigate]);

  const goToAddPatient = useCallback(
    () => navigate("/pacientes/alta", "forward"),
    [navigate]
  );

  return (
    <IonContent>
      <IonGrid className="container">
        <IonRow>
          <IonCol size="12">
            <h1 className="title">Selecciona un paciente para avanzar</h1>
          </IonCol>
        </IonRow>
        <IonRow>
          {patientData.patientsList?.map((patient: any, index: number) => (
            <IonCol key={index} size="12" sizeMd="6">
              <CardWithImage
                onClick={handleClick}
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
    </IonContent>
  );
};

interface Patient {
  id_paciente: any;
  nombre: string;
  apellido: string;
  avatar: string;
}

export default PatientSelection;
