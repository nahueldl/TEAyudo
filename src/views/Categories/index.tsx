import React from "react";
import Page from "../../components/Page";
import ListCategories from "./ListCategories";

const CategoriesPage: React.FC = () => {
  return (
    <Page pageTitle="Categorías" showHomeButton>
      <ListCategories></ListCategories>
    </Page>
  );
};

export default CategoriesPage;
