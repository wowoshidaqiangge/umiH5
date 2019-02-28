import React, {Component} from 'react'
import styles from './index.css'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'


const merchantImg = require('../../assets/img/join-Merchant.jpg');

class GetJoin extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch({type: 'getJoin/getJoinIn'})
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


