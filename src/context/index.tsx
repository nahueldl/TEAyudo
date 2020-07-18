import React, { useState, useEffect } from "react";
import { getPlatforms } from "@ionic/react";

const TEAyudoContext = React.createContext({} as IContext);

const TEAyudoProvider = (props: any) => {
  const [data, setContextData] = useState<Partial<IData>>({
    authenticated: true,
    username: "lila",
    patientName: "",
  });

  const setData = (data: Partial<IData>) => {
    setContextData((prevValues) => ({ ...prevValues, ...data }));
  };

  const fetchPlatform = () => {
    const platforms = getPlatforms();
    const isMobile =
      platforms.includes("mobile") && !platforms.includes("tablet");
    setData({ isMobile: isMobile });
  };

  useEffect(() => {
    fetchPlatform();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TEAyudoContext.Provider value={{ data, setData }}>
      {props.children}
    </TEAyudoContext.Provider>
  );
};

interface IData {
  username: string;
  patientName: string;
  isMobile: boolean;
  authenticated: boolean;
  loading: boolean;
  error: boolean;
  handleSignIn: (email: string, password: string) => void;
  handleSignUp: any;
}

interface IContext {
  data: Partial<IData>;
  setData: (data: Partial<IData>) => void;
}

export { TEAyudoProvider, TEAyudoContext };
