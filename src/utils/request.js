import axios from 'axios'
import {Toast} from 'antd-mobile'
import wx from 'weixin-js-sdk'

//系统请求参数
const sysParams = {
  'time': new Date().getTime(),
  'platform': 'h5',
  'token': getToken(),
  'version': '1.0.1',
  'device_id': '123456'
};

//获取token的方法
function getToken() {
  const token1 = GetQueryString('token');//地址栏
  // const token2 = window.localStorage.getItem('token'); //本地的
  const token3 = getAppToken(); //从app获取到的
  const final_token = token1 || token3;//|| token2
  //往本地存一次token  防止跳转页面式获取不到token的问题  暂时不需要了
  // if(!token2 && final_token){
  //   window.localStorage.setItem('token',final_token);
  // }
  return final_token;
}

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * IOS请求token
 */
function getIosToken() {
  window.webkit.messageHandlers.callUserInfo.postMessage({})
}

//判断是否是小程序的环境
function isMiniProgram() {
  var ua = navigator.userAgent.toLowerCase();
  var envType = null;
  if (ua.match(/MicroMessenger/i) == 'micromessenger') { //微信环境
    wx.miniProgram.getEnv(function (res) {
      if (res.miniprogram) { // 小程序环境下逻辑
        envType = true
      } else { //非小程序环境下逻辑
        envType = false
      }
    })
  } else { //非微信环境逻辑isMiniProgram
    envType = false
  }
  return envType
}


//获取app的token
function getAppToken() {
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)  //ios终端
  let token, device_id, version, platform = '';
  if (isAndroid) {
    //需要一个android的开发环境
    if (window.android) {
      if (window.android != null && typeof (window.android) != 'undefined') {
        let tokenStr = window.android.callUserInfo()   //安卓自带方法获取用户信息
        let tokenObj = JSON.parse(tokenStr)            //将字符串转为json对象
        token = tokenObj.token
        device_id = tokenObj.device_id
        version = tokenObj.version
        platform = tokenObj.platform
      } else {
      }
    }
  } else if (isiOS) {
    if (window.webkit) {
      getIosToken();
      window['callUserInfo'] = function (res) {
        let tokenStr = res;
        let tokenObj = JSON.parse(tokenStr);
        token = tokenObj.token;
        device_id = tokenObj.device_id;
        version = tokenObj.version;
        platform = tokenObj.platform
      }
    }
  } else {
  }
  return token
}

//封装请求
const request = async function request(url, params) {
  return axios.post(url, params);
}

//封装响应
const responseCode = function responseCode(data) {
  if (data.code === -1 || data.code === '-1') {
    Toast.fail(data.message, 3)
  } else if (data.code === -2 || data.code === '-2') {
    if(data.message){
      Toast.fail(data.message, 3)
    }
  }
}

export default {wx, request, responseCode, isMiniProgram, sysParams};
