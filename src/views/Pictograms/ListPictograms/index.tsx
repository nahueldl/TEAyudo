import React, { useContext, useCallback, useState } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, NavContext, IonList, IonItem } from "@ionic/react";
import CardWithImage from "../../../components/CardWithImage";
import { AuthenticationContext } from "../../../context/authentication";
import { ReactSortable } from "react-sortablejs";
import CategoriesServices from "../../../services/categories.services";
import PictogramsServices from "../../../services/pictograms.services";
import { PlatformContext } from "../../../context/platform";
import { Pictogram } from "../../../types/Pictograms";

const ListPictograms: React.FC<ListPictogramsProps> = ({pictograms}) => {
  // const { pictogramData, setPictogramData } = useContext(pictogramContext);
  const { navigate } = useContext(NavContext);
  const { isMobile } = useContext(PlatformContext).platformData;
  const { authData } = useContext(AuthenticationContext);
  const { token, patientId } = authData;
  const [selectedItems, setselectedItems] = useState<any[]>([]);
  const [availableItems, setAvailableItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>();

  const handleCardpictogramClick = (pictogram: any) => {
    // setpictogramData({ pictogramSelected: pictogram });
    goToViewpictogram();
  };

  const handleAddpictogramClick = () => {
    goToAddpictogram();
  };

  const goToViewpictogram = useCallback(
    () => navigate("/pacientes/informacion", "forward"),
    [navigate]
  );

  const goToAddpictogram = useCallback(
    () => navigate("/pacientes/alta", "forward"),
    [navigate]
  );

  const getCategories = () => {
    CategoriesServices.getCategories(token!, patientId!)
      .then((res: any) => {
        setCategories(res.data);
      })
      .catch((_error: any) => {
        console.log(_error);
      });
  };

  const fetchPictograms = (categoryId: number) => {
    console.log("fetch pictogramas de categoria", categoryId);
    PictogramsServices.getPictogramsByCategory(token!, categoryId, patientId!)
      .then((res: any) => {
        console.log(res);
        setAvailableItems(res.data);
      })
      .catch((error: any) => console.log(error));
  };

  return (
    <IonGrid>
      <IonRow>
            {pictograms!.map((item, index) => (
              <IonCol size="4">
                <CardWithImage
                  key={index}
                  img={{ src: item.ruta_acceso_local, alt: item.nombres[0].nombre }}
                  touchable={false}
                  onClick={() => {}}
                />
              </IonCol>
            ))}
      </IonRow>
    </IonGrid>
  );

};

interface ListPictogramsProps {
  pictograms?: [Pictogram];
}

export default ListPictograms;
