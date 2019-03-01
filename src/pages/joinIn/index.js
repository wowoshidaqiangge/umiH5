import React, {Component} from 'react'
import {Button, List, InputItem, Checkbox, Toast} from "antd-mobile"
import {createForm} from 'rc-form'
import styles from './style/join.less'
import {connect} from 'dva'
import Link from 'umi/link'
import {routerRedux} from 'dva/router'

const AgreeItem = Checkbox.AgreeItem

const localParams = JSON.parse(localStorage.getItem('params'))

class JoinInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,   //是否已经阅读合同协议
      disabled: false  //按钮是否被禁用
    }
  }
  componentWillMount() {
    const {dispatch} = this.props
    dispatch({type: 'getJoin/getJoinIn'})
  }
  handleConfirm() {
    const {validateFields,getFieldsValue} = this.props.form
    if (this.state.checked) {
      validateFields({force:true},(error)=>{
        if(!error){
          this.setState({disabled:true})
          let params = {
            name:getFieldsValue().name,
            addr:getFieldsValue().address,
            phone:getFieldsValue().phone,
            card:getFieldsValue().ID,
            company:getFieldsValue().companyName
          };
          localStorage.removeItem('params')
          // this.props.form.restFields()
          getApp(params,this.props.getJoin.joinMoney)
        }else{
          Toast.info('请将信息填写完整')
        }
      })
    } else {
      Toast.info('请仔细阅读并同意《纳品网加盟合作服务协议》', 3)
    }
  }

  checkName(rule, value, callback) {
    if (value && value.trim().length < 0) {
      callback(new Error('请输入姓名'))
    } else {
      callback()
    }
  }

  checkId(rule, value, callback) {
    const id = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (value && !(id.test(value))) {
      callback(new Error('身份证格式错误'))
    } else {
      callback()
    }
  }

  checkPhone(rule, value, callback) {
    if (value && !(/^1[34578]\d{9}$/.test(value))) {
      callback(new Error('手机号码格式错误'))
    } else {
      callback()
    }
  }

  checkCompanyName(rule, value, callback) {
    if (value && value.trim().length < 0) {
      callback(new Error('请输入姓名'))
    } else {
      callback()
    }
  }

  checkAddress(rule, value, callback) {
    if (value && value.trim().length < 0) {
      callback(new Error('请输入联系地址'))
    } else {
      callback()
    }
  }

  goContract() {
    const {validateFields, getFieldsValue} = this.props.form
    this.props.history.push('/joinIn-contract')
    // let params = {
    //   name:getFieldsValue().name,
    //   addr:getFieldsValue().address,
    //   phone:getFieldsValue().phone,
    //   card:getFieldsValue().ID,
    //   companyName:getFieldsValue().companyName,
    // }
    // localStorage.setItem('params',JSON.stringify(params))
  }


  render() {
    const {form} = this.props;
    const {disabled} = this.state;
    const {getFieldProps, getFieldError} = form;
    const getMoney = '￥' + this.props.getJoin.joinMoney;
    return (
      <div className={styles.joinInfo}>
        <div>
          <form>
            <List>
              <InputItem {...getFieldProps('name', {
                initialValue: localParams && localParams.name ? localParams.name : void(0),
                rules: [{required: true, message: '请输入姓名'}, {
                  validator: (rule, value, callback) => {
                    this.checkName(rule, value, callback)
                  }
                }]
              })} error={!!getFieldError('name')} maxLength={20}>姓名:</InputItem>

              <InputItem {...getFieldProps('ID', {
                initialValue: localParams && localParams.card ? localParams.card : void(0),
                rules: [{required: true}, {validator: (rule, value, callback) => this.checkId(rule, value, callback)}]
              })} error={!!getFieldError('ID')}>身份证:</InputItem>

              <InputItem {...getFieldProps('companyName', {
                initialValue: localParams && localParams.companyName ? localParams.companyName : void(0),
                rules: [{required: true}, {validator: (rule, value, callback) => this.checkCompanyName(rule, value, callback)}]
              })} error={!!getFieldError('companyName')}>公司名称:</InputItem>


              <InputItem {...getFieldProps('phone', {
                initialValue: localParams && localParams.phone ? localParams.phone : void(0),
                rules: [{required: true}, {validator: (rule, value, callback) => this.checkPhone(rule, value, callback)}]
              })} error={!!getFieldError('phone')}>联系电话:</InputItem>

              <InputItem {...getFieldProps('address', {
                initialValue: localParams && localParams.addr ? localParams.addr : void(0),
                rules: [{required: true}, {validator: (rule, value, callback) => this.checkAddress(rule, value, callback)}]
              })} error={!!getFieldError('address')}>联系地址:</InputItem>

              <div style={{justifyContent: 'space-between', display: 'flex'}}>
                <div style={{fontSize: '17px', paddingLeft: '15px', lineHeight: '44px', color: '#000'}}>保证金:</div>
                <div><InputItem disabled={true} style={{color: 'red', textAlign: 'right'}} {...getFieldProps('money', {
                  initialValue: getMoney
                })} >
                </InputItem></div>
              </div>
            </List>
          </form>

          <div className={styles.href}>
            <AgreeItem key={'ture'} style={{fontSize: '11px'}}
                       onChange={() => this.setState({checked: true})}>
            </AgreeItem>
            <div style={{display: 'flex', lineHeight: '35px'}}>
              <div className={styles.read}>请仔细阅读并同意</div>
              <div className={styles.contract} onClick={() => this.goContract()}>《纳品网加盟合作服务协议》</div>
            </div>
          </div>

          <div className={styles.button}>
            <Button type={'primary'} onClick={() => this.handleConfirm()} disabled={disabled}>确认</Button>
          </div>


        </div>

      </div>
    )
  }
}

function getClient() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isIos = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return 1;
  } else if (isIos) {
    return 0;
  }
}

function getApp(params, money) {
  let client = getClient();
  // var params = {"name":"123","company":"","phone":"18782559175","addr":"张三李四王麻子","card":"123456789789789"};
  params = JSON.stringify(params);
  let newMoney = ''+money;
  if(client){

    //安卓
    try {
      window.android.joinMerchant(params, newMoney);
    } catch (e) {
      // alert("安卓 this is error ");
      console.log(e)
    }
  } else {
    //IOS
    try {
      window.webkit.messageHandlers.joinMerchant.postMessage
      ({"join_info": params, "money": money})
      // window.webkit.messageHandlers.JAMS__mark.postMessage(params)
    } catch (e) {
      // alert("IOS this is error ");
      console.log(e)
    }
  }
}


JoinInfo = createForm()(JoinInfo)
export default connect(({getJoin}) => ({getJoin}))(JoinInfo)
