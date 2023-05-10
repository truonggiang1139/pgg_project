import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "./configs/routes";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const auth = Cookies.get("token");

  return auth ? <Outlet /> : <Navigate to={ROUTES.login} replace />;
};
export default PrivateRoute;
