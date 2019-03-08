import * as service from '../services/index'
import {Toast} from 'antd-mobile'
import sys from "@/utils/request";

export default {
  namespace: 'index',
  state: {},
  reducers: {
    setState(state, action){
      return {...state, ...action}
    }
  },
  effects: {
    *joinIn({payload},{call,put}){
      const{data} = yield call (service.joinIn,payload)
    },

  },

}
