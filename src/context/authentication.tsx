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
    Storage.get({ key: "patientId" }).then((res) =>
      setAuthData({ patientId: res.value! })
    );
    Storage.get({ key: "role" }).then((res) => {
      res.value
        ? setAuthData({role: parseInt(res.value)})
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
