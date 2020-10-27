import React, { useState } from "react";
import { Category } from "../types/Categories";

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
  categoriaSelected: Category;
  categoriasList: [Category];
}

interface IContext {
  categoriaData: Partial<IData>;
  setCategoriaData: (data: Partial<IData>) => void;
}

export { CategoriaProvider, CategoryContext };
