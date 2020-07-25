import React, { useState } from "react";

const RegistrationContext = React.createContext({} as IContext);

const RegistrationProvider = (props: any) => {
  const [registrationData, setContextData] = useState<Partial<IData>>({});

  const setData = (registrationData: Partial<IData>) => {
    setContextData((prevValues) => ({ ...prevValues, ...registrationData }));
  };

  return (
    <RegistrationContext.Provider value={{ registrationData, setData }}>
      {props.children}
    </RegistrationContext.Provider>
  );
};

interface IData {
  name: string;
  email: string;
  password: string;
  rol: "F" | "M";
}

interface IContext {
  registrationData: Partial<IData>;
  setData: (registrationData: Partial<IData>) => void;
}

export { RegistrationProvider, RegistrationContext };
