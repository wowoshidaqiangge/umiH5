// import axios from 'axios'
// import sys from '../utils/request'
// import {api} from '../utils/requestUrl'
//
// const sysparams = sys.sysParams
//
// export async function joinIn(payload) {
//   const param = {...payload,...sysparams}
//   // const  param = Object.assign(payload,sysparams)
//   return axios.post(api.join.joinIn,param)
// }

import {api} from '../utils/requestUrl'
import{request,sysParams}  from '../utils/requestMethod'

export async function joinIn(payload) {
  const arg = {...sysParams,...payload}
  return request(api.join.joinIn,arg,'get')
}
