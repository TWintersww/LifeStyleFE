import { useState } from "react"
import signupService from '../../services/signup'
import { useDispatch } from "react-redux"
import { handleErrorMsgToggle, handleNotifMsgToggle } from "../../reducers/loginReducer"

const SignUpForm = () => {
  const [realName, setRealName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()


  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const fields = {
      name: realName,
      username,
      password
    }

    try {
      await signupService.handleSignup(fields)
      dispatch(handleNotifMsgToggle('Signup Successful!'))

      setRealName('')
      setUsername('')
      setPassword('')
    }
    catch (e) {
      const eMessage = e.response.data.error
      // console.log(e.response.data.error)
      console.log(eMessage)
      dispatch(handleErrorMsgToggle(eMessage))
    }
  }

  return (
    <div className="flex min-h-full min-w-full flex-col justify-center items-center">
        <form 
          className="bg-blue-300 p-6 rounded-lg shadow-lg w-full max-w-xs"
          onSubmit={handleFormSubmit}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Sign Up!
          </h2>
          <div>
            <input 
              type='text' 
              name='realName' 
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
              placeholder='Name'
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
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
              placeholder='Password (8 or more characters)'
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Sign Up!
            </button>
          </div>
        </form>
      </div>
  )
}

export default SignUpForm
