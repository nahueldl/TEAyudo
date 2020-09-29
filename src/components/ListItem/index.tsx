import React from "react";
import { Draggable } from "react-beautiful-dnd";

const ListItem: React.FC<Props> = ({ item, index }) => {
  const { id, title } = item;
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {title}
        </div>
      )}
    </Draggable>
  );
};

interface Props {
  item: any;
  index: number;
}

export default ListItem;
