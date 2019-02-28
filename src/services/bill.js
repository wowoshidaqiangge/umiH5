import axios from 'axios'
import sys from '../utils/request'

export async function getJoinBill() {
  const obj = Object.assign(sys.sysParams);
  return axios.post(sys.api.join.getBill,obj)
}

export async function returnMoney(payload) {
  const obj = Object.assign(sys.sysParams);
  return axios.post(sys.api.join.return, obj)
}

export async function getMonthBill(payload){
  const obj = Object.assign(sys.sysParams,payload)
  return axios.post (sys.api.join.getMonthBill,obj)
}


