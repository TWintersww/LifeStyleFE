
import SignUpForm from "./signup/SignUpForm"
import SignUpNotification from "./signup/SignUpNotification"

const SignUp = () => {
  
  return (
    <div className="flex min-h-full min-w-full flex-col justify-center items-center">
      <div className="h-9 flex items-center w-full max-w-xs">
        {/* <div className="p-2 text-sm text-center text-red-800 rounded-lg bg-red-100 w-full max-w-xs">
          {errorMsg}
        </div> */}
        <SignUpNotification />
      </div>

      <SignUpForm />
    </div>
  )
}

export default SignUp
