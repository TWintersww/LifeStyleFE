import axios from 'axios'
// const baseURL = 'http://localhost:3001/api/tasks'
const baseURL = 'api/tasks'

let token = null
const setToken = newToken => {
  if (!newToken) {
    token = null;
    console.log('set tasks.js token to NULL')
  }
  else {
    token = `Bearer ${newToken}`
    console.log('set tasks.js token:', token)
  }
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseURL, config)
  // console.log('getAll response:', response)
  return response.data
}

const postNew = async (newTask) => {
  //make use of new token object
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseURL, newTask, config)
  // console.log('postNew response:', response)
  return response.data
}

const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseURL}/${id}`, config)
  console.log('deleteOne response:', response)
  return response.data
}

const editOne = async (editedTask) => {
  const id = editedTask.id
  const response = await axios.put(`${baseURL}/${id}`, editedTask)
  console.log('editOne response:', response)
  return response.data
}

export default { getAll, postNew, deleteOne, editOne, setToken }
