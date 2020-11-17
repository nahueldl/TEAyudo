import React, { useContext } from "react";
import Page from "../../../components/Page";
import { AuthenticationContext } from "../../../context/authentication";
import AddRole from "../Add";

const AddRolePage: React.FC = () => {
  const { role } = useContext(AuthenticationContext).authData;

  return (
    <>
      {role === 1 || role === 2 ? (
        <Page pageTitle="Roles" showHomeButton>
          <AddRole />
        </Page>
      ) : (
        <AddRole />
      )}
    </>
  );
};

export default AddRolePage;
