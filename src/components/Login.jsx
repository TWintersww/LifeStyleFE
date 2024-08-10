import { useState } from "react"
import LoginForm from "./login/LoginForm"
import LoginNotification from "./login/LoginNotification"
import { useSelector } from "react-redux"

const Login = () => {

  return (
    <div className="flex min-h-full min-w-full flex-col justify-center items-center">
      <div className="h-9 flex items-center w-full max-w-xs">
        <LoginNotification />
      </div>
      <LoginForm />
    </div>
  )
}

export default Login
