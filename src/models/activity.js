import * as service from '../services/activity'
import {getToken} from "@/utils/requestMethod";

export default {
  namespace: 'activity',
  state: {
    spin: true,                     //加载状态
    banner: {},                     //banner
    activityFont: '',
    hotActivityList: [],            //
    hotActivityName:'',
    recommendActivity: {},
    recommendName:'',
    recommendList:[],
    activity: {},
    nowTime:'',
    startTime:'',
    endTime:'',
    access:''

  },

  reducers: {
    setState(state, action) {
      return {...state, ...action.payload}
    },
  },

  effects: {
    * activityList({payload}, {call, put}) {
      const {data} = yield call(service.activityList, payload)
      if (data.code === 1) {
        const resData = data.data
        yield put({
          type: 'setState', payload: {
            banner: resData.banner,
            activity:resData.activity,
            hotActivityList:resData.hot_activity.list!==undefined?resData.hot_activity.list:[],
            hotActivityName:resData.hot_activity.name!==undefined?resData.hot_activity.name:'',
            activityFont:resData.activity_font,
            recommendName:resData.recommend_activity.name!==undefined?resData.recommend_activity.name:'',
            recommendList:resData.recommend_activity.list!==undefined?resData.recommend_activity.list:[],
            startTime:JSON.stringify(resData.activity) === '{}'?'':resData.activity.start_time,
            endTime:JSON.stringify(resData.activity) === '{}'?'':resData.activity.end_time,
            nowTime:JSON.stringify(resData.activity) === '{}'?'':resData.activity.now_time,
            spin:false,
          }
        })
      }
    }
  },

}
