import axios from 'axios'
import {Toast} from 'antd-mobile'
const testUrl = 'https://testnp.napin.com/'; //api请求路径
// const testUrl = 'https://super.napin.com/'; //api请求路径
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
  const token2 = window.localStorage.getItem('token'); //本地的
  const token3 = getAppToken(); //从app获取到的
  const final_token = token1 || token2 || token3;
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
function getIosToken(){
  window.webkit.messageHandlers.callUserInfo.postMessage
  ({})
}
//获取app的token

function getAppToken() {
  let url = window.location.href
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
  }else if (isiOS) {
    // alert("555555+++");
    if (window.webkit) {
      getIosToken();
      // alert("123+++");
      window['callUserInfo'] = function (res) {
        let tokenStr = res;
        let tokenObj = JSON.parse(tokenStr);
        token = tokenObj.token;
        // alert("哈哈哈++token:"+token);
        device_id = tokenObj.device_id;
        version = tokenObj.version;
        platform = tokenObj.platform
      }
    }
  }else{
    // alert("什么都没得、。、、、");
  }
  return token
}
//接口列表
const api = {
  join: {
    return: `${testUrl}api/shop/applyReturn`,          //申请退还押金
    getBill: `${testUrl}api/shop/getJoinBill`,         //加盟商账单
    getMonthBill: `${testUrl}api/shop/getMonthBill`,   //加盟商筛选年月的消费趋势
    getJoinIn: `${testUrl}api/shop/getJoinIn`,         //获取加盟者信息
    joinIn: `${testUrl}api/shop/joinIn`,               //加盟
  },
};
//封装请求
const request = async function request(url, params) {
  return axios.post(url, params);
};
//封装响应
const responseCode = function responseCode(data){
  if(data.code === -1){
    Toast.fail(data.message,3)
  }else if(data.code === -2){
    Toast.fail(data.message,3)
  }
};
export default {api, request,responseCode, sysParams};
