import React, { useContext, useEffect, useState } from "react";
import { IonActionSheet, IonAvatar, IonButton, IonItem, IonList, IonRow, IonTitle } from "@ionic/react";
import { trash, close } from "ionicons/icons";
import { Professional } from "../../../types/Professionals";


const ViewProfessionalAsign: React.FC<Props> = ({setShowActionDeleteProfessional, handleDeleteProfessional, professionalAsign, avatarString, showActionDeleteProfessional}) => {
 return (
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
 );
};

interface Props {
    setShowActionDeleteProfessional:  (value: boolean) => void;
    handleDeleteProfessional: () => void;
    professionalAsign: Professional;
    avatarString: string;
    showActionDeleteProfessional: boolean;
  }

export default ViewProfessionalAsign;