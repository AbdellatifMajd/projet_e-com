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
import AdminProdcut from "./pages/Admin/AdminProdcut";
import Skeleton from "@mui/material/Skeleton";
import ShopLayout from "./pages/Layouts/ShopLayout";
import ShopHome from "./pages/Shop/ShopHome";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          padding: "1rem",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={60}
          sx={{ mb: 2 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height="calc(100% - 80px)"
        />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" closeButton richColors />
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              {/* remplace par ton élément home, ex: <Home /> ou une redirection */}
            </CheckAuth>
          }
        />

        <Route
          path="/auth"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route element={<Login />} path="login" />
          <Route element={<Register />} path="register" />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProdcut />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShopHome />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
