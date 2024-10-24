import { useDispatch } from "react-redux"
import { handleLogout } from "../reducers/loginReducer"
import { useNavigate } from "react-router-dom"

const LogoutModal = ({toggleLogoutModal}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    dispatch(handleLogout())
    navigate('/')
    toggleLogoutModal()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Overlay (Background Dim) */}
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

      {/* Modal Content */}
      <div className="relative w-1/4 my-6 mx-auto max-w-6xl z-50">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className='text-2xl p-6'>
            <div className='mb-6 p-3 text-center font-bold'>
              Log Out?
            </div>
            <div className='flex justify-center gap-2'>
              <button onClick={handleLogoutClick} className='text-xl text-white rounded bg-blue-500 px-3 py-2 transition-all duration-150 hover:shadow-lg'>
                Log Out
              </button>
              <button onClick={toggleLogoutModal} className='text-xl text-white rounded bg-slate-400 px-3 py-2 transition-all duration-150 hover:shadow-lg'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
