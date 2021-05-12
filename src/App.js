import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, addNewBlog, updateBlog, deleteBlog } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('bloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const buttonStyle = {
    marginLeft: 5,
    marginBottom: 3
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('bloglistAppUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('Error in login', exception)
      showErrorMessage('wrong username or password')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('bloglistAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async (blogParams) => {
    try {
      createFormRef.current.toggleVisibility()
      dispatch(addNewBlog(blogParams))
      showMessage(`a new blog ${blogParams.title} by ${blogParams.author} added`)
    } catch (exception) {
      console.error('Error creating new blog', exception)
      showErrorMessage('Error adding new blog')
    }
  }

  const updateExistingBlog = async (blogParams) => {
    try {
      dispatch(updateBlog(blogParams))
      showMessage(`Blog ${blogParams.title} by ${blogParams.author} updated`)
    } catch (exception) {
      console.error('Error updating blog', exception)
      showErrorMessage('Error updating blog')
    }
  }

  const deleteExistingBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        console.log('Deleting blog ' + blog.id)
        dispatch(deleteBlog(blog.id))
        showMessage(`Blog ${blog.title} by ${blog.author} deleted`)
      } catch (exception) {
        console.error('Error deleting blog', exception)
        showErrorMessage('Error deleting blog')
      }
    }
  }

  const showMessage = (message) => {
    dispatch(showNotification(message, 'info'))
  }

  const showErrorMessage = (message) => {
    dispatch(showNotification(message, 'error'))
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <p>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </p>
        <p>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </p>
        <button id="login-button" style={buttonStyle} type="submit">login</button>
      </form>
    </div>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button id="logout-button" style={buttonStyle} type="button" onClick={handleLogout}>logout</button>
      </p>
      {createForm()}
      <div id="blogs">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}
            showRemove={user.username === blog.user.username}
            updateBlog={updateExistingBlog} deleteBlog={deleteExistingBlog} />
        )}
      </div>
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
        loginForm() :
        showBlogs()
      }
    </div>
  )
}

export default App