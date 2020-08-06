import React from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, IonIcon } from "@ionic/react";
import CardWithImage from "../../../components/CardWithImage";
import CardWithIcon from "../../../components/CardWithIcon";
import { addCircleOutline } from "ionicons/icons";

const patients = [
  { name: "Nano", avatar: "https://api.adorable.io/avatars/100/" },
  { name: "Tomi", avatar: "https://api.adorable.io/avatars/1/" },
  { name: "Li", avatar: "https://api.adorable.io/avatars/10/" },
  { name: "Juani", avatar: "https://api.adorable.io/avatars/50/" },
  { name: "Santi", avatar: "https://api.adorable.io/avatars/25/" },
  { name: "nahue", avatar: "https://api.adorable.io/avatars/40/" },
];

const ListPatients: React.FC = () => {
  return (
    <IonGrid className="overflow-auto">
      <IonRow>
        {patients.map((patient, index) => (
          <IonCol key={index} size="4" sizeMd="2">
            <CardWithImage
              img={{
                src: `${patient.avatar}`,
                alt: `Avatar ${patient.name}`,
              }}
              title={patient.name}
              touchable
            />
          </IonCol>
        ))}
      </IonRow>
      <IonRow>
        <CardWithIcon icon={addCircleOutline} title="Agregar" touchable />
      </IonRow>
    </IonGrid>
  );
};

export default ListPatients;
