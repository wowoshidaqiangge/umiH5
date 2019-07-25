import axios from 'axios';


const sysParams = {
  'time': new Date().getTime(),
  'platform': 'h5',
  // 'token': getToken(),
  'version': '1.0.1',
  'device_id': '123456'
}

//获取token的方法
function getToken() {
  // const token1 = GetQueryString('token');//地址栏
  // const token2 = window.localStorage.getItem('token'); //本地的
  console.log('get')
  const token3 = getAppToken(); //从app获取到的
  const final_token = token3;//|| token2token1 ||
  return final_token;
}

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


//获取app的token
function getAppToken() {
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)  //ios终端
  let token, device_id, version, platform = '';


  if (isAndroid) {
    // console.log('APP',isAndroid,window,window.android)
    alert(window.android)
    //需要一个android的开发环境
    if (window.android) {
      if (window.android != null && typeof (window.android) !== undefined) {
        let tokenStr = window.android.callUserInfo()   //安卓自带方法获取用户信息
        let tokenObj = JSON.parse(tokenStr)            //将字符串转为json对象
        alert('step2',window.android)
        token = tokenObj.token
        device_id = tokenObj.device_id
        version = tokenObj.version
        platform = tokenObj.platform
      } else {
      }
    }
  } else if (isiOS) {
    alert('IOS',window.webkit)
    if (window.webkit) {
      getIosToken();
      window['callUserInfo'] = function (res) {
        let tokenStr = res;
        let tokenObj = JSON.parse(tokenStr);
        alert('IOS1',tokenObj)
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

/**
 * IOS请求token
 */
function getIosToken() {
  window.webkit.messageHandlers.callUserInfo.postMessage({})
}

// const sysParams = {
//   'time': new Date().getTime(),
//   'platform': 'h5',
//   // 'token': getToken(),
//   'version': '1.0.1',
//   'device_id': '123456'
// };

export function request(url, params, method) {
  const accessToken = getToken()

  if (method === 'get') {
    return axios({
      url,
      method,
      params: {
        ...params,
      },
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'access-token':getToken()!==undefined?getToken():''
        // 'access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJucHNob3AiLCJpYXQiOjE1NjQwNTMzODQsImV4cCI6MTU2NjY0NTM4NCwibmJmIjoxNTY0MDUzMzg0LCJzdWIiOiJ1c2VyIiwianRpIjp7InJvbGUiOiJ1c2VyIiwidXNlcl9pZCI6N319.ksHpD_Q9rTbBwQHynxKmWB9YwyPq-cWKhwNbnigkpXU',
      }
    }).then(res => {
      return res
    })
  } else {
    return axios({
      url,
      method,
      data: {
        ...params,
      },
      headers: {
        'access-token':getToken()!==undefined?getToken():''
        // 'access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJucHNob3AiLCJpYXQiOjE1NjQwNTMzODQsImV4cCI6MTU2NjY0NTM4NCwibmJmIjoxNTY0MDUzMzg0LCJzdWIiOiJ1c2VyIiwianRpIjp7InJvbGUiOiJ1c2VyIiwidXNlcl9pZCI6N319.ksHpD_Q9rTbBwQHynxKmWB9YwyPq-cWKhwNbnigkpXU',
        // 'version': '1.0.1',
        // 'device_id': '123456'
      },
    }).then(res => {
      return res
    })
  }
}
