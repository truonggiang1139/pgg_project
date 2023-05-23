import { Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginPage from "./modules/auth/pages/LoginPage";
import { ROUTES } from "./configs/routes";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./modules/pages/HomePage";
import CreateOrUpdatePage from "./modules/pages/CreateOrUpdatePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/employee" element={<HomePage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.createUpdate} element={<CreateOrUpdatePage />} />
      </Routes>
    </>
  );
}

export default App;
