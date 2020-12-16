import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ handleCreate }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const buttonStyle = {
    marginLeft: 5,
    marginBottom: 3
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    handleCreate({
      title,
      author,
      url
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
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
        <button style={buttonStyle} type="submit">create</button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  handleCreate: PropTypes.func.isRequired
}

export default CreateForm
