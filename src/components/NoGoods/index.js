import React, {Component} from 'react'
import styles from './index.less'

export default class NoGoods extends Component {
  render() {
    return (
      <div className={styles.container}>
        <img src={require('../../assets/img/activity/noGoods.png')}/>
        <div>很遗憾,活动已经结束~</div>
      </div>
    )
  }


}

