import axios from 'axios'
import sys from '../utils/request'

const params = sys.sysParams
const dayNew = sys.api.dayNew

export async function getDayNew(){
  const arg = {...params}
  return axios.post(dayNew.dayNew,arg)
}

export async function  getDayGoodList(payload) {
  const arg = {...params,...payload}
  console.log('arg',arg)
  return axios.post(dayNew.dayGoodList,arg)
}
