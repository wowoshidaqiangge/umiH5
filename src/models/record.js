import * as service from '../services/record'
import sys from '../utils/request'

export default {
  namespace: 'record',
  state: {
    dataList:[],     //积分页面的值
  },

  reducers: {
    setState(state, action) {
      return {...state, ...action.payload}
    },
  },

  effects: {
    *getIntegralLog({},{call,put}){
      const {data} = yield call(service.getIntegralLog)
      if( data.code === '1'){
        yield put({type:'setState',payload:{dataList:data.data.list}})
      }
      sys.responseCode(data)
    }
  }
}
