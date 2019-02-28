import React, {Component} from 'react'
import {Button,Picker,List,Toast} from 'antd-mobile'
import styles from './index.less'
// import axios from 'axios'
import {connect} from 'dva'
import { Bar } from 'ant-design-pro/lib/Charts'
// import {api,request} from '../../utils/request'

class Bill extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  // console.log('sssssssssssssssssss2',this.props.location.search)

  componentWillMount(){
    const {dispatch} = this.props
    dispatch({type:'bill/getJoinBill'})
  }

  onChangeYear (year) {
    const {dispatch,bill} = this.props
    const{monthValue} = bill
    let is_next = monthValue==='上半年'? 0 :1
    dispatch({type:'bill/setYearValue',payload:year})
    dispatch({type:'bill/getMonthBill',payload:{year:year,is_next:is_next}})
  }

  onChangeMonth(month){
    console.log('mmmm',month)
    const {dispatch,bill} = this.props
    // const{yearValue} = bill
    dispatch({type:'bill/setMonthValue',payload:month})
    // dispatch({type:'bill/getMonthBill',payload:{year:yearValue,is_next:month}})
  }

  seeServiceContract(){
    console.log('跳转服务协议页面')
  }

  returnMoney(){
    const params = [];
    this.props.dispatch({type:'bill/returnMoney',payload:params})
  }

  render() {
    const{history,bill} = this.props
    const {costData,joinMoney,allData,monthData,dayConsume,nextMonth,yearValue, monthValue} = bill
    console.log('cccc', nextMonth,dayConsume,monthValue)

    //重新放入图表数据,后台得到的是month,money,图表要求是x,y
    let data = []
    costData && costData.map((item)=>{
      data.push({x:item.month,y:item.money})
    })

    const yearStyle = {display: 'inline-block', verticalAlign: 'middle', width: '16px', height: '16px', marginRight: '10px',}

    const years= [
      {label: (<div key= '2'><span style={{ ...yearStyle}}/><span>2018</span></div>), value: 2018,},
    ];

    dayConsume && dayConsume.map((item)=>{
      years.push({label: (<div key= {item}><span style={{ ...yearStyle }}/><span>{item}</span></div>), value: item})
    })


    // const month = [
    //   // {label: (<div key= '下半年'><span style={{ ...yearStyle}}/><span>下半年</span></div>), value:'下半年',},
    // ]

    const month = [
      {label: (<div key= '0'><span style={{ ...yearStyle }}/><span>上半年</span></div>), value: '0',},
      {label: (<div key= '1'><span style={{ ...yearStyle}}/><span>下半年</span></div>), value: '1',},
    ];

    // nextMonth && nextMonth.map((item,index)=>{
    //   let value = item
    //   month.push({label: (<div key= {item}><span style={{ ...yearStyle }}/><span>{item}</span></div>), value: item})
    // })

    console.log('month',month)


    return (
      <div className={styles.bill}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <img src={require('../../assets/img/bill/join-banner.png')}></img>
            <div className={styles.headerBottom}>
              <div className={styles.pay}>{joinMoney}</div>
              <div className={styles.payInfo}>已缴纳的保证金(元)</div>
            </div>
          </div>

          <div className={styles.shopping}>
            <div className={styles.title}>
              <div className={styles.left}>购物消费趋势</div>
              <div className={styles.right}>

                <div className={styles.picker}>
                  <Picker data={years} value={yearValue} cols={1} onChange={(year)=>this.onChangeYear(year)}>
                    <List.Item>{yearValue}年</List.Item>
                  </Picker>
                  <img src={require('../../assets/img/bill/down.png')}></img>
                </div>

                <div className={styles.picker}>
                  <Picker data={month} value={monthValue} cols={1} onChange={(month)=>this.onChangeMonth(month)}>
                    <List.Item >{monthValue}</List.Item>
                  </Picker>
                  <img src={require('../../assets/img/bill/down.png')}></img>
                </div>

              </div>

            </div>

            <div className={styles.bar}>
              <Bar autoLabel
                height={200}
                title="￥"
                data={data}
                color='#FFBFC9'
              />

            </div>

          </div>

          <div className={styles.month}>
            <div className={styles.title}>
              <div className={styles.left}>本月消费分析</div>
            </div>
            <div className={styles.content}>

              <div className={styles.total}>
                <div className={styles.title}>总消费(元)</div>
                <div className={styles.amount}>{monthData.all_money}</div>
              </div>

              <div className={styles.effective}>
                <div className={styles.title} >有效消费(元)</div>
                <div className={styles.amount}>{monthData.eff_money}</div>
              </div>

              <div className={styles.success}>
                <div className={styles.title} >成功订单(笔)</div>
                <div className={styles.amount}>{monthData.eff_count}</div>
              </div>

              <div className={styles.return}>
                <div className={styles.title}>退款(元)</div>
                <div className={styles.amount}>{monthData.refund_money}</div>
              </div>
            </div>


          </div>

          <div className={styles.wholeCost}>
            <div className={styles.title}>
              <div className={styles.left}>总消费分析</div>
            </div>

            <div className={styles.content}>

              <div className={styles.total}>
                <div className={styles.title}>总消费(元)</div>
                <div className={styles.amount}>{allData.all_money}</div>
              </div>

              <div className={styles.effective}>
                <div className={styles.title} >有效消费(元)</div>
                <div className={styles.amount}>{allData.eff_money}</div>
              </div>

              <div className={styles.success}>
                <div className={styles.title} >成功订单(笔)</div>
                <div className={styles.amount}>{allData.eff_count}</div>
              </div>

              <div className={styles.return}>
                <div className={styles.title}>退款(元)</div>
                <div className={styles.amount}>{allData.refund_money}</div>
              </div>


            </div>

          </div>

          <div className={styles.link} onClick={()=>this.seeServiceContract()}>
            点此了解 <a href='#'>《纳品网加盟商合作服务协议》</a>
          </div>
        </div>


        <div>
          <Button type="warning"  onClick={()=>this.returnMoney()}
                  style={{backgroundColor: '#FF7878', borderRadius: '0px'}}>
            申请退还押金
          </Button>
        </div>

      </div>
    )
  }
}

export default connect(({bill}) => ({bill}))(Bill)
