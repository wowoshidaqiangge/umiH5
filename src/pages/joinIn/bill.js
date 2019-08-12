import React, {Component} from 'react'
import {Button, Picker, List, Modal} from 'antd-mobile'
import styles from './style/bill.less'
import {connect} from 'dva'
import Link from 'umi/link'
import {Chart, Geom, Axis, Tooltip, Label} from "bizcharts";

const yearStyle = {display: 'inline-block', verticalAlign: 'middle', width: '16px', height: '16px', marginRight: '10px'}

class Bill extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch({type: 'bill/getJoinBill'})
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
    const {dispatch} = this.props
    const params = [];
    dispatch({type: 'bill/returnMoney', payload: params})
    dispatch({type: 'bill/setNum', payload: {num: 1}})
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
    const month = []
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

  show() {
    const show = []
    this.props.bill.costData.map((item) => {
      if (item.money === 0.00) {
        show.push(item)
      }
    })

    if (show.length === this.props.bill.costData) {
      return false
    }
    return true
  }

  cancel() {
  }

  render() {
    const {bill} = this.props
    const {joinMoney, allData, monthData, yearValue, returnFont, costData, num} = bill
    const newCols = {
      sales: {
        tickInterval: 20
      }
    }

    const tooltipsDisplayTpl = `
        <p class="chart-tooptip">
            <span class="chart-tooptip-right">{money}</span>
            <span>{value}</span>
        </p>
    `

    return (
      <div className={styles.bill}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <img src={require('../../assets/img/bill/earn.png')}></img>
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
              <Chart height={240} data={costData} scale={newCols} padding={['20', 'auto', 'auto', 'auto']} forceFit>
                {/* x轴，横轴，以data数据的xAxis属性值为柱子的值 */}
                <Axis name="month" color='pink' grid={null} line={null} tickLine={null}/>
                {/* y轴，纵轴，以data数据的yAxis属性值为柱子的值 */}
                <Axis name="money" field grid={null} label={null}/>
                <Tooltip crosshairs={{type: "y"}} showTitle={false} itemTpl={tooltipsDisplayTpl}/>
                {/* 几何标记对象，主要用以描述你要画的是什么图形（直方图、折线图、饼状图、区域图）：interval是直方图 */}
                <Geom type="interval" position="month*money" color={'#FFBFC9'}>
                  <Label content={this.show() ? 'money' : void[0]}/>
                </Geom>
              </Chart>
            </div>

          </div>

          <div className={styles.month}>

            <div className={styles.title}>
              <div className={styles.left}>本月消费分析</div>
            </div>

            <div className={styles.content}>
              <div className={styles.total}>
                <div className={styles.title}>总消费(元)</div>
                <div className={styles.amount}>{monthData.all_money === null ? 0.00 : monthData.all_money}</div>
              </div>

              <div className={styles.effective}>
                <div className={styles.title}>有效消费(元)</div>
                <div className={styles.amount}>{monthData.eff_money === null ? 0.00 : monthData.eff_money}</div>
              </div>

              <div className={styles.success}>
                <div className={styles.title}>总订单(笔)</div>
                <div className={styles.amount}>{monthData.eff_count === null ? 0 : monthData.eff_count}</div>
              </div>

              <div className={styles.return}>
                <div className={styles.title}>退款(元)</div>
                <div className={styles.amount}>{monthData.refund_money === null ? 0.00 : monthData.refund_money}</div>
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
                <div className={styles.amount}>{allData.all_money === null ? 0.00 : allData.all_money}</div>
              </div>

              <div className={styles.effective}>
                <div className={styles.title}>有效消费(元)</div>
                <div className={styles.amount}>{allData.eff_money === null ? 0.00 : allData.eff_money}</div>
              </div>

              <div className={styles.success}>
                <div className={styles.title}>总订单(笔)</div>
                <div className={styles.amount}>{allData.eff_count === null ? 0 : allData.eff_count}</div>
              </div>

              <div className={styles.return}>
                <div className={styles.title}>退款(元)</div>
                <div className={styles.amount}>{allData.refund_money === null ? 0.00 : allData.refund_money}</div>
              </div>
            </div>
          </div>

          <div className={styles.link}>
            点此了解
            <Link to='joinIn-contract'>《纳品网联盟商合作服务协议》</Link>
          </div>
        </div>
        {
          num === 0 ? void[0] : <div className={styles.button}>
            <Button type="warning" disabled={num !== 1 ? true : false}
                    onClick={() => {
                      if (num === 1) {
                        Modal.alert('退押金', '确定吗?', [
                          {text: '取消', onPress: () => this.cancel(), style: 'default'},
                          {text: '确定', onPress: () => this.returnMoney()},
                        ])
                      }
                    }}>{returnFont}</Button>
          </div>
        }
      </div>
    )
  }
}

export default connect(({bill}) => ({bill}))(Bill)
