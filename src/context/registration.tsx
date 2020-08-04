import React, { useState } from "react";

const RegistrationContext = React.createContext({} as IContext);

const RegistrationProvider = (props: any) => {
  const [registrationData, setContextData] = useState<Partial<IData>>({});

  const setRegistrationData = (registrationData: Partial<IData>) => {
    setContextData((prevValues) => ({ ...prevValues, ...registrationData }));
  };

  return (
    <RegistrationContext.Provider value={{ registrationData, setRegistrationData }}>
      {props.children}
    </RegistrationContext.Provider>
  );
};

interface IData {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface IContext {
  registrationData: Partial<IData>;
  setRegistrationData: (registrationData: Partial<IData>) => void;
}

export { RegistrationProvider, RegistrationContext };
