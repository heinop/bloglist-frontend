import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { setUser, removeUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('bloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const buttonStyle = {
    marginLeft: 5,
    marginBottom: 3
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(removeUser())
  }

  const showLoginInfo = () => (
    <p>
      {user.name} logged in
      <button id="logout-button" style={buttonStyle} type="button" onClick={handleLogout}>logout</button>
    </p>
  )

  return (
    <div>
      <h2>Blogs App</h2>
      <Notification />
      {user === null ?
        <LoginForm /> :
        <div>
          {showLoginInfo()}
          <Blogs />
        </div>
      }
    </div>
  )
}

export default App