import React, { useState, useContext } from "react";
import Page from "../../components/Page";
import { ReactSortable } from "react-sortablejs";
import { IonItem, IonGrid, IonRow, IonCol } from "@ionic/react";
import "./styles.css";
import CardWithImage from "../../components/CardWithImage";
import { PlatformContext, PlatformProvider } from "../../context/platform";
// fake data generator
const getselectedItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

const pictograms = [
  {
    id_pictograma: 1,
    ruta_acceso_local: "https://api.arasaac.org/api/pictograms/36864",
    esquematico: true,
    sexo: false,
    violencia: false,
    fecha_hora_alta: "2020-07-23T06:23:26.800Z",
    fecha_hora_modificacion: null,
    fecha_hora_baja: null,
    estado: 1,
    nombre_personalizado: "NombrePersonalizado1",
    favorito: false,
    nombres: [
      {
        id_nombre_pictograma: 1,
        nombre: "persona con pantalla",
        tiene_locucion: false,
        tipo: 2,
        nombre_plural: "personas con pantalla",
      },
      {
        id_nombre_pictograma: 2,
        nombre: "llevar pantalla",
        tiene_locucion: false,
        tipo: 3,
      },
    ],
    etiquetas: null,
  },
  {
    id_pictograma: 2,
    ruta_acceso_local: "https://api.arasaac.org/api/pictograms/36865",
    esquematico: true,
    sexo: false,
    violencia: false,
    fecha_hora_alta: "2020-07-23T06:23:26.800Z",
    fecha_hora_modificacion: null,
    fecha_hora_baja: null,
    estado: 1,
    nombre_personalizado: "NombrePersonalizado1",
    favorito: false,
    nombres: [
      {
        id_nombre_pictograma: 1,
        nombre: "persona con pantalla",
        tiene_locucion: false,
        tipo: 2,
        nombre_plural: "personas con pantalla",
      },
      {
        id_nombre_pictograma: 2,
        nombre: "llevar pantalla",
        tiene_locucion: false,
        tipo: 3,
      },
    ],
    etiquetas: null,
  },
  {
    id_pictograma: 3,
    ruta_acceso_local: "https://api.arasaac.org/api/pictograms/36866",
    esquematico: true,
    sexo: false,
    violencia: false,
    fecha_hora_alta: "2020-07-23T06:23:26.800Z",
    fecha_hora_modificacion: null,
    fecha_hora_baja: null,
    estado: 1,
    nombre_personalizado: "NombrePersonalizado1",
    favorito: false,
    nombres: [
      {
        id_nombre_pictograma: 1,
        nombre: "persona con pantalla",
        tiene_locucion: false,
        tipo: 2,
        nombre_plural: "personas con pantalla",
      },
      {
        id_nombre_pictograma: 2,
        nombre: "llevar pantalla",
        tiene_locucion: false,
        tipo: 3,
      },
    ],
    etiquetas: null,
  },
  {
    id_pictograma: 4,
    ruta_acceso_local: "https://api.arasaac.org/api/pictograms/36867",
    esquematico: true,
    sexo: false,
    violencia: false,
    fecha_hora_alta: "2020-07-23T06:23:26.800Z",
    fecha_hora_modificacion: null,
    fecha_hora_baja: null,
    estado: 1,
    nombre_personalizado: "NombrePersonalizado1",
    favorito: false,
    nombres: [
      {
        id_nombre_pictograma: 1,
        nombre: "persona con pantalla",
        tiene_locucion: false,
        tipo: 2,
        nombre_plural: "personas con pantalla",
      },
      {
        id_nombre_pictograma: 2,
        nombre: "llevar pantalla",
        tiene_locucion: false,
        tipo: 3,
      },
    ],
    etiquetas: null,
  },
  {
    id_pictograma: 5,
    ruta_acceso_local: "https://api.arasaac.org/api/pictograms/36868",
    esquematico: true,
    sexo: false,
    violencia: false,
    fecha_hora_alta: "2020-07-23T06:23:26.800Z",
    fecha_hora_modificacion: null,
    fecha_hora_baja: null,
    estado: 1,
    nombre_personalizado: "NombrePersonalizado1",
    favorito: false,
    nombres: [
      {
        id_nombre_pictograma: 1,
        nombre: "persona con pantalla",
        tiene_locucion: false,
        tipo: 2,
        nombre_plural: "personas con pantalla",
      },
      {
        id_nombre_pictograma: 2,
        nombre: "llevar pantalla",
        tiene_locucion: false,
        tipo: 3,
      },
    ],
    etiquetas: null,
  },
  {
    id_pictograma: 6,
    ruta_acceso_local: "https://api.arasaac.org/api/pictograms/36869",
    esquematico: true,
    sexo: false,
    violencia: false,
    fecha_hora_alta: "2020-07-23T06:23:26.800Z",
    fecha_hora_modificacion: null,
    fecha_hora_baja: null,
    estado: 1,
    nombre_personalizado: "NombrePersonalizado1",
    favorito: false,
    nombres: [
      {
        id_nombre_pictograma: 1,
        nombre: "persona con pantalla",
        tiene_locucion: false,
        tipo: 2,
        nombre_plural: "personas con pantalla",
      },
      {
        id_nombre_pictograma: 2,
        nombre: "llevar pantalla",
        tiene_locucion: false,
        tipo: 3,
      },
    ],
    etiquetas: null,
  },
  {
    id_pictograma: 7,
    ruta_acceso_local: "https://api.arasaac.org/api/pictograms/36870",
    esquematico: true,
    sexo: false,
    violencia: false,
    fecha_hora_alta: "2020-07-23T06:23:26.800Z",
    fecha_hora_modificacion: null,
    fecha_hora_baja: null,
    estado: 1,
    nombre_personalizado: "NombrePersonalizado1",
    favorito: false,
    nombres: [
      {
        id_nombre_pictograma: 1,
        nombre: "persona con pantalla",
        tiene_locucion: false,
        tipo: 2,
        nombre_plural: "personas con pantalla",
      },
      {
        id_nombre_pictograma: 2,
        nombre: "llevar pantalla",
        tiene_locucion: false,
        tipo: 3,
      },
    ],
    etiquetas: null,
  },
  {
    id_pictograma: 8,
    ruta_acceso_local: "https://api.arasaac.org/api/pictograms/36871",
    esquematico: true,
    sexo: false,
    violencia: false,
    fecha_hora_alta: "2020-07-23T06:23:26.800Z",
    fecha_hora_modificacion: null,
    fecha_hora_baja: null,
    estado: 1,
    nombre_personalizado: "NombrePersonalizado1",
    favorito: false,
    nombres: [
      {
        id_nombre_pictograma: 1,
        nombre: "persona con pantalla",
        tiene_locucion: false,
        tipo: 2,
        nombre_plural: "personas con pantalla",
      },
      {
        id_nombre_pictograma: 2,
        nombre: "llevar pantalla",
        tiene_locucion: false,
        tipo: 3,
      },
    ],
    etiquetas: null,
  },
  {
    id_pictograma: 9,
    ruta_acceso_local: "https://api.arasaac.org/api/pictograms/36872",
    esquematico: true,
    sexo: false,
    violencia: false,
    fecha_hora_alta: "2020-07-23T06:23:26.800Z",
    fecha_hora_modificacion: null,
    fecha_hora_baja: null,
    estado: 1,
    nombre_personalizado: "NombrePersonalizado1",
    favorito: false,
    nombres: [
      {
        id_nombre_pictograma: 1,
        nombre: "persona con pantalla",
        tiene_locucion: false,
        tipo: 2,
        nombre_plural: "personas con pantalla",
      },
      {
        id_nombre_pictograma: 2,
        nombre: "llevar pantalla",
        tiene_locucion: false,
        tipo: 3,
      },
    ],
    etiquetas: null,
  },
  {
    id_pictograma: 10,
    ruta_acceso_local: "https://api.arasaac.org/api/pictograms/36873",
    esquematico: true,
    sexo: false,
    violencia: false,
    fecha_hora_alta: "2020-07-23T06:23:26.800Z",
    fecha_hora_modificacion: null,
    fecha_hora_baja: null,
    estado: 1,
    nombre_personalizado: "NombrePersonalizado1",
    favorito: false,
    nombres: [
      {
        id_nombre_pictograma: 1,
        nombre: "persona con pantalla",
        tiene_locucion: false,
        tipo: 2,
        nombre_plural: "personas con pantalla",
      },
      {
        id_nombre_pictograma: 2,
        nombre: "llevar pantalla",
        tiene_locucion: false,
        tipo: 3,
      },
    ],
    etiquetas: null,
  },
];

