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

const RoleSelection: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const [render, setRender] = useState<boolean>(true);
  const [roles, setRoles] = useState<any>([
    { title: "Familiar", id: "F" },
    { title: "Medicx", id: "M" },
  ]);

  useEffect(() => {
    handleGetRoles();
  });

  const handleGetRoles = () => {
    RolesService.handleGetRoles(authData.token!)
      .then((res: any) =>
        res.data.length > 1 ? setRender(true) : handleRolSelection(res.data[0])
      )
      .catch((error: any) => console.log(error));
  };

  const handleRolSelection = (rol: any) => {
    setAuthData({ role: rol.id });
    goToSelectPatient();
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
            <IonCol key={rol.id} size="auto" sizeSm="12" sizeMd="6">
              <IonCard button={true} onClick={() => handleRolSelection(rol)}>
                <IonItem>
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
