import React, { useContext, useCallback } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, NavContext } from "@ionic/react";
import CardWithImage from "../../../components/CardWithImage";
import { PatientContext } from "../../../context/patient";

const ListPatients: React.FC<ListPatientsProps> = (props) => {
  const { patientData, setPatientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);

  const handleCardPatientClick = (patient: any) => {
    setPatientData({ patientSelected: patient });
    goToViewPatient();
  };

  const goToViewPatient = useCallback(
    () => navigate("/pacientes/informacion", "forward"),
    [navigate]
  );

  return (
    <IonGrid className="overflow-auto">
      <IonRow>
        {patientData.patientsList?.map((patient, index) => (
          <IonCol key={index} size="4" sizeMd="2">
            <CardWithImage
              img={{
                src: `${patient.avatar}`,
                alt: `Avatar de ${patient.nombre}`,
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
