import {api} from '../utils/requestUrl'
import {getToken, request, sysParams} from "@/utils/requestMethod";

export async function activityList(payload) {
  const arg = {...sysParams, ...payload}
  let token = getToken()
  alert(token !== undefined)
  // if (token !== undefined) {
    return request(api.shop.activityList, arg, 'post', token)
  // }

}
