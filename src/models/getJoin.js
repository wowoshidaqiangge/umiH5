import * as service from '../services/getJoin'

export default {
  namespace: 'getJoin',
  state: {
    isJoin: '',     //是否加盟
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
            isJoin: data.data.is_join,
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
