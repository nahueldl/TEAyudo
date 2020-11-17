import {
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
  NavContext,
} from "@ionic/react";
import React, { useContext, useState, useCallback } from "react";
import Page from "../../../components/Page";
import { AuthenticationContext } from "../../../context/authentication";
import { CategoryContext } from "../../../context/category";
import CategoriesService from "../../../services/categories.services";
import "../styles.css";

const AddCategory: React.FC<InfoCategoryProps> = ({ categoria }) => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { categoriaData, setCategoriaData } = useContext(CategoryContext);
  const { navigate } = useContext(NavContext);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { error, loading } = authData;
  const [name, setName] = useState<string>(
    categoria !== undefined ? categoria.nombre! : ""
  );

  const handleAdd = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
    setAuthData({ loading: true, error: false });
    CategoriesService.createCategory(authData.token!, name, authData.role!)
      .then((res: any) => {
        categoriaData.categoriasList?.push(res.data);
        setCategoriaData({categoriasList:categoriaData.categoriasList});
        setAuthData({ loading: false, error: false });
        goToListCategories();
      })
      .catch((_error: any) => {
        setErrorMessage(
          "Hubo un inconveniente creando la categoría, pruebe más tarde."
        );
        setAuthData({ loading: false, error: true });
      });
  };

  const handleCancel = () => {
    goToListCategories();
  };

  const goToListCategories = useCallback(
    () => navigate("/categorias", "forward"),
    [navigate]
  );
  return (
    <Page pageTitle="Agregar categoría" showHomeButton>
      <IonContent>
        <IonGrid className="container-categorieAdd">
          <IonRow>
            {/* <IonCol size="3">
                        <IonButton size="large" expand="block" className="">
                            {!name.length? "Nueva Categoría": name}
                        </IonButton>
                    </IonCol> */}
            {/* <IonCol size="6"> */}
            <form className="form-no-background">
              <IonList className="mt-5">
                <IonItem className="inputMargin">
                  <IonLabel>Nombre:</IonLabel>
                  <IonInput
                    name="name"
                    className="text-bold"
                    value={name}
                    required
                    clearInput
                    placeholder="Ingrese el nombre"
                    onIonChange={(e) => setName(e.detail.value!)}
                  />
                </IonItem>
              </IonList>
              <div>
                <IonButton
                  className="formButton mt-5"
                  onClick={(e) => handleAdd(e)}
                  expand="block"
                >
                  Crear Categoría
                </IonButton>

                <IonButton
                  className="formButton red-buttom mt-5"
                  onClick={handleCancel}
                  expand="block"
                >
                  Cancelar
                </IonButton>
              </div>
            </form>
            <IonLoading
              isOpen={loading!}
              message={"Trabajando..."}
              spinner="crescent"
            />
            <IonAlert
              isOpen={error!}
              animated
              backdropDismiss
              keyboardClose
              message={errorMessage}
              onDidDismiss={() => setAuthData({ error: false })}
            />
            {/* </IonCol> */}
          </IonRow>
        </IonGrid>
      </IonContent>
    </Page>
  );
};

interface InfoCategoryProps {
  title?: string;
  categoria?: Categoria;
}

interface Categoria {
  id_categoria?: any;
  id_usuario_rol?: any;
  nombre?: string;
}

export default AddCategory;
