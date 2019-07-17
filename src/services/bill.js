import axios from 'axios'
import sys from '../utils/request'
import {api} from '../utils/requestUrl'

export async function getJoinBill() {
  const obj = {...sys.sysParams}
  return axios.post(api.join.getBill,obj)
}

export async function returnMoney(payload) {
  const obj = {...sys.sysParams}
  return axios.post(api.join.return, obj)
}

export async function getMonthBill(payload){
  const obj = {...sys.sysParams,...payload}
  return axios.post (api.join.getMonthBill,obj)
}


