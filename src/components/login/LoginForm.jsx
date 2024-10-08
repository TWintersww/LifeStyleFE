import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleLogin, handleErrorMsgToggle } from "../../reducers/loginReducer";
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // const handleNotifToggle = (errorMsg) => {
  //   dispatch(setErrorMsg(errorMsg))
  //   setTimeout(() => {
  //     dispatch(setErrorMsg(null))
  //   }, 3000)
  // }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      console.log('username and password both required')
      dispatch(handleErrorMsgToggle('Username and password both required'))
      return
    }

    try {
      //If successful, the loginReducer fields are set
      await dispatch(handleLogin({username, password}))
      navigate('/todo')
    }
    catch (error) {
      // console.log(error)
      const errorMsg = error.response.data.error || 'Login failed'
      console.log('logging error:', errorMsg)
      dispatch(handleErrorMsgToggle(errorMsg))
    }

    setUsername('')
    setPassword('')
  }

  return (
    <div className="flex min-h-full min-w-full flex-col justify-center items-center">
      <form 
        className="bg-blue-300 p-6 rounded-lg shadow-lg w-full max-w-xs"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Log In
        </h2>
        <div>
          <input 
            type='text' 
            name='username' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input 
            type='text' 
            name='password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
        {/* <div>
          sign up
        </div> */}
      </form>
      </div>
  )
}

export default LoginForm
