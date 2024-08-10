import { useSelector } from "react-redux"

const LoginNotification = () => {
  const errorMsg = useSelector(state => state.login.errorMsg) 
  // console.log(`LoginNotification.jsx | ${errorMsg}`)

  if (!errorMsg) {
    return
  }

  return (
    <div className="p-2 text-sm text-center text-red-800 rounded-lg bg-red-100 w-full max-w-xs">
      {errorMsg}
    </div>
  )
}

export default LoginNotification
