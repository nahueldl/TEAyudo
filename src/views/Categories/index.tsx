import React, { useCallback, useContext, useEffect, useState } from "react";
import Page from "../../components/Page";
import ListCategories from "./ListCategories";
import CategoriesService from "../../services/categories.services";
import { AuthenticationContext } from "../../context/authentication";
import { IonAlert, IonLoading, IonRow, NavContext } from "@ionic/react";
import { PatientContext } from "../../context/patient";
import { CategoryContext } from "../../context/category";
import { addCircleOutline } from "ionicons/icons";
import CardWithIcon from "../../components/CardWithIcon";

const CategoriesPage: React.FC = () => {
  const { token } = useContext(AuthenticationContext).authData;
  const { setCategoriaData } = useContext(CategoryContext);
  const { patientData } = useContext(PatientContext);
  const { navigate } = useContext(NavContext);
  const [loading, isLoading] = useState<boolean>(true);
  const [error, hasError] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getCategorias(), []);

  const getCategorias = () => {
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

  const handleAddCategoriaClick = () => {
    goToAddCategory();
  };

  const goToAddCategory = useCallback(
    () => navigate("/categorias/alta", "forward"),
    [navigate]
  );

  return (
    <Page pageTitle="Categorías" showHomeButton>
      {loading ? (
        <IonLoading
          isOpen={loading!}
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
      {error ? (
        <IonAlert
          isOpen={error!}
          animated
          backdropDismiss
          keyboardClose
          message={
            "Hubo un error inesperado, por favor intente nuevamente más tarde."
          }
        />
      ) : null}
    </Page>
  );
};

export default CategoriesPage;
