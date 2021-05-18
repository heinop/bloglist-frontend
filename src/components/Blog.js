import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { updateBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const user = useSelector(state => state.user)

  const buttonStyle = {
    marginLeft: 5,
    marginBottom: 3
  }

  const addLike = (event) => {
    event.preventDefault()

    dispatch(updateBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }))
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  const removeButton = (
    <button id="remove-button" style={buttonStyle} onClick={removeBlog}>remove</button>
  )

  if (!blog) {
    return null
  }

  return (
    <div>
      <h3>{blog.title} {blog.author}</h3>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button id="like-button" style={buttonStyle} onClick={addLike}>like</button>
      </div>
      <div>
        added by {blog.user.name} {user.username === blog.user.username ? removeButton : ''}
      </div>
    </div>
  )
}

export default Blog
