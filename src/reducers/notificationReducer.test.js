import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('return new state with action SET_NOTIFICATION', () => {
    const state = {}
    const action = {
      type: 'SET_NOTIFICATION',
      data: {
        type: 'info',
        message: 'unit test message'
      }
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toBe(action.data)
  })

  test('return null with action CLEAR_NOTIFICATION', () => {
    const state = {
      type: 'info',
      message: 'unit test message'
    }
    const action = {
      type: 'CLEAR_NOTIFICATION'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toBeNull()
  })
})