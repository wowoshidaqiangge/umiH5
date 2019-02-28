import React, {Component} from 'react'
import {Button, List, InputItem, Checkbox, Toast} from "antd-mobile"
import {createForm} from 'rc-form'
import styles from './index.less'
import {connect} from 'dva'
import Link from 'umi/link'

const AgreeItem = Checkbox.AgreeItem;

class JoinInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  handleConfirm() {
    const {validateFields,getFieldsValue} = this.props.form
    if (this.state.checked) {
      validateFields({force:true},(error)=>{
        if(!error){
          let params = {
            name:getFieldsValue().name,
            addr:getFieldsValue().address,
            phone:getFieldsValue().phone,
            card:getFieldsValue().ID
          }
          getApp(params, this.props.location.query)
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
    }else{
      callback()
    }
  }

  checkId(rule, value, callback) {
    const id = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (value && !(id.test(value))) {
      callback(new Error('身份证格式错误'))
    }else{
      callback()
    }
  }

  checkPhone(rule, value, callback) {
    if (value && !(/^1[34578]\d{9}$/.test(value))) {
      callback(new Error('手机号码格式错误'))
    }else{
      callback()
    }
  }

  checkCompanyName(rule, value, callback) {
    if (value && value.trim().length < 0) {
      callback(new Error('请输入姓名'))
    }else{
      callback()
    }
  }

  checkAddress(rule, value, callback) {
    if (value && value.trim().length < 0) {
      callback(new Error('请输入联系地址'))
    }else{
      callback()
    }
  }

  render() {
    const {form} = this.props
    const {getFieldProps, getFieldError} = form
    return (
      <div className={styles.joinInfo}>
        <form>
          <List>
            <InputItem {...getFieldProps('name', {
              rules: [{required: true,message:'请输入姓名'}, {
                validator: (rule, value, callback) => {
                  this.checkName(rule, value, callback)
                }
              }]
            })} error={!!getFieldError('name')} maxLength={20}>姓名:</InputItem>

            <InputItem {...getFieldProps('ID', {
              rules: [{required: true}, {validator: (rule, value, callback) => this.checkId(rule, value, callback)}]
            })} error={!!getFieldError('ID')}>身份证:</InputItem>

            <InputItem {...getFieldProps('companyName', {
              rules: [{required: true}, {validator: (rule, value, callback) => this.checkCompanyName(rule, value, callback)}]
            })} error={!!getFieldError('companyName')}>公司名称:</InputItem>


            <InputItem {...getFieldProps('phone', {
              rules: [{required: true}, {validator: (rule, value, callback) => this.checkPhone(rule, value, callback)}]
            })} error={!!getFieldError('phone')}>联系电话:</InputItem>

            <InputItem {...getFieldProps('address', {
              rules: [{required: true}, {validator: (rule, value, callback) => this.checkAddress(rule, value, callback)}]
            })} error={!!getFieldError('address')}>联系地址:</InputItem>

            <div style={{justifyContent: 'space-between', display: 'flex'}}>
              <div style={{fontSize: '17px', paddingLeft: '15px', lineHeight: '44px',color:'#000'}}>保证金:</div>
              <div><InputItem disabled={true} style={{color: 'red', textAlign: 'right'}} {...getFieldProps('money', {
                initialValue: '￥20000.00'
              })} >
              </InputItem></div>
            </div>
          </List>
        </form>

        <div className={styles.href}>
          <AgreeItem key={'ture'} style={{fontSize: '11px'}}
                     onChange={() => this.setState({checked: true})}>
            <span className={styles.read}>请仔细阅读并同意</span>
            <Link to='joinIn-contract'>《纳品网加盟合作服务协议》</Link>
          </AgreeItem>
        </div>

        <div className={styles.button}>
          <Button type={'primary'} onClick={() => this.handleConfirm()}>确认</Button>
        </div>
      </div>
    )
  }
}
function getClient(){
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isIos = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isAndroid){
    return 1;
  }else if(isIos){
    return 0;
  }
}

function getApp(params,money) {
  var client = getClient();
  // var params = {"name":"123","company":"","phone":"18782559175","addr":"张三李四王麻子","card":"123456789789789"};
  params = JSON.stringify(params);
  // var money = "2000";
  if(client){
    //安卓
    try {
      window.android.joinMerchant(params,money);
    } catch (e) {
      // alert("安卓 this is error ");
      console.log(e)
    }
  }else{
    //IOS
    try {
      window.webkit.messageHandlers.joinMerchant.postMessage
      ({"join_info":params,"money":money})
      // window.webkit.messageHandlers.JAMS__mark.postMessage(params)
    } catch (e) {
      // alert("IOS this is error ");
      console.log(e)
    }
  }
}

JoinInfo = createForm()(JoinInfo)
export default connect(({index}) => ({index}))(JoinInfo)
