import React, {Component} from 'react'
import styles from './style/getJoin.css'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'

const merchantImg = require('../../assets/img/join-Merchant.jpg');

class GetJoin extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const {dispatch} = this.props
    dispatch({type: 'getJoin/getJoinIn'})
  }


  //捕获异常
  componentDidCatch(error, info) {
    // console.log('错误信息~~~~',error, info);
    // alert('捕获到异常'+error+'==='+JSON.stringify(info));
    //
    // window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
    //   // code..
    //   alert('this is error'+errorMessage+'=='+scriptURI+'=='+lineNumber+'=='+columnNumber+'=='+errorObj);
    // }
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

  getImg() {
      let doimg = null
    if (this.props.getJoin.isJoin === 1 || this.props.getJoin.isJoin === 2) {
      doimg = require('../../assets/img/join-look.png');
    } else {
      doimg = require('../../assets/img/join-do.png');
    }
    // else if(this.props.getJoin.isJoin === 2){
    //     var doimg = require('../../assets/img/join-complete.png');
    //   }
    return doimg;
  }

  render() {
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


