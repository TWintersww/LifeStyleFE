import { useDispatch } from "react-redux"
import { setUser } from "../reducers/loginReducer"
import { useNavigate } from "react-router-dom"


const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedInUser')

    navigate('/')
  }

  return (
    <div className="flex min-h-full min-w-full flex-col justify-center items-center">
      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  )
}

export default Logout
