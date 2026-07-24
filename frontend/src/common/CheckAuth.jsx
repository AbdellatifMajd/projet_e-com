import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  if (!isAuthenticated && !location.pathname.includes("auth")) {
    return <Navigate to="/auth/login" />;
  }

   if(isAuthenticated && location.pathname.includes("auth")){
     if( user?.role == "admin"){
        return <Navigate to="/admin/dashboard" />
    }
    else{
      return <Navigate to="/shop/home" />
    }
    
   }
  

  return children;
}

export default CheckAuth;
