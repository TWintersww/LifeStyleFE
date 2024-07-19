import BarItem from "./BarItem"

const NavBar = () => {

  return (
    <div className="h-screen flex flex-col justify-between p-4 bg-gray-200">
      <BarItem title='Home' to='/' />
      <BarItem title='ToDo' to='/todo'/>
      <BarItem title='Calendar' to='/calendar'/>
      <BarItem title='Nutrition' to='/nutrition'/>
      <BarItem title='Fitness' to='/fitness'/>
      <BarItem title='Journal' to='/journal'/>
      <BarItem title='Login' to='/login'/>
    </div>
  )
}

export default NavBar
