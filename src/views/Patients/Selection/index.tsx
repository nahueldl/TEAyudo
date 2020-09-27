import React, { useContext, useCallback, useState, useEffect } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, IonContent, NavContext } from "@ionic/react";
import { AuthenticationContext } from "../../../context/authentication";
import CardWithImage from "../../../components/CardWithImage";
import PatientServices from "../../../services/patients.service";

const PatientSelection: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { username } = authData;
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

  const handleClick = (name: string) => {
    setAuthData({ patientName: name });
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
          {patients != undefined
            ? patients.map((patient, index) => (
                <IonCol key={index} size="12" sizeMd="6">
                  <CardWithImage
                    onClick={handleClick}
                    img={{
                      src: `https://api.adorable.io/avatars/100/${username}-${patient.nombre}`,
                      alt: `Avatar des ${patient.nombre}`,
                    }}
                    title={patient.nombre}
                    touchable
                  />
                </IonCol>
              ))
            : () => goToAddPatient}
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
