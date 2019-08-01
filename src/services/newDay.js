import{request,sysParams}  from '../utils/requestMethod'
import {api} from '../utils/requestUrl'

export async function newList(payload) {
  console.log('aaaa2')
  const arg = {...sysParams, ...payload}
  // return axios.post(api.shop.newList, arg)
  return request(api.shop.newList,arg,'post')
}

export async function newGoods(payload) {

  const arg = {...sysParams, ...payload}
  // return axios.post(api.shop.newGoods,arg)
  return request(api.shop.newGoods,arg,'post')

}
