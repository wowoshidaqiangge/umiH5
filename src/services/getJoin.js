import axios from 'axios'
import sys from '../utils/request'

const sysParams = sys.sysParams

export async function getJoinIn() {
  // return axios.post(sys.api.join.getJoinIn, sysParams)
  return axios.post(sys.api.join.getJoinIn)
}

