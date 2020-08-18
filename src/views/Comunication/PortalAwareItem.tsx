import React, { Component } from "react";
import ReactDOM from "react-dom";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

const portal: HTMLElement = document.createElement("div");
if (!document.body) {
  throw new Error("body not ready for portal creation!");
}

document.body.appendChild(portal);

class PortalAwareItem extends Component<ItemProps> {
  render() {
    const provided: DraggableProvided = this.props.provided;
    const snapshot: DraggableStateSnapshot = this.props.snapshot;
    const usePortal: boolean = snapshot.isDragging;

    const child: any = (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {this.props.item.content}
      </div>
    );

    if (!usePortal) {
      return child;
    }

    // if dragging - put the item in a portal
    return ReactDOM.createPortal(child, portal);
  }
}

type ItemProps = {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  item: any
};

export default PortalAwareItem;




