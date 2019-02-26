import axios from 'axios'
import {Toast} from 'antd-mobile'
const testUrl = 'https://testnp.napin.com/'; //api请求路径
// const testUrl = 'https://super.napin.com/'; //api请求路径
//系统请求参数
const sysParams = {
  'time': new Date().getTime(),
  'platform':'h5',
  'token':getToken(),
  'version':'1.0.1',
  'device_id':'123456'
};
//获取token的方法
function getToken() {
  const token1 = '123';//window.location.search('token'); //地址栏
  const token2 = '435';//window.localStorage.getItem('token'); //本地的
  const token3 = ''; //从app获取到的
  return token1 || token2 || token3;
}


//接口列表
const api = {
  join:{
    return:'{$testUrl}/api/shop/applyReturn',//申请退还押金
    getBill:'{$testUrl}/api/shop/getJoinBill',//加盟商账单
    getMonthBill:'{$testUrl}/api/shop/getMonthBill',//加盟商筛选年月的消费趋势
  },
};
//封装请求
const request = async function request(url,params){
  params.concat(sysParams);
  return axios.post(url,params).then((res)=>{
    if(res.status==200){
      if(res.data.code==1){
        return res.data.data;
      }else if(res.data.code==-2){
        Toast.fail(res.data.message,3);
        return;
        //暂时不处理登陆过期的情况
      }else{
        Toast.fail(res.data.message,3);
        return;
      }
    }else{
      Toast.fail('系统出现一个了错误咯',3);
      return;
    }
  })
};

export default {
  api,
  request
};
