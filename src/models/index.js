import * as service from '../services/index'

export default {
  namespace: 'index',
  state: {
    name:'zs'

  },
  reducers: {
    setState(state, action){
      return {...state, ...action}
    }
  },
  effects: {


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
