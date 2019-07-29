import React, {Component} from 'react'
import router from 'umi/router'
import {connect} from 'dva'
import 'react-flexible'
import styles from './style/getJoin.css'

const merchantImg = require('../../assets/img/join-Merchant.jpg');

class GetJoin extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch({type: 'getJoin/getJoinIn'})
  }


  handleNextUrl() {
    const {getJoin} = this.props
    const {isJoin} = getJoin
    if (isJoin === 1 || isJoin === 2) {
      router.push('/joinIn-contract')
      // dispatch(routerRedux.push({pathname: '/joinIn-contract'}))
    } else if (isJoin === 0) {
      router.push('/joinIn')
      // dispatch(routerRedux.push({pathname: '/joinIn'}))
    }
  }

  render() {
    const {getJoin} = this.props
    const {isJoin} = getJoin
    return (
      <div className={styles.imgBanner}>
        <img className={styles.img} src={merchantImg}/>
        <div className={styles.imgBackground}>
          <div onClick={() => this.handleNextUrl()}>
            <img className={styles.img} src={isJoin === 1 ||
            isJoin === 2 ? require('../../assets/img/join-look.png') : require('../../assets/img/join-do.png')}/>

          </div>
        </div>
      </div>
    )
  }
}

export default connect(({getJoin}) => ({getJoin}))(GetJoin)


