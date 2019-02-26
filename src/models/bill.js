import * as service from '../services/bill'

export default {
  namespace: 'bill',
  state: {
    name:'zs'

  },
  reducers: {
    setState(state, action){
      return {...state, ...action}
    }
  },
  effects: {
    returnMoney(param){
      console.log('sss',param)
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
