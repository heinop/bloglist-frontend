import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { setUser, removeUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch((initializeUsers()))
  },[dispatch])

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

  const padding = {
    padding: 5
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
          <Router>
            {showLoginInfo()}
            <div>
              <Link style={padding} to="/blogs">blogs</Link>
              <Link style={padding} to="/users">users</Link>
            </div>
            <Switch>
              <Route path="/blogs">
                <Blogs />
              </Route>
              <Route path="/users/:id">
                <User />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <Blogs />
              </Route>
            </Switch>
          </Router>
        </div>
      }
    </div>
  )
}

export default App