import React, { useContext, FC } from "react";
import { Redirect, Route } from "react-router-dom";

import { UserContext } from "../context";

const ProtectedRoute = ({
  path,
  component: Component,
}: {
  path: string;
  component: FC;
}) => {
  const [user] = useContext(UserContext);

  return (
    <Route path={path} exact>
      {user.authenticated === null ? (
        <p>loading</p>
      ) : user.authenticated ? (
        <Component />
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  );
};

export default ProtectedRoute;
