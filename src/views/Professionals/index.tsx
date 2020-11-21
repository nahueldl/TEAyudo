import React, { useContext, useEffect, useState } from "react";
import Page from "../../components/Page";
import { IonGrid, IonRow, IonCol, NavContext, IonLoading, IonAlert, IonAvatar, IonTitle, IonList, IonItem, IonButton, IonActionSheet } from "@ionic/react";
import CardWithImage from "../../components/CardWithImage";
import { AuthenticationContext } from "../../context/authentication";
import ProfessionalServices from "../../services/professionals.services";
import { Professional } from "../../types/Professionals";
import { ModalProfessional } from "../../components/ModalProfessional";
import { useCallback } from "react";
import { trash, close } from "ionicons/icons";

const ProfessionalsPage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { authData } = useContext(AuthenticationContext);
  const [ showModal, setShowModal] = useState(false);
  const [ professionalSelected, setProfessionalSelected] = useState<Professional>();
  const [ professionalAsign, setProfessionalAsign] = useState<Professional>();
  const [ loading, isLoading ] = useState<boolean>(false);
  const [ error, hasError ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>();
  const [ professionals, setProfessionals ] = useState<Professional[]>([]);
  const [ avatarString, setAvatarString ] = useState<string>();
  const [ showActionDeleteProfessional, setShowActionDeleteProfessional ] = useState(false);

  useEffect(() => getAsignProfessionalFromuser(), []);

  const getAllProfessionals = () => {
    ProfessionalServices.getProfessionals(authData.token!)
      .then((res: any) => {
        setProfessionals(res.data);
        isLoading(false);
      })
      .catch(() => { 
        setErrorMessage("Hubo un problema al cargar los profesionales, por favor intente mas tarde.")
        isLoading(false);
        hasError(true);
      });
  };

  const getAsignProfessionalFromuser = () => {
    isLoading(true);
    hasError(false);
    ProfessionalServices.getProfessionalAsignToUser(authData.token!, authData.patientId!)
    .then((res:any) => {
      if(res.status == 204) {
        getAllProfessionals();
      } else {
        setProfessionalAsign(res.data);
        setAvatarString(`https://avatars.dicebear.com/api/bottts/${res.data.id_usuario}.svg`);
        isLoading(false);
      }
    })
    .catch((res:any) => {
      setErrorMessage("Hubo un problema, por favor intente mas tarde.")
      isLoading(false);
      hasError(true);
      goToHome();
    })
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
        getAsignProfessionalFromuser();
      })
      .catch(() => { 
        setErrorMessage("Hubo un problema al asignar el profesional, por fabvor intente mas tarde.")
        isLoading(false);
        hasError(true);
      });
  };

  const handleDeleteProfessional = () => {
    isLoading(true);
    hasError(false);
    ProfessionalServices.deleteProfessional(authData.token!, authData.patientId!, professionalAsign?.nro_matricula!, professionalAsign?.id_usuario!)
    .then((res:any) => {
      setProfessionalAsign(undefined);
      getAllProfessionals();
    })
    .catch(() => { 
      setErrorMessage("Hubo un problema al desasignar el profesional, por fabvor intente mas tarde.")
      isLoading(false);
      hasError(true);
    });
  };

  const goToHome = useCallback(
    () => navigate("/inicio", "back"),
    [navigate]
  );

  return (
    <Page pageTitle="Profesionales" showHomeButton>
      <IonGrid className="overflow-auto">
        {professionalAsign != undefined ? (
          <IonRow>
            <form className="form-no-background">
            <IonTitle>Profesional asignado</IonTitle>
              <IonList className="mt-5">
              <IonAvatar className="avatars">
                  <img
                    className="height-auto"
                    src={avatarString}
                    alt="Avatar de profesional"
                  />
              </IonAvatar>
                <IonItem className="inputMargin">
                  <label>
                    Nombre:{"  "}
                    <strong className="text-bold pl-5">
                      {professionalAsign.nombre}
                    </strong>
                  </label>
                </IonItem>
                <IonItem className="inputMargin">
                  <label>
                    Apellido:{"  "}
                    <strong className="text-bold pl-5">
                      {professionalAsign.apellido}
                    </strong>
                  </label>
                </IonItem>
                <IonItem className="inputMargin">
                  <label>
                    Nro documento:{"  "}
                    <strong className="text-bold pl-5">
                      {professionalAsign.nro_doc}
                    </strong>
                  </label>
                </IonItem>
                <IonItem className="inputMargin">
                  <label>
                    Nro matricula:{"  "}
                    <strong className="text-bold pl-5">
                      {professionalAsign.nro_matricula}
                    </strong>
                  </label>
                </IonItem>
              </IonList>
              <div>
              <IonButton
                  className="formButtonmt-5"
                  color="danger"
                  onClick={() => setShowActionDeleteProfessional(true)}
                  expand="block"
                >
                  Desasignar profesional
                </IonButton>
                <IonActionSheet
                  isOpen={showActionDeleteProfessional}
                  onDidDismiss={() => setShowActionDeleteProfessional(false)}
                  buttons={[
                    {
                      text: "Desasignar",
                      role: "destructive",
                      icon: trash,
                      handler: () => {
                        handleDeleteProfessional();
                      },
                    },
                    {
                      text: "Cancelar",
                      icon: close,
                      role: "cancel",
                      handler: () => {
                        setShowActionDeleteProfessional(false);
                      },
                    },
                  ]}
                ></IonActionSheet>
              </div>
            </form>
          </IonRow>
        ) : (
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
