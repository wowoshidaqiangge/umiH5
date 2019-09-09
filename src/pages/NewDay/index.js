import React, {Component, Fragment} from 'react'
import {connect} from 'dva'
import {Tabs} from 'antd-mobile'
import 'react-flexible'
// import Loading from "@/components/Loading"
// import NoGoods from "@/components/NoGoods"
import styles from "./index.less";
import {openGoods} from "@/utils/publicMethod";
import NoGoods from "@/components/NoGoods";

class NewDay extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    dispatch({type: 'newDay/newList'})
  }

  handleOpenGoods(goodsId) {
   
    openGoods(goodsId)
  }

  renderContent(goodsList) {
    return <div className={styles.hotList}>
      {goodsList.length > 0 && goodsList.map((item) => {
        return <div key={item.goods_id} className={styles.lineChild}
                    onClick={() => this.handleOpenGoods(item.goods_id)}>
          <div className={styles.lineImg}>
            <img src={item.goods_img}/>
          </div>
          <div className={styles.details}>
            <div className={styles.goodsName} style={{WebkitBoxOrient: "vertical"}}>{item.goods_name}</div>
            <div className={styles.bottomPrice}>
              <div className={styles.leftPrice}>
                <div className={styles.move}>￥{item.goods_price}</div>
                <div className={styles.market}>上新价</div>
              </div>
              <div className={styles.status}>
                {item.status}
              </div>
            </div>
          </div>
        </div>
      })}
    </div>
  }

  changeList(tab) {
    const {dispatch, timeTabs} = this.props
    let newArr = []
    timeTabs.map((item) => {
      if (item.new_id === tab.key) {
        item.is_select = 1
      } else {
        item.is_select = 0
      }
      newArr.push(item)
    })
    dispatch({type: 'newDay/setState', payload: {timeTabs: newArr, goodsList: []}})
    dispatch({type: 'newDay/newGoods', payload: {new_id: tab.key}})
  }

  renderList() {
    const {timeTabs, goodsList} = this.props
    let newArr = []
    timeTabs.length > 0 && timeTabs.map((item) => {
      let newItem = Object.assign({key: item.new_id, is_select: item.is_select}, {
        title:
          <div style={{
            width: '100%',
            backgroundColor: item.is_select === 1 ? "#FFCA10" : '#788E78', textAlign: "center"
          }}>
            <div style={{color: "#fff", fontWeight: 'bold', lineHeight: '1rem', height: '1rem'}}>{item.new_title}</div>
            <div style={{color: "#fff", height: '1rem'}}>{item.new_time}</div>
            {/*<div style={{color: "#fff", fontWeight: 'bold', lineHeight: '1.45rem', height: '50%'}}>{item.new_title}</div>*/}
            {/*<div style={{color: "#fff", height: '50%'}}>{item.new_time}</div>*/}
          </div>
      })
      newArr.push(newItem)
    })

    return <div className={styles.container}>
      <div className={styles.head}/>

      <div className={styles.tabs}>
        <Tabs tabs={newArr}
              swipeable={false}
          // onChange={(tab) => this.changeList(tab)}
              onTabClick={(tab) => this.changeList(tab)}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3}/>}>
          {this.renderContent(goodsList)}
        </Tabs>
      </div>
    </div>
  }

  render() {
    const {spin, timeTabs} = this.props
    const flag = timeTabs.length === 0

    return (
      <Fragment>
        {spin ? '' : flag ? <NoGoods/> : this.renderList()}
        {/*{spin ? <Loading/> : this.renderList()}*/}
      </Fragment>
    )
  }
}

export default connect(({newDay}) => ({...newDay}))(NewDay)
