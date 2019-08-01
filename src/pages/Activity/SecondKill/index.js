import React, {Component, Fragment} from 'react'
import {connect} from 'dva'
import wx from 'weixin-js-sdk'
import 'react-flexible'
import styles from '../index.less'
import NoGoods from '../../../components/NoGoods'
import Loading from '../../../components/Loading'
import {getCountDown,getClient} from "@/utils/publicMethod";
window.num=1
// localStorage.setItem('num',1)


class SecondKill extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch({type: 'activity/activityList', payload: {act_type: '1'}})
  }

  openGoods(goodsId) {
      const client = getClient()
      if (client == 0) {//ios
        if (window.webkit) {
          window.webkit.messageHandlers.openGoods.postMessage({
            goods_id: goodsId
          })
        } else {
          wx.navigateTo({
            url: `/pages/detail/index?id=${goodsId}`,
          })
        }
      } else if (client == 1) {//安卓
        if (window.android != null && typeof window.android != 'undefined') {
          window.android.openGoods( goodsId )
          return
        } else {
          wx.navigateTo({
            url: `/pages/detail/index?id=${goodsId}`,
          })
        }
      } else if (client == 2) {//微信
        //跳转到小程序
        wx.miniProgram.navigateTo({
          url: `/pages/detail/index?id=${goodsId}`
        });
      }
  }

  renderList() {
    const {banner, hotActivityList, hotActivityName, activityFont, recommendName, recommendList, startTime, nowTime, endTime} = this.props
    console.log(hotActivityList)
    let res = Number(startTime) - Number(nowTime) > 0 ? getCountDown(startTime) : getCountDown(endTime)
    return <div className={styles.container}>
      <div
        className={styles.head}
        style={{
          display: 'inline-block',
          background: `url("${banner.image ? banner.image : ''}") center center / cover no-repeat`,
        }}
      />


      <div className={styles.hotTitle}>
        <div className={styles.hotLeft}>
          <div>{hotActivityName}</div>
          <div>{activityFont}</div>
        </div>

        <div className={styles.hotRight}>
          <div>{Number(startTime) - Number(nowTime) > 0 ? '距开始:' : '距结束:'}</div>
          <div id="countDown1"/>
          <div id="day"/>
        </div>

      </div>

      <div className={styles.hotList}>
        {hotActivityList.length > 0 && hotActivityList.map((item) => {
          return <div
            onClick={() => this.openGoods(item.goods_id)}
            key={item.goods_id}
            className={styles.lineChild}
          >
            <div className={styles.lineImg}>
              <img src={item.goods_img}/>
            </div>
            <div className={styles.details}>
              <div className={styles.goodsName}>{item.goods_name}</div>
              <div className={styles.bottomPrice}>
                <div className={styles.leftPrice}>
                  <div className={styles.move}>￥{item.move_price}</div>
                  <div className={styles.market}>￥{item.market_price}</div>
                </div>
                {item.status === 0 ? '' :
                  <div className={item.status === 2 ? ` ${styles.soldOut}` : `${styles.status}`}>
                    {item.status === 1 ? '抢购中' : item.status === 2 ? '抢光了' : '等待开抢'}
                  </div>}
              </div>
            </div>
          </div>
        })}

      </div>
      {
        recommendList.length === 0 ? '' : <div className={styles.recommendArea}>
          <div className={styles.recommendTitle}>---{recommendName}---</div>
          <div className={styles.selectedKill}>
            {recommendList.length > 0 && recommendList.map((item) => {
              return <div
                key={item.goods_id}
                className={styles.child}
                onClick={() => this.openGoods(item.goods_id)}>
                <div className={styles.img}>
                  <img src={item.goods_img}/>
                </div>
                <div className={styles.childName} style={{ WebkitBoxOrient: "vertical" }}>{item.goods_name}</div>
                <div className={styles.childPrice}>
                  <span>￥{item.move_price}</span>
                  <span>￥{item.market_price}</span>
                </div>

                {item.status === 0 ? '' : <div className={item.status === 2 ? ` ${styles.out}` : `${styles.going}`}>
                  {item.status === 1 ? '抢购中' : item.status === 2 ? '抢光了' : '等待开抢'}
                </div>}
              </div>
            })}
          </div>
        </div>
      }
    </div>
  }

  render() {
    const {spin, activity,} = this.props
    const flag = JSON.stringify(activity) === '{}'
    return (
      <Fragment>
        {spin ? '' : flag ? <NoGoods/> : this.renderList()}
        {/*{spin ? <Loading/> : flag ? <NoGoods/> : this.renderList()}*/}
      </Fragment>
    )
  }
}

export default connect(({activity}) => ({...activity}))(SecondKill)
