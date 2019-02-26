import axios from 'axios'

export async function returnMoney(payload) {
  return axios.post('addJoiner', payload)
}
