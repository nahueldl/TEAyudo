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
  const { authData } = useContext(AuthenticationContext);
  const [roles, setRoles] = useState<any>();
  const [loading, isLoading] = useState<boolean>(true);
  const [error, hasError] = useState<{ status: boolean; msg: string }>({
    status: false,
    msg: "",
  });
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let unmounted = false;
    handleGetRoles();
    return () => {
      unmounted = true;
    };
  }, []);

  const handleGetRoles = () => {
    isLoading(true);
    RolesService.getAllRoles()
      .then((res) => {
        setRoles(res.data);
        isLoading(false);
      })
      .catch((error) => {
        hasError({ status: true, msg: error.msg });
        isLoading(false);
      });
  };

  const assignRol = (newRol: number, description: string) => {
    isLoading(true);
    RolesService.assignRol(authData.token, newRol, description)
      .then((res: any) => {
        isLoading(false);
        goToHome();
      })
      .catch((error: any) => {
        console.log(error);
        isLoading(false);
        hasError({ status: true, msg: error });
      });
  };

  const goToHome = useCallback(() => navigate(`/inicio`, "forward"), [
    navigate,
  ]);

  return (
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
      {error.status ? (
        <IonAlert
          isOpen={error!.status}
          animated
          backdropDismiss
          keyboardClose
          message={error!.msg}
        />
      ) : null}
    </IonContent>
  );
};

export default AddRole;
