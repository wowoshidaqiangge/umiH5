import React, {Component} from 'react'
import styles from './index.css'
import {connect} from 'dva'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        getPay();
        // const token = getToken();
        return (
            <div className={styles.normal}>
                <div className={styles.welcome}/>
                <ul className={styles.list}>
                    {/*<li>this is token::::{token}</li>*/}
                    <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
                    <li><a href="./joinIn">Getting Started aaa</a></li>
                </ul>
            </div>
        )
    }
}
function getPay() {
    window["joinPayNotice"] = () => {
        //业务逻辑
        // alert("我就是这样支付成功了~~~");
    };
    window.joinPayNotice = ()=>{
        // alert("这是安卓需要的");
    };
}

//
// //获取token的方法
// function getToken() {
//     const token1 = GetQueryString('token');//地址栏
//     const token2 = window.localStorage.getItem('token'); //本地的
//     const token3 = getAppToken(); //从app获取到的
//     const final_token = token1 || token2 || token3;
//     //往本地存一次token  防止跳转页面式获取不到token的问题  暂时不需要了
//     // if(!token2 && final_token){
//     //   window.localStorage.setItem('token',final_token);
//     // }
//     return final_token;
// }
//
// function GetQueryString(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) return unescape(r[2]);
//     return null;
// }
// /**
//  * IOS请求token
//  */
// // function getIosToken(){
// //   window.webkit.messageHandlers.callUserInfo.postMessage
// //   ({})
// // }
// //获取app的token
//
// function getAppToken() {
//     let url = window.location.href
//     let u = navigator.userAgent
//     let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
//     let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)  //ios终端
//     let token, device_id, version, platform = '';
//     if (isAndroid) {
//         //需要一个android的开发环境
//         if (window.android) {
//             if (window.android != null && typeof (window.android) != 'undefined') {
//                 let tokenStr = window.android.callUserInfo()   //安卓自带方法获取用户信息
//                 let tokenObj = JSON.parse(tokenStr)            //将字符串转为json对象
//                 token = tokenObj.token
//                 device_id = tokenObj.device_id
//                 version = tokenObj.version
//                 platform = tokenObj.platform
//             } else {
//             }
//         }
//     }else if (isiOS) {
//         if (window.webkit) {
//             // this.getIosToken();
//             window['callUserInfo'] = function (res) {
//                 // alert("1111++");
//                 let tokenStr = res;
//                 let tokenObj = JSON.parse(tokenStr);
//                 token = tokenObj.token;
//                 // alert("哈哈哈++token:"+token);
//                 device_id = tokenObj.device_id;
//                 version = tokenObj.version;
//                 platform = tokenObj.platform
//             }
//         }else{
//             alert("not found token");
//         }
//     }else{
//         alert("好像啥子都没得啊");
//     }
//     return token
// }

export default connect(({index}) => ({index}))(Index)
