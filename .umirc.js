import pageRoutes from './config/router.config'
// ref: https://umijs.org/config/
export default {
  base:'/joinMerchant/',//部署到非根目录时需要配置
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      // dynamicImport: false,
      title: '纳品网',
      dynamicImport: {
          loadingComponent: "./components/pageLoading/index"
      },
      dll: false,
      targets:{
        ie:11, 
        chrome: 49, 
        firefox: 45, 
        safari: 10, 
        edge: 13, 
        ios: 10
      },
      routes: {
        exclude: [

          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,

          /components\//,
        ],
      },
    }],
  ],
  
  // 路由配置
  routes: pageRoutes,
}
