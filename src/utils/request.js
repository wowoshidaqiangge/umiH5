import axios from 'axios'
import {Toast} from 'antd-mobile'
import getToken from '../../config/global'
const testUrl = 'https://testnp.napin.com/'; //api请求路径
// const testUrl = 'https://super.napin.com/'; //api请求路径
//系统请求参数
const sysParams = {
  'time': new Date().getTime(),
  'platform': 'h5',
  'token': getToken,
  'version': '1.0.1',
  'device_id': '123456'
};
//接口列表
const api = {
  join: {
    return: `${testUrl}api/shop/applyReturn`,          //申请退还押金
    getBill: `${testUrl}api/shop/getJoinBill`,         //加盟商账单
    getMonthBill: `${testUrl}api/shop/getMonthBill`,   //加盟商筛选年月的消费趋势
    getJoinIn: `${testUrl}api/shop/getJoinIn`,         //获取加盟者信息
    joinIn: `${testUrl}api/shop/joinIn`,               //加盟
  },
};
//封装请求
const request = async function request(url, params) {
  return axios.post(url, params);
};
//封装响应
const responseCode = function responseCode(data){
  if(data.code === -1){
    Toast.fail(data.message,3)
  }else if(data.code === -2){
    Toast.fail(data.message,3)
  }
};
export default {api, request,responseCode, sysParams};
