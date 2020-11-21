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
import { RegistrationContext } from "../../../context/registration";
const { Storage } = Plugins;

const RoleSelection: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { name, lastname, email } = useContext(
    RegistrationContext
  ).registrationData;
  const [loading, setLoading] = useState<boolean>(true);
  const [roles, setRoles] = useState<any>([]);
  const [error, hasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [selection, isSelection] = useState<boolean>();
  const [addition, isAddition] = useState<boolean>();
  const [licenseNumber, setLicenseNumber] = useState<number>();
  const [dni, setDni] = useState<number>();
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
          console.log(error.response);
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
      authData.token!,
      name,
      lastname,
      email,
      undefined,
      undefined,
      dni!.toString(),
      licenseNumber!.toString()
    )
      .then((res) => {
        RolesService.assignRol(authData.token!, newRole, descripction)
          .then((res: any) => {
            setLoading(false);
            setAuthData({ role: newRole });
            Storage.set({ key: "role", value: newRole.toString() });
          })
          .catch((error: any) => {
            console.log(error.response);
            setLoading(false);
            hasError(true);
            setErrorMsg(error.response.data.msg);
          });
      })
      .catch((error: any) => {
        setLoading(false);
        console.log(error.response);

        hasError(true);
        setErrorMsg(error.response.data.msg);
      });
  };

  const showSubmitButton = () => {
    switch (roleSelected) {
      case 1:
        return true;
      case 2:
        return licenseNumber && dni;
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
            <IonGrid
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <IonRow>
                <IonCol size="12">
                  <h1 className="title">
                    Para continuar, necesitamos que des de alta un rol
                  </h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonList inset={true}>
                    <IonRadioGroup>
                      <IonItem onClick={() => setRoleSelected(1)}>
                        <IonRadio value="familiar" />
                        <IonLabel>
                          <h2
                            style={{ paddingLeft: "10px" }}
                            className="itemTitle"
                          >
                            Familiar
                          </h2>
                          <h3 style={{ paddingLeft: "10px" }}>
                            Elegí este rol si sos el familiar de un paciente con
                            TEA
                          </h3>
                        </IonLabel>
                      </IonItem>
                      <IonItem onClick={() => setRoleSelected(2)}>
                        <IonRadio value="profesional" />
                        <IonLabel>
                          <h2
                            style={{ paddingLeft: "10px" }}
                            className="itemTitle"
                          >
                            Profesional
                          </h2>
                          <h3 style={{ paddingLeft: "10px" }}>
                            Elegí este rol si sos le médicx tratante de un
                            paciente con TEA
                          </h3>
                        </IonLabel>
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>
                  {roleSelected! === 2 ? (
                    <div className="doctorData">
                      <h4 className="title">
                        Necesitamos algunos datos extra para continuar
                      </h4>
                      <IonItem>
                        <IonLabel position="stacked">
                          Número de matrícula
                        </IonLabel>
                        <IonInput
                          type="number"
                          value={licenseNumber}
                          placeholder="Número de matrícula"
                          onIonChange={(e) =>
                            setLicenseNumber(parseInt(e.detail.value!, 10))
                          }
                          clearInput
                        ></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">
                          Número de documento
                        </IonLabel>
                        <IonInput
                          type="number"
                          value={dni}
                          placeholder="Número de documento"
                          onIonChange={(e) =>
                            setDni(parseInt(e.detail.value!, 10))
                          }
                          clearInput
                        ></IonInput>
                      </IonItem>
                    </div>
                  ) : null}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol style={{ display: "flex", justifyContent: "center" }}>
                  <IonButton
                    disabled={!showSubmitButton()}
                    onClick={() => assignRol()}
                  >
                    Siguiente
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        ) : null}
        {error ? (
          <IonAlert
            isOpen={error!}
            animated
            backdropDismiss
            keyboardClose
            message={errorMsg}
          />
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default RoleSelection;
