import {
  IonAlert,
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
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
  const roleToAdd: number = role === 1 ? 2 : 1;
  const { name, lastname, email } = useContext(
    RegistrationContext
  ).registrationData;
  const { navigate } = useContext(NavContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, hasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [licenseNumber, setLicenseNumber] = useState<number>();
  const [dni, setDni] = useState<number>();

  const assignFamilyRol = () => {
    setLoading(true);
    RolesService.assignRol(token, 1, "Familiar")
      .then((res: any) => {
        setLoading(false);
        goToListRoles();
      })
      .catch((error: any) => {
        setErrorMsg(error.response.data.msg);
        setLoading(false);
        hasError(true);
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
            setErrorMsg(error.response.data.msg);
            hasError(true);
          });
      })
      .catch((error: any) => {
        setLoading(false);
        setErrorMsg(error.response.data.msg);
        hasError(true);
      });
  };

  const showSubmitButton = () => {
    switch (roleToAdd) {
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
      {loading ? (
        <IonLoading
          isOpen={loading}
          message={"Trabajando..."}
          spinner="crescent"
        />
      ) : (
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
                      Podés agregar el rol de Profesional; elegí este rol sólo
                      si sos le medicx tratante de un paciente con TEA
                    </IonItem>
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
      )}

      {error ? (
        <IonAlert
          cssClass="text-align: justify;"
          isOpen={error!}
          animated
          backdropDismiss
          keyboardClose
          message={errorMsg}
        />
      ) : null}
    </Page>
  );
};

export default AddRole;
