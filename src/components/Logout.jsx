import { useDispatch } from "react-redux"
import { setUser, handleLogout } from "../reducers/loginReducer"
import { useNavigate } from "react-router-dom"


const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    // console.log('clicked')
    dispatch(handleLogout())
    navigate('/')
  }

  return (
    <div className="flex min-h-full min-w-full flex-col justify-center items-center">
      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={handleLogoutClick}
      >
        Log Out
      </button>
    </div>
  )
}

export default Logout
