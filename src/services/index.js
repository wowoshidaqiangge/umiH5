import axios from 'axios'
import sys from '../utils/request'

const sysparams = sys.sysParams
const api = sys.api

export async function joinIn(payload) {
  const param = {...payload,...sysparams}
  // const  param = Object.assign(payload,sysparams)
  return axios.post(api.join.joinIn,param)
}
