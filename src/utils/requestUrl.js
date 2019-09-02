
// const testUrl ='https://api.napin.com/'
const testUrl = 'https://testnew.napin.com/';//api请求路径
const oldTestUrl = 'https://testnp.napin.com/';//api请求路径

//接口列表
export const api = {
  dayNew: {
    dayNew: `${oldTestUrl}api/shop/dayNew`,               //上新时间
    dayGoodList: `${oldTestUrl}api/shop/dayGoodList`       //每日商品
  },
  points: {
    getIntegralLog: `${oldTestUrl}api/Integral/IntegralLog`,                //获取积分记录
    getIntegralGoodsList: `${oldTestUrl}api/integral/IntegralGoodsList`,    //获取商品列表
    giveIntegral: `${oldTestUrl}api/integral/giveIntegral`,                 //获取是否展示积分页面
  },

  /*以下来自新版服务器接口*/
  join: {
    getJoinIn: `${testUrl}api/shop/getJoinIn`,         //获取加盟者信息
    getBill: `${testUrl}api/shop/getJoinBill`,         //加盟商账单
    return: `${testUrl}api/shop/applyReturn`,          //申请退还押金
    getMonthBill: `${testUrl}api/shop/getMonthBill`,   //加盟商筛选年月的消费趋势
    joinIn: `${testUrl}api/shop/joinIn`,               //加盟
  },

  shop: {
    activityList: `${testUrl}api/shop/activityList`,
    newList: `${testUrl}api/shop/newList`,
    newGoods: `${testUrl}api/shop/newGoods`,
  }
}
