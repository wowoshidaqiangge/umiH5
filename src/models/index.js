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
      const{data} = yield call (service.joinIn,payload)
      if(data.code !== 1){
        Toast.info('请输入完整信息',3)

      }
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
