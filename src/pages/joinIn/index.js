import React, {Component} from 'react'
import {Button, List, InputItem, Checkbox, Toast} from "antd-mobile"
import {createForm} from 'rc-form'
import styles from './index.less'
// import axios from 'axios'
import {connect} from 'dva'

const AgreeItem = Checkbox.AgreeItem;

class JoinInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  showToast() {
    Toast.info('请填写完整信息', 1)
  }


  handleAccept() {
    const {form, dispatch} = this.props
    const {validateFields,getFieldsValue} = form

    if (this.state.checked) {
      validateFields({force:true},(error)=>{
        if(!error){
          console.log(getFieldsValue)
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
                     onChange={() => this.setState({checked: true})}
          >
            <span className={styles.read}>请仔细阅读并同意</span>
            <a href=''>《纳品网加盟合作服务协议》</a>
          </AgreeItem>
        </div>

        <div className={styles.button}>
          <Button type={'primary'} onClick={() => this.handleAccept()}>确认</Button>
        </div>
      </div>
    )
  }
}

JoinInfo = createForm()(JoinInfo)
export default connect(({index}) => ({index}))(JoinInfo)
