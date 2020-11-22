/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import {
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonLoading,
  IonAlert,
  IonLabel,
} from "@ionic/react";
import { PlatformContext } from "../../context/platform";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";


const SignInForm: React.FC<Props> = ({ signIn, loading, error, msg }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState();
  const { isMobile } = useContext(PlatformContext).platformData;
  const { control, handleSubmit, formState, errors } = useForm({
    defaultValues: {},
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    setData(data);
    signIn(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isMobile ? (
          <img src="assets/icon/icon.png" alt="TEAyudo logo" />
        ) : null}
        <h1>Iniciar sesión</h1>
        <IonList>
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
        <a href="#">¿Olvidaste tu contraseña?</a>
        <IonButton
          className="formButton"
          type="submit"
          disabled={!formState.isValid}
        >
          Iniciar sesión
        </IonButton>
        <IonLoading
          isOpen={loading!}
          message={"Trabajando..."}
          spinner="crescent"
        />
        {isMobile ? (
          <IonLabel>
            ¿Aun no estás registradx? Desliza a la derecha para comenzar
          </IonLabel>
        ) : null}
      </form>
      <IonAlert
        isOpen={error!}
        animated
        backdropDismiss
        keyboardClose
        message={msg}
      />
    </>
  );
};

interface Props {
  signIn: (data: any) => void;
  loading: boolean;
  error: boolean;
  msg: string;
}
export default SignInForm;
