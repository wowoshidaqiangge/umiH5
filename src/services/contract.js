import axios from 'axios'

export async function returnMoney(payload) {
  console.log('00000',payload)
  return axios.post('https://testnp.napin.com/api/shop/applyReturn', payload)
}

