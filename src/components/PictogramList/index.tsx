import React from "react";
import ListItem from "../ListItem";
import { Droppable } from "react-beautiful-dnd";

const PictogramList: React.FC<Props> = ({ data }) => {
  const { id, items } = data;
  return (
    <>
      <Droppable droppableId={id} direction="horizontal">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item: any, key: number) => (
              <ListItem key={key} item={item} index={item.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

interface Props {
  data: any;
}

export default PictogramList;
