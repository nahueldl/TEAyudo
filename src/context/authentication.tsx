import React, { useState } from "react";

const AuthenticationContext = React.createContext({} as IContext);

const AuthenticationProvider = (props: any) => {
  const [data, setContextData] = useState<Partial<IData>>({});

  const setData = (data: Partial<IData>) => {
    setContextData((prevValues) => ({ ...prevValues, ...data }));
  };

  return (
    <AuthenticationContext.Provider value={{ authData: data, setData }}>
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
}

interface IContext {
  authData: Partial<IData>;
  setData: (data: Partial<IData>) => void;
}

export { AuthenticationProvider, AuthenticationContext };
