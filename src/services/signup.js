import axios from "axios";
const baseURL = 'api/users'

const handleSignup = async (fields) => {
  const res = await axios.post(baseURL, fields)
  console.log(res)
  return res
}


export default {
  handleSignup
}
