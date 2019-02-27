import axios from 'axios'

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
  const token1 = 'ea7b727690dae766793f4e196828edbf';//window.location.search('token'); //地址栏
  const token2 = '435';//window.localStorage.getItem('token'); //本地的
  const token3 = getAppToken(); //从app获取到的
  return token1 || token2 || token3;
}

//获取app的token

function getAppToken() {
  let url = window.location.href
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)  //ios终端
  let token, device_id, version, platform = ''
  if (isAndroid) {
    console.log(window.android)   //需要一个android的开发环境
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
    } else if (isiOS) {
      if (window.webkit) {
        window['callUserInfo'] = function (res) {
          let tokenStr = res
          let tokenObj = JSON.parse(tokenStr)
          token = tokenObj.token
          device_id = tokenObj.device_id
          version = tokenObj.version
          platform = tokenObj.platform
        }
      }
    }
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

export default {api, request, sysParams};