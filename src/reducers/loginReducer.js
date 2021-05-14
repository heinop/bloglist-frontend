import loginService from '../services/login'
import { showNotification } from './notificationReducer'
import { setUser } from './userReducer'

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      dispatch(setUser(user))
    } catch (exception) {
      console.error('Error in login', exception)
      dispatch(showNotification('wrong username or password', 'error'))
    }
  }
}

export const setUsername = (username) => {
  return dispatch => {
    dispatch({
      type: 'SET_USERNAME',
      data: username
    })
  }
}

export const setPassword = (password) => {
  return dispatch => {
    dispatch({
      type: 'SET_PASSWORD',
      data: password
    })
  }
}

const loginReducer = (state = { username: '', password: '' }, action) => {
  switch (action.type) {
  case 'SET_USERNAME':
    return { ...state, username: action.data }
  case 'SET_PASSWORD':
    return { ...state, password: action.data }
  default:
    return state
  }
}

export default loginReducer