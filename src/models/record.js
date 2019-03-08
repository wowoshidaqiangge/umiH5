import * as service from '../services/record'
import sys from '../utils/request'

export default {
  namespace: 'record',
  state: {
    dataList:[],     //积分页面的值
    curPage:'',        //当前的页数
    allPage:null,    //总页数
    allCount:null,    //总条数

  },

  reducers: {
    setState(state, action) {
      return {...state, ...action.payload}
    },
  },

  effects: {
    *getIntegralLog({payload},{call,put,select}){
      const {data} = yield call(service.getIntegralLog,payload)
      if( data.code === '1'){
        const{dataList} = yield select(state=>state.record)
        const newDataList = dataList.concat(data.data.list)
        yield put({type:'setState',payload:{dataList:newDataList,curPage:data.data.cur_page,allPage:data.data.all_page,allCount:data.data.all_count}})
      }
      sys.responseCode(data)
    }
  },

  // subscriptions: {
  //   setup({dispatch, history}) {
  //     return history.listen(({pathname}) => {
  //       if (pathname === '/pointsRecord') {
  //         dispatch({type: 'getIntegralLog'})
  //       }
  //     })
  //   },
  // },
}
