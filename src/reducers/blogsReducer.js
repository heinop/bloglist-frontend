export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const addNewBlog = (newBlog) => {
  return {
    type: 'ADD_NEW_BLOG',
    data: newBlog
  }
}

export const updateBlog = (updatedBlog) => {
  return {
    type: 'UPDATE_BLOG',
    data: updatedBlog
  }
}

export const deleteBlog = (id) => {
  return {
    type: 'DELETE_BLOG',
    data: {
      id
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