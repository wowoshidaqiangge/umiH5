import * as service from '../services/points'
import sys from '../utils/request'

export default {
  namespace: 'points',
  state: {
    user:[],         //用户信息列表
    goodsList:[],    //商品信息列表
    modalVisible:false,  //展示弹窗是否可见
    integral:'',          //获赠的积分
    curPage:'',           //当前页数
    allPage:'',           //总页数
  },

  reducers: {
    setState(state, action) {
      return {...state, ...action.payload}
    },
  },

  effects: {
    *getIntegralGoodsList({payload},{call,put,select}){
      const {data} = yield call (service.getIntegralGoodsList,payload)
      if(data.code === '1'){
        const {goodsList} = yield select(state=>state.points)
        const newDataList = goodsList.concat(data.data.goods_list)
        yield put({type:'setState',payload:{user:data.data.user,goodsList: newDataList,curPage: data.data.cur_page,allPage: data.data.all_page}})
      }
      sys.responseCode(data)
    },

    *giveIntegral({},{call,put}){
      const {data} = yield call (service.giveIntegral)
      if(data.code === '1'){
        yield put({type:'setState',payload:{integral: data.data.integral,}})
        data.data.Popup === '1'?  yield put({type:'setState',payload:{modalVisible: true,}}): void[0]
      }
      sys.responseCode(data)
    }


  }
}
