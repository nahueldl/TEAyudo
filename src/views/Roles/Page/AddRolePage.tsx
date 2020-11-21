import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonRow,
  NavContext,
} from "@ionic/react";
import React, { useCallback, useContext, useState } from "react";
import Page from "../../../components/Page";
import { AuthenticationContext } from "../../../context/authentication";
import { RegistrationContext } from "../../../context/registration";
import RolesService from "../../../services/roles.services";
import UserService from "../../../services/user.services";
import "./styles.css";

const AddRole: React.FC = () => {
  const { token, role } = useContext(AuthenticationContext).authData;
  const { name, lastname, email } = useContext(
    RegistrationContext
  ).registrationData;
  const { navigate } = useContext(NavContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [roles, setRoles] = useState<any>([]);
  const [error, hasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [licenseNumber, setLicenseNumber] = useState<number>();
  const [dni, setDni] = useState<number>();
  const [roleSelected, setRoleSelected] = useState<number>();

  const assignFamilyRol = () => {
    setLoading(true);
    RolesService.assignRol(token, 1, "Familiar")
      .then((res: any) => {
        setLoading(false);
        goToListRoles();
      })
      .catch((error: any) => {
        setLoading(false);
        hasError(true);
        setErrorMsg(error.response.data.msg);
      });
  };

  const assignMedicxRol = () => {
    setLoading(true);
    UserService.patchUsuario(
      token!,
      name,
      lastname,
      email,
      undefined,
      undefined,
      dni!.toString(),
      licenseNumber!.toString()
    )
      .then((res) => {
        RolesService.assignRol(token!, 2, "Profesional")
          .then((res: any) => {
            setLoading(false);
            goToListRoles();
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
        return licenseNumber && dni;
    }
  };

  const goToListRoles = useCallback(() => navigate("/roles", "back"), [
    navigate,
  ]);

  return (
    <Page pageTitle="Agregar rol" showHomeButton>
      <IonGrid
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {role === 1 ? (
          <>
            <IonRow>
              <IonCol>
                <IonList inset={true}>
                  <IonItem>
                    Podés agregar el rol de Profesional; elegí este rol sólo si
                    sos le medicx tratante de un paciente con TEA
                  </IonItem>
                  <div className="doctorData">
                    <h4 className="title">
                      Necesitamos algunos datos extra para continuar
                    </h4>
                    <IonItem>
                      <IonLabel>Número de matrícula</IonLabel>
                      <IonInput
                        value={licenseNumber}
                        placeholder="Número de matrícula"
                        onIonChange={(e) =>
                          setLicenseNumber(parseInt(e.detail.value!, 10))
                        }
                        clearInput
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Número de documento</IonLabel>
                      <IonInput
                        value={dni}
                        placeholder="Número de documento"
                        onIonChange={(e) =>
                          setDni(parseInt(e.detail.value!, 10))
                        }
                        clearInput
                      ></IonInput>
                    </IonItem>
                  </div>
                </IonList>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol style={{ display: "flex", justifyContent: "center" }}>
                <IonButton
                  disabled={!showSubmitButton()}
                  onClick={() => assignMedicxRol()}
                >
                  Siguiente
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        ) : (
          <>
            <IonRow>
              <IonCol>
                <IonList inset={true}>
                  <IonItem>
                    Podés agregar el rol de Familar; elegí este rol si sos el
                    familiar de un paciente con TEA
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol style={{ display: "flex", justifyContent: "center" }}>
                <IonButton
                  disabled={!showSubmitButton()}
                  onClick={() => assignFamilyRol()}
                >
                  Siguiente
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        )}
      </IonGrid>
    </Page>
  );
};

export default AddRole;
