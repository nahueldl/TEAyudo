import React, { useContext, useEffect, useState } from "react";
import Page from "../../components/Page";
import { IonGrid, IonRow, IonCol, NavContext, IonLoading, IonAlert } from "@ionic/react";
import CardWithImage from "../../components/CardWithImage";
// import { PatientContext } from "../../context/patient";
import { AuthenticationContext } from "../../context/authentication";
import ProfessionalServices from "../../services/professionals.services";
import { Professional } from "../../types/Professionals";
import { ModalProfessional } from "../../components/ModalProfessional";

const ProfessionalsPage: React.FC = () => {
  // const { patientData, setPatientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);
  const { authData } = useContext(AuthenticationContext);
  const { username } = authData;
  const [ showModal, setShowModal] = useState(false);
  const [ professionalSelected, setProfessionalSelected] = useState<Professional>();
  const [ loading, isLoading ] = useState<boolean>(false);
  const [ error, hasError ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>();
  const [ professionals, setProfessionals ] = useState<Professional[]>([]);

  useEffect(() => getProfessionals(), []);

  const getProfessionals = () => {
    isLoading(true);
    hasError(false);
    ProfessionalServices.getProfessionals(authData.token!)
      .then((res: any) => {
        setProfessionals(res.data);
        isLoading(false);
      })
      .catch(() => { 
        setErrorMessage("Hubo un problema al cargar los profesionales, por fabvor intente mas tarde.")
        isLoading(false);
        hasError(true);
      });
  };

  const handleClickSetShowModal = (value: boolean, proffesional?: Professional) => {
    if(value){
      setProfessionalSelected( proffesional );
    }
    setShowModal(value);
  };

  const asignProfessionalToPatient = () => {
    isLoading(true);
    hasError(false);
    ProfessionalServices.postAsignProfessional(authData.token!, authData.patientId!, professionalSelected?.nro_matricula!, professionalSelected?.id_usuario!)
      .then((res:any) => {
        handleClickSetShowModal(false);
        isLoading(false);
      })
      .catch(() => { 
        setErrorMessage("Hubo un problema al asignar el profesional, por fabvor intente mas tarde.")
        isLoading(false);
        hasError(true);
      });
  }

  return (
    <Page pageTitle="Profesionales" showHomeButton>
      <IonGrid className="overflow-auto">
      <IonRow>
        {professionals?.map((professional, index) => (
          <IonCol key={index} size="4" sizeMd="2">
            <CardWithImage
              img={{
                src: `https://avatars.dicebear.com/api/bottts/${professional.id_usuario}.svg`,
                alt: `Avatar de ${professional.nombre}`,
              }}
              title={professional.nombre!}
              touchable
              onClick={() => {
                handleClickSetShowModal(true, professional);
              }}
            />
          </IonCol>
        ))}
        {showModal? (
          <ModalProfessional showModal={showModal} 
            handleShowModal={handleClickSetShowModal} 
            handleAsignProfessional={asignProfessionalToPatient} 
            profesional={professionalSelected!} 
            patient={{id_paciente: authData.patientId, nombre: authData.patientName}}
          ></ModalProfessional>
        ): null}
      </IonRow>
      <IonLoading
        isOpen={loading!}
        message="Trabajando..."
        spinner="crescent"
      />
      <IonAlert
        isOpen={error!}
        animated
        backdropDismiss
        keyboardClose
        message={errorMessage}
      />
    </IonGrid>
    </Page>
  );
};

export default ProfessionalsPage;
