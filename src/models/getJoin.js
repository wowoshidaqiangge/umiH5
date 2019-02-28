import * as service from '../services/getJoin'

export default {
  namespace: 'getJoin',
  state: {
    isJoin: '',     //是否加盟
    joinMoney:''    //加盟金额
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
        console.log(data.data)
        yield  put({
          type: 'setState', payload: {
            isJoin: data.data.is_join,joinMoney: data.data.join_money
          }
        })
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
