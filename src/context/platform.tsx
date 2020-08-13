import React, { useState, useEffect } from "react";
import { getPlatforms } from "@ionic/react";

const PlatformContext = React.createContext({} as IContext);

const PlatformProvider = (props: any) => {
  const [platformData, setContextData] = useState<Partial<IData>>({});

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
    <PlatformContext.Provider value={{ platformData }}>
      {props.children}
    </PlatformContext.Provider>
  );
};

interface IData {
  isMobile: boolean;
}

interface IContext {
  platformData: Partial<IData>;
}

export { PlatformProvider, PlatformContext };
