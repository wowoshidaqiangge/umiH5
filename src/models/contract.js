import * as service from '../services/contract'
import {api,request} from '../utils/request'

export default {
  namespace: 'contract',
  state: {
    costData:[],

  },
  reducers: {
    setState(state, action){
      return {...state, ...action}
    }
  },
  effects: {
    *returnMoney({payload}, {call, put}){
      console.log('sss',payload)
      const {data} = yield call(service.returnMoney, payload)
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
