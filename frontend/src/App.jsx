import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthLayout from "./pages/Layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Toaster } from "sonner";
import CheckAuth from "./common/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "./pages/Layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import { useEffect } from "react";
import { checkAuth } from "./store/AuthSlice";


function App() {
  const {isAuthenticated, user} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(checkAuth());
  }, [])

  return (
    <>
      <Toaster position="top-right" closeButton richColors/>
      <Routes>

        <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}/>}/>

        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}>
          <Route element={<Login />} path="login" />
          <Route element={<Register />} path="register" />
        </Route>

        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}> <AdminLayout /> </CheckAuth>}>
            <Route path="dashboard" element={<Dashboard/>} />
        </Route>

      </Routes>
    </>
  );
}

export default App;