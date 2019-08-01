import axios from 'axios';

export const sysParams = {
  'time': new Date().getTime(),
  'platform': 'h5',
  // 'token': getToken(),
  'version': '1.0.1',
  'device_id': '123456'
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

export function request(url, params, method) {
  return new Promise(function(resolve,reject){
    getAppToken(url, params, method,data=>{
      resolve(data)
    })
  })
}


// 获取app的token
export function getAppToken(url, params, method,callback) {
  let num = 0

  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)  //ios终端
  let token, device_id, version, platform,res = '';
  if (isAndroid) {
    //需要一个android的开发环境
    if (window.android) {
      if (window.android != null && typeof (window.android) !== undefined) {
        let tokenStr = window.android.callUserInfo()   //安卓自带方法获取用户信息
        let tokenObj = JSON.parse(tokenStr)            //将字符串转为json对象
        token = tokenObj.token
        device_id = tokenObj.device_id
        version = tokenObj.version
        platform = tokenObj.platform
        if(token!==undefined){
          postman(url, params, method,token,data=>{
            let result = data
            typeof callback === 'function' && callback.call(window,result);
            return result;
          })
        }
      } else {
      }
    }
  } else if (isiOS) {
    if (window.webkit) {
      // getIosToken();
      window.webkit.messageHandlers.callUserInfo.postMessage({})
      window['callUserInfo'] = function (res) {
        let tokenStr = res;
        let tokenObj = JSON.parse(tokenStr);
        token = tokenObj.token;
        device_id = tokenObj.device_id;
        version = tokenObj.version;
        platform = tokenObj.platform
        if(token!==undefined){
          if(num<1){
            postman(url, params, method,token,data=>{
              let result = data
              typeof callback === 'function' && callback.call(window,result);
              return result;
            })
          }
          num++
        }
      }
    }
  }
}

export function postman(url, params, method,accessToken,callback){
  if (method === 'get') {
    return axios({
      url,
      method,
      params: {
        ...params,
      },
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'access-token': accessToken !== undefined ? accessToken : ''
      }
    }).then(res => {
      let result = res

      typeof callback === 'function' && callback.call(window,result);
      return result;
    })
  } else {

    return axios({
      url,
      method,
      data: {
        ...params,
      },
      headers: {
        'access-token': accessToken !== undefined ? accessToken : ''
      },
    }).then(res => {
      let result = res
      typeof callback === 'function' && callback.call(window,result);
      return result;
    })
  }
}
