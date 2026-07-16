import React, { useState } from "react";
import CommonForm from "../../common/CommonForm";
import { loginFormControls } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { loginUser } from "../../store/AUthSlice";

function Login() {
  const initialState = {
    email: "", 
    password: ""
  }
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
      try{
        dispatch(loginUser(formData)).unwrap()
      .then((data) => {
        console.log("connection successfull");
        
      });
      }
      catch(e){
        console.log("connection failed", e)
      }
  };

  return (
<div className="w-full max-w-md space-y-6 rounded-3xl border border-gray-500 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-zinc-950 sm:p-8">
  <div className="flex items-center space-x-2">
    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
      Welcome Back,
    </h1>
    <img src="/images/3.png" alt="Logo" className="h-10 w-10 object-contain" />
  </div>

  {/* Lien de redirection en dessous de l'en-tête */}
  <p className="text-sm text-gray-500 dark:text-gray-400">
    Don't have an account?
    <Link
      className="ml-1.5 font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-500 hover:underline dark:text-blue-400"
      to="/auth/register"
    >
      Register
    </Link>
  </p>

  {/* Formulaire */}
  <div className="mt-4">
    <CommonForm
      formControls={loginFormControls}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      buttonText={"Sign In"}
    />
  </div>
</div>
  );
}

export default Login;
