import * as service from '../services/contract'
import sys from "@/utils/request";


export default {
  namespace: 'contract',
  state: {
    endTime: '',    //截止时间
    isJoin: '',     //是否加盟
    joinMoney: '',  //加盟金额
    signImage: '',   //前面图片
    signTime: '',    //签名时间
    startTime: '',    //开始时间
    name: '',         //乙方公司名
    year: '',         //加盟时长
    addr:'',          //乙方地址
    phone:''          //乙方电话
  },
  reducers: {
    setState(state, action) {
      return {...state, ...action.payload}
    }
  },
  effects: {
    * getJoinIn({}, {call, put}) {
      const {data} = yield call(service.getJoinIn)
      if (data.code === 1) {
        yield  put({
          type: 'setState', payload: {
            endTime: data.data.end_time,
            isJoin: data.data.is_join,
            joinMoney: data.data.join_money,
            signImage: data.data.sign_image,
            signTime: data.data.sign_time,
            startTime: data.data.start_time,
            name:data.data.name,
            year:data.data.year,
            addr:data.data.addr,
            phone:data.data.phone
          }
        })
      }
      sys.responseCode(data)
    },
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
