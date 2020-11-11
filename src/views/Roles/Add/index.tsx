import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonLoading,
  IonRow,
  NavContext,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { AuthenticationContext } from "../../../context/authentication";
import RolesService from "../../../services/roles.services";

const AddRole: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const [roles, setRoles] = useState<any>();
  const [loading, isLoading] = useState<boolean>(true);
  const [error, hasError] = useState<boolean>(false);
  useEffect(() => {
    handleGetRoles();
  }, []);

  const handleGetRoles = () => {
    isLoading(true);
    RolesService.getAllRoles()
      .then((res) => {
        console.log(res.data);
        setRoles(res.data);
        isLoading(false);
      })
      .catch((error) => {
        console.log(error);
        hasError(true);
        isLoading(false);
      });
  };

  const assignRol = (newRol: number, description: string) => {
    RolesService.assignRol(authData.token, newRol, description)
      .then((res: any) => {
        goToHome();
      })
      .catch((error: any) => {
        setAuthData({ role: "F" });
        goToHome();
      });
  };

  const goToHome = useCallback(() => navigate(`/inicio`, "forward"), [
    navigate,
  ]);

  return (
    <IonContent>
      <IonLoading
        isOpen={loading}
        message={"Trabajando..."}
        spinner="crescent"
      />
      {loading ? null : (
        <IonGrid className="container">
          <IonRow>
            <IonCol size="12">
              <h1 className="title">Da de alta un rol para poder avanzar</h1>
            </IonCol>
            {roles!.map((rol: any, index: any) => {
              return (
                <IonCol key={index}>
                  <IonButton
                    onClick={() => assignRol(rol.id_rol, rol.descripcion)}
                  >
                    {rol.descripcion}
                  </IonButton>
                </IonCol>
              );
            })}
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
  );
};

export default AddRole;
