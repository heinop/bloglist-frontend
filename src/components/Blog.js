import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { updateBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const removeButton = (
    <div>
      <button id="remove-button" style={buttonStyle} onClick={removeBlog}>remove</button>
    </div>
  )

  const blogDetails = (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button id="like-button" style={buttonStyle} onClick={addLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {user.username === blog.user.username ? removeButton : ''}
    </div>
  )

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button id="toggle-details" style={buttonStyle} onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {showDetails ? blogDetails : ''}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
