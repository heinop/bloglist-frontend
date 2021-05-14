import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateForm from './components/CreateForm'
import { setUser, removeUser } from './reducers/userReducer'
import { initializeBlogs, addNewBlog } from './reducers/blogsReducer'

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

  const addBlog = async (blogParams) => {
    createFormRef.current.toggleVisibility()
    dispatch(addNewBlog(blogParams))
  }

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button id="logout-button" style={buttonStyle} type="button" onClick={handleLogout}>logout</button>
      </p>
      {createForm()}
      <Blogs />
    </div>
  )

  const createFormRef = useRef()

  const createForm = () => (
    <Togglable buttonLabel="new blog" ref={createFormRef}>
      <CreateForm handleCreate={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {user === null ?
        <LoginForm /> :
        showBlogs()
      }
    </div>
  )
}

export default App