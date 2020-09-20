import React, { useState } from "react";

const PatientContext = React.createContext({} as IContext);

const PatientProvider = (props: any) => {
  const [patientData, setContextData] = useState<Partial<IData>>({});

  const setPatientData = (data: Partial<IData>) => {
    setContextData((prevValues) => ({ ...prevValues, ...data }));
  };

  return (
    <PatientContext.Provider value={{ patientData, setPatientData }}>
      {props.children}
    </PatientContext.Provider>
  );
};

interface IData {
  name: string;
  lastName: string;
  birthday: string;
  avatar: string;
}

interface IContext {
  patientData: Partial<IData>;
  setPatientData: (data: Partial<IData>) => void;
}

export { PatientProvider, PatientContext };
