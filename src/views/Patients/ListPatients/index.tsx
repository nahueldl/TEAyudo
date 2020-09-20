import React, { useContext, useCallback } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, NavContext } from "@ionic/react";
import CardWithImage from "../../../components/CardWithImage";
import CardWithIcon from "../../../components/CardWithIcon";
import { addCircleOutline } from "ionicons/icons";
import { PatientContext } from "../../../context/patient";

// const patients = [
//   {
//     name: "Nano",
//     lastName: "aAaaaA",
//     birthday: "05/05/0555",
//     fase: 1,
//     avatar: "https://api.adorable.io/avatars/100/",
//   },
//   {
//     name: "Tomi",
//     lastName: "aAaaaA",
//     birthday: "05/05/0555",
//     fase: 1,
//     avatar: "https://api.adorable.io/avatars/1/",
//   },
// ];

const ListPatients: React.FC<ListPatientsProps> = (props) => {
  const { patientData, setPatientData } = useContext(PatientContext);
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
                alt: `Avatar ${patient.name}`,
              }}
              title={patient.name}
              touchable
              onClick={handleCardPatientClick(patient)}
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
  name: string;
  lastName: string;
  birthday: string;
  avatar: string;
}

export default ListPatients;
