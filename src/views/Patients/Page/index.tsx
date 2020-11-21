import React, { useContext, useEffect, useCallback } from "react";
import Page from "../../../components/Page";
import { NavContext, IonLoading, IonRow, IonAlert } from "@ionic/react";
import ListPatients from "../ListPatients";
import { AuthenticationContext } from "../../../context/authentication";
import PatientServices from "../../../services/patients.services";
import { PatientContext } from "../../../context/patient";
import CardWithIcon from "../../../components/CardWithIcon";
import { addCircleOutline } from "ionicons/icons";
import { useState } from "react";

const PatientsPage: React.FC = () => {
  const { token } = useContext(AuthenticationContext).authData;
  const { role } = useContext(AuthenticationContext).authData;
  const { setPatientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);
  const [loading, isLoading] = useState<boolean>(true);
  const [error, hasError] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getPatients(), []);

  const getPatients = () => {
    isLoading(true);
    hasError(false);
    PatientServices.getPatientsFromUser(token!)
      .then((res: any) => {
        if (res.data?.length > 0) {
          setPatientData({ patientsList: res.data });
          isLoading(false);
        } else {
          isLoading(false);
          goToAddPatient();
        }
      })
      .catch((_error: any) => {
        isLoading(false);
        hasError(true);
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
      {loading ? (
        <IonLoading
          isOpen={loading!}
          message="Trabajando..."
          spinner="crescent"
        />
      ) : (
        <>
          <ListPatients />
          {role==1 ? (
            <IonRow>
            <CardWithIcon
              icon={addCircleOutline}
              title="Agregar"
              touchable
              onClick={handleAddPatientClick}
            />
          </IonRow>
          ):null}
        </>
      )}
      {error ? (
        <IonAlert
          isOpen={error!}
          animated
          backdropDismiss
          keyboardClose
          message={
            "Hubo un error inesperado, por favor intente nuevamente más tarde."
          }
        />
      ) : null}
    </Page>
  );
};

export default PatientsPage;
