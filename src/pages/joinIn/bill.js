import React, {Component} from 'react'
import {Button, Picker, List} from 'antd-mobile'
import styles from './style/bill.less'
import {connect} from 'dva'
import {Bar} from 'ant-design-pro/lib/Charts'
import Link from 'umi/link'

const yearStyle = {display: 'inline-block', verticalAlign: 'middle', width: '16px', height: '16px', marginRight: '10px'}

class Bill extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const {dispatch} = this.props
    dispatch({type: 'bill/getJoinBill'})
    console.log('return', this.props.bill.returnInfo)
  }

  onChangeYear(year) {
    const {dispatch, bill} = this.props
    const {monthValue} = bill
    let is_next = null
    if (typeof (monthValue) === 'string') {
      is_next = monthValue === '上半年' ? 0 : 1
    } else {
      is_next = monthValue[0] === '上半年' ? 0 : 1
    }
    dispatch({type: 'bill/setYearValue', payload: year})
    let newYear = year[0]
    dispatch({type: 'bill/getMonthBill', payload: {year: newYear, is_next: is_next}})
    this.getNewData()
  }

  onChangeMonth(month) {
    const {dispatch, bill} = this.props
    const {yearValue} = bill
    let str = month[0]
    let isNext = str === '上半年' ? 0 : 1
    let newYear = null
    if (typeof (yearValue) === 'number') {
      newYear = yearValue
    } else {
      newYear = yearValue[0]
    }
    dispatch({type: 'bill/setMonthValue', payload: month})
    dispatch({type: 'bill/getMonthBill', payload: {year: newYear, is_next: isNext}})
  }

  returnMoney() {
    const params = [];
    this.props.dispatch({type: 'bill/returnMoney', payload: params})
  }

  getNewData() {
    //重新放入图表数据,后台得到的是month,money,图表要求是x,y
    const {costData} = this.props.bill
    let data = []
    costData && costData.map((item) => {
      data.push({x: item.month, y: item.money})
    })
    return data
  }

  years() {
    const {dayConsume} = this.props.bill
    const years = []
    dayConsume && dayConsume.map((item) => {
      years.push({label: (<div key={item}><span style={{...yearStyle}}/><span>{item}</span></div>), value: item})
    })
    return years
  }

  month() {
    const {nextMonth} = this.props.bill
    const month = [
      // {label: (<div key= '3'><span style={{ ...yearStyle }}/><span>上半年</span></div>), value: '上半年',},
      // {label: (<div key= '2'><span style={{ ...yearStyle}}/><span>下半年</span></div>), value: '下半年',},
    ]

    nextMonth && nextMonth.map((item, index) => {
      let value = item
      month.push({label: (<div key={index}><span style={{...yearStyle}}/><span>{item}</span></div>), value: item})
    })
    return month
  }

  newMonthValue() {
    let newMonthValue = []
    newMonthValue.push(this.props.bill.monthValue)
    return newMonthValue
  }

  render() {
    const {bill} = this.props
    const {joinMoney, allData, monthData, yearValue, returnInfo} = bill
    const num = returnInfo.is_return
    console.log(typeof (monthData.refund_money),'rrrr')

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
                  <Picker data={this.years()} value={yearValue} cols={1} onChange={(year) => this.onChangeYear(year)}>
                    <List.Item>{yearValue}年</List.Item>
                  </Picker>
                  <img src={require('../../assets/img/bill/down.png')}></img>
                </div>


                <div className={styles.picker}>
                  <Picker data={this.month()} value={this.newMonthValue()} cols={1}
                          onChange={(month) => this.onChangeMonth(month)}>
                    <List.Item>{this.newMonthValue()}</List.Item>
                  </Picker>
                  <img src={require('../../assets/img/bill/down.png')}></img>
                </div>
              </div>

            </div>

            <div className={styles.bar}>
              <Bar autoLabel
                   height={200}
                // title="￥"
                   data={this.getNewData()}
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
                <div className={styles.amount}>{monthData.all_money === null ? 0.00:monthData.all_money}</div>
              </div>

              <div className={styles.effective}>
                <div className={styles.title}>有效消费(元)</div>
                <div className={styles.amount}>{monthData.eff_money ===null ? 0.00: monthData.eff_money}</div>
              </div>

              <div className={styles.success}>
                <div className={styles.title}>成功订单(笔)</div>
                <div className={styles.amount}>{monthData.eff_count === null ? 0: monthData.eff_count}</div>
              </div>

              <div className={styles.return}>
                <div className={styles.title}>退款(元)</div>
                <div className={styles.amount}>{monthData.refund_money === null ? 0.00 :monthData.refund_money}</div>
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
                <div className={styles.amount}>{allData.all_money === null ? 0.00:allData.all_money}</div>
              </div>

              <div className={styles.effective}>
                <div className={styles.title}>有效消费(元)</div>
                <div className={styles.amount}>{allData.eff_money === null ? 0.00: allData.eff_money}</div>
              </div>

              <div className={styles.success}>
                <div className={styles.title}>成功订单(笔)</div>
                <div className={styles.amount}>{allData.eff_count === null ? 0 : allData.eff_count}</div>
              </div>

              <div className={styles.return}>
                <div className={styles.title}>退款(元)</div>
                <div className={styles.amount}>{allData.refund_money === null ? 0.00: allData.refund_money}</div>
              </div>

            </div>

          </div>

          <div className={styles.link}>
            点此了解 <Link to='joinIn-contract'>《纳品网加盟商合作服务协议》</Link>
          </div>
        </div>

        {
          num === 0 ? void[0] : (num === 1 ? <div className={styles.button}>
              <Button type="warning" onClick={() => this.returnMoney()}>{returnInfo.return_font}</Button></div> :
            (num === 3 ? <div className={styles.button}><Button type="warning">{returnInfo.return_font}</Button></div> :
              (num === 4 ? <div className={styles.button}><Button type="warning">{returnInfo.return_font}</Button>
              </div> : void[0])))
        }

      </div>
    )
  }
}

export default connect(({bill}) => ({bill}))(Bill)
