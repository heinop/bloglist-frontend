import React from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <div id="blogs">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default Blogs