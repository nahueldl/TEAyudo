import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../../context/authentication";
import "../styles.css";
import { IonGrid, IonRow, IonCol, IonIcon } from "@ionic/react";
import CardWithImage from "../../../components/CardWithImage";
import CardWithIcon from "../../../components/CardWithIcon";
import { addCircleOutline } from "ionicons/icons";

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
  const { authData, setAuthData } = useContext(AuthenticationContext);
  // const [patients, setPatients] = useState();

  // useEffect(() => {
  //   getPatients();
  // });

  // const getPatients = () => {
  //   debugger;
  //   setAuthData({ loading: true, error: false });
  //   PatientServices.getPatientsFromUser(authData.token!)
  //     .then((res: any) => {
  //       debugger;
  //       if (res.data.length) {
  //         setPatients(res.data);
  //       } else {
  //         handleClick("Agregar");
  //       }
  //       setAuthData({ loading: false, error: false });
  //     })
  //     .catch((_error: any) => {
  //       setAuthData({ loading: false, error: true });
  //     });
  // };

  const handleClick = (option: string, patient?: Patient) => {
    if (option == "Agregar") {
      props.onclick("addPatient");
    } else {
      setAuthData({ patientName: patient?.name });
      props.onclick("patient", patient);
    }
  };

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
              onClick={handleClick}
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
          onClick={handleClick}
        />
      </IonRow>
    </IonGrid>
  );
};

interface ListPatientsProps {
  onclick: any;
  patients?: [Patient];
}

interface Patient {
  name: string;
  lastName: string;
  birthday: string;
  fase: any;
  avatar: string;
}

export default ListPatients;
