import * as service from '../services/index'
import {Toast} from 'antd-mobile'

export default {
  namespace: 'index',
  state: {

  },
  reducers: {
    setState(state, action){
      return {...state, ...action}
    }
  },
  effects: {
    *joinIn({payload},{call,put}){
      console.log(payload,'加入的models层')
      const{data} = yield call (service.joinIn,payload)
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
