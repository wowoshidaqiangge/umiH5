import React, {Component} from 'react'
import styles from './index.less'
import {Modal, Icon, PullToRefresh} from 'antd-mobile'
import {connect} from 'dva'
import sys from '../../utils/request'
import ReactDOM from 'react-dom'

class Points extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingMore: false,
      height: document.documentElement.clientHeight,
      refreshing: false,
      limit_id: 0,
      group_id: 0,
      join_id: 0,
      type: 7,
      activity_id: 0,
    }
  }

  componentWillMount() {
    const {dispatch} = this.props
    dispatch({type: 'points/getIntegralGoodsList', payload: {page: '1'}})
    dispatch({type: 'points/giveIntegral'})
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
      // data: this.loadMore(),
    }), 0);
  }

  renderGoodsList() {
    const {goodsList} = this.props.points
    let flag = goodsList && goodsList.length <= 0
    return <div className={flag ? styles.nothing : styles.lists}>
      {flag ? <div className={styles.waiting}>
        <img src={require('../../assets/img/waitting.png')}/>
        <div>商品正在疯狂上架中</div>
      </div> : goodsList.map((item, index) => {
        return <div className={styles.list}
                    key={index}
                    onClick={() => this.openPointGoods(item)}>
          <div className={styles.img}>
            <img src={item.thum_img}/>
          </div>

          <div className={styles.title}>{item.name}</div>

          <div className={styles.middle}>
            <span className={styles.imgContainer}>
              <img src={require('../../assets/img/points/jewel.png')}/>
              <span className={styles.integral}>{item.integral}</span>
            </span>
            <span className={styles.price}>￥{item.goods_price}</span>
          </div>

          <div style={{textAlign: 'center', marginBottom: '1vh'}}>
            <button className={styles.myButton}>积分兑换</button>
          </div>
        </div>
      })}
    </div>

  }

  openPointGoods(item) {
    const data = sys.getClient()
    const envType = sys.isMiniProgram()
    const wx = sys.wx
    const {limit_id, group_id, join_id, type, activity_id} = this.state
    if (data) {
      //安卓
      try {
        // alert('进入安卓操作')
        window.android.openGoods(type, item.id, join_id, limit_id, group_id, activity_id);
      } catch (e) {
        // alert('安卓异常'+e)
      }

    } else {
      //ios
      try {
        // alert('进入IOS操作')
        window.webkit.messageHandlers.openGoods.postMessage({
          type: type, goods_id: item.id, join_id: join_id,
          limit_id: limit_id, group_id: group_id, activity_id: activity_id
        })
      } catch (e) {
        // alert('iso异常'+e)
      }
    }

    if(envType){
      wx.miniProgram.navigateTo({url: `../../pages/detail/main?type=${type}&goods_id=${item.goods_id}&join_id=${join_id}
      &limit_id=${limit_id}&group_id=${group_id}&activity_id=${activity_id}`})
    }
  }

  handlePointsRecord() {
    let url = '/joinMerchant/pointsRecord'
    window.location.pathname = url
  }

  loadMore() {
    const {dispatch, points} = this.props
    const {curPage, allPage} = points
    let page = parseInt(curPage)
    if (page <= allPage) {
      page++
      dispatch({type: 'points/getMoreIntegralGoodsList', payload: {page: page.toString()}})
    }
  }

  handleClose(integral, integralBalance) {
    const newIntegral = parseInt(integral) + integralBalance
    this.props.dispatch({type: 'points/setState', payload: {modalVisible: false, integralBalance: newIntegral}})
  }

  render() {
    const {user, modalVisible, integral, integralBalance} = this.props.points
    return (
      <PullToRefresh damping={60}
                     ref={el => this.ptr = el}
                     style={{height: this.state.height, overflow: 'auto', backgroundColor: ' rgb(240,240,240)'}}
                     indicator='上拉可以刷新'
                     direction='up'
                     refreshing={this.state.refreshing}
                     onRefresh={() => {
                       this.setState({refreshing: true})
                       setTimeout(() => {
                         this.setState({refreshing: false})
                       }, 1000)
                       this.loadMore()
                     }}
      >
        <div className={styles.points}>
          <div className={styles.header}>
            <div className={styles.content} onClick={() => this.handlePointsRecord()}>
              <div className={styles.left}>
                <div className={styles.userImg}>
                  <img src={user.head_ico}/>
                </div>
                <span>{user.user_name}</span>
              </div>

              <div className={styles.right}>
                <img src={require('../../assets/img/points/jewel.png')}/>
                <span onClick={() => this.handlePointsRecord()}>我的积分:{integralBalance}</span>
              </div>

            </div>
          </div>

          <div className={styles.photo}>
            <img src={require('../../assets/img/points/babackforpoints.png')}></img>
          </div>

          <div className={styles.allGoods}>
            <div className={styles.title}>全部商品</div>
            {this.renderGoodsList()}
          </div>

          <div className={styles.modal}>
            <Modal
              visible={modalVisible}
              transparent='true'
              maskClosable={false}>
              <div style={{backgroundColor: '#F2F8FF', borderRadius: '10px'}}>
                <img style={{paddingTop: '33px'}}
                     src={require('../../assets/img/points/1.png')}/>
                <img src={require('../../assets/img/points/2.png')}/>
                <div style={{color: '#FDA102', fontSize: '14px', marginTop: '20px', height: '45px'}}>
                  恭喜你,获得{integral}积分
                </div>
              </div>

              <div onClick={() => this.handleClose(integral, integralBalance)}
                   style={{marginTop: '10px'}}>
                <Icon type='cross-circle' style={{color: 'white'}}/>
              </div>
            </Modal>
          </div>

        </div>
      </PullToRefresh>
    )
  }
}

export default connect(({points}) => ({points}))(Points)
