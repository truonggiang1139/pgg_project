import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { ROUTES } from "../configs/routes";

const PrivateRoute = () => {
  const auth = Cookies.get("token");

  return !auth ? <Outlet /> : <Navigate to={ROUTES.employee} replace />;
};

export default PrivateRoute;
