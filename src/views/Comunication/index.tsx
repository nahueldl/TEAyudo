import React, { useState } from "react";
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
