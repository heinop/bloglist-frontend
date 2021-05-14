import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

import CreateForm from './CreateForm'
import Togglable from './Togglable'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  const createFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={createFormRef}>
        <CreateForm formRef={createFormRef} />
      </Togglable>
      <div id="blogs">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default Blogs