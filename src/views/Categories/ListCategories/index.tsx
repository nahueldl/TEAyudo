import React, { useContext, useCallback } from "react";
import { IonGrid, IonRow, IonCol, NavContext, IonCard, IonImg, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from "@ionic/react";
import CardWithImage from "../../../components/CardWithImage";
import CardWithIcon from "../../../components/CardWithIcon";
import { addCircleOutline, pin, walk, warning, wifi, wine } from "ionicons/icons";
import { CategoryContext } from "../../../context/category";

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

  return (
    <IonGrid className="overflow-auto">
      <IonRow>
        {categoriaData.categoriasList?.map((categoria, index) => (
          <IonCol key={index} size="4" sizeMd="2">
            <IonButton size="large" expand="block" className="">
              {categoria.nombre}
            </IonButton>
          </IonCol>
        ))} 
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
