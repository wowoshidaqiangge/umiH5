import React, {Component} from 'react'
import styles from './style/contract.less'
import {Modal,TextArea} from 'antd-mobile'
import {connect} from 'dva'
import moment from 'moment'
import $ from 'jquery'

class Contract extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal:false,
      disabled: false, //没有绘制的时候禁用保存按钮
    }
  }


  componentWillMount() {
    this.props.dispatch({type: 'contract/getJoinIn'})
  }

  render() {
    const {contract} = this.props
    const {endTime,joinMoney, signImage, signTime, startTime, name, year, addr, phone,isJoin} = contract
    const getImg = signImage && signImage.length > 0 ? require(signImage) : void[0];
    // console.log('canshu',this.props.query)
    const startValue = isJoin != 0
    const endValue = isJoin !=0
    return (
      <div className={styles.contract}>
        <div className={styles.title}>供应链战略合作协议</div>
        {/*<div className={styles.content}>*/}
        <p className={styles.content}>
          根据《中华人民共和国合同法》及其他相关法律的规定，双方在平等、自愿、公平和诚信的基础上，经甲乙双方友好协商，就入驻纳品网平台相关合作事宜，
          甲方与乙方结成“互惠互利，共同发展”的战略合作关系，订立本协议， 达成合作协议。协议内容如下:<br/>
          1. 甲方为乙方提供纳品网平台货源，乙方需一次性向纳品网平台缴纳 {joinMoney} 元保证金。<br/>

          2. 乙方单笔进货款 5 万元以下含五万元，从线上“纳品网 app 平台”直接进货。单笔进货金额大于 5 万元，需联系甲方指定人员线下进货。<br/>
          3. 合作期内，乙方在纳品网平台线上线下进货金额大于 100 万元（壹佰万元整），可向纳品网平台提出申请，甲方将在30 个工作日内退回乙方所缴纳的保证金 {joinMoney} 元。<br/>

          4. 合作期内，甲方为乙方提供纳品网平台所供货品 100%包退换服务支持（人为原因损坏的除外）且乙方市场定价不得超出纳品网平台进货价 1.3 倍。<br/>
          5. 乙方进货价按照平台价格九折结算。<br/>

          6. 纳品网 APP 平台所有上架商品展现价格，均为不含税价。如乙方需要开发票，需额外承担 8%税点。<br/>
          7. 除次品退货以外的运费，均由乙方承担。<br/>
          二、协议的续签与解除<br/>
          1. 平台入驻合作期为{startValue ? year : <input className={styles.timeFill} readOnly/>}年，
          自 {startValue ? startTime.year : <input className={styles.timeFill} maxLength="4" readOnly/>}年
          {startValue ? startTime.month : <input className={styles.timeFill} maxLength="2" readOnly/>}月
          {startValue ? startTime.day : <input className={styles.timeFill} maxLength="2" readOnly/>}日 至
          {endValue ? endTime.year : <input className={styles.timeFill} maxLength="4" readOnly/>}年
          {endValue ? endTime.month : <input className={styles.timeFill} maxLength="2" readOnly/>}月
          {endValue ? endTime.day : <input className={styles.timeFill} maxLength="2" readOnly/>}日，未退回的保证金予以退回。<br/>
          2. 如有续签意向，应在合同到期前一个月内完成申请及续签合同相关工作，保证金未退回的，可以于续签的合同自动生效。保证金已经退回的，需要重新缴纳。<br/>
          3. 如遇不可抗力因素，包括但不限于自然灾害、战争、公司倒闭或者破产等。协议自然解除，双方互不承担责任。<br/>
          4. 甲乙双方如对协议条款规定的理解有异议，或者对与协议有关的事项发生争议，双方应本着友好合作的精神进行协商。如协商不能解决的，任何一方可向甲方所在地的法院诉讼。<br/>
          三、其他<br/>
          1、本协议一式两份，甲乙双方各执一份，均具有同等法律效力；<br/>
          2、本协议未尽事宜，由甲乙双方协商后产生书面文件，作为本协议的补充条款，具备与本协议同等法律效力；<br/>
          3、对本协议内容的任何修改和变更需要用书面形式，并经双方确认后生效；<br/>
          4、本协议自签订之日起生效；<br/> 以下无正文<br/>
        </p>

        {/*</div>*/}

        <div className={styles.footer}>
          <div className={styles.firstPart}>
            <div>甲方:杭州蓝后网络科技有限公司</div>
            <div className={styles.address}>联系地址:杭州经济技术开发区下沙街道金乔街583号金湾创业大厦二区五幢722室</div>
            <div>联系电话:13336069956</div>
            <div>甲方代表签字/盖章:</div>
            {/*<img style= {{width:'40%'}}src= {require('../../assets/img/NPW.png')}/>*/}
            <div>日期:{signTime}</div>
          </div>

          <div className={styles.secondPart}>
            <div>乙方:{name}</div>
            <div className={styles.address}>联系地址:{addr}</div>
            <div>联系电话:{phone}</div>
            <div>乙方代表签字/盖章:{name}
            </div>
            <div>日期:{signTime}</div>
          </div>
        </div>

      </div>
    )
  }

}



export default connect(({contract}) => ({contract}))(Contract)
