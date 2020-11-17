import {
  IonActionSheet,
  IonAlert,
  IonButton,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonRow,
  IonTitle,
  NavContext,
} from "@ionic/react";
import React, { useContext, useState, useCallback } from "react";
import Page from "../../../components/Page";
import "../styles.css";
import { trash, close } from "ionicons/icons";
import { AuthenticationContext } from "../../../context/authentication";
import { CategoryContext } from "../../../context/category";
import CategoriesService from "../../../services/categories.services";
import { PatientContext } from "../../../context/patient";

const ViewEditDeleteCategory = () => {
  const { token } = useContext(AuthenticationContext).authData;
  const { categoriaData, setCategoriaData } = useContext(CategoryContext);
  const { patientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showActionDeletePatient, setShowActionDeletePatient] = useState(false);
  const [nombreCategoriaAux, setNombreCategoriaAux] = useState<string>(
    categoriaData.categoriaSelected?.nombre!
  );
  const [loading, isLoading] = useState<boolean>(true);
  const [error, hasError] = useState<boolean>(false);

  const handleEditCategoria = () => {
    isLoading(true);
    hasError(false);
    CategoriesService.editCategory(
      token!,
      categoriaData.categoriaSelected?.id_categoria!,
      nombreCategoriaAux
    )
      .then((res: any) => {
        setCategoriaData({
          categoriaSelected: {
            nombre: nombreCategoriaAux,
            id_categoria: categoriaData.categoriaSelected?.id_categoria!,
            id_usuario_rol: categoriaData.categoriaSelected?.id_usuario_rol!,
          },
        });
        getListCategorias();
        isLoading(false);
        goToListCategories();
      })
      .catch((error: any) => {
        setErrorMessage(
          "Hubo un inconveniente editando la categoria, pruebe más tarde."
        );
        isLoading(false);
        hasError(true);
      });
  };

  const getListCategorias = () => {
    isLoading(true);
    hasError(false);
    CategoriesService.getCategories(
      token!,
      patientData.patientSelected?.id_paciente
    )
      .then((res: any) => {
        setCategoriaData({ categoriasList: res.data });
        isLoading(false);
      })
      .catch((_error: any) => {
        isLoading(false);
        hasError(true);
      });
  };

  const handleDeleteCategoria = () => {
    isLoading(true);
    hasError(false);
    CategoriesService.deleteCategory(
      token!,
      categoriaData.categoriaSelected?.id_categoria!
    )
      .then((res: any) => {
        getListCategorias();
        isLoading(false);
        goToListCategories();
      })
      .catch((error: any) => {
        setErrorMessage(
          "Hubo un inconveniente eliminando la categoria, pruebe más tarde."
        );
        isLoading(false);
        hasError(true);
      });
  };

  const goToListCategories = useCallback(
    () => navigate("/categorias", "back"),
    [navigate]
  );

  return (
    <Page
      pageTitle={`Categoria ${categoriaData.categoriaSelected?.nombre}`}
      showHomeButton
    >
      <IonContent>
        <IonGrid className="container-patientAdd">
          <IonRow>
            <form className="form-no-background">
              <IonLoading
                isOpen={loading!}
                message={"Trabajando..."}
                spinner="crescent"
              />
              <IonList className="mt-5">
                <IonTitle>Edicion de categoria</IonTitle>
                <IonItem className="inputMargin">
                  <IonLabel>Nombre:</IonLabel>
                  <IonInput
                    name="name"
                    className="text-bold"
                    value={nombreCategoriaAux}
                    required
                    clearInput
                    placeholder="Nombre"
                    onIonChange={(e) => setNombreCategoriaAux(e.detail.value!)}
                  />
                </IonItem>
              </IonList>
              <div>
                <IonButton
                  className="formButton green-buttom mt-5"
                  onClick={() => handleEditCategoria()}
                  expand="block"
                >
                  Aceptar edicion
                </IonButton>
                <IonButton
                  className="formButton mt-5"
                  onClick={goToListCategories}
                  expand="block"
                >
                  Volver
                </IonButton>
                <IonButton
                  className="formButton red-buttom mt-5"
                  onClick={() => setShowActionDeletePatient(true)}
                  expand="block"
                >
                  Eliminar
                </IonButton>
                <IonActionSheet
                  isOpen={showActionDeletePatient}
                  onDidDismiss={() => setShowActionDeletePatient(false)}
                  buttons={[
                    {
                      text: "Eliminar",
                      role: "destructive",
                      icon: trash,
                      handler: () => {
                        handleDeleteCategoria();
                      },
                    },
                    {
                      text: "Cancelar",
                      icon: close,
                      role: "cancel",
                      handler: () => {
                        setShowActionDeletePatient(false);
                      },
                    },
                  ]}
                ></IonActionSheet>
              </div>
            </form>
            <IonAlert
              isOpen={error!}
              animated
              backdropDismiss
              keyboardClose
              message={errorMessage}
            />
          </IonRow>
        </IonGrid>
      </IonContent>
    </Page>
  );
};

export default ViewEditDeleteCategory;
