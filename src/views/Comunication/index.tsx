import React, { useState } from "react";
import Page from "../../components/Page";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
} from "react-beautiful-dnd";
import PortalAwareItem from "./PortalAwareItem";

// fake data generator
const getselectedItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

// a little function to help us with reordering the result
const reorder = (
  list: {
    id: string;
    content: string;
  }[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result as any[];
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: {
    id: string;
    content: string;
  }[],
  destination: {
    id: string;
    content: string;
  }[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result.source = sourceClone;
  result.destination = destClone;

  return result;
};

const ComunicationPage: React.FC = () => {
  const [selectedItems, setselectedItems] = useState<
    {
      id: string;
      content: string;
    }[]
  >(getselectedItems(5));
  const [availableItems, setAvailableItems] = useState<
    {
      id: string;
      content: string;
    }[]
  >(getselectedItems(10, 5));

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // dropped in the same list
    if (source.droppableId === destination.droppableId) {
      if (destination.droppableId === "selected") {
        const reorgItems = reorder(
          selectedItems,
          source.index,
          destination.index
        );
        setselectedItems(reorgItems);
        return;
      } else {
        const reorgItems = reorder(
          availableItems,
          source.index,
          destination.index
        );
        setAvailableItems(reorgItems);
        return;
      }
    } else {
      if (
        source.droppableId === "available" &&
        destination.droppableId === "selected"
      ) {
        const results = move(
          availableItems,
          selectedItems,
          source,
          destination
        );
        setAvailableItems(results.source);
        setselectedItems(results.destination);
        return;
      } else {
        return;
      }
    }
  };

  return (
    <Page pageTitle="Comunicarse" showHomeButton>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ width: "100%", height: "50%" }}>
          <Droppable droppableId="selected" direction="horizontal">
            {(droppableProvided: DroppableProvided) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                style={{ display: "flex" }}
              >
                {selectedItems.map((item, index) => (
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
          <Droppable droppableId="available" direction="horizontal">
            {(droppableProvided: DroppableProvided) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                style={{ display: "flex" }}
              >
                {availableItems.map((item, index) => (
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
      </DragDropContext>
    </Page>
  );
};

export default ComunicationPage;
