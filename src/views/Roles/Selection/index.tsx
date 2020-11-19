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
  IonInput,
  IonList,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import { AuthenticationContext } from "../../../context/authentication";
import RolesService from "../../../services/roles.services";
import UserService from "../../../services/user.services";
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
  const [licenseNumber, setLicenseNumber] = useState<number>();
  const [roleSelected, setRoleSelected] = useState<number>();

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

  const assignRol = () => {
    if (roleSelected === 1) {
      assignFamilyRol(1, "Familiar");
    } else {
      if (roleSelected === 2) {
        assignMedicxRol(2, "Profesional");
      }
    }
  };

  const assignFamilyRol = (newRol: number, description: string) => {
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

  const assignMedicxRol = (newRole: number, descripction: string) => {
    setLoading(true);
    UserService.patchUsuario(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      licenseNumber!.toString()
    )
      .then((res) => {
        RolesService.assignRol(authData.token!, newRole, descripction)
          .then((res: any) => {
            setLoading(false);
            setAuthData({ role: newRole });
            Storage.set({ key: "role", value: newRole.toString() });
            console.log("rol assigned!");
          })
          .catch((error: any) => {
            setLoading(false);
            hasError(true);
            setErrorMsg(error.response.data.msg);
          });
      })
      .catch((error: any) => {
        setLoading(false);
        hasError(true);
        setErrorMsg(error.response.data.msg);
      });
  };

  const showSubmitButton = () => {
    switch (roleSelected) {
      case 1:
        return true;
      case 2:
        return licenseNumber;
    }
  };

  const goToSelectPatient = useCallback(
    () => navigate("/pacientes/seleccion", "forward"),
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
          <>
            <IonList inset={true}>
              <IonRadioGroup>
                <IonItem onClick={() => setRoleSelected(1)}>
                  <IonRadio value="familiar" />
                  <IonLabel>
                    <h2 className="itemTitle">Familiar</h2>
                    <h3 style={{ paddingLeft: "10px" }}>
                      Elegí este rol si sos el familiar de un paciente con TEA
                    </h3>
                  </IonLabel>
                </IonItem>
                <IonItem onClick={() => setRoleSelected(2)}>
                  <IonRadio value="profesional" />
                  <IonLabel>
                    <h2 className="itemTitle">Profesional</h2>
                    <h3 style={{ paddingLeft: "10px" }}>
                      Elegí este rol si sos le médicx tratante de un paciente
                      con TEA
                    </h3>
                  </IonLabel>
                </IonItem>
              </IonRadioGroup>
            </IonList>
            {roleSelected! === 2 ? (
              <div className="doctorData">
                <h4 className="title">
                  Necesitamos verificar tu matrícula para continuar
                </h4>
                <IonItem>
                  <IonInput
                    value={licenseNumber}
                    placeholder="Número de matrícula"
                    onIonChange={(e) =>
                      setLicenseNumber(parseInt(e.detail.value!, 10))
                    }
                    clearInput
                  ></IonInput>
                </IonItem>
              </div>
            ) : null}
            <IonButton
              disabled={!showSubmitButton()}
              onClick={() => assignRol()}
            >
              Siguiente
            </IonButton>
          </>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default RoleSelection;
