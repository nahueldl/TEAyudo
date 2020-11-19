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
  IonPage,
  IonAlert,
  IonButton,
} from "@ionic/react";
import { AuthenticationContext } from "../../../context/authentication";
import RolesService from "../../../services/roles.services";
import "./styles.css";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const RoleSelection: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [defaultRoles] = useState<any[]>([
    { id_rol: 1, descripcion: "Familiar" },
    { id_rol: 2, descripcion: "Profesional" },
  ]);
  const [roles, setRoles] = useState<any>([]);
  const [error, hasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [selection, isSelection] = useState<boolean>();
  const [addition, isAddition] = useState<boolean>();

  useEffect(() => {
    handleGetRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetRoles = () => {
    setLoading(true);
    hasError(false);
    isAddition(false);
    isSelection(false);
    RolesService.getPatientRoles(authData.token!)
      .then((res: any) => {
        if (res.data.length > 1) {
          setRoles(res.data);
          setLoading(false);
          isSelection(true);
          isAddition(false);
        } else {
          setLoading(false);
          handleRolSelection(res.data[0]);
        }
      })
      .catch((error: any) => {
        if (error.response.status === 400) {
          setLoading(false);
          isAddition(true);
        } else {
          setLoading(false);
          hasError(true);
          setErrorMsg(error.response.data.msg);
        }
      });
  };

  const handleRolSelection = (rol: any) => {
    setAuthData({ role: rol.id_rol });
    Storage.set({ key: "role", value: rol.id_rol });
    goToSelectPatient();
  };

  const assignRol = (newRol: number, description: string) => {
    setLoading(true);
    RolesService.assignRol(authData.token, newRol, description)
      .then((res: any) => {
        setLoading(false);
        setAuthData({ role: newRol });
        Storage.set({ key: "role", value: newRol.toString() });
        console.log("rol assigned!");
      })
      .catch((error: any) => {
        setLoading(false);
        hasError(true);
        setErrorMsg(error.response.data.msg);
      });
  };

  const goToSelectPatient = useCallback(
    () => navigate("/pacientes/seleccion", "forward"),
    [navigate]
  );

  const goToAddRole = useCallback(
    () => navigate("/roles/alta", "forward", "push"),
    [navigate]
  );

  return (
    <IonPage>
      <IonContent>
        {loading ? (
          <IonLoading
            isOpen={loading}
            message={"Trabajando..."}
            spinner="crescent"
          />
        ) : error ? (
          <IonAlert
            isOpen={error!}
            animated
            backdropDismiss
            keyboardClose
            message={errorMsg}
          />
        ) : selection ? (
          <IonGrid className="container">
            <IonRow>
              <IonCol size="12">
                <h1 className="title">
                  Selecciona el rol que deseas usar para avanzar
                </h1>
              </IonCol>
            </IonRow>
            <IonRow>
              {roles.map((rol: any) => (
                <IonCol key={rol.id_rol} size="12">
                  <IonCard
                    button={true}
                    onClick={() => handleRolSelection(rol)}
                  >
                    <IonItem>
                      <IonLabel>{rol.descripcion}</IonLabel>
                    </IonItem>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        ) : addition ? (
          <IonGrid className="container">
            <IonRow>
              <IonCol size="12">
                <h1 className="title">Da de alta un rol para poder avanzar</h1>
              </IonCol>
              {defaultRoles!.map((rol: any, index: any) => {
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
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default RoleSelection;
