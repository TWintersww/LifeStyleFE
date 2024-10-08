import Body from './components/Body'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
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
import journalService from './services/journal'
import Logout from './components/Logout'

import JournalContainer from './components/JournalContainer'
import JournalHome from './components/journal/JournalHome'
import CreatePost from './components/journal/CreatePost'
import EditPost from './components/journal/EditPost'
import PostFull from './components/journal/PostFull'

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

  const [loading, setLoading] = useState(true)

  //Session information from local storage
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      console.log('retained current session information for:', user.username)
      store.dispatch(setUser(user))
      tasksService.setToken(user.token)
      journalService.setToken(user.token)
    }
    setLoading(false)
  }, [])

  //user determines if Routes to login page or functional components
  const user = useSelector((state) => state.login.user)
  console.log('App.js | user:', user)

  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <StyledPage>
      <Router>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route index element={<Home />} />
            <Route path='/todo' element={user ? <Todo /> : <Navigate replace to='/login' />} />
            <Route path='/journal' element={user ? <JournalContainer /> : <Navigate replace to='/login' />} >
              <Route index element={<JournalHome />} />
              <Route path='create' element={<CreatePost />} />
              <Route path='edit/:id' element={<EditPost />} />
              <Route path='view/:id' element={<PostFull />} />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
          </Route>
        </Routes>
      </Router>
    </StyledPage>
  )
}

export default AppWrapper
