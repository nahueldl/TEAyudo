import React, { useCallback, useContext, useEffect } from "react";
import Page from "../../components/Page";
import ListCategories from "./ListCategories";
import CategoriesService from "../../services/categories.services";
import { AuthenticationContext } from "../../context/authentication";
import { IonLoading, NavContext } from "@ionic/react";
import { PatientContext } from "../../context/patient";
import { CategoryContext } from "../../context/category";

const CategoriesPage: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { categoriaData, setCategoriaData } = useContext(CategoryContext);
  const { patientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);

  useEffect(() => getCategorias(), []);
  
  const getCategorias = () => {
    setAuthData({ loading: true, error: false });
    CategoriesService.getCategories(authData.token!, patientData.patientSelected?.id_paciente)
      .then((res: any) => {
        if (res.data?.length > 0) {
          setCategoriaData({ categoriasList: res.data });
          setAuthData({ loading: false });
        } else {
          goToAddCategory();
          setAuthData({ loading: false });
        }
      })
      .catch((_error: any) => {
        setAuthData({ loading: false, error: true });
      });
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
        <ListCategories></ListCategories>
      )}
    </Page>
  );
};

export default CategoriesPage;
