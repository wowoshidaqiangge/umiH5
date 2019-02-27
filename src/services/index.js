import axios from 'axios'
import sys from '../utils/request'

const sysparams = sys.sysParams

export async function joinIn(payload) {
  const param = Object.assign(sysparams,payload)
  return axios.post(sysparams.api.join.joinIn,payload)
}
