import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function AuthLayout() {
  const location = useLocation();
  const isRegister = location.pathname.includes("register");
  const imageSrc = isRegister ? "/images/1.webp" : "/images/2.webp";

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* --- Image : cachée sur mobile, visible à partir de lg --- */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden">
        <img
          src={imageSrc}
          alt=""
          className="w-full h-screen object-cover"
        />
      </div>

      {/* --- Bannière compacte, mobile uniquement --- */}
      <div className="lg:hidden relative h-40 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* --- Formulaire --- */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;