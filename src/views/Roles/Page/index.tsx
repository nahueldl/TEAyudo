import React, { useEffect, useContext, useState } from "react";
import Page from "../../../components/Page";
import { AuthenticationContext } from "../../../context/authentication";
import RolesService from "../../../services/roles.services";
import {
  IonContent,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonItem,
  IonLabel,
} from "@ionic/react";

const RolesPage: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const [roles, setRoles] = useState<any>();
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    handleGetRoles();
  });

  const handleGetRoles = () => {
    RolesService.handleGetRoles(authData.token!)
      .then((res: any) => setStateForView(res.data))
      .catch((error: any) => console.log(error));
  };

  const setStateForView = (roles: any) => {
    setRoles(roles);
    setRender(true);
  };

  const handleRolSelection = (rol: any) => {
    setAuthData({ role: rol.id_rol });
  };

  return (
    <Page pageTitle="Roles" showHomeButton>
      <IonContent>
        <IonLoading
          isOpen={!render}
          message={"Trabajando..."}
          spinner="crescent"
        />
        <IonGrid className="container">
          <IonRow>
            {roles.map((rol: any) => (
              <IonCol key={rol.id_rol} size="12">
                <IonCard button={true} onClick={() => handleRolSelection(rol)}>
                  <IonItem>
                    <IonLabel>{rol.descripcion}</IonLabel>
                  </IonItem>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </Page>
  );
};

export default RolesPage;
