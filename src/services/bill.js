import axios from 'axios'
import sys from '../utils/request'

export async function getJoinBill() {
  const obj = {...sys.sysParams}
  return axios.post(sys.api.join.getBill,obj)
}

export async function returnMoney(payload) {
  const obj = {...sys.sysParams}
  return axios.post(sys.api.join.return, obj)
}

export async function getMonthBill(payload){
  const obj = {...sys.sysParams,...payload}
  return axios.post (sys.api.join.getMonthBill,obj)
}


