import {api} from '../utils/requestUrl'
import {request, sysParams} from "@/utils/requestMethod";

export async function activityList(payload) {
  const arg = {...sysParams, ...payload}
  return request(api.shop.activityList, arg, 'post')

}
