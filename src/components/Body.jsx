import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"


const Body = () => {

  return (
    <div className='body'>
        <NavBar />
        <Outlet />
    </div>
  )
}

export default Body
