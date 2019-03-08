import React,{Component} from 'react'
import { List,PullToRefresh } from 'antd-mobile'
import styles from './index.less'
import {connect} from 'dva'
import axios from 'axios'
import sys from '../../../utils/request'

const Item = List.Item
const Brief = Item.Brief

class PointRecord extends Component{
  constructor(props) {
    super(props)
    this.state={
    }
  }

  componentWillMount(){
    this.props.dispatch({type:'record/getIntegralLog',payload:{page:'1'}})
    // const sysParams = sys.sysParams
    // axios.post(sys.api.points.getIntegralLog,sysParams).then((res)=>{
    //   if(res.data.code === '1'){
    //     const dataList = res.data.data.list
    //     this.props.dispatch({type:'record/setState',payload:{dataList:dataList}})
    //   }
    // })
  }

  loadMore(){
    console.log('加载更多')
    const {curPage,allPage} = this.props.record
    let page = parseInt(curPage)
    console.log('加载更多',page <= allPage)
    if(page <= allPage){
      page++
      this.props.dispatch({type:'record/getMoreIntegralLog',payload:{page:page.toString()}})
    }
  }

  render(){
    const {dataList,curPage,allPage,} = this.props.record
    let flag = dataList && dataList.length>0
    console.log('data',dataList,dataList.length,flag,curPage,allPage)
    return(
      <React.Fragment>
        {
          flag?  <div className={styles.recordContainer}>
          <PullToRefresh  direction='up' style={{height:'100%'}}
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
          </List>
          </PullToRefresh>
          </div>
          : <div className={styles.nothing}>
          <img src={require('../../../assets/img/nothing.png')}/>
          </div>
        }

      </React.Fragment>

    )
  }
}

export default connect(({record}) => ({record}))(PointRecord)
