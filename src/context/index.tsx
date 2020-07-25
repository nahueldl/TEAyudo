/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { getPlatforms } from "@ionic/react";

//Borrar una vez que esté resuelta la conexion con el server
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pauseMe() {
  await sleep(9000);
}

const user = { username: "lilapapazian@gmail.com", password: "123456789" };

const TEAyudoContext = React.createContext({} as IContext);

const TEAyudoProvider = (props: any) => {
  const [data, setContextData] = useState<Partial<IData>>({});

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
}

interface IContext {
  data: Partial<IData>;
  setData: (data: Partial<IData>) => void;
}

export { TEAyudoProvider, TEAyudoContext };
