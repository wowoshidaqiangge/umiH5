import axios from 'axios'
import sys from '../utils/request'
import {api} from '../utils/requestUrl'

const sysParams = sys.sysParams

export async function getJoinIn() {
  return axios.post(api.join.getJoinIn, sysParams)
}

