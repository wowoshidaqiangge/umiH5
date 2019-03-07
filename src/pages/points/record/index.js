import React,{Component} from 'react'
import { List } from 'antd-mobile'
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

  render(){
    const {data} = this.props.record
    let flag = data && data.length>0
    console.log('data',data.length)
    return(<div className={styles.recordContainer}>
        {
          flag? <List className="my-list">
            {
              data && data.length>0? data.map((item,index)=>{
                return <Item multipleLine extra={item.variable_integral} key={index}>
                  {item.content} <Brief>{item.create_time}</Brief>
                </Item>
              }) :void[0]
            }
          </List>: <div className={styles.nothing}>
            <img src={require('../../../assets/img/nothing.png')}/>
          </div>
        }


      </div>
    )
  }
}

export default connect(({record}) => ({record}))(PointRecord)
