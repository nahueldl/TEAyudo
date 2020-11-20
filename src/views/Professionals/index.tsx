import React, { useContext, useEffect, useState } from "react";
import Page from "../../components/Page";
import { IonGrid, IonRow, IonCol, NavContext } from "@ionic/react";
import CardWithImage from "../../components/CardWithImage";
// import { PatientContext } from "../../context/patient";
import { AuthenticationContext } from "../../context/authentication";
import ProfessionalServices from "../../services/professionals.services";
import { Professional } from "../../components/CardWithImage";

const ProfessionalsPage: React.FC = () => {
  // const { patientData, setPatientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);
  const { authData } = useContext(AuthenticationContext);
  const { username } = authData;
  const [ showModal, setShowModal] = useState(false);
  const [ professionalSelected, setProfessionalSelected] = useState<Professional>();
  const [loading, isLoading] = useState<boolean>(false);
  const [error, hasError] = useState<boolean>(false);
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => getProfessionals(), []);

  const getProfessionals = () => {
    isLoading(true);
    hasError(false);
    ProfessionalServices.getProfessionalsFromUser(authData.token!)
      .then((res: any) => {
        setProfessionals(res.data);
        isLoading(false);
      })
      .catch(() => {
        isLoading(false);
        hasError(true);
      });
  };

  const handleCardProfessionalClick = (value: boolean, professionalSelected: any) => {
    setProfessionalData({ professionalSelected: professional });
    if(value){
      setProfessionalSelected(professionalSelected);
      setShowModal(value);
    } else {
      setShowModal(false);
      setProfessionalSelected(undefined);
    }
  };

  return (
    <Page pageTitle="Profesionales" showHomeButton>
      <IonGrid className="overflow-auto">
      <IonRow>
        {professionalData.professionalsList?.map((professional, index) => (
          <IonCol key={index} size="4" sizeMd="2">
            <CardWithImage
              img={{
                src: `${professional.avatar}`,
                alt: `Avatar de ${professional.nombre}`,
              }}
              title={professional.nombre!}
              touchable
              onClick={() => {
                handleCardProfessionalClick(true, professional);
              }}
              professional={professional}
            />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
    </Page>
  );
};

export default ProfessionalsPage;
