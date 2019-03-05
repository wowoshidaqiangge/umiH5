import React, {Component} from 'react'
import styles from './index.less'
import {Button} from 'antd-mobile'

export default class Points extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={styles.points}>
        <div className={styles.header}>
          <div className={styles.content}>
            <div className={styles.left}>
              <img src={require('../../assets/img/points/tab_2.png')}/>
              <span>.特大号怡宝.</span>
            </div>

            <div className={styles.right}>
              <img src={require('../../assets/img/points/jewel.png')}/>
              <span>我的积分:429</span>
            </div>

          </div>
        </div>

        <div className={styles.photo}>
          <img src={require('../../assets/img/points/babackforpoints.png')}></img>
        </div>

        <div className={styles.allGoods}>
          <div className={styles.title}>全部商品</div>

          <div className={styles.lists}>
            <div className={styles.list}>

              <div className={styles.img}>
                <img src={require('../../assets/img/1.jpg')}/>
              </div>

              <div className={styles.title}>仙女风木耳边蕾丝连衣裙</div>

              <div className={styles.middle}>
                <img src={require('../../assets/img/points/jewel.png')}/>
                <div className={styles.price}>￥0.00</div>
              </div>

              <div className={styles.button}>
                <Button type="ghost" inline size="small" className="am-button-borderfix">积分兑换</Button>
              </div>
            </div>

            <div className={styles.list}>

              <div className={styles.img}>
                <img src={require('../../assets/img/1.jpg')}/>
              </div>

              <div className={styles.title}>仙女风木耳边蕾丝连衣裙</div>

              <div className={styles.middle}>
                <img src={require('../../assets/img/points/jewel.png')}/>
                <div className={styles.price}>￥0.00</div>
              </div>

              <div className={styles.button}>
                <Button type="ghost" inline size="small" className="am-button-borderfix">积分兑换</Button>
              </div>
            </div>

            <div className={styles.list}>

              <div className={styles.img}>
                <img src={require('../../assets/img/1.jpg')}/>
              </div>

              <div className={styles.title}>仙女风木耳边蕾丝连衣裙</div>

              <div className={styles.middle}>
                <img src={require('../../assets/img/points/jewel.png')}/>
                <div className={styles.price}>￥0.00</div>
              </div>

              <div className={styles.button}>
                <Button type="ghost" inline size="small" className="am-button-borderfix">积分兑换</Button>
              </div>
            </div>

            <div className={styles.list}>

              <div className={styles.img}>
                <img src={require('../../assets/img/1.jpg')}/>
              </div>

              <div className={styles.title}>仙女风木耳边蕾丝连衣裙</div>

              <div className={styles.middle}>
                <img src={require('../../assets/img/points/jewel.png')}/>
                <div className={styles.price}>￥0.00</div>
              </div>

              <div className={styles.button}>
                <Button type="ghost" inline size="small" className="am-button-borderfix">积分兑换</Button>
              </div>
            </div>


          </div>

        </div>

      </div>
    )
  }


}
