import axios from 'axios'
import sys from '../utils/request'
import {api} from '../utils/requestUrl'

const params = sys.sysParams

export  async  function getIntegralLog(payload){
  const arg = {...params,...payload }
  return axios.post(api.points.getIntegralLog,arg)

}
