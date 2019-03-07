import * as service from '../services/points'
import sys from '../utils/request'

export default {
  namespace: 'points',
  state: {
    user:[],         //用户信息列表
    goodsList:[],    //商品信息列表
    modalVisible:false,  //展示弹窗是否可见

  },

  reducers: {
    setState(state, action) {
      return {...state, ...action.payload}
    },
  },

  effects: {
    *getIntegralGoodsList({},{call,put}){
      const {data} = yield call (service.getIntegralGoodsList)
      if(data.code === '1'){
        yield put({type:'setState',payload:{user:data.data.user,goodsList: data.data.goods_list}})
      }
      sys.responseCode(data)
    },

    *giveIntegral({},{call,put}){
      const {data} = yield call (service.giveIntegral)
      console.log('code',data.code,data.code === '1')
      if(data.code === '1'){

        yield put({type:'setState',payload:{modalVisible: true}})
      }
      sys.responseCode(data)
    }


  }
}
