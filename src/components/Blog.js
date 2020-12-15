import React, { useState } from 'react'
const Blog = ({ blog }) => {

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

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogDetails = (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} 
        <button style={buttonStyle}>like</button>
      </div>
      <div>{blog.user ? blog.user.name : ''}</div>
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
