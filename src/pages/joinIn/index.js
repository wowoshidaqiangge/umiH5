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

  showReadContract() {
    Toast.info('请阅读合同信息', 1)
  }

  handleAccept() {
    const {form, dispatch} = this.props
    const {validateFields} = form

    if (this.state.checked) {
      validateFields((error, value) => {
        if (error) {
          this.showToast()
          return
        }

      })
    } else {
      this.showReadContract()

    }
  }

  checkName(rule, value, callback) {
    if (value && value.trim().length < 0) {
      callback('请输入姓名')
      return false
    }
    return true
  }

  checkId(rule, value, callback) {
    const id = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (value && !(id.test(value))) {
      callback('身份证格式错误')
      return false
    }
    return true
  }

  checkPhone(rule, value, callback) {
    if (value && !(/^1[34578]\d{9}$/.test(value))) {
      callback('手机号码格式错误')
      return false
    }
    return true
  }

  checkCompanyName(rule, value, callback) {
    if (value && value.trim().length < 0) {
      callback('请输入姓名')
      return false
    }
    return true
  }

  checkAddress(rule, value, callback) {
    if (value && value.trim().length < 0) {
      callback('请输入联系地址')
      return false
    }
    return true
  }

  render() {
    const {form} = this.props
    const {getFieldProps, getFieldError} = form
    return (
      <div className={styles.joinInfo}>
        <List>
          <InputItem {...getFieldProps('name', {
            rules: [{required: true}, {
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
            <div style={{fontSize: '17px', paddingLeft: '15px', lineHeight: '44px'}}>保证金:</div>
            <div><InputItem disabled={true} style={{color: 'red', textAlign: 'right'}} {...getFieldProps('money', {
              initialValue: '￥20000.00'
            })} >
            </InputItem></div>
          </div>

        </List>

        <div className={styles.href}>

          <AgreeItem key={'ture'} style={{fontSize: '11px'}}
                     onChange={() => this.setState({checked: true})}
            // checked={this.props.agreement}
            // onChange={() => this.props.dispatch({
            //   type: 'mobile/setState',
            //   payload: {agreement: !this.props.agreement}
            // })}
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
