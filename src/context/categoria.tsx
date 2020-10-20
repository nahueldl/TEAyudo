import React, { useState } from "react";

const CategoriaContext = React.createContext({} as IContext);

const CategoriaProvider = (props: any) => {
  const [categoriaData, setContextData] = useState<Partial<IData>>({});

  const setCategoriaData = (data: Partial<IData>) => {
    setContextData((prevValues) => ({ ...prevValues, ...data }));
  };

  return (
    <CategoriaContext.Provider value={{ categoriaData, setContextData }}>
      {props.children}
    </CategoriaContext.Provider>
  );
};

interface IData {
  categoriaSelected: Categoria;
}

interface Categoria {
  id_categoria?: any;
  id_usuario_rol?: string;
  nombre?: string;
}

interface IContext {
  categoriaData: Partial<IData>;
  setContextData: (data: Partial<IData>) => void;
}

export { CategoriaProvider, CategoriaContext };
