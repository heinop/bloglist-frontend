export const showNotification = (message, type) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        type
      }
    })
    setTimeout(() => dispatch({
      type: 'CLEAR_NOTIFICATION'
    }), 5000)
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

export default notificationReducer