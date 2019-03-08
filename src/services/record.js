import axios from 'axios'
import sys from '../utils/request'

const params = sys.sysParams
const api = sys.api
export  async  function getIntegralLog(payload){
  const arg = {...params,...payload }
  return axios.post(api.points.getIntegralLog,arg)

}
