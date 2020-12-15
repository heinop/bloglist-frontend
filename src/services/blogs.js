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

export default { getAll, create, update, setToken }