import React, { useState, useContext, useEffect, useCallback } from "react";
import Page from "../../../components/Page";
import { NavContext, IonLoading } from "@ionic/react";
import ListPictograms from "../ListPictograms";
import { AuthenticationContext } from "../../../context/authentication";
import PictogramServices from "../../../services/pictograms.services";

const PictogramsPage: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const [pictograms, setPictograms] = useState<[Pictogram]>();
  const { navigate } = useContext(NavContext);

  useEffect(() => getpictograms(), []);
  const getpictograms = () => {
    setAuthData({ loading: true, error: false });
    PictogramServices.getPictogramsFromUser(authData.token!)
      // .then((res: any) => {
      //   if (res.data?.length > 0) {
      //     setPictograms(res.data);
      //     setAuthData({ loading: false });
      //   } else {
      //     goToAddPictogram();
      //     setAuthData({ loading: false });
      //   }
      // })
      // .catch((_error: any) => {
      //   setAuthData({ loading: false, error: true });
      // });
  };

  const goToAddPictogram = useCallback(
    () => navigate("/pictogram/alta", "forward"),
    [navigate]
  );

  return (
    <Page pageTitle="Pictogramas" showHomeButton>
      {authData.loading ? (
        <IonLoading isOpen={authData.loading!} message="Trabajando..." />
      ) : (
        <ListPictograms></ListPictograms>
      )}
    </Page>
  );
};

interface Pictogram {
  id_pictograma: any;
  id_picto_arasaac: any;
  ruta_acceso_local: string;
  esquematico: boolean;
  sexo: string;
  violencia: boolean;
  // foto: string;
  // chequear este ultimo si iria y los otros el tipo
}

export default PictogramsPage;
