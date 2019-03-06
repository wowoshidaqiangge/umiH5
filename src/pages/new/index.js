import React, {Component} from 'react'
import styles from './index.less'
import {Tabs, WhiteSpace} from 'antd-mobile'
import {connect} from 'dva'


class New extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const {dispatch} = this.props
    dispatch({type: 'dayNew/getDayNew',callback:()=>{ this.getDayGoodList()}})
  }

  getDayGoodList(){
    const {newId} = this.props.dayNew
    console.log('nnnnnnnnnnnnnnnnnnnnnnnnn',newId)
    this.props.dispatch({type: 'dayNew/getDayGoodList', payload: {new_id: newId, page: 1}})
  }

  buyGoods(item){
    console.log('item',item)

  }


  renderContent(goodsList) {
    return <div>
      {goodsList.map((item, index) => {
        return <div key={index}
                    style={{display: 'flex', marginTop: '20px', height: '40vw', backgroundColor: '#fff', borderRadius: '8px 8px 0 0 '}}>
          <div style={{flex: 4, textAlign: 'center', lineHeight: '40vw'}}>
            <img style={{width: '80%', height: '80%'}} src={item.thum_img}/>
          </div>
          <div style={{flex: 5,marginRight:'15px',paddingTop:'5vw'}}>
            <p style={{fontSize: '15px', color: 'rgb(51, 51, 51)', height: '12vw', lineHeight: '6vw'}}>
              {item.good_name}
            </p>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <div style={{fontSize: '18px', color: ' #ff4c50', textDecoration: 'none'}}>￥{item.sell_price}</div>
                <div style={{textDecoration: 'line-through'}}>￥{item.market_price}</div>
              </div>
              <button style={{background: 'linear-gradient(#59057B,#AB0E86)',border:'none',height:'9vw',
                borderRadius:'2vw',color:'#fff',width:'20vw'}} onClick={()=>this.buyGoods(item)}>立即购</button>
            </div>
          </div>
        </div>
      })}
    </div>
  }

  changePage(tab,index) {
    // console.log('onTabClick', index,tab);
    // this.props.dispatch({type: 'dayNew/changePage', payload:{newId:tab.new_id,page:index},callback:()=>{ this.getDayGoodList()}});
    // console.log(this.props.dayNew);
    this.props.dispatch({type:'dayNew/setState',payload:{newId:tab.new_id,page:index}})
    this.props.dispatch({type:'dayNew/updateGoodsList',payload:{new_id:tab.new_id,page:1}})
    // this.getDayGoodList()
  }

  render() {
    const {tabs, page, goodsList,newId} = this.props.dayNew
    const newTabs = []
    tabs && tabs.length > 0 ? tabs.map((item) => {
      newTabs.push({title: <div>
          <div style={{lineHeight:'20px'}}>{item.start_day}</div>
          <div style={{fontSize:'15px',lineHeight:'15px',marginTop:'8px',textAlign:'center'}}>{item.start_hour}</div>
        </div>, ...item})
    }) : void[0]

    return (
      <div className={styles.newContainer}>
        <img src={require('../../assets/img/new/banner.png')}/>
        <div className={styles.tabs}>
          <Tabs tabs={newTabs} page={page}
                onTabClick={(tab, index) => this.changePage(tab,index)}
                renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3}/>}>
            {this.renderContent(goodsList)}
          </Tabs>
        </div>
      </div>
    )
  }
}

export default connect(({dayNew}) => ({dayNew}))(New)
