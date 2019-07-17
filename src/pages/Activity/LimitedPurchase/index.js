import React, {Component, Fragment} from 'react'
import {connect} from 'dva'
import styles from './index.less'
import Loading from "@/components/Loading";
import NoGoods from "@/components/NoGoods";
import {getCountDown,openGoods} from "@/utils/publicMethod";

class LimitedPurchase extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch({type: 'activity/activityList', payload: {act_type: '2'}})
  }

  handleOpenGoods(goodsId){
    openGoods(goodsId)
  }

  renderList() {
    const {banner, hotActivityList, hotActivityName, activityFont, recommendName, recommendList, startTime, nowTime, endTime} = this.props
    let res = Number(startTime) - Number(nowTime) > 0 ? getCountDown(startTime) : getCountDown(endTime)
    return <div className={styles.container} style={{backgroundColor: '#6160FB'}}>
      <div
        className={styles.head}
        style={{
          display: 'inline-block',
          background: `url("${banner.image ? banner.image : ''}") center center / cover no-repeat`,
        }}
      />

      <div className={styles.limitedTitle}>
        <div><img src={require('../../../assets/img/activity/left.png')}/></div>
        <div>{hotActivityName}</div>
        <div><img src={require('../../../assets/img/activity/right.png')}/></div>
      </div>

      <div className={styles.limitedHot}>
        {hotActivityList.length > 0 && hotActivityList.map((item) => {
          return <div
            onClick={()=>this.handleOpenGoods(item.goods_id)}
            key={item.goods_id}
            className={styles.limitedHotGoods}
          >
            <div><img src={item.goods_img}/></div>
            <div>{item.goods_name}</div>
            <div className={styles.move}>￥{item.move_price}</div>
          </div>
        })}
      </div>

      {
        recommendList.length === 0 ? '' : <Fragment>
          <div className={styles.hotTitle}>
            <div className={styles.hotLeft}>
              <div>{recommendName}</div>
              <div>{activityFont}</div>
            </div>

            <div className={styles.hotRight}>
              <div>{Number(startTime) - Number(nowTime) > 0 ? '距开始:' : '距结束:'}</div>
              <div id="countDown1"/>
              <div id="day"/>
            </div>
          </div>

          <div className={styles.hotList}>
            {recommendList.length > 0 && recommendList.map((item) => {
              return <div key={item.goods_id} className={styles.lineChild}  onClick={()=>this.handleOpenGoods(item.goods_id)}>
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

          <div className={styles.hotSpace}/>

        </Fragment>
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

export default connect(({activity}) => ({...activity}))(LimitedPurchase)
