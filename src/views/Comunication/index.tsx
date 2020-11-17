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
  IonModal,
} from "@ionic/react";
import "./styles.css";
import CardWithImage from "../../components/CardWithImage";
import { PlatformContext } from "../../context/platform";
import CategoriesServices from "../../services/categories.services";
import { AuthenticationContext } from "../../context/authentication";
import PictogramsServices from "../../services/pictograms.services";
import TranslationModal from "./TranslationModal";
import { chevronDown, chevronForward, trashOutline } from "ionicons/icons";
import { Pictogram } from "../../types/Pictograms";
import { Category } from "../../types/Categories";

interface PictogramWithId {
  id: number;
  pictogram: Pictogram;
}

const addIdForSortable = (list: any) => {
  const response: PictogramWithId[] = list.map((item: any, index: number) => {
    return { id: index, pictogram: item };
  });
  return response;
};

const ComunicationPage: React.FC = () => {
  const [selectedItems, setselectedItems] = useState<PictogramWithId[]>([]);
  const [availableItems, setAvailableItems] = useState<PictogramWithId[]>([]);
  const [categories, setCategories] = useState<Category[]>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [translation, setTranslation] = useState<string>("");
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [isLoadingPictogramas, setIsLoadingPictograms] = useState<boolean>(
    false
  );
  const [error, setError] = useState<string>("");
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
        console.log(res);
        setCategories(res.data);
        setIsLoadingCategories(false);
      })
      .catch((error: any) => {
        console.log(error);
        setError(error.msg);
        setIsLoadingCategories(false);
      });
  };

  const fetchPictograms = (categoryId: number) => {
    setIsLoadingPictograms(true);
    setCategorySelectedId(categoryId);
    PictogramsServices.getPictogramsByCategory(token!, categoryId, patientId!)
      .then((res: any) => {
        const transformedResponse = addIdForSortable(res.data);
        console.log(transformedResponse);

        setAvailableItems(transformedResponse);
        setIsLoadingPictograms(false);
      })
      .catch((error: any) => {
        console.log(error);
        setError(error.msg);
        setIsLoadingPictograms(false);
      });
  };

  const handleTranslation = () => {
    const translation = selectedItems
      .map((item) => item.pictogram.nombres[0].nombre)
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

  const isSelected = (categoryId: number) => {
    return categorySelectedId === categoryId;
  };

  // const toggleCategory = () => {
  //   // Agregar el poder cerrar la categoría
  // };

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
              swap
            >
              {selectedItems!.map((item: PictogramWithId, index: number) => (
                <CardWithImage
                  key={item.pictogram.id_pictograma}
                  img={{ src: item.pictogram.ruta_acceso_local, alt: "" }}
                  touchable={false}
                  onClick={() => {}}
                />
              ))}
            </ReactSortable>
          </IonCol>
        </IonRow>
        {/* Fila de botones */}
        <IonRow>
          <IonCol style={{ display: "flex", justifyContent: "flex-start" }}>
            <IonButton
              disabled={selectedItems.length <= 0}
              onClick={(_e) => handleTranslation()}
            >
              ¡Traducir!
            </IonButton>
          </IonCol>
          <IonCol style={{ display: "flex", justifyContent: "flex-end" }}>
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
                  {categories!.map((category, index) => (
                    <>
                      <IonRow>
                        <IonCol>
                          <IonItem
                            key={index}
                            button
                            detail
                            detailIcon={
                              isSelected(category.id_categoria)
                                ? chevronDown
                                : chevronForward
                            }
                            className={
                              isSelected(category.id_categoria)
                                ? "selected"
                                : ""
                            }
                            onClick={() =>
                              fetchPictograms(category.id_categoria)
                            }
                          >
                            {category.nombre}
                          </IonItem>
                        </IonCol>
                      </IonRow>
                      {isSelected(category.id_categoria) ? (
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
                            className="sortable mobile"
                            // bubbleScroll={true}
                            invertSwap={true}
                            invertedSwapThreshold={0.65}
                          >
                            {availableItems!.map((item, index) => (
                              <CardWithImage
                                key={item.id}
                                img={{
                                  src: item.pictogram.ruta_acceso_local,
                                  alt: "",
                                }}
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
                  {categories!.map((category, index) => (
                    <IonItem
                      key={index}
                      button
                      className={
                        isSelected(category.id_categoria) ? "selected" : ""
                      }
                      onClick={() => fetchPictograms(category.id_categoria)}
                    >
                      {category.nombre}
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
                  className="sortable"
                >
                  {availableItems!.map((item, index) => (
                    <CardWithImage
                      key={item.id}
                      img={{ src: item.pictogram.ruta_acceso_local, alt: "" }}
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
      <IonModal isOpen={error ? true : false} backdropDismiss={true}>
        {error}
      </IonModal>
    </Page>
  );
};

export default ComunicationPage;
