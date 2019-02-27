import * as service from '../services/contract'

export default {
  namespace: 'contract',
  state: {
    endTime:'',    //截止时间
    isJoin:'',     //是否加盟
    joinMoney:'',  //加盟金额
    signImage:'',   //前面图片
    signTime:'',    //签名时间
    startTime:'',    //开始时间


  },
  reducers: {
    setState(state, action){
      return {...state, ...action.payload}
    }
  },
  effects: {
    *getJoinIn({}, {call, put}){
      const {data} = yield call(service.getJoinIn)
      if(data.code === 1){
        console.log(data.data.is_join,'DDDDD')
        yield  put({type:'setState',payload:{endTime: data.data.end_time,isJoin:data.data.is_join,joinMoney:data.data.join_money,
          signImage: data.data.sign_image,signTime:data.data.sign_time,startTime: data.data.start_time}})
      }
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
