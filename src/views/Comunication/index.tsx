import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DropResult,
  DraggableId,
  DraggableLocation,
} from "react-beautiful-dnd";
import PortalAwareItem from "./PortalAwareItem";
import type {Pictogram}
const PICTOGRAM_AREA: string = "pictogram_area";
const CATEGORY_AREA: string = "category_area";

// TODO:
// 1. Tipar la lista de pictogramas para utilizar en pictogramas y categorías
// 2. Definir bien los ids de droppable y draggable
// 3. Tunear el onDragEnd contemplando los casos posibles
// 4. Resolver la parte inferior con respecto a qué se muestra (y si se permite el reordenamiento dentro de categorías -> NO)
// 5. Componentizar dentro de lo posible, todo tiene que estar dentro del DnDContext así que no sé qué tan factible es
// sobre todo porque queda este componente como pasamanos
// 6. Mover todo lo que sea reordenamiento a un archivo de utils aparte
// 7. Chequear el tema de flex-wrap cuando hay más de una fila en juego
// 8. Cómo se muestra el resultado final una vez que se pide la lista de elementos?
// 9. Todos los estilos siguiendo los lineamientos de Ionic
// 10. Testear comportamiento en Android, si es posible en un dispositivo real para verificar el DnD con táctil

const pictogramsToUse: [Pictogram] = [
  {
    schematic: true,
    sex: false,
    violence: false,
    downloads: 0,
    categories: [],
    synsets: ["00052091-v", "04199901-n"],
    tags: [],
    _id: 36864,
    keywords: [
      {
        keyword: "persona con pantalla",
        hasLocution: false,
        type: 2,
        plural: "personas con pantalla",
      },
      {
        keyword: "llevar pantalla",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-22T09:05:07.034Z",
    lastUpdated: "2020-05-22T09:32:50.037Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: [],
    synsets: ["04199901-n", "00052091-v"],
    tags: [],
    _id: 36865,
    keywords: [
      {
        keyword: "niña con pantalla",
        hasLocution: false,
        plural: "niñas con pantalla",
        type: 2,
      },
      {
        keyword: "llevar pantalla",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-22T09:05:07.034Z",
    lastUpdated: "2020-05-22T09:32:01.373Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: [],
    synsets: ["04199901-n", "00052091-v"],
    tags: [],
    _id: 36866,
    keywords: [
      {
        keyword: "niño con pantalla",
        hasLocution: false,
        plural: "niños con pantalla",
        type: 2,
      },
      {
        keyword: "llevar pantalla",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-22T09:05:07.034Z",
    lastUpdated: "2020-05-22T09:31:53.782Z",
  },
  {
    schematic: true,
    sex: false,
    violence: false,
    downloads: 0,
    categories: [],
    synsets: ["00052091-v"],
    tags: [],
    _id: 36867,
    keywords: [
      {
        keyword: "persona con mascarilla",
        hasLocution: false,
        plural: "personas con mascarilla",
        type: 2,
      },
      {
        keyword: "llevar mascarilla",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-22T09:05:07.034Z",
    lastUpdated: "2020-05-22T09:18:10.997Z",
  },
  {
    schematic: true,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["protective equipment"],
    synsets: ["03469399-n"],
    tags: ["object", "fashion", "clothes", "workwear", "protective equipment"],
    _id: 36863,
    keywords: [
      {
        keyword: "mampara",
        hasLocution: false,
        type: 2,
        plural: "mamparas",
      },
      {
        keyword: "mampara protectora",
        hasLocution: false,
        plural: "mamparas protectoras",
        type: 2,
      },
    ],
    created: "2020-05-19T15:30:59.914Z",
    lastUpdated: "2020-06-05T11:10:35.951Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["protective equipment", "medical equipment", "verb"],
    synsets: ["00050171-v"],
    tags: [
      "object",
      "fashion",
      "clothes",
      "workwear",
      "protective equipment",
      "health",
      "medicine",
      "medical equipment",
      "communication",
      "language",
      "verb",
    ],
    _id: 36856,
    keywords: [
      {
        keyword: "quitar el guante",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-16T15:08:11.629Z",
    lastUpdated: "2020-06-05T11:12:47.509Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["protective equipment", "medical equipment", "verb"],
    synsets: ["00050369-v"],
    tags: [
      "object",
      "fashion",
      "clothes",
      "workwear",
      "protective equipment",
      "health",
      "medicine",
      "medical equipment",
      "communication",
      "language",
      "verb",
    ],
    _id: 36857,
    keywords: [
      {
        keyword: "poner cubrecalzado",
        hasLocution: false,
        type: 3,
      },
      {
        keyword: "poner cubrezapatos",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-16T15:08:11.629Z",
    lastUpdated: "2020-06-05T11:12:08.940Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["protective equipment", "medical equipment", "verb"],
    synsets: ["00050171-v"],
    tags: [
      "object",
      "fashion",
      "clothes",
      "workwear",
      "protective equipment",
      "health",
      "medicine",
      "medical equipment",
      "communication",
      "language",
      "verb",
    ],
    _id: 36858,
    keywords: [
      {
        keyword: "quitar el guante",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-16T15:08:11.629Z",
    lastUpdated: "2020-06-05T11:11:43.400Z",
  },
  {
    schematic: true,
    sex: false,
    violence: false,
    downloads: 0,
    categories: [],
    synsets: ["02418610-v"],
    tags: [],
    _id: 36859,
    keywords: [
      {
        keyword: "trabajar con mampara",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-16T15:08:11.629Z",
    lastUpdated: "2020-05-19T15:49:23.195Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: [],
    synsets: ["01614650-v"],
    tags: [],
    _id: 36860,
    keywords: [
      {
        keyword: "extender",
        hasLocution: true,
        type: 3,
      },
    ],
    created: "2020-05-16T15:08:11.629Z",
    lastUpdated: "2020-05-19T15:26:10.675Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["medical equipment", "protective equipment", "verb"],
    synsets: ["00050171-v"],
    tags: [
      "health",
      "medicine",
      "medical equipment",
      "object",
      "fashion",
      "clothes",
      "workwear",
      "protective equipment",
      "communication",
      "language",
      "verb",
    ],
    _id: 36861,
    keywords: [
      {
        keyword: "quitar cubrecalzado",
        hasLocution: false,
        type: 3,
      },
      {
        keyword: "quitar cubrezapatos",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-16T15:08:11.629Z",
    lastUpdated: "2020-06-05T11:11:20.178Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["protective equipment", "medical equipment"],
    synsets: ["09280855-n"],
    tags: [
      "object",
      "fashion",
      "clothes",
      "workwear",
      "protective equipment",
      "health",
      "medicine",
      "medical equipment",
    ],
    _id: 36862,
    keywords: [
      {
        keyword: "cubrecalzado",
        hasLocution: false,
        type: 2,
        plural: "cubrecalzados",
      },
      {
        keyword: "cubrezapatos",
        hasLocution: false,
        type: 2,
      },
    ],
    created: "2020-05-16T15:08:11.629Z",
    lastUpdated: "2020-06-05T11:10:54.897Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["medical equipment", "protective equipment"],
    synsets: ["04020673-n", "04021598-n"],
    tags: [
      "health",
      "medicine",
      "medical equipment",
      "object",
      "fashion",
      "clothes",
      "workwear",
      "protective equipment",
    ],
    _id: 36855,
    keywords: [
      {
        keyword: "equipo de protección individual",
        hasLocution: false,
        plural: "equipos de protección individual",
        type: 2,
      },
      {
        keyword: "EPI",
        hasLocution: false,
        plural: "EPIs",
        type: 2,
      },
      {
        keyword: "persona con EPI",
        hasLocution: false,
        plural: "personas con EPI",
        type: 2,
      },
    ],
    created: "2020-05-14T10:22:23.225Z",
    lastUpdated: "2020-06-05T11:12:26.243Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["verb", "medical procedure"],
    synsets: ["00524175-v"],
    tags: ["health", "medicine", "medical procedure"],
    _id: 36854,
    keywords: [
      {
        keyword: "tomar la temperatura",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-08T10:36:27.994Z",
    lastUpdated: "2020-06-05T11:17:11.052Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["verb", "land transport"],
    synsets: ["02019914-v"],
    tags: [
      "communication",
      "language",
      "verb",
      "movement",
      "traffic",
      "mode of transport",
      "land transport",
    ],
    _id: 36844,
    keywords: [
      {
        keyword: "bajar del autobús",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-08T10:36:27.993Z",
    lastUpdated: "2020-06-22T09:34:59.913Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["verb", "land transport"],
    synsets: ["08449355-n"],
    tags: [
      "communication",
      "language",
      "verb",
      "movement",
      "traffic",
      "mode of transport",
      "land transport",
    ],
    _id: 36845,
    keywords: [
      {
        keyword: "esperar en fila",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-08T10:36:27.993Z",
    lastUpdated: "2020-06-22T09:35:17.650Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["verb", "clothes"],
    synsets: ["01751753-v"],
    tags: ["communication", "language", "verb", "object", "fashion", "clothes"],
    _id: 36846,
    keywords: [
      {
        keyword: "estampar",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-08T10:36:27.993Z",
    lastUpdated: "2020-06-22T09:37:08.195Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["verb", "prevention measure"],
    synsets: ["01375347-v", "00089076-v", "01247616-v"],
    tags: ["communication", "language", "verb", "health", "prevention measure"],
    _id: 36847,
    keywords: [
      {
        keyword: "desinfectar",
        hasLocution: true,
        type: 3,
      },
      {
        keyword: "pulverizar desinfectante",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-08T10:36:27.993Z",
    lastUpdated: "2020-06-23T09:45:46.141Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["nursing equipment"],
    synsets: ["04429007-n"],
    tags: ["health", "medicine", "medical equipment", "nursing equipment"],
    _id: 36848,
    keywords: [
      {
        keyword: "termómetro",
        hasLocution: true,
        plural: "termómetros",
        type: 2,
      },
      {
        keyword: "termómetro de infrarrojos",
        hasLocution: false,
        plural: "termómetros de infrarrojos",
        type: 2,
      },
    ],
    created: "2020-05-08T10:36:27.993Z",
    lastUpdated: "2020-06-07T15:34:52.790Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["verb", "cleaning product"],
    synsets: ["01375347-v"],
    tags: ["communication", "language", "verb", "object", "cleaning product"],
    _id: 36849,
    keywords: [
      {
        keyword: "pulverizar",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-08T10:36:27.993Z",
    lastUpdated: "2020-06-25T09:26:49.997Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["christianity"],
    synsets: [],
    tags: ["religion", "christianity"],
    _id: 36850,
    keywords: [
      {
        keyword: "San Isidro Labrador",
        type: 1,
        hasLocution: false,
      },
    ],
    created: "2020-05-08T10:36:27.993Z",
    lastUpdated: "2020-06-02T09:05:14.721Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["trade document", "land transport"],
    synsets: ["06530710-n"],
    tags: [
      "document",
      "trade",
      "movement",
      "traffic",
      "mode of transport",
      "land transport",
    ],
    _id: 36851,
    keywords: [
      {
        keyword: "billete de autobús",
        hasLocution: false,
        plural: "billetes de autobús",
        type: 2,
      },
    ],
    created: "2020-05-08T10:36:27.993Z",
    lastUpdated: "2020-06-22T09:36:12.135Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["medical procedure", "verb"],
    synsets: ["00524175-v"],
    tags: [
      "health",
      "medicine",
      "medical procedure",
      "communication",
      "language",
      "verb",
    ],
    _id: 36852,
    keywords: [
      {
        keyword: "tomar la temperatura",
        type: 3,
        hasLocution: false,
      },
    ],
    created: "2020-05-08T10:36:27.993Z",
    lastUpdated: "2020-06-05T11:17:37.570Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["medical procedure", "verb"],
    synsets: ["00524175-v"],
    tags: [
      "health",
      "medicine",
      "medical procedure",
      "communication",
      "language",
      "verb",
    ],
    _id: 36853,
    keywords: [
      {
        keyword: "tomar la temperatura",
        type: 3,
        hasLocution: false,
      },
    ],
    created: "2020-05-08T10:36:27.993Z",
    lastUpdated: "2020-06-05T11:17:23.927Z",
  },
  {
    schematic: true,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["verb", "land transport"],
    synsets: ["02019914-v"],
    tags: [
      "communication",
      "language",
      "verb",
      "movement",
      "traffic",
      "mode of transport",
      "land transport",
    ],
    _id: 36842,
    keywords: [
      {
        keyword: "bajar del autobús",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-08T10:36:27.992Z",
    lastUpdated: "2020-06-22T09:34:51.160Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["verb", "land transport"],
    synsets: ["02019914-v"],
    tags: [
      "communication",
      "language",
      "verb",
      "movement",
      "traffic",
      "mode of transport",
      "land transport",
    ],
    _id: 36843,
    keywords: [
      {
        keyword: "bajar del autobús",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-08T10:36:27.992Z",
    lastUpdated: "2020-06-22T09:34:44.920Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["medical test"],
    synsets: ["05750496-n", "13499728-n", "14209822-n"],
    tags: ["health", "medicine", "medical procedure", "medical test"],
    _id: 36841,
    keywords: [
      {
        keyword: "PCR",
        hasLocution: false,
        type: 2,
        plural: "PCRs",
      },
      {
        keyword: "test PCR",
        hasLocution: false,
        type: 2,
        plural: "tests PCR",
      },
    ],
    created: "2020-05-08T10:36:27.991Z",
    lastUpdated: "2020-06-05T11:06:09.502Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: [],
    synsets: ["00050171-v"],
    tags: [],
    _id: 36809,
    keywords: [
      {
        keyword: "bajar la mascarilla",
        hasLocution: false,
        type: 3,
      },
    ],
    created: "2020-05-05T11:39:27.280Z",
    lastUpdated: "2020-05-05T11:41:38.091Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["clothes"],
    synsets: [],
    tags: ["object", "fashion", "clothes"],
    _id: 36840,
    keywords: [
      {
        keyword: "body",
        hasLocution: false,
        plural: "bodies",
        type: 2,
      },
      {
        keyword: "bodi",
        hasLocution: false,
        plural: "bodies",
        type: 2,
      },
    ],
    created: "2020-05-02T19:10:07.283Z",
    lastUpdated: "2020-06-01T11:19:25.476Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: [],
    synsets: ["00003443-v"],
    tags: [],
    _id: 36834,
    keywords: [
      {
        keyword: "eructar",
        hasLocution: true,
        type: 3,
      },
    ],
    created: "2020-05-02T10:18:27.131Z",
    lastUpdated: "2020-05-02T12:05:49.788Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: [],
    synsets: ["03254045-n"],
    tags: [],
    _id: 36835,
    keywords: [
      {
        keyword: "farmacia",
        plural: "farmacias",
        type: 2,
        hasLocution: true,
      },
    ],
    created: "2020-05-02T10:18:27.131Z",
    lastUpdated: "2020-05-02T11:34:52.590Z",
  },
  {
    schematic: true,
    sex: false,
    violence: false,
    downloads: 0,
    categories: [],
    synsets: ["03254045-n"],
    tags: [],
    _id: 36836,
    keywords: [
      {
        keyword: "farmacia",
        type: 2,
        plural: "farmacias",
        hasLocution: true,
      },
    ],
    created: "2020-05-02T10:18:27.131Z",
    lastUpdated: "2020-05-02T11:33:02.314Z",
  },
  {
    schematic: true,
    sex: false,
    violence: false,
    downloads: 0,
    categories: [],
    synsets: ["03254045-n"],
    tags: [],
    _id: 36837,
    keywords: [
      {
        keyword: "farmacia",
        hasLocution: true,
        type: 2,
        plural: "farmacias",
      },
    ],
    created: "2020-05-02T10:18:27.131Z",
    lastUpdated: "2020-05-02T11:33:51.567Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["commercial building"],
    synsets: ["03254045-n"],
    tags: ["place", "building", "trade"],
    _id: 36838,
    keywords: [
      {
        keyword: "farmacia",
        hasLocution: true,
        plural: "farmacias",
        type: 2,
      },
    ],
    created: "2020-05-02T10:18:27.131Z",
    lastUpdated: "2020-06-02T10:02:49.988Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: [],
    synsets: ["10757517-n", "08494318-n", "00867880-a"],
    tags: [],
    _id: 36839,
    keywords: [
      {
        keyword: "parada",
        hasLocution: true,
        plural: "paradas",
        type: 4,
      },
      {
        keyword: "desempleada",
        hasLocution: false,
        plural: "desempleadas",
        type: 2,
      },
    ],
    created: "2020-05-02T10:18:27.131Z",
    lastUpdated: "2020-05-02T12:00:03.497Z",
  },
  {
    schematic: false,
    sex: false,
    violence: false,
    downloads: 0,
    categories: ["commercial building", "financial services"],
    synsets: ["08437235-n", "02790795-n"],
    tags: [
      "place",
      "building",
      "trade",
      "work",
      "tertiary sector",
      "financial services",
    ],
    _id: 36828,
    keywords: [
      {
        keyword: "banco",
        type: 2,
        plural: "bancos",
        hasLocution: true,
      },
    ],
    created: "2020-05-02T10:18:27.130Z",
    lastUpdated: "2020-06-02T09:17:28.034Z",
  },
];

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result as any[];
};

const ComunicationPage: React.FC = () => {
  const [pictogramItems, setPictogramItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    handleGetPictogramsAndCategories();
  });

  const onDragEnd = (result: DropResult) => {
    //dropped nowhere
    if (!result.destination) {
      return;
    }

    //dropped in CATEGORY_AREA
    if (result.destination.droppableId === CATEGORY_AREA) {
      return;
    }

    //dropped in the same list
    if (result.source.droppableId === result.destination?.droppableId) {
      if (result.source.droppableId === CATEGORY_AREA) {
        return;
      }
      if (result.source.droppableId === PICTOGRAM_AREA) {
        return;
      }
    }

    //dropped in PICTOGRAM_AREA
    if (result.destination.droppableId === PICTOGRAM_AREA) {
      return;
    }
  };

  return (
    <Page pageTitle="Comunicarse" showHomeButton>
      {/* Wraps the part of your application you want to have drag and drop enabled for */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ width: "100%", height: "50%" }}>
          {/* An area that can be dropped into. Contains <Draggable />s */}
          <Droppable droppableId={PICTOGRAM_AREA} direction="horizontal">
            {(droppableProvided: DroppableProvided) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                style={{ display: "flex" }}
              >
                {pictogramItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(
                      draggableProvided: DraggableProvided,
                      draggableSnapshot: DraggableStateSnapshot
                    ) => (
                      <PortalAwareItem
                        provided={draggableProvided}
                        snapshot={draggableSnapshot}
                        item={item}
                      />
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div style={{ width: "100%", height: "50%" }}>
          {/* An area that can be dropped into. Contains <Draggable />s */}
          <Droppable droppableId={CATEGORY_AREA} direction="horizontal">
            {(droppableProvided: DroppableProvided) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                style={{ display: "flex" }}
              >
                {categoryItems.map((item, index) => (
                  <Draggable
                    key={`${item.id}-bis`}
                    draggableId={`${item.id}-bis`}
                    index={index}
                  >
                    {(
                      draggableProvided: DraggableProvided,
                      draggableSnapshot: DraggableStateSnapshot
                    ) => (
                      <PortalAwareItem
                        provided={draggableProvided}
                        snapshot={draggableSnapshot}
                        item={item}
                      />
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </Page>
  );
};

export default ComunicationPage;
