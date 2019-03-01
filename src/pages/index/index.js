import React, {Component} from 'react'
import styles from './index.css'
import {connect} from 'dva'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    /**
     * IOS请求token
     */
    getIosToken(){
        window.webkit.messageHandlers.callUserInfo.postMessage
        ({})
    }


    getClient(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isIos = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){
            return 1;
        }else if(isIos){
            return 0;
        }
    }

    getAppParams() {
        var token = "this is empty";
        var client = this.getClient();

        if(client && window.android){
            if(window.android!=null&&typeof(window.android)!="undefined"){
                var tokenStr=window.android.callUserInfo();
                var tokenObj=JSON.parse(tokenStr);
                token=tokenObj.token;
                var device_id=tokenObj.device_id;
                var version=tokenObj.version;
                var platform=tokenObj.platform;
                console.log("this is 安卓++");
                console.log(token,device_id,version,platform);
                alert("安卓 token:"+token);
            }else{
                alert("安卓没有获取到Token");
            }
        }else if(!client){
            if(window.webkit){
                this.getIosToken(); //请求IOS的token
                window["callUserInfo"] = function(res) {
                    var tokenObj=JSON.parse(res);
                    token=tokenObj.token;
                    device_id=tokenObj.device_id;
                    version=tokenObj.version;
                    platform=tokenObj.platform;
                    alert("ios Token=="+token)
                }
            }else{
                alert("IOS没有获取到Token");
            }
        }
        return [token];
    }

    getApp(params,money) {
        var client = this.getClient();
        // var params = {"name":"123","company":"","phone":"18782559175","addr":"张三李四王麻子","card":"123456789789789"};
        params = JSON.stringify(params);
        // var money = "2000";
        if(client){
            //安卓
            try {
                window.android.joinMerchant(params,money);
            } catch (e) {
                // alert("安卓 this is error ");
                console.log(e)
            }
        }else{
            //IOS
            try {
                window.webkit.messageHandlers.joinMerchant.postMessage
                ({"join_info":params,"money":money})
                // window.webkit.messageHandlers.JAMS__mark.postMessage(params)
            } catch (e) {
                // alert("IOS this is error ");
                console.log(e)
            }
        }
    }

    render() {
        var token = this.getAppParams();
        console.log('token',token);
        this.getApp();
        return (
            <div className={styles.normal}>
                <div className={styles.welcome}/>
                <ul className={styles.list}>
                    <div id={'res'}>{this.state.res}</div>
                    <div id={'res1'}>{this.state.res1}</div>
                    <div id={'res2'}>{this.state.res2}</div>
                    <li>token::{token}</li>
                    <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
                    <li><a href="./joinIn">Getting Started</a></li>
                </ul>
            </div>
        )
    }
}

export default connect(({index}) => ({index}))(Index)
