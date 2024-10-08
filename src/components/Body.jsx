import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"


const Body = () => {

  return (
    <div className='body'>
      <div className="flex w-full h-full">
        <div className="w-64">
          <NavBar />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Body
