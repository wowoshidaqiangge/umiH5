import React, {Component} from 'react'

import {Icon} from 'antd-mobile';

import styles from './index.less'


export default class Loading extends Component {
  render() {

    return (
      <div className={styles.loading}>
        <div className={styles.content}>
          <Icon type='loading' size='lg'/>
        </div>

      </div>

    )
  }

}


