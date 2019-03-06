import * as service from '../services/new'
import sys from '../utils/request'

export default {
  namespace: 'dayNew',
  state: {
    tabs: [],       //时间选择标签
    newId: null,     //默认选中的天数
    page: null,      //设置默认的展示页
    goodsList:[],     //对应时间下上新的产品

  },

  reducers: {
    setState(state, action) {
      return {...state, ...action.payload}
    },
    setNewId(newId){
      return newId;
    }
  },

  effects: {
    * getDayNew({callback}, {call, put}) {
      const {data} = yield call(service.getDayNew)
      let page = null
      if (data.code === 1) {
        let id = null
        const tabs = data.data.list
        tabs.map((item, index) => {
          if (item.check === 1) {
            id = item.new_id
            page = index
            return id, page
          }
        });
        yield put({type: 'setState', payload: {tabs: tabs, newId: id, page: page}})
        if (callback && typeof callback === 'function') {
          callback()
        }
      }
      sys.responseCode(data)
    },

    * getDayGoodList({payload}, {call, put}) {
      const {data} = yield call(service.getDayGoodList, payload)
      if(data.code === 1){
        yield put ({type:'setState',payload: {goodsList: data.data.list}})
      }
    },

    *changePage({payload,callback},{call,put}){
      console.log('pppp',payload.newId);
      yield put ({type:'setState',payload:{newId:payload.newId,page:payload.page}});
      // console.log('shezhiwancheng ')
      if (callback && typeof callback === 'function') {
        console.log('callback ')
        callback()
      }
    },
    *updateGoodsList({payload}, {call, put}) {
      console.log('pppp',payload);
      const {data} = yield call(service.getDayGoodList, payload)
      if(data.code === 1){
        yield put ({type:'setState',payload: {goodsList: data.data.list}})
      }
    },
  }
}
