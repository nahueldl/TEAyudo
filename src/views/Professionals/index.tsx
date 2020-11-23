import React, { useContext, useEffect, useState } from "react";
import Page from "../../components/Page";
import {
  IonGrid,
  IonRow,
  IonCol,
  NavContext,
  IonLoading,
  IonAlert,
  IonTitle,
} from "@ionic/react";
import CardWithImage from "../../components/CardWithImage";
import { AuthenticationContext } from "../../context/authentication";
import ProfessionalServices from "../../services/professionals.services";
import { Professional } from "../../types/Professionals";
import { ModalProfessional } from "../../components/ModalProfessional";
import { useCallback } from "react";
import ViewProfessionalAsign from "./ViewProfessionalAsign";

const ProfessionalsPage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { authData } = useContext(AuthenticationContext);
  const [showModal, setShowModal] = useState(false);
  const [professionalSelected, setProfessionalSelected] = useState<
    Professional
  >();
  const [professionalAsign, setProfessionalAsign] = useState<Professional>();
  const [loading, isLoading] = useState<boolean>(false);
  const [error, hasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [avatarString, setAvatarString] = useState<string>();
  const [ showActionDeleteProfessional, setShowActionDeleteProfessional ] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAsignProfessionalFromuser(), []);

  const getAllProfessionals = () => {
    ProfessionalServices.getProfessionals(authData.token!)
      .then((res: any) => {
        setProfessionals(res.data);
        isLoading(false);
      })
      .catch(() => {
        setErrorMessage(
          "Hubo un problema al cargar los profesionales, por favor intente mas tarde."
        );
        isLoading(false);
        hasError(true);
      });
  };

  const getAsignProfessionalFromuser = () => {
    isLoading(true);
    hasError(false);
    ProfessionalServices.getProfessionalAsignToUser(
      authData.token!,
      authData.patientId!
    )
      .then((res: any) => {
        console.log(res);
        if (res.status === 204) {
          getAllProfessionals();
        } else {
          setProfessionalAsign(res.data);
          setAvatarString(
            `https://avatars.dicebear.com/api/bottts/${res.data.id_usuario}.svg`
          );
          isLoading(false);
        }
      })
      .catch(() => {
        setErrorMessage("Hubo un problema, por favor intente más tarde.");
        isLoading(false);
        hasError(true);
        goToHome();
      });
  };

  const handleClickSetShowModal = (
    value: boolean,
    proffesional?: Professional
  ) => {
    if (value) {
      setProfessionalSelected(proffesional);
    }
    setShowModal(value);
  };

  const asignProfessionalToPatient = () => {
    isLoading(true);
    hasError(false);
    ProfessionalServices.postAsignProfessional(
      authData.token!,
      authData.patientId!,
      professionalSelected?.nro_matricula!,
      professionalSelected?.id_usuario!
    )
      .then(() => {
        handleClickSetShowModal(false);
        getAsignProfessionalFromuser();
      })
      .catch(() => {
        setErrorMessage(
          "Hubo un problema al asignar el profesional, por favor intente nuevamente más tarde."
        );
        isLoading(false);
        hasError(true);
      });
  };

  const handleDeleteProfessional = () => {
    isLoading(true);
    hasError(false);
    ProfessionalServices.deleteProfessional(
      authData.token!,
      authData.patientId!
    )
      .then(() => {
        setProfessionalAsign(undefined);
        getAllProfessionals();
      })
      .catch(() => {
        setErrorMessage(
          "Hubo un problema al desasignar el profesional, por favor intente nuevamente más tarde."
        );
        isLoading(false);
        hasError(true);
      });
  };

  const goToHome = useCallback(() => navigate("/inicio", "back"), [navigate]);

  return (
    <Page pageTitle="Profesionales" showHomeButton>
      <IonGrid className="overflow-auto">
        {professionalAsign ? (
          <ViewProfessionalAsign
            setShowActionDeleteProfessional={setShowActionDeleteProfessional}
            handleDeleteProfessional={handleDeleteProfessional}
            professionalAsign={professionalAsign}
            avatarString={avatarString!}
            showActionDeleteProfessional={showActionDeleteProfessional}
          />
        ) : (
          <>
            <IonRow>
              <IonTitle>
                Seleccione un profesional para ser asignado a{" "}
                {authData.patientName}
              </IonTitle>
            </IonRow>
            <IonRow>
              {professionals?.map((professional, index) => (
                <IonCol key={index} size="4" sizeMd="2">
                  <CardWithImage
                    img={{
                      src: `https://avatars.dicebear.com/api/bottts/${professional.id_usuario}.svg`,
                      alt: `Avatar de ${professional.nombre}`,
                    }}
                    title={professional.nombre! + " " + professional.apellido}
                    touchable
                    onClick={() => {
                      handleClickSetShowModal(true, professional);
                    }}
                  />
                </IonCol>
              ))}
              {showModal ? (
                <ModalProfessional
                  showModal={showModal}
                  handleShowModal={handleClickSetShowModal}
                  handleAsignProfessional={asignProfessionalToPatient}
                  profesional={professionalSelected!}
                  patient={{
                    id_paciente: authData.patientId,
                    nombre: authData.patientName,
                  }}
                ></ModalProfessional>
              ) : null}
            </IonRow>
          </>
        )}
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
