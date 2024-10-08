import { Link, Outlet, useLocation } from "react-router-dom"

const JournalContainer = () => {
  const location = useLocation()

  return (
    <div className="text-gray-800 p-2.5 max-w-3xl mx-auto w-full h-auto self-start justify-start">

      <header className="flex justify-between items-center mt-5 mb-2">
        <Link to='/journal' className="font-bold text-3xl">Journal</Link>
        {/* Render only for /journal path */}
        {
          location.pathname === '/journal' && 
          <Link to='/journal/create' className="text-xl">Create Post</Link>
        }
      </header>

      <Outlet />

    </div>
  )
}

export default JournalContainer
