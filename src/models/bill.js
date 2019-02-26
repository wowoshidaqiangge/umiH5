import * as service from '../services/bill'

export default {
  namespace: 'bill',
  state: {
    costData:[],

  },
  reducers: {
    setState(state, action){
      console.log(...state,...action.payload,'ccccc')
      return {...state, ...action}
    }
  },
  effects: {
    *returnMoney({payload}, {call, put}){
      console.log('sss',payload)
      const {data} = yield call(service.returnMoney, payload)
    },

    *getJoinBill({payload},{call,put}){
      const {data} = yield call(service.getJoinBill,payload )
      // console.log(data.data.get_month)
      if(data.code === 1){
        console.log('12323');
        yield put({type: 'setState', payload:{costData: data.data.get_month}})
        console.log('56657');
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
