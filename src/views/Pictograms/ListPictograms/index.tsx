import React, { useContext, useCallback } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol, NavContext } from "@ionic/react";
import CardWithImage from "../../../components/CardWithImage";
import CardWithIcon from "../../../components/CardWithIcon";
import { addCircleOutline } from "ionicons/icons";
import { pictogramContext } from "../../../context/pictogram";
import { AuthenticationContext } from "../../../context/authentication";

const ListPictograms: React.FC<ListPictogramsProps> = (props) => {
  const { pictogramData, setPictogramData } = useContext(pictogramContext);
  const { navigate } = useContext(NavContext);
  const { authData } = useContext(AuthenticationContext);
  const { username } = authData;

  const handleCardpictogramClick = (pictogram: any) => {
    setpictogramData({ pictogramSelected: pictogram });
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

interface ListpictogramsProps {
  pictograms?: [pictogram];
}

interface pictogram {
  id_paciente?: any;
  nombre?: string;
  apellido?: string;
  avatar?: string;
}

export default Listpictograms;
