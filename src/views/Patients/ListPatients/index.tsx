import React, { useContext, useCallback } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, NavContext } from "@ionic/react";
import CardWithImage from "../../../components/CardWithImage";
import CardWithIcon from "../../../components/CardWithIcon";
import { addCircleOutline } from "ionicons/icons";
import { PatientContext } from "../../../context/patient";

const ListPatients: React.FC<ListPatientsProps> = (props) => {
  const { setPatientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);

  const handleCardPatientClick = (patient: any) => {
    setPatientData(patient);
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
        {props.patients?.map((patient, index) => (
          <IonCol key={index} size="4" sizeMd="2">
            <CardWithImage
              img={{
                src: `${patient.avatar}`,
                alt: `Avatar ${patient.nombre}`,
              }}
              title={patient.nombre}
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
  id_paciente: any;
  nombre: string;
  apellido: string;
  avatar: string;
}

export default ListPatients;
