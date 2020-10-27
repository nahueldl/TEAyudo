import React, { useContext, useCallback } from "react";
import { IonGrid, IonRow, IonCol, NavContext, IonButton } from "@ionic/react";
import { CategoryContext } from "../../../context/category";
import { Category } from "../../../types/Categories";

const ListCategories: React.FC<ListCategories> = () => {
  const { categoriaData, setCategoriaData } = useContext(CategoryContext);
  const { navigate } = useContext(NavContext);

  const handleButtonCategoriaClick = (categoria: Category) => {
    setCategoriaData({ categoriaSelected: categoria });
    goToViewEditDeleteCategory();
  };

  const goToViewEditDeleteCategory = useCallback(
    () => navigate("/categorias/edicion", "forward"),
    [navigate]
  );

  return (
    <IonGrid className="overflow-auto">
      <IonRow>
         {categoriaData.categoriasList?.map((categoria, index) => ( 
          <IonCol key={index}  size="auto">
            <IonButton size="large" expand="block" className="" onClick={() => {handleButtonCategoriaClick(categoria);}}>
               {categoria.nombre} 
            </IonButton>
          </IonCol>
         ))}  
      </IonRow>
    </IonGrid>
  );
};

interface ListCategories {}

export default ListCategories;
