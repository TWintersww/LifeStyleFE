import BarItem from "./BarItem"
import { useSelector } from "react-redux"

const NavBar = () => {
  const user = useSelector(state => state.login.user)

  return (
    <div className="h-screen flex flex-col justify-between p-4 bg-gray-200">
      <BarItem title='Home' to='/' />
      <BarItem title='ToDo' to='/todo'/>
      <BarItem title='Calendar' to='/calendar'/>
      <BarItem title='Nutrition' to='/nutrition'/>
      <BarItem title='Fitness' to='/fitness'/>
      <BarItem title='Journal' to='/journal'/>
      {
        user
        ? <BarItem title='Logout' to='/logout'/>
        : <BarItem title='Login' to='/login'/>
      }
    </div>
  )
}

export default NavBar
