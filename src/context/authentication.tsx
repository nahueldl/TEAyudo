import React, { useEffect, useState } from "react";
import { get } from "../services/storage.services";

const AuthenticationContext = React.createContext({} as IContext);

const AuthenticationProvider = (props: any) => {
  const [authData, setContextData] = useState<Partial<IData>>({});

  const setAuthData = (data: Partial<IData>) => {
    setContextData((prevValues) => ({ ...prevValues, ...data }));
  };

  const fetchInitialData = () => {
    get("token").then((res) => {
      setAuthData({ token: res });
    });
    get("tokenExpirationDate").then((res) =>
      setAuthData({ tokenExpirationDate: res })
    );
    get("patientName").then((res) => setAuthData({ patientName: res }));
    get("patientId").then((res) => setAuthData({ patientId: res }));
    get("role").then((res) => {
      res
        ? setAuthData({ role: parseInt(res) })
        : setAuthData({ role: undefined });
    });
    get("username").then((res) => {
      setAuthData({ username: res });
    });
  };

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthenticationContext.Provider value={{ authData, setAuthData }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

interface IData {
  username: string;
  patientName: string;
  patientId: string;
  authenticated: boolean;
  token: string;
  tokenExpirationDate: string;
  role: number;
}

interface IContext {
  authData: Partial<IData>;
  setAuthData: (data: Partial<IData>) => void;
}

export { AuthenticationProvider, AuthenticationContext };
