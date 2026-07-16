import React from 'react'
import CommonForm from '../../common/CommonForm'
import { registerFormControls } from '../../config'
import { Link } from 'react-router-dom'

function Register() {
  const onSubmit = () => {
    
  }
  return (
    <div className=" space-y-6 max-w-md w-full  p-6 sm:p-8 border rounded-3xl">
      <div className="">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account? 
          <Link
            className="font-medium ml-2 text-blue-500 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Register