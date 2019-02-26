import axios from 'axios'

export async function addJoiner(payload) {
  return axios.post('addJoiner', payload)
}
