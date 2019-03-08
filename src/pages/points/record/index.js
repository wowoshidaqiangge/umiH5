import React,{Component} from 'react'
import { List,PullToRefresh } from 'antd-mobile'

import styles from './index.less'
import {connect} from 'dva'

const Item = List.Item
const Brief = Item.Brief

class PointRecord extends Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }

  componentWillMount(){
    console.log('oooooooooo')
    this.props.dispatch({type:'record/getIntegralLog'})
  }

  loadMore(){
    console.log('加载更多')
  }

  render(){
    const {dataList} = this.props.record
    let flag = dataList && dataList.length>0
    console.log('data',dataList,dataList.length,flag)
    return(<div className={styles.recordContainer}>
        {
          flag?
            <PullToRefresh  direction='up'
                            distanceToRefresh={25}  onRefresh={()=>this.loadMore()}
                            damping={100}>
              <List className="my-list">
                {
                  dataList && dataList.length>0? dataList.map((item,index)=>{
                    return <Item multipleLine extra={item.variable_integral} key={index}>
                      {item.content} <Brief>{item.create_time}</Brief>
                    </Item>
                  }) :void[0]
                }

                <Item multipleLine extra="extra content">
                  Title <Brief>subtitle</Brief>
                </Item>

                <Item multipleLine extra="extra content">
                  Title <Brief>subtitle</Brief>
                </Item>

                <Item multipleLine extra="extra content">
                  Title <Brief>subtitle</Brief>
                </Item>

                <Item multipleLine extra="extra content">
                  Title <Brief>subtitle</Brief>
                </Item>

              </List>
            </PullToRefresh>
         : <div className={styles.nothing}>
            <img src={require('../../../assets/img/nothing.png')}/>
          </div>
        }


      </div>
    )
  }
}

export default connect(({record}) => ({record}))(PointRecord)
