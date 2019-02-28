import * as service from '../services/bill'
import {Toast} from 'antd-mobile'
import sys from '../utils/request'

export default {
  namespace: 'bill',
  state: {
    costData:[],
    joinMoney:'',
    allData:'',   //总消费分析
    monthData:'',  //月消费分析
    dayConsume:'',  //年份
    nextMonth:'',   //月份
    yearValue:'',   //默认的年的值
    monthValue:[],  //默认的月份值
    returnInfo:'',  //退款信息
    // data:[],
  },
  reducers: {
    setState(state, action){
      return {...state, ...action.payload}
    }
  },
  effects: {
    *getJoinBill({},{call,put}){
      const {data} = yield call(service.getJoinBill)
      if(data.code === 1){
        yield put({type: 'setState', payload: {costData: data.data.get_month,
            joinMoney:data.data.return_info.join_money,
            allData:data.data.all_data,
            monthData: data.data.month_data,
            dayConsume:data.data.day_consume,
            nextMonth:data.data.next_month,
            yearValue: data.data.day_consume[0],
            monthValue: data.data.next_month[0],
            returnInfo: data.data.return_info
          }})
      }
      sys.responseCode(data)
    },

    *returnMoney({payload}, {call, put}){
      const {data} = yield call(service.returnMoney, payload)
      if(data.code === 1){
        Toast.success(data.message,3)
      }
      sys.responseCode(data)
    },

    *setYearValue({payload},{call,put}){
      yield put ({type:'setState',payload:{yearValue:payload}})
    },

    *setMonthValue({payload},{call,put}){
      yield  put ({type:'setState',payload:{monthValue:payload}})
    },

    *getMonthBill({payload},{call,put}){
      const {data} = yield call (service.getMonthBill,payload)
      if(data.code === 1){
        yield put({type: 'setState', payload: {costData: data.data}})
      }
      sys.responseCode(data)
    }

  },
  subscriptions: {
    // setup({dispatch, history}) {
    //   return history.listen(({pathname}) => {
    //     if (pathname === '/themeConfig') {
    //       dispatch({type: 'loadData'})
    //     }
    //   })
    // },
  },
}
