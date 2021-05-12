import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addNewBlog = (blogParams) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogParams)
      console.log('Created blog', JSON.stringify(newBlog))
      dispatch(showNotification(`a new blog ${blogParams.title} by ${blogParams.author} added`, 'info'))
      dispatch({
        type: 'ADD_NEW_BLOG',
        data: newBlog
      })
    } catch (exception) {
      console.error('Error creating new blog', exception)
      dispatch(showNotification('Error adding new blog', 'error'))
    }
  }
}

export const updateBlog = (blogParams) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(blogParams)
      dispatch(showNotification(`Blog ${blogParams.title} by ${blogParams.author} updated`, 'info'))
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })
    } catch (exception) {
      console.error('Error updating blog', exception)
      dispatch(showNotification('Error updating blog', 'error'))
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      console.log('Deleting blog ' + blog.id)
      await blogService.remove(blog.id)
      dispatch(showNotification(`Blog ${blog.title} by ${blog.author} deleted`))
      dispatch({
        type: 'DELETE_BLOG',
        data: {
          id: blog.id
        }
      })
    } catch (exception) {
      console.error('Error deleting blog', exception)
      dispatch(showNotification('Error deleting blog', 'error'))
    }
  }
}

const orderBlogs = (blogArray) => blogArray.sort((a, b) => b.likes - a.likes)

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return orderBlogs(action.data)
  case 'ADD_NEW_BLOG':
    return orderBlogs(state.concat(action.data))
  case 'UPDATE_BLOG':
    return orderBlogs(
      state.map(blog => blog.id === action.data.id ? action.data : blog)
    )
  case 'DELETE_BLOG':
    return orderBlogs(
      state.filter(blog => blog.id !== action.data.id)
    )
  default:
    return state
  }
}

export default blogsReducer