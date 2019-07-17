import axios from 'axios'
import sys from '../utils/request'
import {api} from '../utils/requestUrl'

const params = sys.sysParams


export async function newList(payload) {
  const arg = {...params, ...payload}
  return axios.post(api.shop.newList, arg)
}

export async function newGoods(payload) {
  const arg = {...params, ...payload}
  return axios.post(api.shop.newGoods,arg)

}
