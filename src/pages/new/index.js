import React, {Component} from 'react'
import styles from './index.less'
import {Tabs, PullToRefresh} from 'antd-mobile'
import {connect} from 'dva'
import ReactDOM from 'react-dom'
import sys from '../../utils/request'

class New extends Component {
  constructor(props) {
  super(props)
  this.state = {
    isLoadingMore: false,
    height: document.documentElement.clientHeight,
    refreshing: false,
    limit_id: 0,
    group_id: 0,
    join_id: 0,
    type: 1,
    activity_id: 0,
  }
}

componentWillMount() {
  const {dispatch} = this.props
  dispatch({
    type: 'dayNew/getDayNew', callback: () => {
      this.getDayGoodList()
    }
  })
}

componentDidMount() {
  const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
  setTimeout(() => this.setState({
    height: hei,
    // data: this.loadMore(),
  }), 0);
}

loadMore() {
  const {dispatch, dayNew} = this.props
  const {newId, page, allPage} = dayNew
  if(page < allPage){
    dispatch({type: 'dayNew/setState', payload: {page: page + 1}})
    dispatch({type: 'dayNew/loadMore', payload: {new_id: newId, page: page + 1}})
  }
}

getDayGoodList() {
  const {newId} = this.props.dayNew
  this.props.dispatch({type: 'dayNew/getDayGoodList', payload: {new_id: newId, page: 1}})
}

  openGoods(item) {
    const data = sys.getClient()
    const {limit_id, group_id, join_id, type, activity_id} = this.state
    const envType = sys.isMiniProgram()
    const wx = sys.wx

    if (data) {
      //安卓
      try {
        // alert('进入安卓操作')
        window.android.openGoods(type, item.goods_id, join_id, limit_id, group_id, activity_id);
      } catch (e) {
        // alert('安卓异常'+e)
      }
    } else {
      //ios
      try {
        window.webkit.messageHandlers.openGoods.postMessage({
          type: type, goods_id: item.goods_id, join_id: join_id,
          limit_id: limit_id, group_id: group_id, activity_id: activity_id
        })
      } catch (e) {
        // alert('iso异常'+e)
      }
    }

    if(envType){
      console.log('安卓微信')
      alert('安卓微信')
      wx.miniProgram.navigateTo({url: `../../pages/detail/main?type=${type}&goods_id=${item.goods_id}&join_id=${join_id}
      &limit_id=${limit_id}&group_id=${group_id}&activity_id=${activity_id}`})
    }

  }

  renderContent(goodsList, curPage, allPage) {
    return <div>
      {goodsList.map((item, index) => {
        return <div key={index}
                    onClick={() => this.openGoods(item)}
                    style={{
                      display: 'flex',
                      marginTop: '20px',
                      height: '40vw',
                      backgroundColor: '#fff',
                      borderRadius: '8px 8px 0 0 ',
                      marginBottom: '6vw'
                    }}>
          <div style={{flex: 4, textAlign: 'center', lineHeight: '40vw'}}>
            <img style={{width: '80%', height: '80%'}} src={item.thum_img}/>
          </div>
          <div style={{flex: 5, marginRight: '15px', paddingTop: '5vw'}}>
            <p style={{fontSize: '15px', color: 'rgb(51, 51, 51)', height: '12vw', lineHeight: '6vw'}}>
              {item.good_name}
            </p>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <div style={{fontSize: '18px', color: ' #ff4c50', textDecoration: 'none'}}>￥{item.sell_price}</div>
                <div style={{textDecoration: 'line-through'}}>￥{item.market_price}</div>
              </div>
              <button style={{
                background: 'linear-gradient(#59057B,#AB0E86)', border: 'none', height: '9vw',
                borderRadius: '2vw', color: '#fff', width: '22vw'
              }}>立即购
              </button>
            </div>
          </div>
        </div>
      })}
      {curPage < allPage ? <div style={{textAlign: 'center', display: 'none'}}>加载更多</div> : void[0]}

    </div>
  }

  changePage(tab, index) {
    const {dispatch} = this.props
    dispatch({type: 'dayNew/setState', payload: {newId: tab.new_id, showPage: index}})
    dispatch({type: 'dayNew/updateGoodsList', payload: {new_id: tab.new_id, page: 1}})
  }

  render() {
    // console.log('wx',wx)
    const {tabs, showPage, goodsList, curPage, allPage} = this.props.dayNew
    const newTabs = []
    tabs && tabs.length > 0 ? tabs.map((item) => {
      newTabs.push({
        title: <div>
          <div style={{lineHeight: '20px',marginTop:'5px'}}>{item.start_day}</div>
          <div style={{fontSize: '15px', lineHeight: '15px', marginTop: '8px', textAlign: 'center'}}>
            {item.start_hour}
          </div>
        </div>, ...item
      })
    }) : void[0]

    return (
      <PullToRefresh damping={60}
                     ref={el => this.ptr = el}
                     style={{height: this.state.height, overflow: 'auto',webkitOverflowscrolling:'touch' }}
                     indicator='上拉可以刷新'
                     direction='up'
                     refreshing={this.state.refreshing}
                     onRefresh={() => {
                       this.setState({refreshing: true});
                       setTimeout(() => {
                         this.setState({refreshing: false});
                       }, 1000 );
                       this.loadMore()
                     }}
      >
        <div className={styles.newContainer}>
          <img src={require('../../assets/img/new/banner.png')}/>
          <div className={styles.tabs}>
            <Tabs tabs={newTabs} page={showPage}
                  onChange={(tab, index) => this.changePage(tab, index)}
                  onTabClick={(tab, index) => this.changePage(tab, index)}
                  renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3}/>}>
              {this.renderContent(goodsList, curPage, allPage)}
            </Tabs>
          </div>
        </div>
      </PullToRefresh>
    )
  }
}

export default connect(({dayNew}) => ({dayNew}))(New)
