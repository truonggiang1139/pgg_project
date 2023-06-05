import { Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginPage from "./modules/auth/pages/LoginPage";
import { ROUTES } from "./configs/routes";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./modules/pages/HomePage";
import CreateOrUpdatePage from "./modules/pages/CreateOrUpdatePage";
import ForgotPassword from "./modules/auth/pages/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route>
          <Route path={ROUTES.employee} element={<HomePage />} />
          <Route path={ROUTES.createUpdate} element={<CreateOrUpdatePage />} />
          <Route path={ROUTES.updateEmployee} element={<CreateOrUpdatePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
