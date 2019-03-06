import React,{Component} from 'react'
import { List } from 'antd-mobile'
import styles from './index.less'

const Item = List.Item
const Brief = Item.Brief

export default class PointRecord extends Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  render(){
    return(<div className={styles.recordContainer}>
        <List className="my-list">
          <Item multipleLine extra="+50">
            商品兑换 <Brief>2018-07-07&nbsp;&nbsp;10:44:56</Brief>
          </Item>
          <Item multipleLine extra="+50">
            商品兑换 <Brief>2018-07-07&nbsp;&nbsp;10:44:56</Brief>
          </Item>
          <Item multipleLine extra="+50">
            商品兑换 <Brief>2018-07-07&nbsp;&nbsp;10:44:56</Brief>
          </Item><Item multipleLine extra="+50">
          商品兑换 <Brief>2018-07-07&nbsp;&nbsp;10:44:56</Brief>
        </Item>

        </List>

      </div>
    )
  }

}
