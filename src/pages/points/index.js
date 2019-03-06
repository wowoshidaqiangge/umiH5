import React, {Component} from 'react'
import styles from './index.less'
import {Button,Modal,Icon,WhiteSpace} from 'antd-mobile'

export default class Points extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal:true
    }
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

        <div className={styles.modal}>
          <Modal
            visible={this.state.showModal}
            transparent
            maskClosable={false}>
            <div style={{backgroundColor:'#F2F8FF',height: '100%'}}
              // style={{ , overflow: 'scroll' }}
            >
              <img style={{paddingTop:'33px'}}
                   src={require('../../assets/img/points/1.png')}/>
              <img  src={require('../../assets/img/points/2.png')}/>
              <div  style={{color:'#FDA102',fontSize:'14px',marginTop:'20px',height:'45px'}}>
                恭喜你,获得100积分
              </div>
            </div>
            <div>
              <Icon type='cross-circle'/>
            </div>
          </Modal>
        </div>
      </div>
    )
  }


}
