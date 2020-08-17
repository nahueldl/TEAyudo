import React, { useState } from "react";
import Page from "../../components/Page";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
} from "react-beautiful-dnd";
import PortalAwareItem from "./PortalAwareItem";
// fake data generator
const getItems = (count: number) => {
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));
};

const ComunicationPage: React.FC = () => {
  const [items, setItems] = useState(getItems(10));

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorgItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorgItems);
  };

  // a little function to help us with reordering the result
  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result as any[];
  };

  return (
    <Page pageTitle="Comunicarse" showHomeButton>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{width: "100%"}}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(droppableProvided: DroppableProvided) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              style={{display: "flex"}}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(
                    draggableProvided: DraggableProvided,
                    draggableSnapshot: DraggableStateSnapshot
                  ) => (
                    <PortalAwareItem
                      provided={draggableProvided}
                      snapshot={draggableSnapshot}
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
