import React, { useEffect, useContext, useState, useCallback } from "react";
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
  IonAlert,
  NavContext,
} from "@ionic/react";
import { capitalizeFirstLetter } from "../../../utils/methods";
import { addCircleOutline } from "ionicons/icons";
import CardWithIcon from "../../../components/CardWithIcon";

const RolesPage: React.FC = () => {
  const { authData } = useContext(AuthenticationContext);
  const { navigate } = useContext(NavContext);

  const [roles, setRoles] = useState<any>();
  const [loading, isLoading] = useState<boolean>(true);
  const [error, hasError] = useState<boolean>(false);

  useEffect(() => {
    handleGetRoles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetRoles = () => {
    isLoading(true);
    hasError(false);
    RolesService.getPatientRoles(authData.token!)
      .then((res: any) => {
        setRoles(res.data);
        isLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        hasError(true);
        isLoading(true);
      });
  };

  const handleAddRol = () => {
    goToAddRole();
  };

  const goToAddRole = useCallback(() => navigate("/roles/alta", "forward"), [
    navigate,
  ]);

  return (
    <Page pageTitle="Roles" showHomeButton>
      <IonContent>
        {loading ? (
          <IonLoading
            isOpen={loading}
            message={"Trabajando..."}
            spinner="crescent"
          />
        ) : (
          <IonGrid className="container">
            <IonRow>
              {roles.map((rol: any) => (
                <IonCol key={rol.id_rol} size="12">
                  <IonCard>
                    <IonItem>
                      <IonLabel>
                        {capitalizeFirstLetter(rol.descripcion)}
                      </IonLabel>
                    </IonItem>
                  </IonCard>
                </IonCol>
              ))}
              <IonCol size="12">
                <CardWithIcon
                  icon={addCircleOutline}
                  title="Agregar"
                  touchable
                  onClick={() => handleAddRol()}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
        {error ? (
          <IonAlert
            isOpen={error!}
            animated
            backdropDismiss
            keyboardClose
            message={"Algún error!"}
          />
        ) : null}
      </IonContent>
    </Page>
  );
};

export default RolesPage;
