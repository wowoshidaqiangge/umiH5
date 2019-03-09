import React, {Component} from 'react'
import {List, PullToRefresh} from 'antd-mobile'
import styles from './index.less'
import {connect} from 'dva'

const Item = List.Item
const Brief = Item.Brief

class PointRecord extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.dispatch({type: 'record/getIntegralLog', payload: {page: '1'}})
  }

  loadMore() {
    const {curPage, allPage} = this.props.record
    let page = parseInt(curPage)
    if (page <= allPage) {
      page++
      this.props.dispatch({type: 'record/getMoreIntegralLog', payload: {page: page.toString()}})
    }
  }

  render() {
    const {dataList, curPage, allPage,} = this.props.record
    let flag = dataList && dataList.length > 0
    return (
      <React.Fragment>
        {
          flag ? <PullToRefresh direction='up' style={{height: '100%',backgroundColor:'rgb(240,240,240)'}}
                                distanceToRefresh={25} onRefresh={() => this.loadMore()}
                                damping={100} >
              <div className={styles.recordContainer}>
                <List className="my-list">
                  {
                    dataList && dataList.length > 0 ? dataList.map((item, index) => {
                      return <Item multipleLine extra={item.variable_integral} key={index}>
                        {item.content} <Brief>{item.create_time}</Brief>
                      </Item>
                    }) : void[0]
                  }
                </List>
              </div>
            </PullToRefresh>
            : <div className={styles.nothing}>
              <img src={require('../../../assets/img/nothing.png')}/>
              <div>您暂时还没有积分消费记录</div>
            </div>
        }
      </React.Fragment>
    )
  }
}

export default connect(({record}) => ({record}))(PointRecord)
