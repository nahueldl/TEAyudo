import React, { useContext, useState, useEffect } from "react";
import Page from "../../components/Page";
import { AuthenticationContext } from "../../context/authentication";
import {
  IonLoading,
  IonAlert,
  IonContent,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonDatetime,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import ReportsService from "../../services/reports.services";
import PatientServices from "../../services/patients.services";
import { PatientContext } from "../../context/patient";
import { Patient } from "../../components/CardWithImage";

const todayDate = new Date();
const todayDateISOFormat = todayDate.toISOString();
var fileDownload = require('js-file-download');

const ReportsPage: React.FC = () => {
  const { authData } = useContext(AuthenticationContext);
  const { patientData } = useContext(PatientContext);
  const { patientSelected } = patientData;
  const [loading, isLoading] = useState<boolean>(false);
  const [loadingReport, isLoadingReport] = useState<boolean>(false);
  const [error, hasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientSelectedInOption, setPatientSelectedInOption] = useState<
    Patient
  >(patientSelected!);
  const [selectedDate, setSelectedDate] = useState<any>(todayDateISOFormat);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getPatients(), []);

  const getPatients = () => {
    isLoading(true);
    hasError(false);
    PatientServices.getPatientsFromUser(authData.token!)
      .then((res: any) => {
        setPatients(res.data);
        isLoading(false);
      })
      .catch(() => {
        isLoading(false);
        hasError(true);
      });
  };

  const handleGenerate = () => {
    isLoadingReport(true);
    hasError(false);
    ReportsService.getReport(
      authData.token!,
      patientSelectedInOption!.id_paciente,
      selectedDate
    )
      .then((res: any) => {
        isLoadingReport(false);
        fileDownload(res.data, 'informe.pdf');
        console.log(res);
      })
      .catch((_error: any) => {
        setErrorMessage(
          "Hubo un inconveniente obteniendo el informe, intente nuevamente más tarde."
        );
        isLoadingReport(false);
        hasError(true);
      });
  };

  return (
    <Page pageTitle="Informes" showHomeButton>
      <IonContent>
        {loading ? (
          <IonLoading
            isOpen={loading!}
            message={"Trabajando..."}
            spinner="crescent"
          />
        ) : (
          <>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <div style={{ textAlign: "justify", padding: "10px" }}>
                    {patients.length > 1
                      ? "Seleccioná un paciente para poder generar el informe correspondiente"
                      // : `Se generará el informe correspondiente a ${patientSelected!
                      //     .nombre!}`}
                      : `Se generará el informe correspondiente a`}
                    ; si además querés que se genere a partir de una fecha en
                    particular, por favor seleccionala. De lo contrario, se
                    generará el informe de los pasados 30 días a partir de este
                    momento.
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  {patients.length > 1 ? (
                    <>
                      <IonItem>
                        <IonLabel>Seleccioná un paciente</IonLabel>

                        <IonSelect
                          value={patientSelectedInOption}
                          defaultChecked
                          // defaultValue
                          onIonChange={(e) =>
                            setPatientSelectedInOption(e.detail.value)
                          }
                          placeholder="Seleccione uno"
                        >
                          {patients!.map((patient) => (
                            <IonSelectOption
                              key={patient.id_paciente}
                              value={patient}
                            >
                              {patient.nombre}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                    </>
                  ) : null}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel>Seleccioná la fecha deseada</IonLabel>
                    <IonDatetime
                      displayFormat="DD MM YYYY"
                      placeholder="Seleccione una fecha"
                      value={selectedDate}
                      onIonChange={(e) => setSelectedDate(e.detail.value!)}
                    ></IonDatetime>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol style={{ display: "flex", justifyContent: "center" }}>
                  <IonButton onClick={() => handleGenerate()}>
                    Generar Informe
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>

            {loadingReport ? (
              <IonLoading
                isOpen={loading!}
                message={"Generando reporte..."}
                spinner="crescent"
              />
            ) : null}
            {error ? (
              <IonAlert
                isOpen={error!}
                animated
                backdropDismiss
                keyboardClose
                message={errorMessage}
              />
            ) : null}
          </>
        )}
      </IonContent>
    </Page>
  );
};

export default ReportsPage;
