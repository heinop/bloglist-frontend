import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('bloglistAppUser', JSON.stringify(user))
      dispatch({
        type: 'LOGIN',
        data: user
      })
      blogService.setToken(user.token)
    } catch (exception) {
      console.error('Error in login', exception)
      dispatch(showNotification('wrong username or password', 'error'))
    }
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
    blogService.setToken(user.token)
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('bloglistAppUser')
    dispatch({
      type: 'LOGOUT'
    })
    blogService.setToken(null)
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export default userReducer