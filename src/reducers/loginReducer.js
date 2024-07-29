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

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    loginTime: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    }
  }
})

export const {
  setUser
} = loginSlice.actions
export default loginSlice.reducer
