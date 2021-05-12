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

const orderBlogs = (blogArray) => blogArray.sort((a, b) => b.likes - a.likes)

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return orderBlogs(action.data)
  case 'ADD_NEW_BLOG':
    return orderBlogs(state.concat(action.data))
  default:
    return state
  }
}

export default blogsReducer