import axios from 'axios'
import sys from '../utils/request'
import {api} from '../utils/requestUrl'

const params = sys.sysParams


export async function getDayNew(){
  const arg = {...params}
  return axios.post(api.dayNew.dayNew,arg)
}

export async function  getDayGoodList(payload) {
  const arg = {...params,...payload}
  return axios.post(api.dayNew.dayGoodList,arg)
}
