import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

const NavBar = () => {  
  const user = useSelector(state => state.login.user) 
  // console.log('user', user) 
  
  
  return (
  <div className="flex w-64 flex-col min-h-screen h-full bg-slate-200">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-slate-200">

          {/* TOP SEGMENT */}
          <div className="flex items-center flex-shrink-0 px-4">
              {/* <img className="w-auto h-8" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg" alt="" /> */}
              <Link to='/'>
                App
              </Link>
          </div>



          <div className="px-4 mt-6">
              <hr className="border-gray-500" />
          </div>


          {/* DIVISIONS */}
          <div className="flex flex-col flex-1 px-3 mt-6">
              {/* TOP NAV LINKS */}
              <div className="space-y-4">
                  <nav className="flex-1 space-y-2">
                      <NavLink to='/todo' 
                        className={({ isActive }) => 
                          isActive 
                          ? "flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-gray-500 rounded-lg group" 
                          : "flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-gray-500 group"
                        }
                      >
                          <svg className="flex-shrink-0 w-5 h-5 mr-4 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" 
                            />
                          </svg>
                          ToDo
                      </NavLink>

                      <NavLink to='/journal' 
                        className={({ isActive }) => 
                          isActive 
                          ? "flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-gray-500 rounded-lg group" 
                          : "flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-gray-500 group"
                        }
                      >
                          <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                          </svg>
                          Journal
                      </NavLink>
                  </nav>
              </div>
              

              {/* BOTTOM NAV LINKS */}
              <div className="pb-4 mt-auto">
                  <nav className=" space-y-2">
                      {
                        user
                        ?
                        <Link to='/logout' className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-gray-500 group">
                          <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" 
                            />
                          </svg>
                          Logout
                        </Link>
                        :
                        <Link to='/login' className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-gray-500 group">
                          <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" 
                            />
                          </svg>
                          Login
                        </Link>
                      }
                  </nav>
                  <nav className="flex-1 space-y-2">
                      <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-gray-500 group">
                          <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" 
                            />
                          </svg>

                          {
                            user
                            ? <h3>{user.username}</h3>
                            : <h3>Sign Up</h3>
                          }
                      </a>
                  </nav>
              </div>
          </div>
      </div>
  </div>

  )
}


export default NavBar
