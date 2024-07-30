import Header from './components/Header'
import Body from './components/Body'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import { useEffect } from 'react'
import styled from 'styled-components'

import Home from './components/Home'
import Todo from './components/Todo'
import Login from './components/Login'

import { Provider, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/todoReducer'
import loginReducer from './reducers/loginReducer'

import { setUser } from './reducers/loginReducer'
import tasksService from './services/tasks'
import Logout from './components/Logout'

const store = configureStore({
  reducer: {
    todo: todoReducer,
    login: loginReducer
  }
})
const StyledPage = styled.div`
  display: flex;
  flex-direction: column
`

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function App() {

  //Session information from local storage
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      console.log('retained current session information for:', user.username)
      store.dispatch(setUser(user))
      tasksService.setToken(user.token)
    }
  }, [])

  //user determines if Routes to login page or functional components
  const user = useSelector((state) => state.login.user)
  console.log('App.js | user:', user)
  
  return (
    <StyledPage>
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route index element={<Home />} />
            <Route path='/todo' element={user ? <Todo /> : <Navigate replace to='/login' />} />

            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
          </Route>
        </Routes>
      </Router>
    </StyledPage>
  )
}

export default AppWrapper
