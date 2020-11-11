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
  const [roles, setRoles] = useState<any>([
    { descripcion: "Familiar", id_rol: "F" },
    { descripcion: "Medicx", id_rol: "M" },
  ]);

  useEffect(() => {
    handleGetRoles();
  }, []);

  const handleGetRoles = () => {
    console.log("rol selection");
    setLoading(true);
    RolesService.getPatientRoles(authData.token!)
      .then((res: any) => {
        if (res.data.length > 1) {
          setRoles(res.data);
          setLoading(false);
        } else {
          handleRolSelection(res.data[0]);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setLoading(false);
        goToAddRole();
      });
  };

  const handleRolSelection = (rol: any) => {
    setAuthData({ role: rol.id_rol });
    Storage.set({ key: "rol", value: rol.id_rol });
    goToSelectPatient();
  };

  const goToSelectPatient = useCallback(
    () => navigate("/pacientes/seleccion", "forward"),
    [navigate]
  );

  const goToAddRole = useCallback(() => navigate("/roles/alta", "forward"), [
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
              <h1 className="title">
                Selecciona el rol que deseas usar para avanzar
              </h1>
            </IonCol>
          </IonRow>
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
      )}
    </IonContent>
  );
};

export default RoleSelection;
