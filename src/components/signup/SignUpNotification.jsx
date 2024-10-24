import { useSelector } from "react-redux"

const SignUpNotification = () => {

  const notifMsg = useSelector(state => state.login.notifMsg)
  const errorMsg = useSelector(state => state.login.errorMsg)
  const colorScheme = notifMsg ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'

  if (!notifMsg && !errorMsg) return
  else {
    return (
      <div className={`p-2 text-sm text-center ${colorScheme} rounded-lg w-full max-w-xs`}>
        {notifMsg}
        {errorMsg}
      </div>
    )
  }

}

export default SignUpNotification
