import React, { useState, useContext, useEffect, useCallback } from "react";
import Page from "../../../components/Page";
import { NavContext, IonLoading } from "@ionic/react";
import ListPatients from "../ListPatients";
import { AuthenticationContext } from "../../../context/authentication";
import PatientServices from "../../../services/patients.services";

const PatientsPage: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { navigate } = useContext(NavContext);
  const [patientData, setPatientData] = useState<any>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getPatients(), []);

  const getPatients = () => {
    setAuthData({ loading: true, error: false });
    PatientServices.getPatientsFromUser(authData.token!)
      .then((res: any) => {
        if (res.data?.length > 0) {
          setPatientData({ patientsList: res.data });
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
        <IonLoading
          isOpen={authData.loading!}
          message="Trabajando..."
          spinner="crescent"
        />
      ) : (
        <ListPatients></ListPatients>
      )}
    </Page>
  );
};

export default PatientsPage;
