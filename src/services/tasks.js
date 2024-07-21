import axios from 'axios'
const baseURL = 'http://localhost:3001/tasks'

const getAll = async () => {
  const response = await axios.get(baseURL)
  // console.log('getAll response:', response)
  return response.data
}

const postNew = async (newTask) => {
  const response = await axios.post(baseURL, newTask)
  // console.log('postNew response:', response)
  return response.data
}

const deleteOne = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`)
  // console.log('deleteOne response:', response)
  return response.data
}

const editOne = async (editedTask) => {
  const id = editedTask.id
  const response = await axios.put(`${baseURL}/${id}`, editedTask)
  // console.log('editOne response:', response)
  return response.data
}

export default { getAll, postNew, deleteOne, editOne }
