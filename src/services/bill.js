// import axios from 'axios'
// import sys from '../utils/request'
// import {api} from '../utils/requestUrl'

import {api} from '../utils/requestUrl'
import{request,sysParams}  from '../utils/requestMethod'

export async function getJoinBill() {
  const arg = {...sysParams}
  return request(api.join.getBill,arg,'get')
  // return axios.post(api.join.getBill,obj)
}

export async function returnMoney(payload) {
  const arg = {...sysParams,...payload}
  // return axios.post(api.join.return, obj)
  return request(api.join.return,arg,'get')
}

export async function getMonthBill(payload){
  const arg = {...sysParams,...payload}
  return request(api.join.getMonthBill,arg,'get')
  // return axios.post (api.join.getMonthBill,obj)
}

