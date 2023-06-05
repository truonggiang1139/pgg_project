import { Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginPage from "./modules/auth/pages/LoginPage";
import { ROUTES } from "./configs/routes";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./modules/pages/HomePage";
import CreateOrUpdatePage from "./modules/pages/CreateOrUpdatePage";
import ForgotPassword from "./modules/auth/pages/ForgotPassword";
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.employee} element={<HomePage />} />
          <Route path={ROUTES.createUpdate} element={<CreateOrUpdatePage />} />
          <Route path={ROUTES.updateEmployee} element={<CreateOrUpdatePage />} />
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
          <Route />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
        </Route>
        <Route path={ROUTES.login} element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
