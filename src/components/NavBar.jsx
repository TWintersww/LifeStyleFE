import BarItem from "./BarItem"

const NavBar = () => {

  return (
    <div className='navbar'>
      <BarItem title='Home' to='/'/>
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
