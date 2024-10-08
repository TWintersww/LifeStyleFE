import axios from "axios";
const baseURL = '/api/journal'

let token = null
const setToken = newToken => {
  if (!newToken) {
    token = null;
    console.log('set journal.js token to NULL')
  }
  else {
    token = `Bearer ${newToken}`
    console.log('set journal.js token:', token)
  }
}

const postNew = async (post) => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  // console.log('journal postNew token:', token)
  const res = await axios.post(baseURL, post, config)
  // return {data: res.data, statusText: res.statusText}
  return res
}

const getAll = async () => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const posts = await axios.get(baseURL, config)
  return posts.data
}

const getOne = async (id) => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const post = await axios.get(`${baseURL}/${id}`, config)
  return post.data
}

const editOne = async (id, post) => {
  const updatedPost = await axios.put(`${baseURL}/${id}`, post)
  // return {data: updatedPost.data, statusText: updatedPost.statusText}
  return updatedPost
}

export default {
  postNew,
  getAll,
  getOne,
  editOne,
  setToken
}
