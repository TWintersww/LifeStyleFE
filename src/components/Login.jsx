import { useState } from "react"
import LoginForm from "./login/LoginForm"
import LoginNotification from "./login/LoginNotification"

const Login = () => {
  const [errorMsg, setErrorMsg] = useState(null)

  return (
    <div className="flex min-h-full min-w-full flex-col justify-center items-center">
      <div className="h-9 flex items-center w-full max-w-xs">
        { errorMsg && <LoginNotification /> }
      </div>
      <LoginForm setErrorMsg={setErrorMsg}/>
    </div>
  )
}

export default Login
