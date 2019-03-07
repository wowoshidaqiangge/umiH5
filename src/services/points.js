import axios from 'axios'
import sys from '../utils/request'

const params = sys.sysParams
const api = sys.api

export  async  function getIntegralGoodsList(){
  const arg = {...params}
  return axios.post(api.points.getIntegralGoodsList,arg)
}

export  async  function giveIntegral(){
  const arg = {...params}
  return axios.post(api.points.giveIntegral,arg)
}
