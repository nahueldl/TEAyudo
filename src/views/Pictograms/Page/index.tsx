import React, { useState, useContext, useEffect, useCallback } from "react";
import Page from "../../../components/Page";
import { NavContext, IonLoading } from "@ionic/react";
import ListPictograms from "../ListPictograms";
import { AuthenticationContext } from "../../../context/authentication";
import PictogramServices from "../../../services/pictograms.services";

const PictogramsPage: React.FC = () => {
  const { authData, setAuthData } = useContext(AuthenticationContext);

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

// interface Pictogram {
//   id_pictograma: any;
//   id_picto_arasaac: any;
//   ruta_acceso_local: string;
//   esquematico: boolean;
//   sexo: string;
//   violencia: boolean;
//   // foto: string;
//   // chequear este ultimo si iria y los otros el tipo
// }

export default PictogramsPage;
