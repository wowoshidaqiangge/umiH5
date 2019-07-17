import React, {Component, Fragment} from 'react'
import {connect} from 'dva'
import {Carousel} from 'antd-mobile'
import styles from './index.less'
import NoGoods from '../../../components/NoGoods'
import Loading from "@/components/Loading";
import {openGoods} from "@/utils/publicMethod";

class Points extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgHeight: 176,
      val: ''
    }
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch({type: 'activity/activityList', payload: {act_type: '3'}})
  }
  handleOpenGoods(goodsId){
    openGoods(goodsId)
  }
  renderList() {
    const {slideIndex, imgHeight} = this.state
    const {banner, hotActivityList, hotActivityName, recommendList} = this.props
    return <div className={styles.container}>
      <div
        className={styles.head}
        style={{
          display: 'inline-block',
          background: `url("${banner.image ? banner.image : ''}") center center / cover no-repeat`,
        }}
      >
      </div>

      <div className={styles.hotTitle}>
        {hotActivityName}
      </div>

      <Carousel
        className={styles.carousel}
        frameOverflow="visible"
        cellSpacing={8}
        slideWidth={0.45}
        autoplay
        infinite
        afterChange={index => this.setState({slideIndex: index})}
        dots={false}
      >
        {hotActivityList.map((item, index) => (
          <div onClick={()=>this.handleOpenGoods(item.goods_id)}
            key={item.goods_id}
            style={{height: imgHeight, top: slideIndex === index ? -10 : 0}}
            className={styles.imgContainer}>
            <img src={item.goods_img} onLoad={() => {
              window.dispatchEvent(new Event('resize'))
              this.setState({imgHeight: 'auto'})
            }}/>

            <div className={styles.pointName}>{item.goods_name}</div>

            {slideIndex === index ? <div className={styles.pointStatus}>{item.status}</div> : ""}
          </div>
        ))}
      </Carousel>

      {
        recommendList.length === 0 ? '' : <div className={styles.recommendArea}>
          <div className={styles.selectedKill}>
            {recommendList.length > 0 && recommendList.map((item) => {
              return <div className={styles.child} onClick={()=>this.handleOpenGoods(item.goods_id)}>
                <div className={styles.img}>
                  <img src={item.goods_img}/>
                </div>
                <div className={styles.childName}>{item.goods_name}</div>
                <div className={styles.childStatus}>{item.status}</div>
                <div className={styles.going}>
                  立即兑换
                </div>

              </div>
            })}
          </div>
        </div>
      }
    </div>
  }

  render() {
    const {spin, activity} = this.props
    const flag = JSON.stringify(activity) === '{}'
    return (
      <Fragment>
        {spin ? '' : flag ? <NoGoods/> : this.renderList()}
        {/*{spin ? <Loading/> : flag ? <NoGoods/> : this.renderList()}*/}
      </Fragment>
    )
  }


}

export default connect(({activity}) => ({...activity}))(Points)
