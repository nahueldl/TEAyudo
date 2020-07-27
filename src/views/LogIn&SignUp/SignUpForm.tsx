import React, { useState, useContext } from "react";
import {
  IonIcon,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonLoading,
  IonAlert,
  IonLabel,
} from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import { AuthenticationContext } from "../../context/authentication";
import { PlatformContext } from "../../context/platform";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const ERROR_MESSAGE =
  "Hubo un error al iniciar sesión, por favor intenta nuevamente más tarde";

const SignUpForm: React.FC<Props> = ({ signUp }) => {
  const [data, setData] = useState();

  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { error, loading } = authData;
  const { isMobile } = useContext(PlatformContext).platformData;

  const { control, handleSubmit, formState, errors } = useForm({
    defaultValues: {},
    mode: "onChange",
  });

  /**
   *
   * @param data
   */
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 2));
    setData(data);
    signUp(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isMobile ? (
          <img src="assets/icon/icon.png" alt="TEAyudo logo" />
        ) : null}
        <h1>Registrarse</h1>
        <div className="iconsContainer">
          <a href="#">
            <IonIcon className="icon" icon={logoGoogle} size="large" />
          </a>
          <a href="#">
            <IonIcon className="icon" icon={logoFacebook} size="large" />
          </a>
        </div>
        <span>O utiliza tu email</span>
        <IonList>
          <IonItem className="inputMargin">
            <Controller
              render={({ onChange, onBlur, value }) => (
                <IonInput
                  clearInput
                  placeholder="Nombre"
                  onIonChange={onChange}
                />
              )}
              control={control}
              name="name"
              rules={{
                required: true,
              }}
            />
          </IonItem>
          <ErrorMessage
            errors={errors}
            name="name"
            as={<div style={{ color: "red" }} />}
          />
          <IonItem className="inputMargin">
            <Controller
              render={({ onChange, onBlur, value }) => (
                <IonInput
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                  placeholder="Email"
                />
              )}
              control={control}
              name="email"
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "La dirección de correo electrónico es inválida",
                },
              }}
            />
          </IonItem>
          <ErrorMessage
            errors={errors}
            name="email"
            as={<div style={{ color: "red" }} />}
          />
          <IonItem className="inputMargin">
            <Controller
              render={({ onChange, onBlur, value }) => (
                <IonInput
                  onIonChange={onChange}
                  type="password"
                  placeholder="Contraseña"
                />
              )}
              control={control}
              name="password"
              rules={{
                required: true,
                minLength: {
                  value: 8,
                  message: "Debe tener al menos 8 caracteres",
                },
              }}
            />
          </IonItem>
          <ErrorMessage
            errors={errors}
            name="password"
            as={<div style={{ color: "red" }} />}
          />
        </IonList>
        <IonButton
          className="formButton"
          type="submit"
          disabled={!formState.isValid}
        >
          Registrarse
        </IonButton>
        <IonLoading
          isOpen={loading!}
          message={"Trabajando..."}
          spinner="crescent"
        />
        {isMobile ? (
          <IonLabel>
            ¿Ya estás registradx? Desliza a la izquierda para comenzar
          </IonLabel>
        ) : null}
      </form>
      <IonAlert
        isOpen={error!}
        animated
        backdropDismiss
        keyboardClose
        message={ERROR_MESSAGE}
        onDidDismiss={() => setAuthData({ error: false })}
      />
    </>
  );
};
interface Props {
  signUp: (data: any) => void;
}

export default SignUpForm;