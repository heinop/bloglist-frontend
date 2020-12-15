import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
    event.preventDefault();

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
      let newBlog = await blogService.create(blogParams)
      setBlogs(blogs.concat(newBlog))
      showMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      console.error('Error creating new blog', exception)
      showErrorMessage('Error adding new blog')
    }
  }

  const showMessage = (message) => {
    setNotification({
      message: message,
      type: 'info'
    })
    setTimeout(() => setNotification(null), 5000)
  }

  const showErrorMessage = (message) => {
    setNotification({
      message: message,
      type: 'error'
    })
    setTimeout(() => setNotification(null), 5000)
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <p>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </p>
        <p>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </p>
        <button style={buttonStyle} type="submit">login</button>
      </form>
    </div>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button style={buttonStyle} type="button" onClick={handleLogout}>logout</button>
      </p>
      {createForm()}
      <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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