import React, { useState } from 'react'
const Blog = ({ blog, updateBlog }) => {

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
    
    updateBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    })
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogDetails = (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} 
        <button style={buttonStyle} onClick={addLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
    </div>
  )

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button style={buttonStyle} onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {showDetails ? blogDetails : ''}
    </div>
  )
}

export default Blog
