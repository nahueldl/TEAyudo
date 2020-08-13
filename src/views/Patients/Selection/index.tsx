import React, { useContext, useCallback } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, IonContent, NavContext } from "@ionic/react";
import { AuthenticationContext } from "../../../context/authentication";
import CardWithImage from "../../../components/CardWithImage";

const patients = [
  { name: "Nano", phase: 3 },
  { name: "Toto", phase: 1 },
];

const PatientSelection: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { username } = authData;
  const { navigate } = useContext(NavContext);

  const handleClick = (name: string) => {
    setAuthData({patientName: name})
    goToHome();
  };

  const goToHome = useCallback(
    () => navigate(`/inicio`, "forward"),
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
          {patients.map((patient, index) => (
            <IonCol key={index} size="12" sizeMd="6">
              <CardWithImage
                onClick={handleClick}
                img={{
                  src: `https://api.adorable.io/avatars/100/${username}-${patient.name}`,
                  alt: `Avatar des ${patient.name}`,
                }}
                title={patient.name}
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
