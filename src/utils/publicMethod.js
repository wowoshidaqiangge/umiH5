import $ from 'jquery'
// import $ from 'zepto'
import wx from 'weixin-js-sdk'

/**
 * 获取倒计时时间
 * @param timestamp开始或者结束时间戳
 */
export function getCountDown(timestamp) {
  setInterval(function () {
    let nowTime = new Date();
    let endTime = new Date(timestamp * 1000);
    let t = endTime.getTime() - nowTime.getTime();
    let d = Math.floor(t / 1000 / 60 / 60 / 24);
    let hour = Math.floor(t / 1000 / 60 / 60 % 24);
    let min = Math.floor(t / 1000 / 60 % 60);
    let sec = Math.floor(t / 1000 % 60);
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    // const countDownTime = hour + ":" + min + ":" + sec
    // $("#countDown1").html(countDownTime);
    d === 0 ? $("#countDown1").html(`<div>${hour}</div><div>:</div><div>${min}</div><div>:</div><div>${sec}</div>`) :
      $("#day").html(`<div>${d}</div><div>天</div><div>${hour}</div><div>:</div><div>${min}</div><div>:</div><div>${sec}</div>`)
  }, 1000);
}

/**
 * 判断环境是安卓，IOS还是微信
 * @returns {number}
 */
export function getClient() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  const isIos = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  const isWechat = u.toLowerCase().indexOf('micromessenger') !== -1;
  if (isIos) {
    return 0
  } else if (isAndroid) {
    return 1
  } else if (isWechat) {
    return 2
  }
}

/**
 *
 */

export function openGoods(goodsId) {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  const isIos = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  const isWechat = u.toLowerCase().indexOf('micromessenger') !== -1
  alert(`iswechart${isWechat}`)
  // const client = getClient()
  if (isIos && isWechat===false) {//ios
    if (window.webkit) {
      window.webkit.messageHandlers.openGoods.postMessage({
        goods_id: goodsId
      })
    } else {
      wx.navigateTo({
        url: `/pages/details/index?id=${goodsId}`,
      })
    }
  } else if (isAndroid && isWechat===false) {//安卓
    if (window.android != null && typeof window.android != 'undefined') {
      window.android.openGoods(goodsId)
      return
    } else {
      wx.navigateTo({
        url: `/pages/details/index?id=${goodsId}`,
      })
    }
  } else if (isWechat) {//微信
    alert('进入微信'+goodsId)
    //跳转到小程序
    // wx.navigateTo({ url: `/pages/details/index?id=${goodsId}`})
    wx.miniProgram.getEnv(function(res){
      alert('res'+res.miniprogram)
      if(res.miniprogram){
        wx.miniProgram.navigateTo({ url: `../details/index?id=${goodsId}`,success:function () {
            alert('success')
          },fail:function (result) {
            alert(result)
          }})
      }
    })
    // wx.miniProgram.navigateTo({
    //   url: `/pages/details/index?id=${goodsId}`
    // });
  }
}
