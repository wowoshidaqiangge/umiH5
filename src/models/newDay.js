import * as service from '../services/newDay'

export default {
  namespace: 'newDay',
  state: {
    spin: true,                     //加载状态

    timeTabs: [],                    //时间
    newId: '',                       //选中的id的名字
    goodsList: [],                   //商品列表

  },

  reducers: {
    setState(state, action) {
      return {...state, ...action.payload}
    },
  },

  effects: {
    * newList({payload}, {call, put}) {
      const {data} = yield call(service.newList, payload)

      if (data.code === 1) {
        const resData = data.data
        yield put({
          type: 'setState', payload: {
            timeTabs:resData,
            newId: resData[0].new_id,
            spin: false,
          }
        })
        yield put({type: 'newGoods', payload: {new_id: resData[0].new_id}})
      }
    },

    * newGoods({payload}, {call, put}) {
      const {data} = yield call(service.newGoods, payload)
      if (data.code === 1) {
        const resData = data.data
        yield put({
          type: 'setState', payload: {
            goodsList: resData,
            spin: false,
          }
        })
      }
    }
  }
}
