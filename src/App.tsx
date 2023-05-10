import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./modules/auth/pages/LoginPage";
import { ROUTES } from "./configs/routes";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./modules/pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
