import React, { useContext, useCallback, useState } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, NavContext, IonList, IonItem } from "@ionic/react";
import CardWithImage from "../../../components/CardWithImage";
import { AuthenticationContext } from "../../../context/authentication";
import { ReactSortable } from "react-sortablejs";
import CategoriesServices from "../../../services/categories.services";
import PictogramsServices from "../../../services/pictograms.services";
import { PlatformContext } from "../../../context/platform";

const ListPictograms: React.FC = () => {
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
      <IonRow className="tirafrase">
        <IonCol>
          <ReactSortable
            list={selectedItems!}
            setList={setselectedItems}
            animation={150}
            group="shared-group-name"
            className={`sortable ${isMobile ? "mobile" : ""}`}
          >
            {selectedItems!.map((item) => (
              <CardWithImage
                img={{ src: item.ruta_acceso_local, alt: "" }}
                touchable
                onClick={() => {}}
              />
            ))}
          </ReactSortable>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonList>
            {categories?.map((item, index) => (
              <IonItem
                key={index}
                onClick={() => fetchPictograms(item.id_categoria)}
              >
                {item.nombre}
              </IonItem>
            ))}
          </IonList>
        </IonCol>
        <IonCol>
          <ReactSortable
            list={availableItems}
            setList={setAvailableItems}
            animation={150}
            group="shared-group-name"
            className={`sortable ${isMobile ? " mobile" : ""}`}
          >
            {availableItems!.map((item, index) => (
              <CardWithImage
                key={index}
                img={{ src: item.ruta_acceso_local, alt: "" }}
                touchable={false}
                onClick={() => {}}
              />
            ))}
          </ReactSortable>
        </IonCol>
      </IonRow>
    </IonGrid>
  );


  // return (
  //   <IonGrid className="overflow-auto">
  //     <IonRow>
  //       {pictogramData.pictogramsList?.map((pictogram, index) => (
  //         <IonCol key={index} size="4" sizeMd="2">
  //           <CardWithImage
  //             img={{ src: item.ruta_acceso_local, alt: "" }}
  //             title={pictogram.nombre!}
  //             touchable
  //             onClick={() => {
  //               handleCardPictogramClick(pictogram);
  //             }}
  //             pictogram={pictogram}
  //           />
  //         </IonCol>
  //       ))}
  //     </IonRow>
  //     <IonRow>
  //       <CardWithIcon
  //         icon={addCircleOutline}
  //         title="Agregar"
  //         touchable
  //         onClick={handleAddPictogramClick}
  //       />
  //     </IonRow>
  //   </IonGrid>
  // );
};


export default ListPictograms;
