import React, { useContext, useCallback, useState, useEffect } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, IonContent, NavContext } from "@ionic/react";
import { AuthenticationContext } from "../../../context/authentication";
import PatientServices from "../../../services/patients.services";
import CardWithImage from "../../../components/CardWithImage";

import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const PatientSelection: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { username, token } = authData;
  const { navigate } = useContext(NavContext);
  const [patients, setPatients] = useState<[Patient]>();

  useEffect(() => getPatients(), []);

  const getPatients = () => {
    setAuthData({ loading: true, error: false });
    PatientServices.getPatientsFromUser(authData.token!)
      .then((res: any) => {
        if (res.data?.length > 0) {
          setPatients(res.data);
          setAuthData({ loading: false });
        } else {
          goToAddPatient();
          setAuthData({ loading: false });
        }
      })
      .catch((_error: any) => {
        setAuthData({ loading: false, error: true });
      });
  };

  useEffect(() => {
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPatients = () => {
    PatientServices.getPatientsFromUser(token!).then((res: { data: any }) => {
      console.log("pacientes", res.data);
      setPatients(res.data);
    });
  };

  const handleClick = (patient: Patient) => {
    setAuthData({
      patientName: `${patient.nombre} ${patient.apellido}`,
      patientId: patient.id_paciente,
    });
    Storage.set({ key: "patientName", value: patient.nombre });
    Storage.set({ key: "patientId", value: patient.id_paciente });
    goToHome();
  };

  const goToHome = useCallback(() => navigate(`/inicio`, "forward"), [
    navigate,
  ]);

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
          {patients!.map((patient: any, index: number) => (
            <IonCol key={index} size="12" sizeMd="6">
              <CardWithImage
                onClick={handleClick}
                img={{
                  src: `https://api.adorable.io/avatars/100/${username}-${patient.nombre}${patient.apellido}`,
                  alt: `Avatar des ${patient.nombre}`,
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
