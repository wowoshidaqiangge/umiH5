import React, {Component} from 'react'
import styles from './index.less'
import {Button,Modal,Icon,PullToRefresh} from 'antd-mobile'
import {connect} from 'dva'
import sys from '../../utils/request'

class Points extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limit_id:0,
      group_id:0,
      join_id:0,
      type:7,
      activity_id:0,
    }
  }

  componentWillMount(){
    const {dispatch} = this.props
    dispatch({type:'points/getIntegralGoodsList',payload:{page:'1'}})
    dispatch({type:'points/giveIntegral'})
  }

  renderGoodsList(goodsList){
    return <div className={styles.lists}>
      {goodsList && goodsList.length>0? goodsList.map((item,index )=>{
        return <div className={styles.list} key={index} onClick={()=>this.openPointGoods(item)}>
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
  }

  openPointGoods(item){
    // console.log('item',item)
    const data = sys.getClient()
    const{limit_id, group_id,join_id,type,activity_id} = this.state

    if(data){
      //安卓
      try{
        // alert('进入安卓操作')
        window.android.openGoods(type,item.id,join_id,limit_id,group_id,activity_id);
      }catch(e){
        // alert('安卓异常'+e)
      }

    }else{
      //ios
      try{
        // alert('进入IOS操作')
        window.webkit.messageHandlers.openGoods.postMessage({type:type,goods_id:item.id,join_id:join_id,
          limit_id:limit_id,group_id:group_id,activity_id:activity_id})
      }catch(e){
        // alert('iso异常'+e)
      }
    }
  }

  loadMore(){
    console.log('llllllll加载更多')
    const {dispatch,points} = this.props
    const {curPage,allPage} = points
    let page = parseInt(curPage)
    if(page <= allPage){
      page++
      dispatch({type:'points/getIntegralGoodsList',payload:{page:page.toString()}})
    }
  }

  render() {
    const{user,goodsList,modalVisible,integral} = this.props.points
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
          <PullToRefresh  direction='up'
                          distanceToRefresh={25}  onRefresh={()=>this.loadMore()}
                          damping={100}>
            {this.renderGoodsList(goodsList)}
          </PullToRefresh>
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
                恭喜你,获得{integral}积分
              </div>
            </div>

            {/*以下是icon*/}
            <div onClick={()=>{this.props.dispatch({type:'points/setState',payload:{modalVisible:false}})}}
                 style={{marginTop:'10px'}}>
              <Icon type='cross-circle' style={{color:'white'}} />
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

export default connect(({points}) => ({points}))(Points)
