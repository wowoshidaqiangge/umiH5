import axios from 'axios'
import sys from '../utils/request'
import {api} from '../utils/requestUrl'
import {request} from "@/utils/requestMethod";

const params = sys.sysParams


export async function activityList(payload) {
  const arg = {...params, ...payload}
  // return axios.post(api.shop.activityList, arg)
  return request(api.shop.activityList,arg,'post')
}
