import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  console.log('User ID:', id)
  const user = useSelector(state => state.users.find(user => user.id === id))
  console.log('User:', user)

  if (!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      {<ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>}
    </div>
  )
}

export default User