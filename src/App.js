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
    async function fetchBlogs() {
      let tempBlogs = await blogService.getAll()
      setBlogs(orderBlogs(tempBlogs))
    }
    fetchBlogs()
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

  const orderBlogs = (blogArray) => blogArray.sort((a, b) => b.likes - a.likes)

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
      let newBlog = await blogService.create(blogParams)
      console.log('Created blog', JSON.stringify(newBlog))
      setBlogs(orderBlogs(blogs.concat(newBlog)))
      showMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      console.error('Error creating new blog', exception)
      showErrorMessage('Error adding new blog')
    }
  }

  const updateBlog = async (blogParams) => {
    try {
      let updatedBlog = await blogService.update(blogParams)
      setBlogs(orderBlogs(blogs.map(blog => {
        return blog.id === updatedBlog.id ? updatedBlog : blog
      })))
      showMessage(`Blog ${updatedBlog.title} by ${updatedBlog.author} updated`)
    } catch (exception) {
      console.error('Error updating blog', exception)
      showErrorMessage('Error updating blog')
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        console.log('Deleting blog ' + blog.id)
        await blogService.remove(blog.id)
        setBlogs(orderBlogs(blogs.filter(b => b.id !== blog.id)))
        showMessage(`Blog ${blog.title} by ${blog.author} deleted`)
      } catch (exception) {
        console.error('Error deleting blog', exception)
        showErrorMessage('Error deleting blog')
      }
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
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button style={buttonStyle} type="button" onClick={handleLogout}>logout</button>
      </p>
      {createForm()}
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}
            showRemove={user.username === blog.user.username}
            updateBlog={updateBlog} deleteBlog={deleteBlog} />
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