import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CreateForm from './CreateForm'
import Togglable from './Togglable'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  const createFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h3>Blogs</h3>
      <Togglable buttonLabel="create new" ref={createFormRef}>
        <CreateForm formRef={createFormRef} />
      </Togglable>
      <div id="blogs">
        {blogs.map(blog =>
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blogs