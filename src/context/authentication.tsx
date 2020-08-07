import React, { useState } from "react";

const AuthenticationContext = React.createContext({} as IContext);

const AuthenticationProvider = (props: any) => {
  const [authData, setContextData] = useState<Partial<IData>>({});

  const setAuthData = (data: Partial<IData>) => {
    setContextData((prevValues) => ({ ...prevValues, ...data }));
  };

  return (
    <AuthenticationContext.Provider value={{ authData, setAuthData }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

interface IData {
  username: string;
  patientName: string;
  authenticated: boolean;
  loading: boolean;
  error: boolean;
  token: string;
}

interface IContext {
  authData: Partial<IData>;
  setAuthData: (data: Partial<IData>) => void;
}

export { AuthenticationProvider, AuthenticationContext };
