import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (blog) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('user')}` },
  }

  const request = axios.post(baseUrl, blog, config)
  return request.then((response) => response.data)
}

const update = (id, blog) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('user')}` },
  }
  const request = axios.post(`${baseUrl}/${id}`, blog, config)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('user')}` },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default { getAll, create, update, remove }
