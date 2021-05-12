import blogService from '../services/blogs'

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
    const newBlog = await blogService.create(blogParams)
    console.log('Created blog', JSON.stringify(newBlog))
    dispatch({
      type: 'ADD_NEW_BLOG',
      data: newBlog
    })
  }
}

export const updateBlog = (blogParams) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blogParams)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        id
      }
    })
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