import React, { useState } from "react";
import Page from "../../components/Page";
import { ReactSortable } from "react-sortablejs";
import { IonItem } from "@ionic/react";
import "./styles.css";
// fake data generator
const getselectedItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

const ComunicationPage: React.FC = () => {
  const [selectedItems, setselectedItems] = useState<Item[]>(
    getselectedItems(5)
  );
  const [availableItems, setAvailableItems] = useState<Item[]>(
    getselectedItems(10, 5)
  );

  return (
    <Page pageTitle="Comunicarse" showHomeButton>
      <div
        style={{ display: "flex", flexDirection: "column", width: "inherit" }}
      >
        <ReactSortable
          list={selectedItems}
          setList={setselectedItems}
          animation={150}
          group="shared-group-name"
          style={{ display: "flex", flexDirection: "row" }}
        >
          {selectedItems.map((item) => (
            <IonItem key={item.id}>{item.content}</IonItem>
          ))}
        </ReactSortable>

        <ReactSortable
          list={availableItems}
          setList={setAvailableItems}
          animation={150}
          group="shared-group-name"
          style={{ display: "flex", flexDirection: "row" }}
        >
          {availableItems.map((item) => (
            <IonItem key={item.id}>{item.content}</IonItem>
          ))}
        </ReactSortable>
      </div>
    </Page>
  );
};

interface Item {
  id: string;
  content: string;
}

export default ComunicationPage;
