import React, { useState, useEffect } from "react";
import axios from "axios";
import { getPlatforms } from "@ionic/react";

const TEAyudoContext = React.createContext({} as IContext);

const TEAyudoProvider = (props: any) => {
  let url = "https://teayudotestingwebapp.azurewebsites.net";
  let loginEndpoint = "/api/usuario/login";
  let signInEndpoint = "/api/usuario/register";

  const [username, setUsername] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  const handleSignIn = (email: string, password: string) => {
    setLoading(true);
    setError(false);
    axios
      .post(`${url}${loginEndpoint}`, { correo: email, password: password })
      .then((res) => {
        console.log(res);
        setUsername(email);
        setAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };

  const handleSignUp = (
    name: string,
    email: string,
    password: string,
    idDoc?: string,
    docNumber?: string,
    licenseNumber?: string
  ) => {
    setLoading(true);
    setError(false);
    axios
      .post(`${url}${signInEndpoint}`, {
        nombre: name,
        apellido: "",
        correo: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const fetchPlatform = () => {
    const platforms = getPlatforms();
    const isMobile =
      platforms.includes("mobile") && !platforms.includes("tablet");
    setIsMobile(isMobile);
  };

  useEffect(() => {
    fetchPlatform();
  }, []);

  return (
    <TEAyudoContext.Provider
      value={{
        username,
        patientName,
        isMobile,
        authenticated,
        loading,
        error,
        handleSignIn,
        handleSignUp,
      }}
    >
      {props.children}
    </TEAyudoContext.Provider>
  );
};

interface IContext {
  username: string;
  patientName: string;
  isMobile: boolean;
  authenticated: boolean;
  loading: boolean;
  error: boolean;
  handleSignIn: any;
  handleSignUp: any;
}

export { TEAyudoProvider, TEAyudoContext };
