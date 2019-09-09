

import {api} from '../utils/requestUrl'
import {request, sysParams} from "@/utils/requestMethod";


export async function getJoinBill() {
  const arg = {...sysParams}
  return request(api.join.getBill, arg, 'get')
}

export async function returnMoney(payload) {
  const arg = {...sysParams, ...payload}
  return request(api.join.return, arg, 'get')
}

export async function getMonthBill(payload) {
  const arg = {...sysParams, ...payload}
  return request(api.join.getMonthBill, arg, 'get')
}

