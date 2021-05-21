import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  let response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  let url = `${baseUrl}/${blog.id}`
  delete blog.id
  blog.user = blog.user.id
  const response = await axios.put(url, blog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  let url = `${baseUrl}/${id}`
  const response = await axios.delete(url, config)
  console.log('server response', response)
  return response.data
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token }
  }
  let url = `${baseUrl}/${id}/comments`
  const response = await axios.post(url, { comment }, config)
  console.log('server response', response)
  return response.data
}

export default { getAll, create, update, remove, setToken, addComment }