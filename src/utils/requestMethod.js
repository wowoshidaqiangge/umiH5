import axios from 'axios';

export const sysParams = {
  'time': new Date().getTime(),
  'platform': 'h5',
  // 'token': getToken(),
  'version': '1.0.1',
  'device_id': '123456'
}

//获取token的方法
export function getToken() {
  // const token1 = GetQueryString('token');//地址栏
  // const token2 = window.localStorage.getItem('token'); //本地的
  const token3 = getAppToken(); //从app获取到的
  const final_token = token3;//|| token2token1 ||
  return final_token;
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
      if (window.android != null && typeof (window.android) !== undefined) {
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
      // getIosToken();
      window.webkit.messageHandlers.callUserInfo.postMessage({})
      window['callUserInfo'] = function (res) {
        let tokenStr = res;
        let tokenObj = JSON.parse(tokenStr);
        token = tokenObj.token;
        alert('token coming')
        alert(tokenObj.token)
        device_id = tokenObj.device_id;
        version = tokenObj.version;
        platform = tokenObj.platform
      }
    }
  }
  return token
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



export function request(url, params, method,token) {
  alert('1')
  const accessToken =  token
  alert('iosToken2')
  alert(accessToken)
  if (method === 'get') {
    alert('get')
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
      return res
    })
  } else {
    alert('post')
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
      return res
    })
  }
  alert('outEnd')
}

// function double(res) {
//   axios({
//     url,
//     method,
//     data: {
//       ...params,
//     },
//     headers: {
//       'access-token': accessToken !== undefined ? accessToken : ''
//     },
//   }).then(res => {
//     alert(2, res)
//     return res
//   })
// }
// export function request(url, params, method) {
//   const accessToken = getToken()
//
// // return new Promise((resolve,reject)=>{
// //
// //   alert(accessToken)
// //     resolve(accessToken)
// //
// // }).then((accessToken)=>{
//   alert(accessToken)
//   // if (accessToken && accessToken !== undefined) {
//   //   if (method === 'get') {
//   //     alert(3,accessToken)
//   //     return axios({
//   //       url,
//   //       method,
//   //       params: {
//   //         ...params,
//   //       },
//   //       headers: {
//   //         'Content-Type': 'application/json;charset=utf-8',
//   //         'access-token': accessToken !== undefined ? accessToken : ''
//   //       }
//   //     }).then(res => {
//   //       alert(4, res)
//   //       return res
//   //     })
//   //   } else {
//   //     alert(1,accessToken)
//   //     return axios({
//   //       url,
//   //       method,
//   //       data: {
//   //         ...params,
//   //       },
//   //       headers: {
//   //         'access-token': accessToken !== undefined ? accessToken : ''
//   //       },
//   //     }).then(res => {
//   //       alert(2, res)
//   //       return res
//   //     })
//   //   }
//   // }
// // })
//
//   alert(accessToken)
//
//   if (accessToken && accessToken !== undefined) {
//     if (method === 'get') {
//       alert(3)
//       return axios({
//         url,
//         method,
//         params: {
//           ...params,
//         },
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//           'access-token': accessToken !== undefined ? accessToken : ''
//         }
//       }).then(res => {
//         alert(4, res)
//         return res
//       })
//     } else {
//       alert(1)
//       return axios({
//         url,
//         method,
//         data: {
//           ...params,
//         },
//         headers: {
//           'access-token': accessToken !== undefined ? accessToken : ''
//         },
//       }).then(res => {
//         alert(2, res)
//         return res
//       })
//     }
//   }
// }
