import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function AuthLayout() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex items-center justify-center w-1/2">
        {location.pathname.includes("register") ? (
          <img src="/images/1.webp" alt="" className="w-full h-screen object-cover" />
        ) : (
          <img src="/images/2.webp" alt="" className=" h-screen object-cover"/>
        )}
      </div>

      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
