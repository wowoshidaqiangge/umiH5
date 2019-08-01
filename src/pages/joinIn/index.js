import React, {Component} from 'react'
import {Button, List, InputItem, Checkbox, Toast} from "antd-mobile"
import {connect} from 'dva'
import router from 'umi/router'
import {createForm} from 'rc-form'
import styles from './style/join.less'
import {getToken} from "@/utils/requestMethod";

// import getToken from '../../utils/request';

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

  componentDidMount() {
    const {dispatch} = this.props
    dispatch({type: 'getJoin/getJoinIn'})
  }

  handleConfirm() {
    const {validateFields, getFieldsValue} = this.props.form
    if (this.state.checked) {
      validateFields({force: true}, (error) => {
        if (!error) {
          this.setState({disabled: true})
          let params = {
            name: getFieldsValue().name,
            addr: getFieldsValue().address,
            phone: getFieldsValue().phone,
            card: getFieldsValue().ID,
            company: getFieldsValue().companyName
          };
          localStorage.removeItem('params')
          // this.props.form.restFields()
          getApp(params, this.props.getJoin.joinMoney)
          setTimeout(() => {
            this.setState({disabled: false})
          }, 1000)
        } else {
          Toast.info('请将信息填写完整')
        }
      })
    } else {
      Toast.info('请仔细阅读并同意《纳品网联盟合作服务协议》', 3)
    }
  }

  checkName(rule, value, callback) {
    if (value && value.trim().length > 0) {
      let reg = /^[\u4e00-\u9fa5a-z]+$/gi
      if (!reg.test(value)) {
        callback(new Error('请输入正确的中文格式'))
      }
      callback()
    } else {
      callback()
      // callback(new Error('请输入姓名'))
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

  render() {
    getPay();//APP调用方法
    const {form,getJoin} = this.props;
    const{joinMoney}=getJoin
    const {disabled} = this.state;
    const {getFieldProps, getFieldError} = form;
    const getMoney = '￥' + joinMoney;
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
              })}
                         error={!!getFieldError('name')}
                         maxLength={20}
                         onErrorClick={() => {
                           Toast.info(getFieldError('name').join('、'), 2)
                         }}
                         type="text">姓名:</InputItem>

              <InputItem {...getFieldProps('ID', {
                initialValue: localParams && localParams.card ? localParams.card : void(0),
                rules: [{required: true, message: '请输入身份证号码'},
                  {validator: (rule, value, callback) => this.checkId(rule, value, callback)}]
              })}
                         error={!!getFieldError('ID')}
                         onErrorClick={() => {
                           Toast.info(getFieldError('ID').join('、'), 2)
                         }}
                         type="text">身份证:</InputItem>

              <InputItem {...getFieldProps('companyName', {
                initialValue: localParams && localParams.companyName ? localParams.companyName : void(0),
                rules: [{required: true, message: '请输入公司名'},
                  {validator: (rule, value, callback) => this.checkCompanyName(rule, value, callback)}]
              })}
                         error={!!getFieldError('companyName')}
                         onErrorClick={() => {
                           Toast.info(getFieldError('companyName').join('、'), 2)
                         }}
                         type="text">公司名称:</InputItem>


              <InputItem {...getFieldProps('phone', {
                initialValue: localParams && localParams.phone ? localParams.phone : void(0),
                rules: [{required: true, message: '请输入联系电话'},
                  {validator: (rule, value, callback) => this.checkPhone(rule, value, callback)}]
              })}
                         error={!!getFieldError('phone')}
                         onErrorClick={() => {
                           Toast.info(getFieldError('phone').join('、'), 2)
                         }}
                         type="number">联系电话:</InputItem>

              <InputItem {...getFieldProps('address', {
                initialValue: localParams && localParams.addr ? localParams.addr : void(0),
                rules: [{required: true, message: '请输入联系地址'},
                  {validator: (rule, value, callback) => this.checkAddress(rule, value, callback)}]
              })}
                         error={!!getFieldError('address')}
                         onErrorClick={() => {
                           Toast.info(getFieldError('address').join('、'), 2)
                         }}
                         type="text">联系地址:</InputItem>

              <div style={{justifyContent: 'space-between', display: 'flex'}}>
                <div style={{fontSize: '17px', paddingLeft: '15px', lineHeight: '44px', color: '#000'}}>保证金:</div>
                <div>
                  <InputItem disabled={true}
                             style={{color: 'red', textAlign: 'right'}}
                             {...getFieldProps('money', {
                               initialValue: getMoney
                             })} >
                  </InputItem>
                </div>
              </div>
            </List>
          </form>

          <div className={styles.href}>
            <AgreeItem key={'ture'} style={{fontSize: '11px'}}
                       onChange={() => this.setState({checked: true})}>
            </AgreeItem>
            <div style={{display: 'flex', lineHeight: '35px'}}>
              <div className={styles.read}>请仔细阅读并同意</div>
              <div className={styles.contract}
                   onClick={() => router.push('/joinIn-contract')}>
                《纳品网联盟合作服务协议》
              </div>
            </div>
          </div>

          <div className={styles.button}>
            <Button
              type={'primary'}
              onClick={() => this.handleConfirm()}
              disabled={disabled}>
              确认
            </Button>
          </div>
        </div>

      </div>
    )
  }
}

function getClient() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  const isIos = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return 1;
  } else if (isIos) {
    return 0;
  }
}

/**
 * 支付成功，APP通知前端去合同页面
 */
function getPay() {
  // const token = getToken()
  //IOS
  window["joinPayNotice"] = () => {
    //业务逻辑
    // let token = getToken.sysParams.token;
    // let url = '/joinMerchant/joinIn-contract?token=' + token;
    // window.location.href = url;
    router.push('/joinMerchant/joinIn-contract')
  };
  //安卓
  window.joinPayNotice = () => {
    // let token = getToken.sysParams.token;
    // let url = '/joinMerchant/joinIn-contract?token=' + token;
    // window.location.href = url;
    router.push('/joinMerchant/joinIn-contract')
  };
}

function getApp(params, money) {
  let client = getClient();
  params = JSON.stringify(params);
  let newMoney = '' + money;

  if (client) {

    //安卓
    try {
      const payload= JSON.stringify({'join_info':params})
      window.android.joinMerchant(payload, newMoney,'3');
    } catch (e) {
      // alert("安卓 this is error ");
      // console.log(e)
    }
  } else {
    //IOS
    try {
      window.webkit.messageHandlers.joinMerchant.postMessage
      ({'join_info': params, 'money': money,'type':'3'})
    } catch (e) {
      // alert("IOS this is error ");
      // console.log(e)
    }
  }
}


JoinInfo = createForm()(JoinInfo)
export default connect(({getJoin}) => ({getJoin}))(JoinInfo)
