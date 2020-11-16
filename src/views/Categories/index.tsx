import React, { useCallback, useContext, useEffect } from "react";
import Page from "../../components/Page";
import ListCategories from "./ListCategories";
import CategoriesService from "../../services/categories.services";
import { AuthenticationContext } from "../../context/authentication";
import { IonLoading, IonRow, NavContext } from "@ionic/react";
import { PatientContext } from "../../context/patient";
import { CategoryContext } from "../../context/category";
import { addCircleOutline } from "ionicons/icons";
import CardWithIcon from "../../components/CardWithIcon";

const CategoriesPage: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { setCategoriaData } = useContext(CategoryContext);
  const { patientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getCategorias(), []);

  const getCategorias = () => {
    setAuthData({ loading: true, error: false });
    CategoriesService.getCategories(
      authData.token!,
      patientData.patientSelected?.id_paciente
    )
      .then((res: any) => {
        //Si vienen resultados, populo el setCategoriaData con eso y lo muestro
        setCategoriaData({ categoriasList: res.data });
        setAuthData({ loading: false });

        //Si no hay datos, voy directo a agregar categorías -> considerando que siempre hay categorías precargadas, este caso no existe
        // goToAddCategory();
        // setAuthData({ loading: false });
      })
      .catch((_error: any) => {
        setAuthData({ loading: false, error: true });
      });
  };

  const handleAddCategoriaClick = () => {
    goToAddCategory();
  };

  const goToAddCategory = useCallback(
    () => navigate("/categorias/alta", "forward"),
    [navigate]
  );

  return (
    <Page pageTitle="Categorías" showHomeButton>
      {authData.loading ? (
        <IonLoading
          isOpen={authData.loading!}
          message="Trabajando..."
          spinner="crescent"
        />
      ) : (
        <>
          <ListCategories />
          <IonRow>
            <CardWithIcon
              icon={addCircleOutline}
              title="Agregar"
              touchable
              onClick={handleAddCategoriaClick}
            />
          </IonRow>
        </>
      )}
    </Page>
  );
};

export default CategoriesPage;
