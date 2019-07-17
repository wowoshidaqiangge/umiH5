import axios from 'axios'
import sys from '../utils/request'
import {api} from '../utils/requestUrl'

const params = sys.sysParams

export  async  function getIntegralGoodsList(payload){
  const arg = {...params,...payload}
  return axios.post(api.points.getIntegralGoodsList,arg)
}

export  async  function giveIntegral(){
  const arg = {...params}
  return axios.post(api.points.giveIntegral,arg)
}
