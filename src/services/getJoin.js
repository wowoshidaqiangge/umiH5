import {api} from '../utils/requestUrl'
import {request, sysParams} from "@/utils/requestMethod";

export async function getJoinIn() {
  const arg = {...sysParams}
  return request(api.join.getJoinIn,arg,'get')
}
