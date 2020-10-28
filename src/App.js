import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      let newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
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
        <button type="submit">login</button>
      </form>
    </div>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button type="button" onClick={handleLogout}>logout</button>
      </p>
      {createForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const createForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title: 
          <input type="text" value={title} name="Title" 
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: 
          <input type="text" value={author} name="Author" 
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: 
          <input type="text" value={url} name="Url" 
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
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