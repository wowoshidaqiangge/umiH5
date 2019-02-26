import axios from 'axios'
import sys from '../utils/request'
export async function returnMoney(payload) {
  return axios.post(sys.api.join.return, payload)
}

export async function getJoinBill(param) {
  const obj = Object.assign(sys.sysParams,param);
  return axios.post(sys.api.join.getBill,obj)
}

