import React, { useState } from "react";
import Page from "../../components/Page";
import { ReactSortable } from "react-sortablejs";
import { IonItem } from "@ionic/react";

// fake data generator
const getselectedItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

const ComunicationPage: React.FC = () => {
  const [selectedItems, setselectedItems] = useState<Item[]>(
    getselectedItems(15)
  );
  const [availableItems, setAvailableItems] = useState<Item[]>(
    getselectedItems(20, 30)
  );

  return (
    <Page pageTitle="Comunicarse" showHomeButton>
      {/* <div style={{ display: "flex", width: "inherit" }}> */}
        <ReactSortable
          list={selectedItems}
          setList={setselectedItems}
          animation={150}
          group="shared-group-name"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(4rem, 1fr))",
            gap: "0.5rem",
          }}
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
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(4rem, 1fr))",
            gap: "0.5rem",
          }}
        >
          {availableItems.map((item) => (
            <IonItem key={item.id}>{item.content}</IonItem>
          ))}
        </ReactSortable>
      {/* </div> */}
    </Page>
  );
};

interface Item {
  id: string;
  content: string;
}

export default ComunicationPage;
