import React, { useState } from "react";
import "../styles.css";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import CardWithImage from "../../../components/CardWithImage";
import { Pictogram } from "../../../types/Pictograms";
import ModalPictogram from "../../../components/ModalPictogram";

const ListPictograms: React.FC<ListPictogramsProps> = ({pictograms}) => {
  const [ showModal, setShowModal] = useState(false);
  const [ pictogramSelected, setPictogramSelected] = useState<Pictogram>();

  const handleClickSetShowModal = (value: boolean, pictoSelected: Pictogram) => {
      setPictogramSelected(pictoSelected);
      setShowModal(value);
  }

  return (
    <IonGrid>
      <IonRow>
            {pictograms!.map((item, index) => (
              <IonCol size="4" key={index}>
                <CardWithImage
                  img={{ src: item.ruta_acceso_local, alt: item.nombres[0].nombre }}
                  touchable={false}
                  onClick={() => {handleClickSetShowModal(true, item)}}
                />
              </IonCol>
            ))}
            {showModal && pictogramSelected != undefined ?
              <ModalPictogram showModal={showModal} handleShowModal={handleClickSetShowModal} pictogram={pictogramSelected}></ModalPictogram>
            : <></>}
      </IonRow>
    </IonGrid>
  );

};

interface ListPictogramsProps {
  pictograms?: [Pictogram];
}

export default ListPictograms;
