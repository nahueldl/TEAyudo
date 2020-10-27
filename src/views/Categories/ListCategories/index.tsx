import React, { useContext, useCallback } from "react";
import { IonGrid, IonRow, IonCol, NavContext, IonCard, IonImg, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from "@ionic/react";
import CardWithImage from "../../../components/CardWithImage";
import CardWithIcon from "../../../components/CardWithIcon";
import { addCircleOutline, pin, walk, warning, wifi, wine } from "ionicons/icons";
import { CategoryContext } from "../../../context/category";
import { Category } from "../../../types/Categories";

const ListCategories: React.FC<ListCategories> = () => {
  const { categoriaData, setCategoriaData } = useContext(CategoryContext);
  const { navigate } = useContext(NavContext);

  const handleAddCategoriaClick = () => {
    goToAddCategoria();
  };

  const goToAddCategoria = useCallback(
    () => navigate("/categorias/alta", "forward"),
    [navigate]
  );

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
           categoria.id_usuario_rol != null ? 
            <IonCol key={index}  size="4" sizeMd="2">
              <IonButton size="large" expand="block" className="" onClick={() => {handleButtonCategoriaClick(categoria);}}>
                {categoria.nombre} 
              </IonButton>
            </IonCol>
         :null))}  
      </IonRow>
      <IonRow>
        <CardWithIcon
          icon={addCircleOutline}
          title="Agregar"
          touchable
          onClick={handleAddCategoriaClick}
        />
      </IonRow>
    </IonGrid>
  );
};

interface ListCategories {}

export default ListCategories;
