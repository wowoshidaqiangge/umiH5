import * as service from '../services/new'
import sys from '../utils/request'

export default {
  namespace: 'dayNew',
  state: {
    tabs: [],       //时间选择标签
    newId: null,     //默认选中的天数
    showPage: null,      //设置默认的展示页
    goodsList:[],     //对应时间下上新的产品
    page:1,           //默认查询商品的第一页
    allPage: null,    //所有商品页数
    curPage:null,       //当前页面
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
      let showPage = null
      if (data.code === 1) {
        let id = null
        const tabs = data.data.list
        tabs.map((item, index) => {
          if (item.check === 1) {
            id = item.new_id
            showPage = index
            return id, showPage
          }
        });
        yield put({type: 'setState', payload: {tabs: tabs, newId: id, showPage: showPage}})
        if (callback && typeof callback === 'function') {
          callback()
        }
      }
      sys.responseCode(data)
    },

    * getDayGoodList({payload}, {call, put}) {
      const {data} = yield call(service.getDayGoodList, payload)
      if(data.code === 1){
        yield put ({type:'setState',payload: {goodsList: data.data.list,allPage:data.data.all_page,curPage: data.data.cur_page}})
      }
    },

    *changePage({payload,callback},{call,put}){
      yield put ({type:'setState',payload:{newId:payload.newId,showPage:payload.page}});
    },

    *updateGoodsList({payload}, {call, put}) {
      const {data} = yield call(service.getDayGoodList, payload)
      if(data.code === 1){
        // console.log(data.data.all_page,data.data.cur_page,'zzzzzz')
        yield put ({type:'setState',payload: {goodsList: data.data.list,allPage:data.data.all_page,curPage:data.data.cur_page}})
      }
    },

    *loadMore({payload}, {call, put,select}) {
      const {data} = yield call(service.getDayGoodList, payload)
      if(data.code === 1){
        const{goodsList} = yield select(state=>state.dayNew)
        const newGoodsList = goodsList.concat(data.data.list)
        yield put ({type:'setState',payload: {goodsList:newGoodsList }})
      }
    },
  }
}
