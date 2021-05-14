import blogService from '../services/blogs'

export const setUser = (user) => {
  return dispatch => {
    window.localStorage.setItem('bloglistAppUser', JSON.stringify(user))
    dispatch({
      type: 'SET_USER',
      data: user
    })
    blogService.setToken(user.token)
  }
}

export const removeUser = () => {
  return dispatch => {
    window.localStorage.removeItem('bloglistAppUser')
    dispatch({
      type: 'REMOVE_USER'
    })
    blogService.setToken(null)
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'REMOVE_USER':
    return null
  default:
    return state
  }
}

export default userReducer