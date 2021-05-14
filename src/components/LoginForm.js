import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './Notification'
import { setUsername, setPassword } from '../reducers/loginReducer'
import { loginUser } from '../reducers/loginReducer'

const buttonStyle = {
  marginLeft: 5,
  marginBottom: 3
}

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.login.username)
  const password = useSelector(state => state.login.password)

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleSubmit}>
        <p>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </p>
        <p>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </p>
        <button id="login-button" style={buttonStyle} type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm