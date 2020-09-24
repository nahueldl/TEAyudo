import React, { useState, useContext, useEffect, useCallback } from "react";
import Page from "../../../components/Page";
import { NavContext, IonLoading } from "@ionic/react";
import ListPatients from "../ListPatients";
import { AuthenticationContext } from "../../../context/authentication";
import PatientServices from "../../../services/patients.services";

const PatientsPage: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const [patients, setPatients] = useState<[Patient]>();
  const { navigate } = useContext(NavContext);

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

  const goToAddPatient = useCallback(
    () => navigate("/pacientes/alta", "forward"),
    [navigate]
  );

  return (
    <Page pageTitle="Pacientes" showHomeButton>
      {authData.loading ? (
        <IonLoading isOpen={authData.loading!} message="Trabajando..." />
      ) : (
        <ListPatients patients={patients}></ListPatients>
      )}
    </Page>
  );
};

interface Patient {
  id_paciente: any;
  nombre: string;
  apellido: string;
  avatar: string;
}

export default PatientsPage;
