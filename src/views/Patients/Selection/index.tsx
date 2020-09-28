import React, { useContext, useCallback, useState, useEffect } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, IonContent, NavContext } from "@ionic/react";
import { AuthenticationContext } from "../../../context/authentication";
import CardWithImage from "../../../components/CardWithImage";
import PatientsService from "../../../services/patients.services";

import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const PatientSelection: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const [patients, setPatients] = useState<any>([]);
  const { username, token } = authData;
  const { navigate } = useContext(NavContext);

  useEffect(() => {
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPatients = () => {
    PatientsService.getPatientsFromUser(token!).then((res: { data: any }) => {
      console.log("pacientes", res.data);
      setPatients(res.data);
    });
  };

  const handleClick = (patient: any) => {
    setAuthData({
      patientName: patient.nombre,
      patientId: patient.id_paciente,
    });
    Storage.set({ key: "patientName", value: patient.nombre });
    Storage.set({ key: "patientId", value: patient.id_paciente });
    goToHome();
  };

  const goToHome = useCallback(() => navigate(`/inicio`, "forward"), [
    navigate,
  ]);
  return (
    <IonContent>
      <IonGrid className="container">
        <IonRow>
          <IonCol size="12">
            <h1 className="title">Selecciona un paciente para avanzar</h1>
          </IonCol>
        </IonRow>
        <IonRow>
          {patients.map((patient: any, index: number) => (
            <IonCol key={index} size="12" sizeMd="6">
              <CardWithImage
                onClick={handleClick}
                img={{
                  src: `https://api.adorable.io/avatars/100/${username}-${patient.nombre}${patient.apellido}`,
                  alt: `Avatar des ${patient.nombre}`,
                }}
                title={`${patient.nombre} ${patient.apellido}`}
                touchable
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default PatientSelection;
