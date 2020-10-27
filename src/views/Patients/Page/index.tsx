import React, { useState, useContext, useEffect, useCallback } from "react";
import Page from "../../../components/Page";
import { NavContext, IonLoading, IonRow } from "@ionic/react";
import ListPatients from "../ListPatients";
import { AuthenticationContext } from "../../../context/authentication";
import PatientServices from "../../../services/patients.service";
import { PatientContext } from "../../../context/patient";
import CardWithIcon from "../../../components/CardWithIcon";
import { addCircleOutline } from "ionicons/icons";

const PatientsPage: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { patientData, setPatientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);

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

  const handleAddPatientClick = () => {
    goToAddPatient();
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
        <>
          <ListPatients></ListPatients>
          <IonRow>
            <CardWithIcon
              icon={addCircleOutline}
              title="Agregar"
              touchable
              onClick={handleAddPatientClick}
            />
          </IonRow>
        </>
      )}
    </Page>
  );
};

export default PatientsPage;
