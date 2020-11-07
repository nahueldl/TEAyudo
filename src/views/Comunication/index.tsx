import React, { useState, useContext, useEffect } from "react";
import Page from "../../components/Page";
import { ReactSortable } from "react-sortablejs";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonButton,
  IonSpinner,
  IonIcon,
} from "@ionic/react";
import "./styles.css";
import CardWithImage from "../../components/CardWithImage";
import { PlatformContext } from "../../context/platform";
import CategoriesServices from "../../services/categories.services";
import { AuthenticationContext } from "../../context/authentication";
import PictogramsServices from "../../services/pictograms.services";
import TranslationModal from "./TranslationModal";
import { chevronDown, chevronForward, trashOutline } from "ionicons/icons";

const ComunicationPage: React.FC = () => {
  const [selectedItems, setselectedItems] = useState<any[]>([]);
  const [availableItems, setAvailableItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [translation, setTranslation] = useState<string>("");
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [isLoadingPictogramas, setIsLoadingPictograms] = useState<boolean>(
    false
  );
  const [categorySelectedId, setCategorySelectedId] = useState<number>(-1);
  const { isMobile } = useContext(PlatformContext).platformData;
  const { authData } = useContext(AuthenticationContext);
  const { token, patientId } = authData;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getCategories(), []);

  const getCategories = () => {
    setIsLoadingCategories(true);
    CategoriesServices.getCategories(token!, patientId!)
      .then((res: any) => {
        setCategories(res.data);
        setIsLoadingCategories(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const fetchPictograms = (categoryId: number) => {
    setIsLoadingPictograms(true);
    setCategorySelectedId(categoryId);
    PictogramsServices.getPictogramsByCategory(token!, categoryId, patientId!)
      .then((res: any) => {
        console.log(res);
        setAvailableItems(res.data);
        setIsLoadingPictograms(false);
      })
      .catch((error: any) => console.log(error));
  };

  const handleTranslation = () => {
    console.log(selectedItems);
    const translation = selectedItems
      .map((pictogram) => pictogram.nombres[0].nombre)
      .join(" ");
    setTranslation(translation);
    setShowModal(true);
    return;
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const cleanTirafrase = () => {
    setselectedItems([]);
  };

  return (
    <Page pageTitle="Comunicarse" showHomeButton>
      <IonGrid>
        {/* Fila del tirafrase */}
        <IonRow className="tirafrase">
          <IonCol>
            {selectedItems!.length > 0 ? null : (
              <div className="tirafrase-text">
                Arrastrá tus pictogramas hasta esta zona
              </div>
            )}
            <ReactSortable
              list={selectedItems!}
              setList={setselectedItems}
              animation={150}
              group="shared-group-name"
              className={`sortable ${isMobile ? "mobile" : ""}`}
            >
              {selectedItems!.map((item, index) => (
                <CardWithImage
                  key={index}
                  img={{ src: item.ruta_acceso_local, alt: "" }}
                  touchable={false}
                  onClick={() => {}}
                />
              ))}
            </ReactSortable>
          </IonCol>
        </IonRow>
        {/* Fila de botones */}
        <IonRow>
          <IonCol>
            <IonButton
              disabled={selectedItems.length <= 0}
              onClick={(e) => handleTranslation()}
            >
              ¡Traducir!
            </IonButton>
          </IonCol>
          <IonCol style={{ display: "flex", justifyContent: "right" }}>
            <IonButton
              disabled={selectedItems.length <= 0}
              onClick={(_e) => cleanTirafrase()}
            >
              <IonIcon icon={trashOutline} />
            </IonButton>
          </IonCol>
        </IonRow>
        {isMobile ? (
          /* Fila de categorías y pictos - MOBILE*/
          <IonRow>
            <IonCol>
              {isLoadingCategories ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonSpinner />
                    <span style={{ paddingLeft: "20px" }}>
                      Buscando las categorías...
                    </span>
                  </div>
                </>
              ) : (
                <IonList>
                  {categories?.map((item, index) => (
                    <>
                      <IonItem
                        key={index}
                        button
                        detail
                        detailIcon={
                          categorySelectedId === item.id_categoria
                            ? chevronDown
                            : chevronForward
                        }
                        className={
                          categorySelectedId === item.id_categoria
                            ? "selected"
                            : ""
                        }
                        onClick={() => fetchPictograms(item.id_categoria)}
                      >
                        {item.nombre}
                      </IonItem>
                      {categorySelectedId === item.id_categoria ? (
                        isLoadingPictogramas ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <IonSpinner />
                              <span style={{ paddingLeft: "20px" }}>
                                Buscando los pictogramas...
                              </span>
                            </div>
                          </>
                        ) : (
                          <ReactSortable
                            list={availableItems}
                            setList={setAvailableItems}
                            animation={150}
                            group="shared-group-name"
                            className="sortable-mobile"
                          >
                            {availableItems!.map((item, index) => (
                              <CardWithImage
                                key={index}
                                img={{ src: item.ruta_acceso_local, alt: "" }}
                                touchable={false}
                                onClick={() => {}}
                              />
                            ))}
                          </ReactSortable>
                        )
                      ) : null}
                    </>
                  ))}
                </IonList>
              )}
            </IonCol>
          </IonRow>
        ) : (
          /* Fila de categorías y pictos - WEB*/
          <IonRow>
            <IonCol>
              {isLoadingCategories ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonSpinner />
                    <span style={{ paddingLeft: "20px" }}>
                      Buscando las categorías...
                    </span>
                  </div>
                </>
              ) : (
                <IonList>
                  {categories?.map((item, index) => (
                    <IonItem
                      key={index}
                      button
                      className={
                        categorySelectedId === item.id_categoria
                          ? "selected"
                          : ""
                      }
                      onClick={() => fetchPictograms(item.id_categoria)}
                    >
                      {item.nombre}
                    </IonItem>
                  ))}
                </IonList>
              )}
            </IonCol>
            <IonCol>
              {categorySelectedId! === -1 ? (
                <div className="tirafrase-text">
                  Seleccioná una categoría para mostrar sus pictogramas
                </div>
              ) : isLoadingPictogramas ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonSpinner />
                    <span style={{ paddingLeft: "20px" }}>
                      Buscando los pictogramas...
                    </span>
                  </div>
                </>
              ) : (
                <ReactSortable
                  list={availableItems}
                  setList={setAvailableItems}
                  animation={150}
                  group="shared-group-name"
                  className={`sortable ${isMobile ? " mobile" : ""}`}
                >
                  {availableItems!.map((item, index) => (
                    <CardWithImage
                      key={index}
                      img={{ src: item.ruta_acceso_local, alt: "" }}
                      touchable={false}
                      onClick={() => {}}
                    />
                  ))}
                </ReactSortable>
              )}
            </IonCol>
          </IonRow>
        )}
      </IonGrid>
      <TranslationModal
        isOpen={showModal}
        translation={translation}
        handleClose={handleCloseModal}
      />
    </Page>
  );
};

interface Item {
  id: string;
  content: string;
}

export default ComunicationPage;
