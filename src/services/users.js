import axios from 'axios'

const baseUrl = '/api/users'
// let token = null

// const setToken = (newToken) => {
//   token = `bearer ${newToken}`
// }

const getAll = async () => {
  let response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }