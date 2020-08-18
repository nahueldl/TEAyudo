import React, { useState, useContext, useEffect } from "react";
import Page from "../../../components/Page";
import {
  IonNav,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import ListPatients from "../ListPatients";
import InfoPatient from "../InfoPatient";
import { AuthenticationContext } from "../../../context/authentication";
import PatientServices from "../../../services/patients.service";

const PatientsPage: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const [patientSelected, setPatientSelected] = useState<Patient>();
  const [patients, setPatients] = useState<[Patient]>();
  const [option, setOption] = useState<string>("listPatients");
  const [cont, setCont] = useState(0);

  useEffect(() => {
    if (cont == 0) {
      getPatients();
      setCont(1);
    }
  });

  const getPatients = () => {
    setAuthData({ loading: true, error: false });
    PatientServices.getPatientsFromUser(authData.token!)
      .then((res: any) => {
        if (!res.data.length) setOption("Agregar");
        setPatients(res.data);
        setAuthData({ loading: false, error: false });
      })
      .catch((_error: any) => {
        setAuthData({ loading: false, error: true });
      });
  };

  const handleOnClick = (option: string, patient?: Patient) => {
    if (option == "patient") {
      setPatientSelected(patient);
    }
    setOption(option);
  };

  return (
    <Page pageTitle="Pacientes" showHomeButton>
      {option == "listPatients" ? (
        <ListPatients
          onclick={handleOnClick}
          patients={patients}
        ></ListPatients>
      ) : option == "patient" ? (
        <InfoPatient title="" patient={patientSelected}></InfoPatient>
      ) : (
        <InfoPatient title="Agregar paciente"></InfoPatient>
      )}
    </Page>
  );
};

interface Patient {
  id_paciente: any;
  name: string;
  lastName: string;
  birthday: string;
  fase: any;
  avatar: string;
}

export default PatientsPage;
