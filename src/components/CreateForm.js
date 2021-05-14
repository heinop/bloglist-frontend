import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { addNewBlog } from '../reducers/blogsReducer'

const CreateForm = ({ formRef }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const buttonStyle = {
    marginLeft: 5,
    marginBottom: 3
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    formRef.current.toggleVisibility()
    dispatch(addNewBlog({
      title,
      author,
      url
    }))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input id="title" type="text" value={title} name="Title"
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input id="author" type="text" value={author} name="Author"
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input id="url" type="text" value={url} name="Url"
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id="create-button" style={buttonStyle} type="submit">create</button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  formRef: PropTypes.object.isRequired
}

export default CreateForm
