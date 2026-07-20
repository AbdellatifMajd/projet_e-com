import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  if (!isAuthenticated && !location.pathname.includes("auth")) {
    return <Navigate to="/auth/login" />;
  }

   if(isAuthenticated && location.pathname.includes("auth")){
     if(isAuthenticated && user?.role == "admin"){
        return <Navigate to="/admin/dashboard" />
    }
    
   }
  

  return children;
}

export default CheckAuth;
