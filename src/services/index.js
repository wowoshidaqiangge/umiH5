import axios from 'axios'
import sys from '../utils/request'

const sysparams = sys.sysParams
const api = sys.api

export async function joinIn(payload) {
  const param = Object.assign(sysparams,payload)
  console.log('jiaru的service',sysparams,api.join.joinIn)
  return axios.post(api.join.joinIn,param)
}
