import React, { useState } from "react";
import axios from "axios";
import { isPlatform, getPlatforms } from "@ionic/react";

const TEAyudoContext = React.createContext({} as IContext);

const TEAyudoProvider = (props: any) => {
  let url = "";
  const platforms = getPlatforms();
  const isMobile =
    platforms.includes("mobile") && !platforms.includes("tablet");
  const [username, setUsername] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSignIn = (param: string) => {
   
  };

  const handleSignUp = (param: string) => {
    
  };

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
        handleSignUp
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
  handleSignUp: any
}

export { TEAyudoProvider, TEAyudoContext };
