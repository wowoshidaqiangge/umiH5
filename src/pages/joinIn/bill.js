import React, {Component} from 'react'
import {Button,Picker,List,Toast} from 'antd-mobile'
import styles from './index.less'
import axios from 'axios'
import {connect} from 'dva'
import { Bar } from 'ant-design-pro/lib/Charts';
import {api,request} from '../../utils/request'

const salesData = [{x: "1月", y: 38},
  {x: "2月", y: 52},
  {x: "3月",y: 61},
  {x: "4月",y: 145},
  {x: "5月", y: 48},
  {x: "6月", y: 38}];

class Bill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yearPicker:false,
      monthPicker:false,
      defaultYear:'2019',
      yearArr:['2019','2018','2017','2016'],
      yearValue: ['2019'],
      monthValue: ['上半年'],
      monthArr:['2019','2018','2017','2016'],
    }
  }

  componentWillMount(){
    const {dispatch} = this.props
    const params = {'time': new Date().getTime()}
    dispatch({type:'bill/getJoinBill', payload:params})
    console.log('sssssssssssssssssss2',this.props.location.search)
  }

  onChangeYear (year) {
    this.setState({
      yearValue: year,
    });
  };

  onChangeMonth(month){
    this.setState({monthValue:month})
  }



  returnMoney(){
    const params = [];
    this.props.dispatch({type:'bill/returnMoney',payload:params})

    // console.log(api);
    // const res = request(api.join.return,params);
    // console.log(res);
    // if(res && res.code==1){

    // }
    // console.log(res);
  }

  seeContract(){
    const {history,bill} = this.props
    history.push('contract')
  }

  render() {
    const{monthValue,yearValue} = this.state
    const{history,bill} = this.props
    const {costData} = bill
    console.log('cccc',bill,costData)

    const yearStyle = {
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '16px',
      height: '16px',
      marginRight: '10px',
    };
    const years= [
      {label: (<div key= '2019'><span style={{ ...yearStyle }}/><span>2019</span></div>), value: '2019',},
      {label: (<div key= '2018'><span style={{ ...yearStyle}}/><span>2018</span></div>), value: '2018',},
      {label: (<div key= '2017'><span style={{ ...yearStyle }}/><span>2017</span></div>), value: '2017',
      },
    ];

    const month = [
      {label: (<div key= '0'><span style={{ ...yearStyle }}/><span>上半年</span></div>), value: '上半年',},
      {label: (<div key= '1'><span style={{ ...yearStyle}}/><span>下半年</span></div>), value: '下半年',},
    ];

    return (
      <div className={styles.bill}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <img src={require('../../assets/img/bill/join-banner.png')}></img>
            <div className={styles.headerBottom}>
              <div className={styles.pay}>20000</div>
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
                title="￥20000.00"
                data={salesData}
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
                <div className={styles.amount}>128234.00</div>
              </div>

              <div className={styles.effective}>
                <div className={styles.title} >有效消费(元)</div>
                <div className={styles.amount}>128234.00</div>
              </div>

              <div className={styles.success}>
                <div className={styles.title} >成功订单(笔)</div>
                <div className={styles.amount}>3</div>
              </div>

              <div className={styles.return}>
                <div className={styles.title}>退款(元)</div>
                <div className={styles.amount}>158.00</div>
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
                <div className={styles.amount}>128234.00</div>
              </div>

              <div className={styles.effective}>
                <div className={styles.title} >有效消费(元)</div>
                <div className={styles.amount}>128234.00</div>
              </div>

              <div className={styles.success}>
                <div className={styles.title} >成功订单(笔)</div>
                <div className={styles.amount}>3</div>
              </div>

              <div className={styles.return}>
                <div className={styles.title}>退款(元)</div>
                <div className={styles.amount}>158.00</div>
              </div>


            </div>

          </div>

          <div className={styles.link} onClick={()=>this.seeContract()}>
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
