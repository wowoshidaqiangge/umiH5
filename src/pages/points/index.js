import React, {Component} from 'react'
import styles from './index.less'
import {Button,Modal,Icon} from 'antd-mobile'
import {connect} from 'dva'

class Points extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal:true
    }
  }

  componentWillMount(){
    const {dispatch} = this.props
    dispatch({type:'points/getIntegralGoodsList'})
    dispatch({type:'points/giveIntegral'})
  }

  render() {
    const{user,goodsList,modalVisible} = this.props.points
    console.log('visible',modalVisible)
    return (
      <div className={styles.points}>
        <div className={styles.header}>
          <div className={styles.content}>
            <div className={styles.left}>
              <img src={user.head_ico}/>
              <span>{user.user_name}</span>
            </div>

            <div className={styles.right}>
              <img src={require('../../assets/img/points/jewel.png')}/>
              <span>我的积分:{user.integral_balance}</span>
            </div>

          </div>
        </div>

        <div className={styles.photo}>
          <img src={require('../../assets/img/points/babackforpoints.png')}></img>
        </div>

        <div className={styles.allGoods}>
          <div className={styles.title}>全部商品</div>

          <div className={styles.lists}>
            {goodsList && goodsList.length>0? goodsList.map((item,index )=>{
              return <div className={styles.list} key={index}>

                <div className={styles.img}>
                  <img src={item.thum_img}/>
                </div>

                <div className={styles.title}>{item.name}</div>

                <div className={styles.middle}>
                  <div className={styles.left}>
                    <div style={{width:'20%'}}> <img src={require('../../assets/img/points/jewel.png')}/></div>
                    <div style={{height:'10px'}}>{item.integral}</div>
                  </div>

                  <div className={styles.price}>￥{item.goods_price}</div>
                </div>

                <div className={styles.button}>
                  <Button type="ghost" inline size="small" className="am-button-borderfix">积分兑换</Button>
                </div>
              </div>
            }):void[0]}
          </div>
        </div>

        <div className={styles.modal}>
          <Modal
            visible={modalVisible}
            transparent
            maskClosable={false}>
            <div style={{backgroundColor:'#F2F8FF',}}
              // style={{ height: '100%', overflow: 'scroll' }}
            >
              <img style={{paddingTop:'33px'}}
                   src={require('../../assets/img/points/1.png')}/>
              <img  src={require('../../assets/img/points/2.png')}/>
              <div  style={{color:'#FDA102',fontSize:'14px',marginTop:'20px',height:'45px'}}>
                恭喜你,获得100积分
              </div>
            </div>
            <div style={{backgroundColor:'#000000',opacity:'0.1'}}>
              <Icon type='cross-circle'/>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

export default connect(({points}) => ({points}))(Points)
