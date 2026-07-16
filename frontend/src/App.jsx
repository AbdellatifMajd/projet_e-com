import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthLayout from "./pages/Layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />} path="/auth">
        <Route element={<Login />} path="login" />
        <Route element={<Register />} path="register" />
      </Route>
    </Routes>
  );
}

export default App;
