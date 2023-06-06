import { Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginPage from "./modules/auth/pages/LoginPage";
import { ROUTES } from "./configs/routes";

import HomePage from "./modules/pages/HomePage";
import CreateOrUpdatePage from "./modules/pages/CreateOrUpdatePage";
import ForgotPassword from "./modules/auth/pages/ForgotPassword";
import ProtectedRoute from "./route/ProtectedRoute";
import PrivateRoute from "./route/PrivateRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
          <Route path={ROUTES.employee} element={<HomePage />} />
          <Route path={ROUTES.createUpdate} element={<CreateOrUpdatePage />} />
          <Route path={ROUTES.updateEmployee} element={<CreateOrUpdatePage />} />
          <Route />
        </Route>
        <Route path={ROUTES.login} element={<ProtectedRoute />}>
          <Route path={ROUTES.login} element={<LoginPage />} />
        </Route>
        <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
