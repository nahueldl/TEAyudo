import React, { useContext, useCallback } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, NavContext } from "@ionic/react";
import CardWithImage from "../../../components/CardWithImage";
import CardWithIcon from "../../../components/CardWithIcon";
import { addCircleOutline } from "ionicons/icons";
import { PatientContext } from "../../../context/patient";
import { AuthenticationContext } from "../../../context/authentication";

const ListPatients: React.FC<ListPatientsProps> = (props) => {
  const { patientData, setPatientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);
  const { authData } = useContext(AuthenticationContext);
  const { username } = authData;

  const handleCardPatientClick = (patient: any) => {
    setPatientData({ patientSelected: patient });
    goToViewPatient();
  };

  const handleAddPatientClick = () => {
    goToAddPatient();
  };

  const goToViewPatient = useCallback(
    () => navigate("/pacientes/informacion", "forward"),
    [navigate]
  );

  const goToAddPatient = useCallback(
    () => navigate("/pacientes/alta", "forward"),
    [navigate]
  );

  return (
    <IonGrid className="overflow-auto">
      <IonRow>
        {patientData.patientsList?.map((patient, index) => (
          <IonCol key={index} size="4" sizeMd="2">
            <CardWithImage
              img={{
                src: `https://api.adorable.io/avatars/100/${username}-${patient.nombre}`,
                alt: `Avatar des ${patient.nombre}`,
              }}
              title={patient.nombre!}
              touchable
              onClick={() => {
                handleCardPatientClick(patient);
              }}
              patient={patient}
            />
          </IonCol>
        ))}
      </IonRow>
      <IonRow>
        <CardWithIcon
          icon={addCircleOutline}
          title="Agregar"
          touchable
          onClick={handleAddPatientClick}
        />
      </IonRow>
    </IonGrid>
  );
};

interface ListPatientsProps {
  patients?: [Patient];
}

interface Patient {
  id_paciente?: any;
  nombre?: string;
  apellido?: string;
  avatar?: string;
}

export default ListPatients;
