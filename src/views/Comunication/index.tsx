import React, { useState, useContext, useEffect } from "react";
import Page from "../../components/Page";
import { ReactSortable } from "react-sortablejs";
import { IonGrid, IonRow, IonCol, IonList, IonItem } from "@ionic/react";
import "./styles.css";
import CardWithImage from "../../components/CardWithImage";
import { PlatformContext } from "../../context/platform";
import CategoriesServices from "../../services/categories.services";
import { AuthenticationContext } from "../../context/authentication";
import { PatientContext } from "../../context/patient";

const ComunicationPage: React.FC = () => {
  const [selectedItems, setselectedItems] = useState<any[]>([]);
  const [availableItems, setAvailableItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>();

  const { isMobile } = useContext(PlatformContext).platformData;
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { patientData } = useContext(PatientContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getCategories(), []);

  const getCategories = () => {
    setAuthData({ loading: true, error: false });
    CategoriesServices.getCategories(authData.token!, patientData.id_paciente)
      .then((res: any) => {
        setCategories(res.data);
      })
      .catch((_error: any) => {
        setAuthData({ loading: false, error: true });
      });
  };

  return (
    <Page pageTitle="Comunicarse" showHomeButton>
      <IonGrid>
        <IonRow className="tirafrase">
          <IonCol>
            <ReactSortable
              list={selectedItems!}
              setList={setselectedItems}
              animation={150}
              group="shared-group-name"
              className={`sortable ${isMobile ? "mobile" : ""}`}
            >
              {selectedItems!.map((item) => (
                <CardWithImage
                  img={{ src: item.ruta_acceso_local, alt: "" }}
                  touchable={false}
                  onClick={() => {}}
                />
              ))}
            </ReactSortable>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonList>
              {categories?.map((item) => (
                <IonItem detail>
                  {item.nombre}
                </IonItem>
              ))}
            </IonList>
          </IonCol>
          <IonCol>
            <ReactSortable
              list={availableItems}
              setList={setAvailableItems}
              animation={150}
              group="shared-group-name"
              className={`sortable ${isMobile ? " mobile" : ""}`}
            >
              {availableItems!.map((item) => (
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
