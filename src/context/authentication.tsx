import React, { useEffect, useState } from "react";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

const AuthenticationContext = React.createContext({} as IContext);

const AuthenticationProvider = (props: any) => {
  const [authData, setContextData] = useState<Partial<IData>>({});

  const setAuthData = (data: Partial<IData>) => {
    setContextData((prevValues) => ({ ...prevValues, ...data }));
  };

  const fetchInitialData = () => {
    Storage.get({ key: "token" }).then((res) =>
      setAuthData({ token: res.value! })
    );
    Storage.get({ key: "tokenExpirationDate" }).then((res) =>
      setAuthData({ tokenExpirationDate: res.value! })
    );
    Storage.get({ key: "patientName" }).then((res) =>
      setAuthData({ patientName: res.value! })
    );
    Storage.get({ key: "rol" }).then((res) => {
      res.value
        ? res.value === "F"
          ? setAuthData({ role: "F" })
          : setAuthData({ role: "M" })
        : setAuthData({ role: undefined });
    });
    Storage.get({ key: "username" }).then((res) => {
      setAuthData({ username: res.value! });
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
  authenticated: boolean;
  loading: boolean;
  error: boolean;
  token: string;
  tokenExpirationDate: string;
  role: "F" | "M";
}

interface IContext {
  authData: Partial<IData>;
  setAuthData: (data: Partial<IData>) => void;
}

export { AuthenticationProvider, AuthenticationContext };
