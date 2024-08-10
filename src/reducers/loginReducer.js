import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import tasksService from '../services/tasks'

export const handleLogin = (credentials) => {
  return async dispatch => {
    const loggedInUser = await loginService.login(credentials)
    console.log('loginReducer.js | loggedInUser:', loggedInUser)
    window.localStorage.setItem(
      'loggedInUser', JSON.stringify(loggedInUser)
    )
    tasksService.setToken(loggedInUser.token)
    dispatch(setUser(loggedInUser))
  }
}

export const handleLogout = () => {
  return dispatch => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedInUser')
    tasksService.setToken(null)
  }
}

export const handleLogoutWithNavigate = (navigate) => {
  return dispatch => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedInUser')

    navigate('/login')

    dispatch(handleErrorMsgToggle('Session expired. Please login again'))
  }
}

export const handleErrorMsgToggle = (errorMsg) => {
  return dispatch => {
    dispatch(setErrorMsg(errorMsg))
    setTimeout(() => {
      dispatch(setErrorMsg(null))
    }, 3000)
  }
}

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    loginTime: null,
    errorMsg: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setErrorMsg(state, action) {
      state.errorMsg = action.payload
    }
  }
})

export const {
  setUser,
  setErrorMsg,
} = loginSlice.actions
export default loginSlice.reducer
