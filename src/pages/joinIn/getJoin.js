import React, {Component} from 'react'
import styles from './style/getJoin.css'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'

const doimg = require('../../assets/img/join-do.png');
const merchantImg = require('../../assets/img/join-Merchant.jpg');

class GetJoin extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


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

  componentWillMount() {
    const {dispatch} = this.props
    this.getIosToken()
    let token = this.getAppParams();
    console.log('token',token);

    dispatch({type: 'getJoin/getJoinIn',payload:token})
  }

  handleNextUrl() {
    const {getJoin, dispatch} = this.props
    const {isJoin} = getJoin
    if (isJoin === 1 || isJoin === 2) {
      dispatch(routerRedux.push({pathname: '/joinIn-contract'}))
    } else if (isJoin === 0) {
      dispatch(routerRedux.push({pathname: '/joinIn'}))
    }
  }
  getImg(){
    if(this.props.getJoin.isJoin === 1){
      var doimg = require('../../assets/img/join-look.png');
    }else if(this.props.getJoin.isJoin === 2){
      var doimg = require('../../assets/img/join-complete.png');
    }else{
      var doimg = require('../../assets/img/join-do.png');
    }
    return doimg;
  }
  render() {
    console.log()
    return (
      <div className={styles.imgBanner}>
        <img className={styles.img} src={merchantImg}/>
        <div className={styles.imgBackground}>
          <div onClick={() => this.handleNextUrl()}>
            <img className={styles.img} src={this.getImg()}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({getJoin}) => ({getJoin}))(GetJoin)


