import React, { useState } from "react";

const ProfessionalContext = React.createContext({} as IContext);

const ProfessionalProvider = (props: any) => {
  const [professionalData, setContextData] = useState<Partial<IData>>({});

  const setProfessionalData = (data: Partial<IData>) => {
    setContextData((prevValues) => ({ ...prevValues, ...data }));
  };

  return (
    <ProfessionalContext.Provider value={{ professionalData, setProfessionalData }}>
      {props.children}
    </ProfessionalContext.Provider>
  );
};

interface IData {
  professionalSelected: Professional;
  professionalsList: Professional[];
}

interface Professional {
  id_paciente?: any;
  nombre?: string;
  apellido?: string;
  avatar?: string;
}

interface IContext {
  professionalData: Partial<IData>;
  setProfessionalData: (data: Partial<IData>) => void;
}

export { ProfessionalProvider, ProfessionalContext };
