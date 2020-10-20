import React, { useState } from "react";

const CategoryContext = React.createContext({} as IContext);

const CategoriaProvider = (props: any) => {
  const [categoriaData, setContextData] = useState<Partial<IData>>({});

  const setCategoriaData = (data: Partial<IData>) => {
    setContextData((prevValues) => ({ ...prevValues, ...data }));
  };

  return (
    <CategoryContext.Provider value={{ categoriaData, setCategoriaData }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

interface IData {
  categoriaSelected: Categoria;
  categoriasList: [Categoria];
}

interface Categoria {
  id_categoria?: any;
  id_usuario_rol?: string;
  nombre?: string;
}

interface IContext {
  categoriaData: Partial<IData>;
  setCategoriaData: (data: Partial<IData>) => void;
}

export { CategoriaProvider, CategoryContext };