const getPictogramsLala = (result: 0 | 1) => {
  return pictograms.filter((item) => pictograms.indexOf(item) % 2 === result);
};

const ComunicationPage: React.FC = () => {
  const [selectedItems, setselectedItems] = useState<any[]>(
    getPictogramsLala(0)
  );
  const [availableItems, setAvailableItems] = useState<any[]>(
    getPictogramsLala(1)
  );

  const { isMobile } = useContext(PlatformContext).platformData;

  return (
    <Page pageTitle="Comunicarse" showHomeButton>
      <IonGrid>
        <IonRow style={{ minHeight: "30%" }}>
          <ReactSortable
            list={selectedItems}
            setList={setselectedItems}
            animation={150}
            group="shared-group-name"
            className={`sortable ${isMobile ? "mobile" : ""} tirafrase`}
          >
            {selectedItems.map((item) => (
              <CardWithImage
                img={{ src: item.ruta_acceso_local, alt: "" }}
                touchable={false}
                onClick={() => {}}
              />
            ))}
          </ReactSortable>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonRow></IonRow>
          </IonCol>
          <IonCol>
            <ReactSortable
              list={availableItems}
              setList={setAvailableItems}
              animation={150}
              group="shared-group-name"
              className={`sortable ${isMobile ? " mobile" : ""}`}
            >
              {availableItems.map((item) => (
                <CardWithImage
                  img={{ src: item.ruta_acceso_local, alt: "" }}
                  touchable={false}
                  onClick={() => {}}
                />
              ))}
            </ReactSortable>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  );
};

interface Item {
  id: string;
  content: string;
}

export default ComunicationPage;
