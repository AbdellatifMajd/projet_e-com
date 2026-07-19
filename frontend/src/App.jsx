import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthLayout from "./pages/Layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-right" closeButton richColors/>
      <Routes>
        <Route element={<AuthLayout />} path="/auth">
          <Route element={<Login />} path="login" />
          <Route element={<Register />} path="register" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
