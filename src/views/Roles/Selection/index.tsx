import React, { useState, useCallback, useEffect } from "react";
import { useContext } from "react";
import {
  NavContext,
  IonContent,
  IonLoading,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonIcon,
} from "@ionic/react";
import { AuthenticationContext } from "../../../context/authentication";
import RolesService from "../../../services/roles.services";
import "./styles.css";
import { personCircleOutline } from "ionicons/icons";

const RoleSelection: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { token } = useContext(AuthenticationContext).authData;
  const [render, setRender] = useState<boolean>(true);
  const [roles, setRoles] = useState<any>([
    { title: "Familiar" },
    { title: "Medicx" },
  ]);

  useEffect(() => {
    handleGetRoles();
  });

  const handleGetRoles = () => {
    RolesService.handleGetRoles(token!)
      .then((res: any) =>
        res.data.length > 1 ? setRender(true) : goToSelectPatient()
      )
      .catch((error: any) => console.log(error));
  };

  const goToSelectPatient = useCallback(
    () => navigate("/pacientes/seleccion", "forward"),
    [navigate]
  );

  return (
    <IonContent>
      <IonLoading
        isOpen={!render}
        message={"Trabajando..."}
        spinner="crescent"
      />
      <IonGrid className="container">
        <IonRow>
          <IonCol size="12">
            <h1 className="title">
              Selecciona el rol que deseas usar para avanzar
            </h1>
          </IonCol>
        </IonRow>
        <IonRow>
          {roles.map((rol: any, index: number) => (
            <IonCol size="auto" sizeSm="12" sizeMd="6">
              <IonCard button={true}>
                <IonItem>
                  <IonIcon icon={personCircleOutline} slot="start" />
                  <IonLabel>{rol.title}</IonLabel>
                </IonItem>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default RoleSelection;
