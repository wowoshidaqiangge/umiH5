const testUrl = 'https://testnew.napin.com/';//api请求路径
// const testUrl = 'https://testnp.napin.com/';//api请求路径
// const testUrl = 'https://super.napin.com/'; //api请求路径

//接口列表
export const api = {
  join: {
    return: `${testUrl}api/shop/applyReturn`,          //申请退还押金
    getBill: `${testUrl}api/shop/getJoinBill`,         //加盟商账单
    getMonthBill: `${testUrl}api/shop/getMonthBill`,   //加盟商筛选年月的消费趋势
    getJoinIn: `${testUrl}api/shop/getJoinIn`,         //获取加盟者信息
    joinIn: `${testUrl}api/shop/joinIn`,               //加盟
  },
  dayNew: {
    dayNew: `${testUrl}api/shop/dayNew`,               //上新时间
    dayGoodList: `${testUrl}api/shop/dayGoodList`       //每日商品
  },
  points: {
    getIntegralLog: `${testUrl}api/Integral/IntegralLog`,                //获取积分记录
    getIntegralGoodsList: `${testUrl}api/integral/IntegralGoodsList`,    //获取商品列表
    giveIntegral: `${testUrl}api/integral/giveIntegral`,                 //获取是否展示积分页面
  },

  shop:{
    activityList:`${testUrl}api/shop/activityList`,
    newList:`${testUrl}api/shop/newList`,
    newGoods:`${testUrl}api/shop/newGoods`,
  }
}
