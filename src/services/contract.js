// import axios from 'axios'
// import sys from '../utils/request'
// import {api} from '../utils/requestUrl'
//
// const sysParams = sys.sysParams
//
// export async function getJoinIn() {
//   return axios.post(api.join.getJoinIn, sysParams)
// }

import {api} from '../utils/requestUrl'
import{request,sysParams}  from '../utils/requestMethod'

export async function getJoinIn() {
  const arg = {...sysParams}
  return request(api.join.getJoinIn,arg,'get')
}
