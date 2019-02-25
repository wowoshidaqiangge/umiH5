import React, {Component} from 'react'
import {Button, List, InputItem} from "antd-mobile"
import {createForm} from 'rc-form'
import styles from './index.less'

export default class JoinInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {form} = this.props
    const {getFieldProps, getFieldError} = form
    return (
      <div className={styles.joinInfo}>
        <List>
          <InputItem {...getFieldProps('name', {
            rule: [{required: true}]
          })}maxLength={20}>姓名:</InputItem>

          <InputItem {...getFieldProps('ID', {
            rule: [{required: true}]
          })}
                     error={!!getFieldError('ID')}>身份证:</InputItem>

          <InputItem {...getFieldProps('companyName', {
            rule: [{required: true}]
          })}
                     error={!!getFieldError('companyName')}>公司名称:</InputItem>


          <InputItem {...getFieldProps('phone', {
            rule: [{required: true}]
          })}
                     error={!!getFieldError('phone')}>联系电话:</InputItem>

          <InputItem {...getFieldProps('phone', {
            rule: [{required: true}]
          })}
                     error={!!getFieldError('phone')}>联系电话:</InputItem>

          <InputItem {...getFieldProps('address', {
            rule: [{required: true}]
          })}
                     error={!!getFieldError('address')}>联系地址:</InputItem>

          <InputItem style={{color:'red',paddingLeft:'150p'}} {...getFieldProps('money', {
            initialValue:'￥20000.00',
            rule: [{required: true}]
          })}
                     error={!!getFieldError('money')}
                     placeholder="￥20000.00">保证金:</InputItem>

        </List>

        <div className={styles.href}>
          <div className={styles.circle}/>
          <div className={styles.right}>
            <span className={styles.read}>请仔细阅读并同意</span>
            <a href=''>《纳品网加盟合作服务协议》</a>
          </div>
        </div>

        <div className={styles.button}>
          <Button type={'primary'}>确认</Button>
        </div>

      </div>
    )
  }
}

JoinInfo = createForm()(JoinInfo)
